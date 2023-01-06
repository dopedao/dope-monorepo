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
	_, log := logger.LogFor(ctx)
	log.Debug().Msg("Calling runMigration")

	// Run the auto migration tool
	err := entClient.Schema.Create(ctx,
		// Drop columns that don't exist anymore
		migrate.WithDropIndex(true),
		migrate.WithDropColumn(true),
		// ...with protections from referencing any materialized
		//    views before they've been created.
		schema.WithHooks(func(next schema.Creator) schema.Creator {
			return schema.CreateFunc(func(ctx context.Context, tables ...*schema.Table) error {
				var tables2 []*schema.Table
				for _, t := range tables {
					// This seems brittle. We can figure out a better way?
					if t.Name != "search_index" {
						tables2 = append(tables2, t)
					}
				}
				return next.Create(ctx, tables2...)
			})
		}))
	logger.LogFatalOnErr(err, "FATAL runMigration")
}

//go:embed 00_init_search_index.sql
var f embed.FS

// Drop and recreate our Materialized views with SQL files.
func RefreshMaterializedViews(ctx context.Context) {
	if isTestEnvironment() {
		fmt.Println("TEST ENV - Skipping material view refresh.")
		return
	}

	fmt.Println("REFRESH MATERIAL VIEWS")
	_, log := logger.LogFor(ctx)
	log.Debug().Msg("Loading SQL migrations for Materialized Views")

	searchMigrationSql, _ := f.ReadFile("00_init_search_index.sql")

	_, err := dbConnection.DB().Exec(string(searchMigrationSql))
	if err != nil {
		logger.LogFatalOnErr(err, "FATAL refreshMaterializedViews")
	}
}

func isTestEnvironment() bool {
	appEnv := os.Getenv("APP_ENV")
	return appEnv == "test"
}
