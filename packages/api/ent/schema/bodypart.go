package schema

import (
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
			Values("body", "hair", "beard").
			Immutable(),
		field.Enum("sex").
			Values("male", "female").
			Immutable(),
		field.String("rle").
			Immutable(),
	}
}

// Edges of the BodyPart.
func (BodyPart) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("hustler", Hustler.Type).Ref("bodyparts").Unique(),
	}
}
