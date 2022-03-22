package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type GameHustlerQuest struct {
	ent.Schema
}

func (GameHustlerQuest) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.String("quest"),
		field.Bool("completed"),
	}
}

func (GameHustlerQuest) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("hustler", GameHustler.Type).Ref("quests").Unique().Annotations(entgql.Bind()),
	}
}
