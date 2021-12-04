// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"
	"sync"

	"github.com/dopedao/dope-monorepo/packages/api/ent/dope"
	"github.com/dopedao/dope-monorepo/packages/api/ent/predicate"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"

	"entgo.io/ent"
)

const (
	// Operation types.
	OpCreate    = ent.OpCreate
	OpDelete    = ent.OpDelete
	OpDeleteOne = ent.OpDeleteOne
	OpUpdate    = ent.OpUpdate
	OpUpdateOne = ent.OpUpdateOne

	// Node types.
	TypeDope   = "Dope"
	TypeWallet = "Wallet"
)

// DopeMutation represents an operation that mutates the Dope nodes in the graph.
type DopeMutation struct {
	config
	op            Op
	typ           string
	id            *string
	clothes       *string
	foot          *string
	hand          *string
	neck          *string
	ring          *string
	waist         *string
	weapon        *string
	drugs         *string
	vehicle       *string
	claimed       *bool
	opened        *bool
	clearedFields map[string]struct{}
	wallet        *string
	clearedwallet bool
	done          bool
	oldValue      func(context.Context) (*Dope, error)
	predicates    []predicate.Dope
}

var _ ent.Mutation = (*DopeMutation)(nil)

// dopeOption allows management of the mutation configuration using functional options.
type dopeOption func(*DopeMutation)

// newDopeMutation creates new mutation for the Dope entity.
func newDopeMutation(c config, op Op, opts ...dopeOption) *DopeMutation {
	m := &DopeMutation{
		config:        c,
		op:            op,
		typ:           TypeDope,
		clearedFields: make(map[string]struct{}),
	}
	for _, opt := range opts {
		opt(m)
	}
	return m
}

// withDopeID sets the ID field of the mutation.
func withDopeID(id string) dopeOption {
	return func(m *DopeMutation) {
		var (
			err   error
			once  sync.Once
			value *Dope
		)
		m.oldValue = func(ctx context.Context) (*Dope, error) {
			once.Do(func() {
				if m.done {
					err = fmt.Errorf("querying old values post mutation is not allowed")
				} else {
					value, err = m.Client().Dope.Get(ctx, id)
				}
			})
			return value, err
		}
		m.id = &id
	}
}

// withDope sets the old Dope of the mutation.
func withDope(node *Dope) dopeOption {
	return func(m *DopeMutation) {
		m.oldValue = func(context.Context) (*Dope, error) {
			return node, nil
		}
		m.id = &node.ID
	}
}

// Client returns a new `ent.Client` from the mutation. If the mutation was
// executed in a transaction (ent.Tx), a transactional client is returned.
func (m DopeMutation) Client() *Client {
	client := &Client{config: m.config}
	client.init()
	return client
}

// Tx returns an `ent.Tx` for mutations that were executed in transactions;
// it returns an error otherwise.
func (m DopeMutation) Tx() (*Tx, error) {
	if _, ok := m.driver.(*txDriver); !ok {
		return nil, fmt.Errorf("ent: mutation is not running in a transaction")
	}
	tx := &Tx{config: m.config}
	tx.init()
	return tx, nil
}

// ID returns the ID value in the mutation. Note that the ID is only available
// if it was provided to the builder or after it was returned from the database.
func (m *DopeMutation) ID() (id string, exists bool) {
	if m.id == nil {
		return
	}
	return *m.id, true
}

// SetClothes sets the "clothes" field.
func (m *DopeMutation) SetClothes(s string) {
	m.clothes = &s
}

// Clothes returns the value of the "clothes" field in the mutation.
func (m *DopeMutation) Clothes() (r string, exists bool) {
	v := m.clothes
	if v == nil {
		return
	}
	return *v, true
}

// OldClothes returns the old "clothes" field's value of the Dope entity.
// If the Dope object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *DopeMutation) OldClothes(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, fmt.Errorf("OldClothes is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, fmt.Errorf("OldClothes requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldClothes: %w", err)
	}
	return oldValue.Clothes, nil
}

// ResetClothes resets all changes to the "clothes" field.
func (m *DopeMutation) ResetClothes() {
	m.clothes = nil
}

// SetFoot sets the "foot" field.
func (m *DopeMutation) SetFoot(s string) {
	m.foot = &s
}

// Foot returns the value of the "foot" field in the mutation.
func (m *DopeMutation) Foot() (r string, exists bool) {
	v := m.foot
	if v == nil {
		return
	}
	return *v, true
}

// OldFoot returns the old "foot" field's value of the Dope entity.
// If the Dope object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *DopeMutation) OldFoot(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, fmt.Errorf("OldFoot is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, fmt.Errorf("OldFoot requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldFoot: %w", err)
	}
	return oldValue.Foot, nil
}

// ResetFoot resets all changes to the "foot" field.
func (m *DopeMutation) ResetFoot() {
	m.foot = nil
}

// SetHand sets the "hand" field.
func (m *DopeMutation) SetHand(s string) {
	m.hand = &s
}

// Hand returns the value of the "hand" field in the mutation.
func (m *DopeMutation) Hand() (r string, exists bool) {
	v := m.hand
	if v == nil {
		return
	}
	return *v, true
}

// OldHand returns the old "hand" field's value of the Dope entity.
// If the Dope object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *DopeMutation) OldHand(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, fmt.Errorf("OldHand is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, fmt.Errorf("OldHand requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldHand: %w", err)
	}
	return oldValue.Hand, nil
}

// ResetHand resets all changes to the "hand" field.
func (m *DopeMutation) ResetHand() {
	m.hand = nil
}

// SetNeck sets the "neck" field.
func (m *DopeMutation) SetNeck(s string) {
	m.neck = &s
}

// Neck returns the value of the "neck" field in the mutation.
func (m *DopeMutation) Neck() (r string, exists bool) {
	v := m.neck
	if v == nil {
		return
	}
	return *v, true
}

// OldNeck returns the old "neck" field's value of the Dope entity.
// If the Dope object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *DopeMutation) OldNeck(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, fmt.Errorf("OldNeck is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, fmt.Errorf("OldNeck requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldNeck: %w", err)
	}
	return oldValue.Neck, nil
}

// ResetNeck resets all changes to the "neck" field.
func (m *DopeMutation) ResetNeck() {
	m.neck = nil
}

// SetRing sets the "ring" field.
func (m *DopeMutation) SetRing(s string) {
	m.ring = &s
}

// Ring returns the value of the "ring" field in the mutation.
func (m *DopeMutation) Ring() (r string, exists bool) {
	v := m.ring
	if v == nil {
		return
	}
	return *v, true
}

// OldRing returns the old "ring" field's value of the Dope entity.
// If the Dope object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *DopeMutation) OldRing(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, fmt.Errorf("OldRing is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, fmt.Errorf("OldRing requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldRing: %w", err)
	}
	return oldValue.Ring, nil
}

// ResetRing resets all changes to the "ring" field.
func (m *DopeMutation) ResetRing() {
	m.ring = nil
}

// SetWaist sets the "waist" field.
func (m *DopeMutation) SetWaist(s string) {
	m.waist = &s
}

// Waist returns the value of the "waist" field in the mutation.
func (m *DopeMutation) Waist() (r string, exists bool) {
	v := m.waist
	if v == nil {
		return
	}
	return *v, true
}

// OldWaist returns the old "waist" field's value of the Dope entity.
// If the Dope object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *DopeMutation) OldWaist(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, fmt.Errorf("OldWaist is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, fmt.Errorf("OldWaist requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldWaist: %w", err)
	}
	return oldValue.Waist, nil
}

// ResetWaist resets all changes to the "waist" field.
func (m *DopeMutation) ResetWaist() {
	m.waist = nil
}

// SetWeapon sets the "weapon" field.
func (m *DopeMutation) SetWeapon(s string) {
	m.weapon = &s
}

// Weapon returns the value of the "weapon" field in the mutation.
func (m *DopeMutation) Weapon() (r string, exists bool) {
	v := m.weapon
	if v == nil {
		return
	}
	return *v, true
}

// OldWeapon returns the old "weapon" field's value of the Dope entity.
// If the Dope object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *DopeMutation) OldWeapon(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, fmt.Errorf("OldWeapon is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, fmt.Errorf("OldWeapon requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldWeapon: %w", err)
	}
	return oldValue.Weapon, nil
}

// ResetWeapon resets all changes to the "weapon" field.
func (m *DopeMutation) ResetWeapon() {
	m.weapon = nil
}

// SetDrugs sets the "drugs" field.
func (m *DopeMutation) SetDrugs(s string) {
	m.drugs = &s
}

// Drugs returns the value of the "drugs" field in the mutation.
func (m *DopeMutation) Drugs() (r string, exists bool) {
	v := m.drugs
	if v == nil {
		return
	}
	return *v, true
}

// OldDrugs returns the old "drugs" field's value of the Dope entity.
// If the Dope object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *DopeMutation) OldDrugs(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, fmt.Errorf("OldDrugs is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, fmt.Errorf("OldDrugs requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldDrugs: %w", err)
	}
	return oldValue.Drugs, nil
}

// ResetDrugs resets all changes to the "drugs" field.
func (m *DopeMutation) ResetDrugs() {
	m.drugs = nil
}

// SetVehicle sets the "vehicle" field.
func (m *DopeMutation) SetVehicle(s string) {
	m.vehicle = &s
}

// Vehicle returns the value of the "vehicle" field in the mutation.
func (m *DopeMutation) Vehicle() (r string, exists bool) {
	v := m.vehicle
	if v == nil {
		return
	}
	return *v, true
}

// OldVehicle returns the old "vehicle" field's value of the Dope entity.
// If the Dope object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *DopeMutation) OldVehicle(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, fmt.Errorf("OldVehicle is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, fmt.Errorf("OldVehicle requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldVehicle: %w", err)
	}
	return oldValue.Vehicle, nil
}

// ResetVehicle resets all changes to the "vehicle" field.
func (m *DopeMutation) ResetVehicle() {
	m.vehicle = nil
}

// SetClaimed sets the "claimed" field.
func (m *DopeMutation) SetClaimed(b bool) {
	m.claimed = &b
}

// Claimed returns the value of the "claimed" field in the mutation.
func (m *DopeMutation) Claimed() (r bool, exists bool) {
	v := m.claimed
	if v == nil {
		return
	}
	return *v, true
}

// OldClaimed returns the old "claimed" field's value of the Dope entity.
// If the Dope object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *DopeMutation) OldClaimed(ctx context.Context) (v bool, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, fmt.Errorf("OldClaimed is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, fmt.Errorf("OldClaimed requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldClaimed: %w", err)
	}
	return oldValue.Claimed, nil
}

// ResetClaimed resets all changes to the "claimed" field.
func (m *DopeMutation) ResetClaimed() {
	m.claimed = nil
}

// SetOpened sets the "opened" field.
func (m *DopeMutation) SetOpened(b bool) {
	m.opened = &b
}

// Opened returns the value of the "opened" field in the mutation.
func (m *DopeMutation) Opened() (r bool, exists bool) {
	v := m.opened
	if v == nil {
		return
	}
	return *v, true
}

// OldOpened returns the old "opened" field's value of the Dope entity.
// If the Dope object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *DopeMutation) OldOpened(ctx context.Context) (v bool, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, fmt.Errorf("OldOpened is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, fmt.Errorf("OldOpened requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldOpened: %w", err)
	}
	return oldValue.Opened, nil
}

// ResetOpened resets all changes to the "opened" field.
func (m *DopeMutation) ResetOpened() {
	m.opened = nil
}

// SetWalletID sets the "wallet" edge to the Wallet entity by id.
func (m *DopeMutation) SetWalletID(id string) {
	m.wallet = &id
}

// ClearWallet clears the "wallet" edge to the Wallet entity.
func (m *DopeMutation) ClearWallet() {
	m.clearedwallet = true
}

// WalletCleared reports if the "wallet" edge to the Wallet entity was cleared.
func (m *DopeMutation) WalletCleared() bool {
	return m.clearedwallet
}

// WalletID returns the "wallet" edge ID in the mutation.
func (m *DopeMutation) WalletID() (id string, exists bool) {
	if m.wallet != nil {
		return *m.wallet, true
	}
	return
}

// WalletIDs returns the "wallet" edge IDs in the mutation.
// Note that IDs always returns len(IDs) <= 1 for unique edges, and you should use
// WalletID instead. It exists only for internal usage by the builders.
func (m *DopeMutation) WalletIDs() (ids []string) {
	if id := m.wallet; id != nil {
		ids = append(ids, *id)
	}
	return
}

// ResetWallet resets all changes to the "wallet" edge.
func (m *DopeMutation) ResetWallet() {
	m.wallet = nil
	m.clearedwallet = false
}

// Where appends a list predicates to the DopeMutation builder.
func (m *DopeMutation) Where(ps ...predicate.Dope) {
	m.predicates = append(m.predicates, ps...)
}

// Op returns the operation name.
func (m *DopeMutation) Op() Op {
	return m.op
}

// Type returns the node type of this mutation (Dope).
func (m *DopeMutation) Type() string {
	return m.typ
}

// Fields returns all fields that were changed during this mutation. Note that in
// order to get all numeric fields that were incremented/decremented, call
// AddedFields().
func (m *DopeMutation) Fields() []string {
	fields := make([]string, 0, 11)
	if m.clothes != nil {
		fields = append(fields, dope.FieldClothes)
	}
	if m.foot != nil {
		fields = append(fields, dope.FieldFoot)
	}
	if m.hand != nil {
		fields = append(fields, dope.FieldHand)
	}
	if m.neck != nil {
		fields = append(fields, dope.FieldNeck)
	}
	if m.ring != nil {
		fields = append(fields, dope.FieldRing)
	}
	if m.waist != nil {
		fields = append(fields, dope.FieldWaist)
	}
	if m.weapon != nil {
		fields = append(fields, dope.FieldWeapon)
	}
	if m.drugs != nil {
		fields = append(fields, dope.FieldDrugs)
	}
	if m.vehicle != nil {
		fields = append(fields, dope.FieldVehicle)
	}
	if m.claimed != nil {
		fields = append(fields, dope.FieldClaimed)
	}
	if m.opened != nil {
		fields = append(fields, dope.FieldOpened)
	}
	return fields
}

// Field returns the value of a field with the given name. The second boolean
// return value indicates that this field was not set, or was not defined in the
// schema.
func (m *DopeMutation) Field(name string) (ent.Value, bool) {
	switch name {
	case dope.FieldClothes:
		return m.Clothes()
	case dope.FieldFoot:
		return m.Foot()
	case dope.FieldHand:
		return m.Hand()
	case dope.FieldNeck:
		return m.Neck()
	case dope.FieldRing:
		return m.Ring()
	case dope.FieldWaist:
		return m.Waist()
	case dope.FieldWeapon:
		return m.Weapon()
	case dope.FieldDrugs:
		return m.Drugs()
	case dope.FieldVehicle:
		return m.Vehicle()
	case dope.FieldClaimed:
		return m.Claimed()
	case dope.FieldOpened:
		return m.Opened()
	}
	return nil, false
}

// OldField returns the old value of the field from the database. An error is
// returned if the mutation operation is not UpdateOne, or the query to the
// database failed.
func (m *DopeMutation) OldField(ctx context.Context, name string) (ent.Value, error) {
	switch name {
	case dope.FieldClothes:
		return m.OldClothes(ctx)
	case dope.FieldFoot:
		return m.OldFoot(ctx)
	case dope.FieldHand:
		return m.OldHand(ctx)
	case dope.FieldNeck:
		return m.OldNeck(ctx)
	case dope.FieldRing:
		return m.OldRing(ctx)
	case dope.FieldWaist:
		return m.OldWaist(ctx)
	case dope.FieldWeapon:
		return m.OldWeapon(ctx)
	case dope.FieldDrugs:
		return m.OldDrugs(ctx)
	case dope.FieldVehicle:
		return m.OldVehicle(ctx)
	case dope.FieldClaimed:
		return m.OldClaimed(ctx)
	case dope.FieldOpened:
		return m.OldOpened(ctx)
	}
	return nil, fmt.Errorf("unknown Dope field %s", name)
}

// SetField sets the value of a field with the given name. It returns an error if
// the field is not defined in the schema, or if the type mismatched the field
// type.
func (m *DopeMutation) SetField(name string, value ent.Value) error {
	switch name {
	case dope.FieldClothes:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetClothes(v)
		return nil
	case dope.FieldFoot:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetFoot(v)
		return nil
	case dope.FieldHand:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetHand(v)
		return nil
	case dope.FieldNeck:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetNeck(v)
		return nil
	case dope.FieldRing:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetRing(v)
		return nil
	case dope.FieldWaist:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetWaist(v)
		return nil
	case dope.FieldWeapon:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetWeapon(v)
		return nil
	case dope.FieldDrugs:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetDrugs(v)
		return nil
	case dope.FieldVehicle:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetVehicle(v)
		return nil
	case dope.FieldClaimed:
		v, ok := value.(bool)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetClaimed(v)
		return nil
	case dope.FieldOpened:
		v, ok := value.(bool)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetOpened(v)
		return nil
	}
	return fmt.Errorf("unknown Dope field %s", name)
}

// AddedFields returns all numeric fields that were incremented/decremented during
// this mutation.
func (m *DopeMutation) AddedFields() []string {
	return nil
}

// AddedField returns the numeric value that was incremented/decremented on a field
// with the given name. The second boolean return value indicates that this field
// was not set, or was not defined in the schema.
func (m *DopeMutation) AddedField(name string) (ent.Value, bool) {
	return nil, false
}

// AddField adds the value to the field with the given name. It returns an error if
// the field is not defined in the schema, or if the type mismatched the field
// type.
func (m *DopeMutation) AddField(name string, value ent.Value) error {
	switch name {
	}
	return fmt.Errorf("unknown Dope numeric field %s", name)
}

// ClearedFields returns all nullable fields that were cleared during this
// mutation.
func (m *DopeMutation) ClearedFields() []string {
	return nil
}

// FieldCleared returns a boolean indicating if a field with the given name was
// cleared in this mutation.
func (m *DopeMutation) FieldCleared(name string) bool {
	_, ok := m.clearedFields[name]
	return ok
}

// ClearField clears the value of the field with the given name. It returns an
// error if the field is not defined in the schema.
func (m *DopeMutation) ClearField(name string) error {
	return fmt.Errorf("unknown Dope nullable field %s", name)
}

// ResetField resets all changes in the mutation for the field with the given name.
// It returns an error if the field is not defined in the schema.
func (m *DopeMutation) ResetField(name string) error {
	switch name {
	case dope.FieldClothes:
		m.ResetClothes()
		return nil
	case dope.FieldFoot:
		m.ResetFoot()
		return nil
	case dope.FieldHand:
		m.ResetHand()
		return nil
	case dope.FieldNeck:
		m.ResetNeck()
		return nil
	case dope.FieldRing:
		m.ResetRing()
		return nil
	case dope.FieldWaist:
		m.ResetWaist()
		return nil
	case dope.FieldWeapon:
		m.ResetWeapon()
		return nil
	case dope.FieldDrugs:
		m.ResetDrugs()
		return nil
	case dope.FieldVehicle:
		m.ResetVehicle()
		return nil
	case dope.FieldClaimed:
		m.ResetClaimed()
		return nil
	case dope.FieldOpened:
		m.ResetOpened()
		return nil
	}
	return fmt.Errorf("unknown Dope field %s", name)
}

// AddedEdges returns all edge names that were set/added in this mutation.
func (m *DopeMutation) AddedEdges() []string {
	edges := make([]string, 0, 1)
	if m.wallet != nil {
		edges = append(edges, dope.EdgeWallet)
	}
	return edges
}

// AddedIDs returns all IDs (to other nodes) that were added for the given edge
// name in this mutation.
func (m *DopeMutation) AddedIDs(name string) []ent.Value {
	switch name {
	case dope.EdgeWallet:
		if id := m.wallet; id != nil {
			return []ent.Value{*id}
		}
	}
	return nil
}

// RemovedEdges returns all edge names that were removed in this mutation.
func (m *DopeMutation) RemovedEdges() []string {
	edges := make([]string, 0, 1)
	return edges
}

// RemovedIDs returns all IDs (to other nodes) that were removed for the edge with
// the given name in this mutation.
func (m *DopeMutation) RemovedIDs(name string) []ent.Value {
	switch name {
	}
	return nil
}

// ClearedEdges returns all edge names that were cleared in this mutation.
func (m *DopeMutation) ClearedEdges() []string {
	edges := make([]string, 0, 1)
	if m.clearedwallet {
		edges = append(edges, dope.EdgeWallet)
	}
	return edges
}

// EdgeCleared returns a boolean which indicates if the edge with the given name
// was cleared in this mutation.
func (m *DopeMutation) EdgeCleared(name string) bool {
	switch name {
	case dope.EdgeWallet:
		return m.clearedwallet
	}
	return false
}

// ClearEdge clears the value of the edge with the given name. It returns an error
// if that edge is not defined in the schema.
func (m *DopeMutation) ClearEdge(name string) error {
	switch name {
	case dope.EdgeWallet:
		m.ClearWallet()
		return nil
	}
	return fmt.Errorf("unknown Dope unique edge %s", name)
}

// ResetEdge resets all changes to the edge with the given name in this mutation.
// It returns an error if the edge is not defined in the schema.
func (m *DopeMutation) ResetEdge(name string) error {
	switch name {
	case dope.EdgeWallet:
		m.ResetWallet()
		return nil
	}
	return fmt.Errorf("unknown Dope edge %s", name)
}

// WalletMutation represents an operation that mutates the Wallet nodes in the graph.
type WalletMutation struct {
	config
	op            Op
	typ           string
	id            *string
	paper         *schema.BigInt
	addpaper      *schema.BigInt
	clearedFields map[string]struct{}
	dopes         map[string]struct{}
	removeddopes  map[string]struct{}
	cleareddopes  bool
	done          bool
	oldValue      func(context.Context) (*Wallet, error)
	predicates    []predicate.Wallet
}

var _ ent.Mutation = (*WalletMutation)(nil)

// walletOption allows management of the mutation configuration using functional options.
type walletOption func(*WalletMutation)

// newWalletMutation creates new mutation for the Wallet entity.
func newWalletMutation(c config, op Op, opts ...walletOption) *WalletMutation {
	m := &WalletMutation{
		config:        c,
		op:            op,
		typ:           TypeWallet,
		clearedFields: make(map[string]struct{}),
	}
	for _, opt := range opts {
		opt(m)
	}
	return m
}

// withWalletID sets the ID field of the mutation.
func withWalletID(id string) walletOption {
	return func(m *WalletMutation) {
		var (
			err   error
			once  sync.Once
			value *Wallet
		)
		m.oldValue = func(ctx context.Context) (*Wallet, error) {
			once.Do(func() {
				if m.done {
					err = fmt.Errorf("querying old values post mutation is not allowed")
				} else {
					value, err = m.Client().Wallet.Get(ctx, id)
				}
			})
			return value, err
		}
		m.id = &id
	}
}

// withWallet sets the old Wallet of the mutation.
func withWallet(node *Wallet) walletOption {
	return func(m *WalletMutation) {
		m.oldValue = func(context.Context) (*Wallet, error) {
			return node, nil
		}
		m.id = &node.ID
	}
}

// Client returns a new `ent.Client` from the mutation. If the mutation was
// executed in a transaction (ent.Tx), a transactional client is returned.
func (m WalletMutation) Client() *Client {
	client := &Client{config: m.config}
	client.init()
	return client
}

// Tx returns an `ent.Tx` for mutations that were executed in transactions;
// it returns an error otherwise.
func (m WalletMutation) Tx() (*Tx, error) {
	if _, ok := m.driver.(*txDriver); !ok {
		return nil, fmt.Errorf("ent: mutation is not running in a transaction")
	}
	tx := &Tx{config: m.config}
	tx.init()
	return tx, nil
}

// ID returns the ID value in the mutation. Note that the ID is only available
// if it was provided to the builder or after it was returned from the database.
func (m *WalletMutation) ID() (id string, exists bool) {
	if m.id == nil {
		return
	}
	return *m.id, true
}

// SetPaper sets the "paper" field.
func (m *WalletMutation) SetPaper(si schema.BigInt) {
	m.paper = &si
	m.addpaper = nil
}

// Paper returns the value of the "paper" field in the mutation.
func (m *WalletMutation) Paper() (r schema.BigInt, exists bool) {
	v := m.paper
	if v == nil {
		return
	}
	return *v, true
}

// OldPaper returns the old "paper" field's value of the Wallet entity.
// If the Wallet object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *WalletMutation) OldPaper(ctx context.Context) (v schema.BigInt, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, fmt.Errorf("OldPaper is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, fmt.Errorf("OldPaper requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldPaper: %w", err)
	}
	return oldValue.Paper, nil
}

// AddPaper adds si to the "paper" field.
func (m *WalletMutation) AddPaper(si schema.BigInt) {
	if m.addpaper != nil {
		*m.addpaper = m.addpaper.Add(si)
	} else {
		m.addpaper = &si
	}
}

// AddedPaper returns the value that was added to the "paper" field in this mutation.
func (m *WalletMutation) AddedPaper() (r schema.BigInt, exists bool) {
	v := m.addpaper
	if v == nil {
		return
	}
	return *v, true
}

// ResetPaper resets all changes to the "paper" field.
func (m *WalletMutation) ResetPaper() {
	m.paper = nil
	m.addpaper = nil
}

// AddDopeIDs adds the "dopes" edge to the Dope entity by ids.
func (m *WalletMutation) AddDopeIDs(ids ...string) {
	if m.dopes == nil {
		m.dopes = make(map[string]struct{})
	}
	for i := range ids {
		m.dopes[ids[i]] = struct{}{}
	}
}

// ClearDopes clears the "dopes" edge to the Dope entity.
func (m *WalletMutation) ClearDopes() {
	m.cleareddopes = true
}

// DopesCleared reports if the "dopes" edge to the Dope entity was cleared.
func (m *WalletMutation) DopesCleared() bool {
	return m.cleareddopes
}

// RemoveDopeIDs removes the "dopes" edge to the Dope entity by IDs.
func (m *WalletMutation) RemoveDopeIDs(ids ...string) {
	if m.removeddopes == nil {
		m.removeddopes = make(map[string]struct{})
	}
	for i := range ids {
		delete(m.dopes, ids[i])
		m.removeddopes[ids[i]] = struct{}{}
	}
}

// RemovedDopes returns the removed IDs of the "dopes" edge to the Dope entity.
func (m *WalletMutation) RemovedDopesIDs() (ids []string) {
	for id := range m.removeddopes {
		ids = append(ids, id)
	}
	return
}

// DopesIDs returns the "dopes" edge IDs in the mutation.
func (m *WalletMutation) DopesIDs() (ids []string) {
	for id := range m.dopes {
		ids = append(ids, id)
	}
	return
}

// ResetDopes resets all changes to the "dopes" edge.
func (m *WalletMutation) ResetDopes() {
	m.dopes = nil
	m.cleareddopes = false
	m.removeddopes = nil
}

// Where appends a list predicates to the WalletMutation builder.
func (m *WalletMutation) Where(ps ...predicate.Wallet) {
	m.predicates = append(m.predicates, ps...)
}

// Op returns the operation name.
func (m *WalletMutation) Op() Op {
	return m.op
}

// Type returns the node type of this mutation (Wallet).
func (m *WalletMutation) Type() string {
	return m.typ
}

// Fields returns all fields that were changed during this mutation. Note that in
// order to get all numeric fields that were incremented/decremented, call
// AddedFields().
func (m *WalletMutation) Fields() []string {
	fields := make([]string, 0, 1)
	if m.paper != nil {
		fields = append(fields, wallet.FieldPaper)
	}
	return fields
}

// Field returns the value of a field with the given name. The second boolean
// return value indicates that this field was not set, or was not defined in the
// schema.
func (m *WalletMutation) Field(name string) (ent.Value, bool) {
	switch name {
	case wallet.FieldPaper:
		return m.Paper()
	}
	return nil, false
}

// OldField returns the old value of the field from the database. An error is
// returned if the mutation operation is not UpdateOne, or the query to the
// database failed.
func (m *WalletMutation) OldField(ctx context.Context, name string) (ent.Value, error) {
	switch name {
	case wallet.FieldPaper:
		return m.OldPaper(ctx)
	}
	return nil, fmt.Errorf("unknown Wallet field %s", name)
}

// SetField sets the value of a field with the given name. It returns an error if
// the field is not defined in the schema, or if the type mismatched the field
// type.
func (m *WalletMutation) SetField(name string, value ent.Value) error {
	switch name {
	case wallet.FieldPaper:
		v, ok := value.(schema.BigInt)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetPaper(v)
		return nil
	}
	return fmt.Errorf("unknown Wallet field %s", name)
}

// AddedFields returns all numeric fields that were incremented/decremented during
// this mutation.
func (m *WalletMutation) AddedFields() []string {
	var fields []string
	if m.addpaper != nil {
		fields = append(fields, wallet.FieldPaper)
	}
	return fields
}

// AddedField returns the numeric value that was incremented/decremented on a field
// with the given name. The second boolean return value indicates that this field
// was not set, or was not defined in the schema.
func (m *WalletMutation) AddedField(name string) (ent.Value, bool) {
	switch name {
	case wallet.FieldPaper:
		return m.AddedPaper()
	}
	return nil, false
}

// AddField adds the value to the field with the given name. It returns an error if
// the field is not defined in the schema, or if the type mismatched the field
// type.
func (m *WalletMutation) AddField(name string, value ent.Value) error {
	switch name {
	case wallet.FieldPaper:
		v, ok := value.(schema.BigInt)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.AddPaper(v)
		return nil
	}
	return fmt.Errorf("unknown Wallet numeric field %s", name)
}

// ClearedFields returns all nullable fields that were cleared during this
// mutation.
func (m *WalletMutation) ClearedFields() []string {
	return nil
}

// FieldCleared returns a boolean indicating if a field with the given name was
// cleared in this mutation.
func (m *WalletMutation) FieldCleared(name string) bool {
	_, ok := m.clearedFields[name]
	return ok
}

// ClearField clears the value of the field with the given name. It returns an
// error if the field is not defined in the schema.
func (m *WalletMutation) ClearField(name string) error {
	return fmt.Errorf("unknown Wallet nullable field %s", name)
}

// ResetField resets all changes in the mutation for the field with the given name.
// It returns an error if the field is not defined in the schema.
func (m *WalletMutation) ResetField(name string) error {
	switch name {
	case wallet.FieldPaper:
		m.ResetPaper()
		return nil
	}
	return fmt.Errorf("unknown Wallet field %s", name)
}

// AddedEdges returns all edge names that were set/added in this mutation.
func (m *WalletMutation) AddedEdges() []string {
	edges := make([]string, 0, 1)
	if m.dopes != nil {
		edges = append(edges, wallet.EdgeDopes)
	}
	return edges
}

// AddedIDs returns all IDs (to other nodes) that were added for the given edge
// name in this mutation.
func (m *WalletMutation) AddedIDs(name string) []ent.Value {
	switch name {
	case wallet.EdgeDopes:
		ids := make([]ent.Value, 0, len(m.dopes))
		for id := range m.dopes {
			ids = append(ids, id)
		}
		return ids
	}
	return nil
}

// RemovedEdges returns all edge names that were removed in this mutation.
func (m *WalletMutation) RemovedEdges() []string {
	edges := make([]string, 0, 1)
	if m.removeddopes != nil {
		edges = append(edges, wallet.EdgeDopes)
	}
	return edges
}

// RemovedIDs returns all IDs (to other nodes) that were removed for the edge with
// the given name in this mutation.
func (m *WalletMutation) RemovedIDs(name string) []ent.Value {
	switch name {
	case wallet.EdgeDopes:
		ids := make([]ent.Value, 0, len(m.removeddopes))
		for id := range m.removeddopes {
			ids = append(ids, id)
		}
		return ids
	}
	return nil
}

// ClearedEdges returns all edge names that were cleared in this mutation.
func (m *WalletMutation) ClearedEdges() []string {
	edges := make([]string, 0, 1)
	if m.cleareddopes {
		edges = append(edges, wallet.EdgeDopes)
	}
	return edges
}

// EdgeCleared returns a boolean which indicates if the edge with the given name
// was cleared in this mutation.
func (m *WalletMutation) EdgeCleared(name string) bool {
	switch name {
	case wallet.EdgeDopes:
		return m.cleareddopes
	}
	return false
}

// ClearEdge clears the value of the edge with the given name. It returns an error
// if that edge is not defined in the schema.
func (m *WalletMutation) ClearEdge(name string) error {
	switch name {
	}
	return fmt.Errorf("unknown Wallet unique edge %s", name)
}

// ResetEdge resets all changes to the edge with the given name in this mutation.
// It returns an error if the edge is not defined in the schema.
func (m *WalletMutation) ResetEdge(name string) error {
	switch name {
	case wallet.EdgeDopes:
		m.ResetDopes()
		return nil
	}
	return fmt.Errorf("unknown Wallet edge %s", name)
}
