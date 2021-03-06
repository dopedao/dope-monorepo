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
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/bodypart"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/hustler"
)

// BodyPartCreate is the builder for creating a BodyPart entity.
type BodyPartCreate struct {
	config
	mutation *BodyPartMutation
	hooks    []Hook
	conflict []sql.ConflictOption
}

// SetType sets the "type" field.
func (bpc *BodyPartCreate) SetType(b bodypart.Type) *BodyPartCreate {
	bpc.mutation.SetType(b)
	return bpc
}

// SetSex sets the "sex" field.
func (bpc *BodyPartCreate) SetSex(b bodypart.Sex) *BodyPartCreate {
	bpc.mutation.SetSex(b)
	return bpc
}

// SetRle sets the "rle" field.
func (bpc *BodyPartCreate) SetRle(s string) *BodyPartCreate {
	bpc.mutation.SetRle(s)
	return bpc
}

// SetSprite sets the "sprite" field.
func (bpc *BodyPartCreate) SetSprite(s string) *BodyPartCreate {
	bpc.mutation.SetSprite(s)
	return bpc
}

// SetNillableSprite sets the "sprite" field if the given value is not nil.
func (bpc *BodyPartCreate) SetNillableSprite(s *string) *BodyPartCreate {
	if s != nil {
		bpc.SetSprite(*s)
	}
	return bpc
}

// SetID sets the "id" field.
func (bpc *BodyPartCreate) SetID(s string) *BodyPartCreate {
	bpc.mutation.SetID(s)
	return bpc
}

// AddHustlerBodyIDs adds the "hustler_bodies" edge to the Hustler entity by IDs.
func (bpc *BodyPartCreate) AddHustlerBodyIDs(ids ...string) *BodyPartCreate {
	bpc.mutation.AddHustlerBodyIDs(ids...)
	return bpc
}

// AddHustlerBodies adds the "hustler_bodies" edges to the Hustler entity.
func (bpc *BodyPartCreate) AddHustlerBodies(h ...*Hustler) *BodyPartCreate {
	ids := make([]string, len(h))
	for i := range h {
		ids[i] = h[i].ID
	}
	return bpc.AddHustlerBodyIDs(ids...)
}

// AddHustlerHairIDs adds the "hustler_hairs" edge to the Hustler entity by IDs.
func (bpc *BodyPartCreate) AddHustlerHairIDs(ids ...string) *BodyPartCreate {
	bpc.mutation.AddHustlerHairIDs(ids...)
	return bpc
}

// AddHustlerHairs adds the "hustler_hairs" edges to the Hustler entity.
func (bpc *BodyPartCreate) AddHustlerHairs(h ...*Hustler) *BodyPartCreate {
	ids := make([]string, len(h))
	for i := range h {
		ids[i] = h[i].ID
	}
	return bpc.AddHustlerHairIDs(ids...)
}

// AddHustlerBeardIDs adds the "hustler_beards" edge to the Hustler entity by IDs.
func (bpc *BodyPartCreate) AddHustlerBeardIDs(ids ...string) *BodyPartCreate {
	bpc.mutation.AddHustlerBeardIDs(ids...)
	return bpc
}

// AddHustlerBeards adds the "hustler_beards" edges to the Hustler entity.
func (bpc *BodyPartCreate) AddHustlerBeards(h ...*Hustler) *BodyPartCreate {
	ids := make([]string, len(h))
	for i := range h {
		ids[i] = h[i].ID
	}
	return bpc.AddHustlerBeardIDs(ids...)
}

// Mutation returns the BodyPartMutation object of the builder.
func (bpc *BodyPartCreate) Mutation() *BodyPartMutation {
	return bpc.mutation
}

// Save creates the BodyPart in the database.
func (bpc *BodyPartCreate) Save(ctx context.Context) (*BodyPart, error) {
	var (
		err  error
		node *BodyPart
	)
	if len(bpc.hooks) == 0 {
		if err = bpc.check(); err != nil {
			return nil, err
		}
		node, err = bpc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*BodyPartMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = bpc.check(); err != nil {
				return nil, err
			}
			bpc.mutation = mutation
			if node, err = bpc.sqlSave(ctx); err != nil {
				return nil, err
			}
			mutation.id = &node.ID
			mutation.done = true
			return node, err
		})
		for i := len(bpc.hooks) - 1; i >= 0; i-- {
			if bpc.hooks[i] == nil {
				return nil, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = bpc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, bpc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (bpc *BodyPartCreate) SaveX(ctx context.Context) *BodyPart {
	v, err := bpc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (bpc *BodyPartCreate) Exec(ctx context.Context) error {
	_, err := bpc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (bpc *BodyPartCreate) ExecX(ctx context.Context) {
	if err := bpc.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (bpc *BodyPartCreate) check() error {
	if _, ok := bpc.mutation.GetType(); !ok {
		return &ValidationError{Name: "type", err: errors.New(`ent: missing required field "BodyPart.type"`)}
	}
	if v, ok := bpc.mutation.GetType(); ok {
		if err := bodypart.TypeValidator(v); err != nil {
			return &ValidationError{Name: "type", err: fmt.Errorf(`ent: validator failed for field "BodyPart.type": %w`, err)}
		}
	}
	if _, ok := bpc.mutation.Sex(); !ok {
		return &ValidationError{Name: "sex", err: errors.New(`ent: missing required field "BodyPart.sex"`)}
	}
	if v, ok := bpc.mutation.Sex(); ok {
		if err := bodypart.SexValidator(v); err != nil {
			return &ValidationError{Name: "sex", err: fmt.Errorf(`ent: validator failed for field "BodyPart.sex": %w`, err)}
		}
	}
	if _, ok := bpc.mutation.Rle(); !ok {
		return &ValidationError{Name: "rle", err: errors.New(`ent: missing required field "BodyPart.rle"`)}
	}
	return nil
}

func (bpc *BodyPartCreate) sqlSave(ctx context.Context) (*BodyPart, error) {
	_node, _spec := bpc.createSpec()
	if err := sqlgraph.CreateNode(ctx, bpc.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return nil, err
	}
	if _spec.ID.Value != nil {
		if id, ok := _spec.ID.Value.(string); ok {
			_node.ID = id
		} else {
			return nil, fmt.Errorf("unexpected BodyPart.ID type: %T", _spec.ID.Value)
		}
	}
	return _node, nil
}

func (bpc *BodyPartCreate) createSpec() (*BodyPart, *sqlgraph.CreateSpec) {
	var (
		_node = &BodyPart{config: bpc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: bodypart.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeString,
				Column: bodypart.FieldID,
			},
		}
	)
	_spec.OnConflict = bpc.conflict
	if id, ok := bpc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = id
	}
	if value, ok := bpc.mutation.GetType(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: bodypart.FieldType,
		})
		_node.Type = value
	}
	if value, ok := bpc.mutation.Sex(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: bodypart.FieldSex,
		})
		_node.Sex = value
	}
	if value, ok := bpc.mutation.Rle(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: bodypart.FieldRle,
		})
		_node.Rle = value
	}
	if value, ok := bpc.mutation.Sprite(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: bodypart.FieldSprite,
		})
		_node.Sprite = value
	}
	if nodes := bpc.mutation.HustlerBodiesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   bodypart.HustlerBodiesTable,
			Columns: []string{bodypart.HustlerBodiesColumn},
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
	if nodes := bpc.mutation.HustlerHairsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   bodypart.HustlerHairsTable,
			Columns: []string{bodypart.HustlerHairsColumn},
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
	if nodes := bpc.mutation.HustlerBeardsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   bodypart.HustlerBeardsTable,
			Columns: []string{bodypart.HustlerBeardsColumn},
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
//	client.BodyPart.Create().
//		SetType(v).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.BodyPartUpsert) {
//			SetType(v+v).
//		}).
//		Exec(ctx)
//
func (bpc *BodyPartCreate) OnConflict(opts ...sql.ConflictOption) *BodyPartUpsertOne {
	bpc.conflict = opts
	return &BodyPartUpsertOne{
		create: bpc,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.BodyPart.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
//
func (bpc *BodyPartCreate) OnConflictColumns(columns ...string) *BodyPartUpsertOne {
	bpc.conflict = append(bpc.conflict, sql.ConflictColumns(columns...))
	return &BodyPartUpsertOne{
		create: bpc,
	}
}

type (
	// BodyPartUpsertOne is the builder for "upsert"-ing
	//  one BodyPart node.
	BodyPartUpsertOne struct {
		create *BodyPartCreate
	}

	// BodyPartUpsert is the "OnConflict" setter.
	BodyPartUpsert struct {
		*sql.UpdateSet
	}
)

// SetType sets the "type" field.
func (u *BodyPartUpsert) SetType(v bodypart.Type) *BodyPartUpsert {
	u.Set(bodypart.FieldType, v)
	return u
}

// UpdateType sets the "type" field to the value that was provided on create.
func (u *BodyPartUpsert) UpdateType() *BodyPartUpsert {
	u.SetExcluded(bodypart.FieldType)
	return u
}

// SetSex sets the "sex" field.
func (u *BodyPartUpsert) SetSex(v bodypart.Sex) *BodyPartUpsert {
	u.Set(bodypart.FieldSex, v)
	return u
}

// UpdateSex sets the "sex" field to the value that was provided on create.
func (u *BodyPartUpsert) UpdateSex() *BodyPartUpsert {
	u.SetExcluded(bodypart.FieldSex)
	return u
}

// SetRle sets the "rle" field.
func (u *BodyPartUpsert) SetRle(v string) *BodyPartUpsert {
	u.Set(bodypart.FieldRle, v)
	return u
}

// UpdateRle sets the "rle" field to the value that was provided on create.
func (u *BodyPartUpsert) UpdateRle() *BodyPartUpsert {
	u.SetExcluded(bodypart.FieldRle)
	return u
}

// SetSprite sets the "sprite" field.
func (u *BodyPartUpsert) SetSprite(v string) *BodyPartUpsert {
	u.Set(bodypart.FieldSprite, v)
	return u
}

// UpdateSprite sets the "sprite" field to the value that was provided on create.
func (u *BodyPartUpsert) UpdateSprite() *BodyPartUpsert {
	u.SetExcluded(bodypart.FieldSprite)
	return u
}

// ClearSprite clears the value of the "sprite" field.
func (u *BodyPartUpsert) ClearSprite() *BodyPartUpsert {
	u.SetNull(bodypart.FieldSprite)
	return u
}

// UpdateNewValues updates the mutable fields using the new values that were set on create except the ID field.
// Using this option is equivalent to using:
//
//	client.BodyPart.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(bodypart.FieldID)
//			}),
//		).
//		Exec(ctx)
//
func (u *BodyPartUpsertOne) UpdateNewValues() *BodyPartUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		if _, exists := u.create.mutation.ID(); exists {
			s.SetIgnore(bodypart.FieldID)
		}
		if _, exists := u.create.mutation.GetType(); exists {
			s.SetIgnore(bodypart.FieldType)
		}
		if _, exists := u.create.mutation.Sex(); exists {
			s.SetIgnore(bodypart.FieldSex)
		}
		if _, exists := u.create.mutation.Rle(); exists {
			s.SetIgnore(bodypart.FieldRle)
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//  client.BodyPart.Create().
//      OnConflict(sql.ResolveWithIgnore()).
//      Exec(ctx)
//
func (u *BodyPartUpsertOne) Ignore() *BodyPartUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *BodyPartUpsertOne) DoNothing() *BodyPartUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the BodyPartCreate.OnConflict
// documentation for more info.
func (u *BodyPartUpsertOne) Update(set func(*BodyPartUpsert)) *BodyPartUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&BodyPartUpsert{UpdateSet: update})
	}))
	return u
}

// SetType sets the "type" field.
func (u *BodyPartUpsertOne) SetType(v bodypart.Type) *BodyPartUpsertOne {
	return u.Update(func(s *BodyPartUpsert) {
		s.SetType(v)
	})
}

// UpdateType sets the "type" field to the value that was provided on create.
func (u *BodyPartUpsertOne) UpdateType() *BodyPartUpsertOne {
	return u.Update(func(s *BodyPartUpsert) {
		s.UpdateType()
	})
}

// SetSex sets the "sex" field.
func (u *BodyPartUpsertOne) SetSex(v bodypart.Sex) *BodyPartUpsertOne {
	return u.Update(func(s *BodyPartUpsert) {
		s.SetSex(v)
	})
}

// UpdateSex sets the "sex" field to the value that was provided on create.
func (u *BodyPartUpsertOne) UpdateSex() *BodyPartUpsertOne {
	return u.Update(func(s *BodyPartUpsert) {
		s.UpdateSex()
	})
}

// SetRle sets the "rle" field.
func (u *BodyPartUpsertOne) SetRle(v string) *BodyPartUpsertOne {
	return u.Update(func(s *BodyPartUpsert) {
		s.SetRle(v)
	})
}

// UpdateRle sets the "rle" field to the value that was provided on create.
func (u *BodyPartUpsertOne) UpdateRle() *BodyPartUpsertOne {
	return u.Update(func(s *BodyPartUpsert) {
		s.UpdateRle()
	})
}

// SetSprite sets the "sprite" field.
func (u *BodyPartUpsertOne) SetSprite(v string) *BodyPartUpsertOne {
	return u.Update(func(s *BodyPartUpsert) {
		s.SetSprite(v)
	})
}

// UpdateSprite sets the "sprite" field to the value that was provided on create.
func (u *BodyPartUpsertOne) UpdateSprite() *BodyPartUpsertOne {
	return u.Update(func(s *BodyPartUpsert) {
		s.UpdateSprite()
	})
}

// ClearSprite clears the value of the "sprite" field.
func (u *BodyPartUpsertOne) ClearSprite() *BodyPartUpsertOne {
	return u.Update(func(s *BodyPartUpsert) {
		s.ClearSprite()
	})
}

// Exec executes the query.
func (u *BodyPartUpsertOne) Exec(ctx context.Context) error {
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for BodyPartCreate.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *BodyPartUpsertOne) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}

// Exec executes the UPSERT query and returns the inserted/updated ID.
func (u *BodyPartUpsertOne) ID(ctx context.Context) (id string, err error) {
	if u.create.driver.Dialect() == dialect.MySQL {
		// In case of "ON CONFLICT", there is no way to get back non-numeric ID
		// fields from the database since MySQL does not support the RETURNING clause.
		return id, errors.New("ent: BodyPartUpsertOne.ID is not supported by MySQL driver. Use BodyPartUpsertOne.Exec instead")
	}
	node, err := u.create.Save(ctx)
	if err != nil {
		return id, err
	}
	return node.ID, nil
}

// IDX is like ID, but panics if an error occurs.
func (u *BodyPartUpsertOne) IDX(ctx context.Context) string {
	id, err := u.ID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// BodyPartCreateBulk is the builder for creating many BodyPart entities in bulk.
type BodyPartCreateBulk struct {
	config
	builders []*BodyPartCreate
	conflict []sql.ConflictOption
}

// Save creates the BodyPart entities in the database.
func (bpcb *BodyPartCreateBulk) Save(ctx context.Context) ([]*BodyPart, error) {
	specs := make([]*sqlgraph.CreateSpec, len(bpcb.builders))
	nodes := make([]*BodyPart, len(bpcb.builders))
	mutators := make([]Mutator, len(bpcb.builders))
	for i := range bpcb.builders {
		func(i int, root context.Context) {
			builder := bpcb.builders[i]
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*BodyPartMutation)
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
					_, err = mutators[i+1].Mutate(root, bpcb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					spec.OnConflict = bpcb.conflict
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, bpcb.driver, spec); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, bpcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (bpcb *BodyPartCreateBulk) SaveX(ctx context.Context) []*BodyPart {
	v, err := bpcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (bpcb *BodyPartCreateBulk) Exec(ctx context.Context) error {
	_, err := bpcb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (bpcb *BodyPartCreateBulk) ExecX(ctx context.Context) {
	if err := bpcb.Exec(ctx); err != nil {
		panic(err)
	}
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.BodyPart.CreateBulk(builders...).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.BodyPartUpsert) {
//			SetType(v+v).
//		}).
//		Exec(ctx)
//
func (bpcb *BodyPartCreateBulk) OnConflict(opts ...sql.ConflictOption) *BodyPartUpsertBulk {
	bpcb.conflict = opts
	return &BodyPartUpsertBulk{
		create: bpcb,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.BodyPart.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
//
func (bpcb *BodyPartCreateBulk) OnConflictColumns(columns ...string) *BodyPartUpsertBulk {
	bpcb.conflict = append(bpcb.conflict, sql.ConflictColumns(columns...))
	return &BodyPartUpsertBulk{
		create: bpcb,
	}
}

// BodyPartUpsertBulk is the builder for "upsert"-ing
// a bulk of BodyPart nodes.
type BodyPartUpsertBulk struct {
	create *BodyPartCreateBulk
}

// UpdateNewValues updates the mutable fields using the new values that
// were set on create. Using this option is equivalent to using:
//
//	client.BodyPart.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(bodypart.FieldID)
//			}),
//		).
//		Exec(ctx)
//
func (u *BodyPartUpsertBulk) UpdateNewValues() *BodyPartUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		for _, b := range u.create.builders {
			if _, exists := b.mutation.ID(); exists {
				s.SetIgnore(bodypart.FieldID)
				return
			}
			if _, exists := b.mutation.GetType(); exists {
				s.SetIgnore(bodypart.FieldType)
			}
			if _, exists := b.mutation.Sex(); exists {
				s.SetIgnore(bodypart.FieldSex)
			}
			if _, exists := b.mutation.Rle(); exists {
				s.SetIgnore(bodypart.FieldRle)
			}
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//	client.BodyPart.Create().
//		OnConflict(sql.ResolveWithIgnore()).
//		Exec(ctx)
//
func (u *BodyPartUpsertBulk) Ignore() *BodyPartUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *BodyPartUpsertBulk) DoNothing() *BodyPartUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the BodyPartCreateBulk.OnConflict
// documentation for more info.
func (u *BodyPartUpsertBulk) Update(set func(*BodyPartUpsert)) *BodyPartUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&BodyPartUpsert{UpdateSet: update})
	}))
	return u
}

// SetType sets the "type" field.
func (u *BodyPartUpsertBulk) SetType(v bodypart.Type) *BodyPartUpsertBulk {
	return u.Update(func(s *BodyPartUpsert) {
		s.SetType(v)
	})
}

// UpdateType sets the "type" field to the value that was provided on create.
func (u *BodyPartUpsertBulk) UpdateType() *BodyPartUpsertBulk {
	return u.Update(func(s *BodyPartUpsert) {
		s.UpdateType()
	})
}

// SetSex sets the "sex" field.
func (u *BodyPartUpsertBulk) SetSex(v bodypart.Sex) *BodyPartUpsertBulk {
	return u.Update(func(s *BodyPartUpsert) {
		s.SetSex(v)
	})
}

// UpdateSex sets the "sex" field to the value that was provided on create.
func (u *BodyPartUpsertBulk) UpdateSex() *BodyPartUpsertBulk {
	return u.Update(func(s *BodyPartUpsert) {
		s.UpdateSex()
	})
}

// SetRle sets the "rle" field.
func (u *BodyPartUpsertBulk) SetRle(v string) *BodyPartUpsertBulk {
	return u.Update(func(s *BodyPartUpsert) {
		s.SetRle(v)
	})
}

// UpdateRle sets the "rle" field to the value that was provided on create.
func (u *BodyPartUpsertBulk) UpdateRle() *BodyPartUpsertBulk {
	return u.Update(func(s *BodyPartUpsert) {
		s.UpdateRle()
	})
}

// SetSprite sets the "sprite" field.
func (u *BodyPartUpsertBulk) SetSprite(v string) *BodyPartUpsertBulk {
	return u.Update(func(s *BodyPartUpsert) {
		s.SetSprite(v)
	})
}

// UpdateSprite sets the "sprite" field to the value that was provided on create.
func (u *BodyPartUpsertBulk) UpdateSprite() *BodyPartUpsertBulk {
	return u.Update(func(s *BodyPartUpsert) {
		s.UpdateSprite()
	})
}

// ClearSprite clears the value of the "sprite" field.
func (u *BodyPartUpsertBulk) ClearSprite() *BodyPartUpsertBulk {
	return u.Update(func(s *BodyPartUpsert) {
		s.ClearSprite()
	})
}

// Exec executes the query.
func (u *BodyPartUpsertBulk) Exec(ctx context.Context) error {
	for i, b := range u.create.builders {
		if len(b.conflict) != 0 {
			return fmt.Errorf("ent: OnConflict was set for builder %d. Set it on the BodyPartCreateBulk instead", i)
		}
	}
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for BodyPartCreateBulk.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *BodyPartUpsertBulk) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}
