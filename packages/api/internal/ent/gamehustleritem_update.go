// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/gamehustler"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/gamehustleritem"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/predicate"
)

// GameHustlerItemUpdate is the builder for updating GameHustlerItem entities.
type GameHustlerItemUpdate struct {
	config
	hooks    []Hook
	mutation *GameHustlerItemMutation
}

// Where appends a list predicates to the GameHustlerItemUpdate builder.
func (ghiu *GameHustlerItemUpdate) Where(ps ...predicate.GameHustlerItem) *GameHustlerItemUpdate {
	ghiu.mutation.Where(ps...)
	return ghiu
}

// SetItem sets the "item" field.
func (ghiu *GameHustlerItemUpdate) SetItem(s string) *GameHustlerItemUpdate {
	ghiu.mutation.SetItem(s)
	return ghiu
}

// SetHustlerID sets the "hustler" edge to the GameHustler entity by ID.
func (ghiu *GameHustlerItemUpdate) SetHustlerID(id string) *GameHustlerItemUpdate {
	ghiu.mutation.SetHustlerID(id)
	return ghiu
}

// SetNillableHustlerID sets the "hustler" edge to the GameHustler entity by ID if the given value is not nil.
func (ghiu *GameHustlerItemUpdate) SetNillableHustlerID(id *string) *GameHustlerItemUpdate {
	if id != nil {
		ghiu = ghiu.SetHustlerID(*id)
	}
	return ghiu
}

// SetHustler sets the "hustler" edge to the GameHustler entity.
func (ghiu *GameHustlerItemUpdate) SetHustler(g *GameHustler) *GameHustlerItemUpdate {
	return ghiu.SetHustlerID(g.ID)
}

// Mutation returns the GameHustlerItemMutation object of the builder.
func (ghiu *GameHustlerItemUpdate) Mutation() *GameHustlerItemMutation {
	return ghiu.mutation
}

// ClearHustler clears the "hustler" edge to the GameHustler entity.
func (ghiu *GameHustlerItemUpdate) ClearHustler() *GameHustlerItemUpdate {
	ghiu.mutation.ClearHustler()
	return ghiu
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (ghiu *GameHustlerItemUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	if len(ghiu.hooks) == 0 {
		affected, err = ghiu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*GameHustlerItemMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			ghiu.mutation = mutation
			affected, err = ghiu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(ghiu.hooks) - 1; i >= 0; i-- {
			if ghiu.hooks[i] == nil {
				return 0, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = ghiu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ghiu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (ghiu *GameHustlerItemUpdate) SaveX(ctx context.Context) int {
	affected, err := ghiu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (ghiu *GameHustlerItemUpdate) Exec(ctx context.Context) error {
	_, err := ghiu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ghiu *GameHustlerItemUpdate) ExecX(ctx context.Context) {
	if err := ghiu.Exec(ctx); err != nil {
		panic(err)
	}
}

func (ghiu *GameHustlerItemUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   gamehustleritem.Table,
			Columns: gamehustleritem.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: gamehustleritem.FieldID,
			},
		},
	}
	if ps := ghiu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := ghiu.mutation.Item(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: gamehustleritem.FieldItem,
		})
	}
	if ghiu.mutation.HustlerCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   gamehustleritem.HustlerTable,
			Columns: []string{gamehustleritem.HustlerColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: gamehustler.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ghiu.mutation.HustlerIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   gamehustleritem.HustlerTable,
			Columns: []string{gamehustleritem.HustlerColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: gamehustler.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, ghiu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{gamehustleritem.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return 0, err
	}
	return n, nil
}

// GameHustlerItemUpdateOne is the builder for updating a single GameHustlerItem entity.
type GameHustlerItemUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *GameHustlerItemMutation
}

// SetItem sets the "item" field.
func (ghiuo *GameHustlerItemUpdateOne) SetItem(s string) *GameHustlerItemUpdateOne {
	ghiuo.mutation.SetItem(s)
	return ghiuo
}

// SetHustlerID sets the "hustler" edge to the GameHustler entity by ID.
func (ghiuo *GameHustlerItemUpdateOne) SetHustlerID(id string) *GameHustlerItemUpdateOne {
	ghiuo.mutation.SetHustlerID(id)
	return ghiuo
}

// SetNillableHustlerID sets the "hustler" edge to the GameHustler entity by ID if the given value is not nil.
func (ghiuo *GameHustlerItemUpdateOne) SetNillableHustlerID(id *string) *GameHustlerItemUpdateOne {
	if id != nil {
		ghiuo = ghiuo.SetHustlerID(*id)
	}
	return ghiuo
}

// SetHustler sets the "hustler" edge to the GameHustler entity.
func (ghiuo *GameHustlerItemUpdateOne) SetHustler(g *GameHustler) *GameHustlerItemUpdateOne {
	return ghiuo.SetHustlerID(g.ID)
}

// Mutation returns the GameHustlerItemMutation object of the builder.
func (ghiuo *GameHustlerItemUpdateOne) Mutation() *GameHustlerItemMutation {
	return ghiuo.mutation
}

// ClearHustler clears the "hustler" edge to the GameHustler entity.
func (ghiuo *GameHustlerItemUpdateOne) ClearHustler() *GameHustlerItemUpdateOne {
	ghiuo.mutation.ClearHustler()
	return ghiuo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (ghiuo *GameHustlerItemUpdateOne) Select(field string, fields ...string) *GameHustlerItemUpdateOne {
	ghiuo.fields = append([]string{field}, fields...)
	return ghiuo
}

// Save executes the query and returns the updated GameHustlerItem entity.
func (ghiuo *GameHustlerItemUpdateOne) Save(ctx context.Context) (*GameHustlerItem, error) {
	var (
		err  error
		node *GameHustlerItem
	)
	if len(ghiuo.hooks) == 0 {
		node, err = ghiuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*GameHustlerItemMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			ghiuo.mutation = mutation
			node, err = ghiuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(ghiuo.hooks) - 1; i >= 0; i-- {
			if ghiuo.hooks[i] == nil {
				return nil, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = ghiuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ghiuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (ghiuo *GameHustlerItemUpdateOne) SaveX(ctx context.Context) *GameHustlerItem {
	node, err := ghiuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (ghiuo *GameHustlerItemUpdateOne) Exec(ctx context.Context) error {
	_, err := ghiuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ghiuo *GameHustlerItemUpdateOne) ExecX(ctx context.Context) {
	if err := ghiuo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (ghiuo *GameHustlerItemUpdateOne) sqlSave(ctx context.Context) (_node *GameHustlerItem, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   gamehustleritem.Table,
			Columns: gamehustleritem.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: gamehustleritem.FieldID,
			},
		},
	}
	id, ok := ghiuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "GameHustlerItem.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := ghiuo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, gamehustleritem.FieldID)
		for _, f := range fields {
			if !gamehustleritem.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != gamehustleritem.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := ghiuo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := ghiuo.mutation.Item(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: gamehustleritem.FieldItem,
		})
	}
	if ghiuo.mutation.HustlerCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   gamehustleritem.HustlerTable,
			Columns: []string{gamehustleritem.HustlerColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: gamehustler.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ghiuo.mutation.HustlerIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   gamehustleritem.HustlerTable,
			Columns: []string{gamehustleritem.HustlerColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: gamehustler.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &GameHustlerItem{config: ghiuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, ghiuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{gamehustleritem.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return nil, err
	}
	return _node, nil
}
