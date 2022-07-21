// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/gamehustler"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/predicate"
)

// GameHustlerDelete is the builder for deleting a GameHustler entity.
type GameHustlerDelete struct {
	config
	hooks    []Hook
	mutation *GameHustlerMutation
}

// Where appends a list predicates to the GameHustlerDelete builder.
func (ghd *GameHustlerDelete) Where(ps ...predicate.GameHustler) *GameHustlerDelete {
	ghd.mutation.Where(ps...)
	return ghd
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (ghd *GameHustlerDelete) Exec(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	if len(ghd.hooks) == 0 {
		affected, err = ghd.sqlExec(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*GameHustlerMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			ghd.mutation = mutation
			affected, err = ghd.sqlExec(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(ghd.hooks) - 1; i >= 0; i-- {
			if ghd.hooks[i] == nil {
				return 0, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = ghd.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ghd.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// ExecX is like Exec, but panics if an error occurs.
func (ghd *GameHustlerDelete) ExecX(ctx context.Context) int {
	n, err := ghd.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (ghd *GameHustlerDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := &sqlgraph.DeleteSpec{
		Node: &sqlgraph.NodeSpec{
			Table: gamehustler.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: gamehustler.FieldID,
			},
		},
	}
	if ps := ghd.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return sqlgraph.DeleteNodes(ctx, ghd.driver, _spec)
}

// GameHustlerDeleteOne is the builder for deleting a single GameHustler entity.
type GameHustlerDeleteOne struct {
	ghd *GameHustlerDelete
}

// Exec executes the deletion query.
func (ghdo *GameHustlerDeleteOne) Exec(ctx context.Context) error {
	n, err := ghdo.ghd.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{gamehustler.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (ghdo *GameHustlerDeleteOne) ExecX(ctx context.Context) {
	ghdo.ghd.ExecX(ctx)
}
