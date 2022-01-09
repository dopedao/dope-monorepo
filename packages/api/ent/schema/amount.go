package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Amount holds the schema definition for the Amount entity.
type Amount struct {
	ent.Schema
}

// Fields of the Amount.
func (Amount) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.Enum("type").
			Values("DOPE", "ETH", "EQUIPMENT", "HUSTLER", "PAPER", "TURF").
			Immutable(),
		field.Int("amount").
			GoType(BigInt{}).
			SchemaType(BigIntSchemaType).
			DefaultFunc(func() BigInt {
				return NewBigInt(0)
			}).
			Annotations(
				entgql.Type("BigInt"),
			),
		field.Int("asset_id").
			GoType(BigInt{}).
			SchemaType(BigIntSchemaType).
			DefaultFunc(func() BigInt {
				return NewBigInt(0)
			}).
			Annotations(
				entgql.Type("BigInt"),
			),
	}
}

// Edges of the Amount.
func (Amount) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("listing_input", Listing.Type).Ref("inputs").Unique().Annotations(entgql.Bind()),
		edge.From("listing_output", Listing.Type).Ref("outputs").Unique().Annotations(entgql.Bind()),
	}
}
