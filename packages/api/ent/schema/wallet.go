package schema

import (
	"time"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Wallet holds the schema definition for the Wallet entity.
type Wallet struct {
	ent.Schema
}

// Fields of the Wallet.
func (Wallet) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.Int("paper").
			GoType(BigInt{}).
			SchemaType(BigIntSchemaType).
			DefaultFunc(func() BigInt {
				return NewBigInt(0)
			}),
		field.Time("created_at").
			Default(time.Now).
			Immutable().
			Annotations(
				entgql.OrderField("CREATED_AT"),
			),
	}
}

// Edges of the Wallet.
func (Wallet) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("dopes", Dope.Type),
		edge.To("items", WalletItems.Type),
		edge.To("hustlers", Hustler.Type),
	}
}
