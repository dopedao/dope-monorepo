package processors

import (
	"context"
	"fmt"

	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
)

type InitiatorProcessor struct {
	bindings.BaseInitiatorProcessor
}

func (p *InitiatorProcessor) ProcessOpened(ctx context.Context, e *bindings.InitiatorOpened) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error {
		if err := tx.Dope.UpdateOneID(e.Id.String()).SetOpened(true).Exec(ctx); err != nil {
			return fmt.Errorf("updating dope opened status: %w", err)
		}

		return nil
	}, nil
}
