package main

import (
	"context"
	"net/http"
	"os"

	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/jobs"
	"github.com/rs/zerolog"
	"github.com/yfuruyama/crzerolog"
)

func main() {
	log := zerolog.New(os.Stderr)

	ctx := context.Background()

	srv, err := jobs.NewServer(log.WithContext(ctx))
	logger.LogFatalOnErr(err, "Creating Indexer")

	log.Info().Msg("Starting to listen on port: " + *envcfg.Listen)
	middleware := crzerolog.InjectLogger(&log)
	server := &http.Server{Addr: ":" + *envcfg.Listen, Handler: middleware(srv)}

	err = server.ListenAndServe()
	logger.LogFatalOnErr(err, "Server terminated.")
}
