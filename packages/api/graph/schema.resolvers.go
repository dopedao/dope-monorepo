package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/dopedao/dope-monorepo/packages/api/ent"
	generated1 "github.com/dopedao/dope-monorepo/packages/api/graph/generated"
)

func (r *itemResolver) Fullname(ctx context.Context, obj *ent.Item) (string, error) {
	fullname := obj.Name

	if obj.NameSuffix != "" {
		fullname = fmt.Sprintf("%s %s", obj.NameSuffix, fullname)
	}

	if obj.NamePrefix != "" {
		fullname = fmt.Sprintf("%s %s", obj.NamePrefix, fullname)
	}

	if obj.Suffix != "" {
		fullname = fmt.Sprintf("%s %s", fullname, obj.Suffix)
	}

	if obj.Augmented {
		fullname = fmt.Sprintf("%s +1", fullname)
	}

	return fullname, nil
}

func (r *queryResolver) Node(ctx context.Context, id string) (ent.Noder, error) {
	return r.client.Noder(ctx, id)
}

func (r *queryResolver) Nodes(ctx context.Context, ids []string) ([]ent.Noder, error) {
	return r.client.Noders(ctx, ids)
}

func (r *queryResolver) Wallets(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.WalletOrder, where *ent.WalletWhereInput) (*ent.WalletConnection, error) {
	return r.client.Wallet.Query().Paginate(ctx, after, first, before, last, ent.WithWalletOrder(orderBy), ent.WithWalletFilter(where.Filter))
}

func (r *queryResolver) Dopes(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.DopeOrder, where *ent.DopeWhereInput) (*ent.DopeConnection, error) {
	if orderBy == nil {
		orderBy = &ent.DopeOrder{Field: ent.DopeOrderFieldOrder, Direction: ent.OrderDirectionAsc}
	}
	return r.client.Dope.Query().Paginate(ctx, after, first, before, last, ent.WithDopeOrder(orderBy), ent.WithDopeFilter(where.Filter))
}

func (r *queryResolver) Items(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.ItemOrder, where *ent.ItemWhereInput) (*ent.ItemConnection, error) {
	return r.client.Item.Query().Paginate(ctx, after, first, before, last, ent.WithItemOrder(orderBy), ent.WithItemFilter(where.Filter))
}

func (r *queryResolver) Hustlers(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.HustlerOrder, where *ent.HustlerWhereInput) (*ent.HustlerConnection, error) {
	return r.client.Hustler.Query().Paginate(ctx, after, first, before, last, ent.WithHustlerOrder(orderBy), ent.WithHustlerFilter(where.Filter))
}

// Item returns generated1.ItemResolver implementation.
func (r *Resolver) Item() generated1.ItemResolver { return &itemResolver{r} }

// Query returns generated1.QueryResolver implementation.
func (r *Resolver) Query() generated1.QueryResolver { return &queryResolver{r} }

type itemResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
