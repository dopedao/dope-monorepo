package grifts

import (
	"github.com/dopedao/dope-monorepo/packages/api/jobs"

	g "github.com/markbates/grift/grift"
)

var _ = g.Namespace("listings", func() {
	g.Desc("sync", "Synchronize sales listings from OpenSea")
	g.Add("sync", func(c *g.Context) error {
		jobs.OpenSeaListings()
		return nil
	})
})
