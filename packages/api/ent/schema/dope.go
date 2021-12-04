package schema

import (
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
		field.String("clothes").
			Immutable().
			NotEmpty(),
		field.String("foot").
			Immutable().
			NotEmpty(),
		field.String("hand").
			Immutable().
			NotEmpty(),
		field.String("neck").
			Immutable().
			NotEmpty(),
		field.String("ring").
			Immutable().
			NotEmpty(),
		field.String("waist").
			Immutable().
			NotEmpty(),
		field.String("weapon").
			Immutable().
			NotEmpty(),
		field.String("drugs").
			Immutable().
			NotEmpty(),
		field.String("vehicle").
			Immutable().
			NotEmpty(),
		field.Bool("claimed").
			Immutable(),
		field.Bool("opened").
			Immutable(),
	}
}

// Edges of the Dope.
func (Dope) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("wallet", Wallet.Type).Ref("dopes").Unique(),
	}
}
