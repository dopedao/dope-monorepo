// Code generated by entc, DO NOT EDIT.

package amount

import (
	"fmt"
	"io"
	"strconv"

	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
)

const (
	// Label holds the string label denoting the amount type in the database.
	Label = "amount"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldType holds the string denoting the type field in the database.
	FieldType = "type"
	// FieldAmount holds the string denoting the amount field in the database.
	FieldAmount = "amount"
	// FieldAssetID holds the string denoting the asset_id field in the database.
	FieldAssetID = "asset_id"
	// Table holds the table name of the amount in the database.
	Table = "amounts"
)

// Columns holds all SQL columns for amount fields.
var Columns = []string{
	FieldID,
	FieldType,
	FieldAmount,
	FieldAssetID,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the "amounts"
// table and are not defined as standalone fields in the schema.
var ForeignKeys = []string{
	"listing_inputs",
	"listing_outputs",
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
	// DefaultAmount holds the default value on creation for the "amount" field.
	DefaultAmount func() schema.BigInt
	// DefaultAssetID holds the default value on creation for the "asset_id" field.
	DefaultAssetID func() schema.BigInt
)

// Type defines the type for the "type" enum field.
type Type string

// Type values.
const (
	TypeDOPE      Type = "DOPE"
	TypeETH       Type = "ETH"
	TypeEQUIPMENT Type = "EQUIPMENT"
	TypeHUSTLER   Type = "HUSTLER"
	TypePAPER     Type = "PAPER"
	TypeTURF      Type = "TURF"
)

func (_type Type) String() string {
	return string(_type)
}

// TypeValidator is a validator for the "type" field enum values. It is called by the builders before save.
func TypeValidator(_type Type) error {
	switch _type {
	case TypeDOPE, TypeETH, TypeEQUIPMENT, TypeHUSTLER, TypePAPER, TypeTURF:
		return nil
	default:
		return fmt.Errorf("amount: invalid enum value for type field: %q", _type)
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