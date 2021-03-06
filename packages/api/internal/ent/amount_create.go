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
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/amount"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/listing"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/schema"
)

// AmountCreate is the builder for creating a Amount entity.
type AmountCreate struct {
	config
	mutation *AmountMutation
	hooks    []Hook
	conflict []sql.ConflictOption
}

// SetType sets the "type" field.
func (ac *AmountCreate) SetType(a amount.Type) *AmountCreate {
	ac.mutation.SetType(a)
	return ac
}

// SetAmount sets the "amount" field.
func (ac *AmountCreate) SetAmount(si schema.BigInt) *AmountCreate {
	ac.mutation.SetAmount(si)
	return ac
}

// SetNillableAmount sets the "amount" field if the given value is not nil.
func (ac *AmountCreate) SetNillableAmount(si *schema.BigInt) *AmountCreate {
	if si != nil {
		ac.SetAmount(*si)
	}
	return ac
}

// SetAssetID sets the "asset_id" field.
func (ac *AmountCreate) SetAssetID(si schema.BigInt) *AmountCreate {
	ac.mutation.SetAssetID(si)
	return ac
}

// SetNillableAssetID sets the "asset_id" field if the given value is not nil.
func (ac *AmountCreate) SetNillableAssetID(si *schema.BigInt) *AmountCreate {
	if si != nil {
		ac.SetAssetID(*si)
	}
	return ac
}

// SetID sets the "id" field.
func (ac *AmountCreate) SetID(s string) *AmountCreate {
	ac.mutation.SetID(s)
	return ac
}

// SetListingInputID sets the "listing_input" edge to the Listing entity by ID.
func (ac *AmountCreate) SetListingInputID(id string) *AmountCreate {
	ac.mutation.SetListingInputID(id)
	return ac
}

// SetNillableListingInputID sets the "listing_input" edge to the Listing entity by ID if the given value is not nil.
func (ac *AmountCreate) SetNillableListingInputID(id *string) *AmountCreate {
	if id != nil {
		ac = ac.SetListingInputID(*id)
	}
	return ac
}

// SetListingInput sets the "listing_input" edge to the Listing entity.
func (ac *AmountCreate) SetListingInput(l *Listing) *AmountCreate {
	return ac.SetListingInputID(l.ID)
}

// SetListingOutputID sets the "listing_output" edge to the Listing entity by ID.
func (ac *AmountCreate) SetListingOutputID(id string) *AmountCreate {
	ac.mutation.SetListingOutputID(id)
	return ac
}

// SetNillableListingOutputID sets the "listing_output" edge to the Listing entity by ID if the given value is not nil.
func (ac *AmountCreate) SetNillableListingOutputID(id *string) *AmountCreate {
	if id != nil {
		ac = ac.SetListingOutputID(*id)
	}
	return ac
}

// SetListingOutput sets the "listing_output" edge to the Listing entity.
func (ac *AmountCreate) SetListingOutput(l *Listing) *AmountCreate {
	return ac.SetListingOutputID(l.ID)
}

// Mutation returns the AmountMutation object of the builder.
func (ac *AmountCreate) Mutation() *AmountMutation {
	return ac.mutation
}

// Save creates the Amount in the database.
func (ac *AmountCreate) Save(ctx context.Context) (*Amount, error) {
	var (
		err  error
		node *Amount
	)
	ac.defaults()
	if len(ac.hooks) == 0 {
		if err = ac.check(); err != nil {
			return nil, err
		}
		node, err = ac.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*AmountMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = ac.check(); err != nil {
				return nil, err
			}
			ac.mutation = mutation
			if node, err = ac.sqlSave(ctx); err != nil {
				return nil, err
			}
			mutation.id = &node.ID
			mutation.done = true
			return node, err
		})
		for i := len(ac.hooks) - 1; i >= 0; i-- {
			if ac.hooks[i] == nil {
				return nil, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = ac.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ac.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (ac *AmountCreate) SaveX(ctx context.Context) *Amount {
	v, err := ac.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ac *AmountCreate) Exec(ctx context.Context) error {
	_, err := ac.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ac *AmountCreate) ExecX(ctx context.Context) {
	if err := ac.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ac *AmountCreate) defaults() {
	if _, ok := ac.mutation.Amount(); !ok {
		v := amount.DefaultAmount()
		ac.mutation.SetAmount(v)
	}
	if _, ok := ac.mutation.AssetID(); !ok {
		v := amount.DefaultAssetID()
		ac.mutation.SetAssetID(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ac *AmountCreate) check() error {
	if _, ok := ac.mutation.GetType(); !ok {
		return &ValidationError{Name: "type", err: errors.New(`ent: missing required field "Amount.type"`)}
	}
	if v, ok := ac.mutation.GetType(); ok {
		if err := amount.TypeValidator(v); err != nil {
			return &ValidationError{Name: "type", err: fmt.Errorf(`ent: validator failed for field "Amount.type": %w`, err)}
		}
	}
	if _, ok := ac.mutation.Amount(); !ok {
		return &ValidationError{Name: "amount", err: errors.New(`ent: missing required field "Amount.amount"`)}
	}
	if _, ok := ac.mutation.AssetID(); !ok {
		return &ValidationError{Name: "asset_id", err: errors.New(`ent: missing required field "Amount.asset_id"`)}
	}
	return nil
}

func (ac *AmountCreate) sqlSave(ctx context.Context) (*Amount, error) {
	_node, _spec := ac.createSpec()
	if err := sqlgraph.CreateNode(ctx, ac.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return nil, err
	}
	if _spec.ID.Value != nil {
		if id, ok := _spec.ID.Value.(string); ok {
			_node.ID = id
		} else {
			return nil, fmt.Errorf("unexpected Amount.ID type: %T", _spec.ID.Value)
		}
	}
	return _node, nil
}

func (ac *AmountCreate) createSpec() (*Amount, *sqlgraph.CreateSpec) {
	var (
		_node = &Amount{config: ac.config}
		_spec = &sqlgraph.CreateSpec{
			Table: amount.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: amount.FieldID,
			},
		}
	)
	_spec.OnConflict = ac.conflict
	if id, ok := ac.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = id
	}
	if value, ok := ac.mutation.GetType(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: amount.FieldType,
		})
		_node.Type = value
	}
	if value, ok := ac.mutation.Amount(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: amount.FieldAmount,
		})
		_node.Amount = value
	}
	if value, ok := ac.mutation.AssetID(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: amount.FieldAssetID,
		})
		_node.AssetID = value
	}
	if nodes := ac.mutation.ListingInputIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   amount.ListingInputTable,
			Columns: []string{amount.ListingInputColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: listing.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.listing_inputs = &nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ac.mutation.ListingOutputIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   amount.ListingOutputTable,
			Columns: []string{amount.ListingOutputColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: listing.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.listing_outputs = &nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.Amount.Create().
//		SetType(v).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.AmountUpsert) {
//			SetType(v+v).
//		}).
//		Exec(ctx)
//
func (ac *AmountCreate) OnConflict(opts ...sql.ConflictOption) *AmountUpsertOne {
	ac.conflict = opts
	return &AmountUpsertOne{
		create: ac,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.Amount.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
//
func (ac *AmountCreate) OnConflictColumns(columns ...string) *AmountUpsertOne {
	ac.conflict = append(ac.conflict, sql.ConflictColumns(columns...))
	return &AmountUpsertOne{
		create: ac,
	}
}

type (
	// AmountUpsertOne is the builder for "upsert"-ing
	//  one Amount node.
	AmountUpsertOne struct {
		create *AmountCreate
	}

	// AmountUpsert is the "OnConflict" setter.
	AmountUpsert struct {
		*sql.UpdateSet
	}
)

// SetType sets the "type" field.
func (u *AmountUpsert) SetType(v amount.Type) *AmountUpsert {
	u.Set(amount.FieldType, v)
	return u
}

// UpdateType sets the "type" field to the value that was provided on create.
func (u *AmountUpsert) UpdateType() *AmountUpsert {
	u.SetExcluded(amount.FieldType)
	return u
}

// SetAmount sets the "amount" field.
func (u *AmountUpsert) SetAmount(v schema.BigInt) *AmountUpsert {
	u.Set(amount.FieldAmount, v)
	return u
}

// UpdateAmount sets the "amount" field to the value that was provided on create.
func (u *AmountUpsert) UpdateAmount() *AmountUpsert {
	u.SetExcluded(amount.FieldAmount)
	return u
}

// AddAmount adds v to the "amount" field.
func (u *AmountUpsert) AddAmount(v schema.BigInt) *AmountUpsert {
	u.Add(amount.FieldAmount, v)
	return u
}

// SetAssetID sets the "asset_id" field.
func (u *AmountUpsert) SetAssetID(v schema.BigInt) *AmountUpsert {
	u.Set(amount.FieldAssetID, v)
	return u
}

// UpdateAssetID sets the "asset_id" field to the value that was provided on create.
func (u *AmountUpsert) UpdateAssetID() *AmountUpsert {
	u.SetExcluded(amount.FieldAssetID)
	return u
}

// AddAssetID adds v to the "asset_id" field.
func (u *AmountUpsert) AddAssetID(v schema.BigInt) *AmountUpsert {
	u.Add(amount.FieldAssetID, v)
	return u
}

// UpdateNewValues updates the mutable fields using the new values that were set on create except the ID field.
// Using this option is equivalent to using:
//
//	client.Amount.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(amount.FieldID)
//			}),
//		).
//		Exec(ctx)
//
func (u *AmountUpsertOne) UpdateNewValues() *AmountUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		if _, exists := u.create.mutation.ID(); exists {
			s.SetIgnore(amount.FieldID)
		}
		if _, exists := u.create.mutation.GetType(); exists {
			s.SetIgnore(amount.FieldType)
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//  client.Amount.Create().
//      OnConflict(sql.ResolveWithIgnore()).
//      Exec(ctx)
//
func (u *AmountUpsertOne) Ignore() *AmountUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *AmountUpsertOne) DoNothing() *AmountUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the AmountCreate.OnConflict
// documentation for more info.
func (u *AmountUpsertOne) Update(set func(*AmountUpsert)) *AmountUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&AmountUpsert{UpdateSet: update})
	}))
	return u
}

// SetType sets the "type" field.
func (u *AmountUpsertOne) SetType(v amount.Type) *AmountUpsertOne {
	return u.Update(func(s *AmountUpsert) {
		s.SetType(v)
	})
}

// UpdateType sets the "type" field to the value that was provided on create.
func (u *AmountUpsertOne) UpdateType() *AmountUpsertOne {
	return u.Update(func(s *AmountUpsert) {
		s.UpdateType()
	})
}

// SetAmount sets the "amount" field.
func (u *AmountUpsertOne) SetAmount(v schema.BigInt) *AmountUpsertOne {
	return u.Update(func(s *AmountUpsert) {
		s.SetAmount(v)
	})
}

// AddAmount adds v to the "amount" field.
func (u *AmountUpsertOne) AddAmount(v schema.BigInt) *AmountUpsertOne {
	return u.Update(func(s *AmountUpsert) {
		s.AddAmount(v)
	})
}

// UpdateAmount sets the "amount" field to the value that was provided on create.
func (u *AmountUpsertOne) UpdateAmount() *AmountUpsertOne {
	return u.Update(func(s *AmountUpsert) {
		s.UpdateAmount()
	})
}

// SetAssetID sets the "asset_id" field.
func (u *AmountUpsertOne) SetAssetID(v schema.BigInt) *AmountUpsertOne {
	return u.Update(func(s *AmountUpsert) {
		s.SetAssetID(v)
	})
}

// AddAssetID adds v to the "asset_id" field.
func (u *AmountUpsertOne) AddAssetID(v schema.BigInt) *AmountUpsertOne {
	return u.Update(func(s *AmountUpsert) {
		s.AddAssetID(v)
	})
}

// UpdateAssetID sets the "asset_id" field to the value that was provided on create.
func (u *AmountUpsertOne) UpdateAssetID() *AmountUpsertOne {
	return u.Update(func(s *AmountUpsert) {
		s.UpdateAssetID()
	})
}

// Exec executes the query.
func (u *AmountUpsertOne) Exec(ctx context.Context) error {
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for AmountCreate.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *AmountUpsertOne) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}

// Exec executes the UPSERT query and returns the inserted/updated ID.
func (u *AmountUpsertOne) ID(ctx context.Context) (id string, err error) {
	if u.create.driver.Dialect() == dialect.MySQL {
		// In case of "ON CONFLICT", there is no way to get back non-numeric ID
		// fields from the database since MySQL does not support the RETURNING clause.
		return id, errors.New("ent: AmountUpsertOne.ID is not supported by MySQL driver. Use AmountUpsertOne.Exec instead")
	}
	node, err := u.create.Save(ctx)
	if err != nil {
		return id, err
	}
	return node.ID, nil
}

// IDX is like ID, but panics if an error occurs.
func (u *AmountUpsertOne) IDX(ctx context.Context) string {
	id, err := u.ID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// AmountCreateBulk is the builder for creating many Amount entities in bulk.
type AmountCreateBulk struct {
	config
	builders []*AmountCreate
	conflict []sql.ConflictOption
}

// Save creates the Amount entities in the database.
func (acb *AmountCreateBulk) Save(ctx context.Context) ([]*Amount, error) {
	specs := make([]*sqlgraph.CreateSpec, len(acb.builders))
	nodes := make([]*Amount, len(acb.builders))
	mutators := make([]Mutator, len(acb.builders))
	for i := range acb.builders {
		func(i int, root context.Context) {
			builder := acb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*AmountMutation)
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
					_, err = mutators[i+1].Mutate(root, acb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					spec.OnConflict = acb.conflict
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, acb.driver, spec); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, acb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (acb *AmountCreateBulk) SaveX(ctx context.Context) []*Amount {
	v, err := acb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (acb *AmountCreateBulk) Exec(ctx context.Context) error {
	_, err := acb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (acb *AmountCreateBulk) ExecX(ctx context.Context) {
	if err := acb.Exec(ctx); err != nil {
		panic(err)
	}
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.Amount.CreateBulk(builders...).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.AmountUpsert) {
//			SetType(v+v).
//		}).
//		Exec(ctx)
//
func (acb *AmountCreateBulk) OnConflict(opts ...sql.ConflictOption) *AmountUpsertBulk {
	acb.conflict = opts
	return &AmountUpsertBulk{
		create: acb,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.Amount.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
//
func (acb *AmountCreateBulk) OnConflictColumns(columns ...string) *AmountUpsertBulk {
	acb.conflict = append(acb.conflict, sql.ConflictColumns(columns...))
	return &AmountUpsertBulk{
		create: acb,
	}
}

// AmountUpsertBulk is the builder for "upsert"-ing
// a bulk of Amount nodes.
type AmountUpsertBulk struct {
	create *AmountCreateBulk
}

// UpdateNewValues updates the mutable fields using the new values that
// were set on create. Using this option is equivalent to using:
//
//	client.Amount.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(amount.FieldID)
//			}),
//		).
//		Exec(ctx)
//
func (u *AmountUpsertBulk) UpdateNewValues() *AmountUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		for _, b := range u.create.builders {
			if _, exists := b.mutation.ID(); exists {
				s.SetIgnore(amount.FieldID)
				return
			}
			if _, exists := b.mutation.GetType(); exists {
				s.SetIgnore(amount.FieldType)
			}
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//	client.Amount.Create().
//		OnConflict(sql.ResolveWithIgnore()).
//		Exec(ctx)
//
func (u *AmountUpsertBulk) Ignore() *AmountUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *AmountUpsertBulk) DoNothing() *AmountUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the AmountCreateBulk.OnConflict
// documentation for more info.
func (u *AmountUpsertBulk) Update(set func(*AmountUpsert)) *AmountUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&AmountUpsert{UpdateSet: update})
	}))
	return u
}

// SetType sets the "type" field.
func (u *AmountUpsertBulk) SetType(v amount.Type) *AmountUpsertBulk {
	return u.Update(func(s *AmountUpsert) {
		s.SetType(v)
	})
}

// UpdateType sets the "type" field to the value that was provided on create.
func (u *AmountUpsertBulk) UpdateType() *AmountUpsertBulk {
	return u.Update(func(s *AmountUpsert) {
		s.UpdateType()
	})
}

// SetAmount sets the "amount" field.
func (u *AmountUpsertBulk) SetAmount(v schema.BigInt) *AmountUpsertBulk {
	return u.Update(func(s *AmountUpsert) {
		s.SetAmount(v)
	})
}

// AddAmount adds v to the "amount" field.
func (u *AmountUpsertBulk) AddAmount(v schema.BigInt) *AmountUpsertBulk {
	return u.Update(func(s *AmountUpsert) {
		s.AddAmount(v)
	})
}

// UpdateAmount sets the "amount" field to the value that was provided on create.
func (u *AmountUpsertBulk) UpdateAmount() *AmountUpsertBulk {
	return u.Update(func(s *AmountUpsert) {
		s.UpdateAmount()
	})
}

// SetAssetID sets the "asset_id" field.
func (u *AmountUpsertBulk) SetAssetID(v schema.BigInt) *AmountUpsertBulk {
	return u.Update(func(s *AmountUpsert) {
		s.SetAssetID(v)
	})
}

// AddAssetID adds v to the "asset_id" field.
func (u *AmountUpsertBulk) AddAssetID(v schema.BigInt) *AmountUpsertBulk {
	return u.Update(func(s *AmountUpsert) {
		s.AddAssetID(v)
	})
}

// UpdateAssetID sets the "asset_id" field to the value that was provided on create.
func (u *AmountUpsertBulk) UpdateAssetID() *AmountUpsertBulk {
	return u.Update(func(s *AmountUpsert) {
		s.UpdateAssetID()
	})
}

// Exec executes the query.
func (u *AmountUpsertBulk) Exec(ctx context.Context) error {
	for i, b := range u.create.builders {
		if len(b.conflict) != 0 {
			return fmt.Errorf("ent: OnConflict was set for builder %d. Set it on the AmountCreateBulk instead", i)
		}
	}
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for AmountCreateBulk.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *AmountUpsertBulk) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}
