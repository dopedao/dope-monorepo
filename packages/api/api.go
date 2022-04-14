package api

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strings"

	"cloud.google.com/go/storage"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/schema"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/gorilla/mux"
	"github.com/hashicorp/go-retryablehttp"
	"github.com/rs/cors"

	"github.com/dopedao/dope-monorepo/packages/api/authentication"
	"github.com/dopedao/dope-monorepo/packages/api/base"
	"github.com/dopedao/dope-monorepo/packages/api/engine"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/graph"
	"github.com/dopedao/dope-monorepo/packages/api/middleware"
	"github.com/dopedao/dope-monorepo/packages/api/resources"
)

// Launch a new HTTP API server to handle web requests
// for database queries, sprite sheets, authentication, etc.
func NewServer(ctx context.Context, drv *sql.Driver, static *storage.BucketHandle, network string) (http.Handler, error) {
	_, log := base.LogFor(ctx)
	client := ent.NewClient(ent.Driver(drv))

	// Get Eth client
	retryableHTTPClient := retryablehttp.NewClient()
	retryableHTTPClient.Logger = nil
	// 0 = ethconfig
	c, err := rpc.DialHTTPWithClient(configs[network][0].(engine.EthConfig).RPC, retryableHTTPClient.StandardClient())
	if err != nil {
		log.Fatal().Msg("Dialing ethereum rpc.") //nolint:gocritic
	}
	ethClient := ethclient.NewClient(c)

	srv := handler.NewDefaultServer(graph.NewSchema(client))

	r := mux.NewRouter()
	r.Use(middleware.Session(middleware.Store))

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
		_, _ = w.Write([]byte(`{"success":true}`))
	})
	r.Handle("/playground", playground.Handler("GraphQL playground", "/query"))
	r.Handle("/query", srv)

	authRouter := r.PathPrefix("/authentication").Subrouter()
	authRouter.Use(authentication.CORS())

	authRouter.HandleFunc("/login", authentication.LoginHandler(ethClient))
	authRouter.HandleFunc("/authenticated", authentication.AuthenticatedHandler)
	authRouter.HandleFunc("/logout", authentication.LogoutHandler)

	r.HandleFunc("/wallets/{address}/hustlers", resources.WalletHustlersHandler(client))
	r.HandleFunc("/hustlers/{id}/sprites", resources.HustlerSpritesHandler(client))
	r.HandleFunc("/hustlers/{id}/sprites/composite.png", resources.HustlerSpritesCompositeHandler(client, static))

	// World Wide Webb spec https://worldwidewebb.notion.site/Integration-Guide-101cbdbfefad415ead7b41369ce66858
	r.HandleFunc("/collection/{id}.png", resources.HustlerSpritesCompositeHandler(client, static))
	r.HandleFunc("/address/{address}", resources.WalletHustlersHandler(client))

	return cors.AllowAll().Handler(r), nil
}

// Launch a new Indexer process.
//
// The Indexer reads prices from NFT marketplaces,
// and information about our DOPE NFT assets to place in a PGSQL Database.
func NewIndexer(ctx context.Context, drv *sql.Driver, openseaApiKey, network string) (http.Handler, error) {
	_, log := base.LogFor(ctx)
	client := ent.NewClient(ent.Driver(drv))

	// Run the auto migration tool.
	if err := client.Schema.Create(ctx, schema.WithHooks(func(next schema.Creator) schema.Creator {
		return schema.CreateFunc(func(ctx context.Context, tables ...*schema.Table) error {
			var tables2 []*schema.Table
			for _, t := range tables {
				// Remove search_index since it is a materialized view
				if t.Name != "search_index" {
					tables2 = append(tables2, t)
				}
			}
			return next.Create(ctx, tables2...)
		})
	})); err != nil {
		return nil, err
	}

	ts_migration, err := os.ReadFile("sql_migrations/00_init_search_index.sql")
	if err != nil {
		log.Fatal().Msg("Couldn't read migration file") //nolint:gocritic
	}
	if _, err := drv.DB().Exec(string(ts_migration)); err != nil {
		if !strings.Contains(err.Error(), "already exists") {
			return nil, fmt.Errorf("applying ts migration: %w", err)
		}
	}

	ctx, cancel := context.WithCancel(ctx)

	started := false

	r := mux.NewRouter()
	r.Use(middleware.Session(middleware.Store))
	r.HandleFunc("/_ah/start", func(w http.ResponseWriter, r *http.Request) {
		if started {
			w.WriteHeader(200)
			_, _ = w.Write([]byte(`{"success":false}`))
			return
		}

		started = true
		for _, c := range configs[network] {
			switch c := c.(type) {
			case engine.EthConfig:
				engine := engine.NewEthereum(ctx, client, c)
				go engine.Sync(ctx)
			case engine.OpenseaConfig:
				c.APIKey = openseaApiKey
				opensea := engine.NewOpensea(client, c)
				go opensea.Sync(ctx)
			}
		}
		w.WriteHeader(200)
		_, _ = w.Write([]byte(`{"success":true}`))
	})

	r.HandleFunc("/_ah/stop", func(w http.ResponseWriter, r *http.Request) {
		cancel()
		w.WriteHeader(200)
		_, _ = w.Write([]byte(`{"success":true}`))
	})
	return cors.AllowAll().Handler(r), nil
}
