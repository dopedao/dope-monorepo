package main

import (
	"context"
	"os"

	"github.com/dopedao/dope-monorepo/packages/api/indexer"
	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/rs/zerolog"
)

func main() {
	log := zerolog.New(os.Stderr)
	ctx := context.Background()
	var oscfg indexer.EthConfig

	for _, c := range indexer.Config[envcfg.Network] {
		switch c := c.(type) {
		case indexer.EthConfig:
			oscfg = c
		}
	}

	log.Info().Msg("Starting Ethereum Indexer")

	indexer := indexer.NewEthereumIndexer(ctx, dbprovider.Ent(), oscfg)
	indexer.Sync(log.WithContext(ctx))
}
