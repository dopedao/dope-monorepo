// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"database/sql/driver"
	"errors"
	"fmt"
	"math"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/bodypart"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/predicate"
)

// BodyPartQuery is the builder for querying BodyPart entities.
type BodyPartQuery struct {
	config
	limit      *int
	offset     *int
	unique     *bool
	order      []OrderFunc
	fields     []string
	predicates []predicate.BodyPart
	// eager-loading edges.
	withHustlerBodies *HustlerQuery
	withHustlerHairs  *HustlerQuery
	withHustlerBeards *HustlerQuery
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the BodyPartQuery builder.
func (bpq *BodyPartQuery) Where(ps ...predicate.BodyPart) *BodyPartQuery {
	bpq.predicates = append(bpq.predicates, ps...)
	return bpq
}

// Limit adds a limit step to the query.
func (bpq *BodyPartQuery) Limit(limit int) *BodyPartQuery {
	bpq.limit = &limit
	return bpq
}

// Offset adds an offset step to the query.
func (bpq *BodyPartQuery) Offset(offset int) *BodyPartQuery {
	bpq.offset = &offset
	return bpq
}

// Unique configures the query builder to filter duplicate records on query.
// By default, unique is set to true, and can be disabled using this method.
func (bpq *BodyPartQuery) Unique(unique bool) *BodyPartQuery {
	bpq.unique = &unique
	return bpq
}

// Order adds an order step to the query.
func (bpq *BodyPartQuery) Order(o ...OrderFunc) *BodyPartQuery {
	bpq.order = append(bpq.order, o...)
	return bpq
}

// QueryHustlerBodies chains the current query on the "hustler_bodies" edge.
func (bpq *BodyPartQuery) QueryHustlerBodies() *HustlerQuery {
	query := &HustlerQuery{config: bpq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := bpq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := bpq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(bodypart.Table, bodypart.FieldID, selector),
			sqlgraph.To(hustler.Table, hustler.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, bodypart.HustlerBodiesTable, bodypart.HustlerBodiesColumn),
		)
		fromU = sqlgraph.SetNeighbors(bpq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryHustlerHairs chains the current query on the "hustler_hairs" edge.
func (bpq *BodyPartQuery) QueryHustlerHairs() *HustlerQuery {
	query := &HustlerQuery{config: bpq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := bpq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := bpq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(bodypart.Table, bodypart.FieldID, selector),
			sqlgraph.To(hustler.Table, hustler.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, bodypart.HustlerHairsTable, bodypart.HustlerHairsColumn),
		)
		fromU = sqlgraph.SetNeighbors(bpq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryHustlerBeards chains the current query on the "hustler_beards" edge.
func (bpq *BodyPartQuery) QueryHustlerBeards() *HustlerQuery {
	query := &HustlerQuery{config: bpq.config}
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := bpq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := bpq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(bodypart.Table, bodypart.FieldID, selector),
			sqlgraph.To(hustler.Table, hustler.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, bodypart.HustlerBeardsTable, bodypart.HustlerBeardsColumn),
		)
		fromU = sqlgraph.SetNeighbors(bpq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first BodyPart entity from the query.
// Returns a *NotFoundError when no BodyPart was found.
func (bpq *BodyPartQuery) First(ctx context.Context) (*BodyPart, error) {
	nodes, err := bpq.Limit(1).All(ctx)
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{bodypart.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (bpq *BodyPartQuery) FirstX(ctx context.Context) *BodyPart {
	node, err := bpq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first BodyPart ID from the query.
// Returns a *NotFoundError when no BodyPart ID was found.
func (bpq *BodyPartQuery) FirstID(ctx context.Context) (id string, err error) {
	var ids []string
	if ids, err = bpq.Limit(1).IDs(ctx); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{bodypart.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (bpq *BodyPartQuery) FirstIDX(ctx context.Context) string {
	id, err := bpq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns a single BodyPart entity found by the query, ensuring it only returns one.
// Returns a *NotSingularError when more than one BodyPart entity is found.
// Returns a *NotFoundError when no BodyPart entities are found.
func (bpq *BodyPartQuery) Only(ctx context.Context) (*BodyPart, error) {
	nodes, err := bpq.Limit(2).All(ctx)
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{bodypart.Label}
	default:
		return nil, &NotSingularError{bodypart.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (bpq *BodyPartQuery) OnlyX(ctx context.Context) *BodyPart {
	node, err := bpq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID is like Only, but returns the only BodyPart ID in the query.
// Returns a *NotSingularError when more than one BodyPart ID is found.
// Returns a *NotFoundError when no entities are found.
func (bpq *BodyPartQuery) OnlyID(ctx context.Context) (id string, err error) {
	var ids []string
	if ids, err = bpq.Limit(2).IDs(ctx); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{bodypart.Label}
	default:
		err = &NotSingularError{bodypart.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (bpq *BodyPartQuery) OnlyIDX(ctx context.Context) string {
	id, err := bpq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of BodyParts.
func (bpq *BodyPartQuery) All(ctx context.Context) ([]*BodyPart, error) {
	if err := bpq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	return bpq.sqlAll(ctx)
}

// AllX is like All, but panics if an error occurs.
func (bpq *BodyPartQuery) AllX(ctx context.Context) []*BodyPart {
	nodes, err := bpq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of BodyPart IDs.
func (bpq *BodyPartQuery) IDs(ctx context.Context) ([]string, error) {
	var ids []string
	if err := bpq.Select(bodypart.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (bpq *BodyPartQuery) IDsX(ctx context.Context) []string {
	ids, err := bpq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (bpq *BodyPartQuery) Count(ctx context.Context) (int, error) {
	if err := bpq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return bpq.sqlCount(ctx)
}

// CountX is like Count, but panics if an error occurs.
func (bpq *BodyPartQuery) CountX(ctx context.Context) int {
	count, err := bpq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (bpq *BodyPartQuery) Exist(ctx context.Context) (bool, error) {
	if err := bpq.prepareQuery(ctx); err != nil {
		return false, err
	}
	return bpq.sqlExist(ctx)
}

// ExistX is like Exist, but panics if an error occurs.
func (bpq *BodyPartQuery) ExistX(ctx context.Context) bool {
	exist, err := bpq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the BodyPartQuery builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (bpq *BodyPartQuery) Clone() *BodyPartQuery {
	if bpq == nil {
		return nil
	}
	return &BodyPartQuery{
		config:            bpq.config,
		limit:             bpq.limit,
		offset:            bpq.offset,
		order:             append([]OrderFunc{}, bpq.order...),
		predicates:        append([]predicate.BodyPart{}, bpq.predicates...),
		withHustlerBodies: bpq.withHustlerBodies.Clone(),
		withHustlerHairs:  bpq.withHustlerHairs.Clone(),
		withHustlerBeards: bpq.withHustlerBeards.Clone(),
		// clone intermediate query.
		sql:    bpq.sql.Clone(),
		path:   bpq.path,
		unique: bpq.unique,
	}
}

// WithHustlerBodies tells the query-builder to eager-load the nodes that are connected to
// the "hustler_bodies" edge. The optional arguments are used to configure the query builder of the edge.
func (bpq *BodyPartQuery) WithHustlerBodies(opts ...func(*HustlerQuery)) *BodyPartQuery {
	query := &HustlerQuery{config: bpq.config}
	for _, opt := range opts {
		opt(query)
	}
	bpq.withHustlerBodies = query
	return bpq
}

// WithHustlerHairs tells the query-builder to eager-load the nodes that are connected to
// the "hustler_hairs" edge. The optional arguments are used to configure the query builder of the edge.
func (bpq *BodyPartQuery) WithHustlerHairs(opts ...func(*HustlerQuery)) *BodyPartQuery {
	query := &HustlerQuery{config: bpq.config}
	for _, opt := range opts {
		opt(query)
	}
	bpq.withHustlerHairs = query
	return bpq
}

// WithHustlerBeards tells the query-builder to eager-load the nodes that are connected to
// the "hustler_beards" edge. The optional arguments are used to configure the query builder of the edge.
func (bpq *BodyPartQuery) WithHustlerBeards(opts ...func(*HustlerQuery)) *BodyPartQuery {
	query := &HustlerQuery{config: bpq.config}
	for _, opt := range opts {
		opt(query)
	}
	bpq.withHustlerBeards = query
	return bpq
}

// GroupBy is used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		Type bodypart.Type `json:"type,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.BodyPart.Query().
//		GroupBy(bodypart.FieldType).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
//
func (bpq *BodyPartQuery) GroupBy(field string, fields ...string) *BodyPartGroupBy {
	group := &BodyPartGroupBy{config: bpq.config}
	group.fields = append([]string{field}, fields...)
	group.path = func(ctx context.Context) (prev *sql.Selector, err error) {
		if err := bpq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		return bpq.sqlQuery(ctx), nil
	}
	return group
}

// Select allows the selection one or more fields/columns for the given query,
// instead of selecting all fields in the entity.
//
// Example:
//
//	var v []struct {
//		Type bodypart.Type `json:"type,omitempty"`
//	}
//
//	client.BodyPart.Query().
//		Select(bodypart.FieldType).
//		Scan(ctx, &v)
//
func (bpq *BodyPartQuery) Select(fields ...string) *BodyPartSelect {
	bpq.fields = append(bpq.fields, fields...)
	return &BodyPartSelect{BodyPartQuery: bpq}
}

func (bpq *BodyPartQuery) prepareQuery(ctx context.Context) error {
	for _, f := range bpq.fields {
		if !bodypart.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
		}
	}
	if bpq.path != nil {
		prev, err := bpq.path(ctx)
		if err != nil {
			return err
		}
		bpq.sql = prev
	}
	return nil
}

func (bpq *BodyPartQuery) sqlAll(ctx context.Context) ([]*BodyPart, error) {
	var (
		nodes       = []*BodyPart{}
		_spec       = bpq.querySpec()
		loadedTypes = [3]bool{
			bpq.withHustlerBodies != nil,
			bpq.withHustlerHairs != nil,
			bpq.withHustlerBeards != nil,
		}
	)
	_spec.ScanValues = func(columns []string) ([]interface{}, error) {
		node := &BodyPart{config: bpq.config}
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
	if err := sqlgraph.QueryNodes(ctx, bpq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}

	if query := bpq.withHustlerBodies; query != nil {
		fks := make([]driver.Value, 0, len(nodes))
		nodeids := make(map[string]*BodyPart)
		for i := range nodes {
			fks = append(fks, nodes[i].ID)
			nodeids[nodes[i].ID] = nodes[i]
			nodes[i].Edges.HustlerBodies = []*Hustler{}
		}
		query.withFKs = true
		query.Where(predicate.Hustler(func(s *sql.Selector) {
			s.Where(sql.InValues(bodypart.HustlerBodiesColumn, fks...))
		}))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			fk := n.body_part_hustler_bodies
			if fk == nil {
				return nil, fmt.Errorf(`foreign-key "body_part_hustler_bodies" is nil for node %v`, n.ID)
			}
			node, ok := nodeids[*fk]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "body_part_hustler_bodies" returned %v for node %v`, *fk, n.ID)
			}
			node.Edges.HustlerBodies = append(node.Edges.HustlerBodies, n)
		}
	}

	if query := bpq.withHustlerHairs; query != nil {
		fks := make([]driver.Value, 0, len(nodes))
		nodeids := make(map[string]*BodyPart)
		for i := range nodes {
			fks = append(fks, nodes[i].ID)
			nodeids[nodes[i].ID] = nodes[i]
			nodes[i].Edges.HustlerHairs = []*Hustler{}
		}
		query.withFKs = true
		query.Where(predicate.Hustler(func(s *sql.Selector) {
			s.Where(sql.InValues(bodypart.HustlerHairsColumn, fks...))
		}))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			fk := n.body_part_hustler_hairs
			if fk == nil {
				return nil, fmt.Errorf(`foreign-key "body_part_hustler_hairs" is nil for node %v`, n.ID)
			}
			node, ok := nodeids[*fk]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "body_part_hustler_hairs" returned %v for node %v`, *fk, n.ID)
			}
			node.Edges.HustlerHairs = append(node.Edges.HustlerHairs, n)
		}
	}

	if query := bpq.withHustlerBeards; query != nil {
		fks := make([]driver.Value, 0, len(nodes))
		nodeids := make(map[string]*BodyPart)
		for i := range nodes {
			fks = append(fks, nodes[i].ID)
			nodeids[nodes[i].ID] = nodes[i]
			nodes[i].Edges.HustlerBeards = []*Hustler{}
		}
		query.withFKs = true
		query.Where(predicate.Hustler(func(s *sql.Selector) {
			s.Where(sql.InValues(bodypart.HustlerBeardsColumn, fks...))
		}))
		neighbors, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, n := range neighbors {
			fk := n.body_part_hustler_beards
			if fk == nil {
				return nil, fmt.Errorf(`foreign-key "body_part_hustler_beards" is nil for node %v`, n.ID)
			}
			node, ok := nodeids[*fk]
			if !ok {
				return nil, fmt.Errorf(`unexpected foreign-key "body_part_hustler_beards" returned %v for node %v`, *fk, n.ID)
			}
			node.Edges.HustlerBeards = append(node.Edges.HustlerBeards, n)
		}
	}

	return nodes, nil
}

func (bpq *BodyPartQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := bpq.querySpec()
	_spec.Node.Columns = bpq.fields
	if len(bpq.fields) > 0 {
		_spec.Unique = bpq.unique != nil && *bpq.unique
	}
	return sqlgraph.CountNodes(ctx, bpq.driver, _spec)
}

func (bpq *BodyPartQuery) sqlExist(ctx context.Context) (bool, error) {
	n, err := bpq.sqlCount(ctx)
	if err != nil {
		return false, fmt.Errorf("ent: check existence: %w", err)
	}
	return n > 0, nil
}

func (bpq *BodyPartQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := &sqlgraph.QuerySpec{
		Node: &sqlgraph.NodeSpec{
			Table:   bodypart.Table,
			Columns: bodypart.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: bodypart.FieldID,
			},
		},
		From:   bpq.sql,
		Unique: true,
	}
	if unique := bpq.unique; unique != nil {
		_spec.Unique = *unique
	}
	if fields := bpq.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, bodypart.FieldID)
		for i := range fields {
			if fields[i] != bodypart.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, fields[i])
			}
		}
	}
	if ps := bpq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := bpq.limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := bpq.offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := bpq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (bpq *BodyPartQuery) sqlQuery(ctx context.Context) *sql.Selector {
	builder := sql.Dialect(bpq.driver.Dialect())
	t1 := builder.Table(bodypart.Table)
	columns := bpq.fields
	if len(columns) == 0 {
		columns = bodypart.Columns
	}
	selector := builder.Select(t1.Columns(columns...)...).From(t1)
	if bpq.sql != nil {
		selector = bpq.sql
		selector.Select(selector.Columns(columns...)...)
	}
	if bpq.unique != nil && *bpq.unique {
		selector.Distinct()
	}
	for _, p := range bpq.predicates {
		p(selector)
	}
	for _, p := range bpq.order {
		p(selector)
	}
	if offset := bpq.offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := bpq.limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// BodyPartGroupBy is the group-by builder for BodyPart entities.
type BodyPartGroupBy struct {
	config
	fields []string
	fns    []AggregateFunc
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Aggregate adds the given aggregation functions to the group-by query.
func (bpgb *BodyPartGroupBy) Aggregate(fns ...AggregateFunc) *BodyPartGroupBy {
	bpgb.fns = append(bpgb.fns, fns...)
	return bpgb
}

// Scan applies the group-by query and scans the result into the given value.
func (bpgb *BodyPartGroupBy) Scan(ctx context.Context, v interface{}) error {
	query, err := bpgb.path(ctx)
	if err != nil {
		return err
	}
	bpgb.sql = query
	return bpgb.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (bpgb *BodyPartGroupBy) ScanX(ctx context.Context, v interface{}) {
	if err := bpgb.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from group-by.
// It is only allowed when executing a group-by query with one field.
func (bpgb *BodyPartGroupBy) Strings(ctx context.Context) ([]string, error) {
	if len(bpgb.fields) > 1 {
		return nil, errors.New("ent: BodyPartGroupBy.Strings is not achievable when grouping more than 1 field")
	}
	var v []string
	if err := bpgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (bpgb *BodyPartGroupBy) StringsX(ctx context.Context) []string {
	v, err := bpgb.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from a group-by query.
// It is only allowed when executing a group-by query with one field.
func (bpgb *BodyPartGroupBy) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = bpgb.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{bodypart.Label}
	default:
		err = fmt.Errorf("ent: BodyPartGroupBy.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (bpgb *BodyPartGroupBy) StringX(ctx context.Context) string {
	v, err := bpgb.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from group-by.
// It is only allowed when executing a group-by query with one field.
func (bpgb *BodyPartGroupBy) Ints(ctx context.Context) ([]int, error) {
	if len(bpgb.fields) > 1 {
		return nil, errors.New("ent: BodyPartGroupBy.Ints is not achievable when grouping more than 1 field")
	}
	var v []int
	if err := bpgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (bpgb *BodyPartGroupBy) IntsX(ctx context.Context) []int {
	v, err := bpgb.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from a group-by query.
// It is only allowed when executing a group-by query with one field.
func (bpgb *BodyPartGroupBy) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = bpgb.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{bodypart.Label}
	default:
		err = fmt.Errorf("ent: BodyPartGroupBy.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (bpgb *BodyPartGroupBy) IntX(ctx context.Context) int {
	v, err := bpgb.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from group-by.
// It is only allowed when executing a group-by query with one field.
func (bpgb *BodyPartGroupBy) Float64s(ctx context.Context) ([]float64, error) {
	if len(bpgb.fields) > 1 {
		return nil, errors.New("ent: BodyPartGroupBy.Float64s is not achievable when grouping more than 1 field")
	}
	var v []float64
	if err := bpgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (bpgb *BodyPartGroupBy) Float64sX(ctx context.Context) []float64 {
	v, err := bpgb.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from a group-by query.
// It is only allowed when executing a group-by query with one field.
func (bpgb *BodyPartGroupBy) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = bpgb.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{bodypart.Label}
	default:
		err = fmt.Errorf("ent: BodyPartGroupBy.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (bpgb *BodyPartGroupBy) Float64X(ctx context.Context) float64 {
	v, err := bpgb.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from group-by.
// It is only allowed when executing a group-by query with one field.
func (bpgb *BodyPartGroupBy) Bools(ctx context.Context) ([]bool, error) {
	if len(bpgb.fields) > 1 {
		return nil, errors.New("ent: BodyPartGroupBy.Bools is not achievable when grouping more than 1 field")
	}
	var v []bool
	if err := bpgb.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (bpgb *BodyPartGroupBy) BoolsX(ctx context.Context) []bool {
	v, err := bpgb.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from a group-by query.
// It is only allowed when executing a group-by query with one field.
func (bpgb *BodyPartGroupBy) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = bpgb.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{bodypart.Label}
	default:
		err = fmt.Errorf("ent: BodyPartGroupBy.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (bpgb *BodyPartGroupBy) BoolX(ctx context.Context) bool {
	v, err := bpgb.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (bpgb *BodyPartGroupBy) sqlScan(ctx context.Context, v interface{}) error {
	for _, f := range bpgb.fields {
		if !bodypart.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("invalid field %q for group-by", f)}
		}
	}
	selector := bpgb.sqlQuery()
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := bpgb.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

func (bpgb *BodyPartGroupBy) sqlQuery() *sql.Selector {
	selector := bpgb.sql.Select()
	aggregation := make([]string, 0, len(bpgb.fns))
	for _, fn := range bpgb.fns {
		aggregation = append(aggregation, fn(selector))
	}
	// If no columns were selected in a custom aggregation function, the default
	// selection is the fields used for "group-by", and the aggregation functions.
	if len(selector.SelectedColumns()) == 0 {
		columns := make([]string, 0, len(bpgb.fields)+len(bpgb.fns))
		for _, f := range bpgb.fields {
			columns = append(columns, selector.C(f))
		}
		columns = append(columns, aggregation...)
		selector.Select(columns...)
	}
	return selector.GroupBy(selector.Columns(bpgb.fields...)...)
}

// BodyPartSelect is the builder for selecting fields of BodyPart entities.
type BodyPartSelect struct {
	*BodyPartQuery
	// intermediate query (i.e. traversal path).
	sql *sql.Selector
}

// Scan applies the selector query and scans the result into the given value.
func (bps *BodyPartSelect) Scan(ctx context.Context, v interface{}) error {
	if err := bps.prepareQuery(ctx); err != nil {
		return err
	}
	bps.sql = bps.BodyPartQuery.sqlQuery(ctx)
	return bps.sqlScan(ctx, v)
}

// ScanX is like Scan, but panics if an error occurs.
func (bps *BodyPartSelect) ScanX(ctx context.Context, v interface{}) {
	if err := bps.Scan(ctx, v); err != nil {
		panic(err)
	}
}

// Strings returns list of strings from a selector. It is only allowed when selecting one field.
func (bps *BodyPartSelect) Strings(ctx context.Context) ([]string, error) {
	if len(bps.fields) > 1 {
		return nil, errors.New("ent: BodyPartSelect.Strings is not achievable when selecting more than 1 field")
	}
	var v []string
	if err := bps.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// StringsX is like Strings, but panics if an error occurs.
func (bps *BodyPartSelect) StringsX(ctx context.Context) []string {
	v, err := bps.Strings(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// String returns a single string from a selector. It is only allowed when selecting one field.
func (bps *BodyPartSelect) String(ctx context.Context) (_ string, err error) {
	var v []string
	if v, err = bps.Strings(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{bodypart.Label}
	default:
		err = fmt.Errorf("ent: BodyPartSelect.Strings returned %d results when one was expected", len(v))
	}
	return
}

// StringX is like String, but panics if an error occurs.
func (bps *BodyPartSelect) StringX(ctx context.Context) string {
	v, err := bps.String(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Ints returns list of ints from a selector. It is only allowed when selecting one field.
func (bps *BodyPartSelect) Ints(ctx context.Context) ([]int, error) {
	if len(bps.fields) > 1 {
		return nil, errors.New("ent: BodyPartSelect.Ints is not achievable when selecting more than 1 field")
	}
	var v []int
	if err := bps.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// IntsX is like Ints, but panics if an error occurs.
func (bps *BodyPartSelect) IntsX(ctx context.Context) []int {
	v, err := bps.Ints(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Int returns a single int from a selector. It is only allowed when selecting one field.
func (bps *BodyPartSelect) Int(ctx context.Context) (_ int, err error) {
	var v []int
	if v, err = bps.Ints(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{bodypart.Label}
	default:
		err = fmt.Errorf("ent: BodyPartSelect.Ints returned %d results when one was expected", len(v))
	}
	return
}

// IntX is like Int, but panics if an error occurs.
func (bps *BodyPartSelect) IntX(ctx context.Context) int {
	v, err := bps.Int(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64s returns list of float64s from a selector. It is only allowed when selecting one field.
func (bps *BodyPartSelect) Float64s(ctx context.Context) ([]float64, error) {
	if len(bps.fields) > 1 {
		return nil, errors.New("ent: BodyPartSelect.Float64s is not achievable when selecting more than 1 field")
	}
	var v []float64
	if err := bps.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// Float64sX is like Float64s, but panics if an error occurs.
func (bps *BodyPartSelect) Float64sX(ctx context.Context) []float64 {
	v, err := bps.Float64s(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Float64 returns a single float64 from a selector. It is only allowed when selecting one field.
func (bps *BodyPartSelect) Float64(ctx context.Context) (_ float64, err error) {
	var v []float64
	if v, err = bps.Float64s(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{bodypart.Label}
	default:
		err = fmt.Errorf("ent: BodyPartSelect.Float64s returned %d results when one was expected", len(v))
	}
	return
}

// Float64X is like Float64, but panics if an error occurs.
func (bps *BodyPartSelect) Float64X(ctx context.Context) float64 {
	v, err := bps.Float64(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bools returns list of bools from a selector. It is only allowed when selecting one field.
func (bps *BodyPartSelect) Bools(ctx context.Context) ([]bool, error) {
	if len(bps.fields) > 1 {
		return nil, errors.New("ent: BodyPartSelect.Bools is not achievable when selecting more than 1 field")
	}
	var v []bool
	if err := bps.Scan(ctx, &v); err != nil {
		return nil, err
	}
	return v, nil
}

// BoolsX is like Bools, but panics if an error occurs.
func (bps *BodyPartSelect) BoolsX(ctx context.Context) []bool {
	v, err := bps.Bools(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Bool returns a single bool from a selector. It is only allowed when selecting one field.
func (bps *BodyPartSelect) Bool(ctx context.Context) (_ bool, err error) {
	var v []bool
	if v, err = bps.Bools(ctx); err != nil {
		return
	}
	switch len(v) {
	case 1:
		return v[0], nil
	case 0:
		err = &NotFoundError{bodypart.Label}
	default:
		err = fmt.Errorf("ent: BodyPartSelect.Bools returned %d results when one was expected", len(v))
	}
	return
}

// BoolX is like Bool, but panics if an error occurs.
func (bps *BodyPartSelect) BoolX(ctx context.Context) bool {
	v, err := bps.Bool(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

func (bps *BodyPartSelect) sqlScan(ctx context.Context, v interface{}) error {
	rows := &sql.Rows{}
	query, args := bps.sql.Query()
	if err := bps.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}
