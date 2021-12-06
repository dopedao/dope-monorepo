package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Item holds the schema definition for the Item entity.
type Item struct {
	ent.Schema
}

// Fields of the Item.
func (Item) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.Enum("type").
			Values("weapon", "clothes", "vehicle", "waist", "foot", "hand", "drugs", "neck", "ring", "accessory").
			Immutable(),
		field.String("name_prefix").
			Optional().
			Immutable(),
		field.String("name_suffix").
			Optional().
			Immutable(),
		field.String("name").
			Immutable(),
		field.String("suffix").
			Optional().
			Immutable(),
		field.Bool("augmented").
			Optional().
			Immutable(),
	}
}

// Edges of the Item.
func (Item) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("wallet", Wallet.Type).Ref("items").Unique(),
		edge.From("dopes", Dope.Type).
			Ref("items"),
		edge.To("derivative", Item.Type).
			From("base").
			Unique(),
	}
}
