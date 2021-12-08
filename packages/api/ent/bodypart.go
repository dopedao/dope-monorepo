// Code generated by entc, DO NOT EDIT.

package ent

import (
	"fmt"
	"strings"

	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/ent/bodypart"
	"github.com/dopedao/dope-monorepo/packages/api/ent/hustler"
)

// BodyPart is the model entity for the BodyPart schema.
type BodyPart struct {
	config `json:"-"`
	// ID of the ent.
	ID string `json:"id,omitempty"`
	// Type holds the value of the "type" field.
	Type bodypart.Type `json:"type,omitempty"`
	// Sex holds the value of the "sex" field.
	Sex bodypart.Sex `json:"sex,omitempty"`
	// Rle holds the value of the "rle" field.
	Rle string `json:"rle,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the BodyPartQuery when eager-loading is set.
	Edges             BodyPartEdges `json:"edges"`
	hustler_bodyparts *string
}

// BodyPartEdges holds the relations/edges for other nodes in the graph.
type BodyPartEdges struct {
	// Hustler holds the value of the hustler edge.
	Hustler *Hustler `json:"hustler,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [1]bool
}

// HustlerOrErr returns the Hustler value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e BodyPartEdges) HustlerOrErr() (*Hustler, error) {
	if e.loadedTypes[0] {
		if e.Hustler == nil {
			// The edge hustler was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: hustler.Label}
		}
		return e.Hustler, nil
	}
	return nil, &NotLoadedError{edge: "hustler"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*BodyPart) scanValues(columns []string) ([]interface{}, error) {
	values := make([]interface{}, len(columns))
	for i := range columns {
		switch columns[i] {
		case bodypart.FieldID, bodypart.FieldType, bodypart.FieldSex, bodypart.FieldRle:
			values[i] = new(sql.NullString)
		case bodypart.ForeignKeys[0]: // hustler_bodyparts
			values[i] = new(sql.NullString)
		default:
			return nil, fmt.Errorf("unexpected column %q for type BodyPart", columns[i])
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the BodyPart fields.
func (bp *BodyPart) assignValues(columns []string, values []interface{}) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case bodypart.FieldID:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value.Valid {
				bp.ID = value.String
			}
		case bodypart.FieldType:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field type", values[i])
			} else if value.Valid {
				bp.Type = bodypart.Type(value.String)
			}
		case bodypart.FieldSex:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field sex", values[i])
			} else if value.Valid {
				bp.Sex = bodypart.Sex(value.String)
			}
		case bodypart.FieldRle:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field rle", values[i])
			} else if value.Valid {
				bp.Rle = value.String
			}
		case bodypart.ForeignKeys[0]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field hustler_bodyparts", values[i])
			} else if value.Valid {
				bp.hustler_bodyparts = new(string)
				*bp.hustler_bodyparts = value.String
			}
		}
	}
	return nil
}

// QueryHustler queries the "hustler" edge of the BodyPart entity.
func (bp *BodyPart) QueryHustler() *HustlerQuery {
	return (&BodyPartClient{config: bp.config}).QueryHustler(bp)
}

// Update returns a builder for updating this BodyPart.
// Note that you need to call BodyPart.Unwrap() before calling this method if this BodyPart
// was returned from a transaction, and the transaction was committed or rolled back.
func (bp *BodyPart) Update() *BodyPartUpdateOne {
	return (&BodyPartClient{config: bp.config}).UpdateOne(bp)
}

// Unwrap unwraps the BodyPart entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (bp *BodyPart) Unwrap() *BodyPart {
	tx, ok := bp.config.driver.(*txDriver)
	if !ok {
		panic("ent: BodyPart is not a transactional entity")
	}
	bp.config.driver = tx.drv
	return bp
}

// String implements the fmt.Stringer.
func (bp *BodyPart) String() string {
	var builder strings.Builder
	builder.WriteString("BodyPart(")
	builder.WriteString(fmt.Sprintf("id=%v", bp.ID))
	builder.WriteString(", type=")
	builder.WriteString(fmt.Sprintf("%v", bp.Type))
	builder.WriteString(", sex=")
	builder.WriteString(fmt.Sprintf("%v", bp.Sex))
	builder.WriteString(", rle=")
	builder.WriteString(bp.Rle)
	builder.WriteByte(')')
	return builder.String()
}

// BodyParts is a parsable slice of BodyPart.
type BodyParts []*BodyPart

func (bp BodyParts) config(cfg config) {
	for _i := range bp {
		bp[_i].config = cfg
	}
}
