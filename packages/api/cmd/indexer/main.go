// Runs the Ethereum Indexer webserver to be utilized
// on Google Cloud Platform.
//
// THIS WILL NOT RUN ON YOUR LOCAL MACHINE UNLESS YOU HIT /_ah/start
// ( It's a legacy Google Cloud Platform App Engine scaling control. )
//
// This is how the program is launched both on your local machine,
// and when run remotely on GCP.
package main

import (
	"context"
	"net/http"
	"os"

	"github.com/dopedao/dope-monorepo/packages/api/indexer"
	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/rs/zerolog"
	"github.com/yfuruyama/crzerolog"
)

func main() {
	log := zerolog.New(os.Stderr)

	ctx := context.Background()

	srv, err := indexer.NewServer(
		log.WithContext(ctx),
		dbprovider.Conn(),
		envcfg.Network)
	logger.LogFatalOnErr(err, "Creating Indexer")

	log.Info().Msg("Starting to listen on port: " + *envcfg.Listen)
	middleware := crzerolog.InjectLogger(&log)
	server := &http.Server{Addr: ":" + *envcfg.Listen, Handler: middleware(srv)}

	err = server.ListenAndServe()
	logger.LogFatalOnErr(err, "Server terminated.")
}
