package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// WalletItems holds the schema definition for the WalletItems entity.
type WalletItems struct {
	ent.Schema
}

// Fields of the WalletItems.
func (WalletItems) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.Int("balance").
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

// Edges of the WalletItems.
func (WalletItems) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("wallet", Wallet.Type).Ref("items").Unique().Annotations(),
		edge.From("item", Item.Type).Ref("wallets").Unique().Annotations(),
	}
}

// Necessary to implement graphql resolvers…hidden implementation bullshit
// https://entgo.io/docs/tutorial-todo-gql-schema-generator/#add-annotations-to-todo-schema
func (WalletItems) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		// Need to name this ourselves otherwise it will be called
		// WalletItemsSlice on the query which is incorrect.
		// Ent / gql doesn't know how to pluralize WalletItems.
		entgql.QueryField("walletItems"),
	}
}
