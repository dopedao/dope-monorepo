package main

import (
	"context"
	"net/http"
	"os"

	"entgo.io/ent/dialect/sql"

	"entgo.io/ent/dialect"
	"github.com/dopedao/dope-monorepo/packages/api/indexer"
	"github.com/dopedao/dope-monorepo/packages/api/internal/flag"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/rs/zerolog"
	"github.com/spf13/pflag"
	"github.com/yfuruyama/crzerolog"

	_ "github.com/lib/pq"
)

// Listen to env variable PORT or default to 8080
// to avoid warning GCP was giving us about this issue.
// https://cloud.google.com/appengine/docs/flexible/custom-runtimes/configuring-your-app-with-app-yaml
var port = flag.GetEnvOrFallback("PORT", "8080")
var listen = pflag.String("listen", port, "server listen port")
var pgConnstring = flag.SecretEnv("PG_CONNSTR", "plaintext://postgres://postgres:postgres@localhost:5432?sslmode=disable")
var openseaApiKey = flag.SecretEnv("OPENSEA", "plaintext://")
var network = flag.GetEnvOrFallback("NETWORK", "mainnet")

// Runs the HTTP and Indexer servers.
//
// This is how the program is launched both on your local machine,
// and when run remotely on GCP.
//
// Requires a number of environment variables to be set (see above in source)
// or the program will crash. Because of this we set defaults.
func main() {
	log := zerolog.New(os.Stderr)

	pgConnstringSecret, err := pgConnstring.Value()
	logger.LogFatalOnErr(err, "Getting postgres connection string.")

	openseaApiKey, err := openseaApiKey.Value()
	logger.LogFatalOnErr(err, "Getting OpenSea API Key")

	db, err := sql.Open(dialect.Postgres, pgConnstringSecret)
	logger.LogFatalOnErr(err, "Connecting to db")

	ctx := context.Background()

	var srv http.Handler

	srv, err = indexer.NewServer(log.WithContext(ctx), db, openseaApiKey, network)
	logger.LogFatalOnErr(err, "Creating Indexer")

	log.Info().Msg("Starting to listen on port: " + *listen)
	middleware := crzerolog.InjectLogger(&log)
	server := &http.Server{Addr: ":" + *listen, Handler: middleware(srv)}

	err = server.ListenAndServe()
	logger.LogFatalOnErr(err, "Server terminated.")
}
