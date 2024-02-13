package indexer

import (
	"context"
	"sync"

	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
)

func Run() {
	logger.Init()
	ctx := context.Background()
	var wg sync.WaitGroup
	for _, conf := range Config[envcfg.Network] {
		switch conf := conf.(type) {
		case EthConfig:
			logger.Log.Info().Msgf("Starting %v", conf)

			eth := NewEthereumIndexer(
				logger.Log.WithContext(ctx),
				dbprovider.Ent(),
				conf)

			wg.Add(1)
			go func() {
				defer wg.Done()
				eth.Sync(logger.Log.WithContext(ctx))
			}()
		}
	}
	wg.Wait()
}
