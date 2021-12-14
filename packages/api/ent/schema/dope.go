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
			Default(false).
			Annotations(
				entgql.OrderField("CLAIMED"),
			),
		field.Bool("opened").
			Default(false).
			Annotations(
				entgql.OrderField("OPENED"),
			),
		field.Int("order").
			Immutable().
			Annotations(
				entgql.OrderField("ORDER"),
			),
	}
}

// Edges of the Dope.
func (Dope) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("wallet", Wallet.Type).Ref("dopes").Unique(),
		edge.To("items", Item.Type),
	}
}
