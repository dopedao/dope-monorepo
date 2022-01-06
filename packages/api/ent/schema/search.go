package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Search holds the schema definition for the Search entity.
type Search struct {
	ent.Schema
}

// Fields of the Search.
func (Search) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.Enum("type").
			Values("dope", "item", "hustler").
			Immutable(),
	}
}

// Edges of the Search.
func (Search) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("dope", Dope.Type).Ref("index").Unique().Annotations(entgql.Bind()),
		edge.From("item", Item.Type).Ref("index").Unique().Annotations(entgql.Bind()),
		edge.From("hustler", Hustler.Type).Ref("index").Unique().Annotations(entgql.Bind()),
	}
}

// Annotations of the Search.
func (Search) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entsql.Annotation{Table: "search_index"},
	}
}
