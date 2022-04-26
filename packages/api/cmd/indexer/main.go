package main

import (
	"context"
	"net/http"
	"os"

	"entgo.io/ent/dialect/sql"

	"entgo.io/ent/dialect"
	"github.com/dopedao/dope-monorepo/packages/api/indexer"
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/rs/zerolog"
	"github.com/yfuruyama/crzerolog"

	_ "github.com/lib/pq"
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

	pgsVal, err := envcfg.PgConnString.Value()
	logger.LogFatalOnErr(err, "Getting postgres connection string.")

	db, err := sql.Open(dialect.Postgres, pgsVal)
	logger.LogFatalOnErr(err, "Connecting to db")

	ctx := context.Background()

	var srv http.Handler

	srv, err = indexer.NewServer(log.WithContext(ctx), db, envcfg.Network)
	logger.LogFatalOnErr(err, "Creating Indexer")

	log.Info().Msg("Starting to listen on port: " + *envcfg.Listen)
	middleware := crzerolog.InjectLogger(&log)
	server := &http.Server{Addr: ":" + *envcfg.Listen, Handler: middleware(srv)}

	err = server.ListenAndServe()
	logger.LogFatalOnErr(err, "Server terminated.")
}
