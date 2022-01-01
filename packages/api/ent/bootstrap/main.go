package main

import (
	"context"
	"io/ioutil"
	"log"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
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

	// Run the auto migration tool.
	if err := client.Schema.Create(context.Background()); err != nil {
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
