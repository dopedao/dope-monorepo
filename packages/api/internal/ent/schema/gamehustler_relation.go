package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type GameHustlerRelation struct {
	ent.Schema
}

func (GameHustlerRelation) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.String("citizen"),
		field.String("conversation"),
		field.Uint("text"),
	}
}

func (GameHustlerRelation) Edges() []ent.Edge {
	return []ent.Edge{
		edge.
			From("hustler", GameHustler.Type).
			Ref("relations").
			Unique().
			Annotations(),
	}
}
