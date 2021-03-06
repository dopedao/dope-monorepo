package processor

import (
	"context"
	"fmt"
	"strings"

	"github.com/dopedao/dope-monorepo/packages/api/internal/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/wallet"
)

type DopeProcessor struct {
	bindings.BaseDopeProcessor
}

func (p *DopeProcessor) ProcessTransfer(ctx context.Context, e bindings.DopeTransfer) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error {
		if err := tx.Wallet.
			Create().
			SetID(e.To.Hex()).
			OnConflictColumns(wallet.FieldID).
			DoNothing().
			Exec(ctx); err != nil {
			// Workaround for https://github.com/ent/ent/issues/2176
			if !strings.Contains(err.Error(), "no rows in result set") {
				return fmt.Errorf("create wallet: %w", err)
			}
		}

		if err := tx.Dope.UpdateOneID(e.TokenId.String()).SetWalletID(e.To.Hex()).Exec(ctx); err != nil {
			return fmt.Errorf("update dope id %s: %w", e.TokenId.String(), err)
		}

		return nil
	}, nil
}
