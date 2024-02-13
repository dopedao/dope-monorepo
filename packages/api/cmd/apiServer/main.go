package main

import (
	"context"
	"net/http"

	"cloud.google.com/go/storage"
	"google.golang.org/api/option"

	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/web"
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
	logger.Init()

	ctx := context.Background()

	// Need GCP credentials from string in env file, can't rely
	// on the default application credentials if we're not hosting on GCP anymore.
	gcpCreds, err := envcfg.GoogleCredentialsJsonString()
	if err != nil {
		logger.Log.Fatal().Err(err).Msg("Error getting GCP Credentials")
	}
	s, err := storage.NewClient(ctx, option.WithCredentialsJSON([]byte(gcpCreds)))

	logger.LogFatalOnErr(err, "Creating storage client.")

	var srv http.Handler

	logger.Log.Info().Msg("Launching HTTP API Server")
	srv, err = web.NewServer(
		logger.Log.WithContext(ctx),
		s.Bucket("dopewars-static"))
	logger.LogFatalOnErr(err, "Creating HTTP Server")

	logger.Log.Info().Msg("Starting to listen on port: " + *envcfg.Listen)
	middleware := crzerolog.InjectLogger(logger.Log)
	server := &http.Server{Addr: ":" + *envcfg.Listen, Handler: middleware(srv)}

	err = server.ListenAndServe()
	logger.LogFatalOnErr(err, "Server terminated.")
}
