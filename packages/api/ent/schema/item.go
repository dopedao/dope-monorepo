package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type RLEs struct {
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
			Values("WEAPON", "CLOTHES", "VEHICLE", "WAIST", "FOOT", "HAND", "DRUGS", "NECK", "RING", "ACCESSORY").
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
		field.Enum("tier").
			Values("COMMON", "RARE", "CUSTOM", "BLACK_MARKET").
			Optional(),
		field.Int("greatness").
			Optional().
			Annotations(
				entgql.OrderField("GREATNESS"),
			),
		field.JSON("rles", RLEs{}).
			Optional(),
		field.String("svg").
			Optional(),
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
		edge.To("index", Search.Type).Unique().Annotations(entgql.Bind()),
	}
}
