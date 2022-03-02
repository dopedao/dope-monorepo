package schema

import (
	"time"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type Position struct {
	x float32
	y float32
}

// Definition of a game hustler's quest.
// Actual quest is stored in the game registry. Quest `string` is the quest's ID.
type GameHustlerQuest struct {
	quest     string
	completed bool
}

// Definition of a game hustler's item.
// Actual item is stored in the game registry. Item `string` is the item's ID.
type GameHustlerItem struct {
	item  string
	count int
}

// Hustler holds the schema definition for the Hustler entity.
type GameHustler struct {
	ent.Schema
}

func (GameHustler) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.JSON("lastPosition", Position{}),
		field.JSON("quests", []GameHustlerQuest{}),
		field.JSON("items", []GameHustlerItem{}),
		field.Time("created_at").
			Default(time.Now).
			Immutable().
			Annotations(
				entgql.OrderField("CREATED_AT"),
			),
	}
}

func (GameHustler) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("hustlers", Hustler.Type).
			Unique().
			Annotations(entgql.Bind()),
	}
}
