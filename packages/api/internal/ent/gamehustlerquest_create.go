// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/gamehustler"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/gamehustlerquest"
)

// GameHustlerQuestCreate is the builder for creating a GameHustlerQuest entity.
type GameHustlerQuestCreate struct {
	config
	mutation *GameHustlerQuestMutation
	hooks    []Hook
	conflict []sql.ConflictOption
}

// SetQuest sets the "quest" field.
func (ghqc *GameHustlerQuestCreate) SetQuest(s string) *GameHustlerQuestCreate {
	ghqc.mutation.SetQuest(s)
	return ghqc
}

// SetCompleted sets the "completed" field.
func (ghqc *GameHustlerQuestCreate) SetCompleted(b bool) *GameHustlerQuestCreate {
	ghqc.mutation.SetCompleted(b)
	return ghqc
}

// SetNillableCompleted sets the "completed" field if the given value is not nil.
func (ghqc *GameHustlerQuestCreate) SetNillableCompleted(b *bool) *GameHustlerQuestCreate {
	if b != nil {
		ghqc.SetCompleted(*b)
	}
	return ghqc
}

// SetID sets the "id" field.
func (ghqc *GameHustlerQuestCreate) SetID(s string) *GameHustlerQuestCreate {
	ghqc.mutation.SetID(s)
	return ghqc
}

// SetNillableID sets the "id" field if the given value is not nil.
func (ghqc *GameHustlerQuestCreate) SetNillableID(s *string) *GameHustlerQuestCreate {
	if s != nil {
		ghqc.SetID(*s)
	}
	return ghqc
}

// SetHustlerID sets the "hustler" edge to the GameHustler entity by ID.
func (ghqc *GameHustlerQuestCreate) SetHustlerID(id string) *GameHustlerQuestCreate {
	ghqc.mutation.SetHustlerID(id)
	return ghqc
}

// SetNillableHustlerID sets the "hustler" edge to the GameHustler entity by ID if the given value is not nil.
func (ghqc *GameHustlerQuestCreate) SetNillableHustlerID(id *string) *GameHustlerQuestCreate {
	if id != nil {
		ghqc = ghqc.SetHustlerID(*id)
	}
	return ghqc
}

// SetHustler sets the "hustler" edge to the GameHustler entity.
func (ghqc *GameHustlerQuestCreate) SetHustler(g *GameHustler) *GameHustlerQuestCreate {
	return ghqc.SetHustlerID(g.ID)
}

// Mutation returns the GameHustlerQuestMutation object of the builder.
func (ghqc *GameHustlerQuestCreate) Mutation() *GameHustlerQuestMutation {
	return ghqc.mutation
}

// Save creates the GameHustlerQuest in the database.
func (ghqc *GameHustlerQuestCreate) Save(ctx context.Context) (*GameHustlerQuest, error) {
	var (
		err  error
		node *GameHustlerQuest
	)
	ghqc.defaults()
	if len(ghqc.hooks) == 0 {
		if err = ghqc.check(); err != nil {
			return nil, err
		}
		node, err = ghqc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*GameHustlerQuestMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = ghqc.check(); err != nil {
				return nil, err
			}
			ghqc.mutation = mutation
			if node, err = ghqc.sqlSave(ctx); err != nil {
				return nil, err
			}
			mutation.id = &node.ID
			mutation.done = true
			return node, err
		})
		for i := len(ghqc.hooks) - 1; i >= 0; i-- {
			if ghqc.hooks[i] == nil {
				return nil, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = ghqc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ghqc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (ghqc *GameHustlerQuestCreate) SaveX(ctx context.Context) *GameHustlerQuest {
	v, err := ghqc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ghqc *GameHustlerQuestCreate) Exec(ctx context.Context) error {
	_, err := ghqc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ghqc *GameHustlerQuestCreate) ExecX(ctx context.Context) {
	if err := ghqc.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ghqc *GameHustlerQuestCreate) defaults() {
	if _, ok := ghqc.mutation.Completed(); !ok {
		v := gamehustlerquest.DefaultCompleted
		ghqc.mutation.SetCompleted(v)
	}
	if _, ok := ghqc.mutation.ID(); !ok {
		v := gamehustlerquest.DefaultID()
		ghqc.mutation.SetID(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ghqc *GameHustlerQuestCreate) check() error {
	if _, ok := ghqc.mutation.Quest(); !ok {
		return &ValidationError{Name: "quest", err: errors.New(`ent: missing required field "GameHustlerQuest.quest"`)}
	}
	if _, ok := ghqc.mutation.Completed(); !ok {
		return &ValidationError{Name: "completed", err: errors.New(`ent: missing required field "GameHustlerQuest.completed"`)}
	}
	return nil
}

func (ghqc *GameHustlerQuestCreate) sqlSave(ctx context.Context) (*GameHustlerQuest, error) {
	_node, _spec := ghqc.createSpec()
	if err := sqlgraph.CreateNode(ctx, ghqc.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return nil, err
	}
	if _spec.ID.Value != nil {
		if id, ok := _spec.ID.Value.(string); ok {
			_node.ID = id
		} else {
			return nil, fmt.Errorf("unexpected GameHustlerQuest.ID type: %T", _spec.ID.Value)
		}
	}
	return _node, nil
}

func (ghqc *GameHustlerQuestCreate) createSpec() (*GameHustlerQuest, *sqlgraph.CreateSpec) {
	var (
		_node = &GameHustlerQuest{config: ghqc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: gamehustlerquest.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: gamehustlerquest.FieldID,
			},
		}
	)
	_spec.OnConflict = ghqc.conflict
	if id, ok := ghqc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = id
	}
	if value, ok := ghqc.mutation.Quest(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: gamehustlerquest.FieldQuest,
		})
		_node.Quest = value
	}
	if value, ok := ghqc.mutation.Completed(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: gamehustlerquest.FieldCompleted,
		})
		_node.Completed = value
	}
	if nodes := ghqc.mutation.HustlerIDs(); len(nodes) > 0 {
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
		_node.game_hustler_quests = &nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.GameHustlerQuest.Create().
//		SetQuest(v).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.GameHustlerQuestUpsert) {
//			SetQuest(v+v).
//		}).
//		Exec(ctx)
//
func (ghqc *GameHustlerQuestCreate) OnConflict(opts ...sql.ConflictOption) *GameHustlerQuestUpsertOne {
	ghqc.conflict = opts
	return &GameHustlerQuestUpsertOne{
		create: ghqc,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.GameHustlerQuest.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
//
func (ghqc *GameHustlerQuestCreate) OnConflictColumns(columns ...string) *GameHustlerQuestUpsertOne {
	ghqc.conflict = append(ghqc.conflict, sql.ConflictColumns(columns...))
	return &GameHustlerQuestUpsertOne{
		create: ghqc,
	}
}

type (
	// GameHustlerQuestUpsertOne is the builder for "upsert"-ing
	//  one GameHustlerQuest node.
	GameHustlerQuestUpsertOne struct {
		create *GameHustlerQuestCreate
	}

	// GameHustlerQuestUpsert is the "OnConflict" setter.
	GameHustlerQuestUpsert struct {
		*sql.UpdateSet
	}
)

// SetQuest sets the "quest" field.
func (u *GameHustlerQuestUpsert) SetQuest(v string) *GameHustlerQuestUpsert {
	u.Set(gamehustlerquest.FieldQuest, v)
	return u
}

// UpdateQuest sets the "quest" field to the value that was provided on create.
func (u *GameHustlerQuestUpsert) UpdateQuest() *GameHustlerQuestUpsert {
	u.SetExcluded(gamehustlerquest.FieldQuest)
	return u
}

// SetCompleted sets the "completed" field.
func (u *GameHustlerQuestUpsert) SetCompleted(v bool) *GameHustlerQuestUpsert {
	u.Set(gamehustlerquest.FieldCompleted, v)
	return u
}

// UpdateCompleted sets the "completed" field to the value that was provided on create.
func (u *GameHustlerQuestUpsert) UpdateCompleted() *GameHustlerQuestUpsert {
	u.SetExcluded(gamehustlerquest.FieldCompleted)
	return u
}

// UpdateNewValues updates the mutable fields using the new values that were set on create except the ID field.
// Using this option is equivalent to using:
//
//	client.GameHustlerQuest.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(gamehustlerquest.FieldID)
//			}),
//		).
//		Exec(ctx)
//
func (u *GameHustlerQuestUpsertOne) UpdateNewValues() *GameHustlerQuestUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		if _, exists := u.create.mutation.ID(); exists {
			s.SetIgnore(gamehustlerquest.FieldID)
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//  client.GameHustlerQuest.Create().
//      OnConflict(sql.ResolveWithIgnore()).
//      Exec(ctx)
//
func (u *GameHustlerQuestUpsertOne) Ignore() *GameHustlerQuestUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *GameHustlerQuestUpsertOne) DoNothing() *GameHustlerQuestUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the GameHustlerQuestCreate.OnConflict
// documentation for more info.
func (u *GameHustlerQuestUpsertOne) Update(set func(*GameHustlerQuestUpsert)) *GameHustlerQuestUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&GameHustlerQuestUpsert{UpdateSet: update})
	}))
	return u
}

// SetQuest sets the "quest" field.
func (u *GameHustlerQuestUpsertOne) SetQuest(v string) *GameHustlerQuestUpsertOne {
	return u.Update(func(s *GameHustlerQuestUpsert) {
		s.SetQuest(v)
	})
}

// UpdateQuest sets the "quest" field to the value that was provided on create.
func (u *GameHustlerQuestUpsertOne) UpdateQuest() *GameHustlerQuestUpsertOne {
	return u.Update(func(s *GameHustlerQuestUpsert) {
		s.UpdateQuest()
	})
}

// SetCompleted sets the "completed" field.
func (u *GameHustlerQuestUpsertOne) SetCompleted(v bool) *GameHustlerQuestUpsertOne {
	return u.Update(func(s *GameHustlerQuestUpsert) {
		s.SetCompleted(v)
	})
}

// UpdateCompleted sets the "completed" field to the value that was provided on create.
func (u *GameHustlerQuestUpsertOne) UpdateCompleted() *GameHustlerQuestUpsertOne {
	return u.Update(func(s *GameHustlerQuestUpsert) {
		s.UpdateCompleted()
	})
}

// Exec executes the query.
func (u *GameHustlerQuestUpsertOne) Exec(ctx context.Context) error {
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for GameHustlerQuestCreate.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *GameHustlerQuestUpsertOne) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}

// Exec executes the UPSERT query and returns the inserted/updated ID.
func (u *GameHustlerQuestUpsertOne) ID(ctx context.Context) (id string, err error) {
	if u.create.driver.Dialect() == dialect.MySQL {
		// In case of "ON CONFLICT", there is no way to get back non-numeric ID
		// fields from the database since MySQL does not support the RETURNING clause.
		return id, errors.New("ent: GameHustlerQuestUpsertOne.ID is not supported by MySQL driver. Use GameHustlerQuestUpsertOne.Exec instead")
	}
	node, err := u.create.Save(ctx)
	if err != nil {
		return id, err
	}
	return node.ID, nil
}

// IDX is like ID, but panics if an error occurs.
func (u *GameHustlerQuestUpsertOne) IDX(ctx context.Context) string {
	id, err := u.ID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// GameHustlerQuestCreateBulk is the builder for creating many GameHustlerQuest entities in bulk.
type GameHustlerQuestCreateBulk struct {
	config
	builders []*GameHustlerQuestCreate
	conflict []sql.ConflictOption
}

// Save creates the GameHustlerQuest entities in the database.
func (ghqcb *GameHustlerQuestCreateBulk) Save(ctx context.Context) ([]*GameHustlerQuest, error) {
	specs := make([]*sqlgraph.CreateSpec, len(ghqcb.builders))
	nodes := make([]*GameHustlerQuest, len(ghqcb.builders))
	mutators := make([]Mutator, len(ghqcb.builders))
	for i := range ghqcb.builders {
		func(i int, root context.Context) {
			builder := ghqcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*GameHustlerQuestMutation)
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
					_, err = mutators[i+1].Mutate(root, ghqcb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					spec.OnConflict = ghqcb.conflict
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, ghqcb.driver, spec); err != nil {
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
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, ghqcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (ghqcb *GameHustlerQuestCreateBulk) SaveX(ctx context.Context) []*GameHustlerQuest {
	v, err := ghqcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ghqcb *GameHustlerQuestCreateBulk) Exec(ctx context.Context) error {
	_, err := ghqcb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ghqcb *GameHustlerQuestCreateBulk) ExecX(ctx context.Context) {
	if err := ghqcb.Exec(ctx); err != nil {
		panic(err)
	}
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.GameHustlerQuest.CreateBulk(builders...).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.GameHustlerQuestUpsert) {
//			SetQuest(v+v).
//		}).
//		Exec(ctx)
//
func (ghqcb *GameHustlerQuestCreateBulk) OnConflict(opts ...sql.ConflictOption) *GameHustlerQuestUpsertBulk {
	ghqcb.conflict = opts
	return &GameHustlerQuestUpsertBulk{
		create: ghqcb,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.GameHustlerQuest.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
//
func (ghqcb *GameHustlerQuestCreateBulk) OnConflictColumns(columns ...string) *GameHustlerQuestUpsertBulk {
	ghqcb.conflict = append(ghqcb.conflict, sql.ConflictColumns(columns...))
	return &GameHustlerQuestUpsertBulk{
		create: ghqcb,
	}
}

// GameHustlerQuestUpsertBulk is the builder for "upsert"-ing
// a bulk of GameHustlerQuest nodes.
type GameHustlerQuestUpsertBulk struct {
	create *GameHustlerQuestCreateBulk
}

// UpdateNewValues updates the mutable fields using the new values that
// were set on create. Using this option is equivalent to using:
//
//	client.GameHustlerQuest.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(gamehustlerquest.FieldID)
//			}),
//		).
//		Exec(ctx)
//
func (u *GameHustlerQuestUpsertBulk) UpdateNewValues() *GameHustlerQuestUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		for _, b := range u.create.builders {
			if _, exists := b.mutation.ID(); exists {
				s.SetIgnore(gamehustlerquest.FieldID)
				return
			}
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//	client.GameHustlerQuest.Create().
//		OnConflict(sql.ResolveWithIgnore()).
//		Exec(ctx)
//
func (u *GameHustlerQuestUpsertBulk) Ignore() *GameHustlerQuestUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *GameHustlerQuestUpsertBulk) DoNothing() *GameHustlerQuestUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the GameHustlerQuestCreateBulk.OnConflict
// documentation for more info.
func (u *GameHustlerQuestUpsertBulk) Update(set func(*GameHustlerQuestUpsert)) *GameHustlerQuestUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&GameHustlerQuestUpsert{UpdateSet: update})
	}))
	return u
}

// SetQuest sets the "quest" field.
func (u *GameHustlerQuestUpsertBulk) SetQuest(v string) *GameHustlerQuestUpsertBulk {
	return u.Update(func(s *GameHustlerQuestUpsert) {
		s.SetQuest(v)
	})
}

// UpdateQuest sets the "quest" field to the value that was provided on create.
func (u *GameHustlerQuestUpsertBulk) UpdateQuest() *GameHustlerQuestUpsertBulk {
	return u.Update(func(s *GameHustlerQuestUpsert) {
		s.UpdateQuest()
	})
}

// SetCompleted sets the "completed" field.
func (u *GameHustlerQuestUpsertBulk) SetCompleted(v bool) *GameHustlerQuestUpsertBulk {
	return u.Update(func(s *GameHustlerQuestUpsert) {
		s.SetCompleted(v)
	})
}

// UpdateCompleted sets the "completed" field to the value that was provided on create.
func (u *GameHustlerQuestUpsertBulk) UpdateCompleted() *GameHustlerQuestUpsertBulk {
	return u.Update(func(s *GameHustlerQuestUpsert) {
		s.UpdateCompleted()
	})
}

// Exec executes the query.
func (u *GameHustlerQuestUpsertBulk) Exec(ctx context.Context) error {
	for i, b := range u.create.builders {
		if len(b.conflict) != 0 {
			return fmt.Errorf("ent: OnConflict was set for builder %d. Set it on the GameHustlerQuestCreateBulk instead", i)
		}
	}
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for GameHustlerQuestCreateBulk.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *GameHustlerQuestUpsertBulk) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}
