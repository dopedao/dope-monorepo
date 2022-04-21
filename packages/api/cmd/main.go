package main

import (
	"context"
	"net/http"
	"os"

	"cloud.google.com/go/storage"
	"entgo.io/ent/dialect/sql"

	"entgo.io/ent/dialect"
	"github.com/dopedao/dope-monorepo/packages/api"
	"github.com/dopedao/dope-monorepo/packages/api/util"
	"github.com/rs/zerolog"
	"github.com/spf13/pflag"
	"github.com/yfuruyama/crzerolog"

	_ "github.com/lib/pq"
)

// Listen to env variable PORT or default to 8080
// to avoid warning GCP was giving us about this issue.
// https://cloud.google.com/appengine/docs/flexible/custom-runtimes/configuring-your-app-with-app-yaml
var port = util.GetEnvOrFallback("PORT", "8080")
var listen = pflag.String("listen", port, "server listen port")
var pgConnstring = util.SecretEnv("PG_CONNSTR", "plaintext://postgres://postgres:postgres@localhost:5432?sslmode=disable")
var openseaApiKey = util.SecretEnv("OPENSEA", "plaintext://")
var network = util.GetEnvOrFallback("NETWORK", "mainnet")
var indexEnv = util.GetEnvOrFallback("INDEX", "False")

// Runs the HTTP and Indexer servers.
//
// This is how the program is launched both on your local machine,
// and when run remotely on GCP.
//
// Requires a number of environment variables to be set (see above in source)
// or the program will crash. Because of this we set defaults.
func main() {
	log := zerolog.New(os.Stderr)

	isInIndexerMode := (indexEnv == "True")

	log.Debug().Msg(indexEnv)
	log.Debug().Msgf("config: is indexer: %v", isInIndexerMode)

	pgConnstringSecret, err := pgConnstring.Value()
	util.LogFatalOnErr(err, "Getting postgres connection string.")

	openseaApiKey, err := openseaApiKey.Value()
	util.LogFatalOnErr(err, "Getting OpenSea API Key")

	db, err := sql.Open(dialect.Postgres, pgConnstringSecret)
	util.LogFatalOnErr(err, "Connecting to db")

	ctx := context.Background()

	s, err := storage.NewClient(ctx)
	util.LogFatalOnErr(err, "Creating storage client.")

	var srv http.Handler

	if isInIndexerMode {
		log.Debug().Msg("Launching Indexer")
		srv, err = api.NewIndexer(log.WithContext(ctx), db, openseaApiKey, network)
		util.LogFatalOnErr(err, "Creating Indexer")
	} else {
		log.Debug().Msg("Launching HTTP API Server")
		srv, err = api.NewHttpServer(log.WithContext(ctx), db, s.Bucket("dopewars-static"), network)
		util.LogFatalOnErr(err, "Creating HTTP Server")
	}

	log.Info().Msg("Starting to listen on port: " + *listen)
	middleware := crzerolog.InjectLogger(&log)
	server := &http.Server{Addr: ":" + *listen, Handler: middleware(srv)}

	err = server.ListenAndServe()
	util.LogFatalOnErr(err, "Server terminated.")
}
