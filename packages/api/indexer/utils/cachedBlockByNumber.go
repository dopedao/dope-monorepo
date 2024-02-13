package utils

import (
	"context"
	"math/big"
	"sync"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/ethereum/go-ethereum"
)

// Cache of timestamps for ethereum blocks.
//
// This is used to avoid hammering the Ethereum node for timestamps
// when accessing blocks repeatedly.
//
// Implements a simple TTL cache with a background goroutine to evict
// expired entries so we don't chew up too much memory.

var EthBlockCache = NewBlockCache()
var cacheExpirationTime = time.Minute * 10

type BlockCache struct {
	mu    sync.RWMutex
	cache map[string]*CacheEntry
}

type CacheEntry struct {
	Timestamp uint64
	Expiry    time.Time
}

func NewBlockCache() *BlockCache {
	bc := &BlockCache{
		cache: make(map[string]*CacheEntry),
	}
	go bc.evictExpired()
	return bc
}

func (bc *BlockCache) evictExpired() {
	for {
		time.Sleep(time.Minute) // Evict expired entries every minute
		bc.mu.Lock()
		now := time.Now()
		for k, v := range bc.cache {
			if now.After(v.Expiry) {
				delete(bc.cache, k)
			}
		}
		bc.mu.Unlock()
	}
}

func (bc *BlockCache) GetTimestampByNumber(
	ctx context.Context,
	eth interface {
		ethereum.ChainReader
		ethereum.ChainStateReader
		ethereum.TransactionReader
	},
	blockNumber *big.Int,
) (uint64, error) {
	blockKey := blockNumber.String()

	// Check if the timestamp is already in the cache
	bc.mu.RLock()
	entry, ok := bc.cache[blockKey]
	bc.mu.RUnlock()
	if ok && time.Now().Before(entry.Expiry) {
		return entry.Timestamp, nil
	}

	// Timestamp not found in cache, fetch the block from the Ethereum node
	block, err := eth.BlockByNumber(ctx, blockNumber)
	if err != nil {
		logger.Log.Error().Err(err).Msg("Failed to get block by number")
		return 0, err
	}

	// Store the timestamp in the cache with an expiry time
	timestamp := block.Time()
	bc.mu.Lock()
	bc.cache[blockKey] = &CacheEntry{
		Timestamp: timestamp,
		Expiry:    time.Now().Add(cacheExpirationTime),
	}
	bc.mu.Unlock()

	return timestamp, nil
}
