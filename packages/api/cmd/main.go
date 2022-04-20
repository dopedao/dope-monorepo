package main

import (
	"context"
	"net/http"
	"os"

	"cloud.google.com/go/storage"
	"entgo.io/ent/dialect/sql"

	"entgo.io/ent/dialect"
	"github.com/dopedao/dope-monorepo/packages/api"
	"github.com/dopedao/dope-monorepo/packages/api/common"
	"github.com/rs/zerolog"
	"github.com/spf13/pflag"
	"github.com/yfuruyama/crzerolog"

	_ "github.com/lib/pq"
)

var listen = pflag.String("listen", "8080", "server listen port")
var pgConnstring = common.SecretEnv("PG_CONNSTR", "plaintext://postgres://postgres:postgres@localhost:5432?sslmode=disable")
var openseaApiKey = common.SecretEnv("OPENSEA", "plaintext://")
var network = common.GetEnvOrFallback("NETWORK", "mainnet")
var indexEnv = common.GetEnvOrFallback("INDEX", "False")

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
	common.LogFatalOnErr(err, "Getting postgres connection string.")

	openseaApiKey, err := openseaApiKey.Value()
	common.LogFatalOnErr(err, "Getting OpenSea API Key")

	db, err := sql.Open(dialect.Postgres, pgConnstringSecret)
	common.LogFatalOnErr(err, "Connecting to db")

	ctx := context.Background()

	s, err := storage.NewClient(ctx)
	common.LogFatalOnErr(err, "Creating storage client.")

	var srv http.Handler

	if isInIndexerMode {
		log.Debug().Msg("Launching Indexer")
		srv, err = api.NewIndexer(log.WithContext(ctx), db, openseaApiKey, network)
		common.LogFatalOnErr(err, "Creating Indexer")
	} else {
		log.Debug().Msg("Launching HTTP API Server")
		srv, err = api.NewServer(log.WithContext(ctx), db, s.Bucket("dopewars-static"), network)
		common.LogFatalOnErr(err, "Creating HTTP Server")
	}

	log.Info().Msg("Starting to listen on port: " + *listen)
	middleware := crzerolog.InjectLogger(&log)
	server := &http.Server{Addr: ":" + *listen, Handler: middleware(srv)}

	err = server.ListenAndServe()
	common.LogFatalOnErr(err, "Server terminated.")
}
