package main

import (
	"context"
	"net/http"
	"os"

	api "github.com/dopedao/dope-monorepo/packages/api/game/api"
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
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

	loggerCtx := log.WithContext(context.Background())

	srv, err := api.NewServer(
		loggerCtx,
		envcfg.Network)
	logger.LogFatalOnErr(err, "Creating Game Server")

	log.Info().Msg(
		"Starting game server to listen on port: " + *envcfg.Listen)

	middleware := crzerolog.InjectLogger(&log)

	server := &http.Server{
		Addr:    ":" + *envcfg.Listen,
		Handler: middleware(srv)}

	err = server.ListenAndServe()
	logger.LogFatalOnErr(err, "Server terminated.")
}
