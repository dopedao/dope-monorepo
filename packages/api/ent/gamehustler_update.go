// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/dopedao/dope-monorepo/packages/api/ent/gamehustler"
	"github.com/dopedao/dope-monorepo/packages/api/ent/predicate"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
)

// GameHustlerUpdate is the builder for updating GameHustler entities.
type GameHustlerUpdate struct {
	config
	hooks    []Hook
	mutation *GameHustlerMutation
}

// Where appends a list predicates to the GameHustlerUpdate builder.
func (ghu *GameHustlerUpdate) Where(ps ...predicate.GameHustler) *GameHustlerUpdate {
	ghu.mutation.Where(ps...)
	return ghu
}

// SetLastPosition sets the "last_position" field.
func (ghu *GameHustlerUpdate) SetLastPosition(s schema.Position) *GameHustlerUpdate {
	ghu.mutation.SetLastPosition(s)
	return ghu
}

// SetRelations sets the "relations" field.
func (ghu *GameHustlerUpdate) SetRelations(shc []schema.GameHustlerCitizen) *GameHustlerUpdate {
	ghu.mutation.SetRelations(shc)
	return ghu
}

// SetQuests sets the "quests" field.
func (ghu *GameHustlerUpdate) SetQuests(shq []schema.GameHustlerQuest) *GameHustlerUpdate {
	ghu.mutation.SetQuests(shq)
	return ghu
}

// SetItems sets the "items" field.
func (ghu *GameHustlerUpdate) SetItems(shi []schema.GameHustlerItem) *GameHustlerUpdate {
	ghu.mutation.SetItems(shi)
	return ghu
}

// Mutation returns the GameHustlerMutation object of the builder.
func (ghu *GameHustlerUpdate) Mutation() *GameHustlerMutation {
	return ghu.mutation
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (ghu *GameHustlerUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	if len(ghu.hooks) == 0 {
		affected, err = ghu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*GameHustlerMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			ghu.mutation = mutation
			affected, err = ghu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(ghu.hooks) - 1; i >= 0; i-- {
			if ghu.hooks[i] == nil {
				return 0, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = ghu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ghu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (ghu *GameHustlerUpdate) SaveX(ctx context.Context) int {
	affected, err := ghu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (ghu *GameHustlerUpdate) Exec(ctx context.Context) error {
	_, err := ghu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ghu *GameHustlerUpdate) ExecX(ctx context.Context) {
	if err := ghu.Exec(ctx); err != nil {
		panic(err)
	}
}

func (ghu *GameHustlerUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   gamehustler.Table,
			Columns: gamehustler.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: gamehustler.FieldID,
			},
		},
	}
	if ps := ghu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := ghu.mutation.LastPosition(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: gamehustler.FieldLastPosition,
		})
	}
	if value, ok := ghu.mutation.Relations(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: gamehustler.FieldRelations,
		})
	}
	if value, ok := ghu.mutation.Quests(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: gamehustler.FieldQuests,
		})
	}
	if value, ok := ghu.mutation.Items(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: gamehustler.FieldItems,
		})
	}
	if n, err = sqlgraph.UpdateNodes(ctx, ghu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{gamehustler.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return 0, err
	}
	return n, nil
}

// GameHustlerUpdateOne is the builder for updating a single GameHustler entity.
type GameHustlerUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *GameHustlerMutation
}

// SetLastPosition sets the "last_position" field.
func (ghuo *GameHustlerUpdateOne) SetLastPosition(s schema.Position) *GameHustlerUpdateOne {
	ghuo.mutation.SetLastPosition(s)
	return ghuo
}

// SetRelations sets the "relations" field.
func (ghuo *GameHustlerUpdateOne) SetRelations(shc []schema.GameHustlerCitizen) *GameHustlerUpdateOne {
	ghuo.mutation.SetRelations(shc)
	return ghuo
}

// SetQuests sets the "quests" field.
func (ghuo *GameHustlerUpdateOne) SetQuests(shq []schema.GameHustlerQuest) *GameHustlerUpdateOne {
	ghuo.mutation.SetQuests(shq)
	return ghuo
}

// SetItems sets the "items" field.
func (ghuo *GameHustlerUpdateOne) SetItems(shi []schema.GameHustlerItem) *GameHustlerUpdateOne {
	ghuo.mutation.SetItems(shi)
	return ghuo
}

// Mutation returns the GameHustlerMutation object of the builder.
func (ghuo *GameHustlerUpdateOne) Mutation() *GameHustlerMutation {
	return ghuo.mutation
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (ghuo *GameHustlerUpdateOne) Select(field string, fields ...string) *GameHustlerUpdateOne {
	ghuo.fields = append([]string{field}, fields...)
	return ghuo
}

// Save executes the query and returns the updated GameHustler entity.
func (ghuo *GameHustlerUpdateOne) Save(ctx context.Context) (*GameHustler, error) {
	var (
		err  error
		node *GameHustler
	)
	if len(ghuo.hooks) == 0 {
		node, err = ghuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*GameHustlerMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			ghuo.mutation = mutation
			node, err = ghuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(ghuo.hooks) - 1; i >= 0; i-- {
			if ghuo.hooks[i] == nil {
				return nil, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = ghuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ghuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (ghuo *GameHustlerUpdateOne) SaveX(ctx context.Context) *GameHustler {
	node, err := ghuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (ghuo *GameHustlerUpdateOne) Exec(ctx context.Context) error {
	_, err := ghuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ghuo *GameHustlerUpdateOne) ExecX(ctx context.Context) {
	if err := ghuo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (ghuo *GameHustlerUpdateOne) sqlSave(ctx context.Context) (_node *GameHustler, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   gamehustler.Table,
			Columns: gamehustler.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: gamehustler.FieldID,
			},
		},
	}
	id, ok := ghuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "GameHustler.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := ghuo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, gamehustler.FieldID)
		for _, f := range fields {
			if !gamehustler.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != gamehustler.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := ghuo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := ghuo.mutation.LastPosition(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: gamehustler.FieldLastPosition,
		})
	}
	if value, ok := ghuo.mutation.Relations(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: gamehustler.FieldRelations,
		})
	}
	if value, ok := ghuo.mutation.Quests(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: gamehustler.FieldQuests,
		})
	}
	if value, ok := ghuo.mutation.Items(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: gamehustler.FieldItems,
		})
	}
	_node = &GameHustler{config: ghuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, ghuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{gamehustler.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return nil, err
	}
	return _node, nil
}
