package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/engine"
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

func (r *listingResolver) Order(ctx context.Context, obj *ent.Listing) (*engine.Order, error) {
	var order engine.Order

	if len(obj.Order) == 0 {
		return nil, nil
	}

	if err := json.Unmarshal(obj.Order, &order); err != nil {
		return nil, fmt.Errorf("unmarshalling order: %w", err)
	}

	return &order, nil
}

func (r *openSeaOrderResolver) Exchange(ctx context.Context, obj *engine.Order) (string, error) {
	return obj.Exchange.Hex(), nil
}

func (r *openSeaOrderResolver) ListingTime(ctx context.Context, obj *engine.Order) (uint64, error) {
	return uint64(obj.ListingTime), nil
}

func (r *openSeaOrderResolver) ExpirationTime(ctx context.Context, obj *engine.Order) (uint64, error) {
	return uint64(obj.ExpirationTime), nil
}

func (r *openSeaOrderResolver) Maker(ctx context.Context, obj *engine.Order) (string, error) {
	return obj.Maker.Address.Hex(), nil
}

func (r *openSeaOrderResolver) CurrentPrice(ctx context.Context, obj *engine.Order) (string, error) {
	return obj.CurrentPrice.Big().String(), nil
}

func (r *openSeaOrderResolver) MakerRelayerFee(ctx context.Context, obj *engine.Order) (string, error) {
	return obj.MakerRelayerFee.Big().String(), nil
}

func (r *openSeaOrderResolver) MakerProtocolFee(ctx context.Context, obj *engine.Order) (string, error) {
	return obj.MakerProtocolFee.Big().String(), nil
}

func (r *openSeaOrderResolver) FeeRecipient(ctx context.Context, obj *engine.Order) (string, error) {
	return obj.FeeRecipient.Address.Hex(), nil
}

func (r *openSeaOrderResolver) FeeMethod(ctx context.Context, obj *engine.Order) (int, error) {
	return int(obj.FeeMethod), nil
}

func (r *openSeaOrderResolver) Side(ctx context.Context, obj *engine.Order) (int, error) {
	return int(obj.Side), nil
}

func (r *openSeaOrderResolver) SaleKind(ctx context.Context, obj *engine.Order) (int, error) {
	return int(obj.SaleKind), nil
}

func (r *openSeaOrderResolver) Target(ctx context.Context, obj *engine.Order) (string, error) {
	return obj.Target.Hex(), nil
}

func (r *openSeaOrderResolver) HowToCall(ctx context.Context, obj *engine.Order) (int, error) {
	return int(obj.HowToCall), nil
}

func (r *openSeaOrderResolver) Calldata(ctx context.Context, obj *engine.Order) (string, error) {
	return obj.Calldata.String(), nil
}

func (r *openSeaOrderResolver) ReplacementPattern(ctx context.Context, obj *engine.Order) (string, error) {
	return obj.ReplacementPattern.String(), nil
}

func (r *openSeaOrderResolver) StaticTarget(ctx context.Context, obj *engine.Order) (string, error) {
	return obj.Target.Hex(), nil
}

func (r *openSeaOrderResolver) StaticExtradata(ctx context.Context, obj *engine.Order) (string, error) {
	return obj.StaticExtradata.String(), nil
}

func (r *openSeaOrderResolver) Extra(ctx context.Context, obj *engine.Order) (string, error) {
	return obj.Extra.Big().String(), nil
}

func (r *openSeaOrderResolver) Salt(ctx context.Context, obj *engine.Order) (string, error) {
	return obj.Salt.Big().String(), nil
}

func (r *openSeaOrderResolver) V(ctx context.Context, obj *engine.Order) (int, error) {
	return int(*obj.V), nil
}

func (r *openSeaOrderResolver) R(ctx context.Context, obj *engine.Order) (string, error) {
	return obj.R.String(), nil
}

func (r *openSeaOrderResolver) S(ctx context.Context, obj *engine.Order) (string, error) {
	return obj.S.String(), nil
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

// Amount returns generated1.AmountResolver implementation.
func (r *Resolver) Amount() generated1.AmountResolver { return &amountResolver{r} }

// Item returns generated1.ItemResolver implementation.
func (r *Resolver) Item() generated1.ItemResolver { return &itemResolver{r} }

// Listing returns generated1.ListingResolver implementation.
func (r *Resolver) Listing() generated1.ListingResolver { return &listingResolver{r} }

// OpenSeaOrder returns generated1.OpenSeaOrderResolver implementation.
func (r *Resolver) OpenSeaOrder() generated1.OpenSeaOrderResolver { return &openSeaOrderResolver{r} }

// Query returns generated1.QueryResolver implementation.
func (r *Resolver) Query() generated1.QueryResolver { return &queryResolver{r} }

type amountResolver struct{ *Resolver }
type itemResolver struct{ *Resolver }
type listingResolver struct{ *Resolver }
type openSeaOrderResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
