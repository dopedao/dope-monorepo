package grifts

import (
	"github.com/dopedao/dope-monorepo/packages/api/jobs/alchemy"

	g "github.com/markbates/grift/grift"
)

var _ = g.Namespace("hustlers", func() {
	g.Desc("sync", "Sync all Hustler tokens into database")
	g.Add("sync", func(c *g.Context) error {
		return alchemy.SyncHustlers(c)
	})
})
