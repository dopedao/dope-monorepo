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
	"github.com/dopedao/dope-monorepo/packages/api/ent/syncstate"
)

// SyncStateCreate is the builder for creating a SyncState entity.
type SyncStateCreate struct {
	config
	mutation *SyncStateMutation
	hooks    []Hook
	conflict []sql.ConflictOption
}

// SetStartAt sets the "start_at" field.
func (ssc *SyncStateCreate) SetStartAt(u uint64) *SyncStateCreate {
	ssc.mutation.SetStartAt(u)
	return ssc
}

// SetID sets the "id" field.
func (ssc *SyncStateCreate) SetID(s string) *SyncStateCreate {
	ssc.mutation.SetID(s)
	return ssc
}

// Mutation returns the SyncStateMutation object of the builder.
func (ssc *SyncStateCreate) Mutation() *SyncStateMutation {
	return ssc.mutation
}

// Save creates the SyncState in the database.
func (ssc *SyncStateCreate) Save(ctx context.Context) (*SyncState, error) {
	var (
		err  error
		node *SyncState
	)
	if len(ssc.hooks) == 0 {
		if err = ssc.check(); err != nil {
			return nil, err
		}
		node, err = ssc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*SyncStateMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = ssc.check(); err != nil {
				return nil, err
			}
			ssc.mutation = mutation
			if node, err = ssc.sqlSave(ctx); err != nil {
				return nil, err
			}
			mutation.id = &node.ID
			mutation.done = true
			return node, err
		})
		for i := len(ssc.hooks) - 1; i >= 0; i-- {
			if ssc.hooks[i] == nil {
				return nil, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = ssc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ssc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (ssc *SyncStateCreate) SaveX(ctx context.Context) *SyncState {
	v, err := ssc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ssc *SyncStateCreate) Exec(ctx context.Context) error {
	_, err := ssc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ssc *SyncStateCreate) ExecX(ctx context.Context) {
	if err := ssc.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ssc *SyncStateCreate) check() error {
	if _, ok := ssc.mutation.StartAt(); !ok {
		return &ValidationError{Name: "start_at", err: errors.New(`ent: missing required field "SyncState.start_at"`)}
	}
	return nil
}

func (ssc *SyncStateCreate) sqlSave(ctx context.Context) (*SyncState, error) {
	_node, _spec := ssc.createSpec()
	if err := sqlgraph.CreateNode(ctx, ssc.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return nil, err
	}
	if _spec.ID.Value != nil {
		if id, ok := _spec.ID.Value.(string); ok {
			_node.ID = id
		} else {
			return nil, fmt.Errorf("unexpected SyncState.ID type: %T", _spec.ID.Value)
		}
	}
	return _node, nil
}

func (ssc *SyncStateCreate) createSpec() (*SyncState, *sqlgraph.CreateSpec) {
	var (
		_node = &SyncState{config: ssc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: syncstate.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: syncstate.FieldID,
			},
		}
	)
	_spec.OnConflict = ssc.conflict
	if id, ok := ssc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = id
	}
	if value, ok := ssc.mutation.StartAt(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeUint64,
			Value:  value,
			Column: syncstate.FieldStartAt,
		})
		_node.StartAt = value
	}
	return _node, _spec
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.SyncState.Create().
//		SetStartAt(v).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.SyncStateUpsert) {
//			SetStartAt(v+v).
//		}).
//		Exec(ctx)
//
func (ssc *SyncStateCreate) OnConflict(opts ...sql.ConflictOption) *SyncStateUpsertOne {
	ssc.conflict = opts
	return &SyncStateUpsertOne{
		create: ssc,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.SyncState.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
//
func (ssc *SyncStateCreate) OnConflictColumns(columns ...string) *SyncStateUpsertOne {
	ssc.conflict = append(ssc.conflict, sql.ConflictColumns(columns...))
	return &SyncStateUpsertOne{
		create: ssc,
	}
}

type (
	// SyncStateUpsertOne is the builder for "upsert"-ing
	//  one SyncState node.
	SyncStateUpsertOne struct {
		create *SyncStateCreate
	}

	// SyncStateUpsert is the "OnConflict" setter.
	SyncStateUpsert struct {
		*sql.UpdateSet
	}
)

// SetStartAt sets the "start_at" field.
func (u *SyncStateUpsert) SetStartAt(v uint64) *SyncStateUpsert {
	u.Set(syncstate.FieldStartAt, v)
	return u
}

// UpdateStartAt sets the "start_at" field to the value that was provided on create.
func (u *SyncStateUpsert) UpdateStartAt() *SyncStateUpsert {
	u.SetExcluded(syncstate.FieldStartAt)
	return u
}

// AddStartAt adds v to the "start_at" field.
func (u *SyncStateUpsert) AddStartAt(v uint64) *SyncStateUpsert {
	u.Add(syncstate.FieldStartAt, v)
	return u
}

// UpdateNewValues updates the mutable fields using the new values that were set on create except the ID field.
// Using this option is equivalent to using:
//
//	client.SyncState.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(syncstate.FieldID)
//			}),
//		).
//		Exec(ctx)
//
func (u *SyncStateUpsertOne) UpdateNewValues() *SyncStateUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		if _, exists := u.create.mutation.ID(); exists {
			s.SetIgnore(syncstate.FieldID)
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//  client.SyncState.Create().
//      OnConflict(sql.ResolveWithIgnore()).
//      Exec(ctx)
//
func (u *SyncStateUpsertOne) Ignore() *SyncStateUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *SyncStateUpsertOne) DoNothing() *SyncStateUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the SyncStateCreate.OnConflict
// documentation for more info.
func (u *SyncStateUpsertOne) Update(set func(*SyncStateUpsert)) *SyncStateUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&SyncStateUpsert{UpdateSet: update})
	}))
	return u
}

// SetStartAt sets the "start_at" field.
func (u *SyncStateUpsertOne) SetStartAt(v uint64) *SyncStateUpsertOne {
	return u.Update(func(s *SyncStateUpsert) {
		s.SetStartAt(v)
	})
}

// AddStartAt adds v to the "start_at" field.
func (u *SyncStateUpsertOne) AddStartAt(v uint64) *SyncStateUpsertOne {
	return u.Update(func(s *SyncStateUpsert) {
		s.AddStartAt(v)
	})
}

// UpdateStartAt sets the "start_at" field to the value that was provided on create.
func (u *SyncStateUpsertOne) UpdateStartAt() *SyncStateUpsertOne {
	return u.Update(func(s *SyncStateUpsert) {
		s.UpdateStartAt()
	})
}

// Exec executes the query.
func (u *SyncStateUpsertOne) Exec(ctx context.Context) error {
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for SyncStateCreate.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *SyncStateUpsertOne) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}

// Exec executes the UPSERT query and returns the inserted/updated ID.
func (u *SyncStateUpsertOne) ID(ctx context.Context) (id string, err error) {
	if u.create.driver.Dialect() == dialect.MySQL {
		// In case of "ON CONFLICT", there is no way to get back non-numeric ID
		// fields from the database since MySQL does not support the RETURNING clause.
		return id, errors.New("ent: SyncStateUpsertOne.ID is not supported by MySQL driver. Use SyncStateUpsertOne.Exec instead")
	}
	node, err := u.create.Save(ctx)
	if err != nil {
		return id, err
	}
	return node.ID, nil
}

// IDX is like ID, but panics if an error occurs.
func (u *SyncStateUpsertOne) IDX(ctx context.Context) string {
	id, err := u.ID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// SyncStateCreateBulk is the builder for creating many SyncState entities in bulk.
type SyncStateCreateBulk struct {
	config
	builders []*SyncStateCreate
	conflict []sql.ConflictOption
}

// Save creates the SyncState entities in the database.
func (sscb *SyncStateCreateBulk) Save(ctx context.Context) ([]*SyncState, error) {
	specs := make([]*sqlgraph.CreateSpec, len(sscb.builders))
	nodes := make([]*SyncState, len(sscb.builders))
	mutators := make([]Mutator, len(sscb.builders))
	for i := range sscb.builders {
		func(i int, root context.Context) {
			builder := sscb.builders[i]
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*SyncStateMutation)
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
					_, err = mutators[i+1].Mutate(root, sscb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					spec.OnConflict = sscb.conflict
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, sscb.driver, spec); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, sscb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (sscb *SyncStateCreateBulk) SaveX(ctx context.Context) []*SyncState {
	v, err := sscb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (sscb *SyncStateCreateBulk) Exec(ctx context.Context) error {
	_, err := sscb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (sscb *SyncStateCreateBulk) ExecX(ctx context.Context) {
	if err := sscb.Exec(ctx); err != nil {
		panic(err)
	}
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.SyncState.CreateBulk(builders...).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.SyncStateUpsert) {
//			SetStartAt(v+v).
//		}).
//		Exec(ctx)
//
func (sscb *SyncStateCreateBulk) OnConflict(opts ...sql.ConflictOption) *SyncStateUpsertBulk {
	sscb.conflict = opts
	return &SyncStateUpsertBulk{
		create: sscb,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.SyncState.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
//
func (sscb *SyncStateCreateBulk) OnConflictColumns(columns ...string) *SyncStateUpsertBulk {
	sscb.conflict = append(sscb.conflict, sql.ConflictColumns(columns...))
	return &SyncStateUpsertBulk{
		create: sscb,
	}
}

// SyncStateUpsertBulk is the builder for "upsert"-ing
// a bulk of SyncState nodes.
type SyncStateUpsertBulk struct {
	create *SyncStateCreateBulk
}

// UpdateNewValues updates the mutable fields using the new values that
// were set on create. Using this option is equivalent to using:
//
//	client.SyncState.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(syncstate.FieldID)
//			}),
//		).
//		Exec(ctx)
//
func (u *SyncStateUpsertBulk) UpdateNewValues() *SyncStateUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		for _, b := range u.create.builders {
			if _, exists := b.mutation.ID(); exists {
				s.SetIgnore(syncstate.FieldID)
				return
			}
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//	client.SyncState.Create().
//		OnConflict(sql.ResolveWithIgnore()).
//		Exec(ctx)
//
func (u *SyncStateUpsertBulk) Ignore() *SyncStateUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *SyncStateUpsertBulk) DoNothing() *SyncStateUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the SyncStateCreateBulk.OnConflict
// documentation for more info.
func (u *SyncStateUpsertBulk) Update(set func(*SyncStateUpsert)) *SyncStateUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&SyncStateUpsert{UpdateSet: update})
	}))
	return u
}

// SetStartAt sets the "start_at" field.
func (u *SyncStateUpsertBulk) SetStartAt(v uint64) *SyncStateUpsertBulk {
	return u.Update(func(s *SyncStateUpsert) {
		s.SetStartAt(v)
	})
}

// AddStartAt adds v to the "start_at" field.
func (u *SyncStateUpsertBulk) AddStartAt(v uint64) *SyncStateUpsertBulk {
	return u.Update(func(s *SyncStateUpsert) {
		s.AddStartAt(v)
	})
}

// UpdateStartAt sets the "start_at" field to the value that was provided on create.
func (u *SyncStateUpsertBulk) UpdateStartAt() *SyncStateUpsertBulk {
	return u.Update(func(s *SyncStateUpsert) {
		s.UpdateStartAt()
	})
}

// Exec executes the query.
func (u *SyncStateUpsertBulk) Exec(ctx context.Context) error {
	for i, b := range u.create.builders {
		if len(b.conflict) != 0 {
			return fmt.Errorf("ent: OnConflict was set for builder %d. Set it on the SyncStateCreateBulk instead", i)
		}
	}
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for SyncStateCreateBulk.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *SyncStateUpsertBulk) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}
