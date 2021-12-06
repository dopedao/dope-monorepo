package processors

import (
	"context"

	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
)

type DopeProcessor struct {
	bindings.UnimplementedDopeProcessor
	ent *ent.Client
}

func (p *DopeProcessor) SetEnt(client *ent.Client) {
	p.ent = client
}

func (p *DopeProcessor) ProcessTransfer(ctx context.Context, e *bindings.DopeTransfer, emit func(string, []interface{})) error {
	if err := p.ent.Wallet.Create().SetID(e.To.Hex()).OnConflict().DoNothing().Exec(ctx); err != nil {
		return err
	}

	if err := p.ent.Dope.UpdateOneID(e.TokenId.String()).SetWalletID(e.To.Hex()).Exec(ctx); err != nil {
		return err
	}

	return nil
}
