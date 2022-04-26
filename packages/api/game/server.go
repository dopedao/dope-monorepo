package game

import (
	"context"
	"net/http"

	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/internal/middleware"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func NewServer(ctx context.Context) (http.Handler, error) {

	_, log := logger.LogFor(ctx)

	log.Debug().Msg("Starting Game Server")

	r := mux.NewRouter()
	r.Use(middleware.Session(middleware.Store))

	ctx, cancel := context.WithCancel(ctx)
	started := false

	// Needed to scale up and down for GCP App Engine
	// https://cloud.google.com/appengine/docs/standard/nodejs/how-instances-are-managed
	r.HandleFunc("/_ah/start", func(w http.ResponseWriter, r *http.Request) {
		if started {
			w.WriteHeader(200)
			_, _ = w.Write([]byte(`{"success":false}`))
			return
		}

		started = true
		g := NewGame()
		go g.Start(ctx)
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
