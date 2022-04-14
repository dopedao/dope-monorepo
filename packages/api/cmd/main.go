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
var network = common.GetEnv("NETWORK", "mainnet")
var isInIndexerMode = common.GetEnv("INDEX", "False")

func main() {
	log := zerolog.New(os.Stderr)

	log.Debug().Msgf("config: is indexer: %v", isInIndexerMode)

	pgConnstringSecret, err := pgConnstring.Value()
	if err != nil {
		log.Fatal().Err(err).Msgf("Getting postgres connection string.") //nolint:gocritic
	}

	openseaApiKey, err := openseaApiKey.Value()
	if err != nil {
		log.Fatal().Err(err).Msgf("Getting opensea api key.") //nolint:gocritic
	}

	db, err := sql.Open(dialect.Postgres, pgConnstringSecret)
	if err != nil {
		log.Fatal().Err(err).Msgf("Connecting to db.") //nolint:gocritic
	}

	ctx := context.Background()

	s, err := storage.NewClient(ctx)
	if err != nil {
		log.Fatal().Err(err).Msgf("Creating storage client.") //nolint:gocritic
	}

	srv, err := api.NewServer(log.WithContext(ctx), db, s.Bucket("dopewars-static"), isInIndexerMode == "True", openseaApiKey, network)
	if err != nil {
		log.Fatal().Err(err).Msgf("Creating server.") //nolint:gocritic
	}

	middleware := crzerolog.InjectLogger(&log)

	server := &http.Server{Addr: ":" + *listen, Handler: middleware(srv)}

	log.Info().Msg("listening on :" + *listen)
	if err := server.ListenAndServe(); err != nil {
		log.Fatal().Err(err).Msgf("Server terminated.")
	}
}
