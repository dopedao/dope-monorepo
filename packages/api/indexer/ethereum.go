package indexer

import (
	"context"
	"errors"
	"fmt"
	"math/big"
	"sort"
	"sync"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/indexer/utils"
	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/event"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/syncstate"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	svgrender "github.com/dopedao/dope-monorepo/packages/api/internal/svg-render"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/hashicorp/go-retryablehttp"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"github.com/withtally/synceth/engine"
	"golang.org/x/sync/errgroup"
)

// Adjusting this will get more or less information to sync per interval
// 2000 is the upper limit that Alchemy allows us to sync per request.
//
// Setting this too high can cause re-work if the indexer falls over,
// and SyncState isn't persisted to the database.
//
// Setting this too low can cause the indexer to fall behind.
const BLOCK_LIMIT = 1250

// Maximum number of go routines to run in parallel,
// this is to prevent the indexer from overloading the database.
const MAX_GO_ROUTINES = 256

// Reads information from Ethereum and Optimism blockchains
// and attempts to persist information about DOPE, PAPER, HUSTLERS, and GEAR
func NewEthereumIndexer(ctx context.Context, entClient *ent.Client, config EthConfig) *Ethereum {

	log := logger.Log.
		With().
		Str("method", "NewEthereumIndexer").
		Logger()

	retryableHTTPClient := retryablehttp.NewClient()
	retryableHTTPClient.Logger = nil
	c, err := rpc.DialHTTPWithClient(config.RPC, retryableHTTPClient.StandardClient())
	if err != nil {
		log.Fatal().Msg("Dialing ethereum rpc.") //nolint:gocritic
	}

	if err := svgrender.InitRenderer(); err != nil {
		log.Fatal().Msg("Initializing svg-renderer")
	}

	log.Info().Msgf("Starting client for %v", c)
	eth := ethclient.NewClient(c)

	e := &Ethereum{
		ent:    entClient,
		eth:    eth,
		ticker: time.NewTicker(config.Interval),
	}

	for i := range config.Contracts {
		c := &config.Contracts[i]
		log.Info().
			Str("contract_name", c.Name).
			Msg("Get SyncState")
		s, err := entClient.SyncState.Get(ctx, c.Address.Hex())
		if err != nil && !ent.IsNotFound(err) {
			log.Fatal().Err(err).Msg("Fetching sync state.")
		} else if err == nil {
			c.StartBlock = s.StartBlock
		}

		if err := c.Processor.Setup(c.Address, eth); err != nil {
			log.Fatal().Msg("Setting up processor.")
		}
		e.contracts = append(e.contracts, c)
	}

	return e
}

func eventLogCommitter(
	ctx context.Context,
	c *Contract,
	l types.Log,
	committer func(tx *ent.Tx) error,
) func(tx *ent.Tx) error {
	log := logger.Log.With().
		Str("method", "eventLogCommitter").
		Logger()

	return func(tx *ent.Tx) error {
		id := fmt.Sprintf("%s-%s-%d", c.Address.Hex(), l.TxHash.Hex(), l.Index)
		// There's a unique index on the event table, so
		// we need to check ID and the combo columns for that index.
		if _, err := tx.Event.
			Query().
			Where(
				event.Or(
					event.ID(id),
					event.And(
						event.Index(uint64(l.Index)),
						event.Hash(l.TxHash),
					),
				),
			).
			Only(ctx); err != nil {
			if ent.IsNotFound(err) {
				log.Debug().
					Str("contract_name", c.Name).
					Str("event_log_id", id).
					Str("tx_hash", l.TxHash.Hex()).
					Msg("Creating event log")
				if err := tx.Event.Create().
					SetID(id).
					SetAddress(c.Address).
					SetHash(l.TxHash).
					SetIndex(uint64(l.Index)).
					OnConflictColumns(event.FieldID).
					DoNothing().
					Exec(ctx); err != nil {
					return fmt.Errorf("%v - eventLogCommitter: creating event log %s: %w", c.Name, id, err)
				}

				return committer(tx)
			}

			return fmt.Errorf("%v - eventLogCommitter: getting event log %s: %w", c.Name, id, err)
		}
		log.Warn().
			Str("contract_name", c.Name).
			Str("event_log_id", id).
			Msg("Duplicate event log")

		return committer(tx)
	}
}

func (e *Ethereum) Sync(ctx context.Context) {
	log := logger.Log.With().Str("method", "Sync").Logger()

	defer e.ticker.Stop()
	var runningContractAddresses sync.Map

	for {
		select {
		case <-e.ticker.C:
			latest, err := e.eth.BlockNumber(ctx)
			// log.Debug().Msgf("Latest block number %v", latest)
			if err != nil {
				log.Warn().Err(err).Msg("Getting latest block number.")
				continue
			}

			e.latest = latest

			for _, contract := range e.contracts {
				// Check if another goroutine is already running for the same contract
				if _, ok := runningContractAddresses.Load(contract.Address); ok {
					log.Warn().Msgf("Skipping sync for contract %v, another goroutine is already running", contract.Name)
					continue
				}
				// if one worker gets stuck, we want to restart it
				timeoutCtx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
				defer cancel()
				eg, _ := errgroup.WithContext(timeoutCtx)

				// Mark the contract as running
				runningContractAddresses.Store(contract.Address, true)
				func(contract *Contract) { // closure 4 errgroup
					eg.Go(func() error {
						// Remove the contract from the running contracts map
						defer runningContractAddresses.Delete(contract.Address)
						syncErr := syncContract(ctx, contract, e)
						if syncErr != nil {
							return syncErr
						}
						return nil
					})
				}(contract)
				if err := eg.Wait(); err != nil {
					log.Error().
						Err(err).
						Str("contract_name", contract.Name).
						Msgf("Error syncing contract\n%v", err)
				}
			}

		case <-ctx.Done():
			log.Warn().Msg("Context done.")
			return
		}
	}
}

type CommitterWithTxIndex struct {
	TxIndex uint
	Func    func(*ent.Tx) error
}

func syncContract(ctx context.Context, contract *Contract, e *Ethereum) error {
	_from := contract.StartBlock

	// We run processors in parallel using goroutines but
	// have to commit in sequence for data integrity if we
	// for instance, have 2 items transferred in the same block.
	var committersByBlock map[uint64][]CommitterWithTxIndex

	for {
		// Grab latest block because the chain keeps moving
		_to := Min(e.latest-1, _from+BLOCK_LIMIT)
		// reset the map
		committersByBlock = make(map[uint64][]CommitterWithTxIndex)
		ctx, log := decoratedLogger(ctx, contract, e.latest, _from, _to, e.eth)

		// Buffer to avoid blocking on frequent updates
		semSyncState := make(chan struct{}, 5)
		var wgSyncState sync.WaitGroup

		// How we break from the loop
		if _from > _to {
			// log.Debug().
			// 	Str("contract_name", contract.Name).
			// 	Msgf("No new events for %s: _from %v > _to %v", contract.Name, _from, _to)
			bufferedUpdateSyncStateForContract(
				ctx, contract, _to, e, semSyncState, &wgSyncState)
			return nil
		}

		completePct := float64(_to) / float64(e.latest) * 100
		log.Info().
			Msgf("%v - %.2f%% - Filtering logs _from %v _to %v latest %v", contract.Name, completePct, _from, _to, e.latest)
		logs, err := e.eth.FilterLogs(ctx, ethereum.FilterQuery{
			FromBlock: new(big.Int).SetUint64(_from),
			ToBlock:   new(big.Int).SetUint64(_to),
			Addresses: []common.Address{contract.Address},
		})
		if err != nil {
			log.Fatal().Err(err).Msg("Filtering logs.")
		}

		eg := errgroup.Group{}
		eg.SetLimit(MAX_GO_ROUTINES)
		committersMutex := &sync.Mutex{}

		// Run processors for each log entry in parallel
		// then store them in a map to commit sequentially later.
		//
		// Do the heavy work in the processor, light work in the committer.
		for _, logEntry := range logs {
			func(l types.Log) {
				eg.Go(func() error {
					if contract.Processor == nil {
						log.Warn().
							Str("contract_name", contract.Name).
							Str("event_log_id", l.TxHash.Hex()).
							Msg("Event unhandled.")
						return nil
					}
					committer, err := contract.Processor.
						ProcessElement(contract.Processor)(ctx, l)

					if err != nil {
						return err
					}
					// event log not handled no big deal
					if committer == nil {
						return nil
					}
					commitFunc := eventLogCommitter(ctx, contract, l, committer)
					committersMutex.Lock()
					committersByBlock[l.BlockNumber] = append(
						committersByBlock[l.BlockNumber],
						CommitterWithTxIndex{l.TxIndex, commitFunc})
					committersMutex.Unlock()
					return nil
				})
			}(logEntry)
		}

		logProcessErr := eg.Wait()
		if logProcessErr != nil {
			log.Fatal().Err(logProcessErr).Msg("Error processing logs.")
		}

		log.Debug().
			Msgf("Processed to block %v", _to)

		numContractChanges := 0

		// Sort keys from the map so we can commit sequentially
		sortedBlocks := make([]uint64, 0, len(committersByBlock))
		for k := range committersByBlock {
			sortedBlocks = append(sortedBlocks, k)
		}
		sort.Slice(sortedBlocks, func(i, j int) bool {
			return sortedBlocks[i] < sortedBlocks[j]
		})

		// Iterate committers for all blocks
		for _, blockNum := range sortedBlocks {
			committersForBlock := committersByBlock[blockNum]

			sortedCommitters := committersForBlock
			sort.Slice(sortedCommitters, func(i, j int) bool {
				return sortedCommitters[i].TxIndex < sortedCommitters[j].TxIndex
			})

			// Run commits for transactions in the block
			for _, committer := range sortedCommitters {
				txErr := retryableCommitter(ctx, e, contract, committer.Func)
				if txErr != nil {
					log.Fatal().Err(txErr).Msg("retryableCommitter")
					return txErr
				}
				numContractChanges++
			}
			contract.StartBlock = blockNum + 1

			bufferedUpdateSyncStateForContract(
				ctx, contract, blockNum, e, semSyncState, &wgSyncState)
		}
		// Done with this entire batch of logs so we can make a bigger jump.
		_from = _to + 1
		contract.StartBlock = _from
		bufferedUpdateSyncStateForContract(
			ctx, contract, _from, e, semSyncState, &wgSyncState)

		if numContractChanges > 0 {
			log.Info().
				Int("Changes", numContractChanges).
				Msgf("%s - Committed %v changes", contract.Name, numContractChanges)
			refreshSearchIndex()
		}
	}
}

var searchIdxQueue = make(chan int, 1)

func refreshSearchIndex() {
	searchIdxQueue <- 1
	// This can be slow and we don't want to wait for it to finish
	go func() {
		defer func() { <-searchIdxQueue }()
		ctx := context.Background()
		if err := dbprovider.RefreshSearchIndex(ctx); err != nil {
			log.Err(err).Msg("Refreshing search index.")
		}
	}()
}

// Writing as frequently as we do to SyncState can overload the database.
// We can buffer these updates and write them in batches to avoid this.
func bufferedUpdateSyncStateForContract(
	ctx context.Context,
	contract *Contract,
	blockNum uint64,
	e *Ethereum,
	sem chan struct{},
	wg *sync.WaitGroup) {
	// Acquire a slot from the semaphore.
	sem <- struct{}{}

	wg.Add(1)
	go func() {
		defer wg.Done()
		defer func() { <-sem }() // Release the semaphore slot when done.

		err := updateSyncStateForContract(ctx, contract, blockNum, e)
		if err != nil {
			if errors.Is(err, context.DeadlineExceeded) {
				log.Warn().Err(err).
					Msg("updateSyncStateForContract: context deadline exceeded")
			} else {
				log.Fatal().Err(err).Msg("updateSyncStateForContract")
			}
		}
	}()
}

func updateSyncStateForContract(ctx context.Context, contract *Contract, blockNum uint64, e *Ethereum) error {
	// Create a new context with a timeout of 5 seconds
	ctxWithTimeout, cancel := context.WithTimeout(ctx, 2*time.Second)
	defer cancel() // Cancel ctx as soon as we're done

	// Update SyncState blocknumber for this contract
	// so we don't have to reprocess these logs incrementally.
	// Remember – this will only update if we have committers
	// for a block.
	log.Debug().Msgf("Updating SyncState to %v", blockNum)

	blockTimeStamp, tErr := utils.EthBlockCache.GetTimestampByNumber(context.Background(), e.eth, new(big.Int).SetUint64(blockNum))
	if tErr != nil {
		logger.Log.Fatal().Msgf("Failed to get blockTo: %v", tErr)
	}
	blockTime := time.Unix(int64(blockTimeStamp), 0)

	// Use the new context with timeout
	err := dbprovider.Ent().SyncState.
		Create().
		SetID(contract.Address.Hex()).
		SetContractName(contract.Name).
		SetStartBlock(blockNum).
		SetBlockTime(blockTime).
		SetLastSyncedAt(time.Now()).
		OnConflictColumns(syncstate.FieldID).
		UpdateNewValues().
		Exec(ctxWithTimeout)
	if err != nil {
		return err
	}
	log.Info().Msgf("%v - SyncState updated to block %v @ %v", contract.Name, blockNum, blockTime)
	return nil
}

func retryableCommitter(ctx context.Context, e *Ethereum, contract *Contract, committer func(*ent.Tx) error) error {
	if committer == nil {
		return nil
	}
	maxRetries := 5
	retryInterval := time.Second

	return ent.WithTx(ctx, e.ent, func(tx *ent.Tx) error {
		var err error
		for i := 0; i < maxRetries; i++ {
			err = committer(tx)
			if err == nil {
				return nil
			}
			// This happens often if we're hammering the db with
			// multiple concurrent goroutines. Usually it can be solved
			// by waiting a bit, creating a new transaction, then trying again.
			sleepTime := retryInterval * time.Duration(i+1)

			log.Error().Err(err).
				Msgf(
					"Failed to commit transaction for %s. Retry %v after sleeping %v", contract.Name, i+1, sleepTime)
			// Create new tx to avoid "current transaction is aborted"
			tx, err = dbprovider.Ent().Tx(ctx)
			if err != nil {
				return err
			}
			time.Sleep(sleepTime)
			continue // onto the next retry after sleeping
		}
		log.Fatal().Err(err).Msgf("Failed to commit transaction for %s after maximum retries", contract.Name)
		return err
	})
}

func Min(x, y uint64) uint64 {
	if x < y {
		return x
	}
	return y
}

func decoratedLogger(ctx context.Context, contract *Contract, blockNumberLatest uint64, blockNumberFrom uint64, blockNumberTo uint64, ethClient engine.Client) (context.Context, zerolog.Logger) {
	blockFromTime, err := utils.EthBlockCache.GetTimestampByNumber(context.Background(),
		ethClient,
		new(big.Int).SetUint64(blockNumberFrom))
	if err != nil {
		logger.Log.Fatal().Msgf("Failed to get blockFrom: %v", err)
	}
	blockToTime, err := utils.EthBlockCache.GetTimestampByNumber(context.Background(),
		ethClient,
		new(big.Int).SetUint64(blockNumberTo))
	if err != nil {
		logger.Log.Fatal().Msgf("Failed to get blockTo: %v", err)
	}

	log := logger.Log.With().
		Str("method", "syncContract").
		Timestamp().
		Str("contract_name", contract.Name).
		Str("contract_address", contract.Address.Hex()).
		Str("from_block_time",
			fmt.Sprint(time.Unix(int64(blockFromTime), 0))).
		Int("from_block", int(blockNumberFrom)).
		Str("to_block_time",
			fmt.Sprint(time.Unix(int64(blockToTime), 0))).
		Int("to_block", int(blockNumberTo)).
		Int("latest_block", int(blockNumberLatest)).
		Logger()
	return ctx, log
}
