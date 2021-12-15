// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/dopedao/dope-monorepo/packages/api/ent/dope"
	"github.com/dopedao/dope-monorepo/packages/api/ent/item"
	"github.com/dopedao/dope-monorepo/packages/api/ent/predicate"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
)

// DopeUpdate is the builder for updating Dope entities.
type DopeUpdate struct {
	config
	hooks    []Hook
	mutation *DopeMutation
}

// Where appends a list predicates to the DopeUpdate builder.
func (du *DopeUpdate) Where(ps ...predicate.Dope) *DopeUpdate {
	du.mutation.Where(ps...)
	return du
}

// SetClaimed sets the "claimed" field.
func (du *DopeUpdate) SetClaimed(b bool) *DopeUpdate {
	du.mutation.SetClaimed(b)
	return du
}

// SetNillableClaimed sets the "claimed" field if the given value is not nil.
func (du *DopeUpdate) SetNillableClaimed(b *bool) *DopeUpdate {
	if b != nil {
		du.SetClaimed(*b)
	}
	return du
}

// SetOpened sets the "opened" field.
func (du *DopeUpdate) SetOpened(b bool) *DopeUpdate {
	du.mutation.SetOpened(b)
	return du
}

// SetNillableOpened sets the "opened" field if the given value is not nil.
func (du *DopeUpdate) SetNillableOpened(b *bool) *DopeUpdate {
	if b != nil {
		du.SetOpened(*b)
	}
	return du
}

// SetWalletID sets the "wallet" edge to the Wallet entity by ID.
func (du *DopeUpdate) SetWalletID(id string) *DopeUpdate {
	du.mutation.SetWalletID(id)
	return du
}

// SetNillableWalletID sets the "wallet" edge to the Wallet entity by ID if the given value is not nil.
func (du *DopeUpdate) SetNillableWalletID(id *string) *DopeUpdate {
	if id != nil {
		du = du.SetWalletID(*id)
	}
	return du
}

// SetWallet sets the "wallet" edge to the Wallet entity.
func (du *DopeUpdate) SetWallet(w *Wallet) *DopeUpdate {
	return du.SetWalletID(w.ID)
}

// AddItemIDs adds the "items" edge to the Item entity by IDs.
func (du *DopeUpdate) AddItemIDs(ids ...string) *DopeUpdate {
	du.mutation.AddItemIDs(ids...)
	return du
}

// AddItems adds the "items" edges to the Item entity.
func (du *DopeUpdate) AddItems(i ...*Item) *DopeUpdate {
	ids := make([]string, len(i))
	for j := range i {
		ids[j] = i[j].ID
	}
	return du.AddItemIDs(ids...)
}

// Mutation returns the DopeMutation object of the builder.
func (du *DopeUpdate) Mutation() *DopeMutation {
	return du.mutation
}

// ClearWallet clears the "wallet" edge to the Wallet entity.
func (du *DopeUpdate) ClearWallet() *DopeUpdate {
	du.mutation.ClearWallet()
	return du
}

// ClearItems clears all "items" edges to the Item entity.
func (du *DopeUpdate) ClearItems() *DopeUpdate {
	du.mutation.ClearItems()
	return du
}

// RemoveItemIDs removes the "items" edge to Item entities by IDs.
func (du *DopeUpdate) RemoveItemIDs(ids ...string) *DopeUpdate {
	du.mutation.RemoveItemIDs(ids...)
	return du
}

// RemoveItems removes "items" edges to Item entities.
func (du *DopeUpdate) RemoveItems(i ...*Item) *DopeUpdate {
	ids := make([]string, len(i))
	for j := range i {
		ids[j] = i[j].ID
	}
	return du.RemoveItemIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (du *DopeUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	if len(du.hooks) == 0 {
		affected, err = du.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*DopeMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			du.mutation = mutation
			affected, err = du.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(du.hooks) - 1; i >= 0; i-- {
			if du.hooks[i] == nil {
				return 0, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = du.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, du.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (du *DopeUpdate) SaveX(ctx context.Context) int {
	affected, err := du.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (du *DopeUpdate) Exec(ctx context.Context) error {
	_, err := du.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (du *DopeUpdate) ExecX(ctx context.Context) {
	if err := du.Exec(ctx); err != nil {
		panic(err)
	}
}

func (du *DopeUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   dope.Table,
			Columns: dope.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: dope.FieldID,
			},
		},
	}
	if ps := du.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := du.mutation.Claimed(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: dope.FieldClaimed,
		})
	}
	if value, ok := du.mutation.Opened(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: dope.FieldOpened,
		})
	}
	if du.mutation.WalletCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   dope.WalletTable,
			Columns: []string{dope.WalletColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: wallet.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := du.mutation.WalletIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   dope.WalletTable,
			Columns: []string{dope.WalletColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: wallet.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if du.mutation.ItemsCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   dope.ItemsTable,
			Columns: dope.ItemsPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: item.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := du.mutation.RemovedItemsIDs(); len(nodes) > 0 && !du.mutation.ItemsCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   dope.ItemsTable,
			Columns: dope.ItemsPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: item.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := du.mutation.ItemsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   dope.ItemsTable,
			Columns: dope.ItemsPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: item.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, du.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{dope.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return 0, err
	}
	return n, nil
}

// DopeUpdateOne is the builder for updating a single Dope entity.
type DopeUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *DopeMutation
}

// SetClaimed sets the "claimed" field.
func (duo *DopeUpdateOne) SetClaimed(b bool) *DopeUpdateOne {
	duo.mutation.SetClaimed(b)
	return duo
}

// SetNillableClaimed sets the "claimed" field if the given value is not nil.
func (duo *DopeUpdateOne) SetNillableClaimed(b *bool) *DopeUpdateOne {
	if b != nil {
		duo.SetClaimed(*b)
	}
	return duo
}

// SetOpened sets the "opened" field.
func (duo *DopeUpdateOne) SetOpened(b bool) *DopeUpdateOne {
	duo.mutation.SetOpened(b)
	return duo
}

// SetNillableOpened sets the "opened" field if the given value is not nil.
func (duo *DopeUpdateOne) SetNillableOpened(b *bool) *DopeUpdateOne {
	if b != nil {
		duo.SetOpened(*b)
	}
	return duo
}

// SetWalletID sets the "wallet" edge to the Wallet entity by ID.
func (duo *DopeUpdateOne) SetWalletID(id string) *DopeUpdateOne {
	duo.mutation.SetWalletID(id)
	return duo
}

// SetNillableWalletID sets the "wallet" edge to the Wallet entity by ID if the given value is not nil.
func (duo *DopeUpdateOne) SetNillableWalletID(id *string) *DopeUpdateOne {
	if id != nil {
		duo = duo.SetWalletID(*id)
	}
	return duo
}

// SetWallet sets the "wallet" edge to the Wallet entity.
func (duo *DopeUpdateOne) SetWallet(w *Wallet) *DopeUpdateOne {
	return duo.SetWalletID(w.ID)
}

// AddItemIDs adds the "items" edge to the Item entity by IDs.
func (duo *DopeUpdateOne) AddItemIDs(ids ...string) *DopeUpdateOne {
	duo.mutation.AddItemIDs(ids...)
	return duo
}

// AddItems adds the "items" edges to the Item entity.
func (duo *DopeUpdateOne) AddItems(i ...*Item) *DopeUpdateOne {
	ids := make([]string, len(i))
	for j := range i {
		ids[j] = i[j].ID
	}
	return duo.AddItemIDs(ids...)
}

// Mutation returns the DopeMutation object of the builder.
func (duo *DopeUpdateOne) Mutation() *DopeMutation {
	return duo.mutation
}

// ClearWallet clears the "wallet" edge to the Wallet entity.
func (duo *DopeUpdateOne) ClearWallet() *DopeUpdateOne {
	duo.mutation.ClearWallet()
	return duo
}

// ClearItems clears all "items" edges to the Item entity.
func (duo *DopeUpdateOne) ClearItems() *DopeUpdateOne {
	duo.mutation.ClearItems()
	return duo
}

// RemoveItemIDs removes the "items" edge to Item entities by IDs.
func (duo *DopeUpdateOne) RemoveItemIDs(ids ...string) *DopeUpdateOne {
	duo.mutation.RemoveItemIDs(ids...)
	return duo
}

// RemoveItems removes "items" edges to Item entities.
func (duo *DopeUpdateOne) RemoveItems(i ...*Item) *DopeUpdateOne {
	ids := make([]string, len(i))
	for j := range i {
		ids[j] = i[j].ID
	}
	return duo.RemoveItemIDs(ids...)
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (duo *DopeUpdateOne) Select(field string, fields ...string) *DopeUpdateOne {
	duo.fields = append([]string{field}, fields...)
	return duo
}

// Save executes the query and returns the updated Dope entity.
func (duo *DopeUpdateOne) Save(ctx context.Context) (*Dope, error) {
	var (
		err  error
		node *Dope
	)
	if len(duo.hooks) == 0 {
		node, err = duo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*DopeMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			duo.mutation = mutation
			node, err = duo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(duo.hooks) - 1; i >= 0; i-- {
			if duo.hooks[i] == nil {
				return nil, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = duo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, duo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (duo *DopeUpdateOne) SaveX(ctx context.Context) *Dope {
	node, err := duo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (duo *DopeUpdateOne) Exec(ctx context.Context) error {
	_, err := duo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (duo *DopeUpdateOne) ExecX(ctx context.Context) {
	if err := duo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (duo *DopeUpdateOne) sqlSave(ctx context.Context) (_node *Dope, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   dope.Table,
			Columns: dope.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: dope.FieldID,
			},
		},
	}
	id, ok := duo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "Dope.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := duo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, dope.FieldID)
		for _, f := range fields {
			if !dope.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != dope.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := duo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := duo.mutation.Claimed(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: dope.FieldClaimed,
		})
	}
	if value, ok := duo.mutation.Opened(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: dope.FieldOpened,
		})
	}
	if duo.mutation.WalletCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   dope.WalletTable,
			Columns: []string{dope.WalletColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: wallet.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := duo.mutation.WalletIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   dope.WalletTable,
			Columns: []string{dope.WalletColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: wallet.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if duo.mutation.ItemsCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   dope.ItemsTable,
			Columns: dope.ItemsPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: item.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := duo.mutation.RemovedItemsIDs(); len(nodes) > 0 && !duo.mutation.ItemsCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   dope.ItemsTable,
			Columns: dope.ItemsPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: item.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := duo.mutation.ItemsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   dope.ItemsTable,
			Columns: dope.ItemsPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: item.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &Dope{config: duo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, duo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{dope.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return nil, err
	}
	return _node, nil
}
