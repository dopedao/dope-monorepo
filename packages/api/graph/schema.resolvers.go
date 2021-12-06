package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/dopedao/dope-monorepo/packages/api/ent"
	generated1 "github.com/dopedao/dope-monorepo/packages/api/graph/generated"
)

func (r *queryResolver) Wallets(ctx context.Context) ([]*ent.Wallet, error) {
	return r.client.Wallet.Query().All(ctx)
}

func (r *queryResolver) Dopes(ctx context.Context) ([]*ent.Dope, error) {
	return r.client.Dope.Query().All(ctx)
}

func (r *queryResolver) Items(ctx context.Context) ([]*ent.Item, error) {
	return r.client.Item.Query().All(ctx)
}

// Query returns generated1.QueryResolver implementation.
func (r *Resolver) Query() generated1.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
