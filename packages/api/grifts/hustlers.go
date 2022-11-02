package grifts

import (
	g "github.com/markbates/grift/grift"
)

var _ = g.Namespace("hustlers", func() {
	g.Desc("sync", "Sync Hustler owners")
	g.Add("sync", func(c *g.Context) error {
		return nil
	})
})
