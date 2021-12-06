package processors

import (
	"context"
	"fmt"
	"strings"

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
		// Workaround for https://github.com/ent/ent/issues/2176
		if !strings.Contains(err.Error(), "no rows in result set") {
			return fmt.Errorf("create wallet: %w", err)
		}
	}

	if err := p.ent.Dope.UpdateOneID(e.TokenId.String()).SetWalletID(e.To.Hex()).Exec(ctx); err != nil {
		return fmt.Errorf("update dope: %w", err)
	}

	return nil
}
