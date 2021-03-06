// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"math"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/gamehustler"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/gamehustleritem"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/predicate"
)

// GameHustlerItemQuery is the builder for querying GameHustlerItem entities.
type GameHustlerItemQuery struct {
	config
	limit      *int
	offset     *int
	unique     *bool
	order      []OrderFunc
	fields     []string
	predicates []predicate.GameHustlerItem
	// eager-loading edges.
	withHustler *GameHustlerQuery
	withFKs     bool
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the GameHustlerItemQuery builder.
func (ghiq *GameHustlerItemQuery) Where(ps ...predicate.GameHustlerItem) *GameHustlerItemQuery {
	ghiq.predicates = append(ghiq.predicates, ps...)
	return ghiq
}

// Limit adds a limit step to the query.
func (ghiq *GameHustlerItemQuery) Limit(limit int) *GameHustlerItemQuery {
	ghiq.limit = &limit
	return ghiq
}

// Offset adds an offset step to the query.
func (ghiq *GameHustlerItemQuery) Offset(offset int) *GameHustlerItemQuery {
	ghiq.offset = &offset
	return ghiq
}

// Unique configures the query builder to filter duplicate records on query.
// By default, unique is set to true, and can be disabled using this method.
func (ghiq *GameHustlerItemQuery) Unique(unique bool) *GameHustlerItemQuery {
	ghiq.unique = &unique
	return ghiq
}

// Order adds an order step to the query.
func (ghiq *GameHustlerItemQuery) Order(o ...OrderFunc) *GameHustlerItemQuery {
	ghiq.order = append(ghiq.order, o...)
	return ghiq
}

// QueryHustler chains the current query on the "hustler" edge.
func (ghiq *GameHustlerItemQuery) QueryHustler() *GameHustlerQuery {
	query := &GameHustlerQuery{config: ghiq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := ghiq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := ghiq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(gamehustleritem.Table, gamehustleritem.FieldID, selector),
			sqlgraph.To(gamehustler.Table, gamehustler.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, gamehustleritem.HustlerTable, gamehustleritem.HustlerColumn),
		)
		fromU = sqlgraph.SetNeighbors(ghiq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first GameHustlerItem entity from the query.
// Returns a *NotFoundError when no GameHustlerItem was found.
func (ghiq *GameHustlerItemQuery) First(ctx context.Context) (*GameHustlerItem, error) {
	nodes, err := ghiq.Limit(1).All(ctx)
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{gamehustleritem.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (ghiq *GameHustlerItemQuery) FirstX(ctx context.Context) *GameHustlerItem {
	node, err := ghiq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first GameHustlerItem ID from the query.
// Returns a *NotFoundError when no GameHustlerItem ID was found.
func (ghiq *GameHustlerItemQuery) FirstID(ctx context.Context) (id string, err error) {
	var ids []string
	if ids, err = ghiq.Limit(1).IDs(ctx); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{gamehustleritem.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (ghiq *GameHustlerItemQuery) FirstIDX(ctx context.Context) string {
	id, err := ghiq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns a single GameHustlerItem entity found by the query, ensuring it only returns one.
// Returns a *NotSingularError when more than one GameHustlerItem entity is found.
// Returns a *NotFoundError when no GameHustlerItem entities are found.
func (ghiq *GameHustlerItemQuery) Only(ctx context.Context) (*GameHustlerItem, error) {
	nodes, err := ghiq.Limit(2).All(ctx)
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{gamehustleritem.Label}
	default:
		return nil, &NotSingularError{gamehustleritem.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (ghiq *GameHustlerItemQuery) OnlyX(ctx context.Context) *GameHustlerItem {
	node, err := ghiq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID is like Only, but returns the only GameHustlerItem ID in the query.
// Returns a *NotSingularError when more than one GameHustlerItem ID is found.
// Returns a *NotFoundError when no entities are found.
func (ghiq *GameHustlerItemQuery) OnlyID(ctx context.Context) (id string, err error) {
	var ids []string
	if ids, err = ghiq.Limit(2).IDs(ctx); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{gamehustleritem.Label}
	default:
		err = &NotSingularError{gamehustleritem.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (ghiq *GameHustlerItemQuery) OnlyIDX(ctx context.Context) string {
	id, err := ghiq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of GameHustlerItems.
func (ghiq *GameHustlerItemQuery) All(ctx context.Context) ([]*GameHustlerItem, error) {
	if err := ghiq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	return ghiq.sqlAll(ctx)
}

// AllX is like All, but panics if an error occurs.
func (ghiq *GameHustlerItemQuery) AllX(ctx context.Context) []*GameHustlerItem {
	nodes, err := ghiq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of GameHustlerItem IDs.
func (ghiq *GameHustlerItemQuery) IDs(ctx context.Context) ([]string, error) {
	var ids []string
	if err := ghiq.Select(gamehustleritem.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (ghiq *GameHustlerItemQuery) IDsX(ctx context.Context) []string {
	ids, err := ghiq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (ghiq *GameHustlerItemQuery) Count(ctx context.Context) (int, error) {
	if err := ghiq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return ghiq.sqlCount(ctx)
}

// CountX is like Count, but panics if an error occurs.
func (ghiq *GameHustlerItemQuery) CountX(ctx context.Context) int {
	count, err := ghiq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (ghiq *GameHustlerItemQuery) Exist(ctx context.Context) (bool, error) {
	if err := ghiq.prepareQuery(ctx); err != nil {
		return false, err
	}
	return ghiq.sqlExist(ctx)
}

// ExistX is like Exist, but panics if an error occurs.
func (ghiq *GameHustlerItemQuery) ExistX(ctx context.Context) bool {
	exist, err := ghiq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the GameHustlerItemQuery builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (ghiq *GameHustlerItemQuery) Clone() *GameHustlerItemQuery {
	if ghiq == nil {
		return nil
	}
	return &GameHustlerItemQuery{
		config:      ghiq.config,
		limit:       ghiq.limit,
		offset:      ghiq.offset,
		order:       append([]OrderFunc{}, ghiq.order...),
		predicates:  append([]predicate.GameHustlerItem{}, ghiq.predicates...),
		withHustler: ghiq.withHustler.Clone(),
		// clone intermediate query.
		sql:    ghiq.sql.Clone(),
		path:   ghiq.path,
		unique: ghiq.unique,
	}
}

// WithHustler tells the query-builder to eager-load the nodes that are connected to
// the "hustler" edge. The optional arguments are used to configure the query builder of the edge.
func (ghiq *GameHustlerItemQuery) WithHustler(opts ...func(*GameHustlerQuery)) *GameHustlerItemQuery {
	query := &GameHustlerQuery{config: ghiq.config}
	for _, opt := range opts {
		opt(query)
	}
	ghiq.withHustler = query
	return ghiq
}

// GroupBy is used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		Item string `json:"item,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.GameHustlerItem.Query().
//		GroupBy(gamehustleritem.FieldItem).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
//
func (ghiq *GameHustlerItemQuery) GroupBy(field string, fields ...string) *GameHustlerItemGroupBy {
	group := &GameHustlerItemGroupBy{config: ghiq.config}
	group.fields = append([]string{field}, fields...)
	group.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := ghiq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return ghiq.sqlQuery(ctx), nil
	}
	return group
}

// Select allows the selection one or more fields/columns for the given query,
// instead of selecting all fields in the entity.
//
// Example:
//
//	var v []struct {
//		Item string `json:"item,omitempty"`
//	}
//
//	client.GameHustlerItem.Query().
//		Select(gamehustleritem.FieldItem).
//		Scan(ctx, &v)
//
func (ghiq *GameHustlerItemQuery) Select(fields ...string) *GameHustlerItemSelect {
	ghiq.fields = append(ghiq.fields, fields...)
	return &GameHustlerItemSelect{GameHustlerItemQuery: ghiq}
}

func (ghiq *GameHustlerItemQuery) prepareQuery(ctx context.Context) error {
	for _, f := range ghiq.fields {
		if !gamehustleritem.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
		}
	}
	if ghiq.path != nil {
		prev, err := ghiq.path(ctx)
		if err != nil {
			return err
		}
		ghiq.sql = prev
	}
	return nil
}

func (ghiq *GameHustlerItemQuery) sqlAll(ctx context.Context) ([]*GameHustlerItem, error) {
	var (
		nodes       = []*GameHustlerItem{}
		withFKs     = ghiq.withFKs
		_spec       = ghiq.querySpec()
		loadedTypes = [1]bool{
			ghiq.withHustler != nil,
		}
	)
	if ghiq.withHustler != nil {
		withFKs = true
	}
	if withFKs {
		_spec.Node.Columns = append(_spec.Node.Columns, gamehustleritem.ForeignKeys...)
	}
	_spec.ScanValues = func(columns []string) ([]interface{}, error) {
		node := &GameHustlerItem{config: ghiq.config}
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
	if err := sqlgraph.QueryNodes(ctx, ghiq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}

	if query := ghiq.withHustler; query != nil {
		ids := make([]string, 0, len(nodes))
		nodeids := make(map[string][]*GameHustlerItem)
		for i := range nodes {
			if nodes[i].game_hustler_items == nil {
				continue
			}
			fk := *nodes[i].game_hustler_items
			if _, ok := nodeids[fk]; !ok {
				ids = append(ids, fk)
			}
			nodeids[fk] = append(nodeids[fk], nodes[i])
		}
		query.Where(gamehustler.IDIn(ids...))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			nodes, ok := nodeids[n.ID]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "game_hustler_items" returned %v`, n.ID)
			}
			for i := range nodes {
				nodes[i].Edges.Hustler = n
			}
		}
	}

	return nodes, nil
}

func (ghiq *GameHustlerItemQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := ghiq.querySpec()
	_spec.Node.Columns = ghiq.fields
	if len(ghiq.fields) > 0 {
		_spec.Unique = ghiq.unique != nil && *ghiq.unique
	}
	return sqlgraph.CountNodes(ctx, ghiq.driver, _spec)
}

func (ghiq *GameHustlerItemQuery) sqlExist(ctx context.Context) (bool, error) {
	n, err := ghiq.sqlCount(ctx)
	if err != nil {
		return false, fmt.Errorf("ent: check existence: %w", err)
	}
	return n > 0, nil
}

func (ghiq *GameHustlerItemQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := &sqlgraph.QuerySpec{
		Node: &sqlgraph.NodeSpec{
			Table:   gamehustleritem.Table,
			Columns: gamehustleritem.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: gamehustleritem.FieldID,
			},
		},
		From:   ghiq.sql,
		Unique: true,
	}
	if unique := ghiq.unique; unique != nil {
		_spec.Unique = *unique
	}
	if fields := ghiq.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, gamehustleritem.FieldID)
		for i := range fields {
			if fields[i] != gamehustleritem.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, fields[i])
			}
		}
	}
	if ps := ghiq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := ghiq.limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := ghiq.offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := ghiq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (ghiq *GameHustlerItemQuery) sqlQuery(ctx context.Context) *sql.Selector {
	builder := sql.Dialect(ghiq.driver.Dialect())
	t1 := builder.Table(gamehustleritem.Table)
	columns := ghiq.fields
	if len(columns) == 0 {
		columns = gamehustleritem.Columns
	}
	selector := builder.Select(t1.Columns(columns...)...).From(t1)
	if ghiq.sql != nil {
		selector = ghiq.sql
		selector.Select(selector.Columns(columns...)...)
	}
	if ghiq.unique != nil && *ghiq.unique {
		selector.Distinct()
	}
	for _, p := range ghiq.predicates {
		p(selector)
	}
	for _, p := range ghiq.order {
		p(selector)
	}
	if offset := ghiq.offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := ghiq.limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// GameHustlerItemGroupBy is the group-by builder for GameHustlerItem entities.
type GameHustlerItemGroupBy struct {
	config
	fields []string
	fns    []AggregateFunc
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Aggregate adds the given aggregation functions to the group-by query.
func (ghigb *GameHustlerItemGroupBy) Aggregate(fns ...AggregateFunc) *GameHustlerItemGroupBy {
	ghigb.fns = append(ghigb.fns, fns...)
	return ghigb
}

// Scan applies the group-by query and scans the result into the given value.
func (ghigb *GameHustlerItemGroupBy) Scan(ctx context.Context, v interface{}) error {
	query, err := ghigb.path(ctx)
	if err != nil {
		return err
	}
	ghigb.sql = query
	return ghigb.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (ghigb *GameHustlerItemGroupBy) ScanX(ctx context.Context, v interface{}) {
	if err := ghigb.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from group-by.
// It is only allowed when executing a group-by query with one field.
func (ghigb *GameHustlerItemGroupBy) Strings(ctx context.Context) ([]string, error) {
	if len(ghigb.fields) > 1 {
		return nil, errors.New("ent: GameHustlerItemGroupBy.Strings is not achievable when grouping more than 1 field")
	}
	var v []string
	if err := ghigb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (ghigb *GameHustlerItemGroupBy) StringsX(ctx context.Context) []string {
	v, err := ghigb.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from a group-by query.
// It is only allowed when executing a group-by query with one field.
func (ghigb *GameHustlerItemGroupBy) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = ghigb.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{gamehustleritem.Label}
	default:
		err = fmt.Errorf("ent: GameHustlerItemGroupBy.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (ghigb *GameHustlerItemGroupBy) StringX(ctx context.Context) string {
	v, err := ghigb.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from group-by.
// It is only allowed when executing a group-by query with one field.
func (ghigb *GameHustlerItemGroupBy) Ints(ctx context.Context) ([]int, error) {
	if len(ghigb.fields) > 1 {
		return nil, errors.New("ent: GameHustlerItemGroupBy.Ints is not achievable when grouping more than 1 field")
	}
	var v []int
	if err := ghigb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (ghigb *GameHustlerItemGroupBy) IntsX(ctx context.Context) []int {
	v, err := ghigb.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from a group-by query.
// It is only allowed when executing a group-by query with one field.
func (ghigb *GameHustlerItemGroupBy) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = ghigb.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{gamehustleritem.Label}
	default:
		err = fmt.Errorf("ent: GameHustlerItemGroupBy.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (ghigb *GameHustlerItemGroupBy) IntX(ctx context.Context) int {
	v, err := ghigb.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from group-by.
// It is only allowed when executing a group-by query with one field.
func (ghigb *GameHustlerItemGroupBy) Float64s(ctx context.Context) ([]float64, error) {
	if len(ghigb.fields) > 1 {
		return nil, errors.New("ent: GameHustlerItemGroupBy.Float64s is not achievable when grouping more than 1 field")
	}
	var v []float64
	if err := ghigb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (ghigb *GameHustlerItemGroupBy) Float64sX(ctx context.Context) []float64 {
	v, err := ghigb.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from a group-by query.
// It is only allowed when executing a group-by query with one field.
func (ghigb *GameHustlerItemGroupBy) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = ghigb.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{gamehustleritem.Label}
	default:
		err = fmt.Errorf("ent: GameHustlerItemGroupBy.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (ghigb *GameHustlerItemGroupBy) Float64X(ctx context.Context) float64 {
	v, err := ghigb.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from group-by.
// It is only allowed when executing a group-by query with one field.
func (ghigb *GameHustlerItemGroupBy) Bools(ctx context.Context) ([]bool, error) {
	if len(ghigb.fields) > 1 {
		return nil, errors.New("ent: GameHustlerItemGroupBy.Bools is not achievable when grouping more than 1 field")
	}
	var v []bool
	if err := ghigb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (ghigb *GameHustlerItemGroupBy) BoolsX(ctx context.Context) []bool {
	v, err := ghigb.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from a group-by query.
// It is only allowed when executing a group-by query with one field.
func (ghigb *GameHustlerItemGroupBy) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = ghigb.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{gamehustleritem.Label}
	default:
		err = fmt.Errorf("ent: GameHustlerItemGroupBy.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (ghigb *GameHustlerItemGroupBy) BoolX(ctx context.Context) bool {
	v, err := ghigb.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (ghigb *GameHustlerItemGroupBy) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range ghigb.fields {
		if !gamehustleritem.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for group-by", f)}
		}
	}
	selector := ghigb.sqlQuery()
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := ghigb.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (ghigb *GameHustlerItemGroupBy) sqlQuery() *sql.Selector {
	selector := ghigb.sql.Select()
	aggregation := make([]string, 0, len(ghigb.fns))
	for _, fn := range ghigb.fns {
		aggregation = append(aggregation, fn(selector))
	}
	// If no columns were selected in a custom aggregation function, the default
	// selection is the fields used for "group-by", and the aggregation functions.
	if len(selector.SelectedColumns()) == 0 {
		columns := make([]string, 0, len(ghigb.fields)+len(ghigb.fns))
		for _, f := range ghigb.fields {
			columns = append(columns, selector.C(f))
		}
		columns = append(columns, aggregation...)
		selector.Select(columns...)
	}
	return selector.GroupBy(selector.Columns(ghigb.fields...)...)
}

// GameHustlerItemSelect is the builder for selecting fields of GameHustlerItem entities.
type GameHustlerItemSelect struct {
	*GameHustlerItemQuery
	// intermediate query (i.e. traversal path).
	sql *sql.Selector
}

// Scan applies the selector query and scans the result into the given value.
func (ghis *GameHustlerItemSelect) Scan(ctx context.Context, v interface{}) error {
	if err := ghis.prepareQuery(ctx); err != nil {
		return err
	}
	ghis.sql = ghis.GameHustlerItemQuery.sqlQuery(ctx)
	return ghis.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (ghis *GameHustlerItemSelect) ScanX(ctx context.Context, v interface{}) {
	if err := ghis.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from a selector. It is only allowed when selecting one field.
func (ghis *GameHustlerItemSelect) Strings(ctx context.Context) ([]string, error) {
	if len(ghis.fields) > 1 {
		return nil, errors.New("ent: GameHustlerItemSelect.Strings is not achievable when selecting more than 1 field")
	}
	var v []string
	if err := ghis.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (ghis *GameHustlerItemSelect) StringsX(ctx context.Context) []string {
	v, err := ghis.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from a selector. It is only allowed when selecting one field.
func (ghis *GameHustlerItemSelect) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = ghis.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{gamehustleritem.Label}
	default:
		err = fmt.Errorf("ent: GameHustlerItemSelect.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (ghis *GameHustlerItemSelect) StringX(ctx context.Context) string {
	v, err := ghis.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from a selector. It is only allowed when selecting one field.
func (ghis *GameHustlerItemSelect) Ints(ctx context.Context) ([]int, error) {
	if len(ghis.fields) > 1 {
		return nil, errors.New("ent: GameHustlerItemSelect.Ints is not achievable when selecting more than 1 field")
	}
	var v []int
	if err := ghis.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (ghis *GameHustlerItemSelect) IntsX(ctx context.Context) []int {
	v, err := ghis.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from a selector. It is only allowed when selecting one field.
func (ghis *GameHustlerItemSelect) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = ghis.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{gamehustleritem.Label}
	default:
		err = fmt.Errorf("ent: GameHustlerItemSelect.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (ghis *GameHustlerItemSelect) IntX(ctx context.Context) int {
	v, err := ghis.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from a selector. It is only allowed when selecting one field.
func (ghis *GameHustlerItemSelect) Float64s(ctx context.Context) ([]float64, error) {
	if len(ghis.fields) > 1 {
		return nil, errors.New("ent: GameHustlerItemSelect.Float64s is not achievable when selecting more than 1 field")
	}
	var v []float64
	if err := ghis.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (ghis *GameHustlerItemSelect) Float64sX(ctx context.Context) []float64 {
	v, err := ghis.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from a selector. It is only allowed when selecting one field.
func (ghis *GameHustlerItemSelect) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = ghis.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{gamehustleritem.Label}
	default:
		err = fmt.Errorf("ent: GameHustlerItemSelect.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (ghis *GameHustlerItemSelect) Float64X(ctx context.Context) float64 {
	v, err := ghis.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from a selector. It is only allowed when selecting one field.
func (ghis *GameHustlerItemSelect) Bools(ctx context.Context) ([]bool, error) {
	if len(ghis.fields) > 1 {
		return nil, errors.New("ent: GameHustlerItemSelect.Bools is not achievable when selecting more than 1 field")
	}
	var v []bool
	if err := ghis.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (ghis *GameHustlerItemSelect) BoolsX(ctx context.Context) []bool {
	v, err := ghis.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from a selector. It is only allowed when selecting one field.
func (ghis *GameHustlerItemSelect) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = ghis.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{gamehustleritem.Label}
	default:
		err = fmt.Errorf("ent: GameHustlerItemSelect.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (ghis *GameHustlerItemSelect) BoolX(ctx context.Context) bool {
	v, err := ghis.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (ghis *GameHustlerItemSelect) sqlScan(ctx context.Context, v interface{}) error {
	rows := &sql.Rows{}
	query, args := ghis.sql.Query()
	if err := ghis.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}
