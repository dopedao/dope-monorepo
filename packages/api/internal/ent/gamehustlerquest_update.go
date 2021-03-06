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
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/gamehustlerquest"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/predicate"
)

// GameHustlerQuestUpdate is the builder for updating GameHustlerQuest entities.
type GameHustlerQuestUpdate struct {
	config
	hooks    []Hook
	mutation *GameHustlerQuestMutation
}

// Where appends a list predicates to the GameHustlerQuestUpdate builder.
func (ghqu *GameHustlerQuestUpdate) Where(ps ...predicate.GameHustlerQuest) *GameHustlerQuestUpdate {
	ghqu.mutation.Where(ps...)
	return ghqu
}

// SetQuest sets the "quest" field.
func (ghqu *GameHustlerQuestUpdate) SetQuest(s string) *GameHustlerQuestUpdate {
	ghqu.mutation.SetQuest(s)
	return ghqu
}

// SetCompleted sets the "completed" field.
func (ghqu *GameHustlerQuestUpdate) SetCompleted(b bool) *GameHustlerQuestUpdate {
	ghqu.mutation.SetCompleted(b)
	return ghqu
}

// SetNillableCompleted sets the "completed" field if the given value is not nil.
func (ghqu *GameHustlerQuestUpdate) SetNillableCompleted(b *bool) *GameHustlerQuestUpdate {
	if b != nil {
		ghqu.SetCompleted(*b)
	}
	return ghqu
}

// SetHustlerID sets the "hustler" edge to the GameHustler entity by ID.
func (ghqu *GameHustlerQuestUpdate) SetHustlerID(id string) *GameHustlerQuestUpdate {
	ghqu.mutation.SetHustlerID(id)
	return ghqu
}

// SetNillableHustlerID sets the "hustler" edge to the GameHustler entity by ID if the given value is not nil.
func (ghqu *GameHustlerQuestUpdate) SetNillableHustlerID(id *string) *GameHustlerQuestUpdate {
	if id != nil {
		ghqu = ghqu.SetHustlerID(*id)
	}
	return ghqu
}

// SetHustler sets the "hustler" edge to the GameHustler entity.
func (ghqu *GameHustlerQuestUpdate) SetHustler(g *GameHustler) *GameHustlerQuestUpdate {
	return ghqu.SetHustlerID(g.ID)
}

// Mutation returns the GameHustlerQuestMutation object of the builder.
func (ghqu *GameHustlerQuestUpdate) Mutation() *GameHustlerQuestMutation {
	return ghqu.mutation
}

// ClearHustler clears the "hustler" edge to the GameHustler entity.
func (ghqu *GameHustlerQuestUpdate) ClearHustler() *GameHustlerQuestUpdate {
	ghqu.mutation.ClearHustler()
	return ghqu
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (ghqu *GameHustlerQuestUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	if len(ghqu.hooks) == 0 {
		affected, err = ghqu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*GameHustlerQuestMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			ghqu.mutation = mutation
			affected, err = ghqu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(ghqu.hooks) - 1; i >= 0; i-- {
			if ghqu.hooks[i] == nil {
				return 0, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = ghqu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ghqu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (ghqu *GameHustlerQuestUpdate) SaveX(ctx context.Context) int {
	affected, err := ghqu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (ghqu *GameHustlerQuestUpdate) Exec(ctx context.Context) error {
	_, err := ghqu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ghqu *GameHustlerQuestUpdate) ExecX(ctx context.Context) {
	if err := ghqu.Exec(ctx); err != nil {
		panic(err)
	}
}

func (ghqu *GameHustlerQuestUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   gamehustlerquest.Table,
			Columns: gamehustlerquest.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: gamehustlerquest.FieldID,
			},
		},
	}
	if ps := ghqu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := ghqu.mutation.Quest(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: gamehustlerquest.FieldQuest,
		})
	}
	if value, ok := ghqu.mutation.Completed(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: gamehustlerquest.FieldCompleted,
		})
	}
	if ghqu.mutation.HustlerCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   gamehustlerquest.HustlerTable,
			Columns: []string{gamehustlerquest.HustlerColumn},
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
	if nodes := ghqu.mutation.HustlerIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   gamehustlerquest.HustlerTable,
			Columns: []string{gamehustlerquest.HustlerColumn},
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
	if n, err = sqlgraph.UpdateNodes(ctx, ghqu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{gamehustlerquest.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return 0, err
	}
	return n, nil
}

// GameHustlerQuestUpdateOne is the builder for updating a single GameHustlerQuest entity.
type GameHustlerQuestUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *GameHustlerQuestMutation
}

// SetQuest sets the "quest" field.
func (ghquo *GameHustlerQuestUpdateOne) SetQuest(s string) *GameHustlerQuestUpdateOne {
	ghquo.mutation.SetQuest(s)
	return ghquo
}

// SetCompleted sets the "completed" field.
func (ghquo *GameHustlerQuestUpdateOne) SetCompleted(b bool) *GameHustlerQuestUpdateOne {
	ghquo.mutation.SetCompleted(b)
	return ghquo
}

// SetNillableCompleted sets the "completed" field if the given value is not nil.
func (ghquo *GameHustlerQuestUpdateOne) SetNillableCompleted(b *bool) *GameHustlerQuestUpdateOne {
	if b != nil {
		ghquo.SetCompleted(*b)
	}
	return ghquo
}

// SetHustlerID sets the "hustler" edge to the GameHustler entity by ID.
func (ghquo *GameHustlerQuestUpdateOne) SetHustlerID(id string) *GameHustlerQuestUpdateOne {
	ghquo.mutation.SetHustlerID(id)
	return ghquo
}

// SetNillableHustlerID sets the "hustler" edge to the GameHustler entity by ID if the given value is not nil.
func (ghquo *GameHustlerQuestUpdateOne) SetNillableHustlerID(id *string) *GameHustlerQuestUpdateOne {
	if id != nil {
		ghquo = ghquo.SetHustlerID(*id)
	}
	return ghquo
}

// SetHustler sets the "hustler" edge to the GameHustler entity.
func (ghquo *GameHustlerQuestUpdateOne) SetHustler(g *GameHustler) *GameHustlerQuestUpdateOne {
	return ghquo.SetHustlerID(g.ID)
}

// Mutation returns the GameHustlerQuestMutation object of the builder.
func (ghquo *GameHustlerQuestUpdateOne) Mutation() *GameHustlerQuestMutation {
	return ghquo.mutation
}

// ClearHustler clears the "hustler" edge to the GameHustler entity.
func (ghquo *GameHustlerQuestUpdateOne) ClearHustler() *GameHustlerQuestUpdateOne {
	ghquo.mutation.ClearHustler()
	return ghquo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (ghquo *GameHustlerQuestUpdateOne) Select(field string, fields ...string) *GameHustlerQuestUpdateOne {
	ghquo.fields = append([]string{field}, fields...)
	return ghquo
}

// Save executes the query and returns the updated GameHustlerQuest entity.
func (ghquo *GameHustlerQuestUpdateOne) Save(ctx context.Context) (*GameHustlerQuest, error) {
	var (
		err  error
		node *GameHustlerQuest
	)
	if len(ghquo.hooks) == 0 {
		node, err = ghquo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*GameHustlerQuestMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			ghquo.mutation = mutation
			node, err = ghquo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(ghquo.hooks) - 1; i >= 0; i-- {
			if ghquo.hooks[i] == nil {
				return nil, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = ghquo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ghquo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (ghquo *GameHustlerQuestUpdateOne) SaveX(ctx context.Context) *GameHustlerQuest {
	node, err := ghquo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (ghquo *GameHustlerQuestUpdateOne) Exec(ctx context.Context) error {
	_, err := ghquo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ghquo *GameHustlerQuestUpdateOne) ExecX(ctx context.Context) {
	if err := ghquo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (ghquo *GameHustlerQuestUpdateOne) sqlSave(ctx context.Context) (_node *GameHustlerQuest, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   gamehustlerquest.Table,
			Columns: gamehustlerquest.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: gamehustlerquest.FieldID,
			},
		},
	}
	id, ok := ghquo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "GameHustlerQuest.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := ghquo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, gamehustlerquest.FieldID)
		for _, f := range fields {
			if !gamehustlerquest.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != gamehustlerquest.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := ghquo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := ghquo.mutation.Quest(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: gamehustlerquest.FieldQuest,
		})
	}
	if value, ok := ghquo.mutation.Completed(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: gamehustlerquest.FieldCompleted,
		})
	}
	if ghquo.mutation.HustlerCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   gamehustlerquest.HustlerTable,
			Columns: []string{gamehustlerquest.HustlerColumn},
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
	if nodes := ghquo.mutation.HustlerIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   gamehustlerquest.HustlerTable,
			Columns: []string{gamehustlerquest.HustlerColumn},
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
	_node = &GameHustlerQuest{config: ghquo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, ghquo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{gamehustlerquest.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return nil, err
	}
	return _node, nil
}
