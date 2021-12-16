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
	"github.com/dopedao/dope-monorepo/packages/api/ent/event"
	"github.com/ethereum/go-ethereum/common"
)

// EventCreate is the builder for creating a Event entity.
type EventCreate struct {
	config
	mutation *EventMutation
	hooks    []Hook
	conflict []sql.ConflictOption
}

// SetAddress sets the "address" field.
func (ec *EventCreate) SetAddress(c common.Address) *EventCreate {
	ec.mutation.SetAddress(c)
	return ec
}

// SetIndex sets the "index" field.
func (ec *EventCreate) SetIndex(u uint64) *EventCreate {
	ec.mutation.SetIndex(u)
	return ec
}

// SetHash sets the "hash" field.
func (ec *EventCreate) SetHash(c common.Hash) *EventCreate {
	ec.mutation.SetHash(c)
	return ec
}

// SetCreatedAt sets the "created_at" field.
func (ec *EventCreate) SetCreatedAt(t time.Time) *EventCreate {
	ec.mutation.SetCreatedAt(t)
	return ec
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (ec *EventCreate) SetNillableCreatedAt(t *time.Time) *EventCreate {
	if t != nil {
		ec.SetCreatedAt(*t)
	}
	return ec
}

// SetUpdatedAt sets the "updated_at" field.
func (ec *EventCreate) SetUpdatedAt(t time.Time) *EventCreate {
	ec.mutation.SetUpdatedAt(t)
	return ec
}

// SetNillableUpdatedAt sets the "updated_at" field if the given value is not nil.
func (ec *EventCreate) SetNillableUpdatedAt(t *time.Time) *EventCreate {
	if t != nil {
		ec.SetUpdatedAt(*t)
	}
	return ec
}

// SetID sets the "id" field.
func (ec *EventCreate) SetID(s string) *EventCreate {
	ec.mutation.SetID(s)
	return ec
}

// Mutation returns the EventMutation object of the builder.
func (ec *EventCreate) Mutation() *EventMutation {
	return ec.mutation
}

// Save creates the Event in the database.
func (ec *EventCreate) Save(ctx context.Context) (*Event, error) {
	var (
		err  error
		node *Event
	)
	ec.defaults()
	if len(ec.hooks) == 0 {
		if err = ec.check(); err != nil {
			return nil, err
		}
		node, err = ec.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*EventMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = ec.check(); err != nil {
				return nil, err
			}
			ec.mutation = mutation
			if node, err = ec.sqlSave(ctx); err != nil {
				return nil, err
			}
			mutation.id = &node.ID
			mutation.done = true
			return node, err
		})
		for i := len(ec.hooks) - 1; i >= 0; i-- {
			if ec.hooks[i] == nil {
				return nil, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = ec.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ec.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (ec *EventCreate) SaveX(ctx context.Context) *Event {
	v, err := ec.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ec *EventCreate) Exec(ctx context.Context) error {
	_, err := ec.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ec *EventCreate) ExecX(ctx context.Context) {
	if err := ec.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ec *EventCreate) defaults() {
	if _, ok := ec.mutation.CreatedAt(); !ok {
		v := event.DefaultCreatedAt()
		ec.mutation.SetCreatedAt(v)
	}
	if _, ok := ec.mutation.UpdatedAt(); !ok {
		v := event.DefaultUpdatedAt()
		ec.mutation.SetUpdatedAt(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ec *EventCreate) check() error {
	if _, ok := ec.mutation.Address(); !ok {
		return &ValidationError{Name: "address", err: errors.New(`ent: missing required field "Event.address"`)}
	}
	if _, ok := ec.mutation.Index(); !ok {
		return &ValidationError{Name: "index", err: errors.New(`ent: missing required field "Event.index"`)}
	}
	if _, ok := ec.mutation.Hash(); !ok {
		return &ValidationError{Name: "hash", err: errors.New(`ent: missing required field "Event.hash"`)}
	}
	if _, ok := ec.mutation.CreatedAt(); !ok {
		return &ValidationError{Name: "created_at", err: errors.New(`ent: missing required field "Event.created_at"`)}
	}
	if _, ok := ec.mutation.UpdatedAt(); !ok {
		return &ValidationError{Name: "updated_at", err: errors.New(`ent: missing required field "Event.updated_at"`)}
	}
	return nil
}

func (ec *EventCreate) sqlSave(ctx context.Context) (*Event, error) {
	_node, _spec := ec.createSpec()
	if err := sqlgraph.CreateNode(ctx, ec.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return nil, err
	}
	if _spec.ID.Value != nil {
		if id, ok := _spec.ID.Value.(string); ok {
			_node.ID = id
		} else {
			return nil, fmt.Errorf("unexpected Event.ID type: %T", _spec.ID.Value)
		}
	}
	return _node, nil
}

func (ec *EventCreate) createSpec() (*Event, *sqlgraph.CreateSpec) {
	var (
		_node = &Event{config: ec.config}
		_spec = &sqlgraph.CreateSpec{
			Table: event.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: event.FieldID,
			},
		}
	)
	_spec.OnConflict = ec.conflict
	if id, ok := ec.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = id
	}
	if value, ok := ec.mutation.Address(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeBytes,
			Value:  value,
			Column: event.FieldAddress,
		})
		_node.Address = value
	}
	if value, ok := ec.mutation.Index(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeUint64,
			Value:  value,
			Column: event.FieldIndex,
		})
		_node.Index = value
	}
	if value, ok := ec.mutation.Hash(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeBytes,
			Value:  value,
			Column: event.FieldHash,
		})
		_node.Hash = value
	}
	if value, ok := ec.mutation.CreatedAt(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: event.FieldCreatedAt,
		})
		_node.CreatedAt = value
	}
	if value, ok := ec.mutation.UpdatedAt(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: event.FieldUpdatedAt,
		})
		_node.UpdatedAt = value
	}
	return _node, _spec
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.Event.Create().
//		SetAddress(v).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.EventUpsert) {
//			SetAddress(v+v).
//		}).
//		Exec(ctx)
//
func (ec *EventCreate) OnConflict(opts ...sql.ConflictOption) *EventUpsertOne {
	ec.conflict = opts
	return &EventUpsertOne{
		create: ec,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.Event.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
//
func (ec *EventCreate) OnConflictColumns(columns ...string) *EventUpsertOne {
	ec.conflict = append(ec.conflict, sql.ConflictColumns(columns...))
	return &EventUpsertOne{
		create: ec,
	}
}

type (
	// EventUpsertOne is the builder for "upsert"-ing
	//  one Event node.
	EventUpsertOne struct {
		create *EventCreate
	}

	// EventUpsert is the "OnConflict" setter.
	EventUpsert struct {
		*sql.UpdateSet
	}
)

// SetAddress sets the "address" field.
func (u *EventUpsert) SetAddress(v common.Address) *EventUpsert {
	u.Set(event.FieldAddress, v)
	return u
}

// UpdateAddress sets the "address" field to the value that was provided on create.
func (u *EventUpsert) UpdateAddress() *EventUpsert {
	u.SetExcluded(event.FieldAddress)
	return u
}

// SetIndex sets the "index" field.
func (u *EventUpsert) SetIndex(v uint64) *EventUpsert {
	u.Set(event.FieldIndex, v)
	return u
}

// UpdateIndex sets the "index" field to the value that was provided on create.
func (u *EventUpsert) UpdateIndex() *EventUpsert {
	u.SetExcluded(event.FieldIndex)
	return u
}

// AddIndex adds v to the "index" field.
func (u *EventUpsert) AddIndex(v uint64) *EventUpsert {
	u.Add(event.FieldIndex, v)
	return u
}

// SetHash sets the "hash" field.
func (u *EventUpsert) SetHash(v common.Hash) *EventUpsert {
	u.Set(event.FieldHash, v)
	return u
}

// UpdateHash sets the "hash" field to the value that was provided on create.
func (u *EventUpsert) UpdateHash() *EventUpsert {
	u.SetExcluded(event.FieldHash)
	return u
}

// SetCreatedAt sets the "created_at" field.
func (u *EventUpsert) SetCreatedAt(v time.Time) *EventUpsert {
	u.Set(event.FieldCreatedAt, v)
	return u
}

// UpdateCreatedAt sets the "created_at" field to the value that was provided on create.
func (u *EventUpsert) UpdateCreatedAt() *EventUpsert {
	u.SetExcluded(event.FieldCreatedAt)
	return u
}

// SetUpdatedAt sets the "updated_at" field.
func (u *EventUpsert) SetUpdatedAt(v time.Time) *EventUpsert {
	u.Set(event.FieldUpdatedAt, v)
	return u
}

// UpdateUpdatedAt sets the "updated_at" field to the value that was provided on create.
func (u *EventUpsert) UpdateUpdatedAt() *EventUpsert {
	u.SetExcluded(event.FieldUpdatedAt)
	return u
}

// UpdateNewValues updates the mutable fields using the new values that were set on create except the ID field.
// Using this option is equivalent to using:
//
//	client.Event.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(event.FieldID)
//			}),
//		).
//		Exec(ctx)
//
func (u *EventUpsertOne) UpdateNewValues() *EventUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		if _, exists := u.create.mutation.ID(); exists {
			s.SetIgnore(event.FieldID)
		}
		if _, exists := u.create.mutation.Address(); exists {
			s.SetIgnore(event.FieldAddress)
		}
		if _, exists := u.create.mutation.Index(); exists {
			s.SetIgnore(event.FieldIndex)
		}
		if _, exists := u.create.mutation.Hash(); exists {
			s.SetIgnore(event.FieldHash)
		}
		if _, exists := u.create.mutation.CreatedAt(); exists {
			s.SetIgnore(event.FieldCreatedAt)
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//  client.Event.Create().
//      OnConflict(sql.ResolveWithIgnore()).
//      Exec(ctx)
//
func (u *EventUpsertOne) Ignore() *EventUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *EventUpsertOne) DoNothing() *EventUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the EventCreate.OnConflict
// documentation for more info.
func (u *EventUpsertOne) Update(set func(*EventUpsert)) *EventUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&EventUpsert{UpdateSet: update})
	}))
	return u
}

// SetAddress sets the "address" field.
func (u *EventUpsertOne) SetAddress(v common.Address) *EventUpsertOne {
	return u.Update(func(s *EventUpsert) {
		s.SetAddress(v)
	})
}

// UpdateAddress sets the "address" field to the value that was provided on create.
func (u *EventUpsertOne) UpdateAddress() *EventUpsertOne {
	return u.Update(func(s *EventUpsert) {
		s.UpdateAddress()
	})
}

// SetIndex sets the "index" field.
func (u *EventUpsertOne) SetIndex(v uint64) *EventUpsertOne {
	return u.Update(func(s *EventUpsert) {
		s.SetIndex(v)
	})
}

// AddIndex adds v to the "index" field.
func (u *EventUpsertOne) AddIndex(v uint64) *EventUpsertOne {
	return u.Update(func(s *EventUpsert) {
		s.AddIndex(v)
	})
}

// UpdateIndex sets the "index" field to the value that was provided on create.
func (u *EventUpsertOne) UpdateIndex() *EventUpsertOne {
	return u.Update(func(s *EventUpsert) {
		s.UpdateIndex()
	})
}

// SetHash sets the "hash" field.
func (u *EventUpsertOne) SetHash(v common.Hash) *EventUpsertOne {
	return u.Update(func(s *EventUpsert) {
		s.SetHash(v)
	})
}

// UpdateHash sets the "hash" field to the value that was provided on create.
func (u *EventUpsertOne) UpdateHash() *EventUpsertOne {
	return u.Update(func(s *EventUpsert) {
		s.UpdateHash()
	})
}

// SetCreatedAt sets the "created_at" field.
func (u *EventUpsertOne) SetCreatedAt(v time.Time) *EventUpsertOne {
	return u.Update(func(s *EventUpsert) {
		s.SetCreatedAt(v)
	})
}

// UpdateCreatedAt sets the "created_at" field to the value that was provided on create.
func (u *EventUpsertOne) UpdateCreatedAt() *EventUpsertOne {
	return u.Update(func(s *EventUpsert) {
		s.UpdateCreatedAt()
	})
}

// SetUpdatedAt sets the "updated_at" field.
func (u *EventUpsertOne) SetUpdatedAt(v time.Time) *EventUpsertOne {
	return u.Update(func(s *EventUpsert) {
		s.SetUpdatedAt(v)
	})
}

// UpdateUpdatedAt sets the "updated_at" field to the value that was provided on create.
func (u *EventUpsertOne) UpdateUpdatedAt() *EventUpsertOne {
	return u.Update(func(s *EventUpsert) {
		s.UpdateUpdatedAt()
	})
}

// Exec executes the query.
func (u *EventUpsertOne) Exec(ctx context.Context) error {
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for EventCreate.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *EventUpsertOne) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}

// Exec executes the UPSERT query and returns the inserted/updated ID.
func (u *EventUpsertOne) ID(ctx context.Context) (id string, err error) {
	if u.create.driver.Dialect() == dialect.MySQL {
		// In case of "ON CONFLICT", there is no way to get back non-numeric ID
		// fields from the database since MySQL does not support the RETURNING clause.
		return id, errors.New("ent: EventUpsertOne.ID is not supported by MySQL driver. Use EventUpsertOne.Exec instead")
	}
	node, err := u.create.Save(ctx)
	if err != nil {
		return id, err
	}
	return node.ID, nil
}

// IDX is like ID, but panics if an error occurs.
func (u *EventUpsertOne) IDX(ctx context.Context) string {
	id, err := u.ID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// EventCreateBulk is the builder for creating many Event entities in bulk.
type EventCreateBulk struct {
	config
	builders []*EventCreate
	conflict []sql.ConflictOption
}

// Save creates the Event entities in the database.
func (ecb *EventCreateBulk) Save(ctx context.Context) ([]*Event, error) {
	specs := make([]*sqlgraph.CreateSpec, len(ecb.builders))
	nodes := make([]*Event, len(ecb.builders))
	mutators := make([]Mutator, len(ecb.builders))
	for i := range ecb.builders {
		func(i int, root context.Context) {
			builder := ecb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*EventMutation)
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
					_, err = mutators[i+1].Mutate(root, ecb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					spec.OnConflict = ecb.conflict
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, ecb.driver, spec); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, ecb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (ecb *EventCreateBulk) SaveX(ctx context.Context) []*Event {
	v, err := ecb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ecb *EventCreateBulk) Exec(ctx context.Context) error {
	_, err := ecb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ecb *EventCreateBulk) ExecX(ctx context.Context) {
	if err := ecb.Exec(ctx); err != nil {
		panic(err)
	}
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.Event.CreateBulk(builders...).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.EventUpsert) {
//			SetAddress(v+v).
//		}).
//		Exec(ctx)
//
func (ecb *EventCreateBulk) OnConflict(opts ...sql.ConflictOption) *EventUpsertBulk {
	ecb.conflict = opts
	return &EventUpsertBulk{
		create: ecb,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.Event.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
//
func (ecb *EventCreateBulk) OnConflictColumns(columns ...string) *EventUpsertBulk {
	ecb.conflict = append(ecb.conflict, sql.ConflictColumns(columns...))
	return &EventUpsertBulk{
		create: ecb,
	}
}

// EventUpsertBulk is the builder for "upsert"-ing
// a bulk of Event nodes.
type EventUpsertBulk struct {
	create *EventCreateBulk
}

// UpdateNewValues updates the mutable fields using the new values that
// were set on create. Using this option is equivalent to using:
//
//	client.Event.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(event.FieldID)
//			}),
//		).
//		Exec(ctx)
//
func (u *EventUpsertBulk) UpdateNewValues() *EventUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		for _, b := range u.create.builders {
			if _, exists := b.mutation.ID(); exists {
				s.SetIgnore(event.FieldID)
				return
			}
			if _, exists := b.mutation.Address(); exists {
				s.SetIgnore(event.FieldAddress)
			}
			if _, exists := b.mutation.Index(); exists {
				s.SetIgnore(event.FieldIndex)
			}
			if _, exists := b.mutation.Hash(); exists {
				s.SetIgnore(event.FieldHash)
			}
			if _, exists := b.mutation.CreatedAt(); exists {
				s.SetIgnore(event.FieldCreatedAt)
			}
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//	client.Event.Create().
//		OnConflict(sql.ResolveWithIgnore()).
//		Exec(ctx)
//
func (u *EventUpsertBulk) Ignore() *EventUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *EventUpsertBulk) DoNothing() *EventUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the EventCreateBulk.OnConflict
// documentation for more info.
func (u *EventUpsertBulk) Update(set func(*EventUpsert)) *EventUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&EventUpsert{UpdateSet: update})
	}))
	return u
}

// SetAddress sets the "address" field.
func (u *EventUpsertBulk) SetAddress(v common.Address) *EventUpsertBulk {
	return u.Update(func(s *EventUpsert) {
		s.SetAddress(v)
	})
}

// UpdateAddress sets the "address" field to the value that was provided on create.
func (u *EventUpsertBulk) UpdateAddress() *EventUpsertBulk {
	return u.Update(func(s *EventUpsert) {
		s.UpdateAddress()
	})
}

// SetIndex sets the "index" field.
func (u *EventUpsertBulk) SetIndex(v uint64) *EventUpsertBulk {
	return u.Update(func(s *EventUpsert) {
		s.SetIndex(v)
	})
}

// AddIndex adds v to the "index" field.
func (u *EventUpsertBulk) AddIndex(v uint64) *EventUpsertBulk {
	return u.Update(func(s *EventUpsert) {
		s.AddIndex(v)
	})
}

// UpdateIndex sets the "index" field to the value that was provided on create.
func (u *EventUpsertBulk) UpdateIndex() *EventUpsertBulk {
	return u.Update(func(s *EventUpsert) {
		s.UpdateIndex()
	})
}

// SetHash sets the "hash" field.
func (u *EventUpsertBulk) SetHash(v common.Hash) *EventUpsertBulk {
	return u.Update(func(s *EventUpsert) {
		s.SetHash(v)
	})
}

// UpdateHash sets the "hash" field to the value that was provided on create.
func (u *EventUpsertBulk) UpdateHash() *EventUpsertBulk {
	return u.Update(func(s *EventUpsert) {
		s.UpdateHash()
	})
}

// SetCreatedAt sets the "created_at" field.
func (u *EventUpsertBulk) SetCreatedAt(v time.Time) *EventUpsertBulk {
	return u.Update(func(s *EventUpsert) {
		s.SetCreatedAt(v)
	})
}

// UpdateCreatedAt sets the "created_at" field to the value that was provided on create.
func (u *EventUpsertBulk) UpdateCreatedAt() *EventUpsertBulk {
	return u.Update(func(s *EventUpsert) {
		s.UpdateCreatedAt()
	})
}

// SetUpdatedAt sets the "updated_at" field.
func (u *EventUpsertBulk) SetUpdatedAt(v time.Time) *EventUpsertBulk {
	return u.Update(func(s *EventUpsert) {
		s.SetUpdatedAt(v)
	})
}

// UpdateUpdatedAt sets the "updated_at" field to the value that was provided on create.
func (u *EventUpsertBulk) UpdateUpdatedAt() *EventUpsertBulk {
	return u.Update(func(s *EventUpsert) {
		s.UpdateUpdatedAt()
	})
}

// Exec executes the query.
func (u *EventUpsertBulk) Exec(ctx context.Context) error {
	for i, b := range u.create.builders {
		if len(b.conflict) != 0 {
			return fmt.Errorf("ent: OnConflict was set for builder %d. Set it on the EventCreateBulk instead", i)
		}
	}
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for EventCreateBulk.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *EventUpsertBulk) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}