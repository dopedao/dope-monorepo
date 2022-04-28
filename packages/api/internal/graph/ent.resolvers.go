package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/graph/generated"
)

func (r *gameHustlerRelationWhereInputResolver) Text(ctx context.Context, obj *ent.GameHustlerRelationWhereInput, data *int) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *gameHustlerRelationWhereInputResolver) TextNeq(ctx context.Context, obj *ent.GameHustlerRelationWhereInput, data *int) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *gameHustlerRelationWhereInputResolver) TextIn(ctx context.Context, obj *ent.GameHustlerRelationWhereInput, data []int) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *gameHustlerRelationWhereInputResolver) TextNotIn(ctx context.Context, obj *ent.GameHustlerRelationWhereInput, data []int) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *gameHustlerRelationWhereInputResolver) TextGt(ctx context.Context, obj *ent.GameHustlerRelationWhereInput, data *int) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *gameHustlerRelationWhereInputResolver) TextGte(ctx context.Context, obj *ent.GameHustlerRelationWhereInput, data *int) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *gameHustlerRelationWhereInputResolver) TextLt(ctx context.Context, obj *ent.GameHustlerRelationWhereInput, data *int) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *gameHustlerRelationWhereInputResolver) TextLte(ctx context.Context, obj *ent.GameHustlerRelationWhereInput, data *int) error {
	panic(fmt.Errorf("not implemented"))
}

// GameHustlerRelationWhereInput returns generated.GameHustlerRelationWhereInputResolver implementation.
func (r *Resolver) GameHustlerRelationWhereInput() generated.GameHustlerRelationWhereInputResolver {
	return &gameHustlerRelationWhereInputResolver{r}
}

type gameHustlerRelationWhereInputResolver struct{ *Resolver }
