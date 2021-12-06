package processors

import (
	"context"

	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/ethereum/go-ethereum/common"
)

type SwapMeetProcessor struct {
	bindings.UnimplementedSwapMeetProcessor
	ent *ent.Client
}

func (p *SwapMeetProcessor) SetEnt(client *ent.Client) {
	p.ent = client
}

func (p *SwapMeetProcessor) ProcessSetRle(ctx context.Context, e *bindings.SwapMeetSetRle, emit func(string, []interface{})) error {
	return nil
}

func (p *SwapMeetProcessor) ProcessTransferBatch(ctx context.Context, e *bindings.SwapMeetTransferBatch, emit func(string, []interface{})) error {
	return nil
}

func (p *SwapMeetProcessor) ProcessTransferSingle(ctx context.Context, e *bindings.SwapMeetTransferSingle, emit func(string, []interface{})) error {
	if e.From != (common.Address{}) {
		if err := p.ent.Wallet.UpdateOneID(e.From.String()).RemoveItemIDs(e.Id.String()).Exec(ctx); err != nil {
			return err
		}
	}

	if e.To != (common.Address{}) {
		if err := p.ent.Wallet.Create().
			SetID(e.From.String()).
			AddItemIDs(e.Id.String()).
			OnConflict().
			UpdateNewValues().
			Exec(ctx); err != nil {
			return err
		}
	}

	return nil
}
