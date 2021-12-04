package api

import (
	"context"
	"log"
	"math/big"
	"reflect"
	"sync"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/hashicorp/go-retryablehttp"
)

type EthClient interface {
	bind.ContractBackend
	ethereum.ChainReader
	ChainID(ctx context.Context) (*big.Int, error)
	BlockNumber(ctx context.Context) (uint64, error)
}

type Processor interface {
	Setup(common.Address, EthClient, *ent.Client) error
	Initialize(context.Context, uint64, func(string, []interface{})) error
	ProcessElement(interface{}) func(context.Context, types.Log, func(string, []interface{})) error
}

type Contract struct {
	Address   common.Address
	Interface reflect.Type
}

type Config struct {
	Interval  time.Duration
	Contracts []Contract
}

type Engine struct {
	sync.Mutex
	latest     uint64
	ent        *ent.Client
	eth        EthClient
	ticker     *time.Ticker
	processors []Processor
}

func NewEngine(ent *ent.Client, rpcConnStr string, config Config) *Engine {
	retryableHTTPClient := retryablehttp.NewClient()
	c, err := rpc.DialHTTPWithClient(rpcConnStr, retryableHTTPClient.StandardClient())
	if err != nil {
		log.Fatal("Dialing ethereum rpc.") //nolint:gocritic
	}

	eth := ethclient.NewClient(c)

	e := &Engine{
		ent:    ent,
		eth:    eth,
		ticker: time.NewTicker(config.Interval),
	}

	for _, contract := range config.Contracts {
		if p, ok := reflect.New(contract.Interface).Interface().(Processor); ok {
			e.processors = append(e.processors, p)
		}
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

			// TODO: sync contracts

			e.Unlock()

		case <-ctx.Done():
			return
		}
	}
}
