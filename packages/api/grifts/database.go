package grifts

import (
	b "github.com/dopedao/dope-monorepo/packages/api/internal/ent/bootstrap"
	g "github.com/markbates/grift/grift"
)

var _ = g.Namespace("db", func() {
	g.Desc("bootstrap", "Boostraps the database using ENT models")
	g.Add("bootstrap", func(c *g.Context) error {
		b.Bootstrap()
		return nil
	})

})
