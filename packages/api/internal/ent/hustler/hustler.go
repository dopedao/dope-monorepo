// Code generated by entc, DO NOT EDIT.

package hustler

import (
	"fmt"
	"io"
	"strconv"
	"time"
)

const (
	// Label holds the string label denoting the hustler type in the database.
	Label = "hustler"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldType holds the string denoting the type field in the database.
	FieldType = "type"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldTitle holds the string denoting the title field in the database.
	FieldTitle = "title"
	// FieldColor holds the string denoting the color field in the database.
	FieldColor = "color"
	// FieldBackground holds the string denoting the background field in the database.
	FieldBackground = "background"
	// FieldAge holds the string denoting the age field in the database.
	FieldAge = "age"
	// FieldSex holds the string denoting the sex field in the database.
	FieldSex = "sex"
	// FieldViewbox holds the string denoting the viewbox field in the database.
	FieldViewbox = "viewbox"
	// FieldOrder holds the string denoting the order field in the database.
	FieldOrder = "order"
	// FieldSvg holds the string denoting the svg field in the database.
	FieldSvg = "svg"
	// FieldCreatedAt holds the string denoting the created_at field in the database.
	FieldCreatedAt = "created_at"
	// EdgeWallet holds the string denoting the wallet edge name in mutations.
	EdgeWallet = "wallet"
	// EdgeWeapon holds the string denoting the weapon edge name in mutations.
	EdgeWeapon = "weapon"
	// EdgeClothes holds the string denoting the clothes edge name in mutations.
	EdgeClothes = "clothes"
	// EdgeVehicle holds the string denoting the vehicle edge name in mutations.
	EdgeVehicle = "vehicle"
	// EdgeWaist holds the string denoting the waist edge name in mutations.
	EdgeWaist = "waist"
	// EdgeFoot holds the string denoting the foot edge name in mutations.
	EdgeFoot = "foot"
	// EdgeHand holds the string denoting the hand edge name in mutations.
	EdgeHand = "hand"
	// EdgeDrug holds the string denoting the drug edge name in mutations.
	EdgeDrug = "drug"
	// EdgeNeck holds the string denoting the neck edge name in mutations.
	EdgeNeck = "neck"
	// EdgeRing holds the string denoting the ring edge name in mutations.
	EdgeRing = "ring"
	// EdgeAccessory holds the string denoting the accessory edge name in mutations.
	EdgeAccessory = "accessory"
	// EdgeBody holds the string denoting the body edge name in mutations.
	EdgeBody = "body"
	// EdgeHair holds the string denoting the hair edge name in mutations.
	EdgeHair = "hair"
	// EdgeBeard holds the string denoting the beard edge name in mutations.
	EdgeBeard = "beard"
	// EdgeIndex holds the string denoting the index edge name in mutations.
	EdgeIndex = "index"
	// Table holds the table name of the hustler in the database.
	Table = "hustlers"
	// WalletTable is the table that holds the wallet relation/edge.
	WalletTable = "hustlers"
	// WalletInverseTable is the table name for the Wallet entity.
	// It exists in this package in order to avoid circular dependency with the "wallet" package.
	WalletInverseTable = "wallets"
	// WalletColumn is the table column denoting the wallet relation/edge.
	WalletColumn = "wallet_hustlers"
	// WeaponTable is the table that holds the weapon relation/edge.
	WeaponTable = "hustlers"
	// WeaponInverseTable is the table name for the Item entity.
	// It exists in this package in order to avoid circular dependency with the "item" package.
	WeaponInverseTable = "items"
	// WeaponColumn is the table column denoting the weapon relation/edge.
	WeaponColumn = "item_hustler_weapons"
	// ClothesTable is the table that holds the clothes relation/edge.
	ClothesTable = "hustlers"
	// ClothesInverseTable is the table name for the Item entity.
	// It exists in this package in order to avoid circular dependency with the "item" package.
	ClothesInverseTable = "items"
	// ClothesColumn is the table column denoting the clothes relation/edge.
	ClothesColumn = "item_hustler_clothes"
	// VehicleTable is the table that holds the vehicle relation/edge.
	VehicleTable = "hustlers"
	// VehicleInverseTable is the table name for the Item entity.
	// It exists in this package in order to avoid circular dependency with the "item" package.
	VehicleInverseTable = "items"
	// VehicleColumn is the table column denoting the vehicle relation/edge.
	VehicleColumn = "item_hustler_vehicles"
	// WaistTable is the table that holds the waist relation/edge.
	WaistTable = "hustlers"
	// WaistInverseTable is the table name for the Item entity.
	// It exists in this package in order to avoid circular dependency with the "item" package.
	WaistInverseTable = "items"
	// WaistColumn is the table column denoting the waist relation/edge.
	WaistColumn = "item_hustler_waists"
	// FootTable is the table that holds the foot relation/edge.
	FootTable = "hustlers"
	// FootInverseTable is the table name for the Item entity.
	// It exists in this package in order to avoid circular dependency with the "item" package.
	FootInverseTable = "items"
	// FootColumn is the table column denoting the foot relation/edge.
	FootColumn = "item_hustler_feet"
	// HandTable is the table that holds the hand relation/edge.
	HandTable = "hustlers"
	// HandInverseTable is the table name for the Item entity.
	// It exists in this package in order to avoid circular dependency with the "item" package.
	HandInverseTable = "items"
	// HandColumn is the table column denoting the hand relation/edge.
	HandColumn = "item_hustler_hands"
	// DrugTable is the table that holds the drug relation/edge.
	DrugTable = "hustlers"
	// DrugInverseTable is the table name for the Item entity.
	// It exists in this package in order to avoid circular dependency with the "item" package.
	DrugInverseTable = "items"
	// DrugColumn is the table column denoting the drug relation/edge.
	DrugColumn = "item_hustler_drugs"
	// NeckTable is the table that holds the neck relation/edge.
	NeckTable = "hustlers"
	// NeckInverseTable is the table name for the Item entity.
	// It exists in this package in order to avoid circular dependency with the "item" package.
	NeckInverseTable = "items"
	// NeckColumn is the table column denoting the neck relation/edge.
	NeckColumn = "item_hustler_necks"
	// RingTable is the table that holds the ring relation/edge.
	RingTable = "hustlers"
	// RingInverseTable is the table name for the Item entity.
	// It exists in this package in order to avoid circular dependency with the "item" package.
	RingInverseTable = "items"
	// RingColumn is the table column denoting the ring relation/edge.
	RingColumn = "item_hustler_rings"
	// AccessoryTable is the table that holds the accessory relation/edge.
	AccessoryTable = "hustlers"
	// AccessoryInverseTable is the table name for the Item entity.
	// It exists in this package in order to avoid circular dependency with the "item" package.
	AccessoryInverseTable = "items"
	// AccessoryColumn is the table column denoting the accessory relation/edge.
	AccessoryColumn = "item_hustler_accessories"
	// BodyTable is the table that holds the body relation/edge.
	BodyTable = "hustlers"
	// BodyInverseTable is the table name for the BodyPart entity.
	// It exists in this package in order to avoid circular dependency with the "bodypart" package.
	BodyInverseTable = "body_parts"
	// BodyColumn is the table column denoting the body relation/edge.
	BodyColumn = "body_part_hustler_bodies"
	// HairTable is the table that holds the hair relation/edge.
	HairTable = "hustlers"
	// HairInverseTable is the table name for the BodyPart entity.
	// It exists in this package in order to avoid circular dependency with the "bodypart" package.
	HairInverseTable = "body_parts"
	// HairColumn is the table column denoting the hair relation/edge.
	HairColumn = "body_part_hustler_hairs"
	// BeardTable is the table that holds the beard relation/edge.
	BeardTable = "hustlers"
	// BeardInverseTable is the table name for the BodyPart entity.
	// It exists in this package in order to avoid circular dependency with the "bodypart" package.
	BeardInverseTable = "body_parts"
	// BeardColumn is the table column denoting the beard relation/edge.
	BeardColumn = "body_part_hustler_beards"
	// IndexTable is the table that holds the index relation/edge.
	IndexTable = "search_index"
	// IndexInverseTable is the table name for the Search entity.
	// It exists in this package in order to avoid circular dependency with the "search" package.
	IndexInverseTable = "search_index"
	// IndexColumn is the table column denoting the index relation/edge.
	IndexColumn = "hustler_index"
)

// Columns holds all SQL columns for hustler fields.
var Columns = []string{
	FieldID,
	FieldType,
	FieldName,
	FieldTitle,
	FieldColor,
	FieldBackground,
	FieldAge,
	FieldSex,
	FieldViewbox,
	FieldOrder,
	FieldSvg,
	FieldCreatedAt,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the "hustlers"
// table and are not defined as standalone fields in the schema.
var ForeignKeys = []string{
	"body_part_hustler_bodies",
	"body_part_hustler_hairs",
	"body_part_hustler_beards",
	"item_hustler_weapons",
	"item_hustler_clothes",
	"item_hustler_vehicles",
	"item_hustler_waists",
	"item_hustler_feet",
	"item_hustler_hands",
	"item_hustler_drugs",
	"item_hustler_necks",
	"item_hustler_rings",
	"item_hustler_accessories",
	"wallet_hustlers",
}

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	for i := range ForeignKeys {
		if column == ForeignKeys[i] {
			return true
		}
	}
	return false
}

var (
	// DefaultViewbox holds the default value on creation for the "viewbox" field.
	DefaultViewbox []int
	// DefaultOrder holds the default value on creation for the "order" field.
	DefaultOrder []int
	// DefaultCreatedAt holds the default value on creation for the "created_at" field.
	DefaultCreatedAt func() time.Time
)

// Type defines the type for the "type" enum field.
type Type string

// Type values.
const (
	TypeORIGINAL_GANGSTA Type = "ORIGINAL_GANGSTA"
	TypeREGULAR          Type = "REGULAR"
)

func (_type Type) String() string {
	return string(_type)
}

// TypeValidator is a validator for the "type" field enum values. It is called by the builders before save.
func TypeValidator(_type Type) error {
	switch _type {
	case TypeORIGINAL_GANGSTA, TypeREGULAR:
		return nil
	default:
		return fmt.Errorf("hustler: invalid enum value for type field: %q", _type)
	}
}

// Sex defines the type for the "sex" enum field.
type Sex string

// SexMALE is the default value of the Sex enum.
const DefaultSex = SexMALE

// Sex values.
const (
	SexMALE   Sex = "MALE"
	SexFEMALE Sex = "FEMALE"
)

func (s Sex) String() string {
	return string(s)
}

// SexValidator is a validator for the "sex" field enum values. It is called by the builders before save.
func SexValidator(s Sex) error {
	switch s {
	case SexMALE, SexFEMALE:
		return nil
	default:
		return fmt.Errorf("hustler: invalid enum value for sex field: %q", s)
	}
}

// MarshalGQL implements graphql.Marshaler interface.
func (_type Type) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(_type.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (_type *Type) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*_type = Type(str)
	if err := TypeValidator(*_type); err != nil {
		return fmt.Errorf("%s is not a valid Type", str)
	}
	return nil
}

// MarshalGQL implements graphql.Marshaler interface.
func (s Sex) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(s.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (s *Sex) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*s = Sex(str)
	if err := SexValidator(*s); err != nil {
		return fmt.Errorf("%s is not a valid Sex", str)
	}
	return nil
}
