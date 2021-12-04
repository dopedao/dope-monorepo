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

const blockLimit = 2000

type EthClient interface {
	bind.ContractBackend
	ethereum.ChainReader
	ChainID(ctx context.Context) (*big.Int, error)
	BlockNumber(ctx context.Context) (uint64, error)
}

type Processor interface {
	Setup(common.Address, interface {
		bind.ContractBackend
		ethereum.ChainReader
	}) error
	SetEnt(*ent.Client)
	Initialize(context.Context, uint64, func(string, []interface{})) error
	ProcessElement(interface{}) func(context.Context, types.Log, func(string, []interface{})) error
}

type Contract struct {
	Address    common.Address
	StartBlock uint64
	Interface  reflect.Type
}

type Config struct {
	Interval  time.Duration
	Contracts []Contract
}

type SyncingContract struct {
	Address   common.Address
	Processor Processor
	LastBlock uint64
}

type Engine struct {
	sync.Mutex
	latest    uint64
	ent       *ent.Client
	eth       EthClient
	ticker    *time.Ticker
	contracts []SyncingContract
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
		p, ok := reflect.New(contract.Interface).Interface().(Processor)
		if !ok {
			log.Fatal("Reflecting processor type.")
		}
		if err := p.Setup(contract.Address, eth); err != nil {
			log.Fatal("Setting up processor.")
		}
		p.SetEnt(ent)
		e.contracts = append(e.contracts, SyncingContract{contract.Address, p, contract.StartBlock - 1})
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
				_from := c.LastBlock + 1
				for {
					_to := Min(latest, _from+blockLimit)

					logs, err := e.eth.FilterLogs(ctx, ethereum.FilterQuery{
						FromBlock: new(big.Int).SetUint64(c.LastBlock),
						ToBlock:   new(big.Int).SetUint64(_to),
						Addresses: []common.Address{c.Address},
					})
					if err != nil {
						log.Fatalf("Filtering logs: %+v.", err)
						return
					}

					for _, l := range logs {
						if err := c.Processor.ProcessElement(c.Processor)(ctx, l, nil); err != nil {
							log.Fatalf("Processing element: %+v.", err)
							return
						}
					}

					_from = _to + 1

					if _to == latest {
						c.LastBlock = latest
						return
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
