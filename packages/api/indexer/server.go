package indexer

import (
	"context"
	"net/http"

	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/internal/middleware"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

// Launch a new Indexer HTTP Server because this is hosted on GCP
// App Engine Standard Edition.
//
// Exposes HTTP endpoints for `/_ah/start` and `/_ah/stop` for autoscaling
// https://cloud.google.com/appengine/docs/standard/go/how-instances-are-managed#startup
//
// The Indexer reads prices from NFT marketplaces,
// and information about our DOPE NFT assets to place in a Postgres Database.
func NewServer(ctx context.Context, drv *sql.Driver, network string) (http.Handler, error) {
	_, log := logger.LogFor(ctx)
	log.Debug().Msg("Starting Indexer")

	dbClient := ent.NewClient(ent.Driver(drv))

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
				eth := NewEthereumIndexer(ctx, dbClient, c)
				go eth.Sync(ctx)
			case OpenseaConfig:
				os := NewOpenseaIndexer(dbClient, c)
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
