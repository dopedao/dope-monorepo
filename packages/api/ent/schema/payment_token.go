package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Asset holds the schema definition for the Dope entity.
type PaymentToken struct {
	ent.Schema
}

func (PaymentToken) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.String("address"),
		field.String("type"),
		field.String("symbol"),
		field.Float("price"),
	}
}

// Edges of the Asset.
func (PaymentToken) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("asset", Asset.Type).
			Ref("paymentToken").Annotations(entgql.Bind()),
	}
}
