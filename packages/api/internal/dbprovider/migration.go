package dbprovider

import (
	"context"
	"embed"
	"fmt"
	"strings"

	"entgo.io/ent/dialect/sql/schema"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
)

// Run the Ent auto migration tool
// Docs: https://entgo.io/docs/migrate
func runMigration(ctx context.Context) {
	_, log := logger.LogFor(ctx)
	log.Debug().Msg("Running ENT Auto-migration tool")

	// Run the auto migration tool
	err := entClient.Schema.Create(ctx,
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
	logger.LogFatalOnErr(err, "runMigration")
}

//go:embed 00_init_search_index.sql
var f embed.FS

// Drop and recreate our Materialized views with SQL files.
func refreshMaterializedViews(ctx context.Context) (string, error) {
	_, log := logger.LogFor(ctx)
	log.Debug().Msg("Loading SQL migrations for Materialized Views")

	searchMigrationSql, _ := f.ReadFile("00_init_search_index.sql")

	_, err := dbConnection.DB().Exec(string(searchMigrationSql))
	if err != nil {
		if !strings.Contains(err.Error(), "already exists") {
			return "", fmt.Errorf("applying ts migration: %w", err)
		}
	}
	return "Database migrated", nil
}
