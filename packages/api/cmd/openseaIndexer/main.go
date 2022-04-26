package main

import (
	"context"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/indexer"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"

	// Necessary for postgres connection with ent
	// https://stackoverflow.com/a/52791919
	_ "github.com/lib/pq"
)

func main() {
	pgsVal, err := envcfg.PgConnString.Value()
	logger.LogFatalOnErr(err, "Getting postgres connection string.")

	dbConn, err := sql.Open(dialect.Postgres, pgsVal)
	logger.LogFatalOnErr(err, "Connecting to db")

	dbClient := ent.NewClient(ent.Driver(dbConn))

	var oscfg indexer.OpenseaConfig

	for _, c := range indexer.Config[envcfg.Network] {
		switch c := c.(type) {
		case indexer.OpenseaConfig:
			oscfg = c
		}
	}

	indexer := indexer.NewOpenseaIndexer(dbClient, oscfg)
	indexer.Sync(context.Background())
}
