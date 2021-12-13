package schema

import (
	"entgo.io/contrib/entgql"
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
			Immutable().
			Annotations(
				entgql.OrderField("TYPE"),
			),
		field.String("name").
			Optional().
			Annotations(
				entgql.OrderField("NAME"),
			),
		field.String("title").
			Optional().
			Annotations(
				entgql.OrderField("TITLE"),
			),
		field.String("color").
			Optional(),
		field.String("background").
			Optional(),
		field.Uint64("age").
			Annotations(
				entgql.OrderField("AGE"),
			),
		field.Enum("sex").
			Values("male", "female").
			Default("male").
			Annotations(
				entgql.OrderField("SEX"),
			),
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
		edge.From("weapon", Item.Type).Ref("hustler_weapons").Unique(),
		edge.From("clothes", Item.Type).Ref("hustler_clothes").Unique(),
		edge.From("vehicle", Item.Type).Ref("hustler_vehicles").Unique(),
		edge.From("waist", Item.Type).Ref("hustler_waists").Unique(),
		edge.From("foot", Item.Type).Ref("hustler_feet").Unique(),
		edge.From("hand", Item.Type).Ref("hustler_hands").Unique(),
		edge.From("drug", Item.Type).Ref("hustler_drugs").Unique(),
		edge.From("neck", Item.Type).Ref("hustler_necks").Unique(),
		edge.From("ring", Item.Type).Ref("hustler_rings").Unique(),
		edge.From("accessory", Item.Type).Ref("hustler_accessories").Unique(),
		edge.From("body", BodyPart.Type).Ref("hustler_bodies").Unique(),
		edge.From("hair", BodyPart.Type).Ref("hustler_hairs").Unique(),
		edge.From("beard", BodyPart.Type).Ref("hustler_beards").Unique(),
	}
}
