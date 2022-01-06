// Code generated by entc, DO NOT EDIT.

package ent

import (
	"fmt"
	"strings"

	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/ent/dope"
	"github.com/dopedao/dope-monorepo/packages/api/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/ent/item"
	"github.com/dopedao/dope-monorepo/packages/api/ent/search"
)

// Search is the model entity for the Search schema.
type Search struct {
	config `json:"-"`
	// ID of the ent.
	ID string `json:"id,omitempty"`
	// Type holds the value of the "type" field.
	Type search.Type `json:"type,omitempty"`
	// Greatness holds the value of the "greatness" field.
	Greatness int `json:"greatness,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the SearchQuery when eager-loading is set.
	Edges         SearchEdges `json:"edges"`
	dope_index    *string
	hustler_index *string
	item_index    *string
}

// SearchEdges holds the relations/edges for other nodes in the graph.
type SearchEdges struct {
	// Dope holds the value of the dope edge.
	Dope *Dope `json:"dope,omitempty"`
	// Item holds the value of the item edge.
	Item *Item `json:"item,omitempty"`
	// Hustler holds the value of the hustler edge.
	Hustler *Hustler `json:"hustler,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [3]bool
}

// DopeOrErr returns the Dope value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e SearchEdges) DopeOrErr() (*Dope, error) {
	if e.loadedTypes[0] {
		if e.Dope == nil {
			// The edge dope was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: dope.Label}
		}
		return e.Dope, nil
	}
	return nil, &NotLoadedError{edge: "dope"}
}

// ItemOrErr returns the Item value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e SearchEdges) ItemOrErr() (*Item, error) {
	if e.loadedTypes[1] {
		if e.Item == nil {
			// The edge item was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: item.Label}
		}
		return e.Item, nil
	}
	return nil, &NotLoadedError{edge: "item"}
}

// HustlerOrErr returns the Hustler value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e SearchEdges) HustlerOrErr() (*Hustler, error) {
	if e.loadedTypes[2] {
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
func (*Search) scanValues(columns []string) ([]interface{}, error) {
	values := make([]interface{}, len(columns))
	for i := range columns {
		switch columns[i] {
		case search.FieldGreatness:
			values[i] = new(sql.NullInt64)
		case search.FieldID, search.FieldType:
			values[i] = new(sql.NullString)
		case search.ForeignKeys[0]: // dope_index
			values[i] = new(sql.NullString)
		case search.ForeignKeys[1]: // hustler_index
			values[i] = new(sql.NullString)
		case search.ForeignKeys[2]: // item_index
			values[i] = new(sql.NullString)
		default:
			return nil, fmt.Errorf("unexpected column %q for type Search", columns[i])
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Search fields.
func (s *Search) assignValues(columns []string, values []interface{}) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case search.FieldID:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value.Valid {
				s.ID = value.String
			}
		case search.FieldType:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field type", values[i])
			} else if value.Valid {
				s.Type = search.Type(value.String)
			}
		case search.FieldGreatness:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for field greatness", values[i])
			} else if value.Valid {
				s.Greatness = int(value.Int64)
			}
		case search.ForeignKeys[0]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field dope_index", values[i])
			} else if value.Valid {
				s.dope_index = new(string)
				*s.dope_index = value.String
			}
		case search.ForeignKeys[1]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field hustler_index", values[i])
			} else if value.Valid {
				s.hustler_index = new(string)
				*s.hustler_index = value.String
			}
		case search.ForeignKeys[2]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field item_index", values[i])
			} else if value.Valid {
				s.item_index = new(string)
				*s.item_index = value.String
			}
		}
	}
	return nil
}

// QueryDope queries the "dope" edge of the Search entity.
func (s *Search) QueryDope() *DopeQuery {
	return (&SearchClient{config: s.config}).QueryDope(s)
}

// QueryItem queries the "item" edge of the Search entity.
func (s *Search) QueryItem() *ItemQuery {
	return (&SearchClient{config: s.config}).QueryItem(s)
}

// QueryHustler queries the "hustler" edge of the Search entity.
func (s *Search) QueryHustler() *HustlerQuery {
	return (&SearchClient{config: s.config}).QueryHustler(s)
}

// Update returns a builder for updating this Search.
// Note that you need to call Search.Unwrap() before calling this method if this Search
// was returned from a transaction, and the transaction was committed or rolled back.
func (s *Search) Update() *SearchUpdateOne {
	return (&SearchClient{config: s.config}).UpdateOne(s)
}

// Unwrap unwraps the Search entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (s *Search) Unwrap() *Search {
	tx, ok := s.config.driver.(*txDriver)
	if !ok {
		panic("ent: Search is not a transactional entity")
	}
	s.config.driver = tx.drv
	return s
}

// String implements the fmt.Stringer.
func (s *Search) String() string {
	var builder strings.Builder
	builder.WriteString("Search(")
	builder.WriteString(fmt.Sprintf("id=%v", s.ID))
	builder.WriteString(", type=")
	builder.WriteString(fmt.Sprintf("%v", s.Type))
	builder.WriteString(", greatness=")
	builder.WriteString(fmt.Sprintf("%v", s.Greatness))
	builder.WriteByte(')')
	return builder.String()
}

// Searches is a parsable slice of Search.
type Searches []*Search

func (s Searches) config(cfg config) {
	for _i := range s {
		s[_i].config = cfg
	}
}
