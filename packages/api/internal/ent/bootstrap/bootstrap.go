package bootstrap

import (
	"embed"
	"log"

	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
)

//go:embed dopes.sql
//go:embed items.sql
//go:embed dope_items.sql
var f embed.FS

func Bootstrap() {
	drv := dbprovider.Conn()

	dopes, _ := f.ReadFile("dopes.sql")
	if _, err := drv.DB().Exec(string(dopes)); err != nil {
		log.Fatalf("Inserting dopes: %+v", err)
	}

	items, _ := f.ReadFile("items.sql")
	if _, err := drv.DB().Exec(string(items)); err != nil {
		log.Fatalf("Inserting items: %+v", err)
	}

	dopes_items, _ := f.ReadFile("dope_items.sql")
	if _, err := drv.DB().Exec(string(dopes_items)); err != nil {
		log.Fatalf("Inserting dopes_items: %+v", err)
	}
}
