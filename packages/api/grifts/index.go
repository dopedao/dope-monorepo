package grifts

import (
	"github.com/dopedao/dope-monorepo/packages/api/indexer"
	g "github.com/markbates/grift/grift"
)

var _ = g.Desc("index", "Run the Ethereum / Optimism indexer")
var _ = g.Add("index", func(c *g.Context) error {
	indexer.Run()
	return nil
})
