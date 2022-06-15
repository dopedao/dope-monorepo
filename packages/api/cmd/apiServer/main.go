package main

import (
	"context"
	"net/http"
	"os"

	"cloud.google.com/go/storage"

	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/web"
	"github.com/rs/zerolog"
	"github.com/yfuruyama/crzerolog"
)

// Runs the HTTP and Indexer servers.
//
// This is how the program is launched both on your local machine,
// and when run remotely on GCP.
//
// Requires a number of environment variables to be set (see above in source)
// or the program will crash. Because of this we set defaults.
func main() {
	log := zerolog.New(os.Stderr)

	ctx := context.Background()

	s, err := storage.NewClient(ctx)
	logger.LogFatalOnErr(err, "Creating storage client.")

	var srv http.Handler

	log.Debug().Msg("Launching HTTP API Server")
	srv, err = web.NewServer(
		log.WithContext(ctx),
		s.Bucket("dopewars-static"))
	logger.LogFatalOnErr(err, "Creating HTTP Server")

	log.Info().Msg("Starting to listen on port: " + *envcfg.Listen)
	middleware := crzerolog.InjectLogger(&log)
	server := &http.Server{Addr: ":" + *envcfg.Listen, Handler: middleware(srv)}

	err = server.ListenAndServe()
	logger.LogFatalOnErr(err, "Server terminated.")
}
