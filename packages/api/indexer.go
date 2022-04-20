package api

import (
	"context"
	"net/http"

	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/base"
	"github.com/dopedao/dope-monorepo/packages/api/engine"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/middleware"
	"github.com/dopedao/dope-monorepo/packages/api/migrations"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

// Launch a new Indexer process.
//
// The Indexer reads prices from NFT marketplaces,
// and information about our DOPE NFT assets to place in a PGSQL Database.
//
// Exposes HTTP endpoints for `/_ah/start` and `/_ah/stop` for autoscaling
// https://cloud.google.com/appengine/docs/standard/go/how-instances-are-managed#startup
func NewIndexer(ctx context.Context, drv *sql.Driver, openseaApiKey, network string) (http.Handler, error) {

	_, log := base.LogFor(ctx)

	log.Debug().Msg("Starting indexer?")

	dbClient := ent.NewClient(ent.Driver(drv))
	migrations.Migrate(ctx, drv, dbClient)

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
				engine := engine.NewEthereum(ctx, dbClient, c)
				go engine.Sync(ctx)
			case engine.OpenseaConfig:
				c.APIKey = openseaApiKey
				opensea := engine.NewOpensea(dbClient, c)
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
