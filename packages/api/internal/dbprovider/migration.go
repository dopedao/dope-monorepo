package dbprovider

import (
	"context"
	"embed"
	"fmt"
	"strings"

	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
)

func migrate(ctx context.Context) {
	// Run the Ent auto migration tool.
	// https://entgo.io/docs/migrate
	err := entClient.Schema.Create(context.Background())
	logger.LogFatalOnErr(err, "Migrating ENT Database")

	refreshMaterializedViews(ctx)
}

//go:embed 00_init_search_index.sql
var f embed.FS

// Custom function beyond what Ent offers to drop and recreate our Materialized views
func refreshMaterializedViews(ctx context.Context) (string, error) {
	_, log := logger.LogFor(ctx)
	log.Debug().Msg("Loading SQL migrations for Materialized Views")

	ts_migration, _ := f.ReadFile("00_init_search_index.sql")

	if _, err := dbConnection.DB().Exec(string(ts_migration)); err != nil {
		if !strings.Contains(err.Error(), "already exists") {
			return "", fmt.Errorf("applying ts migration: %w", err)
		}
	}
	return "Database migrated", nil
}

// func Migrate(ctx context.Context, drv *sql.Driver, dbClient *ent.Client) (string, error) {
// 	_, log := logger.LogFor(ctx)

// 	log.Debug().Msg("Running ENT Auto-migration tool")
// 	if err := dbClient.Schema.Create(ctx, schema.WithHooks(func(next schema.Creator) schema.Creator {
// 		return schema.CreateFunc(func(ctx context.Context, tables ...*schema.Table) error {
// 			var tables2 []*schema.Table
// 			for _, t := range tables {
// 				if t.Name != "search_index" {
// 					tables2 = append(tables2, t)
// 				}
// 			}
// 			return next.Create(ctx, tables2...)
// 		})
// 	})); err != nil {
// 		return "", err
// 	}
// }
