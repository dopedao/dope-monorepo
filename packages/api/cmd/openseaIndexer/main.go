package main

import (
	"context"

	"github.com/dopedao/dope-monorepo/packages/api/indexer"
	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
)

func main() {
	var oscfg indexer.OpenseaConfig

	for _, c := range indexer.Config[envcfg.Network] {
		switch c := c.(type) {
		case indexer.OpenseaConfig:
			oscfg = c
		}
	}

	indexer := indexer.NewOpenseaIndexer(dbprovider.Ent(), oscfg)
	indexer.Sync(context.Background())
}
