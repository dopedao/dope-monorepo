package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/graph/generated"
	"github.com/dopedao/dope-monorepo/packages/api/graph/model"
)

func (r *searchEdgeResolver) Node(ctx context.Context, obj *ent.SearchEdge) (model.SearchResult, error) {
	switch {
	case obj.Node.Edges.Dope != nil:
		return obj.Node.Edges.Dope, nil
	case obj.Node.Edges.Item != nil:
		return obj.Node.Edges.Item, nil
	case obj.Node.Edges.Hustler != nil:
		return obj.Node.Edges.Hustler, nil
	}
	return nil, nil
}

// SearchEdge returns generated.SearchEdgeResolver implementation.
func (r *Resolver) SearchEdge() generated.SearchEdgeResolver { return &searchEdgeResolver{r} }

type searchEdgeResolver struct{ *Resolver }
