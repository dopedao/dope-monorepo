package grifts

import (
	"fmt"

	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	b "github.com/dopedao/dope-monorepo/packages/api/internal/ent/bootstrap"
	g "github.com/markbates/grift/grift"
)

var _ = g.Namespace("db", func() {
	g.Desc("bootstrap", "Boostraps the database using ENT models. DOES NOT SET EVERYTHING SEE COMMENTS ON THIS METHOD")
	g.Add("bootstrap", func(c *g.Context) error {
		fmt.Println("BOOTSTRAPPING DATABASE")
		b.Bootstrap()
		g.Run("paper:seed_wallets", c)
		g.Run("gear:set_metrics", c)
		g.Run("gear:sync_claims", c)
		// WARNING TODO:
		//
		// This does not set everything, like the "sprite sheet" for each body_part
		// in the system. There is a separate script that does that.
		//
		// THINGS WILL BREAK IF YOU RUN THIS WITHOUT RUNNING THAT SCRIPT
		// Meaning, our MMO might not show characters, or the website "flex"
		// page might not show an animation at all.
		//
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
		g.Run("db:bootstrap", c)
		return nil
	})
})
