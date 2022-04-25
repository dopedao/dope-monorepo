package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/dopedao/dope-monorepo/packages/api/indexer"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/graph/generated"
	"github.com/dopedao/dope-monorepo/packages/api/internal/graph/model"
)

func (r *amountResolver) Token(ctx context.Context, obj *ent.Amount) (model.Token, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *itemResolver) Fullname(ctx context.Context, obj *ent.Item) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *listingResolver) Order(ctx context.Context, obj *ent.Listing) (*indexer.Order, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) Exchange(ctx context.Context, obj *indexer.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) ListingTime(ctx context.Context, obj *indexer.Order) (uint64, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) ExpirationTime(ctx context.Context, obj *indexer.Order) (uint64, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) Maker(ctx context.Context, obj *indexer.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) CurrentPrice(ctx context.Context, obj *indexer.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) MakerRelayerFee(ctx context.Context, obj *indexer.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) MakerProtocolFee(ctx context.Context, obj *indexer.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) FeeRecipient(ctx context.Context, obj *indexer.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) FeeMethod(ctx context.Context, obj *indexer.Order) (int, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) Side(ctx context.Context, obj *indexer.Order) (int, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) SaleKind(ctx context.Context, obj *indexer.Order) (int, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) Target(ctx context.Context, obj *indexer.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) HowToCall(ctx context.Context, obj *indexer.Order) (int, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) Calldata(ctx context.Context, obj *indexer.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) ReplacementPattern(ctx context.Context, obj *indexer.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) StaticTarget(ctx context.Context, obj *indexer.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) StaticExtradata(ctx context.Context, obj *indexer.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) Extra(ctx context.Context, obj *indexer.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) Salt(ctx context.Context, obj *indexer.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) V(ctx context.Context, obj *indexer.Order) (int, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) R(ctx context.Context, obj *indexer.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *openSeaOrderResolver) S(ctx context.Context, obj *indexer.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Node(ctx context.Context, id string) (ent.Noder, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Nodes(ctx context.Context, ids []string) ([]ent.Noder, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Wallets(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.WalletOrder, where *ent.WalletWhereInput) (*ent.WalletConnection, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Dopes(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.DopeOrder, where *ent.DopeWhereInput) (*ent.DopeConnection, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Items(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.ItemOrder, where *ent.ItemWhereInput) (*ent.ItemConnection, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) WalletItems(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.WalletItemsOrder, where *ent.WalletItemsWhereInput) (*ent.WalletItemsConnection, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Hustlers(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.HustlerOrder, where *ent.HustlerWhereInput) (*ent.HustlerConnection, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Listings(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.ListingOrder, where *ent.ListingWhereInput) (*ent.ListingConnection, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Search(ctx context.Context, query string, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.SearchOrder, where *ent.SearchWhereInput) (*ent.SearchConnection, error) {
	panic(fmt.Errorf("not implemented"))
}

// Amount returns generated.AmountResolver implementation.
func (r *Resolver) Amount() generated.AmountResolver { return &amountResolver{r} }

// Item returns generated.ItemResolver implementation.
func (r *Resolver) Item() generated.ItemResolver { return &itemResolver{r} }

// Listing returns generated.ListingResolver implementation.
func (r *Resolver) Listing() generated.ListingResolver { return &listingResolver{r} }

// OpenSeaOrder returns generated.OpenSeaOrderResolver implementation.
func (r *Resolver) OpenSeaOrder() generated.OpenSeaOrderResolver { return &openSeaOrderResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type amountResolver struct{ *Resolver }
type itemResolver struct{ *Resolver }
type listingResolver struct{ *Resolver }
type openSeaOrderResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
