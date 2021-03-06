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
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/gamehustlerquest"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/predicate"
)

// GameHustlerQuestQuery is the builder for querying GameHustlerQuest entities.
type GameHustlerQuestQuery struct {
	config
	limit      *int
	offset     *int
	unique     *bool
	order      []OrderFunc
	fields     []string
	predicates []predicate.GameHustlerQuest
	// eager-loading edges.
	withHustler *GameHustlerQuery
	withFKs     bool
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the GameHustlerQuestQuery builder.
func (ghqq *GameHustlerQuestQuery) Where(ps ...predicate.GameHustlerQuest) *GameHustlerQuestQuery {
	ghqq.predicates = append(ghqq.predicates, ps...)
	return ghqq
}

// Limit adds a limit step to the query.
func (ghqq *GameHustlerQuestQuery) Limit(limit int) *GameHustlerQuestQuery {
	ghqq.limit = &limit
	return ghqq
}

// Offset adds an offset step to the query.
func (ghqq *GameHustlerQuestQuery) Offset(offset int) *GameHustlerQuestQuery {
	ghqq.offset = &offset
	return ghqq
}

// Unique configures the query builder to filter duplicate records on query.
// By default, unique is set to true, and can be disabled using this method.
func (ghqq *GameHustlerQuestQuery) Unique(unique bool) *GameHustlerQuestQuery {
	ghqq.unique = &unique
	return ghqq
}

// Order adds an order step to the query.
func (ghqq *GameHustlerQuestQuery) Order(o ...OrderFunc) *GameHustlerQuestQuery {
	ghqq.order = append(ghqq.order, o...)
	return ghqq
}

// QueryHustler chains the current query on the "hustler" edge.
func (ghqq *GameHustlerQuestQuery) QueryHustler() *GameHustlerQuery {
	query := &GameHustlerQuery{config: ghqq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := ghqq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := ghqq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(gamehustlerquest.Table, gamehustlerquest.FieldID, selector),
			sqlgraph.To(gamehustler.Table, gamehustler.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, gamehustlerquest.HustlerTable, gamehustlerquest.HustlerColumn),
		)
		fromU = sqlgraph.SetNeighbors(ghqq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first GameHustlerQuest entity from the query.
// Returns a *NotFoundError when no GameHustlerQuest was found.
func (ghqq *GameHustlerQuestQuery) First(ctx context.Context) (*GameHustlerQuest, error) {
	nodes, err := ghqq.Limit(1).All(ctx)
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{gamehustlerquest.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (ghqq *GameHustlerQuestQuery) FirstX(ctx context.Context) *GameHustlerQuest {
	node, err := ghqq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first GameHustlerQuest ID from the query.
// Returns a *NotFoundError when no GameHustlerQuest ID was found.
func (ghqq *GameHustlerQuestQuery) FirstID(ctx context.Context) (id string, err error) {
	var ids []string
	if ids, err = ghqq.Limit(1).IDs(ctx); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{gamehustlerquest.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (ghqq *GameHustlerQuestQuery) FirstIDX(ctx context.Context) string {
	id, err := ghqq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns a single GameHustlerQuest entity found by the query, ensuring it only returns one.
// Returns a *NotSingularError when more than one GameHustlerQuest entity is found.
// Returns a *NotFoundError when no GameHustlerQuest entities are found.
func (ghqq *GameHustlerQuestQuery) Only(ctx context.Context) (*GameHustlerQuest, error) {
	nodes, err := ghqq.Limit(2).All(ctx)
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{gamehustlerquest.Label}
	default:
		return nil, &NotSingularError{gamehustlerquest.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (ghqq *GameHustlerQuestQuery) OnlyX(ctx context.Context) *GameHustlerQuest {
	node, err := ghqq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID is like Only, but returns the only GameHustlerQuest ID in the query.
// Returns a *NotSingularError when more than one GameHustlerQuest ID is found.
// Returns a *NotFoundError when no entities are found.
func (ghqq *GameHustlerQuestQuery) OnlyID(ctx context.Context) (id string, err error) {
	var ids []string
	if ids, err = ghqq.Limit(2).IDs(ctx); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{gamehustlerquest.Label}
	default:
		err = &NotSingularError{gamehustlerquest.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (ghqq *GameHustlerQuestQuery) OnlyIDX(ctx context.Context) string {
	id, err := ghqq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of GameHustlerQuests.
func (ghqq *GameHustlerQuestQuery) All(ctx context.Context) ([]*GameHustlerQuest, error) {
	if err := ghqq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	return ghqq.sqlAll(ctx)
}

// AllX is like All, but panics if an error occurs.
func (ghqq *GameHustlerQuestQuery) AllX(ctx context.Context) []*GameHustlerQuest {
	nodes, err := ghqq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of GameHustlerQuest IDs.
func (ghqq *GameHustlerQuestQuery) IDs(ctx context.Context) ([]string, error) {
	var ids []string
	if err := ghqq.Select(gamehustlerquest.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (ghqq *GameHustlerQuestQuery) IDsX(ctx context.Context) []string {
	ids, err := ghqq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (ghqq *GameHustlerQuestQuery) Count(ctx context.Context) (int, error) {
	if err := ghqq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return ghqq.sqlCount(ctx)
}

// CountX is like Count, but panics if an error occurs.
func (ghqq *GameHustlerQuestQuery) CountX(ctx context.Context) int {
	count, err := ghqq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (ghqq *GameHustlerQuestQuery) Exist(ctx context.Context) (bool, error) {
	if err := ghqq.prepareQuery(ctx); err != nil {
		return false, err
	}
	return ghqq.sqlExist(ctx)
}

// ExistX is like Exist, but panics if an error occurs.
func (ghqq *GameHustlerQuestQuery) ExistX(ctx context.Context) bool {
	exist, err := ghqq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the GameHustlerQuestQuery builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (ghqq *GameHustlerQuestQuery) Clone() *GameHustlerQuestQuery {
	if ghqq == nil {
		return nil
	}
	return &GameHustlerQuestQuery{
		config:      ghqq.config,
		limit:       ghqq.limit,
		offset:      ghqq.offset,
		order:       append([]OrderFunc{}, ghqq.order...),
		predicates:  append([]predicate.GameHustlerQuest{}, ghqq.predicates...),
		withHustler: ghqq.withHustler.Clone(),
		// clone intermediate query.
		sql:    ghqq.sql.Clone(),
		path:   ghqq.path,
		unique: ghqq.unique,
	}
}

// WithHustler tells the query-builder to eager-load the nodes that are connected to
// the "hustler" edge. The optional arguments are used to configure the query builder of the edge.
func (ghqq *GameHustlerQuestQuery) WithHustler(opts ...func(*GameHustlerQuery)) *GameHustlerQuestQuery {
	query := &GameHustlerQuery{config: ghqq.config}
	for _, opt := range opts {
		opt(query)
	}
	ghqq.withHustler = query
	return ghqq
}

// GroupBy is used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		Quest string `json:"quest,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.GameHustlerQuest.Query().
//		GroupBy(gamehustlerquest.FieldQuest).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
//
func (ghqq *GameHustlerQuestQuery) GroupBy(field string, fields ...string) *GameHustlerQuestGroupBy {
	group := &GameHustlerQuestGroupBy{config: ghqq.config}
	group.fields = append([]string{field}, fields...)
	group.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := ghqq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return ghqq.sqlQuery(ctx), nil
	}
	return group
}

// Select allows the selection one or more fields/columns for the given query,
// instead of selecting all fields in the entity.
//
// Example:
//
//	var v []struct {
//		Quest string `json:"quest,omitempty"`
//	}
//
//	client.GameHustlerQuest.Query().
//		Select(gamehustlerquest.FieldQuest).
//		Scan(ctx, &v)
//
func (ghqq *GameHustlerQuestQuery) Select(fields ...string) *GameHustlerQuestSelect {
	ghqq.fields = append(ghqq.fields, fields...)
	return &GameHustlerQuestSelect{GameHustlerQuestQuery: ghqq}
}

func (ghqq *GameHustlerQuestQuery) prepareQuery(ctx context.Context) error {
	for _, f := range ghqq.fields {
		if !gamehustlerquest.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
		}
	}
	if ghqq.path != nil {
		prev, err := ghqq.path(ctx)
		if err != nil {
			return err
		}
		ghqq.sql = prev
	}
	return nil
}

func (ghqq *GameHustlerQuestQuery) sqlAll(ctx context.Context) ([]*GameHustlerQuest, error) {
	var (
		nodes       = []*GameHustlerQuest{}
		withFKs     = ghqq.withFKs
		_spec       = ghqq.querySpec()
		loadedTypes = [1]bool{
			ghqq.withHustler != nil,
		}
	)
	if ghqq.withHustler != nil {
		withFKs = true
	}
	if withFKs {
		_spec.Node.Columns = append(_spec.Node.Columns, gamehustlerquest.ForeignKeys...)
	}
	_spec.ScanValues = func(columns []string) ([]interface{}, error) {
		node := &GameHustlerQuest{config: ghqq.config}
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
	if err := sqlgraph.QueryNodes(ctx, ghqq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}

	if query := ghqq.withHustler; query != nil {
		ids := make([]string, 0, len(nodes))
		nodeids := make(map[string][]*GameHustlerQuest)
		for i := range nodes {
			if nodes[i].game_hustler_quests == nil {
				continue
			}
			fk := *nodes[i].game_hustler_quests
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
				return nil, fmt.Errorf(`unexpected foreign-key "game_hustler_quests" returned %v`, n.ID)
			}
			for i := range nodes {
				nodes[i].Edges.Hustler = n
			}
		}
	}

	return nodes, nil
}

func (ghqq *GameHustlerQuestQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := ghqq.querySpec()
	_spec.Node.Columns = ghqq.fields
	if len(ghqq.fields) > 0 {
		_spec.Unique = ghqq.unique != nil && *ghqq.unique
	}
	return sqlgraph.CountNodes(ctx, ghqq.driver, _spec)
}

func (ghqq *GameHustlerQuestQuery) sqlExist(ctx context.Context) (bool, error) {
	n, err := ghqq.sqlCount(ctx)
	if err != nil {
		return false, fmt.Errorf("ent: check existence: %w", err)
	}
	return n > 0, nil
}

func (ghqq *GameHustlerQuestQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := &sqlgraph.QuerySpec{
		Node: &sqlgraph.NodeSpec{
			Table:   gamehustlerquest.Table,
			Columns: gamehustlerquest.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: gamehustlerquest.FieldID,
			},
		},
		From:   ghqq.sql,
		Unique: true,
	}
	if unique := ghqq.unique; unique != nil {
		_spec.Unique = *unique
	}
	if fields := ghqq.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, gamehustlerquest.FieldID)
		for i := range fields {
			if fields[i] != gamehustlerquest.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, fields[i])
			}
		}
	}
	if ps := ghqq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := ghqq.limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := ghqq.offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := ghqq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (ghqq *GameHustlerQuestQuery) sqlQuery(ctx context.Context) *sql.Selector {
	builder := sql.Dialect(ghqq.driver.Dialect())
	t1 := builder.Table(gamehustlerquest.Table)
	columns := ghqq.fields
	if len(columns) == 0 {
		columns = gamehustlerquest.Columns
	}
	selector := builder.Select(t1.Columns(columns...)...).From(t1)
	if ghqq.sql != nil {
		selector = ghqq.sql
		selector.Select(selector.Columns(columns...)...)
	}
	if ghqq.unique != nil && *ghqq.unique {
		selector.Distinct()
	}
	for _, p := range ghqq.predicates {
		p(selector)
	}
	for _, p := range ghqq.order {
		p(selector)
	}
	if offset := ghqq.offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := ghqq.limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// GameHustlerQuestGroupBy is the group-by builder for GameHustlerQuest entities.
type GameHustlerQuestGroupBy struct {
	config
	fields []string
	fns    []AggregateFunc
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Aggregate adds the given aggregation functions to the group-by query.
func (ghqgb *GameHustlerQuestGroupBy) Aggregate(fns ...AggregateFunc) *GameHustlerQuestGroupBy {
	ghqgb.fns = append(ghqgb.fns, fns...)
	return ghqgb
}

// Scan applies the group-by query and scans the result into the given value.
func (ghqgb *GameHustlerQuestGroupBy) Scan(ctx context.Context, v interface{}) error {
	query, err := ghqgb.path(ctx)
	if err != nil {
		return err
	}
	ghqgb.sql = query
	return ghqgb.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (ghqgb *GameHustlerQuestGroupBy) ScanX(ctx context.Context, v interface{}) {
	if err := ghqgb.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from group-by.
// It is only allowed when executing a group-by query with one field.
func (ghqgb *GameHustlerQuestGroupBy) Strings(ctx context.Context) ([]string, error) {
	if len(ghqgb.fields) > 1 {
		return nil, errors.New("ent: GameHustlerQuestGroupBy.Strings is not achievable when grouping more than 1 field")
	}
	var v []string
	if err := ghqgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (ghqgb *GameHustlerQuestGroupBy) StringsX(ctx context.Context) []string {
	v, err := ghqgb.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from a group-by query.
// It is only allowed when executing a group-by query with one field.
func (ghqgb *GameHustlerQuestGroupBy) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = ghqgb.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{gamehustlerquest.Label}
	default:
		err = fmt.Errorf("ent: GameHustlerQuestGroupBy.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (ghqgb *GameHustlerQuestGroupBy) StringX(ctx context.Context) string {
	v, err := ghqgb.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from group-by.
// It is only allowed when executing a group-by query with one field.
func (ghqgb *GameHustlerQuestGroupBy) Ints(ctx context.Context) ([]int, error) {
	if len(ghqgb.fields) > 1 {
		return nil, errors.New("ent: GameHustlerQuestGroupBy.Ints is not achievable when grouping more than 1 field")
	}
	var v []int
	if err := ghqgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (ghqgb *GameHustlerQuestGroupBy) IntsX(ctx context.Context) []int {
	v, err := ghqgb.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from a group-by query.
// It is only allowed when executing a group-by query with one field.
func (ghqgb *GameHustlerQuestGroupBy) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = ghqgb.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{gamehustlerquest.Label}
	default:
		err = fmt.Errorf("ent: GameHustlerQuestGroupBy.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (ghqgb *GameHustlerQuestGroupBy) IntX(ctx context.Context) int {
	v, err := ghqgb.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from group-by.
// It is only allowed when executing a group-by query with one field.
func (ghqgb *GameHustlerQuestGroupBy) Float64s(ctx context.Context) ([]float64, error) {
	if len(ghqgb.fields) > 1 {
		return nil, errors.New("ent: GameHustlerQuestGroupBy.Float64s is not achievable when grouping more than 1 field")
	}
	var v []float64
	if err := ghqgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (ghqgb *GameHustlerQuestGroupBy) Float64sX(ctx context.Context) []float64 {
	v, err := ghqgb.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from a group-by query.
// It is only allowed when executing a group-by query with one field.
func (ghqgb *GameHustlerQuestGroupBy) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = ghqgb.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{gamehustlerquest.Label}
	default:
		err = fmt.Errorf("ent: GameHustlerQuestGroupBy.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (ghqgb *GameHustlerQuestGroupBy) Float64X(ctx context.Context) float64 {
	v, err := ghqgb.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from group-by.
// It is only allowed when executing a group-by query with one field.
func (ghqgb *GameHustlerQuestGroupBy) Bools(ctx context.Context) ([]bool, error) {
	if len(ghqgb.fields) > 1 {
		return nil, errors.New("ent: GameHustlerQuestGroupBy.Bools is not achievable when grouping more than 1 field")
	}
	var v []bool
	if err := ghqgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (ghqgb *GameHustlerQuestGroupBy) BoolsX(ctx context.Context) []bool {
	v, err := ghqgb.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from a group-by query.
// It is only allowed when executing a group-by query with one field.
func (ghqgb *GameHustlerQuestGroupBy) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = ghqgb.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{gamehustlerquest.Label}
	default:
		err = fmt.Errorf("ent: GameHustlerQuestGroupBy.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (ghqgb *GameHustlerQuestGroupBy) BoolX(ctx context.Context) bool {
	v, err := ghqgb.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (ghqgb *GameHustlerQuestGroupBy) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range ghqgb.fields {
		if !gamehustlerquest.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for group-by", f)}
		}
	}
	selector := ghqgb.sqlQuery()
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := ghqgb.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (ghqgb *GameHustlerQuestGroupBy) sqlQuery() *sql.Selector {
	selector := ghqgb.sql.Select()
	aggregation := make([]string, 0, len(ghqgb.fns))
	for _, fn := range ghqgb.fns {
		aggregation = append(aggregation, fn(selector))
	}
	// If no columns were selected in a custom aggregation function, the default
	// selection is the fields used for "group-by", and the aggregation functions.
	if len(selector.SelectedColumns()) == 0 {
		columns := make([]string, 0, len(ghqgb.fields)+len(ghqgb.fns))
		for _, f := range ghqgb.fields {
			columns = append(columns, selector.C(f))
		}
		columns = append(columns, aggregation...)
		selector.Select(columns...)
	}
	return selector.GroupBy(selector.Columns(ghqgb.fields...)...)
}

// GameHustlerQuestSelect is the builder for selecting fields of GameHustlerQuest entities.
type GameHustlerQuestSelect struct {
	*GameHustlerQuestQuery
	// intermediate query (i.e. traversal path).
	sql *sql.Selector
}

// Scan applies the selector query and scans the result into the given value.
func (ghqs *GameHustlerQuestSelect) Scan(ctx context.Context, v interface{}) error {
	if err := ghqs.prepareQuery(ctx); err != nil {
		return err
	}
	ghqs.sql = ghqs.GameHustlerQuestQuery.sqlQuery(ctx)
	return ghqs.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (ghqs *GameHustlerQuestSelect) ScanX(ctx context.Context, v interface{}) {
	if err := ghqs.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from a selector. It is only allowed when selecting one field.
func (ghqs *GameHustlerQuestSelect) Strings(ctx context.Context) ([]string, error) {
	if len(ghqs.fields) > 1 {
		return nil, errors.New("ent: GameHustlerQuestSelect.Strings is not achievable when selecting more than 1 field")
	}
	var v []string
	if err := ghqs.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (ghqs *GameHustlerQuestSelect) StringsX(ctx context.Context) []string {
	v, err := ghqs.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from a selector. It is only allowed when selecting one field.
func (ghqs *GameHustlerQuestSelect) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = ghqs.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{gamehustlerquest.Label}
	default:
		err = fmt.Errorf("ent: GameHustlerQuestSelect.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (ghqs *GameHustlerQuestSelect) StringX(ctx context.Context) string {
	v, err := ghqs.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from a selector. It is only allowed when selecting one field.
func (ghqs *GameHustlerQuestSelect) Ints(ctx context.Context) ([]int, error) {
	if len(ghqs.fields) > 1 {
		return nil, errors.New("ent: GameHustlerQuestSelect.Ints is not achievable when selecting more than 1 field")
	}
	var v []int
	if err := ghqs.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (ghqs *GameHustlerQuestSelect) IntsX(ctx context.Context) []int {
	v, err := ghqs.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from a selector. It is only allowed when selecting one field.
func (ghqs *GameHustlerQuestSelect) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = ghqs.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{gamehustlerquest.Label}
	default:
		err = fmt.Errorf("ent: GameHustlerQuestSelect.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (ghqs *GameHustlerQuestSelect) IntX(ctx context.Context) int {
	v, err := ghqs.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from a selector. It is only allowed when selecting one field.
func (ghqs *GameHustlerQuestSelect) Float64s(ctx context.Context) ([]float64, error) {
	if len(ghqs.fields) > 1 {
		return nil, errors.New("ent: GameHustlerQuestSelect.Float64s is not achievable when selecting more than 1 field")
	}
	var v []float64
	if err := ghqs.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (ghqs *GameHustlerQuestSelect) Float64sX(ctx context.Context) []float64 {
	v, err := ghqs.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from a selector. It is only allowed when selecting one field.
func (ghqs *GameHustlerQuestSelect) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = ghqs.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{gamehustlerquest.Label}
	default:
		err = fmt.Errorf("ent: GameHustlerQuestSelect.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (ghqs *GameHustlerQuestSelect) Float64X(ctx context.Context) float64 {
	v, err := ghqs.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from a selector. It is only allowed when selecting one field.
func (ghqs *GameHustlerQuestSelect) Bools(ctx context.Context) ([]bool, error) {
	if len(ghqs.fields) > 1 {
		return nil, errors.New("ent: GameHustlerQuestSelect.Bools is not achievable when selecting more than 1 field")
	}
	var v []bool
	if err := ghqs.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (ghqs *GameHustlerQuestSelect) BoolsX(ctx context.Context) []bool {
	v, err := ghqs.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from a selector. It is only allowed when selecting one field.
func (ghqs *GameHustlerQuestSelect) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = ghqs.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{gamehustlerquest.Label}
	default:
		err = fmt.Errorf("ent: GameHustlerQuestSelect.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (ghqs *GameHustlerQuestSelect) BoolX(ctx context.Context) bool {
	v, err := ghqs.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (ghqs *GameHustlerQuestSelect) sqlScan(ctx context.Context, v interface{}) error {
	rows := &sql.Rows{}
	query, args := ghqs.sql.Query()
	if err := ghqs.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}
