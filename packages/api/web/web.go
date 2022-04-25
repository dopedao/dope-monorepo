package web

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

	"github.com/dopedao/dope-monorepo/packages/api/indexer"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/graph"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/internal/middleware"
	"github.com/dopedao/dope-monorepo/packages/api/web/resources/authentication"
	"github.com/dopedao/dope-monorepo/packages/api/web/resources/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/web/resources/wallet"
)

// Launch a new HTTP API server to handle web requests
// for database queries, sprite sheets, authentication, etc.
func NewServer(ctx context.Context, drv *sql.Driver, static *storage.BucketHandle, network string) (http.Handler, error) {
	_, log := logger.LogFor(ctx)

	dbClient := ent.NewClient(ent.Driver(drv))

	// Get Eth client for authentication endpoint
	retryableHTTPClient := retryablehttp.NewClient()
	retryableHTTPClient.Logger = nil
	// 0 = ethconfig
	c, err := rpc.DialHTTPWithClient(indexer.Config[network][0].(indexer.EthConfig).RPC, retryableHTTPClient.StandardClient())
	if err != nil {
		log.Fatal().Msg("Dialing ethereum rpc.") //nolint:gocritic
	}
	ethClient := ethclient.NewClient(c)

	r := mux.NewRouter()
	r.Use(middleware.Session(middleware.Store))
	r.Use(middleware.Logger)

	// TODO: Document API here?
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
		_, _ = w.Write([]byte(`{"success":true}`))
	})

	// GraphQL playground
	graphServer := handler.NewDefaultServer(graph.NewSchema(dbClient))
	r.Handle("/playground", playground.Handler("GraphQL playground", "/query"))
	r.Handle("/query", graphServer)

	// Authenticate for gameplay
	authRouter := r.PathPrefix("/authentication").Subrouter()
	authRouter.Use(authentication.CORS())
	authRouter.HandleFunc("/login", authentication.LoginHandler(ethClient))
	authRouter.HandleFunc("/authenticated", authentication.AuthenticatedHandler)
	authRouter.HandleFunc("/logout", authentication.LogoutHandler)

	// Game integration endpoints
	r.HandleFunc("/wallets/{address}/hustlers", wallet.HandleHustlers(dbClient))
	r.HandleFunc("/hustlers/{id}/sprites", hustler.SpritesHandler(dbClient))
	r.HandleFunc("/hustlers/{id}/sprites/composite.png", hustler.SpritesCompositeHandler(dbClient, static))

	// World Wide Webb integration
	// https://worldwidewebb.notion.site/Integration-Guide-101cbdbfefad415ead7b41369ce66858
	r.HandleFunc("/collection/{id}.png", hustler.SpritesCompositeHandler(dbClient, static))
	r.HandleFunc("/address/{address}", wallet.HandleHustlers(dbClient))

	return cors.AllowAll().Handler(r), nil
}
