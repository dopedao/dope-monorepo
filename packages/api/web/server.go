package web

import (
	"context"
	"net/http"

	"cloud.google.com/go/storage"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/graph"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/internal/middleware"
	"github.com/dopedao/dope-monorepo/packages/api/web/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/web/wallet"
)

// Launch a new HTTP API server to handle web requests
// for database queries, sprite sheets, authentication, etc.
func NewServer(ctx context.Context, static *storage.BucketHandle) (http.Handler, error) {
	_, log := logger.LogFor(ctx)
	log.Debug().Msg("Starting web server")

	entClient := dbprovider.Ent()

	r := mux.NewRouter()
	r.Use(middleware.Session(middleware.Store))
	r.Use(middleware.Logger)

	// TODO: Document API here?
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
		_, _ = w.Write([]byte(`{"success":true}`))
	})

	// GraphQL playground
	graphServer := handler.NewDefaultServer(graph.NewSchema(entClient))
	r.Handle("/playground", playground.Handler("GraphQL playground", "/query"))
	r.Handle("/query", graphServer)

	// Game integration endpoints
	r.HandleFunc("/wallets/{address}/hustlers", wallet.HandleHustlers(entClient))
	r.HandleFunc("/hustlers/{id}/sprites", hustler.SpritesHandler(entClient))
	r.HandleFunc("/hustlers/{id}/sprites/composite.png", hustler.SpritesCompositeHandler(entClient, static))

	// World Wide Webb integration
	// https://worldwidewebb.notion.site/Integration-Guide-101cbdbfefad415ead7b41369ce66858
	r.HandleFunc("/collection/{id}.png", hustler.SpritesCompositeHandler(entClient, static))
	r.HandleFunc("/address/{address}", wallet.HandleHustlers(entClient))

	return cors.AllowAll().Handler(r), nil
}
