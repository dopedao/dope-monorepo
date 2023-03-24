// Provides access to Postgres db connection pool and Ent singleton
// so we don't have to initialize it everywhere.
package dbprovider

import (
	"context"
	"fmt"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
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
	// Load PG connection string from env
	var pgHost = envcfg.EnvSecretOrDefault("PG_HOST", "localhost:5432")
	var pgPass = envcfg.EnvSecretOrDefault("PG_PASS", "postgres")
	connStr := envcfg.EnvSecretOrDefault(
		"PG_CONNSTR",
		fmt.Sprintf(
			"postgres://postgres:%s@%s?sslmode=disable",
			pgPass, pgHost))

	// Establish db connection
	var drvErr error
	dbConnection, drvErr = sql.Open(dialect.Postgres, connStr)
	logger.LogFatalOnErr(drvErr, "Connecting to db")

	dbConnection.DB().SetMaxIdleConns(10)
	dbConnection.DB().SetMaxOpenConns(100)

	// Load Ent client
	entClient = ent.NewClient(ent.Driver(dbConnection))

	// Run migrations
	ctx := context.Background()
	RunMigration(ctx)
	RefreshMaterializedViews(ctx)
}

func Conn() *sql.Driver {
	return dbConnection
}

func Ent() *ent.Client {
	return entClient
}
