package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Hustler holds the schema definition for the Hustler entity.
type Hustler struct {
	ent.Schema
}

// Fields of the Hustler.
func (Hustler) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.Enum("type").
			Values("original_gangsta", "regular").
			Immutable(),
		field.String("name").
			Optional(),
		field.String("title").
			Optional(),
		field.String("color").
			Optional(),
		field.String("background").
			Optional(),
		field.Uint64("age"),
		field.Enum("sex").
			Values("male", "female").
			Default("male"),
		field.Ints("viewbox").
			Default([]int{0, 0, 0, 0}),
		field.Ints("order").
			Default([]int{0, 0, 0, 0, 0, 0, 0, 0, 0, 0}),
		field.String("svg").
			Optional(),
	}
}

// Edges of the Hustler.
func (Hustler) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("wallet", Wallet.Type).Ref("hustlers").Unique(),
		edge.To("items", Item.Type),
		edge.From("body", BodyPart.Type).Ref("hustler_bodies").Unique(),
		edge.From("hair", BodyPart.Type).Ref("hustler_hairs").Unique(),
		edge.From("beard", BodyPart.Type).Ref("hustler_beards").Unique(),
	}
}
