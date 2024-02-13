package processor

import (
	"context"
	"fmt"

	"github.com/dopedao/dope-monorepo/packages/api/internal/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
)

type DopeProcessor struct {
	bindings.BaseDopeProcessor
}

func (p *DopeProcessor) ProcessTransfer(ctx context.Context, e bindings.DopeTransfer) (func(tx *ent.Tx) error, error) {
	// Ensure wallet exists during processing stage
	// so this can happen in parallel
	err := ensureWalletExists(ctx, e.To)
	if err != nil {
		return nil, err
	}

	return func(tx *ent.Tx) error {
		// grift db:bootstrap should seed all DOPEs so we just have to update owner
		if err := tx.Dope.UpdateOneID(e.TokenId.String()).SetWalletID(e.To.Hex()).Exec(ctx); err != nil {
			return fmt.Errorf("update dope id %s: %w", e.TokenId.String(), err)
		}

		return nil
	}, nil
}
