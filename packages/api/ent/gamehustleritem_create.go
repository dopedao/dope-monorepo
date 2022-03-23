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
	"github.com/dopedao/dope-monorepo/packages/api/ent/gamehustleritem"
)

// GameHustlerItemCreate is the builder for creating a GameHustlerItem entity.
type GameHustlerItemCreate struct {
	config
	mutation *GameHustlerItemMutation
	hooks    []Hook
	conflict []sql.ConflictOption
}

// SetItem sets the "item" field.
func (ghic *GameHustlerItemCreate) SetItem(s string) *GameHustlerItemCreate {
	ghic.mutation.SetItem(s)
	return ghic
}

// SetHustlerID sets the "hustler" edge to the GameHustler entity by ID.
func (ghic *GameHustlerItemCreate) SetHustlerID(id string) *GameHustlerItemCreate {
	ghic.mutation.SetHustlerID(id)
	return ghic
}

// SetNillableHustlerID sets the "hustler" edge to the GameHustler entity by ID if the given value is not nil.
func (ghic *GameHustlerItemCreate) SetNillableHustlerID(id *string) *GameHustlerItemCreate {
	if id != nil {
		ghic = ghic.SetHustlerID(*id)
	}
	return ghic
}

// SetHustler sets the "hustler" edge to the GameHustler entity.
func (ghic *GameHustlerItemCreate) SetHustler(g *GameHustler) *GameHustlerItemCreate {
	return ghic.SetHustlerID(g.ID)
}

// Mutation returns the GameHustlerItemMutation object of the builder.
func (ghic *GameHustlerItemCreate) Mutation() *GameHustlerItemMutation {
	return ghic.mutation
}

// Save creates the GameHustlerItem in the database.
func (ghic *GameHustlerItemCreate) Save(ctx context.Context) (*GameHustlerItem, error) {
	var (
		err  error
		node *GameHustlerItem
	)
	if len(ghic.hooks) == 0 {
		if err = ghic.check(); err != nil {
			return nil, err
		}
		node, err = ghic.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*GameHustlerItemMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = ghic.check(); err != nil {
				return nil, err
			}
			ghic.mutation = mutation
			if node, err = ghic.sqlSave(ctx); err != nil {
				return nil, err
			}
			mutation.id = &node.ID
			mutation.done = true
			return node, err
		})
		for i := len(ghic.hooks) - 1; i >= 0; i-- {
			if ghic.hooks[i] == nil {
				return nil, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = ghic.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ghic.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (ghic *GameHustlerItemCreate) SaveX(ctx context.Context) *GameHustlerItem {
	v, err := ghic.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ghic *GameHustlerItemCreate) Exec(ctx context.Context) error {
	_, err := ghic.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ghic *GameHustlerItemCreate) ExecX(ctx context.Context) {
	if err := ghic.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ghic *GameHustlerItemCreate) check() error {
	if _, ok := ghic.mutation.Item(); !ok {
		return &ValidationError{Name: "item", err: errors.New(`ent: missing required field "GameHustlerItem.item"`)}
	}
	return nil
}

func (ghic *GameHustlerItemCreate) sqlSave(ctx context.Context) (*GameHustlerItem, error) {
	_node, _spec := ghic.createSpec()
	if err := sqlgraph.CreateNode(ctx, ghic.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = string(id)
	return _node, nil
}

func (ghic *GameHustlerItemCreate) createSpec() (*GameHustlerItem, *sqlgraph.CreateSpec) {
	var (
		_node = &GameHustlerItem{config: ghic.config}
		_spec = &sqlgraph.CreateSpec{
			Table: gamehustleritem.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: gamehustleritem.FieldID,
			},
		}
	)
	_spec.OnConflict = ghic.conflict
	if value, ok := ghic.mutation.Item(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: gamehustleritem.FieldItem,
		})
		_node.Item = value
	}
	if nodes := ghic.mutation.HustlerIDs(); len(nodes) > 0 {
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
		_node.game_hustler_items = &nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.GameHustlerItem.Create().
//		SetItem(v).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.GameHustlerItemUpsert) {
//			SetItem(v+v).
//		}).
//		Exec(ctx)
//
func (ghic *GameHustlerItemCreate) OnConflict(opts ...sql.ConflictOption) *GameHustlerItemUpsertOne {
	ghic.conflict = opts
	return &GameHustlerItemUpsertOne{
		create: ghic,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.GameHustlerItem.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
//
func (ghic *GameHustlerItemCreate) OnConflictColumns(columns ...string) *GameHustlerItemUpsertOne {
	ghic.conflict = append(ghic.conflict, sql.ConflictColumns(columns...))
	return &GameHustlerItemUpsertOne{
		create: ghic,
	}
}

type (
	// GameHustlerItemUpsertOne is the builder for "upsert"-ing
	//  one GameHustlerItem node.
	GameHustlerItemUpsertOne struct {
		create *GameHustlerItemCreate
	}

	// GameHustlerItemUpsert is the "OnConflict" setter.
	GameHustlerItemUpsert struct {
		*sql.UpdateSet
	}
)

// SetItem sets the "item" field.
func (u *GameHustlerItemUpsert) SetItem(v string) *GameHustlerItemUpsert {
	u.Set(gamehustleritem.FieldItem, v)
	return u
}

// UpdateItem sets the "item" field to the value that was provided on create.
func (u *GameHustlerItemUpsert) UpdateItem() *GameHustlerItemUpsert {
	u.SetExcluded(gamehustleritem.FieldItem)
	return u
}

// UpdateNewValues updates the mutable fields using the new values that were set on create.
// Using this option is equivalent to using:
//
//	client.GameHustlerItem.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//		).
//		Exec(ctx)
//
func (u *GameHustlerItemUpsertOne) UpdateNewValues() *GameHustlerItemUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//  client.GameHustlerItem.Create().
//      OnConflict(sql.ResolveWithIgnore()).
//      Exec(ctx)
//
func (u *GameHustlerItemUpsertOne) Ignore() *GameHustlerItemUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *GameHustlerItemUpsertOne) DoNothing() *GameHustlerItemUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the GameHustlerItemCreate.OnConflict
// documentation for more info.
func (u *GameHustlerItemUpsertOne) Update(set func(*GameHustlerItemUpsert)) *GameHustlerItemUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&GameHustlerItemUpsert{UpdateSet: update})
	}))
	return u
}

// SetItem sets the "item" field.
func (u *GameHustlerItemUpsertOne) SetItem(v string) *GameHustlerItemUpsertOne {
	return u.Update(func(s *GameHustlerItemUpsert) {
		s.SetItem(v)
	})
}

// UpdateItem sets the "item" field to the value that was provided on create.
func (u *GameHustlerItemUpsertOne) UpdateItem() *GameHustlerItemUpsertOne {
	return u.Update(func(s *GameHustlerItemUpsert) {
		s.UpdateItem()
	})
}

// Exec executes the query.
func (u *GameHustlerItemUpsertOne) Exec(ctx context.Context) error {
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for GameHustlerItemCreate.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *GameHustlerItemUpsertOne) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}

// Exec executes the UPSERT query and returns the inserted/updated ID.
func (u *GameHustlerItemUpsertOne) ID(ctx context.Context) (id string, err error) {
	node, err := u.create.Save(ctx)
	if err != nil {
		return id, err
	}
	return node.ID, nil
}

// IDX is like ID, but panics if an error occurs.
func (u *GameHustlerItemUpsertOne) IDX(ctx context.Context) string {
	id, err := u.ID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// GameHustlerItemCreateBulk is the builder for creating many GameHustlerItem entities in bulk.
type GameHustlerItemCreateBulk struct {
	config
	builders []*GameHustlerItemCreate
	conflict []sql.ConflictOption
}

// Save creates the GameHustlerItem entities in the database.
func (ghicb *GameHustlerItemCreateBulk) Save(ctx context.Context) ([]*GameHustlerItem, error) {
	specs := make([]*sqlgraph.CreateSpec, len(ghicb.builders))
	nodes := make([]*GameHustlerItem, len(ghicb.builders))
	mutators := make([]Mutator, len(ghicb.builders))
	for i := range ghicb.builders {
		func(i int, root context.Context) {
			builder := ghicb.builders[i]
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*GameHustlerItemMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, ghicb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					spec.OnConflict = ghicb.conflict
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, ghicb.driver, spec); err != nil {
						if sqlgraph.IsConstraintError(err) {
							err = &ConstraintError{err.Error(), err}
						}
					}
				}
				if err != nil {
					return nil, err
				}
				mutation.id = &nodes[i].ID
				mutation.done = true
				if specs[i].ID.Value != nil {
					id := specs[i].ID.Value.(int64)
					nodes[i].ID = string(id)
				}
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, ghicb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (ghicb *GameHustlerItemCreateBulk) SaveX(ctx context.Context) []*GameHustlerItem {
	v, err := ghicb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ghicb *GameHustlerItemCreateBulk) Exec(ctx context.Context) error {
	_, err := ghicb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ghicb *GameHustlerItemCreateBulk) ExecX(ctx context.Context) {
	if err := ghicb.Exec(ctx); err != nil {
		panic(err)
	}
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.GameHustlerItem.CreateBulk(builders...).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.GameHustlerItemUpsert) {
//			SetItem(v+v).
//		}).
//		Exec(ctx)
//
func (ghicb *GameHustlerItemCreateBulk) OnConflict(opts ...sql.ConflictOption) *GameHustlerItemUpsertBulk {
	ghicb.conflict = opts
	return &GameHustlerItemUpsertBulk{
		create: ghicb,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.GameHustlerItem.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
//
func (ghicb *GameHustlerItemCreateBulk) OnConflictColumns(columns ...string) *GameHustlerItemUpsertBulk {
	ghicb.conflict = append(ghicb.conflict, sql.ConflictColumns(columns...))
	return &GameHustlerItemUpsertBulk{
		create: ghicb,
	}
}

// GameHustlerItemUpsertBulk is the builder for "upsert"-ing
// a bulk of GameHustlerItem nodes.
type GameHustlerItemUpsertBulk struct {
	create *GameHustlerItemCreateBulk
}

// UpdateNewValues updates the mutable fields using the new values that
// were set on create. Using this option is equivalent to using:
//
//	client.GameHustlerItem.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//		).
//		Exec(ctx)
//
func (u *GameHustlerItemUpsertBulk) UpdateNewValues() *GameHustlerItemUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//	client.GameHustlerItem.Create().
//		OnConflict(sql.ResolveWithIgnore()).
//		Exec(ctx)
//
func (u *GameHustlerItemUpsertBulk) Ignore() *GameHustlerItemUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *GameHustlerItemUpsertBulk) DoNothing() *GameHustlerItemUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the GameHustlerItemCreateBulk.OnConflict
// documentation for more info.
func (u *GameHustlerItemUpsertBulk) Update(set func(*GameHustlerItemUpsert)) *GameHustlerItemUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&GameHustlerItemUpsert{UpdateSet: update})
	}))
	return u
}

// SetItem sets the "item" field.
func (u *GameHustlerItemUpsertBulk) SetItem(v string) *GameHustlerItemUpsertBulk {
	return u.Update(func(s *GameHustlerItemUpsert) {
		s.SetItem(v)
	})
}

// UpdateItem sets the "item" field to the value that was provided on create.
func (u *GameHustlerItemUpsertBulk) UpdateItem() *GameHustlerItemUpsertBulk {
	return u.Update(func(s *GameHustlerItemUpsert) {
		s.UpdateItem()
	})
}

// Exec executes the query.
func (u *GameHustlerItemUpsertBulk) Exec(ctx context.Context) error {
	for i, b := range u.create.builders {
		if len(b.conflict) != 0 {
			return fmt.Errorf("ent: OnConflict was set for builder %d. Set it on the GameHustlerItemCreateBulk instead", i)
		}
	}
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for GameHustlerItemCreateBulk.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *GameHustlerItemUpsertBulk) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}
