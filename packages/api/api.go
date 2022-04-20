package api

import (
	"context"
	"net/http"

	"cloud.google.com/go/storage"
	"entgo.io/ent/dialect/sql"

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
func NewHttpServer(ctx context.Context, drv *sql.Driver, static *storage.BucketHandle, network string) (http.Handler, error) {
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

	graphServer := handler.NewDefaultServer(graph.NewSchema(client))

	r := mux.NewRouter()
	r.Use(middleware.Session(middleware.Store))
	r.Use(middleware.Logger)

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
		_, _ = w.Write([]byte(`{"success":true}`))
	})
	r.Handle("/playground", playground.Handler("GraphQL playground", "/query"))
	r.Handle("/query", graphServer)

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
