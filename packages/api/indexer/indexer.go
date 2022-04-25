package indexer

import (
	"context"
	"net/http"

	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/indexer/migration"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/internal/middleware"
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
func NewServer(ctx context.Context, drv *sql.Driver, openseaApiKey, network string) (http.Handler, error) {

	_, log := logger.LogFor(ctx)

	log.Debug().Msg("Starting indexer?")

	dbClient := ent.NewClient(ent.Driver(drv))
	migration.Migrate(ctx, drv, dbClient)

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
		for _, c := range Config[network] {
			switch c := c.(type) {
			case EthConfig:
				eth := NewEthereum(ctx, dbClient, c)
				go eth.Sync(ctx)
			case OpenseaConfig:
				c.APIKey = openseaApiKey
				os := NewOpensea(dbClient, c)
				go os.Sync(ctx)
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
