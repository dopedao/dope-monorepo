package dbprovider

import (
	"context"
	"embed"
	"fmt"
	"os"

	"entgo.io/ent/dialect/sql/schema"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/migrate"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
)

// Run the Ent auto migration tool
// Docs: https://entgo.io/docs/migrate
func RunMigration(ctx context.Context) {
	if isTestEnvironment() {
		fmt.Println("TEST ENV - Skipping migrations in test environment.")
		return
	}

	fmt.Println("RUNNING MIGRATIONS")
	log := logger.Log
	log.Info().Msg("Calling runMigration")

	// Run the auto migration tool
	err := entClient.Schema.Create(ctx,
		// Dropping indices and columns doesn't work the best
		// when dealing with production data.
		//
		// TODO: Change to versioned migrations
		// https://entgo.io/docs/versioned-migrations
		migrate.WithDropIndex(false),
		migrate.WithDropColumn(false),
		// TODO: Remove this hack
		// By default Ent will attempt to create tables for
		// material views we've included in the GraphQL spec
		// This is a workaround to prevent that, and it's hacky because
		// we have to hardcode the name of the material view.
		// Would be nicer if we could figure out a different way to do this.
		schema.WithHooks(func(next schema.Creator) schema.Creator {
			return schema.CreateFunc(func(ctx context.Context, tables ...*schema.Table) error {
				var tables2 []*schema.Table
				for _, t := range tables {
					if t.Name != "search_index" {
						tables2 = append(tables2, t)
					}
				}
				return next.Create(ctx, tables2...)
			})
		}))
	logger.LogFatalOnErr(err, "FATAL runMigration")
}

//go:embed data/00_init_search_index.sql
var fsMigration embed.FS

// Drop and recreate our Materialized views with SQL files.
func RecreateMaterializedViews(ctx context.Context) {
	if isTestEnvironment() {
		fmt.Println("TEST ENV - Skipping material view refresh.")
		return
	}

	fmt.Println("RE-CREATING MATERIAL VIEWS")

	searchMigrationSql, readFileErr := fsMigration.ReadFile("data/00_init_search_index.sql")
	if readFileErr != nil {
		logger.LogFatalOnErr(readFileErr, "Reading migration file")
	}

	_, err := dbConnection.ExecContext(ctx, string(searchMigrationSql))
	if err != nil {
		logger.LogFatalOnErr(err, "Executing search migration")
	}
}

func isTestEnvironment() bool {
	appEnv := os.Getenv("APP_ENV")
	return appEnv == "test"
}
