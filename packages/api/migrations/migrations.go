package migrations

import (
	"context"
	"embed"
	"fmt"
	"strings"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/schema"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/util"
)

//go:embed 00_init_search_index.sql
var f embed.FS

func Migrate(ctx context.Context, drv *sql.Driver, dbClient *ent.Client) (string, error) {
	_, log := util.LogFor(ctx)

	log.Debug().Msg("Running ENT Auto-migration tool")
	if err := dbClient.Schema.Create(ctx, schema.WithHooks(func(next schema.Creator) schema.Creator {
		return schema.CreateFunc(func(ctx context.Context, tables ...*schema.Table) error {
			var tables2 []*schema.Table
			for _, t := range tables {
				if t.Name != "search_index" {
					tables2 = append(tables2, t)
				}
			}
			return next.Create(ctx, tables2...)
		})
	})); err != nil {
		return "", err
	}

	log.Debug().Msg("Loading SQL migrations for Materialized Views")

	ts_migration, _ := f.ReadFile("00_init_search_index.sql")

	if _, err := drv.DB().Exec(string(ts_migration)); err != nil {
		if !strings.Contains(err.Error(), "already exists") {
			return "", fmt.Errorf("applying ts migration: %w", err)
		}
	}
	return "Database migrated", nil
}
