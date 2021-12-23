package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// PaymentToken holds the schema definition for the PaymentToken entity.
type PaymentToken struct {
	ent.Schema
}

// Fields of the PaymentToken.
func (PaymentToken) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.String("address"),
		field.String("type"),
		field.String("symbol"),
		field.Float("price"),
	}
}

// Edges of the PaymentToken.
func (PaymentToken) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("asset", Asset.Type).
			Ref("paymentToken").Annotations(entgql.Bind()),
	}
}
