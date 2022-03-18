



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
			"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
	"entgo.io/ent"
	"entgo.io/ent/dialect"
			"entgo.io/ent/dialect/sql"
			"entgo.io/ent/dialect/sql/sqlgraph"
			"entgo.io/ent/schema/field"

)


import (
		"github.com/dopedao/dope-monorepo/packages/api/ent/search"
		"github.com/dopedao/dope-monorepo/packages/api/ent/dope"
		"github.com/dopedao/dope-monorepo/packages/api/ent/item"
		"github.com/dopedao/dope-monorepo/packages/api/ent/hustler"
)




// SearchQuery is the builder for querying Search entities.
type SearchQuery struct {
	config
	limit		*int
	offset		*int
	unique		*bool
	order		[]OrderFunc
	fields		[]string
	predicates 	[]predicate.Search
		// eager-loading edges.
			withDope *DopeQuery
			withItem *ItemQuery
			withHustler *HustlerQuery
		withFKs bool
	// intermediate query (i.e. traversal path).
	sql *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the SearchQuery builder.
func (sq *SearchQuery) Where(ps ...predicate.Search) *SearchQuery {
	sq.predicates = append(sq.predicates, ps...)
	return sq
}

// Limit adds a limit step to the query.
func (sq *SearchQuery) Limit(limit int) *SearchQuery {
	sq.limit = &limit
	return sq
}

// Offset adds an offset step to the query.
func (sq *SearchQuery) Offset(offset int) *SearchQuery {
	sq.offset = &offset
	return sq
}

// Unique configures the query builder to filter duplicate records on query.
// By default, unique is set to true, and can be disabled using this method.
func (sq *SearchQuery) Unique(unique bool) *SearchQuery {
	sq.unique = &unique
	return sq
}

// Order adds an order step to the query.
func (sq *SearchQuery) Order(o ...OrderFunc) *SearchQuery {
	sq.order = append(sq.order, o...)
	return sq
}



	
	// QueryDope chains the current query on the "dope" edge.
	func (sq *SearchQuery) QueryDope() *DopeQuery {
		query := &DopeQuery{config: sq.config}
		query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
			if err := sq.prepareQuery(ctx); err != nil {
				return nil, err
			}  
	selector := sq.sqlQuery(ctx)
	if err := selector.Err(); err != nil {
		return nil, err
	}
	step := sqlgraph.NewStep(
		sqlgraph.From(search.Table, search.FieldID, selector),
		sqlgraph.To(dope.Table, dope.FieldID),
		sqlgraph.Edge(sqlgraph.O2O, true, search.DopeTable,search.DopeColumn),
	)
	fromU = sqlgraph.SetNeighbors(sq.driver.Dialect(), step)
return fromU, nil
		}
		return query
	}

	
	// QueryItem chains the current query on the "item" edge.
	func (sq *SearchQuery) QueryItem() *ItemQuery {
		query := &ItemQuery{config: sq.config}
		query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
			if err := sq.prepareQuery(ctx); err != nil {
				return nil, err
			}  
	selector := sq.sqlQuery(ctx)
	if err := selector.Err(); err != nil {
		return nil, err
	}
	step := sqlgraph.NewStep(
		sqlgraph.From(search.Table, search.FieldID, selector),
		sqlgraph.To(item.Table, item.FieldID),
		sqlgraph.Edge(sqlgraph.O2O, true, search.ItemTable,search.ItemColumn),
	)
	fromU = sqlgraph.SetNeighbors(sq.driver.Dialect(), step)
return fromU, nil
		}
		return query
	}

	
	// QueryHustler chains the current query on the "hustler" edge.
	func (sq *SearchQuery) QueryHustler() *HustlerQuery {
		query := &HustlerQuery{config: sq.config}
		query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
			if err := sq.prepareQuery(ctx); err != nil {
				return nil, err
			}  
	selector := sq.sqlQuery(ctx)
	if err := selector.Err(); err != nil {
		return nil, err
	}
	step := sqlgraph.NewStep(
		sqlgraph.From(search.Table, search.FieldID, selector),
		sqlgraph.To(hustler.Table, hustler.FieldID),
		sqlgraph.Edge(sqlgraph.O2O, true, search.HustlerTable,search.HustlerColumn),
	)
	fromU = sqlgraph.SetNeighbors(sq.driver.Dialect(), step)
return fromU, nil
		}
		return query
	}


// First returns the first Search entity from the query. 
// Returns a *NotFoundError when no Search was found.
func (sq *SearchQuery) First(ctx context.Context) (*Search, error) {
	nodes, err := sq.Limit(1).All(ctx)
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{ search.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (sq *SearchQuery) FirstX(ctx context.Context) *Search {
	node, err := sq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first Search ID from the query. 
// Returns a *NotFoundError when no Search ID was found.
func (sq *SearchQuery) FirstID(ctx context.Context) (id string, err error) {
	var ids []string
	if ids, err = sq.Limit(1).IDs(ctx); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{ search.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (sq *SearchQuery) FirstIDX(ctx context.Context) string {
	id, err := sq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns a single Search entity found by the query, ensuring it only returns one.
// Returns a *NotSingularError when exactly one Search entity is not found.
// Returns a *NotFoundError when no Search entities are found.
func (sq *SearchQuery) Only(ctx context.Context) (*Search, error) {
	nodes, err := sq.Limit(2).All(ctx)
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{ search.Label}
	default:
		return nil, &NotSingularError{ search.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (sq *SearchQuery) OnlyX(ctx context.Context) *Search {
	node, err := sq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID is like Only, but returns the only Search ID in the query.
// Returns a *NotSingularError when exactly one Search ID is not found.
// Returns a *NotFoundError when no entities are found.
func (sq *SearchQuery) OnlyID(ctx context.Context) (id string, err error) {
	var ids []string
	if ids, err = sq.Limit(2).IDs(ctx); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{ search.Label}
	default:
		err = &NotSingularError{ search.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (sq *SearchQuery) OnlyIDX(ctx context.Context) string {
	id, err := sq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of Searches.
func (sq *SearchQuery) All(ctx context.Context) ([]*Search, error) {
	if err := sq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	return sq.sqlAll(ctx)
}

// AllX is like All, but panics if an error occurs.
func (sq *SearchQuery) AllX(ctx context.Context) []*Search {
	nodes, err := sq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of Search IDs.
func (sq *SearchQuery) IDs(ctx context.Context) ([]string, error) {
	var ids []string
	if err := sq.Select(search.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (sq *SearchQuery) IDsX(ctx context.Context) []string {
	ids, err := sq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (sq *SearchQuery) Count(ctx context.Context) (int, error) {
	if err := sq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return sq.sqlCount(ctx)
}

// CountX is like Count, but panics if an error occurs.
func (sq *SearchQuery) CountX(ctx context.Context) int {
	count, err := sq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (sq *SearchQuery) Exist(ctx context.Context) (bool, error) {
	if err := sq.prepareQuery(ctx); err != nil {
		return false, err
	}
	return sq.sqlExist(ctx)
}

// ExistX is like Exist, but panics if an error occurs.
func (sq *SearchQuery) ExistX(ctx context.Context) bool {
	exist, err := sq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the SearchQuery builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (sq *SearchQuery) Clone() *SearchQuery {
	if sq == nil {
		return nil
	}
	return &SearchQuery{
		config: 	sq.config,
		limit: 		sq.limit,
		offset: 	sq.offset,
		order: 		append([]OrderFunc{}, sq.order...),
		predicates: append([]predicate.Search{}, sq.predicates...),
			withDope: sq.withDope.Clone(),
			withItem: sq.withItem.Clone(),
			withHustler: sq.withHustler.Clone(),
		// clone intermediate query.
		sql: sq.sql.Clone(),
		path: sq.path,
	}
}
	
	// WithDope tells the query-builder to eager-load the nodes that are connected to
	// the "dope" edge. The optional arguments are used to configure the query builder of the edge.
	func (sq *SearchQuery) WithDope(opts ...func(*DopeQuery)) *SearchQuery {
		query := &DopeQuery{config: sq.config}
		for _, opt := range opts {
			opt(query)
		}
		sq.withDope = query
		return sq
	}
	
	// WithItem tells the query-builder to eager-load the nodes that are connected to
	// the "item" edge. The optional arguments are used to configure the query builder of the edge.
	func (sq *SearchQuery) WithItem(opts ...func(*ItemQuery)) *SearchQuery {
		query := &ItemQuery{config: sq.config}
		for _, opt := range opts {
			opt(query)
		}
		sq.withItem = query
		return sq
	}
	
	// WithHustler tells the query-builder to eager-load the nodes that are connected to
	// the "hustler" edge. The optional arguments are used to configure the query builder of the edge.
	func (sq *SearchQuery) WithHustler(opts ...func(*HustlerQuery)) *SearchQuery {
		query := &HustlerQuery{config: sq.config}
		for _, opt := range opts {
			opt(query)
		}
		sq.withHustler = query
		return sq
	}



// GroupBy is used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		Type search.Type `json:"type,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.Search.Query().
//		GroupBy(search.FieldType).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
//
func (sq *SearchQuery) GroupBy(field string, fields ...string) *SearchGroupBy {
	group := &SearchGroupBy{config: sq.config}
	group.fields = append([]string{field}, fields...)
	group.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := sq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return sq.sqlQuery(ctx), nil
	}
	return group
}



// Select allows the selection one or more fields/columns for the given query,
// instead of selecting all fields in the entity.
//
// Example:
//
//	var v []struct {
//		Type search.Type `json:"type,omitempty"`
//	}
//
//	client.Search.Query().
//		Select(search.FieldType).
//		Scan(ctx, &v)
//
func (sq *SearchQuery) Select(fields ...string) *SearchSelect {
	sq.fields = append(sq.fields, fields...)
	return &SearchSelect{ SearchQuery: sq }
}

func (sq *SearchQuery) prepareQuery(ctx context.Context) error {
	for _, f := range sq.fields {
		if !search.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
		}
	}
	if sq.path != nil {
		prev, err := sq.path(ctx)
		if err != nil {
			return err
		}
		sq.sql = prev
	}
	return nil
}


	
	




func (sq *SearchQuery) sqlAll(ctx context.Context) ([]*Search, error) {
	var (
		nodes = []*Search{}
			withFKs = sq.withFKs
		_spec = sq.querySpec()
			loadedTypes = [3]bool{
					sq.withDope != nil,
					sq.withItem != nil,
					sq.withHustler != nil,
			}
	)
				if sq.withDope != nil || sq.withItem != nil || sq.withHustler != nil {
					withFKs = true
				}
			if withFKs {
				_spec.Node.Columns = append(_spec.Node.Columns, search.ForeignKeys...)
			}
	_spec.ScanValues = func(columns []string) ([]interface{}, error) {
		node := &Search{config: sq.config}
		nodes = append(nodes, node)
		return node.scanValues(columns)
	}
	_spec.Assign = func(columns []string, values []interface{}) error {
		if len(nodes) == 0 {
			return fmt.Errorf("ent: Assign called without calling ScanValues")
		}
		node := nodes[len(nodes)-1]
			node.Edges.loadedTypes = loadedTypes
		return node.assignValues(columns, values)
	}
	if err := sqlgraph.QueryNodes(ctx, sq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}
			
	if query := sq.withDope; query != nil {
			ids := make([]string, 0, len(nodes))
			nodeids := make(map[string][]*Search)
			for i := range nodes {
					if nodes[i].dope_index == nil {
						continue
					}
				fk := *nodes[i].dope_index
				if _, ok := nodeids[fk]; !ok {
					ids = append(ids, fk)
				}
				nodeids[fk] = append(nodeids[fk], nodes[i])
			}
			query.Where(dope.IDIn(ids...))
			neighbors, err := query.All(ctx)
			if err != nil {
				return nil, err
			}
			for _, n := range neighbors {
				nodes, ok := nodeids[n.ID]
				if !ok {
					return nil, fmt.Errorf(`unexpected foreign-key "dope_index" returned %v`, n.ID)
				}
				for i := range nodes {
					nodes[i].Edges.Dope = n
				}
			}
	}

			
	if query := sq.withItem; query != nil {
			ids := make([]string, 0, len(nodes))
			nodeids := make(map[string][]*Search)
			for i := range nodes {
					if nodes[i].item_index == nil {
						continue
					}
				fk := *nodes[i].item_index
				if _, ok := nodeids[fk]; !ok {
					ids = append(ids, fk)
				}
				nodeids[fk] = append(nodeids[fk], nodes[i])
			}
			query.Where(item.IDIn(ids...))
			neighbors, err := query.All(ctx)
			if err != nil {
				return nil, err
			}
			for _, n := range neighbors {
				nodes, ok := nodeids[n.ID]
				if !ok {
					return nil, fmt.Errorf(`unexpected foreign-key "item_index" returned %v`, n.ID)
				}
				for i := range nodes {
					nodes[i].Edges.Item = n
				}
			}
	}

			
	if query := sq.withHustler; query != nil {
			ids := make([]string, 0, len(nodes))
			nodeids := make(map[string][]*Search)
			for i := range nodes {
					if nodes[i].hustler_index == nil {
						continue
					}
				fk := *nodes[i].hustler_index
				if _, ok := nodeids[fk]; !ok {
					ids = append(ids, fk)
				}
				nodeids[fk] = append(nodeids[fk], nodes[i])
			}
			query.Where(hustler.IDIn(ids...))
			neighbors, err := query.All(ctx)
			if err != nil {
				return nil, err
			}
			for _, n := range neighbors {
				nodes, ok := nodeids[n.ID]
				if !ok {
					return nil, fmt.Errorf(`unexpected foreign-key "hustler_index" returned %v`, n.ID)
				}
				for i := range nodes {
					nodes[i].Edges.Hustler = n
				}
			}
	}

	return nodes, nil
}

func (sq *SearchQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := sq.querySpec()
	_spec.Node.Columns = sq.fields
	if len(sq.fields) > 0 {
		_spec.Unique = sq.unique != nil && *sq.unique
	}
	return sqlgraph.CountNodes(ctx, sq.driver, _spec)
}

func (sq *SearchQuery) sqlExist(ctx context.Context) (bool, error) {
	n, err := sq.sqlCount(ctx)
	if err != nil {
		return false, fmt.Errorf("ent: check existence: %w", err)
	}
	return n > 0, nil
}

func (sq *SearchQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := &sqlgraph.QuerySpec{
		Node: &sqlgraph.NodeSpec{
			Table: search.Table,
			Columns: search.Columns,
			ID: &sqlgraph.FieldSpec{
				Type: field.TypeString,
				Column: search.FieldID,
			},
		},
		From: sq.sql,
		Unique: true,
	}
	if unique := sq.unique; unique != nil {
		_spec.Unique = *unique
	}
	if fields := sq.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, search.FieldID)
		for i := range fields {
			if fields[i] != search.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, fields[i])
			}
		}
	}
	if ps := sq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := sq.limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := sq.offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := sq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}





func (sq *SearchQuery) sqlQuery(ctx context.Context) *sql.Selector {
	builder := sql.Dialect(sq.driver.Dialect())
	t1 := builder.Table(search.Table)
	columns := sq.fields
	if len(columns) == 0 {
		columns = search.Columns
	}
	selector := builder.Select(t1.Columns(columns...)...).From(t1)
	if sq.sql != nil {
		selector = sq.sql
		selector.Select(selector.Columns(columns...)...)
	}
	if sq.unique != nil && *sq.unique {
		selector.Distinct()
	}
	for _, p := range sq.predicates {
		p(selector)
	}
	for _, p := range sq.order {
		p(selector)
	}
	if offset := sq.offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := sq.limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

    

    










// SearchGroupBy is the group-by builder for Search entities.
type SearchGroupBy struct {
	config
	fields []string
	fns    []AggregateFunc
	// intermediate query (i.e. traversal path).
	sql *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Aggregate adds the given aggregation functions to the group-by query.
func (sgb *SearchGroupBy) Aggregate(fns ...AggregateFunc) *SearchGroupBy {
	sgb.fns = append(sgb.fns, fns...)
	return sgb
}

// Scan applies the group-by query and scans the result into the given value.
func (sgb *SearchGroupBy) Scan(ctx context.Context, v interface{}) error {
	query, err := sgb.path(ctx)
	if err != nil {
		return err
	}
	sgb.sql = query
	return sgb.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (sgb *SearchGroupBy) ScanX(ctx context.Context, v interface{}) {
	if err := sgb.Scan(ctx, v); err != nil {
		panic(err)
	}
}


	
	// Strings returns list of strings from group-by. 
	// It is only allowed when executing a group-by query with one field.
	func (sgb *SearchGroupBy) Strings(ctx context.Context) ([]string, error) {
		if len(sgb.fields) > 1 {
			return nil, errors.New("ent: SearchGroupBy.Strings is not achievable when grouping more than 1 field")
		}
		var v []string
		if err := sgb.Scan(ctx, &v); err != nil {
			return nil, err
		}
		return v, nil
	}

	// StringsX is like Strings, but panics if an error occurs.
	func (sgb *SearchGroupBy) StringsX(ctx context.Context) []string {
		v, err := sgb.Strings(ctx)
		if err != nil {
			panic(err)
		}
		return v
	}

	// String returns a single string from a group-by query.
	// It is only allowed when executing a group-by query with one field.
	func (sgb *SearchGroupBy) String(ctx context.Context) (_ string, err error) {
		var v []string
		if v, err = sgb.Strings(ctx); err != nil {
			return
		}
		switch len(v) {
		case 1:
			return v[0], nil
		case 0:
			err = &NotFoundError{ search.Label}
		default:
			err = fmt.Errorf("ent: SearchGroupBy.Strings returned %d results when one was expected", len(v))
		}
		return
	}

	// StringX is like String, but panics if an error occurs.
	func (sgb *SearchGroupBy) StringX(ctx context.Context) string {
		v, err := sgb.String(ctx)
		if err != nil {
			panic(err)
		}
		return v
	}

	
	// Ints returns list of ints from group-by. 
	// It is only allowed when executing a group-by query with one field.
	func (sgb *SearchGroupBy) Ints(ctx context.Context) ([]int, error) {
		if len(sgb.fields) > 1 {
			return nil, errors.New("ent: SearchGroupBy.Ints is not achievable when grouping more than 1 field")
		}
		var v []int
		if err := sgb.Scan(ctx, &v); err != nil {
			return nil, err
		}
		return v, nil
	}

	// IntsX is like Ints, but panics if an error occurs.
	func (sgb *SearchGroupBy) IntsX(ctx context.Context) []int {
		v, err := sgb.Ints(ctx)
		if err != nil {
			panic(err)
		}
		return v
	}

	// Int returns a single int from a group-by query.
	// It is only allowed when executing a group-by query with one field.
	func (sgb *SearchGroupBy) Int(ctx context.Context) (_ int, err error) {
		var v []int
		if v, err = sgb.Ints(ctx); err != nil {
			return
		}
		switch len(v) {
		case 1:
			return v[0], nil
		case 0:
			err = &NotFoundError{ search.Label}
		default:
			err = fmt.Errorf("ent: SearchGroupBy.Ints returned %d results when one was expected", len(v))
		}
		return
	}

	// IntX is like Int, but panics if an error occurs.
	func (sgb *SearchGroupBy) IntX(ctx context.Context) int {
		v, err := sgb.Int(ctx)
		if err != nil {
			panic(err)
		}
		return v
	}

	
	// Float64s returns list of float64s from group-by. 
	// It is only allowed when executing a group-by query with one field.
	func (sgb *SearchGroupBy) Float64s(ctx context.Context) ([]float64, error) {
		if len(sgb.fields) > 1 {
			return nil, errors.New("ent: SearchGroupBy.Float64s is not achievable when grouping more than 1 field")
		}
		var v []float64
		if err := sgb.Scan(ctx, &v); err != nil {
			return nil, err
		}
		return v, nil
	}

	// Float64sX is like Float64s, but panics if an error occurs.
	func (sgb *SearchGroupBy) Float64sX(ctx context.Context) []float64 {
		v, err := sgb.Float64s(ctx)
		if err != nil {
			panic(err)
		}
		return v
	}

	// Float64 returns a single float64 from a group-by query.
	// It is only allowed when executing a group-by query with one field.
	func (sgb *SearchGroupBy) Float64(ctx context.Context) (_ float64, err error) {
		var v []float64
		if v, err = sgb.Float64s(ctx); err != nil {
			return
		}
		switch len(v) {
		case 1:
			return v[0], nil
		case 0:
			err = &NotFoundError{ search.Label}
		default:
			err = fmt.Errorf("ent: SearchGroupBy.Float64s returned %d results when one was expected", len(v))
		}
		return
	}

	// Float64X is like Float64, but panics if an error occurs.
	func (sgb *SearchGroupBy) Float64X(ctx context.Context) float64 {
		v, err := sgb.Float64(ctx)
		if err != nil {
			panic(err)
		}
		return v
	}

	
	// Bools returns list of bools from group-by. 
	// It is only allowed when executing a group-by query with one field.
	func (sgb *SearchGroupBy) Bools(ctx context.Context) ([]bool, error) {
		if len(sgb.fields) > 1 {
			return nil, errors.New("ent: SearchGroupBy.Bools is not achievable when grouping more than 1 field")
		}
		var v []bool
		if err := sgb.Scan(ctx, &v); err != nil {
			return nil, err
		}
		return v, nil
	}

	// BoolsX is like Bools, but panics if an error occurs.
	func (sgb *SearchGroupBy) BoolsX(ctx context.Context) []bool {
		v, err := sgb.Bools(ctx)
		if err != nil {
			panic(err)
		}
		return v
	}

	// Bool returns a single bool from a group-by query.
	// It is only allowed when executing a group-by query with one field.
	func (sgb *SearchGroupBy) Bool(ctx context.Context) (_ bool, err error) {
		var v []bool
		if v, err = sgb.Bools(ctx); err != nil {
			return
		}
		switch len(v) {
		case 1:
			return v[0], nil
		case 0:
			err = &NotFoundError{ search.Label}
		default:
			err = fmt.Errorf("ent: SearchGroupBy.Bools returned %d results when one was expected", len(v))
		}
		return
	}

	// BoolX is like Bool, but panics if an error occurs.
	func (sgb *SearchGroupBy) BoolX(ctx context.Context) bool {
		v, err := sgb.Bool(ctx)
		if err != nil {
			panic(err)
		}
		return v
	}



	
	



func (sgb *SearchGroupBy) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range sgb.fields {
		if !search.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for group-by", f)}
		}
	}
	selector := sgb.sqlQuery()
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := sgb.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}


func (sgb *SearchGroupBy) sqlQuery() *sql.Selector {
	selector := sgb.sql.Select()
	aggregation := make([]string, 0, len(sgb.fns))
	for _, fn := range sgb.fns {
		aggregation = append(aggregation, fn(selector))
	}
	// If no columns were selected in a custom aggregation function, the default
	// selection is the fields used for "group-by", and the aggregation functions.
	if len(selector.SelectedColumns()) == 0 {
		columns := make([]string, 0, len(sgb.fields) + len(sgb.fns))
		for _, f := range sgb.fields {
			columns = append(columns, selector.C(f))
		}
		columns = append(columns, aggregation...)
		selector.Select(columns...)
	}
	return selector.GroupBy(selector.Columns(sgb.fields...)...)
}







// SearchSelect is the builder for selecting fields of Search entities.
type SearchSelect struct {
	*SearchQuery
	// intermediate query (i.e. traversal path).
	sql *sql.Selector
}


// Scan applies the selector query and scans the result into the given value.
func (ss *SearchSelect) Scan(ctx context.Context, v interface{}) error {
	if err := ss.prepareQuery(ctx); err != nil {
		return err
	}
	ss.sql = ss.SearchQuery.sqlQuery(ctx)
	return ss.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (ss *SearchSelect) ScanX(ctx context.Context, v interface{}) {
	if err := ss.Scan(ctx, v); err != nil {
		panic(err)
	}
}


	
	// Strings returns list of strings from a selector. It is only allowed when selecting one field.
	func (ss *SearchSelect) Strings(ctx context.Context) ([]string, error) {
		if len(ss.fields) > 1 {
			return nil, errors.New("ent: SearchSelect.Strings is not achievable when selecting more than 1 field")
		}
		var v []string
		if err := ss.Scan(ctx, &v); err != nil {
			return nil, err
		}
		return v, nil
	}

	// StringsX is like Strings, but panics if an error occurs.
	func (ss *SearchSelect) StringsX(ctx context.Context) []string {
		v, err := ss.Strings(ctx)
		if err != nil {
			panic(err)
		}
		return v
	}

	// String returns a single string from a selector. It is only allowed when selecting one field.
	func (ss *SearchSelect) String(ctx context.Context) (_ string, err error) {
		var v []string
		if v, err = ss.Strings(ctx); err != nil {
			return
		}
		switch len(v) {
		case 1:
			return v[0], nil
		case 0:
			err = &NotFoundError{ search.Label}
		default:
			err = fmt.Errorf("ent: SearchSelect.Strings returned %d results when one was expected", len(v))
		}
		return
	}

	// StringX is like String, but panics if an error occurs.
	func (ss *SearchSelect) StringX(ctx context.Context) string {
		v, err := ss.String(ctx)
		if err != nil {
			panic(err)
		}
		return v
	}

	
	// Ints returns list of ints from a selector. It is only allowed when selecting one field.
	func (ss *SearchSelect) Ints(ctx context.Context) ([]int, error) {
		if len(ss.fields) > 1 {
			return nil, errors.New("ent: SearchSelect.Ints is not achievable when selecting more than 1 field")
		}
		var v []int
		if err := ss.Scan(ctx, &v); err != nil {
			return nil, err
		}
		return v, nil
	}

	// IntsX is like Ints, but panics if an error occurs.
	func (ss *SearchSelect) IntsX(ctx context.Context) []int {
		v, err := ss.Ints(ctx)
		if err != nil {
			panic(err)
		}
		return v
	}

	// Int returns a single int from a selector. It is only allowed when selecting one field.
	func (ss *SearchSelect) Int(ctx context.Context) (_ int, err error) {
		var v []int
		if v, err = ss.Ints(ctx); err != nil {
			return
		}
		switch len(v) {
		case 1:
			return v[0], nil
		case 0:
			err = &NotFoundError{ search.Label}
		default:
			err = fmt.Errorf("ent: SearchSelect.Ints returned %d results when one was expected", len(v))
		}
		return
	}

	// IntX is like Int, but panics if an error occurs.
	func (ss *SearchSelect) IntX(ctx context.Context) int {
		v, err := ss.Int(ctx)
		if err != nil {
			panic(err)
		}
		return v
	}

	
	// Float64s returns list of float64s from a selector. It is only allowed when selecting one field.
	func (ss *SearchSelect) Float64s(ctx context.Context) ([]float64, error) {
		if len(ss.fields) > 1 {
			return nil, errors.New("ent: SearchSelect.Float64s is not achievable when selecting more than 1 field")
		}
		var v []float64
		if err := ss.Scan(ctx, &v); err != nil {
			return nil, err
		}
		return v, nil
	}

	// Float64sX is like Float64s, but panics if an error occurs.
	func (ss *SearchSelect) Float64sX(ctx context.Context) []float64 {
		v, err := ss.Float64s(ctx)
		if err != nil {
			panic(err)
		}
		return v
	}

	// Float64 returns a single float64 from a selector. It is only allowed when selecting one field.
	func (ss *SearchSelect) Float64(ctx context.Context) (_ float64, err error) {
		var v []float64
		if v, err = ss.Float64s(ctx); err != nil {
			return
		}
		switch len(v) {
		case 1:
			return v[0], nil
		case 0:
			err = &NotFoundError{ search.Label}
		default:
			err = fmt.Errorf("ent: SearchSelect.Float64s returned %d results when one was expected", len(v))
		}
		return
	}

	// Float64X is like Float64, but panics if an error occurs.
	func (ss *SearchSelect) Float64X(ctx context.Context) float64 {
		v, err := ss.Float64(ctx)
		if err != nil {
			panic(err)
		}
		return v
	}

	
	// Bools returns list of bools from a selector. It is only allowed when selecting one field.
	func (ss *SearchSelect) Bools(ctx context.Context) ([]bool, error) {
		if len(ss.fields) > 1 {
			return nil, errors.New("ent: SearchSelect.Bools is not achievable when selecting more than 1 field")
		}
		var v []bool
		if err := ss.Scan(ctx, &v); err != nil {
			return nil, err
		}
		return v, nil
	}

	// BoolsX is like Bools, but panics if an error occurs.
	func (ss *SearchSelect) BoolsX(ctx context.Context) []bool {
		v, err := ss.Bools(ctx)
		if err != nil {
			panic(err)
		}
		return v
	}

	// Bool returns a single bool from a selector. It is only allowed when selecting one field.
	func (ss *SearchSelect) Bool(ctx context.Context) (_ bool, err error) {
		var v []bool
		if v, err = ss.Bools(ctx); err != nil {
			return
		}
		switch len(v) {
		case 1:
			return v[0], nil
		case 0:
			err = &NotFoundError{ search.Label}
		default:
			err = fmt.Errorf("ent: SearchSelect.Bools returned %d results when one was expected", len(v))
		}
		return
	}

	// BoolX is like Bool, but panics if an error occurs.
	func (ss *SearchSelect) BoolX(ctx context.Context) bool {
		v, err := ss.Bool(ctx)
		if err != nil {
			panic(err)
		}
		return v
	}



	
	



func (ss *SearchSelect) sqlScan(ctx context.Context, v interface{}) error {
	rows := &sql.Rows{}
	query, args := ss.sql.Query()
	if err := ss.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}



    






