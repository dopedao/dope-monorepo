package indexer

import (
	"context"
	"fmt"
	"math/big"
	"sync"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/indexer/processor"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/syncstate"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/hashicorp/go-retryablehttp"
	"github.com/rs/zerolog/log"
	"github.com/withtally/synceth/engine"
)

const blockLimit = 500

type Contract struct {
	Name       string
	Address    common.Address
	StartBlock uint64
	Processor  processor.Processor
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
	eth       engine.Client
	ticker    *time.Ticker
	contracts []*Contract
}

// Reads information from Ethereum and Optimism blockchains
// and attempts to persist information about DOPE, PAPER, HUSTLERS, and GEAR
func NewEthereumIndexer(ctx context.Context, entClient *ent.Client, config EthConfig) *Ethereum {
	ctx, log := logger.LogFor(ctx)

	retryableHTTPClient := retryablehttp.NewClient()
	retryableHTTPClient.Logger = nil
	c, err := rpc.DialHTTPWithClient(config.RPC, retryableHTTPClient.StandardClient())
	if err != nil {
		log.Fatal().Msg("Dialing ethereum rpc.") //nolint:gocritic
	}

	log.Info().Msgf("Starting client for %v", c)
	eth := ethclient.NewClient(c)

	e := &Ethereum{
		ent:    entClient,
		eth:    eth,
		ticker: time.NewTicker(config.Interval),
	}

	for _, c := range config.Contracts {
		fmt.Println(c.Name)
		c := c
		log.Info().Msgf("Get SyncState for %v", c.Name)
		s, err := entClient.SyncState.Get(ctx, c.Address.Hex())
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

func eventLogCommitter(ctx context.Context, c *Contract, l types.Log, committer func(tx *ent.Tx) error) func(tx *ent.Tx) error {
	return func(tx *ent.Tx) error {
		id := fmt.Sprintf("%s-%s-%d", c.Address.Hex(), l.TxHash.Hex(), l.Index)
		if _, err := tx.Event.Get(ctx, id); err != nil {
			if ent.IsNotFound(err) {
				if err := tx.Event.Create().
					SetID(id).
					SetAddress(c.Address).
					SetHash(l.TxHash).
					SetIndex(uint64(l.Index)).
					Exec(ctx); err != nil {
					return fmt.Errorf("eventLogCommitter: creating event log %s: %w", id, err)
				}

				return committer(tx)
			}

			return fmt.Errorf("eventLogCommitter: getting event log %s: %w", id, err)
		}
		log.Warn().Msgf("eventLogCommitter: duplicate event log %s", id)
		return nil
	}
}

func (e *Ethereum) Sync(ctx context.Context) {
	ctx, log := logger.LogFor(ctx)

	defer e.ticker.Stop()

	for {
		select {
		case <-e.ticker.C:
			e.Lock()
			latest, err := e.eth.BlockNumber(ctx)
			if err != nil {
				log.Err(err).Msg("Getting latest block number.")
				continue
			}

			e.latest = latest
			numUpdates := 0
			var wg sync.WaitGroup
			for _, contract := range e.contracts {
				go syncContract(ctx, contract, e, &numUpdates)
				wg.Add(1)
			}
			wg.Wait()
			e.Unlock()

			if numUpdates > 0 {
				if err := e.ent.RefreshSearchIndex(ctx); err != nil {
					log.Err(err).Msgf("Refreshing search index.")
				}
			}
			numUpdates = 0

		case <-ctx.Done():
			return
		}
	}
}

func syncContract(ctx context.Context, c *Contract, e *Ethereum, numUpdates *int) {
	_from := c.StartBlock
	for {
		_to := Min(e.latest, _from+blockLimit)

		if _from > _to {
			// No new blocks
			break
		}

		log.Info().Msgf("Indexing %s from %d to %d.", c.Name, _from, _to)

		logs, err := e.eth.FilterLogs(ctx, ethereum.FilterQuery{
			FromBlock: new(big.Int).SetUint64(_from),
			ToBlock:   new(big.Int).SetUint64(_to),
			Addresses: []common.Address{c.Address},
		})
		if err != nil {
			log.Fatal().Err(err).Msg("Filtering logs.")
		}

		var committers []func(*ent.Tx) error
		for _, l := range logs {
			committer, err := c.Processor.ProcessElement(c.Processor)(ctx, l)
			if err != nil {
				// Commented out so we don't crash the indexer on every mis-process
				// log.Fatal().Err(err).Msgf("Processing element %s.", l.TxHash.Hex())
				log.Err(err).Msgf(
					"Contract %s error processing tx hash %s.", c.Address, l.TxHash.Hex())
				break
			}

			if committer == nil {
				// Event log not handled
				continue
			}
			commitFunc := eventLogCommitter(ctx, c, l, committer)
			committers = append(committers, commitFunc)
		}

		_from = _to + 1
		log.Debug().
			Msgf("%v - Processed %v", c.Name, _to)

		if err := ent.WithTx(ctx, e.ent, func(tx *ent.Tx) error {
			log.Debug().Msgf("%v - Committing %v changes", c.Name, len(committers))
			for _, c := range committers {
				if err := c(tx); err != nil {
					return err
				}
			}

			log.Debug().Msgf("%v - Updating sync state %v", c.Name, _from)
			if err := tx.SyncState.
				Create().
				SetID(c.Address.Hex()).
				SetStartBlock(_from).
				OnConflictColumns(syncstate.FieldID).
				UpdateStartBlock().
				Exec(ctx); err != nil {
				return fmt.Errorf("updating sync state: %w", err)
			}

			*numUpdates += len(committers)

			return nil
		}); err != nil {
			log.Err(err).Msgf("%s - FAIL Indexing contract", c.Name)
			break
		}

		if _to == e.latest {
			c.StartBlock = _from
			break
		}
	}
}

func Min(x, y uint64) uint64 {
	if x < y {
		return x
	}
	return y
}
