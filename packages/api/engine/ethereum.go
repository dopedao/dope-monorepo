package engine

import (
	"context"
	"fmt"
	"math/big"
	"sync"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/base"
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

const blockLimit = 500

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

type EthConfig struct {
	RPC       string
	Interval  time.Duration
	Contracts []Contract
}

type Ethereum struct {
	sync.Mutex
	latest    uint64
	ent       *ent.Client
	eth       EthClient
	ticker    *time.Ticker
	contracts []*Contract
}

func NewEthereum(client *ent.Client, config EthConfig) *Ethereum {
	ctx, log := base.LogFor(context.Background())

	retryableHTTPClient := retryablehttp.NewClient()
	retryableHTTPClient.Logger = nil
	c, err := rpc.DialHTTPWithClient(config.RPC, retryableHTTPClient.StandardClient())
	if err != nil {
		log.Fatal().Msg("Dialing ethereum rpc.") //nolint:gocritic
	}

	eth := ethclient.NewClient(c)

	e := &Ethereum{
		ent:    client,
		eth:    eth,
		ticker: time.NewTicker(config.Interval),
	}

	for _, c := range config.Contracts {
		c := c
		s, err := client.SyncState.Get(ctx, c.Address.Hex())
		if err != nil && !ent.IsNotFound(err) {
			log.Fatal().Err(err).Msg("Fetching sync state.")
		} else if err == nil {
			c.StartBlock = s.StartBlock
		}

		if err := c.Processor.Setup(c.Address, eth); err != nil {
			log.Fatal().Msg("Setting up processor.")
		}

		e.contracts = append(e.contracts, &c)
	}

	return e
}

func (e *Ethereum) Sync(ctx context.Context) {
	ctx, log := base.LogFor(ctx)

	defer e.ticker.Stop()

	for {
		select {
		case <-e.ticker.C:
			latest, err := e.eth.BlockNumber(ctx)
			if err != nil {
				log.Err(err).Msg("Getting latest block number.")
				continue
			}

			e.Lock()
			e.latest = latest

			for _, c := range e.contracts {
				_from := c.StartBlock
				for {
					_to := Min(latest, _from+blockLimit)

					if _from > _to {
						// No new blocks
						break
					}

					log.Info().Msgf("Syncing %s from %d to %d.", c.Address.Hex(), _from, _to)

					logs, err := e.eth.FilterLogs(ctx, ethereum.FilterQuery{
						FromBlock: new(big.Int).SetUint64(_from),
						ToBlock:   new(big.Int).SetUint64(_to),
						Addresses: []common.Address{c.Address},
					})
					if err != nil {
						log.Fatal().Err(err).Msg("Filtering logs.")
					}

					_from = _to + 1

					if err := ent.WithTx(ctx, e.ent, func(tx *ent.Tx) error {
						for _, l := range logs {
							if err := tx.Event.Create().SetID(fmt.Sprintf("%s-%s-%d", c.Address.Hex(), l.TxHash.Hex(), l.Index)).SetAddress(c.Address).SetHash(l.TxHash).SetIndex(uint64(l.Index)).Exec(ctx); err != nil {
								if ent.IsConstraintError(err) {
									log.Warn().Msgf("duplicate event log %s: %+v", l.TxHash.Hex(), err)
									continue
								}

								return fmt.Errorf("creating event log %s: %w", l.TxHash.Hex(), err)
							}

							if err := c.Processor.ProcessElement(c.Processor)(ctx, l, tx); err != nil {
								return fmt.Errorf("processing element tx %s: %w", l.TxHash.Hex(), err)
							}
						}

						if err := tx.SyncState.
							Create().
							SetID(c.Address.Hex()).
							SetStartBlock(_from).
							OnConflictColumns(syncstate.FieldID).
							UpdateStartBlock().
							Exec(ctx); err != nil {
							return fmt.Errorf("updating sync state: %w", err)
						}

						return nil
					}); err != nil {
						log.Fatal().Err(err).Msg("Syncing contract.")
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
