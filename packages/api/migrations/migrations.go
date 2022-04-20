package migrations

import (
	"context"
	"fmt"
	"os"
	"strings"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/schema"
	"github.com/dopedao/dope-monorepo/packages/api/common"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
)

func Migrate(ctx context.Context, drv *sql.Driver, dbClient *ent.Client) (string, error) {
	if err := dbClient.Schema.Create(ctx, schema.WithHooks(func(next schema.Creator) schema.Creator {
		return schema.CreateFunc(func(ctx context.Context, tables ...*schema.Table) error {
			var tables2 []*schema.Table
			for _, t := range tables {
				// Remove search_index since it is a materialized view
				if t.Name != "search_index" {
					tables2 = append(tables2, t)
				}
			}
			return next.Create(ctx, tables2...)
		})
	})); err != nil {
		return "", err
	}
	ts_migration, err := os.ReadFile("migrations/00_init_search_index.sql")
	common.LogFatalOnErr(err, "Couldn't read migration file")

	if _, err := drv.DB().Exec(string(ts_migration)); err != nil {
		if !strings.Contains(err.Error(), "already exists") {
			return "", fmt.Errorf("applying ts migration: %w", err)
		}
	}
	return "Database migrated", nil
}
