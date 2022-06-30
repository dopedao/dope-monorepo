package main

import (
	"context"
	"net/http"
	"os"

	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/internal/middleware"
	"github.com/dopedao/dope-monorepo/packages/api/jobs"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/rs/zerolog"
	"github.com/yfuruyama/crzerolog"
)

// We should only run 1 job at a time for each
// Using this to control a bootleg "queue" using channel limits
var JOB_LIMIT = 1

func main() {
	log := zerolog.New(os.Stderr)

	ctx := context.Background()

	srv, err := newServer(log.WithContext(ctx))
	logger.LogFatalOnErr(err, "Creating Indexer")

	log.Info().Msg("Starting to listen on port: " + *envcfg.Listen)
	middleware := crzerolog.InjectLogger(&log)
	server := &http.Server{Addr: ":" + *envcfg.Listen, Handler: middleware(srv)}

	err = server.ListenAndServe()
	logger.LogFatalOnErr(err, "Server terminated.")
}

func newServer(ctx context.Context) (http.Handler, error) {
	_, log := logger.LogFor(ctx)
	log.Debug().Msg("Starting job server")

	r := mux.NewRouter()
	r.Use(middleware.Session(middleware.Store))
	r.Use(middleware.Logger)

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"success":true}`))
	})

	qGearClaims := make(chan int, JOB_LIMIT)
	handleJob(r, "/gear-claims", jobs.GearClaims, qGearClaims)

	qGearMetrics := make(chan int, JOB_LIMIT)
	handleJob(r, "/gear-metrics", jobs.GearClaims, qGearMetrics)

	qSea := make(chan int, JOB_LIMIT)
	handleJob(r, "/opensea-listings", jobs.OpenSeaListings, qSea)

	qPaperBalance := make(chan int, JOB_LIMIT)
	handleJob(r, "/paper-balances", jobs.PaperBalances, qPaperBalance)

	qPaperClaims := make(chan int, JOB_LIMIT)
	handleJob(r, "/paper-claims", jobs.PaperClaims, qPaperClaims)

	return cors.AllowAll().Handler(r), nil
}

func handleJob(
	router *mux.Router,
	url string,
	job func(chan int),
	queue chan int,
) {
	router.HandleFunc(url, func(w http.ResponseWriter, r *http.Request) {
		queue <- 1
		go job(queue)
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"success":true}`))
	})
}
