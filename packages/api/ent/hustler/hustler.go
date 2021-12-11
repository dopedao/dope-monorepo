// Code generated by entc, DO NOT EDIT.

package hustler

import (
	"fmt"
	"io"
	"strconv"
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
	// EdgeWallet holds the string denoting the wallet edge name in mutations.
	EdgeWallet = "wallet"
	// EdgeItems holds the string denoting the items edge name in mutations.
	EdgeItems = "items"
	// EdgeBody holds the string denoting the body edge name in mutations.
	EdgeBody = "body"
	// EdgeHair holds the string denoting the hair edge name in mutations.
	EdgeHair = "hair"
	// EdgeBeard holds the string denoting the beard edge name in mutations.
	EdgeBeard = "beard"
	// Table holds the table name of the hustler in the database.
	Table = "hustlers"
	// WalletTable is the table that holds the wallet relation/edge.
	WalletTable = "hustlers"
	// WalletInverseTable is the table name for the Wallet entity.
	// It exists in this package in order to avoid circular dependency with the "wallet" package.
	WalletInverseTable = "wallets"
	// WalletColumn is the table column denoting the wallet relation/edge.
	WalletColumn = "wallet_hustlers"
	// ItemsTable is the table that holds the items relation/edge.
	ItemsTable = "items"
	// ItemsInverseTable is the table name for the Item entity.
	// It exists in this package in order to avoid circular dependency with the "item" package.
	ItemsInverseTable = "items"
	// ItemsColumn is the table column denoting the items relation/edge.
	ItemsColumn = "hustler_items"
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
}

// ForeignKeys holds the SQL foreign-keys that are owned by the "hustlers"
// table and are not defined as standalone fields in the schema.
var ForeignKeys = []string{
	"body_part_hustler_bodies",
	"body_part_hustler_hairs",
	"body_part_hustler_beards",
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
)

// Type defines the type for the "type" enum field.
type Type string

// Type values.
const (
	TypeOriginalGangsta Type = "original_gangsta"
	TypeRegular         Type = "regular"
)

func (_type Type) String() string {
	return string(_type)
}

// TypeValidator is a validator for the "type" field enum values. It is called by the builders before save.
func TypeValidator(_type Type) error {
	switch _type {
	case TypeOriginalGangsta, TypeRegular:
		return nil
	default:
		return fmt.Errorf("hustler: invalid enum value for type field: %q", _type)
	}
}

// Sex defines the type for the "sex" enum field.
type Sex string

// SexMale is the default value of the Sex enum.
const DefaultSex = SexMale

// Sex values.
const (
	SexMale   Sex = "male"
	SexFemale Sex = "female"
)

func (s Sex) String() string {
	return string(s)
}

// SexValidator is a validator for the "sex" field enum values. It is called by the builders before save.
func SexValidator(s Sex) error {
	switch s {
	case SexMale, SexFemale:
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
