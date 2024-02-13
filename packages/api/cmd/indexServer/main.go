// Runs the Ethereum Indexer webserver to be used when
// deployed remotely.
package main

import (
	"context"
	"net/http"

	"github.com/dopedao/dope-monorepo/packages/api/indexer"
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/yfuruyama/crzerolog"
)

// Exposes a http server that runs the indexer.
// This is used to sync the indexer with the Ethereum blockchain.
//
// Will start indexer automatically and allow for health check,
// shutdown, restart, and status checks.
func main() {
	logger.Init()
	ctx := context.Background()

	// Start the HTTP server (which will start the indexer)
	srv, err := indexer.NewServer(
		logger.Log.WithContext(ctx),
		envcfg.Network)
	logger.LogFatalOnErr(err, "Creating Indexer")

	logger.Log.Info().Msg("Starting to listen on port: " + *envcfg.Listen)
	middleware := crzerolog.InjectLogger(logger.Log)
	server := &http.Server{Addr: ":" + *envcfg.Listen, Handler: middleware(srv)}

	err = server.ListenAndServe()
	logger.LogFatalOnErr(err, "Server terminated.")
}
