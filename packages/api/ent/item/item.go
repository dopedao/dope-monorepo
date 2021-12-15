// Code generated by entc, DO NOT EDIT.

package item

import (
	"fmt"
	"io"
	"strconv"
	"time"
)

const (
	// Label holds the string label denoting the item type in the database.
	Label = "item"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldType holds the string denoting the type field in the database.
	FieldType = "type"
	// FieldNamePrefix holds the string denoting the name_prefix field in the database.
	FieldNamePrefix = "name_prefix"
	// FieldNameSuffix holds the string denoting the name_suffix field in the database.
	FieldNameSuffix = "name_suffix"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldSuffix holds the string denoting the suffix field in the database.
	FieldSuffix = "suffix"
	// FieldAugmented holds the string denoting the augmented field in the database.
	FieldAugmented = "augmented"
	// FieldRles holds the string denoting the rles field in the database.
	FieldRles = "rles"
	// FieldSvg holds the string denoting the svg field in the database.
	FieldSvg = "svg"
	// FieldCreatedAt holds the string denoting the created_at field in the database.
	FieldCreatedAt = "created_at"
	// EdgeWallets holds the string denoting the wallets edge name in mutations.
	EdgeWallets = "wallets"
	// EdgeDopes holds the string denoting the dopes edge name in mutations.
	EdgeDopes = "dopes"
	// EdgeHustlerWeapons holds the string denoting the hustler_weapons edge name in mutations.
	EdgeHustlerWeapons = "hustler_weapons"
	// EdgeHustlerClothes holds the string denoting the hustler_clothes edge name in mutations.
	EdgeHustlerClothes = "hustler_clothes"
	// EdgeHustlerVehicles holds the string denoting the hustler_vehicles edge name in mutations.
	EdgeHustlerVehicles = "hustler_vehicles"
	// EdgeHustlerWaists holds the string denoting the hustler_waists edge name in mutations.
	EdgeHustlerWaists = "hustler_waists"
	// EdgeHustlerFeet holds the string denoting the hustler_feet edge name in mutations.
	EdgeHustlerFeet = "hustler_feet"
	// EdgeHustlerHands holds the string denoting the hustler_hands edge name in mutations.
	EdgeHustlerHands = "hustler_hands"
	// EdgeHustlerDrugs holds the string denoting the hustler_drugs edge name in mutations.
	EdgeHustlerDrugs = "hustler_drugs"
	// EdgeHustlerNecks holds the string denoting the hustler_necks edge name in mutations.
	EdgeHustlerNecks = "hustler_necks"
	// EdgeHustlerRings holds the string denoting the hustler_rings edge name in mutations.
	EdgeHustlerRings = "hustler_rings"
	// EdgeHustlerAccessories holds the string denoting the hustler_accessories edge name in mutations.
	EdgeHustlerAccessories = "hustler_accessories"
	// EdgeBase holds the string denoting the base edge name in mutations.
	EdgeBase = "base"
	// EdgeDerivative holds the string denoting the derivative edge name in mutations.
	EdgeDerivative = "derivative"
	// Table holds the table name of the item in the database.
	Table = "items"
	// WalletsTable is the table that holds the wallets relation/edge.
	WalletsTable = "wallet_items"
	// WalletsInverseTable is the table name for the WalletItems entity.
	// It exists in this package in order to avoid circular dependency with the "walletitems" package.
	WalletsInverseTable = "wallet_items"
	// WalletsColumn is the table column denoting the wallets relation/edge.
	WalletsColumn = "item_wallets"
	// DopesTable is the table that holds the dopes relation/edge. The primary key declared below.
	DopesTable = "dope_items"
	// DopesInverseTable is the table name for the Dope entity.
	// It exists in this package in order to avoid circular dependency with the "dope" package.
	DopesInverseTable = "dopes"
	// HustlerWeaponsTable is the table that holds the hustler_weapons relation/edge.
	HustlerWeaponsTable = "hustlers"
	// HustlerWeaponsInverseTable is the table name for the Hustler entity.
	// It exists in this package in order to avoid circular dependency with the "hustler" package.
	HustlerWeaponsInverseTable = "hustlers"
	// HustlerWeaponsColumn is the table column denoting the hustler_weapons relation/edge.
	HustlerWeaponsColumn = "item_hustler_weapons"
	// HustlerClothesTable is the table that holds the hustler_clothes relation/edge.
	HustlerClothesTable = "hustlers"
	// HustlerClothesInverseTable is the table name for the Hustler entity.
	// It exists in this package in order to avoid circular dependency with the "hustler" package.
	HustlerClothesInverseTable = "hustlers"
	// HustlerClothesColumn is the table column denoting the hustler_clothes relation/edge.
	HustlerClothesColumn = "item_hustler_clothes"
	// HustlerVehiclesTable is the table that holds the hustler_vehicles relation/edge.
	HustlerVehiclesTable = "hustlers"
	// HustlerVehiclesInverseTable is the table name for the Hustler entity.
	// It exists in this package in order to avoid circular dependency with the "hustler" package.
	HustlerVehiclesInverseTable = "hustlers"
	// HustlerVehiclesColumn is the table column denoting the hustler_vehicles relation/edge.
	HustlerVehiclesColumn = "item_hustler_vehicles"
	// HustlerWaistsTable is the table that holds the hustler_waists relation/edge.
	HustlerWaistsTable = "hustlers"
	// HustlerWaistsInverseTable is the table name for the Hustler entity.
	// It exists in this package in order to avoid circular dependency with the "hustler" package.
	HustlerWaistsInverseTable = "hustlers"
	// HustlerWaistsColumn is the table column denoting the hustler_waists relation/edge.
	HustlerWaistsColumn = "item_hustler_waists"
	// HustlerFeetTable is the table that holds the hustler_feet relation/edge.
	HustlerFeetTable = "hustlers"
	// HustlerFeetInverseTable is the table name for the Hustler entity.
	// It exists in this package in order to avoid circular dependency with the "hustler" package.
	HustlerFeetInverseTable = "hustlers"
	// HustlerFeetColumn is the table column denoting the hustler_feet relation/edge.
	HustlerFeetColumn = "item_hustler_feet"
	// HustlerHandsTable is the table that holds the hustler_hands relation/edge.
	HustlerHandsTable = "hustlers"
	// HustlerHandsInverseTable is the table name for the Hustler entity.
	// It exists in this package in order to avoid circular dependency with the "hustler" package.
	HustlerHandsInverseTable = "hustlers"
	// HustlerHandsColumn is the table column denoting the hustler_hands relation/edge.
	HustlerHandsColumn = "item_hustler_hands"
	// HustlerDrugsTable is the table that holds the hustler_drugs relation/edge.
	HustlerDrugsTable = "hustlers"
	// HustlerDrugsInverseTable is the table name for the Hustler entity.
	// It exists in this package in order to avoid circular dependency with the "hustler" package.
	HustlerDrugsInverseTable = "hustlers"
	// HustlerDrugsColumn is the table column denoting the hustler_drugs relation/edge.
	HustlerDrugsColumn = "item_hustler_drugs"
	// HustlerNecksTable is the table that holds the hustler_necks relation/edge.
	HustlerNecksTable = "hustlers"
	// HustlerNecksInverseTable is the table name for the Hustler entity.
	// It exists in this package in order to avoid circular dependency with the "hustler" package.
	HustlerNecksInverseTable = "hustlers"
	// HustlerNecksColumn is the table column denoting the hustler_necks relation/edge.
	HustlerNecksColumn = "item_hustler_necks"
	// HustlerRingsTable is the table that holds the hustler_rings relation/edge.
	HustlerRingsTable = "hustlers"
	// HustlerRingsInverseTable is the table name for the Hustler entity.
	// It exists in this package in order to avoid circular dependency with the "hustler" package.
	HustlerRingsInverseTable = "hustlers"
	// HustlerRingsColumn is the table column denoting the hustler_rings relation/edge.
	HustlerRingsColumn = "item_hustler_rings"
	// HustlerAccessoriesTable is the table that holds the hustler_accessories relation/edge.
	HustlerAccessoriesTable = "hustlers"
	// HustlerAccessoriesInverseTable is the table name for the Hustler entity.
	// It exists in this package in order to avoid circular dependency with the "hustler" package.
	HustlerAccessoriesInverseTable = "hustlers"
	// HustlerAccessoriesColumn is the table column denoting the hustler_accessories relation/edge.
	HustlerAccessoriesColumn = "item_hustler_accessories"
	// BaseTable is the table that holds the base relation/edge.
	BaseTable = "items"
	// BaseColumn is the table column denoting the base relation/edge.
	BaseColumn = "item_derivative"
	// DerivativeTable is the table that holds the derivative relation/edge.
	DerivativeTable = "items"
	// DerivativeColumn is the table column denoting the derivative relation/edge.
	DerivativeColumn = "item_derivative"
)

// Columns holds all SQL columns for item fields.
var Columns = []string{
	FieldID,
	FieldType,
	FieldNamePrefix,
	FieldNameSuffix,
	FieldName,
	FieldSuffix,
	FieldAugmented,
	FieldRles,
	FieldSvg,
	FieldCreatedAt,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the "items"
// table and are not defined as standalone fields in the schema.
var ForeignKeys = []string{
	"item_derivative",
}

var (
	// DopesPrimaryKey and DopesColumn2 are the table columns denoting the
	// primary key for the dopes relation (M2M).
	DopesPrimaryKey = []string{"dope_id", "item_id"}
)

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
	// DefaultCreatedAt holds the default value on creation for the "created_at" field.
	DefaultCreatedAt func() time.Time
)

// Type defines the type for the "type" enum field.
type Type string

// Type values.
const (
	TypeWeapon    Type = "weapon"
	TypeClothes   Type = "clothes"
	TypeVehicle   Type = "vehicle"
	TypeWaist     Type = "waist"
	TypeFoot      Type = "foot"
	TypeHand      Type = "hand"
	TypeDrugs     Type = "drugs"
	TypeNeck      Type = "neck"
	TypeRing      Type = "ring"
	TypeAccessory Type = "accessory"
)

func (_type Type) String() string {
	return string(_type)
}

// TypeValidator is a validator for the "type" field enum values. It is called by the builders before save.
func TypeValidator(_type Type) error {
	switch _type {
	case TypeWeapon, TypeClothes, TypeVehicle, TypeWaist, TypeFoot, TypeHand, TypeDrugs, TypeNeck, TypeRing, TypeAccessory:
		return nil
	default:
		return fmt.Errorf("item: invalid enum value for type field: %q", _type)
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
