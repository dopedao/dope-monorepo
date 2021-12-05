package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/dopedao/dope-monorepo/packages/api/ent"
	generated1 "github.com/dopedao/dope-monorepo/packages/api/graph/generated"
)

func (r *dopeResolver) Clothes(ctx context.Context, obj *ent.Dope) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *dopeResolver) Foot(ctx context.Context, obj *ent.Dope) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *dopeResolver) Hand(ctx context.Context, obj *ent.Dope) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *dopeResolver) Neck(ctx context.Context, obj *ent.Dope) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *dopeResolver) Ring(ctx context.Context, obj *ent.Dope) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *dopeResolver) Waist(ctx context.Context, obj *ent.Dope) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *dopeResolver) Weapon(ctx context.Context, obj *ent.Dope) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *dopeResolver) Drugs(ctx context.Context, obj *ent.Dope) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *dopeResolver) Vehicle(ctx context.Context, obj *ent.Dope) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Wallets(ctx context.Context) ([]*ent.Wallet, error) {
	return r.client.Wallet.Query().All(ctx)
}

// Dope returns generated1.DopeResolver implementation.
func (r *Resolver) Dope() generated1.DopeResolver { return &dopeResolver{r} }

// Query returns generated1.QueryResolver implementation.
func (r *Resolver) Query() generated1.QueryResolver { return &queryResolver{r} }

type dopeResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
