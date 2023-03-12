package grifts

import (
	"github.com/dopedao/dope-monorepo/packages/api/jobs"

	g "github.com/markbates/grift/grift"
)

var _ = g.Namespace("hustlers", func() {
	g.Desc("sync", "Sync all Hustler tokens into database from the blockchain")
	g.Add("sync", func(c *g.Context) error {
		jobs.SyncHustlers()
		return nil
	})

	g.Desc("fix_images", "Tries to render SVG images off-chain for hustlers who have none")
	g.Add("fix_images", func(c *g.Context) error {
		jobs.FixHustlerImages()
		return nil
	})
})
