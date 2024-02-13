package schema

import (
	"time"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
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
			}).
			Annotations(
				entgql.Type("BigInt"),
			),
		field.Time("last_set_paper_balance_at").Optional(),
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
		edge.To("dopes", Dope.Type).Annotations(),
		edge.To("items", WalletItems.Type).Annotations(),
		edge.To("hustlers", Hustler.Type).Annotations(),
	}
}

// Necessary to implement graphql resolvers…hidden implementation bullshit
// https://entgo.io/docs/tutorial-todo-gql-schema-generator/#add-annotations-to-todo-schema
func (Wallet) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
	}
}
