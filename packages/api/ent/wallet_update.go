



// Code generated by entc, DO NOT EDIT.



package ent



import (
	"context"
	"errors"
	"fmt"
	"math"
	"strings"
	"time"
		"github.com/dopedao/dope-monorepo/packages/api/ent/predicate"
			"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
	"entgo.io/ent"
	"entgo.io/ent/dialect"
			"entgo.io/ent/dialect/sql"
			"entgo.io/ent/dialect/sql/sqlgraph"
			"entgo.io/ent/schema/field"

)


import (
		"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
		"github.com/dopedao/dope-monorepo/packages/api/ent/dope"
		"github.com/dopedao/dope-monorepo/packages/api/ent/walletitems"
		"github.com/dopedao/dope-monorepo/packages/api/ent/hustler"
)






// WalletUpdate is the builder for updating Wallet entities.
type WalletUpdate struct {
	config
	hooks []Hook
	mutation *WalletMutation
}

// Where appends a list predicates to the WalletUpdate builder.
func (wu *WalletUpdate) Where(ps ...predicate.Wallet) *WalletUpdate {
	wu.mutation.Where(ps...)
	return wu
}


	




	
	


	
	
	// SetPaper sets the "paper" field.
	func (wu *WalletUpdate) SetPaper(si schema.BigInt) *WalletUpdate {
			wu.mutation.ResetPaper()
		wu.mutation.SetPaper(si)
		return wu
	}

	
	
		
		// SetNillablePaper sets the "paper" field if the given value is not nil.
		func (wu *WalletUpdate) SetNillablePaper(si *schema.BigInt) *WalletUpdate {
			if si != nil {
				wu.SetPaper(*si)
			}
			return wu
		}
	

	
		
		// AddPaper adds si to the "paper" field.
		func (wu *WalletUpdate) AddPaper(si schema.BigInt) *WalletUpdate {
			wu.mutation.AddPaper(si)
			return wu
		}
	

	



	
	
	
	
		// AddDopeIDs adds the "dopes" edge to the Dope entity by IDs.
		func (wu *WalletUpdate) AddDopeIDs(ids ... string) *WalletUpdate {
			wu.mutation.AddDopeIDs(ids ...)
			return wu
		}
	
	
	
	
	
	// AddDopes adds the "dopes" edges to the Dope entity.
	func (wu *WalletUpdate) AddDopes(d ...*Dope) *WalletUpdate {
		ids := make([]string, len(d))
			for i := range d {
				ids[i] = d[i].ID
			}
			return wu.AddDopeIDs(ids...)
	}

	
	
	
	
		// AddItemIDs adds the "items" edge to the WalletItems entity by IDs.
		func (wu *WalletUpdate) AddItemIDs(ids ... string) *WalletUpdate {
			wu.mutation.AddItemIDs(ids ...)
			return wu
		}
	
	
	
	
	
	// AddItems adds the "items" edges to the WalletItems entity.
	func (wu *WalletUpdate) AddItems(w ...*WalletItems) *WalletUpdate {
		ids := make([]string, len(w))
			for i := range w {
				ids[i] = w[i].ID
			}
			return wu.AddItemIDs(ids...)
	}

	
	
	
	
		// AddHustlerIDs adds the "hustlers" edge to the Hustler entity by IDs.
		func (wu *WalletUpdate) AddHustlerIDs(ids ... string) *WalletUpdate {
			wu.mutation.AddHustlerIDs(ids ...)
			return wu
		}
	
	
	
	
	
	// AddHustlers adds the "hustlers" edges to the Hustler entity.
	func (wu *WalletUpdate) AddHustlers(h ...*Hustler) *WalletUpdate {
		ids := make([]string, len(h))
			for i := range h {
				ids[i] = h[i].ID
			}
			return wu.AddHustlerIDs(ids...)
	}


// Mutation returns the WalletMutation object of the builder.
func (wu *WalletUpdate) Mutation() *WalletMutation {
	return wu.mutation
}





	





	
	// ClearDopes clears all "dopes" edges to the Dope entity.
	func (wu *WalletUpdate) ClearDopes() *WalletUpdate {
		wu.mutation.ClearDopes()
		return wu
	}
	
		
		
		
		
		// RemoveDopeIDs removes the "dopes" edge to Dope entities by IDs.
		func (wu *WalletUpdate) RemoveDopeIDs(ids ...string) *WalletUpdate {
			wu.mutation.RemoveDopeIDs(ids...)
			return wu
		}
		
		// RemoveDopes removes "dopes" edges to Dope entities.
		func (wu *WalletUpdate) RemoveDopes(d ...*Dope) *WalletUpdate {
			ids := make([]string, len(d))
			for i := range d {
				ids[i] = d[i].ID
			}
			return wu.RemoveDopeIDs(ids...)
		}
	

	
	// ClearItems clears all "items" edges to the WalletItems entity.
	func (wu *WalletUpdate) ClearItems() *WalletUpdate {
		wu.mutation.ClearItems()
		return wu
	}
	
		
		
		
		
		// RemoveItemIDs removes the "items" edge to WalletItems entities by IDs.
		func (wu *WalletUpdate) RemoveItemIDs(ids ...string) *WalletUpdate {
			wu.mutation.RemoveItemIDs(ids...)
			return wu
		}
		
		// RemoveItems removes "items" edges to WalletItems entities.
		func (wu *WalletUpdate) RemoveItems(w ...*WalletItems) *WalletUpdate {
			ids := make([]string, len(w))
			for i := range w {
				ids[i] = w[i].ID
			}
			return wu.RemoveItemIDs(ids...)
		}
	

	
	// ClearHustlers clears all "hustlers" edges to the Hustler entity.
	func (wu *WalletUpdate) ClearHustlers() *WalletUpdate {
		wu.mutation.ClearHustlers()
		return wu
	}
	
		
		
		
		
		// RemoveHustlerIDs removes the "hustlers" edge to Hustler entities by IDs.
		func (wu *WalletUpdate) RemoveHustlerIDs(ids ...string) *WalletUpdate {
			wu.mutation.RemoveHustlerIDs(ids...)
			return wu
		}
		
		// RemoveHustlers removes "hustlers" edges to Hustler entities.
		func (wu *WalletUpdate) RemoveHustlers(h ...*Hustler) *WalletUpdate {
			ids := make([]string, len(h))
			for i := range h {
				ids[i] = h[i].ID
			}
			return wu.RemoveHustlerIDs(ids...)
		}
	




// Save executes the query and returns the number of nodes affected by the update operation.
func (wu *WalletUpdate) Save(ctx context.Context) (int, error) {
	var (
		err error
		affected int
	)
	if len(wu.hooks) == 0 {
		affected, err = wu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*WalletMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			wu.mutation = mutation
			affected, err = wu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(wu.hooks) - 1; i >= 0; i-- {
			if wu.hooks[i] == nil {
				return 0, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = wu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, wu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (wu *WalletUpdate) SaveX(ctx context.Context) int {
	affected, err := wu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (wu *WalletUpdate) Exec(ctx context.Context) error {
	_, err := wu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (wu *WalletUpdate) ExecX(ctx context.Context) {
	if err := wu.Exec(ctx); err != nil {
		panic(err)
	}
}


	














	
	






func (wu *WalletUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table: wallet.Table,
			Columns: wallet.Columns,
			ID: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: wallet.FieldID,
			},
		},
	}
	if ps := wu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
				if value, ok := wu.mutation.Paper(); ok {
					_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
						Type: field.TypeInt,
						Value: value,
						Column: wallet.FieldPaper,
					})
				}
					if value, ok := wu.mutation.AddedPaper(); ok {
						_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
							Type: field.TypeInt,
							Value: value,
							Column: wallet.FieldPaper,
						})
					}
		if wu.mutation.DopesCleared() {
				edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.DopesTable,
		Columns: []string{ wallet.DopesColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: dope.FieldID,
			},
		},
	}
			_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
		}
			if nodes := wu.mutation.RemovedDopesIDs(); len(nodes) > 0 && !wu.mutation.DopesCleared() {
					edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.DopesTable,
		Columns: []string{ wallet.DopesColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: dope.FieldID,
			},
		},
	}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
				_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
			}
		if nodes := wu.mutation.DopesIDs(); len(nodes) > 0 {
				edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.DopesTable,
		Columns: []string{ wallet.DopesColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: dope.FieldID,
			},
		},
	}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
			_spec.Edges.Add = append(_spec.Edges.Add, edge)
		}
		if wu.mutation.ItemsCleared() {
				edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.ItemsTable,
		Columns: []string{ wallet.ItemsColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: walletitems.FieldID,
			},
		},
	}
			_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
		}
			if nodes := wu.mutation.RemovedItemsIDs(); len(nodes) > 0 && !wu.mutation.ItemsCleared() {
					edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.ItemsTable,
		Columns: []string{ wallet.ItemsColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: walletitems.FieldID,
			},
		},
	}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
				_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
			}
		if nodes := wu.mutation.ItemsIDs(); len(nodes) > 0 {
				edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.ItemsTable,
		Columns: []string{ wallet.ItemsColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: walletitems.FieldID,
			},
		},
	}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
			_spec.Edges.Add = append(_spec.Edges.Add, edge)
		}
		if wu.mutation.HustlersCleared() {
				edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.HustlersTable,
		Columns: []string{ wallet.HustlersColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: hustler.FieldID,
			},
		},
	}
			_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
		}
			if nodes := wu.mutation.RemovedHustlersIDs(); len(nodes) > 0 && !wu.mutation.HustlersCleared() {
					edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.HustlersTable,
		Columns: []string{ wallet.HustlersColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: hustler.FieldID,
			},
		},
	}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
				_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
			}
		if nodes := wu.mutation.HustlersIDs(); len(nodes) > 0 {
				edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.HustlersTable,
		Columns: []string{ wallet.HustlersColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: hustler.FieldID,
			},
		},
	}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
			_spec.Edges.Add = append(_spec.Edges.Add, edge)
		}
		if n, err = sqlgraph.UpdateNodes(ctx, wu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{ wallet.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return 0, err
	}
	return n, nil
}







// WalletUpdateOne is the builder for updating a single Wallet entity.
type WalletUpdateOne struct {
	config
	fields []string
	hooks []Hook
	mutation *WalletMutation

}


	




	
	


	
	
	// SetPaper sets the "paper" field.
	func (wuo *WalletUpdateOne) SetPaper(si schema.BigInt) *WalletUpdateOne {
			wuo.mutation.ResetPaper()
		wuo.mutation.SetPaper(si)
		return wuo
	}

	
	
		
		// SetNillablePaper sets the "paper" field if the given value is not nil.
		func (wuo *WalletUpdateOne) SetNillablePaper(si *schema.BigInt) *WalletUpdateOne {
			if si != nil {
				wuo.SetPaper(*si)
			}
			return wuo
		}
	

	
		
		// AddPaper adds si to the "paper" field.
		func (wuo *WalletUpdateOne) AddPaper(si schema.BigInt) *WalletUpdateOne {
			wuo.mutation.AddPaper(si)
			return wuo
		}
	

	



	
	
	
	
		// AddDopeIDs adds the "dopes" edge to the Dope entity by IDs.
		func (wuo *WalletUpdateOne) AddDopeIDs(ids ... string) *WalletUpdateOne {
			wuo.mutation.AddDopeIDs(ids ...)
			return wuo
		}
	
	
	
	
	
	// AddDopes adds the "dopes" edges to the Dope entity.
	func (wuo *WalletUpdateOne) AddDopes(d ...*Dope) *WalletUpdateOne {
		ids := make([]string, len(d))
			for i := range d {
				ids[i] = d[i].ID
			}
			return wuo.AddDopeIDs(ids...)
	}

	
	
	
	
		// AddItemIDs adds the "items" edge to the WalletItems entity by IDs.
		func (wuo *WalletUpdateOne) AddItemIDs(ids ... string) *WalletUpdateOne {
			wuo.mutation.AddItemIDs(ids ...)
			return wuo
		}
	
	
	
	
	
	// AddItems adds the "items" edges to the WalletItems entity.
	func (wuo *WalletUpdateOne) AddItems(w ...*WalletItems) *WalletUpdateOne {
		ids := make([]string, len(w))
			for i := range w {
				ids[i] = w[i].ID
			}
			return wuo.AddItemIDs(ids...)
	}

	
	
	
	
		// AddHustlerIDs adds the "hustlers" edge to the Hustler entity by IDs.
		func (wuo *WalletUpdateOne) AddHustlerIDs(ids ... string) *WalletUpdateOne {
			wuo.mutation.AddHustlerIDs(ids ...)
			return wuo
		}
	
	
	
	
	
	// AddHustlers adds the "hustlers" edges to the Hustler entity.
	func (wuo *WalletUpdateOne) AddHustlers(h ...*Hustler) *WalletUpdateOne {
		ids := make([]string, len(h))
			for i := range h {
				ids[i] = h[i].ID
			}
			return wuo.AddHustlerIDs(ids...)
	}


// Mutation returns the WalletMutation object of the builder.
func (wuo *WalletUpdateOne) Mutation() *WalletMutation {
	return wuo.mutation
}






	





	
	// ClearDopes clears all "dopes" edges to the Dope entity.
	func (wuo *WalletUpdateOne) ClearDopes() *WalletUpdateOne {
		wuo.mutation.ClearDopes()
		return wuo
	}
	
		
		
		
		
		// RemoveDopeIDs removes the "dopes" edge to Dope entities by IDs.
		func (wuo *WalletUpdateOne) RemoveDopeIDs(ids ...string) *WalletUpdateOne {
			wuo.mutation.RemoveDopeIDs(ids...)
			return wuo
		}
		
		// RemoveDopes removes "dopes" edges to Dope entities.
		func (wuo *WalletUpdateOne) RemoveDopes(d ...*Dope) *WalletUpdateOne {
			ids := make([]string, len(d))
			for i := range d {
				ids[i] = d[i].ID
			}
			return wuo.RemoveDopeIDs(ids...)
		}
	

	
	// ClearItems clears all "items" edges to the WalletItems entity.
	func (wuo *WalletUpdateOne) ClearItems() *WalletUpdateOne {
		wuo.mutation.ClearItems()
		return wuo
	}
	
		
		
		
		
		// RemoveItemIDs removes the "items" edge to WalletItems entities by IDs.
		func (wuo *WalletUpdateOne) RemoveItemIDs(ids ...string) *WalletUpdateOne {
			wuo.mutation.RemoveItemIDs(ids...)
			return wuo
		}
		
		// RemoveItems removes "items" edges to WalletItems entities.
		func (wuo *WalletUpdateOne) RemoveItems(w ...*WalletItems) *WalletUpdateOne {
			ids := make([]string, len(w))
			for i := range w {
				ids[i] = w[i].ID
			}
			return wuo.RemoveItemIDs(ids...)
		}
	

	
	// ClearHustlers clears all "hustlers" edges to the Hustler entity.
	func (wuo *WalletUpdateOne) ClearHustlers() *WalletUpdateOne {
		wuo.mutation.ClearHustlers()
		return wuo
	}
	
		
		
		
		
		// RemoveHustlerIDs removes the "hustlers" edge to Hustler entities by IDs.
		func (wuo *WalletUpdateOne) RemoveHustlerIDs(ids ...string) *WalletUpdateOne {
			wuo.mutation.RemoveHustlerIDs(ids...)
			return wuo
		}
		
		// RemoveHustlers removes "hustlers" edges to Hustler entities.
		func (wuo *WalletUpdateOne) RemoveHustlers(h ...*Hustler) *WalletUpdateOne {
			ids := make([]string, len(h))
			for i := range h {
				ids[i] = h[i].ID
			}
			return wuo.RemoveHustlerIDs(ids...)
		}
	




// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (wuo *WalletUpdateOne) Select(field string, fields ...string) *WalletUpdateOne {
	wuo.fields = append([]string{field}, fields...)
	return wuo
}

// Save executes the query and returns the updated Wallet entity.
func (wuo *WalletUpdateOne ) Save(ctx context.Context) (*Wallet, error) {
	var (
		err error
		node *Wallet
	)
	if len(wuo.hooks) == 0 {
		node, err = wuo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*WalletMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			wuo.mutation = mutation
			node, err = wuo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(wuo.hooks) - 1; i >= 0; i-- {
			if wuo.hooks[i] == nil {
				return nil, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = wuo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, wuo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (wuo *WalletUpdateOne) SaveX(ctx context.Context) *Wallet {
	node, err := wuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (wuo *WalletUpdateOne) Exec(ctx context.Context) error {
	_, err := wuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (wuo *WalletUpdateOne) ExecX(ctx context.Context) {
	if err := wuo.Exec(ctx); err != nil {
		panic(err)
	}
}


	














	
	






func (wuo *WalletUpdateOne) sqlSave(ctx context.Context) (_node *Wallet, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table: wallet.Table,
			Columns: wallet.Columns,
			ID: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: wallet.FieldID,
			},
		},
	}
		id, ok := wuo.mutation.ID()
		if !ok {
			return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "Wallet.id" for update`)}
		}
		_spec.Node.ID.Value = id
		if fields := wuo.fields; len(fields) > 0 {
			_spec.Node.Columns = make([]string, 0, len(fields))
			_spec.Node.Columns = append(_spec.Node.Columns, wallet.FieldID)
			for _, f := range fields {
				if !wallet.ValidColumn(f) {
					return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
				}
				if f != wallet.FieldID {
					_spec.Node.Columns = append(_spec.Node.Columns, f)
				}
			}
		}
	if ps := wuo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
				if value, ok := wuo.mutation.Paper(); ok {
					_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
						Type: field.TypeInt,
						Value: value,
						Column: wallet.FieldPaper,
					})
				}
					if value, ok := wuo.mutation.AddedPaper(); ok {
						_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
							Type: field.TypeInt,
							Value: value,
							Column: wallet.FieldPaper,
						})
					}
		if wuo.mutation.DopesCleared() {
				edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.DopesTable,
		Columns: []string{ wallet.DopesColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: dope.FieldID,
			},
		},
	}
			_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
		}
			if nodes := wuo.mutation.RemovedDopesIDs(); len(nodes) > 0 && !wuo.mutation.DopesCleared() {
					edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.DopesTable,
		Columns: []string{ wallet.DopesColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: dope.FieldID,
			},
		},
	}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
				_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
			}
		if nodes := wuo.mutation.DopesIDs(); len(nodes) > 0 {
				edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.DopesTable,
		Columns: []string{ wallet.DopesColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: dope.FieldID,
			},
		},
	}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
			_spec.Edges.Add = append(_spec.Edges.Add, edge)
		}
		if wuo.mutation.ItemsCleared() {
				edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.ItemsTable,
		Columns: []string{ wallet.ItemsColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: walletitems.FieldID,
			},
		},
	}
			_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
		}
			if nodes := wuo.mutation.RemovedItemsIDs(); len(nodes) > 0 && !wuo.mutation.ItemsCleared() {
					edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.ItemsTable,
		Columns: []string{ wallet.ItemsColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: walletitems.FieldID,
			},
		},
	}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
				_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
			}
		if nodes := wuo.mutation.ItemsIDs(); len(nodes) > 0 {
				edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.ItemsTable,
		Columns: []string{ wallet.ItemsColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: walletitems.FieldID,
			},
		},
	}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
			_spec.Edges.Add = append(_spec.Edges.Add, edge)
		}
		if wuo.mutation.HustlersCleared() {
				edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.HustlersTable,
		Columns: []string{ wallet.HustlersColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: hustler.FieldID,
			},
		},
	}
			_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
		}
			if nodes := wuo.mutation.RemovedHustlersIDs(); len(nodes) > 0 && !wuo.mutation.HustlersCleared() {
					edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.HustlersTable,
		Columns: []string{ wallet.HustlersColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: hustler.FieldID,
			},
		},
	}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
				_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
			}
		if nodes := wuo.mutation.HustlersIDs(); len(nodes) > 0 {
				edge := &sqlgraph.EdgeSpec{
		Rel: sqlgraph.O2M,
		Inverse: false,
		Table: wallet.HustlersTable,
		Columns: []string{ wallet.HustlersColumn },
		Bidi: false,
		Target: &sqlgraph.EdgeTarget{
			IDSpec: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: hustler.FieldID,
			},
		},
	}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
			_spec.Edges.Add = append(_spec.Edges.Add, edge)
		}
		_node = &Wallet{config: wuo.config}
		_spec.Assign = _node.assignValues
		_spec.ScanValues = _node.scanValues
		if err = sqlgraph.UpdateNode(ctx, wuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{ wallet.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return nil, err
	}
	return _node, nil
}



