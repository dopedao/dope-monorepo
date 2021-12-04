package processors

import (
	"context"

	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
)

type DopeProcessor struct {
	bindings.UnimplementedDopeProcessor
}

func (p *DopeProcessor) Setup(address common.Address, eth interface {
	ethereum.ChainReader
	bind.ContractBackend
}) error {
	if err := p.UnimplementedDopeProcessor.Setup(address, eth); err != nil {
		return err
	}

	return nil
}

func (p *DopeProcessor) ProcessTransfer(ctx context.Context, e *bindings.DopeTransfer, emit func(string, []interface{})) error {
	return nil
}
