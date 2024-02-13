package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Search holds the schema definition for the Search entity.
type Search struct {
	ent.Schema
}

// Fields of the Search.
func (Search) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.Enum("type").
			Values("DOPE", "ITEM", "HUSTLER").
			Immutable(),
		field.Int("greatness").
			Optional().
			Annotations(
				entgql.OrderField("GREATNESS"),
			),
		field.Bool("claimed"),
		field.Bool("opened"),
		field.Bool("banned"),
		field.Float("sale_price").
			Optional().
			Annotations(
				entgql.OrderField("SALE_PRICE"),
			),
		// field.Int("last_sale_price").
		// 	GoType(BigInt{}).
		// 	SchemaType(BigIntSchemaType).
		// 	DefaultFunc(func() BigInt {
		// 		return NewBigInt(0)
		// 	}).
		// 	Annotations(
		// 		entgql.Type("BigInt"),
		// 		entgql.OrderField("LAST_SALE_PRICE"),
		// 	),
	}
}

// Edges of the Search.
func (Search) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("dope", Dope.Type).Ref("index").Unique().Annotations(),
		edge.From("item", Item.Type).Ref("index").Unique().Annotations(),
		edge.From("hustler", Hustler.Type).Ref("index").Unique().Annotations(),
	}
}

// Annotations of the Search.
func (Search) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entsql.Annotation{Table: "search_index"},
		entgql.RelayConnection(),
		// We define this in the schema.graphql file instead,
		// because we want to add a custom resolver.
		// entgql.QueryField("search"),
	}
}
