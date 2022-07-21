package schema

import (
	"time"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/ethereum/go-ethereum/common"
)

// Event holds the schema definition for the Event entity.
type Event struct {
	ent.Schema
}

// Fields of the Event.
func (Event) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.Bytes("address").
			GoType(common.Address{}).
			Immutable(),
		field.Uint64("index").
			Immutable().
			Annotations(
				entgql.Type("Long"),
			),
		field.Bytes("hash").
			GoType(common.Hash{}).
			Immutable(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

func (Event) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("hash", "index").
			Unique(),
	}
}
