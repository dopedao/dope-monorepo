package processors

import (
	"context"
	"fmt"
	"math/big"

	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
	"github.com/ethereum/go-ethereum/common"
)

type PaperProcessor struct {
	bindings.UnimplementedPaperProcessor
	ent *ent.Client
}

func (p *PaperProcessor) SetEnt(client *ent.Client) {
	p.ent = client
}

func (p *PaperProcessor) ProcessTransfer(ctx context.Context, e *bindings.PaperTransfer, emit func(string, []interface{})) error {
	if e.From != (common.Address{}) {
		if err := p.ent.Wallet.UpdateOneID(e.From.String()).AddPaper(schema.BigInt{Int: new(big.Int).Neg(e.Value)}).Exec(ctx); err != nil {
			return fmt.Errorf("update from wallet: %w", err)
		}
	}

	if e.To != (common.Address{}) {
		if err := p.ent.Wallet.Create().
			SetID(e.To.String()).
			SetPaper(schema.BigInt{Int: e.Value}).
			OnConflict().
			Update(func(w *ent.WalletUpsert) {
				w.AddPaper(schema.BigInt{Int: e.Value})
			}).Exec(ctx); err != nil {
			return fmt.Errorf("update to wallet: %w", err)
		}
	}

	return nil
}
