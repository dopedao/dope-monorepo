package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Hustler holds the schema definition for the Hustler entity.
type GameHustlerItem struct {
	ent.Schema
}

func (GameHustlerItem) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.String("item"),
	}
}

func (GameHustlerItem) Edges() []ent.Edge {
	return []ent.Edge{
		edge.
			From("hustler", GameHustler.Type).
			Ref("items").
			Unique().
			Annotations(entgql.Bind()),
	}
}
