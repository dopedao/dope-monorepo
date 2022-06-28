package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"strings"

	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/indexer"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/amount"
	generated1 "github.com/dopedao/dope-monorepo/packages/api/internal/graph/generated"
	"github.com/dopedao/dope-monorepo/packages/api/internal/graph/model"
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

func (r *listingResolver) WyvernOrder(ctx context.Context, obj *ent.Listing) (*indexer.WyvernOrder, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *listingResolver) SeaportOrder(ctx context.Context, obj *ent.Listing) (*indexer.SeaportOrder, error) {
	panic(fmt.Errorf("not implemented"))
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

func (r *queryResolver) WalletItems(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.WalletItemsOrder, where *ent.WalletItemsWhereInput) (*ent.WalletItemsConnection, error) {
	return r.client.WalletItems.Query().Paginate(ctx, after, first, before, last, ent.WithWalletItemsOrder(orderBy), ent.WithWalletItemsFilter(where.Filter))
}

func (r *queryResolver) Hustlers(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.HustlerOrder, where *ent.HustlerWhereInput) (*ent.HustlerConnection, error) {
	return r.client.Hustler.Query().Paginate(ctx, after, first, before, last, ent.WithHustlerOrder(orderBy), ent.WithHustlerFilter(where.Filter))
}

func (r *queryResolver) Listings(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.ListingOrder, where *ent.ListingWhereInput) (*ent.ListingConnection, error) {
	return r.client.Listing.Query().Paginate(ctx, after, first, before, last, ent.WithListingOrder(orderBy), ent.WithListingFilter(where.Filter))
}

func (r *queryResolver) Search(ctx context.Context, query string, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.SearchOrder, where *ent.SearchWhereInput) (*ent.SearchConnection, error) {
	var tsquery string

	q := r.client.Search.Query()

	if query != "" {
		parts := strings.Split(query, " ")
		for i, part := range parts {
			tsquery += part + ":*"

			if i != len(parts)-1 {
				tsquery += " & "
			}
		}

		q = q.Where(func(s *sql.Selector) {
			s.From(sql.Table("search_index"))
			s.Where(sql.P(func(b *sql.Builder) {
				b.WriteString(fmt.Sprintf("tsv_document @@ to_tsquery('english', '%s')", tsquery))
			}))
		})
	}

	return q.WithDope(func(d *ent.DopeQuery) {
		d.WithLastSale(func(l *ent.ListingQuery) {
			l.WithInputs()
		})
		d.WithListings(func(l *ent.ListingQuery) {
			l.WithInputs()
		})
	}).WithItem().WithHustler().Paginate(ctx, after, first, before, last, ent.WithSearchOrder(orderBy), ent.WithSearchFilter(where.Filter))
}

func (r *seaportOrderResolver) Maker(ctx context.Context, obj *indexer.SeaportOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *seaportOrderResolver) CurrentPrice(ctx context.Context, obj *indexer.SeaportOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *seaportOrderResolver) ListingTime(ctx context.Context, obj *indexer.SeaportOrder) (uint64, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *seaportOrderResolver) ExpirationTime(ctx context.Context, obj *indexer.SeaportOrder) (uint64, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) Exchange(ctx context.Context, obj *indexer.WyvernOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) ListingTime(ctx context.Context, obj *indexer.WyvernOrder) (uint64, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) ExpirationTime(ctx context.Context, obj *indexer.WyvernOrder) (uint64, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) Maker(ctx context.Context, obj *indexer.WyvernOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) CurrentPrice(ctx context.Context, obj *indexer.WyvernOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) MakerRelayerFee(ctx context.Context, obj *indexer.WyvernOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) MakerProtocolFee(ctx context.Context, obj *indexer.WyvernOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) FeeRecipient(ctx context.Context, obj *indexer.WyvernOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) FeeMethod(ctx context.Context, obj *indexer.WyvernOrder) (int, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) Side(ctx context.Context, obj *indexer.WyvernOrder) (int, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) SaleKind(ctx context.Context, obj *indexer.WyvernOrder) (int, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) Target(ctx context.Context, obj *indexer.WyvernOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) HowToCall(ctx context.Context, obj *indexer.WyvernOrder) (int, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) Calldata(ctx context.Context, obj *indexer.WyvernOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) ReplacementPattern(ctx context.Context, obj *indexer.WyvernOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) StaticTarget(ctx context.Context, obj *indexer.WyvernOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) StaticExtradata(ctx context.Context, obj *indexer.WyvernOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) Extra(ctx context.Context, obj *indexer.WyvernOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) Salt(ctx context.Context, obj *indexer.WyvernOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) V(ctx context.Context, obj *indexer.WyvernOrder) (int, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) R(ctx context.Context, obj *indexer.WyvernOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *wyvernOrderResolver) S(ctx context.Context, obj *indexer.WyvernOrder) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

// Amount returns generated1.AmountResolver implementation.
func (r *Resolver) Amount() generated1.AmountResolver { return &amountResolver{r} }

// Item returns generated1.ItemResolver implementation.
func (r *Resolver) Item() generated1.ItemResolver { return &itemResolver{r} }

// Listing returns generated1.ListingResolver implementation.
func (r *Resolver) Listing() generated1.ListingResolver { return &listingResolver{r} }

// Query returns generated1.QueryResolver implementation.
func (r *Resolver) Query() generated1.QueryResolver { return &queryResolver{r} }

// SeaportOrder returns generated1.SeaportOrderResolver implementation.
func (r *Resolver) SeaportOrder() generated1.SeaportOrderResolver { return &seaportOrderResolver{r} }

// WyvernOrder returns generated1.WyvernOrderResolver implementation.
func (r *Resolver) WyvernOrder() generated1.WyvernOrderResolver { return &wyvernOrderResolver{r} }

type amountResolver struct{ *Resolver }
type itemResolver struct{ *Resolver }
type listingResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type seaportOrderResolver struct{ *Resolver }
type wyvernOrderResolver struct{ *Resolver }
