package processors

import (
	"context"
	"fmt"
	"math/big"

	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
	"github.com/ethereum/go-ethereum/common"
)

type PaperProcessor struct {
	bindings.UnimplementedPaperProcessor
}

func (p *PaperProcessor) ProcessTransfer(ctx context.Context, e *bindings.PaperTransfer, tx *ent.Tx) error {
	if e.From != (common.Address{}) {
		if err := tx.Wallet.UpdateOneID(e.From.Hex()).AddPaper(schema.BigInt{Int: new(big.Int).Neg(e.Value)}).Exec(ctx); err != nil {
			return fmt.Errorf("update from wallet: %w", err)
		}
	}

	if e.To != (common.Address{}) {
		if err := tx.Wallet.Create().
			SetID(e.To.Hex()).
			SetPaper(schema.BigInt{Int: e.Value}).
			OnConflictColumns(wallet.FieldID).
			Update(func(w *ent.WalletUpsert) {
				w.AddPaper(schema.BigInt{Int: e.Value})
			}).Exec(ctx); err != nil {
			return fmt.Errorf("update to wallet: %w", err)
		}
	}

	if e.From == (common.Address{}) {
		loot, err := p.Contract.Loot(nil)
		if err != nil {
			return fmt.Errorf("getting loot address: %w", err)
		}

		dope, err := bindings.NewDope(loot, p.Eth)
		if err != nil {
			return fmt.Errorf("initializing dope contract: %w", err)
		}

		bal, err := dope.BalanceOf(nil, e.To)
		if err != nil {
			return fmt.Errorf("getting dope balance: %w", err)
		}

		for i := 0; i < int(bal.Int64()); i++ {
			id, err := dope.TokenOfOwnerByIndex(nil, e.To, big.NewInt(int64(i)))
			if err != nil {
				return fmt.Errorf("token of owner by index: %w", err)
			}

			claimed, err := p.Contract.ClaimedByTokenId(nil, id)
			if err != nil {
				return fmt.Errorf("claimed by token id: %w", err)
			}

			if err := tx.Dope.UpdateOneID(id.String()).SetClaimed(claimed).Exec(ctx); err != nil {
				return fmt.Errorf("updating dope claimed status: %w", err)
			}
		}
	}

	return nil
}
