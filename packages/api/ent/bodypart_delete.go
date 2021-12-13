// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/dopedao/dope-monorepo/packages/api/ent/bodypart"
	"github.com/dopedao/dope-monorepo/packages/api/ent/predicate"
)

// BodyPartDelete is the builder for deleting a BodyPart entity.
type BodyPartDelete struct {
	config
	hooks    []Hook
	mutation *BodyPartMutation
}

// Where appends a list predicates to the BodyPartDelete builder.
func (bpd *BodyPartDelete) Where(ps ...predicate.BodyPart) *BodyPartDelete {
	bpd.mutation.Where(ps...)
	return bpd
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (bpd *BodyPartDelete) Exec(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	if len(bpd.hooks) == 0 {
		affected, err = bpd.sqlExec(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*BodyPartMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			bpd.mutation = mutation
			affected, err = bpd.sqlExec(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(bpd.hooks) - 1; i >= 0; i-- {
			if bpd.hooks[i] == nil {
				return 0, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = bpd.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, bpd.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// ExecX is like Exec, but panics if an error occurs.
func (bpd *BodyPartDelete) ExecX(ctx context.Context) int {
	n, err := bpd.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (bpd *BodyPartDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := &sqlgraph.DeleteSpec{
		Node: &sqlgraph.NodeSpec{
			Table: bodypart.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: bodypart.FieldID,
			},
		},
	}
	if ps := bpd.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return sqlgraph.DeleteNodes(ctx, bpd.driver, _spec)
}

// BodyPartDeleteOne is the builder for deleting a single BodyPart entity.
type BodyPartDeleteOne struct {
	bpd *BodyPartDelete
}

// Exec executes the deletion query.
func (bpdo *BodyPartDeleteOne) Exec(ctx context.Context) error {
	n, err := bpdo.bpd.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{bodypart.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (bpdo *BodyPartDeleteOne) ExecX(ctx context.Context) {
	bpdo.bpd.ExecX(ctx)
}