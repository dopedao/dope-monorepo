package schema

import (
	"time"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
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
			Values("ORIGINAL_GANGSTA", "REGULAR").
			Immutable(),
		field.String("name").
			Optional(),
		field.String("title").
			Optional(),
		field.String("color").
			Optional(),
		field.String("background").
			Optional(),
		field.Uint64("age").
			Annotations(
				entgql.Type("Long"),
			),
		field.Enum("sex").
			Values("MALE", "FEMALE").
			Default("MALE"),
		field.Ints("viewbox").
			Default([]int{0, 0, 0, 0}),
		field.Ints("order").
			Default([]int{0, 0, 0, 0, 0, 0, 0, 0, 0, 0}),
		field.String("svg").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable().
			Annotations(
				entgql.OrderField("CREATED_AT"),
			),
		field.Float("best_ask_price_eth").
			Optional().
			Annotations(
				entgql.OrderField("BEST_ASK_PRICE"),
			),
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
		edge.To("index", Search.Type).Unique().Annotations(),
	}
}

// Necessary to implement graphql resolvers…hidden implementation bullshit
// https://entgo.io/docs/tutorial-todo-gql-schema-generator/#add-annotations-to-todo-schema
func (Hustler) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
	}
}
