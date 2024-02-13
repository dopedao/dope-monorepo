package grifts

import (
	"fmt"

	"github.com/dopedao/dope-monorepo/packages/api/jobs"
	g "github.com/markbates/grift/grift"
)

var _ = g.Namespace("paper", func() {
	g.Desc("seed_wallets", "Inserts Wallet records into the DB for each Ethereum address that has ever received PAPER")
	g.Add("seed_wallets", func(c *g.Context) error {
		spw := jobs.SeedPaperWallets{}
		err := spw.Run()
		if err != nil {
			fmt.Printf("%v", err)
		}
		return nil
	})

	g.Desc("sync_balances", "Syncs PAPER Balances for all Wallets")
	g.Add("sync_balances", func(c *g.Context) error {
		sb := jobs.SeedPaperWallets{}
		err := sb.Run()
		if err != nil {
			fmt.Printf("%v", err)
		}
		pb := jobs.PaperBalances{}
		pb.Run()
		return nil
	})

	g.Desc("sync_claims", "Syncs PAPER Claim status for DOPE NFTs")
	g.Add("sync_claims", func(c *g.Context) error {
		pc := jobs.PaperClaims{}
		pc.Run()
		return nil
	})

})
