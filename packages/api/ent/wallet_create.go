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
	"github.com/dopedao/dope-monorepo/packages/api/ent/dope"
	"github.com/dopedao/dope-monorepo/packages/api/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
	"github.com/dopedao/dope-monorepo/packages/api/ent/walletitems"
)

// WalletCreate is the builder for creating a Wallet entity.
type WalletCreate struct {
	config
	mutation *WalletMutation
	hooks    []Hook
	conflict []sql.ConflictOption
}

// SetPaper sets the "paper" field.
func (wc *WalletCreate) SetPaper(si schema.BigInt) *WalletCreate {
	wc.mutation.SetPaper(si)
	return wc
}

// SetNillablePaper sets the "paper" field if the given value is not nil.
func (wc *WalletCreate) SetNillablePaper(si *schema.BigInt) *WalletCreate {
	if si != nil {
		wc.SetPaper(*si)
	}
	return wc
}

// SetCreatedAt sets the "created_at" field.
func (wc *WalletCreate) SetCreatedAt(t time.Time) *WalletCreate {
	wc.mutation.SetCreatedAt(t)
	return wc
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (wc *WalletCreate) SetNillableCreatedAt(t *time.Time) *WalletCreate {
	if t != nil {
		wc.SetCreatedAt(*t)
	}
	return wc
}

// SetID sets the "id" field.
func (wc *WalletCreate) SetID(s string) *WalletCreate {
	wc.mutation.SetID(s)
	return wc
}

// AddDopeIDs adds the "dopes" edge to the Dope entity by IDs.
func (wc *WalletCreate) AddDopeIDs(ids ...string) *WalletCreate {
	wc.mutation.AddDopeIDs(ids...)
	return wc
}

// AddDopes adds the "dopes" edges to the Dope entity.
func (wc *WalletCreate) AddDopes(d ...*Dope) *WalletCreate {
	ids := make([]string, len(d))
	for i := range d {
		ids[i] = d[i].ID
	}
	return wc.AddDopeIDs(ids...)
}

// AddItemIDs adds the "items" edge to the WalletItems entity by IDs.
func (wc *WalletCreate) AddItemIDs(ids ...string) *WalletCreate {
	wc.mutation.AddItemIDs(ids...)
	return wc
}

// AddItems adds the "items" edges to the WalletItems entity.
func (wc *WalletCreate) AddItems(w ...*WalletItems) *WalletCreate {
	ids := make([]string, len(w))
	for i := range w {
		ids[i] = w[i].ID
	}
	return wc.AddItemIDs(ids...)
}

// AddHustlerIDs adds the "hustlers" edge to the Hustler entity by IDs.
func (wc *WalletCreate) AddHustlerIDs(ids ...string) *WalletCreate {
	wc.mutation.AddHustlerIDs(ids...)
	return wc
}

// AddHustlers adds the "hustlers" edges to the Hustler entity.
func (wc *WalletCreate) AddHustlers(h ...*Hustler) *WalletCreate {
	ids := make([]string, len(h))
	for i := range h {
		ids[i] = h[i].ID
	}
	return wc.AddHustlerIDs(ids...)
}

// Mutation returns the WalletMutation object of the builder.
func (wc *WalletCreate) Mutation() *WalletMutation {
	return wc.mutation
}

// Save creates the Wallet in the database.
func (wc *WalletCreate) Save(ctx context.Context) (*Wallet, error) {
	var (
		err  error
		node *Wallet
	)
	wc.defaults()
	if len(wc.hooks) == 0 {
		if err = wc.check(); err != nil {
			return nil, err
		}
		node, err = wc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*WalletMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = wc.check(); err != nil {
				return nil, err
			}
			wc.mutation = mutation
			if node, err = wc.sqlSave(ctx); err != nil {
				return nil, err
			}
			mutation.id = &node.ID
			mutation.done = true
			return node, err
		})
		for i := len(wc.hooks) - 1; i >= 0; i-- {
			if wc.hooks[i] == nil {
				return nil, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = wc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, wc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (wc *WalletCreate) SaveX(ctx context.Context) *Wallet {
	v, err := wc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (wc *WalletCreate) Exec(ctx context.Context) error {
	_, err := wc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (wc *WalletCreate) ExecX(ctx context.Context) {
	if err := wc.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (wc *WalletCreate) defaults() {
	if _, ok := wc.mutation.Paper(); !ok {
		v := wallet.DefaultPaper()
		wc.mutation.SetPaper(v)
	}
	if _, ok := wc.mutation.CreatedAt(); !ok {
		v := wallet.DefaultCreatedAt()
		wc.mutation.SetCreatedAt(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (wc *WalletCreate) check() error {
	if _, ok := wc.mutation.Paper(); !ok {
		return &ValidationError{Name: "paper", err: errors.New(`ent: missing required field "Wallet.paper"`)}
	}
	if _, ok := wc.mutation.CreatedAt(); !ok {
		return &ValidationError{Name: "created_at", err: errors.New(`ent: missing required field "Wallet.created_at"`)}
	}
	return nil
}

func (wc *WalletCreate) sqlSave(ctx context.Context) (*Wallet, error) {
	_node, _spec := wc.createSpec()
	if err := sqlgraph.CreateNode(ctx, wc.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return nil, err
	}
	if _spec.ID.Value != nil {
		if id, ok := _spec.ID.Value.(string); ok {
			_node.ID = id
		} else {
			return nil, fmt.Errorf("unexpected Wallet.ID type: %T", _spec.ID.Value)
		}
	}
	return _node, nil
}

func (wc *WalletCreate) createSpec() (*Wallet, *sqlgraph.CreateSpec) {
	var (
		_node = &Wallet{config: wc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: wallet.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: wallet.FieldID,
			},
		}
	)
	_spec.OnConflict = wc.conflict
	if id, ok := wc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = id
	}
	if value, ok := wc.mutation.Paper(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: wallet.FieldPaper,
		})
		_node.Paper = value
	}
	if value, ok := wc.mutation.CreatedAt(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: wallet.FieldCreatedAt,
		})
		_node.CreatedAt = value
	}
	if nodes := wc.mutation.DopesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   wallet.DopesTable,
			Columns: []string{wallet.DopesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: dope.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := wc.mutation.ItemsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   wallet.ItemsTable,
			Columns: []string{wallet.ItemsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: walletitems.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := wc.mutation.HustlersIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   wallet.HustlersTable,
			Columns: []string{wallet.HustlersColumn},
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
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.Wallet.Create().
//		SetPaper(v).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.WalletUpsert) {
//			SetPaper(v+v).
//		}).
//		Exec(ctx)
//
func (wc *WalletCreate) OnConflict(opts ...sql.ConflictOption) *WalletUpsertOne {
	wc.conflict = opts
	return &WalletUpsertOne{
		create: wc,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.Wallet.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
//
func (wc *WalletCreate) OnConflictColumns(columns ...string) *WalletUpsertOne {
	wc.conflict = append(wc.conflict, sql.ConflictColumns(columns...))
	return &WalletUpsertOne{
		create: wc,
	}
}

type (
	// WalletUpsertOne is the builder for "upsert"-ing
	//  one Wallet node.
	WalletUpsertOne struct {
		create *WalletCreate
	}

	// WalletUpsert is the "OnConflict" setter.
	WalletUpsert struct {
		*sql.UpdateSet
	}
)

// SetPaper sets the "paper" field.
func (u *WalletUpsert) SetPaper(v schema.BigInt) *WalletUpsert {
	u.Set(wallet.FieldPaper, v)
	return u
}

// UpdatePaper sets the "paper" field to the value that was provided on create.
func (u *WalletUpsert) UpdatePaper() *WalletUpsert {
	u.SetExcluded(wallet.FieldPaper)
	return u
}

// AddPaper adds v to the "paper" field.
func (u *WalletUpsert) AddPaper(v schema.BigInt) *WalletUpsert {
	u.Add(wallet.FieldPaper, v)
	return u
}

// SetCreatedAt sets the "created_at" field.
func (u *WalletUpsert) SetCreatedAt(v time.Time) *WalletUpsert {
	u.Set(wallet.FieldCreatedAt, v)
	return u
}

// UpdateCreatedAt sets the "created_at" field to the value that was provided on create.
func (u *WalletUpsert) UpdateCreatedAt() *WalletUpsert {
	u.SetExcluded(wallet.FieldCreatedAt)
	return u
}

// UpdateNewValues updates the mutable fields using the new values that were set on create except the ID field.
// Using this option is equivalent to using:
//
//	client.Wallet.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(wallet.FieldID)
//			}),
//		).
//		Exec(ctx)
//
func (u *WalletUpsertOne) UpdateNewValues() *WalletUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		if _, exists := u.create.mutation.ID(); exists {
			s.SetIgnore(wallet.FieldID)
		}
		if _, exists := u.create.mutation.CreatedAt(); exists {
			s.SetIgnore(wallet.FieldCreatedAt)
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//  client.Wallet.Create().
//      OnConflict(sql.ResolveWithIgnore()).
//      Exec(ctx)
//
func (u *WalletUpsertOne) Ignore() *WalletUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *WalletUpsertOne) DoNothing() *WalletUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the WalletCreate.OnConflict
// documentation for more info.
func (u *WalletUpsertOne) Update(set func(*WalletUpsert)) *WalletUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&WalletUpsert{UpdateSet: update})
	}))
	return u
}

// SetPaper sets the "paper" field.
func (u *WalletUpsertOne) SetPaper(v schema.BigInt) *WalletUpsertOne {
	return u.Update(func(s *WalletUpsert) {
		s.SetPaper(v)
	})
}

// AddPaper adds v to the "paper" field.
func (u *WalletUpsertOne) AddPaper(v schema.BigInt) *WalletUpsertOne {
	return u.Update(func(s *WalletUpsert) {
		s.AddPaper(v)
	})
}

// UpdatePaper sets the "paper" field to the value that was provided on create.
func (u *WalletUpsertOne) UpdatePaper() *WalletUpsertOne {
	return u.Update(func(s *WalletUpsert) {
		s.UpdatePaper()
	})
}

// SetCreatedAt sets the "created_at" field.
func (u *WalletUpsertOne) SetCreatedAt(v time.Time) *WalletUpsertOne {
	return u.Update(func(s *WalletUpsert) {
		s.SetCreatedAt(v)
	})
}

// UpdateCreatedAt sets the "created_at" field to the value that was provided on create.
func (u *WalletUpsertOne) UpdateCreatedAt() *WalletUpsertOne {
	return u.Update(func(s *WalletUpsert) {
		s.UpdateCreatedAt()
	})
}

// Exec executes the query.
func (u *WalletUpsertOne) Exec(ctx context.Context) error {
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for WalletCreate.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *WalletUpsertOne) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}

// Exec executes the UPSERT query and returns the inserted/updated ID.
func (u *WalletUpsertOne) ID(ctx context.Context) (id string, err error) {
	if u.create.driver.Dialect() == dialect.MySQL {
		// In case of "ON CONFLICT", there is no way to get back non-numeric ID
		// fields from the database since MySQL does not support the RETURNING clause.
		return id, errors.New("ent: WalletUpsertOne.ID is not supported by MySQL driver. Use WalletUpsertOne.Exec instead")
	}
	node, err := u.create.Save(ctx)
	if err != nil {
		return id, err
	}
	return node.ID, nil
}

// IDX is like ID, but panics if an error occurs.
func (u *WalletUpsertOne) IDX(ctx context.Context) string {
	id, err := u.ID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// WalletCreateBulk is the builder for creating many Wallet entities in bulk.
type WalletCreateBulk struct {
	config
	builders []*WalletCreate
	conflict []sql.ConflictOption
}

// Save creates the Wallet entities in the database.
func (wcb *WalletCreateBulk) Save(ctx context.Context) ([]*Wallet, error) {
	specs := make([]*sqlgraph.CreateSpec, len(wcb.builders))
	nodes := make([]*Wallet, len(wcb.builders))
	mutators := make([]Mutator, len(wcb.builders))
	for i := range wcb.builders {
		func(i int, root context.Context) {
			builder := wcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*WalletMutation)
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
					_, err = mutators[i+1].Mutate(root, wcb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					spec.OnConflict = wcb.conflict
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, wcb.driver, spec); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, wcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (wcb *WalletCreateBulk) SaveX(ctx context.Context) []*Wallet {
	v, err := wcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (wcb *WalletCreateBulk) Exec(ctx context.Context) error {
	_, err := wcb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (wcb *WalletCreateBulk) ExecX(ctx context.Context) {
	if err := wcb.Exec(ctx); err != nil {
		panic(err)
	}
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.Wallet.CreateBulk(builders...).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.WalletUpsert) {
//			SetPaper(v+v).
//		}).
//		Exec(ctx)
//
func (wcb *WalletCreateBulk) OnConflict(opts ...sql.ConflictOption) *WalletUpsertBulk {
	wcb.conflict = opts
	return &WalletUpsertBulk{
		create: wcb,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.Wallet.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
//
func (wcb *WalletCreateBulk) OnConflictColumns(columns ...string) *WalletUpsertBulk {
	wcb.conflict = append(wcb.conflict, sql.ConflictColumns(columns...))
	return &WalletUpsertBulk{
		create: wcb,
	}
}

// WalletUpsertBulk is the builder for "upsert"-ing
// a bulk of Wallet nodes.
type WalletUpsertBulk struct {
	create *WalletCreateBulk
}

// UpdateNewValues updates the mutable fields using the new values that
// were set on create. Using this option is equivalent to using:
//
//	client.Wallet.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(wallet.FieldID)
//			}),
//		).
//		Exec(ctx)
//
func (u *WalletUpsertBulk) UpdateNewValues() *WalletUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		for _, b := range u.create.builders {
			if _, exists := b.mutation.ID(); exists {
				s.SetIgnore(wallet.FieldID)
				return
			}
			if _, exists := b.mutation.CreatedAt(); exists {
				s.SetIgnore(wallet.FieldCreatedAt)
			}
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//	client.Wallet.Create().
//		OnConflict(sql.ResolveWithIgnore()).
//		Exec(ctx)
//
func (u *WalletUpsertBulk) Ignore() *WalletUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *WalletUpsertBulk) DoNothing() *WalletUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the WalletCreateBulk.OnConflict
// documentation for more info.
func (u *WalletUpsertBulk) Update(set func(*WalletUpsert)) *WalletUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&WalletUpsert{UpdateSet: update})
	}))
	return u
}

// SetPaper sets the "paper" field.
func (u *WalletUpsertBulk) SetPaper(v schema.BigInt) *WalletUpsertBulk {
	return u.Update(func(s *WalletUpsert) {
		s.SetPaper(v)
	})
}

// AddPaper adds v to the "paper" field.
func (u *WalletUpsertBulk) AddPaper(v schema.BigInt) *WalletUpsertBulk {
	return u.Update(func(s *WalletUpsert) {
		s.AddPaper(v)
	})
}

// UpdatePaper sets the "paper" field to the value that was provided on create.
func (u *WalletUpsertBulk) UpdatePaper() *WalletUpsertBulk {
	return u.Update(func(s *WalletUpsert) {
		s.UpdatePaper()
	})
}

// SetCreatedAt sets the "created_at" field.
func (u *WalletUpsertBulk) SetCreatedAt(v time.Time) *WalletUpsertBulk {
	return u.Update(func(s *WalletUpsert) {
		s.SetCreatedAt(v)
	})
}

// UpdateCreatedAt sets the "created_at" field to the value that was provided on create.
func (u *WalletUpsertBulk) UpdateCreatedAt() *WalletUpsertBulk {
	return u.Update(func(s *WalletUpsert) {
		s.UpdateCreatedAt()
	})
}

// Exec executes the query.
func (u *WalletUpsertBulk) Exec(ctx context.Context) error {
	for i, b := range u.create.builders {
		if len(b.conflict) != 0 {
			return fmt.Errorf("ent: OnConflict was set for builder %d. Set it on the WalletCreateBulk instead", i)
		}
	}
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for WalletCreateBulk.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *WalletUpsertBulk) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}
