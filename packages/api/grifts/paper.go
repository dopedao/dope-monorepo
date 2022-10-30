package grifts

import (
	"github.com/dopedao/dope-monorepo/packages/api/jobs"
	g "github.com/markbates/grift/grift"
)

var _ = g.Namespace("paper", func() {
	g.Desc("sync_balances", "Syncs PAPER Balances for all wallets")
	g.Add("sync_balances", func(c *g.Context) error {
		jobs.PaperBalances()
		return nil
	})

	g.Desc("sync_claims", "Syncs PAPER Claim status for DOPE NFTs")
	g.Add("sync_claims", func(c *g.Context) error {
		jobs.PaperClaims()
		return nil
	})
})
