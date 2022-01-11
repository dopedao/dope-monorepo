package main

import (
	"context"
	"net/http"
	"os"

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
var network = os.Getenv("NETWORK")
var index = os.Getenv("INDEX")

func main() {
	log := zerolog.New(os.Stderr)

	log.Debug().Msgf("config: is indexer: %v", index)

	pgConnstringSecret, err := pgConnstring.Value()
	if err != nil {
		log.Fatal().Err(err).Msgf("Getting postgres connection string.") //nolint:gocritic
	}

	db, err := sql.Open(dialect.Postgres, pgConnstringSecret)
	if err != nil {
		log.Fatal().Err(err).Msgf("Connecting to db.") //nolint:gocritic
	}

	srv, err := api.NewServer(log.WithContext(context.Background()), db, index == "True", network)
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
