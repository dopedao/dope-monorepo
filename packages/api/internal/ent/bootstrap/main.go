package main

import (
	"context"
	"io/ioutil"
	"log"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/schema"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/spf13/pflag"

	_ "github.com/lib/pq"
)

var pgConnstring = pflag.String("pg_connstri", "postgres://postgres:postgres@localhost:5432?sslmode=disable", "postgres db")

func main() {
	drv, err := sql.Open(dialect.Postgres, *pgConnstring)
	if err != nil {
		log.Fatalf("Connecting to drv: %+v", err) //nolint:gocritic
	}

	client := ent.NewClient(ent.Driver(drv))

	ctx := context.Background()

	// Run the auto migration tool.
	if err := client.Schema.Create(ctx, schema.WithHooks(func(next schema.Creator) schema.Creator {
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
		log.Fatalf("Migrating db: %+v", err) //nolint:gocritic
	}

	dopes, err := ioutil.ReadFile("./dopes.sql")
	if err != nil {
		log.Fatalf("Reading dopes: %+v", err) //nolint:gocritic
	}

	if _, err := drv.DB().Exec(string(dopes)); err != nil {
		log.Fatalf("Inserting dopes: %+v", err) //nolint:gocritic
	}

	items, err := ioutil.ReadFile("./items.sql")
	if err != nil {
		log.Fatalf("Reading items: %+v", err) //nolint:gocritic
	}

	if _, err := drv.DB().Exec(string(items)); err != nil {
		log.Fatalf("Inserting items: %+v", err) //nolint:gocritic
	}

	dopes_items, err := ioutil.ReadFile("./dope_items.sql")
	if err != nil {
		log.Fatalf("Reading dopes_items: %+v", err) //nolint:gocritic
	}

	if _, err := drv.DB().Exec(string(dopes_items)); err != nil {
		log.Fatalf("Inserting dopes_items: %+v", err) //nolint:gocritic
	}
}
