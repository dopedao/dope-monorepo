package api

import (
	"context"
	"log"
	"math/big"
	"sync"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/syncstate"
	"github.com/dopedao/dope-monorepo/packages/api/processors"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/hashicorp/go-retryablehttp"
)

const blockLimit = 2000

type EthClient interface {
	bind.ContractBackend
	ethereum.ChainReader
	ChainID(ctx context.Context) (*big.Int, error)
	BlockNumber(ctx context.Context) (uint64, error)
}

type Contract struct {
	Address    common.Address
	StartBlock uint64
	Processor  processors.Processor
}

type Config struct {
	RPC       string
	Interval  time.Duration
	Contracts []Contract
}

type Engine struct {
	sync.Mutex
	latest    uint64
	ent       *ent.Client
	eth       EthClient
	ticker    *time.Ticker
	contracts []Contract
}

func NewEngine(client *ent.Client, config Config) *Engine {
	retryableHTTPClient := retryablehttp.NewClient()
	retryableHTTPClient.Logger = nil
	c, err := rpc.DialHTTPWithClient(config.RPC, retryableHTTPClient.StandardClient())
	if err != nil {
		log.Fatal("Dialing ethereum rpc.") //nolint:gocritic
	}

	eth := ethclient.NewClient(c)

	e := &Engine{
		ent:    client,
		eth:    eth,
		ticker: time.NewTicker(config.Interval),
	}

	ctx := context.Background()
	for _, c := range config.Contracts {
		s, err := client.SyncState.Get(ctx, c.Address.Hex())
		if err != nil && !ent.IsNotFound(err) {
			log.Fatalf("Fetching sync state: %+v.", err)
		} else if err == nil {
			c.StartBlock = s.StartBlock
		}

		if err := c.Processor.Setup(c.Address, eth); err != nil {
			log.Fatal("Setting up processor.")
		}

		e.contracts = append(e.contracts, c)
	}

	return e
}

func (e *Engine) Sync(ctx context.Context) {
	defer e.ticker.Stop()

	for {
		select {
		case <-e.ticker.C:
			latest, err := e.eth.BlockNumber(ctx)
			if err != nil {
				log.Printf("Getting latest block number: %v", err)
				continue
			}

			e.Lock()
			e.latest = latest

			for _, c := range e.contracts {
				log.Printf("Syncing %s from %d to %d.", c.Address.Hex(), c.StartBlock, latest)
				_from := c.StartBlock
				for {
					_to := Min(latest, _from+blockLimit)

					logs, err := e.eth.FilterLogs(ctx, ethereum.FilterQuery{
						FromBlock: new(big.Int).SetUint64(c.StartBlock),
						ToBlock:   new(big.Int).SetUint64(_to),
						Addresses: []common.Address{c.Address},
					})
					if err != nil {
						log.Fatalf("Filtering logs: %+v.", err)
					}

					if err := ent.WithTx(ctx, e.ent, func(tx *ent.Tx) error {
						for _, l := range logs {
							if err := c.Processor.ProcessElement(c.Processor)(ctx, l, tx); err != nil {
								return err
							}
						}
						return nil
					}); err != nil {
						log.Fatalf("Processing element: %+v.", err)
					}

					_from = _to + 1

					if err := e.ent.SyncState.
						Create().
						SetID(c.Address.Hex()).
						SetStartBlock(_from).
						OnConflictColumns(syncstate.FieldID).
						UpdateStartBlock().
						Exec(ctx); err != nil {
						log.Fatalf("Updating sync state: %+v.", err)
					}

					if _to == latest {
						c.StartBlock = _from
						break
					}
				}
			}
			e.Unlock()

		case <-ctx.Done():
			return
		}
	}
}

func Min(x, y uint64) uint64 {
	if x < y {
		return x
	}
	return y
}
