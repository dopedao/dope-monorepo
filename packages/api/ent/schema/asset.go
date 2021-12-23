package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Asset holds the schema definition for the Dope entity.
type Asset struct {
	ent.Schema
}

// Fields of the Asset.
func (Asset) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.String("address"),
		field.Enum("type").
			Values("ETH", "EQUIPMENT", "HUSTLER", "TURF", "PAPER").
			Immutable(),
		field.String("symbol"),
		field.Int("amount").
			GoType(BigInt{}).
			SchemaType(BigIntSchemaType).
			DefaultFunc(func() BigInt {
				return NewBigInt(0)
			}).
			Annotations(
				entgql.Type("BigInt"),
			),
		field.Int("assetId").
			GoType(BigInt{}).
			SchemaType(BigIntSchemaType).
			DefaultFunc(func() BigInt {
				return NewBigInt(0)
			}).
			Annotations(
				entgql.Type("BigInt"),
			),
		field.Float("price"),
	}
}

// Edges of the Asset.
func (Asset) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("paymentToken", PaymentToken.Type).Annotations(entgql.Bind()),
	}
}
