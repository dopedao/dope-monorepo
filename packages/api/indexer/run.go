package indexer

import (
	"context"
	"os"
	"sync"

	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/rs/zerolog"
)

func Run() {
	log := zerolog.New(os.Stderr)
	ctx := context.Background()
	var wg sync.WaitGroup
	for _, conf := range Config[envcfg.Network] {
		switch conf := conf.(type) {
		case EthConfig:
			log.Debug().Msgf("Starting %v", conf)

			eth := NewEthereumIndexer(
				log.WithContext(ctx),
				dbprovider.Ent(),
				conf)

			wg.Add(1)
			go func() {
				defer wg.Done()
				eth.Sync(log.WithContext(ctx))
			}()
		}
	}
	wg.Wait()
}
