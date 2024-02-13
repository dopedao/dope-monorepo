package dbprovider

import (
	"context"
	"fmt"
	"sync"

	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"

	"database/sql"

	"entgo.io/ent/dialect"
	entsql "entgo.io/ent/dialect/sql"
	zerologadapter "github.com/jackc/pgx-zerolog"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/jackc/pgx/v5/tracelog"
)

var (
	dbConnectionMu sync.Mutex
	dbConnection   *sql.DB

	entClientMu sync.Mutex
	entClient   *ent.Client
)

func init() {
	fmt.Println("INITIALIZING DB PROVIDER")
	logger.Init()
	ctx := context.Background()
	_, _ = GetConnAndClient()

	// Will create tables and structures
	RunMigration(ctx)
	// Run for new databases, so our environments are always
	// seeded when spun up automatically.
	if shouldSeedDatabase() {
		Seed()
		RecreateMaterializedViews(ctx)
	}
	go RefreshSearchIndex(ctx)
}

func GetConnAndClient() (*sql.DB, *ent.Client) {
	dbConnectionMu.Lock()
	defer dbConnectionMu.Unlock()

	entClientMu.Lock()
	defer entClientMu.Unlock()

	log := logger.Log.With().Str("Context", "dbProvider").Logger()

	if dbConnection == nil || entClient == nil {
		log.Info().Msg("Initializing connection")
		var logLevel tracelog.LogLevel
		if envcfg.IsRunningLocally() {
			logLevel = tracelog.LogLevelInfo
		} else {
			logLevel = tracelog.LogLevelWarn
		}

		var drvErr error
		// Allow for setting other things on the pgx config like logger
		// https://pkg.go.dev/github.com/jackc/pgx/v5/stdlib
		connConfig, _ := pgx.ParseConfig(connStrFromEnv())
		connConfig.Tracer = &tracelog.TraceLog{
			Logger: zerologadapter.NewLogger(*logger.Log),
			// This will log sql queries to the console if LogLevelDebug
			LogLevel: logLevel,
		}
		connStr := stdlib.RegisterConnConfig(connConfig)
		dbConnection, drvErr = sql.Open("pgx", connStr)
		logger.LogFatalOnErr(drvErr, "Connecting to db")

		dbConnection.SetMaxIdleConns(5)
		dbConnection.SetMaxOpenConns(25)

		drv := entsql.OpenDB(dialect.Postgres, dbConnection)

		entClient = ent.NewClient(ent.Driver(drv))
	}
	return dbConnection, entClient
}

func Conn() *sql.DB {
	dbc, _ := GetConnAndClient()
	return dbc
}

func Ent() *ent.Client {
	_, c := GetConnAndClient()
	return c
}

func connStrFromEnv() string {
	var pgHost = envcfg.EnvSecretOrDefault("PG_HOST", "localhost:5432")
	var pgPass = envcfg.EnvSecretOrDefault("PG_PASS", "postgres")
	return envcfg.EnvSecretOrDefault(
		"PG_CONNSTR",
		fmt.Sprintf(
			"postgres://postgres:%s@%s?sslmode=disable",
			pgPass, pgHost))
}
