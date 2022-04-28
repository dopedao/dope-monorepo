package processor

import (
	"context"

	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
)

type Processor interface {
	Setup(common.Address, interface {
		ethereum.ChainReader
		ethereum.ChainStateReader
		ethereum.TransactionReader
		bind.ContractBackend
	}) error
	ProcessElement(interface{}) func(context.Context, types.Log) (func(*ent.Tx) error, error)
}
