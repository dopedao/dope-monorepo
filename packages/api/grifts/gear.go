package grifts

import (
	g "github.com/markbates/grift/grift"
)

var _ = g.Namespace("gear", func() {
	g.Desc("sync_claims", "Sync the GEAR CLAIM status of every DOPE NFT")
	g.Add("sync_claims", func(c *g.Context) error {
		return nil
	})

	g.Desc("set_metrics", "Set rarity metrics of all Gear in the database")
	g.Add("set_metrics", func(c *g.Context) error {
		return nil
	})
})
