package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
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
		field.Time("last_checked_paper_claim").
			Optional(),
		field.Bool("opened").
			Default(false),
		field.Time("last_checked_gear_claim").
			Optional(),
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
		field.Float("best_ask_price_eth").
			Optional().
			Annotations(
				entgql.OrderField("BEST_ASK_PRICE"),
			),
	}
}

// Edges of the Dope.
func (Dope) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("wallet", Wallet.Type).Ref("dopes").Unique().Annotations(),
		edge.To("items", Item.Type).Annotations(),
		edge.To("index", Search.Type).Unique().Annotations(),
	}
}

func (Dope) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("opened", "best_ask_price_eth"),
	}
}

// Necessary to implement graphql resolvers…hidden implementation bullshit
// https://entgo.io/docs/tutorial-todo-gql-schema-generator/#add-annotations-to-todo-schema
func (Dope) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
	}
}
