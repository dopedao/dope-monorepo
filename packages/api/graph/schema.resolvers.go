package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"strings"

	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/amount"
	generated1 "github.com/dopedao/dope-monorepo/packages/api/graph/generated"
	"github.com/dopedao/dope-monorepo/packages/api/graph/model"
)

func (r *amountResolver) Token(ctx context.Context, obj *ent.Amount) (model.Token, error) {
	switch obj.Type {
	case amount.TypeDOPE:
		return r.client.Dope.Get(ctx, obj.AssetID.String())
	}
	return nil, nil
}

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

func (r *queryResolver) Listings(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.ListingOrder, where *ent.ListingWhereInput) (*ent.ListingConnection, error) {
	return r.client.Listing.Query().Paginate(ctx, after, first, before, last, ent.WithListingOrder(orderBy), ent.WithListingFilter(where.Filter))
}

func (r *queryResolver) Search(ctx context.Context, query string, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.SearchOrder, where *ent.SearchWhereInput) (*ent.SearchConnection, error) {
	var tsquery string

	parts := strings.Split(query, " ")
	for i, part := range parts {
		tsquery += part + ":*"

		if i != len(parts)-1 {
			tsquery += " & "
		}
	}

	return r.client.Search.Query().Where(func(s *sql.Selector) {
		s.From(sql.Table("search_index"))
		s.Where(sql.P(func(b *sql.Builder) {
			b.WriteString(fmt.Sprintf("tsv_document @@ to_tsquery('english', '%s')", tsquery))
		}))
	}).WithDope().WithItem().WithHustler().Paginate(ctx, after, first, before, last, ent.WithSearchOrder(orderBy), ent.WithSearchFilter(where.Filter))
}

// Amount returns generated1.AmountResolver implementation.
func (r *Resolver) Amount() generated1.AmountResolver { return &amountResolver{r} }

// Item returns generated1.ItemResolver implementation.
func (r *Resolver) Item() generated1.ItemResolver { return &itemResolver{r} }

// Query returns generated1.QueryResolver implementation.
func (r *Resolver) Query() generated1.QueryResolver { return &queryResolver{r} }

type amountResolver struct{ *Resolver }
type itemResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
