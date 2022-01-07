// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/dopedao/dope-monorepo/packages/api/ent/amount"
	"github.com/dopedao/dope-monorepo/packages/api/ent/predicate"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
)

// AmountUpdate is the builder for updating Amount entities.
type AmountUpdate struct {
	config
	hooks    []Hook
	mutation *AmountMutation
}

// Where appends a list predicates to the AmountUpdate builder.
func (au *AmountUpdate) Where(ps ...predicate.Amount) *AmountUpdate {
	au.mutation.Where(ps...)
	return au
}

// SetAmount sets the "amount" field.
func (au *AmountUpdate) SetAmount(si schema.BigInt) *AmountUpdate {
	au.mutation.ResetAmount()
	au.mutation.SetAmount(si)
	return au
}

// SetNillableAmount sets the "amount" field if the given value is not nil.
func (au *AmountUpdate) SetNillableAmount(si *schema.BigInt) *AmountUpdate {
	if si != nil {
		au.SetAmount(*si)
	}
	return au
}

// AddAmount adds si to the "amount" field.
func (au *AmountUpdate) AddAmount(si schema.BigInt) *AmountUpdate {
	au.mutation.AddAmount(si)
	return au
}

// SetAssetID sets the "asset_id" field.
func (au *AmountUpdate) SetAssetID(si schema.BigInt) *AmountUpdate {
	au.mutation.ResetAssetID()
	au.mutation.SetAssetID(si)
	return au
}

// SetNillableAssetID sets the "asset_id" field if the given value is not nil.
func (au *AmountUpdate) SetNillableAssetID(si *schema.BigInt) *AmountUpdate {
	if si != nil {
		au.SetAssetID(*si)
	}
	return au
}

// AddAssetID adds si to the "asset_id" field.
func (au *AmountUpdate) AddAssetID(si schema.BigInt) *AmountUpdate {
	au.mutation.AddAssetID(si)
	return au
}

// Mutation returns the AmountMutation object of the builder.
func (au *AmountUpdate) Mutation() *AmountMutation {
	return au.mutation
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (au *AmountUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	if len(au.hooks) == 0 {
		affected, err = au.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*AmountMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			au.mutation = mutation
			affected, err = au.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(au.hooks) - 1; i >= 0; i-- {
			if au.hooks[i] == nil {
				return 0, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = au.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, au.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (au *AmountUpdate) SaveX(ctx context.Context) int {
	affected, err := au.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (au *AmountUpdate) Exec(ctx context.Context) error {
	_, err := au.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (au *AmountUpdate) ExecX(ctx context.Context) {
	if err := au.Exec(ctx); err != nil {
		panic(err)
	}
}

func (au *AmountUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   amount.Table,
			Columns: amount.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: amount.FieldID,
			},
		},
	}
	if ps := au.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := au.mutation.Amount(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: amount.FieldAmount,
		})
	}
	if value, ok := au.mutation.AddedAmount(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: amount.FieldAmount,
		})
	}
	if value, ok := au.mutation.AssetID(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: amount.FieldAssetID,
		})
	}
	if value, ok := au.mutation.AddedAssetID(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: amount.FieldAssetID,
		})
	}
	if n, err = sqlgraph.UpdateNodes(ctx, au.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{amount.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return 0, err
	}
	return n, nil
}

// AmountUpdateOne is the builder for updating a single Amount entity.
type AmountUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *AmountMutation
}

// SetAmount sets the "amount" field.
func (auo *AmountUpdateOne) SetAmount(si schema.BigInt) *AmountUpdateOne {
	auo.mutation.ResetAmount()
	auo.mutation.SetAmount(si)
	return auo
}

// SetNillableAmount sets the "amount" field if the given value is not nil.
func (auo *AmountUpdateOne) SetNillableAmount(si *schema.BigInt) *AmountUpdateOne {
	if si != nil {
		auo.SetAmount(*si)
	}
	return auo
}

// AddAmount adds si to the "amount" field.
func (auo *AmountUpdateOne) AddAmount(si schema.BigInt) *AmountUpdateOne {
	auo.mutation.AddAmount(si)
	return auo
}

// SetAssetID sets the "asset_id" field.
func (auo *AmountUpdateOne) SetAssetID(si schema.BigInt) *AmountUpdateOne {
	auo.mutation.ResetAssetID()
	auo.mutation.SetAssetID(si)
	return auo
}

// SetNillableAssetID sets the "asset_id" field if the given value is not nil.
func (auo *AmountUpdateOne) SetNillableAssetID(si *schema.BigInt) *AmountUpdateOne {
	if si != nil {
		auo.SetAssetID(*si)
	}
	return auo
}

// AddAssetID adds si to the "asset_id" field.
func (auo *AmountUpdateOne) AddAssetID(si schema.BigInt) *AmountUpdateOne {
	auo.mutation.AddAssetID(si)
	return auo
}

// Mutation returns the AmountMutation object of the builder.
func (auo *AmountUpdateOne) Mutation() *AmountMutation {
	return auo.mutation
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (auo *AmountUpdateOne) Select(field string, fields ...string) *AmountUpdateOne {
	auo.fields = append([]string{field}, fields...)
	return auo
}

// Save executes the query and returns the updated Amount entity.
func (auo *AmountUpdateOne) Save(ctx context.Context) (*Amount, error) {
	var (
		err  error
		node *Amount
	)
	if len(auo.hooks) == 0 {
		node, err = auo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*AmountMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			auo.mutation = mutation
			node, err = auo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(auo.hooks) - 1; i >= 0; i-- {
			if auo.hooks[i] == nil {
				return nil, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = auo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, auo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (auo *AmountUpdateOne) SaveX(ctx context.Context) *Amount {
	node, err := auo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (auo *AmountUpdateOne) Exec(ctx context.Context) error {
	_, err := auo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (auo *AmountUpdateOne) ExecX(ctx context.Context) {
	if err := auo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (auo *AmountUpdateOne) sqlSave(ctx context.Context) (_node *Amount, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   amount.Table,
			Columns: amount.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: amount.FieldID,
			},
		},
	}
	id, ok := auo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "Amount.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := auo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, amount.FieldID)
		for _, f := range fields {
			if !amount.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != amount.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := auo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := auo.mutation.Amount(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: amount.FieldAmount,
		})
	}
	if value, ok := auo.mutation.AddedAmount(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: amount.FieldAmount,
		})
	}
	if value, ok := auo.mutation.AssetID(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: amount.FieldAssetID,
		})
	}
	if value, ok := auo.mutation.AddedAssetID(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: amount.FieldAssetID,
		})
	}
	_node = &Amount{config: auo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, auo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{amount.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return nil, err
	}
	return _node, nil
}