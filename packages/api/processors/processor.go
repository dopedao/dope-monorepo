package processors

import (
	"context"

	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
)

type Processor interface {
	Setup(common.Address, interface {
		ethereum.ChainReader
		bind.ContractBackend
	}) error
	SetEnt(*ent.Client)
	ProcessElement(interface{}) func(context.Context, types.Log, func(string, []interface{})) error
}
