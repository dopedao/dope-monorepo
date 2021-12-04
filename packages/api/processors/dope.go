package processors

import (
	"context"
	"log"

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
}) error {
	if err := p.UnimplementedDopeProcessor.Setup(address, eth); err != nil {
		return err
	}

	return nil
}

func (p *DopeProcessor) SetEnt(client *ent.Client) {
	p.ent = client
}

func (p *DopeProcessor) ProcessTransfer(ctx context.Context, e *bindings.DopeTransfer, emit func(string, []interface{})) error {
	log.Print("got transfer event")
	return nil
}
