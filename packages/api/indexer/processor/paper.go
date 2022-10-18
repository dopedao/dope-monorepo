package processor

import (
	"context"
	"fmt"
	"math/big"

	"github.com/dopedao/dope-monorepo/packages/api/internal/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/wallet"
	"github.com/ethereum/go-ethereum/common"
)

type PaperProcessor struct {
	bindings.BasePaperProcessor
}

func (p *PaperProcessor) ProcessTransfer(ctx context.Context, e bindings.PaperTransfer) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error {
		if e.To != (common.Address{}) {
			bal, err := p.Contract.BalanceOf(nil, e.To)
			if err != nil {
				return fmt.Errorf("PAPER getting to wallet %s balance at txn %s: %w", e.To.Hex(), e.Raw.TxHash.Hex(), err)
			}

			if err := tx.Wallet.Create().
				SetID(e.To.Hex()).
				SetPaper(schema.BigInt{Int: bal}).
				OnConflictColumns(wallet.FieldID).
				SetPaper(schema.BigInt{Int: bal}).
				Exec(ctx); err != nil {
				return fmt.Errorf("PAPER update to wallet %s at txn %s: %w", e.To.Hex(), e.Raw.TxHash.Hex(), err)
			}
		}

		if e.From != (common.Address{}) {
			bal, err := p.Contract.BalanceOf(nil, e.From)
			if err != nil {
				return fmt.Errorf("PAPER getting from wallet %s balance at txn %s: %w", e.From.Hex(), e.Raw.TxHash.Hex(), err)
			}

			if err := tx.Wallet.Create().
				SetID(e.From.Hex()).
				SetPaper(schema.BigInt{Int: bal}).
				OnConflictColumns(wallet.FieldID).
				SetPaper(schema.BigInt{Int: bal}).
				Exec(ctx); err != nil {
				return fmt.Errorf("PAPER update from wallet %s at txn %s: %w", e.From.Hex(), e.Raw.TxHash.Hex(), err)
			}
		}

		if e.From == (common.Address{}) {
			loot, err := p.Contract.Loot(nil)
			if err != nil {
				return fmt.Errorf("PAPER getting loot address: %w", err)
			}

			dope, err := bindings.NewDope(loot, p.Eth)
			if err != nil {
				return fmt.Errorf("PAPER initializing dope contract: %w", err)
			}

			bal, err := dope.BalanceOf(nil, e.To)
			if err != nil {
				return fmt.Errorf("PAPER getting dope balance: %w", err)
			}

			for i := 0; i < int(bal.Int64()); i++ {
				id, err := dope.TokenOfOwnerByIndex(nil, e.To, big.NewInt(int64(i)))
				if err != nil {
					return fmt.Errorf("PAPER token of owner by index: %w", err)
				}

				claimed, err := p.Contract.ClaimedByTokenId(nil, id)
				if err != nil {
					return fmt.Errorf("PAPER claimed by token id: %w", err)
				}

				if err := tx.Dope.UpdateOneID(id.String()).SetClaimed(claimed).Exec(ctx); err != nil {
					return fmt.Errorf("PAPER updating dope claimed status: %w", err)
				}
			}
		}

		return nil
	}, nil
}
