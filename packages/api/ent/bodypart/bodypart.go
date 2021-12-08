// Code generated by entc, DO NOT EDIT.

package bodypart

import (
	"fmt"
	"io"
	"strconv"
)

const (
	// Label holds the string label denoting the bodypart type in the database.
	Label = "body_part"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldType holds the string denoting the type field in the database.
	FieldType = "type"
	// FieldSex holds the string denoting the sex field in the database.
	FieldSex = "sex"
	// FieldRle holds the string denoting the rle field in the database.
	FieldRle = "rle"
	// EdgeHustler holds the string denoting the hustler edge name in mutations.
	EdgeHustler = "hustler"
	// Table holds the table name of the bodypart in the database.
	Table = "body_parts"
	// HustlerTable is the table that holds the hustler relation/edge.
	HustlerTable = "body_parts"
	// HustlerInverseTable is the table name for the Hustler entity.
	// It exists in this package in order to avoid circular dependency with the "hustler" package.
	HustlerInverseTable = "hustlers"
	// HustlerColumn is the table column denoting the hustler relation/edge.
	HustlerColumn = "hustler_bodyparts"
)

// Columns holds all SQL columns for bodypart fields.
var Columns = []string{
	FieldID,
	FieldType,
	FieldSex,
	FieldRle,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the "body_parts"
// table and are not defined as standalone fields in the schema.
var ForeignKeys = []string{
	"hustler_bodyparts",
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

// Type defines the type for the "type" enum field.
type Type string

// Type values.
const (
	TypeBody  Type = "body"
	TypeHair  Type = "hair"
	TypeBeard Type = "beard"
)

func (_type Type) String() string {
	return string(_type)
}

// TypeValidator is a validator for the "type" field enum values. It is called by the builders before save.
func TypeValidator(_type Type) error {
	switch _type {
	case TypeBody, TypeHair, TypeBeard:
		return nil
	default:
		return fmt.Errorf("bodypart: invalid enum value for type field: %q", _type)
	}
}

// Sex defines the type for the "sex" enum field.
type Sex string

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
		return fmt.Errorf("bodypart: invalid enum value for sex field: %q", s)
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
