package schema

import (
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
		// field.String("id").
		// 	GoType(caip.EVMAccountID{}),
		field.Int("paper").
			GoType(BigInt{}).
			SchemaType(BigIntSchemaType),
	}
}

// Edges of the Wallet.
func (Wallet) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("dopes", Dope.Type),
	}
}
