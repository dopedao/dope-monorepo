package grifts

import (
	"fmt"

	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	b "github.com/dopedao/dope-monorepo/packages/api/internal/ent/bootstrap"
	g "github.com/markbates/grift/grift"
)

var _ = g.Namespace("db", func() {
	g.Desc("bootstrap", "Boostraps the database using ENT models")
	g.Add("bootstrap", func(c *g.Context) error {
		b.Bootstrap()
		g.Run("paper:seed_wallets", c)
		// g.Run("hustlers:sync", c)
		return nil
	})

	g.Desc("reset", "DANGER - Drops and recreates the database using ENT models and seeds data")
	g.Add("reset", func(c *g.Context) error {
		fmt.Println("DROPPING DATABASE")
		_, err := dbprovider.Conn().DB().Exec("DROP SCHEMA public CASCADE; CREATE SCHEMA public;")
		if err != nil {
			return err
		}
		dbprovider.RunMigration(c)
		dbprovider.RefreshMaterializedViews(c)
		fmt.Println("BOOTSTRAPPING DATABASE")
		g.Run("db:bootstrap", c)
		return nil
	})
})
