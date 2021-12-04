package processors

import (
	"context"

	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
)

type DopeProcessor struct {
	bindings.UnimplementedDopeProcessor
	ent *ent.Client
}

func (p *DopeProcessor) Setup(address common.Address, eth interface {
	bind.ContractBackend
	ethereum.ChainReader
}, ent *ent.Client) error {
	if err := p.UnimplementedDopeProcessor.Setup(address, eth); err != nil {
		return err
	}

	p.ent = ent
	return nil
}

func (p *DopeProcessor) ProcessTransfer(ctx context.Context, e *bindings.DopeTransfer, emit func(string, []interface{})) error {
	return nil
}
