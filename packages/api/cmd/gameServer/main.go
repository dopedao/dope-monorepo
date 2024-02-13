package main

import (
	"context"
	"net/http"

	api "github.com/dopedao/dope-monorepo/packages/api/game/api"
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
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

	loggerCtx := logger.Log.WithContext(context.Background())

	srv, err := api.NewServer(
		loggerCtx,
		envcfg.Network)
	logger.LogFatalOnErr(err, "Creating Game Server")

	logger.Log.Info().Msg(
		"Starting game server to listen on port: " + *envcfg.Listen)

	middleware := crzerolog.InjectLogger(logger.Log)

	server := &http.Server{
		Addr:    ":" + *envcfg.Listen,
		Handler: middleware(srv)}

	err = server.ListenAndServe()
	logger.LogFatalOnErr(err, "Server terminated.")
}
