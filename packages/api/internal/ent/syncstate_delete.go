// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/predicate"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/syncstate"
)

// SyncStateDelete is the builder for deleting a SyncState entity.
type SyncStateDelete struct {
	config
	hooks    []Hook
	mutation *SyncStateMutation
}

// Where appends a list predicates to the SyncStateDelete builder.
func (ssd *SyncStateDelete) Where(ps ...predicate.SyncState) *SyncStateDelete {
	ssd.mutation.Where(ps...)
	return ssd
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (ssd *SyncStateDelete) Exec(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	if len(ssd.hooks) == 0 {
		affected, err = ssd.sqlExec(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*SyncStateMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			ssd.mutation = mutation
			affected, err = ssd.sqlExec(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(ssd.hooks) - 1; i >= 0; i-- {
			if ssd.hooks[i] == nil {
				return 0, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = ssd.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ssd.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// ExecX is like Exec, but panics if an error occurs.
func (ssd *SyncStateDelete) ExecX(ctx context.Context) int {
	n, err := ssd.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (ssd *SyncStateDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := &sqlgraph.DeleteSpec{
		Node: &sqlgraph.NodeSpec{
			Table: syncstate.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: syncstate.FieldID,
			},
		},
	}
	if ps := ssd.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return sqlgraph.DeleteNodes(ctx, ssd.driver, _spec)
}

// SyncStateDeleteOne is the builder for deleting a single SyncState entity.
type SyncStateDeleteOne struct {
	ssd *SyncStateDelete
}

// Exec executes the deletion query.
func (ssdo *SyncStateDeleteOne) Exec(ctx context.Context) error {
	n, err := ssdo.ssd.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{syncstate.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (ssdo *SyncStateDeleteOne) ExecX(ctx context.Context) {
	ssdo.ssd.ExecX(ctx)
}
