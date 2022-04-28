// Code generated by entc, DO NOT EDIT.

package ent

import (
	"fmt"
	"strings"

	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/gamehustler"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/gamehustleritem"
)

// GameHustlerItem is the model entity for the GameHustlerItem schema.
type GameHustlerItem struct {
	config `json:"-"`
	// ID of the ent.
	ID string `json:"id,omitempty"`
	// Item holds the value of the "item" field.
	Item string `json:"item,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the GameHustlerItemQuery when eager-loading is set.
	Edges              GameHustlerItemEdges `json:"edges"`
	game_hustler_items *string
}

// GameHustlerItemEdges holds the relations/edges for other nodes in the graph.
type GameHustlerItemEdges struct {
	// Hustler holds the value of the hustler edge.
	Hustler *GameHustler `json:"hustler,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [1]bool
}

// HustlerOrErr returns the Hustler value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e GameHustlerItemEdges) HustlerOrErr() (*GameHustler, error) {
	if e.loadedTypes[0] {
		if e.Hustler == nil {
			// The edge hustler was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: gamehustler.Label}
		}
		return e.Hustler, nil
	}
	return nil, &NotLoadedError{edge: "hustler"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*GameHustlerItem) scanValues(columns []string) ([]interface{}, error) {
	values := make([]interface{}, len(columns))
	for i := range columns {
		switch columns[i] {
		case gamehustleritem.FieldID, gamehustleritem.FieldItem:
			values[i] = new(sql.NullString)
		case gamehustleritem.ForeignKeys[0]: // game_hustler_items
			values[i] = new(sql.NullString)
		default:
			return nil, fmt.Errorf("unexpected column %q for type GameHustlerItem", columns[i])
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the GameHustlerItem fields.
func (ghi *GameHustlerItem) assignValues(columns []string, values []interface{}) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case gamehustleritem.FieldID:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value.Valid {
				ghi.ID = value.String
			}
		case gamehustleritem.FieldItem:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field item", values[i])
			} else if value.Valid {
				ghi.Item = value.String
			}
		case gamehustleritem.ForeignKeys[0]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field game_hustler_items", values[i])
			} else if value.Valid {
				ghi.game_hustler_items = new(string)
				*ghi.game_hustler_items = value.String
			}
		}
	}
	return nil
}

// QueryHustler queries the "hustler" edge of the GameHustlerItem entity.
func (ghi *GameHustlerItem) QueryHustler() *GameHustlerQuery {
	return (&GameHustlerItemClient{config: ghi.config}).QueryHustler(ghi)
}

// Update returns a builder for updating this GameHustlerItem.
// Note that you need to call GameHustlerItem.Unwrap() before calling this method if this GameHustlerItem
// was returned from a transaction, and the transaction was committed or rolled back.
func (ghi *GameHustlerItem) Update() *GameHustlerItemUpdateOne {
	return (&GameHustlerItemClient{config: ghi.config}).UpdateOne(ghi)
}

// Unwrap unwraps the GameHustlerItem entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (ghi *GameHustlerItem) Unwrap() *GameHustlerItem {
	tx, ok := ghi.config.driver.(*txDriver)
	if !ok {
		panic("ent: GameHustlerItem is not a transactional entity")
	}
	ghi.config.driver = tx.drv
	return ghi
}

// String implements the fmt.Stringer.
func (ghi *GameHustlerItem) String() string {
	var builder strings.Builder
	builder.WriteString("GameHustlerItem(")
	builder.WriteString(fmt.Sprintf("id=%v", ghi.ID))
	builder.WriteString(", item=")
	builder.WriteString(ghi.Item)
	builder.WriteByte(')')
	return builder.String()
}

// GameHustlerItems is a parsable slice of GameHustlerItem.
type GameHustlerItems []*GameHustlerItem

func (ghi GameHustlerItems) config(cfg config) {
	for _i := range ghi {
		ghi[_i].config = cfg
	}
}
