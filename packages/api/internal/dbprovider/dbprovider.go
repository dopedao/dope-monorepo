// Provides access to Postgres db connection pool and Ent singleton
// so we don't have to initialize it everywhere.
package dbprovider

import (
	"entgo.io/ent/dialect/sql"

	"entgo.io/ent/dialect"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"

	// Necessary for postgres connection with ent
	// https://stackoverflow.com/a/52791919
	_ "github.com/lib/pq"
)

var dbConnection *sql.Driver
var entClient *ent.Client

func init() {
	pgsVal, connErr := envcfg.PgConnString.Value()
	logger.LogFatalOnErr(connErr, "Getting postgres connection string.")

	dbConnection, drvErr := sql.Open(dialect.Postgres, pgsVal)
	logger.LogFatalOnErr(drvErr, "Connecting to db")

	entClient = ent.NewClient(ent.Driver(dbConnection))
}

func Conn() *sql.Driver {
	return dbConnection
}

func Ent() *ent.Client {
	return entClient
}
