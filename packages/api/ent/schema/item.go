package schema

import (
	"time"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type RLEs struct {
	Female string
	Male   string
}

type SVGs struct {
	Female string
	Male   string
}

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
		field.Int("count").
			Optional(),
		field.Float("score").
			Optional(),
		field.JSON("rles", RLEs{}).
			Optional(),
		field.String("svg").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable().
			Annotations(
				entgql.OrderField("CREATED_AT"),
			),
	}
}

// Edges of the Item.
func (Item) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("wallets", WalletItems.Type).Annotations(entgql.Bind()),
		edge.From("dopes", Dope.Type).
			Ref("items").Annotations(entgql.Bind()),
		edge.To("hustler_weapons", Hustler.Type).Annotations(entgql.Bind()),
		edge.To("hustler_clothes", Hustler.Type).Annotations(entgql.Bind()),
		edge.To("hustler_vehicles", Hustler.Type).Annotations(entgql.Bind()),
		edge.To("hustler_waists", Hustler.Type).Annotations(entgql.Bind()),
		edge.To("hustler_feet", Hustler.Type).Annotations(entgql.Bind()),
		edge.To("hustler_hands", Hustler.Type).Annotations(entgql.Bind()),
		edge.To("hustler_drugs", Hustler.Type).Annotations(entgql.Bind()),
		edge.To("hustler_necks", Hustler.Type).Annotations(entgql.Bind()),
		edge.To("hustler_rings", Hustler.Type).Annotations(entgql.Bind()),
		edge.To("hustler_accessories", Hustler.Type).Annotations(entgql.Bind()),
		edge.To("derivative", Item.Type).
			From("base").
			Unique(),
	}
}
