package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Listing holds the schema definition for the Listing entity.
type Listing struct {
	ent.Schema
}

// Fields of the Listing.
func (Listing) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.Bool("active"),
		field.Enum("source").
			Values("OPENSEA", "SWAPMEET").
			Immutable(),
	}
}

// Edges of the Listing.
func (Listing) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("dope", Dope.Type).Ref("listings").Unique().Annotations(entgql.Bind()),
		edge.To("dope_lastsales", Dope.Type).Unique().Annotations(entgql.Bind()),
		edge.To("inputs", Amount.Type).Annotations(entgql.Bind()),
		edge.To("outputs", Amount.Type).Annotations(entgql.Bind()),
	}
}
