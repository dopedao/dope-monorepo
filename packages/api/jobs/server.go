package jobs

import (
	"context"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/internal/middleware"
)

// We should only run 1 job at a time for each
var JOB_LIMIT = 1

func NewServer(ctx context.Context) (http.Handler, error) {
	_, log := logger.LogFor(ctx)
	log.Debug().Msg("Starting job server")

	r := mux.NewRouter()
	r.Use(middleware.Session(middleware.Store))
	r.Use(middleware.Logger)

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"success":true}`))
	})

	// r.HandleFunc("/update-gear-claims", UpdateGearClaim())
	// r.HandleFunc("/update-paper-claims", UpdatePaperClaims())

	// qPaperBalance := make(chan int, JOB_LIMIT) // Only allow N job at a time using a queue
	// r.HandleFunc("/update-paper-balances", UpdatePaperBalances())

	qSea := make(chan int, JOB_LIMIT) // Only allow N job at a time using a queue
	r.HandleFunc("/update-opensea-listings", func(w http.ResponseWriter, r *http.Request) {
		qSea <- 1
		go UpdateOpenSeaListings(qSea)
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"success":true}`))
	})

	return cors.AllowAll().Handler(r), nil
}
