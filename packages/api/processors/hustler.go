package processors

import (
	"context"

	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
)

type HustlerProcessor struct {
	bindings.UnimplementedHustlerProcessor
	ent *ent.Client
}

func (p *HustlerProcessor) SetEnt(client *ent.Client) {
	p.ent = client
}

func (p *HustlerProcessor) ProcessAddRles(ctx context.Context, e *bindings.HustlerAddRles, emit func(string, []interface{})) error {
	return nil
}

func (p *HustlerProcessor) ProcessMetadataUpdate(ctx context.Context, e *bindings.HustlerMetadataUpdate, emit func(string, []interface{})) error {
	return nil
}

func (p *HustlerProcessor) ProcessTransferBatch(ctx context.Context, e *bindings.HustlerTransferBatch, emit func(string, []interface{})) error {
	return nil
}

func (p *HustlerProcessor) ProcessTransferSingle(ctx context.Context, e *bindings.HustlerTransferSingle, emit func(string, []interface{})) error {
	return nil
}
