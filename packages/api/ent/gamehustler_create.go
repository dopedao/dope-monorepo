// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"time"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/dopedao/dope-monorepo/packages/api/ent/gamehustler"
	"github.com/dopedao/dope-monorepo/packages/api/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
)

// GameHustlerCreate is the builder for creating a GameHustler entity.
type GameHustlerCreate struct {
	config
	mutation *GameHustlerMutation
	hooks    []Hook
	conflict []sql.ConflictOption
}

// SetLastPosition sets the "lastPosition" field.
func (ghc *GameHustlerCreate) SetLastPosition(s schema.Position) *GameHustlerCreate {
	ghc.mutation.SetLastPosition(s)
	return ghc
}

// SetRelations sets the "relations" field.
func (ghc *GameHustlerCreate) SetRelations(shc []schema.GameHustlerCitizen) *GameHustlerCreate {
	ghc.mutation.SetRelations(shc)
	return ghc
}

// SetQuests sets the "quests" field.
func (ghc *GameHustlerCreate) SetQuests(shq []schema.GameHustlerQuest) *GameHustlerCreate {
	ghc.mutation.SetQuests(shq)
	return ghc
}

// SetItems sets the "items" field.
func (ghc *GameHustlerCreate) SetItems(shi []schema.GameHustlerItem) *GameHustlerCreate {
	ghc.mutation.SetItems(shi)
	return ghc
}

// SetCreatedAt sets the "created_at" field.
func (ghc *GameHustlerCreate) SetCreatedAt(t time.Time) *GameHustlerCreate {
	ghc.mutation.SetCreatedAt(t)
	return ghc
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (ghc *GameHustlerCreate) SetNillableCreatedAt(t *time.Time) *GameHustlerCreate {
	if t != nil {
		ghc.SetCreatedAt(*t)
	}
	return ghc
}

// SetID sets the "id" field.
func (ghc *GameHustlerCreate) SetID(s string) *GameHustlerCreate {
	ghc.mutation.SetID(s)
	return ghc
}

// SetHustlersID sets the "hustlers" edge to the Hustler entity by ID.
func (ghc *GameHustlerCreate) SetHustlersID(id string) *GameHustlerCreate {
	ghc.mutation.SetHustlersID(id)
	return ghc
}

// SetNillableHustlersID sets the "hustlers" edge to the Hustler entity by ID if the given value is not nil.
func (ghc *GameHustlerCreate) SetNillableHustlersID(id *string) *GameHustlerCreate {
	if id != nil {
		ghc = ghc.SetHustlersID(*id)
	}
	return ghc
}

// SetHustlers sets the "hustlers" edge to the Hustler entity.
func (ghc *GameHustlerCreate) SetHustlers(h *Hustler) *GameHustlerCreate {
	return ghc.SetHustlersID(h.ID)
}

// Mutation returns the GameHustlerMutation object of the builder.
func (ghc *GameHustlerCreate) Mutation() *GameHustlerMutation {
	return ghc.mutation
}

// Save creates the GameHustler in the database.
func (ghc *GameHustlerCreate) Save(ctx context.Context) (*GameHustler, error) {
	var (
		err  error
		node *GameHustler
	)
	ghc.defaults()
	if len(ghc.hooks) == 0 {
		if err = ghc.check(); err != nil {
			return nil, err
		}
		node, err = ghc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*GameHustlerMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = ghc.check(); err != nil {
				return nil, err
			}
			ghc.mutation = mutation
			if node, err = ghc.sqlSave(ctx); err != nil {
				return nil, err
			}
			mutation.id = &node.ID
			mutation.done = true
			return node, err
		})
		for i := len(ghc.hooks) - 1; i >= 0; i-- {
			if ghc.hooks[i] == nil {
				return nil, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = ghc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ghc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (ghc *GameHustlerCreate) SaveX(ctx context.Context) *GameHustler {
	v, err := ghc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ghc *GameHustlerCreate) Exec(ctx context.Context) error {
	_, err := ghc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ghc *GameHustlerCreate) ExecX(ctx context.Context) {
	if err := ghc.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ghc *GameHustlerCreate) defaults() {
	if _, ok := ghc.mutation.CreatedAt(); !ok {
		v := gamehustler.DefaultCreatedAt()
		ghc.mutation.SetCreatedAt(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ghc *GameHustlerCreate) check() error {
	if _, ok := ghc.mutation.LastPosition(); !ok {
		return &ValidationError{Name: "lastPosition", err: errors.New(`ent: missing required field "GameHustler.lastPosition"`)}
	}
	if _, ok := ghc.mutation.Relations(); !ok {
		return &ValidationError{Name: "relations", err: errors.New(`ent: missing required field "GameHustler.relations"`)}
	}
	if _, ok := ghc.mutation.Quests(); !ok {
		return &ValidationError{Name: "quests", err: errors.New(`ent: missing required field "GameHustler.quests"`)}
	}
	if _, ok := ghc.mutation.Items(); !ok {
		return &ValidationError{Name: "items", err: errors.New(`ent: missing required field "GameHustler.items"`)}
	}
	if _, ok := ghc.mutation.CreatedAt(); !ok {
		return &ValidationError{Name: "created_at", err: errors.New(`ent: missing required field "GameHustler.created_at"`)}
	}
	return nil
}

func (ghc *GameHustlerCreate) sqlSave(ctx context.Context) (*GameHustler, error) {
	_node, _spec := ghc.createSpec()
	if err := sqlgraph.CreateNode(ctx, ghc.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return nil, err
	}
	if _spec.ID.Value != nil {
		if id, ok := _spec.ID.Value.(string); ok {
			_node.ID = id
		} else {
			return nil, fmt.Errorf("unexpected GameHustler.ID type: %T", _spec.ID.Value)
		}
	}
	return _node, nil
}

func (ghc *GameHustlerCreate) createSpec() (*GameHustler, *sqlgraph.CreateSpec) {
	var (
		_node = &GameHustler{config: ghc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: gamehustler.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: gamehustler.FieldID,
			},
		}
	)
	_spec.OnConflict = ghc.conflict
	if id, ok := ghc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = id
	}
	if value, ok := ghc.mutation.LastPosition(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: gamehustler.FieldLastPosition,
		})
		_node.LastPosition = value
	}
	if value, ok := ghc.mutation.Relations(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: gamehustler.FieldRelations,
		})
		_node.Relations = value
	}
	if value, ok := ghc.mutation.Quests(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: gamehustler.FieldQuests,
		})
		_node.Quests = value
	}
	if value, ok := ghc.mutation.Items(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: gamehustler.FieldItems,
		})
		_node.Items = value
	}
	if value, ok := ghc.mutation.CreatedAt(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: gamehustler.FieldCreatedAt,
		})
		_node.CreatedAt = value
	}
	if nodes := ghc.mutation.HustlersIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   gamehustler.HustlersTable,
			Columns: []string{gamehustler.HustlersColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: hustler.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.game_hustler_hustlers = &nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.GameHustler.Create().
//		SetLastPosition(v).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.GameHustlerUpsert) {
//			SetLastPosition(v+v).
//		}).
//		Exec(ctx)
//
func (ghc *GameHustlerCreate) OnConflict(opts ...sql.ConflictOption) *GameHustlerUpsertOne {
	ghc.conflict = opts
	return &GameHustlerUpsertOne{
		create: ghc,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.GameHustler.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
//
func (ghc *GameHustlerCreate) OnConflictColumns(columns ...string) *GameHustlerUpsertOne {
	ghc.conflict = append(ghc.conflict, sql.ConflictColumns(columns...))
	return &GameHustlerUpsertOne{
		create: ghc,
	}
}

type (
	// GameHustlerUpsertOne is the builder for "upsert"-ing
	//  one GameHustler node.
	GameHustlerUpsertOne struct {
		create *GameHustlerCreate
	}

	// GameHustlerUpsert is the "OnConflict" setter.
	GameHustlerUpsert struct {
		*sql.UpdateSet
	}
)

// SetLastPosition sets the "lastPosition" field.
func (u *GameHustlerUpsert) SetLastPosition(v schema.Position) *GameHustlerUpsert {
	u.Set(gamehustler.FieldLastPosition, v)
	return u
}

// UpdateLastPosition sets the "lastPosition" field to the value that was provided on create.
func (u *GameHustlerUpsert) UpdateLastPosition() *GameHustlerUpsert {
	u.SetExcluded(gamehustler.FieldLastPosition)
	return u
}

// SetRelations sets the "relations" field.
func (u *GameHustlerUpsert) SetRelations(v []schema.GameHustlerCitizen) *GameHustlerUpsert {
	u.Set(gamehustler.FieldRelations, v)
	return u
}

// UpdateRelations sets the "relations" field to the value that was provided on create.
func (u *GameHustlerUpsert) UpdateRelations() *GameHustlerUpsert {
	u.SetExcluded(gamehustler.FieldRelations)
	return u
}

// SetQuests sets the "quests" field.
func (u *GameHustlerUpsert) SetQuests(v []schema.GameHustlerQuest) *GameHustlerUpsert {
	u.Set(gamehustler.FieldQuests, v)
	return u
}

// UpdateQuests sets the "quests" field to the value that was provided on create.
func (u *GameHustlerUpsert) UpdateQuests() *GameHustlerUpsert {
	u.SetExcluded(gamehustler.FieldQuests)
	return u
}

// SetItems sets the "items" field.
func (u *GameHustlerUpsert) SetItems(v []schema.GameHustlerItem) *GameHustlerUpsert {
	u.Set(gamehustler.FieldItems, v)
	return u
}

// UpdateItems sets the "items" field to the value that was provided on create.
func (u *GameHustlerUpsert) UpdateItems() *GameHustlerUpsert {
	u.SetExcluded(gamehustler.FieldItems)
	return u
}

// SetCreatedAt sets the "created_at" field.
func (u *GameHustlerUpsert) SetCreatedAt(v time.Time) *GameHustlerUpsert {
	u.Set(gamehustler.FieldCreatedAt, v)
	return u
}

// UpdateCreatedAt sets the "created_at" field to the value that was provided on create.
func (u *GameHustlerUpsert) UpdateCreatedAt() *GameHustlerUpsert {
	u.SetExcluded(gamehustler.FieldCreatedAt)
	return u
}

// UpdateNewValues updates the mutable fields using the new values that were set on create except the ID field.
// Using this option is equivalent to using:
//
//	client.GameHustler.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(gamehustler.FieldID)
//			}),
//		).
//		Exec(ctx)
//
func (u *GameHustlerUpsertOne) UpdateNewValues() *GameHustlerUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		if _, exists := u.create.mutation.ID(); exists {
			s.SetIgnore(gamehustler.FieldID)
		}
		if _, exists := u.create.mutation.CreatedAt(); exists {
			s.SetIgnore(gamehustler.FieldCreatedAt)
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//  client.GameHustler.Create().
//      OnConflict(sql.ResolveWithIgnore()).
//      Exec(ctx)
//
func (u *GameHustlerUpsertOne) Ignore() *GameHustlerUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *GameHustlerUpsertOne) DoNothing() *GameHustlerUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the GameHustlerCreate.OnConflict
// documentation for more info.
func (u *GameHustlerUpsertOne) Update(set func(*GameHustlerUpsert)) *GameHustlerUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&GameHustlerUpsert{UpdateSet: update})
	}))
	return u
}

// SetLastPosition sets the "lastPosition" field.
func (u *GameHustlerUpsertOne) SetLastPosition(v schema.Position) *GameHustlerUpsertOne {
	return u.Update(func(s *GameHustlerUpsert) {
		s.SetLastPosition(v)
	})
}

// UpdateLastPosition sets the "lastPosition" field to the value that was provided on create.
func (u *GameHustlerUpsertOne) UpdateLastPosition() *GameHustlerUpsertOne {
	return u.Update(func(s *GameHustlerUpsert) {
		s.UpdateLastPosition()
	})
}

// SetRelations sets the "relations" field.
func (u *GameHustlerUpsertOne) SetRelations(v []schema.GameHustlerCitizen) *GameHustlerUpsertOne {
	return u.Update(func(s *GameHustlerUpsert) {
		s.SetRelations(v)
	})
}

// UpdateRelations sets the "relations" field to the value that was provided on create.
func (u *GameHustlerUpsertOne) UpdateRelations() *GameHustlerUpsertOne {
	return u.Update(func(s *GameHustlerUpsert) {
		s.UpdateRelations()
	})
}

// SetQuests sets the "quests" field.
func (u *GameHustlerUpsertOne) SetQuests(v []schema.GameHustlerQuest) *GameHustlerUpsertOne {
	return u.Update(func(s *GameHustlerUpsert) {
		s.SetQuests(v)
	})
}

// UpdateQuests sets the "quests" field to the value that was provided on create.
func (u *GameHustlerUpsertOne) UpdateQuests() *GameHustlerUpsertOne {
	return u.Update(func(s *GameHustlerUpsert) {
		s.UpdateQuests()
	})
}

// SetItems sets the "items" field.
func (u *GameHustlerUpsertOne) SetItems(v []schema.GameHustlerItem) *GameHustlerUpsertOne {
	return u.Update(func(s *GameHustlerUpsert) {
		s.SetItems(v)
	})
}

// UpdateItems sets the "items" field to the value that was provided on create.
func (u *GameHustlerUpsertOne) UpdateItems() *GameHustlerUpsertOne {
	return u.Update(func(s *GameHustlerUpsert) {
		s.UpdateItems()
	})
}

// SetCreatedAt sets the "created_at" field.
func (u *GameHustlerUpsertOne) SetCreatedAt(v time.Time) *GameHustlerUpsertOne {
	return u.Update(func(s *GameHustlerUpsert) {
		s.SetCreatedAt(v)
	})
}

// UpdateCreatedAt sets the "created_at" field to the value that was provided on create.
func (u *GameHustlerUpsertOne) UpdateCreatedAt() *GameHustlerUpsertOne {
	return u.Update(func(s *GameHustlerUpsert) {
		s.UpdateCreatedAt()
	})
}

// Exec executes the query.
func (u *GameHustlerUpsertOne) Exec(ctx context.Context) error {
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for GameHustlerCreate.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *GameHustlerUpsertOne) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}

// Exec executes the UPSERT query and returns the inserted/updated ID.
func (u *GameHustlerUpsertOne) ID(ctx context.Context) (id string, err error) {
	if u.create.driver.Dialect() == dialect.MySQL {
		// In case of "ON CONFLICT", there is no way to get back non-numeric ID
		// fields from the database since MySQL does not support the RETURNING clause.
		return id, errors.New("ent: GameHustlerUpsertOne.ID is not supported by MySQL driver. Use GameHustlerUpsertOne.Exec instead")
	}
	node, err := u.create.Save(ctx)
	if err != nil {
		return id, err
	}
	return node.ID, nil
}

// IDX is like ID, but panics if an error occurs.
func (u *GameHustlerUpsertOne) IDX(ctx context.Context) string {
	id, err := u.ID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// GameHustlerCreateBulk is the builder for creating many GameHustler entities in bulk.
type GameHustlerCreateBulk struct {
	config
	builders []*GameHustlerCreate
	conflict []sql.ConflictOption
}

// Save creates the GameHustler entities in the database.
func (ghcb *GameHustlerCreateBulk) Save(ctx context.Context) ([]*GameHustler, error) {
	specs := make([]*sqlgraph.CreateSpec, len(ghcb.builders))
	nodes := make([]*GameHustler, len(ghcb.builders))
	mutators := make([]Mutator, len(ghcb.builders))
	for i := range ghcb.builders {
		func(i int, root context.Context) {
			builder := ghcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*GameHustlerMutation)
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
					_, err = mutators[i+1].Mutate(root, ghcb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					spec.OnConflict = ghcb.conflict
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, ghcb.driver, spec); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, ghcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (ghcb *GameHustlerCreateBulk) SaveX(ctx context.Context) []*GameHustler {
	v, err := ghcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ghcb *GameHustlerCreateBulk) Exec(ctx context.Context) error {
	_, err := ghcb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ghcb *GameHustlerCreateBulk) ExecX(ctx context.Context) {
	if err := ghcb.Exec(ctx); err != nil {
		panic(err)
	}
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.GameHustler.CreateBulk(builders...).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.GameHustlerUpsert) {
//			SetLastPosition(v+v).
//		}).
//		Exec(ctx)
//
func (ghcb *GameHustlerCreateBulk) OnConflict(opts ...sql.ConflictOption) *GameHustlerUpsertBulk {
	ghcb.conflict = opts
	return &GameHustlerUpsertBulk{
		create: ghcb,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.GameHustler.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
//
func (ghcb *GameHustlerCreateBulk) OnConflictColumns(columns ...string) *GameHustlerUpsertBulk {
	ghcb.conflict = append(ghcb.conflict, sql.ConflictColumns(columns...))
	return &GameHustlerUpsertBulk{
		create: ghcb,
	}
}

// GameHustlerUpsertBulk is the builder for "upsert"-ing
// a bulk of GameHustler nodes.
type GameHustlerUpsertBulk struct {
	create *GameHustlerCreateBulk
}

// UpdateNewValues updates the mutable fields using the new values that
// were set on create. Using this option is equivalent to using:
//
//	client.GameHustler.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(gamehustler.FieldID)
//			}),
//		).
//		Exec(ctx)
//
func (u *GameHustlerUpsertBulk) UpdateNewValues() *GameHustlerUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		for _, b := range u.create.builders {
			if _, exists := b.mutation.ID(); exists {
				s.SetIgnore(gamehustler.FieldID)
				return
			}
			if _, exists := b.mutation.CreatedAt(); exists {
				s.SetIgnore(gamehustler.FieldCreatedAt)
			}
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//	client.GameHustler.Create().
//		OnConflict(sql.ResolveWithIgnore()).
//		Exec(ctx)
//
func (u *GameHustlerUpsertBulk) Ignore() *GameHustlerUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *GameHustlerUpsertBulk) DoNothing() *GameHustlerUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the GameHustlerCreateBulk.OnConflict
// documentation for more info.
func (u *GameHustlerUpsertBulk) Update(set func(*GameHustlerUpsert)) *GameHustlerUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&GameHustlerUpsert{UpdateSet: update})
	}))
	return u
}

// SetLastPosition sets the "lastPosition" field.
func (u *GameHustlerUpsertBulk) SetLastPosition(v schema.Position) *GameHustlerUpsertBulk {
	return u.Update(func(s *GameHustlerUpsert) {
		s.SetLastPosition(v)
	})
}

// UpdateLastPosition sets the "lastPosition" field to the value that was provided on create.
func (u *GameHustlerUpsertBulk) UpdateLastPosition() *GameHustlerUpsertBulk {
	return u.Update(func(s *GameHustlerUpsert) {
		s.UpdateLastPosition()
	})
}

// SetRelations sets the "relations" field.
func (u *GameHustlerUpsertBulk) SetRelations(v []schema.GameHustlerCitizen) *GameHustlerUpsertBulk {
	return u.Update(func(s *GameHustlerUpsert) {
		s.SetRelations(v)
	})
}

// UpdateRelations sets the "relations" field to the value that was provided on create.
func (u *GameHustlerUpsertBulk) UpdateRelations() *GameHustlerUpsertBulk {
	return u.Update(func(s *GameHustlerUpsert) {
		s.UpdateRelations()
	})
}

// SetQuests sets the "quests" field.
func (u *GameHustlerUpsertBulk) SetQuests(v []schema.GameHustlerQuest) *GameHustlerUpsertBulk {
	return u.Update(func(s *GameHustlerUpsert) {
		s.SetQuests(v)
	})
}

// UpdateQuests sets the "quests" field to the value that was provided on create.
func (u *GameHustlerUpsertBulk) UpdateQuests() *GameHustlerUpsertBulk {
	return u.Update(func(s *GameHustlerUpsert) {
		s.UpdateQuests()
	})
}

// SetItems sets the "items" field.
func (u *GameHustlerUpsertBulk) SetItems(v []schema.GameHustlerItem) *GameHustlerUpsertBulk {
	return u.Update(func(s *GameHustlerUpsert) {
		s.SetItems(v)
	})
}

// UpdateItems sets the "items" field to the value that was provided on create.
func (u *GameHustlerUpsertBulk) UpdateItems() *GameHustlerUpsertBulk {
	return u.Update(func(s *GameHustlerUpsert) {
		s.UpdateItems()
	})
}

// SetCreatedAt sets the "created_at" field.
func (u *GameHustlerUpsertBulk) SetCreatedAt(v time.Time) *GameHustlerUpsertBulk {
	return u.Update(func(s *GameHustlerUpsert) {
		s.SetCreatedAt(v)
	})
}

// UpdateCreatedAt sets the "created_at" field to the value that was provided on create.
func (u *GameHustlerUpsertBulk) UpdateCreatedAt() *GameHustlerUpsertBulk {
	return u.Update(func(s *GameHustlerUpsert) {
		s.UpdateCreatedAt()
	})
}

// Exec executes the query.
func (u *GameHustlerUpsertBulk) Exec(ctx context.Context) error {
	for i, b := range u.create.builders {
		if len(b.conflict) != 0 {
			return fmt.Errorf("ent: OnConflict was set for builder %d. Set it on the GameHustlerCreateBulk instead", i)
		}
	}
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for GameHustlerCreateBulk.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *GameHustlerUpsertBulk) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}
