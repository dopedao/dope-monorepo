package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Dope holds the schema definition for the Dope entity.
type Dope struct {
	ent.Schema
}

// Fields of the Dope.
func (Dope) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.Bool("claimed").
			Default(false),
		field.Bool("opened").
			Default(false),
		field.Int("score").
			Optional(),
		field.Int("rank").
			Optional().
			Annotations(
				entgql.OrderField("RANK"),
			),
		field.Int("order").
			Immutable().
			Annotations(
				entgql.OrderField("ID"),
			),
	}
}

// Edges of the Dope.
func (Dope) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("wallet", Wallet.Type).Ref("dopes").Unique().Annotations(entgql.Bind()),
		edge.From("last_sale", Listing.Type).Ref("dope_lastsales").Unique().Annotations(entgql.Bind()),
		edge.To("listings", Listing.Type).Annotations(entgql.Bind()),
		edge.To("items", Item.Type).Annotations(entgql.Bind()),
		edge.To("index", Search.Type).Unique().Annotations(entgql.Bind()),
	}
}
