package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BodyPart holds the schema definition for the BodyPart entity.
type BodyPart struct {
	ent.Schema
}

// Fields of the BodyPart.
func (BodyPart) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.Enum("type").
			Values("BODY", "HAIR", "BEARD").
			Immutable(),
		field.Enum("sex").
			Values("MALE", "FEMALE").
			Immutable(),
		field.String("rle").
			Immutable(),
		field.String("sprite").
			Optional(),
	}
}

// Edges of the BodyPart.
func (BodyPart) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("hustler_bodies", Hustler.Type).Annotations(entgql.Bind()),
		edge.To("hustler_hairs", Hustler.Type).Annotations(entgql.Bind()),
		edge.To("hustler_beards", Hustler.Type).Annotations(entgql.Bind()),
	}
}
