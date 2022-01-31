package processors

import (
	"context"
	"fmt"

	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
	"github.com/ethereum/go-ethereum/common"
)

func ensureWallet(ctx context.Context, tx *ent.Tx, addr common.Address) error {
	if err := tx.Wallet.Create().
		SetID(addr.Hex()).
		OnConflictColumns(wallet.FieldID).
		DoNothing().
		Exec(ctx); err != nil && !ent.IsNoRowsInResultSetError(err) {
		return fmt.Errorf("create wallet: %w", err)
	}

	return nil
}
