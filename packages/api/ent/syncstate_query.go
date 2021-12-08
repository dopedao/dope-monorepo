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
	"github.com/dopedao/dope-monorepo/packages/api/ent/predicate"
	"github.com/dopedao/dope-monorepo/packages/api/ent/syncstate"
)

// SyncStateQuery is the builder for querying SyncState entities.
type SyncStateQuery struct {
	config
	limit      *int
	offset     *int
	unique     *bool
	order      []OrderFunc
	fields     []string
	predicates []predicate.SyncState
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the SyncStateQuery builder.
func (ssq *SyncStateQuery) Where(ps ...predicate.SyncState) *SyncStateQuery {
	ssq.predicates = append(ssq.predicates, ps...)
	return ssq
}

// Limit adds a limit step to the query.
func (ssq *SyncStateQuery) Limit(limit int) *SyncStateQuery {
	ssq.limit = &limit
	return ssq
}

// Offset adds an offset step to the query.
func (ssq *SyncStateQuery) Offset(offset int) *SyncStateQuery {
	ssq.offset = &offset
	return ssq
}

// Unique configures the query builder to filter duplicate records on query.
// By default, unique is set to true, and can be disabled using this method.
func (ssq *SyncStateQuery) Unique(unique bool) *SyncStateQuery {
	ssq.unique = &unique
	return ssq
}

// Order adds an order step to the query.
func (ssq *SyncStateQuery) Order(o ...OrderFunc) *SyncStateQuery {
	ssq.order = append(ssq.order, o...)
	return ssq
}

// First returns the first SyncState entity from the query.
// Returns a *NotFoundError when no SyncState was found.
func (ssq *SyncStateQuery) First(ctx context.Context) (*SyncState, error) {
	nodes, err := ssq.Limit(1).All(ctx)
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{syncstate.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (ssq *SyncStateQuery) FirstX(ctx context.Context) *SyncState {
	node, err := ssq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first SyncState ID from the query.
// Returns a *NotFoundError when no SyncState ID was found.
func (ssq *SyncStateQuery) FirstID(ctx context.Context) (id string, err error) {
	var ids []string
	if ids, err = ssq.Limit(1).IDs(ctx); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{syncstate.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (ssq *SyncStateQuery) FirstIDX(ctx context.Context) string {
	id, err := ssq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns a single SyncState entity found by the query, ensuring it only returns one.
// Returns a *NotSingularError when exactly one SyncState entity is not found.
// Returns a *NotFoundError when no SyncState entities are found.
func (ssq *SyncStateQuery) Only(ctx context.Context) (*SyncState, error) {
	nodes, err := ssq.Limit(2).All(ctx)
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{syncstate.Label}
	default:
		return nil, &NotSingularError{syncstate.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (ssq *SyncStateQuery) OnlyX(ctx context.Context) *SyncState {
	node, err := ssq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID is like Only, but returns the only SyncState ID in the query.
// Returns a *NotSingularError when exactly one SyncState ID is not found.
// Returns a *NotFoundError when no entities are found.
func (ssq *SyncStateQuery) OnlyID(ctx context.Context) (id string, err error) {
	var ids []string
	if ids, err = ssq.Limit(2).IDs(ctx); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{syncstate.Label}
	default:
		err = &NotSingularError{syncstate.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (ssq *SyncStateQuery) OnlyIDX(ctx context.Context) string {
	id, err := ssq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of SyncStates.
func (ssq *SyncStateQuery) All(ctx context.Context) ([]*SyncState, error) {
	if err := ssq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	return ssq.sqlAll(ctx)
}

// AllX is like All, but panics if an error occurs.
func (ssq *SyncStateQuery) AllX(ctx context.Context) []*SyncState {
	nodes, err := ssq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of SyncState IDs.
func (ssq *SyncStateQuery) IDs(ctx context.Context) ([]string, error) {
	var ids []string
	if err := ssq.Select(syncstate.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (ssq *SyncStateQuery) IDsX(ctx context.Context) []string {
	ids, err := ssq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (ssq *SyncStateQuery) Count(ctx context.Context) (int, error) {
	if err := ssq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return ssq.sqlCount(ctx)
}

// CountX is like Count, but panics if an error occurs.
func (ssq *SyncStateQuery) CountX(ctx context.Context) int {
	count, err := ssq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (ssq *SyncStateQuery) Exist(ctx context.Context) (bool, error) {
	if err := ssq.prepareQuery(ctx); err != nil {
		return false, err
	}
	return ssq.sqlExist(ctx)
}

// ExistX is like Exist, but panics if an error occurs.
func (ssq *SyncStateQuery) ExistX(ctx context.Context) bool {
	exist, err := ssq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the SyncStateQuery builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (ssq *SyncStateQuery) Clone() *SyncStateQuery {
	if ssq == nil {
		return nil
	}
	return &SyncStateQuery{
		config:     ssq.config,
		limit:      ssq.limit,
		offset:     ssq.offset,
		order:      append([]OrderFunc{}, ssq.order...),
		predicates: append([]predicate.SyncState{}, ssq.predicates...),
		// clone intermediate query.
		sql:  ssq.sql.Clone(),
		path: ssq.path,
	}
}

// GroupBy is used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		StartBlock uint64 `json:"start_block,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.SyncState.Query().
//		GroupBy(syncstate.FieldStartBlock).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
//
func (ssq *SyncStateQuery) GroupBy(field string, fields ...string) *SyncStateGroupBy {
	group := &SyncStateGroupBy{config: ssq.config}
	group.fields = append([]string{field}, fields...)
	group.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := ssq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return ssq.sqlQuery(ctx), nil
	}
	return group
}

// Select allows the selection one or more fields/columns for the given query,
// instead of selecting all fields in the entity.
//
// Example:
//
//	var v []struct {
//		StartBlock uint64 `json:"start_block,omitempty"`
//	}
//
//	client.SyncState.Query().
//		Select(syncstate.FieldStartBlock).
//		Scan(ctx, &v)
//
func (ssq *SyncStateQuery) Select(fields ...string) *SyncStateSelect {
	ssq.fields = append(ssq.fields, fields...)
	return &SyncStateSelect{SyncStateQuery: ssq}
}

func (ssq *SyncStateQuery) prepareQuery(ctx context.Context) error {
	for _, f := range ssq.fields {
		if !syncstate.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
		}
	}
	if ssq.path != nil {
		prev, err := ssq.path(ctx)
		if err != nil {
			return err
		}
		ssq.sql = prev
	}
	return nil
}

func (ssq *SyncStateQuery) sqlAll(ctx context.Context) ([]*SyncState, error) {
	var (
		nodes = []*SyncState{}
		_spec = ssq.querySpec()
	)
	_spec.ScanValues = func(columns []string) ([]interface{}, error) {
		node := &SyncState{config: ssq.config}
		nodes = append(nodes, node)
		return node.scanValues(columns)
	}
	_spec.Assign = func(columns []string, values []interface{}) error {
		if len(nodes) == 0 {
			return fmt.Errorf("ent: Assign called without calling ScanValues")
		}
		node := nodes[len(nodes)-1]
		return node.assignValues(columns, values)
	}
	if err := sqlgraph.QueryNodes(ctx, ssq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}
	return nodes, nil
}

func (ssq *SyncStateQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := ssq.querySpec()
	_spec.Node.Columns = ssq.fields
	if len(ssq.fields) > 0 {
		_spec.Unique = ssq.unique != nil && *ssq.unique
	}
	return sqlgraph.CountNodes(ctx, ssq.driver, _spec)
}

func (ssq *SyncStateQuery) sqlExist(ctx context.Context) (bool, error) {
	n, err := ssq.sqlCount(ctx)
	if err != nil {
		return false, fmt.Errorf("ent: check existence: %w", err)
	}
	return n > 0, nil
}

func (ssq *SyncStateQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := &sqlgraph.QuerySpec{
		Node: &sqlgraph.NodeSpec{
			Table:   syncstate.Table,
			Columns: syncstate.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: syncstate.FieldID,
			},
		},
		From:   ssq.sql,
		Unique: true,
	}
	if unique := ssq.unique; unique != nil {
		_spec.Unique = *unique
	}
	if fields := ssq.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, syncstate.FieldID)
		for i := range fields {
			if fields[i] != syncstate.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, fields[i])
			}
		}
	}
	if ps := ssq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := ssq.limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := ssq.offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := ssq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (ssq *SyncStateQuery) sqlQuery(ctx context.Context) *sql.Selector {
	builder := sql.Dialect(ssq.driver.Dialect())
	t1 := builder.Table(syncstate.Table)
	columns := ssq.fields
	if len(columns) == 0 {
		columns = syncstate.Columns
	}
	selector := builder.Select(t1.Columns(columns...)...).From(t1)
	if ssq.sql != nil {
		selector = ssq.sql
		selector.Select(selector.Columns(columns...)...)
	}
	if ssq.unique != nil && *ssq.unique {
		selector.Distinct()
	}
	for _, p := range ssq.predicates {
		p(selector)
	}
	for _, p := range ssq.order {
		p(selector)
	}
	if offset := ssq.offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := ssq.limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// SyncStateGroupBy is the group-by builder for SyncState entities.
type SyncStateGroupBy struct {
	config
	fields []string
	fns    []AggregateFunc
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Aggregate adds the given aggregation functions to the group-by query.
func (ssgb *SyncStateGroupBy) Aggregate(fns ...AggregateFunc) *SyncStateGroupBy {
	ssgb.fns = append(ssgb.fns, fns...)
	return ssgb
}

// Scan applies the group-by query and scans the result into the given value.
func (ssgb *SyncStateGroupBy) Scan(ctx context.Context, v interface{}) error {
	query, err := ssgb.path(ctx)
	if err != nil {
		return err
	}
	ssgb.sql = query
	return ssgb.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (ssgb *SyncStateGroupBy) ScanX(ctx context.Context, v interface{}) {
	if err := ssgb.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from group-by.
// It is only allowed when executing a group-by query with one field.
func (ssgb *SyncStateGroupBy) Strings(ctx context.Context) ([]string, error) {
	if len(ssgb.fields) > 1 {
		return nil, errors.New("ent: SyncStateGroupBy.Strings is not achievable when grouping more than 1 field")
	}
	var v []string
	if err := ssgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (ssgb *SyncStateGroupBy) StringsX(ctx context.Context) []string {
	v, err := ssgb.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from a group-by query.
// It is only allowed when executing a group-by query with one field.
func (ssgb *SyncStateGroupBy) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = ssgb.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{syncstate.Label}
	default:
		err = fmt.Errorf("ent: SyncStateGroupBy.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (ssgb *SyncStateGroupBy) StringX(ctx context.Context) string {
	v, err := ssgb.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from group-by.
// It is only allowed when executing a group-by query with one field.
func (ssgb *SyncStateGroupBy) Ints(ctx context.Context) ([]int, error) {
	if len(ssgb.fields) > 1 {
		return nil, errors.New("ent: SyncStateGroupBy.Ints is not achievable when grouping more than 1 field")
	}
	var v []int
	if err := ssgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (ssgb *SyncStateGroupBy) IntsX(ctx context.Context) []int {
	v, err := ssgb.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from a group-by query.
// It is only allowed when executing a group-by query with one field.
func (ssgb *SyncStateGroupBy) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = ssgb.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{syncstate.Label}
	default:
		err = fmt.Errorf("ent: SyncStateGroupBy.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (ssgb *SyncStateGroupBy) IntX(ctx context.Context) int {
	v, err := ssgb.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from group-by.
// It is only allowed when executing a group-by query with one field.
func (ssgb *SyncStateGroupBy) Float64s(ctx context.Context) ([]float64, error) {
	if len(ssgb.fields) > 1 {
		return nil, errors.New("ent: SyncStateGroupBy.Float64s is not achievable when grouping more than 1 field")
	}
	var v []float64
	if err := ssgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (ssgb *SyncStateGroupBy) Float64sX(ctx context.Context) []float64 {
	v, err := ssgb.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from a group-by query.
// It is only allowed when executing a group-by query with one field.
func (ssgb *SyncStateGroupBy) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = ssgb.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{syncstate.Label}
	default:
		err = fmt.Errorf("ent: SyncStateGroupBy.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (ssgb *SyncStateGroupBy) Float64X(ctx context.Context) float64 {
	v, err := ssgb.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from group-by.
// It is only allowed when executing a group-by query with one field.
func (ssgb *SyncStateGroupBy) Bools(ctx context.Context) ([]bool, error) {
	if len(ssgb.fields) > 1 {
		return nil, errors.New("ent: SyncStateGroupBy.Bools is not achievable when grouping more than 1 field")
	}
	var v []bool
	if err := ssgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (ssgb *SyncStateGroupBy) BoolsX(ctx context.Context) []bool {
	v, err := ssgb.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from a group-by query.
// It is only allowed when executing a group-by query with one field.
func (ssgb *SyncStateGroupBy) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = ssgb.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{syncstate.Label}
	default:
		err = fmt.Errorf("ent: SyncStateGroupBy.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (ssgb *SyncStateGroupBy) BoolX(ctx context.Context) bool {
	v, err := ssgb.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (ssgb *SyncStateGroupBy) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range ssgb.fields {
		if !syncstate.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for group-by", f)}
		}
	}
	selector := ssgb.sqlQuery()
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := ssgb.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (ssgb *SyncStateGroupBy) sqlQuery() *sql.Selector {
	selector := ssgb.sql.Select()
	aggregation := make([]string, 0, len(ssgb.fns))
	for _, fn := range ssgb.fns {
		aggregation = append(aggregation, fn(selector))
	}
	// If no columns were selected in a custom aggregation function, the default
	// selection is the fields used for "group-by", and the aggregation functions.
	if len(selector.SelectedColumns()) == 0 {
		columns := make([]string, 0, len(ssgb.fields)+len(ssgb.fns))
		for _, f := range ssgb.fields {
			columns = append(columns, selector.C(f))
		}
		columns = append(columns, aggregation...)
		selector.Select(columns...)
	}
	return selector.GroupBy(selector.Columns(ssgb.fields...)...)
}

// SyncStateSelect is the builder for selecting fields of SyncState entities.
type SyncStateSelect struct {
	*SyncStateQuery
	// intermediate query (i.e. traversal path).
	sql *sql.Selector
}

// Scan applies the selector query and scans the result into the given value.
func (sss *SyncStateSelect) Scan(ctx context.Context, v interface{}) error {
	if err := sss.prepareQuery(ctx); err != nil {
		return err
	}
	sss.sql = sss.SyncStateQuery.sqlQuery(ctx)
	return sss.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (sss *SyncStateSelect) ScanX(ctx context.Context, v interface{}) {
	if err := sss.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from a selector. It is only allowed when selecting one field.
func (sss *SyncStateSelect) Strings(ctx context.Context) ([]string, error) {
	if len(sss.fields) > 1 {
		return nil, errors.New("ent: SyncStateSelect.Strings is not achievable when selecting more than 1 field")
	}
	var v []string
	if err := sss.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (sss *SyncStateSelect) StringsX(ctx context.Context) []string {
	v, err := sss.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from a selector. It is only allowed when selecting one field.
func (sss *SyncStateSelect) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = sss.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{syncstate.Label}
	default:
		err = fmt.Errorf("ent: SyncStateSelect.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (sss *SyncStateSelect) StringX(ctx context.Context) string {
	v, err := sss.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from a selector. It is only allowed when selecting one field.
func (sss *SyncStateSelect) Ints(ctx context.Context) ([]int, error) {
	if len(sss.fields) > 1 {
		return nil, errors.New("ent: SyncStateSelect.Ints is not achievable when selecting more than 1 field")
	}
	var v []int
	if err := sss.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (sss *SyncStateSelect) IntsX(ctx context.Context) []int {
	v, err := sss.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from a selector. It is only allowed when selecting one field.
func (sss *SyncStateSelect) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = sss.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{syncstate.Label}
	default:
		err = fmt.Errorf("ent: SyncStateSelect.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (sss *SyncStateSelect) IntX(ctx context.Context) int {
	v, err := sss.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from a selector. It is only allowed when selecting one field.
func (sss *SyncStateSelect) Float64s(ctx context.Context) ([]float64, error) {
	if len(sss.fields) > 1 {
		return nil, errors.New("ent: SyncStateSelect.Float64s is not achievable when selecting more than 1 field")
	}
	var v []float64
	if err := sss.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (sss *SyncStateSelect) Float64sX(ctx context.Context) []float64 {
	v, err := sss.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from a selector. It is only allowed when selecting one field.
func (sss *SyncStateSelect) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = sss.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{syncstate.Label}
	default:
		err = fmt.Errorf("ent: SyncStateSelect.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (sss *SyncStateSelect) Float64X(ctx context.Context) float64 {
	v, err := sss.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from a selector. It is only allowed when selecting one field.
func (sss *SyncStateSelect) Bools(ctx context.Context) ([]bool, error) {
	if len(sss.fields) > 1 {
		return nil, errors.New("ent: SyncStateSelect.Bools is not achievable when selecting more than 1 field")
	}
	var v []bool
	if err := sss.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (sss *SyncStateSelect) BoolsX(ctx context.Context) []bool {
	v, err := sss.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from a selector. It is only allowed when selecting one field.
func (sss *SyncStateSelect) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = sss.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{syncstate.Label}
	default:
		err = fmt.Errorf("ent: SyncStateSelect.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (sss *SyncStateSelect) BoolX(ctx context.Context) bool {
	v, err := sss.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (sss *SyncStateSelect) sqlScan(ctx context.Context, v interface{}) error {
	rows := &sql.Rows{}
	query, args := sss.sql.Query()
	if err := sss.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}
