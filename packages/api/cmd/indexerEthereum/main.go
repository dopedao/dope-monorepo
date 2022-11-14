package main

import (
	"context"
	"os"
	"sync"

	"github.com/dopedao/dope-monorepo/packages/api/indexer"
	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/rs/zerolog"
)

// Go Ethereum indexer for running from command line
// without the HTTP server wrapping necessary for deploying to GCP.
//
// At some point if we make a Cloud Run Docker container it should call
// this instead of the cmd/indexServer program
func main() {
	log := zerolog.New(os.Stderr)
	ctx := context.Background()
	var wg sync.WaitGroup
	for _, c := range indexer.Config[envcfg.Network] {
		switch c := c.(type) {
		case indexer.EthConfig:
			log.Debug().Msgf("Starting %v", c)
			eth := indexer.NewEthereumIndexer(ctx, dbprovider.Ent(), c)
			go eth.Sync(log.WithContext(ctx))
			wg.Add(1)
		}
	}
	wg.Wait()
}
