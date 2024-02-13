package grifts

import (
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/jobs"
	g "github.com/markbates/grift/grift"
)

var _ = g.Namespace("reservoir", func() {
	g.Desc("set_prices", "Fills the database with the best token prices from Reservoir for DOPE, HUSTLERS, and GEAR denominated in ETH")
	g.Add("set_prices", func(c *g.Context) error {
		logger.Init()
		setPrices := jobs.SetBestTokenPrices{}
		setPrices.Run()
		return nil
	})

	g.Desc("check_owners", "Checks ownership of NFTs in system set by our indexer versus the Reservoir API.")
	g.Add("check_owners", func(c *g.Context) error {
		logger.Init()
		check := jobs.CheckTokenOwners{}
		check.Run()
		return nil
	})
})
