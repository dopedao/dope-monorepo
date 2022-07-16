package main

import (
	"io/ioutil"
	"log"

	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
)

func main() {
	drv := dbprovider.Conn()

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
