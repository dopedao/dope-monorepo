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
type GameHustlerItem struct {
	item string
}

// Definition of a relation between a game hustler and a citizen.
// Citizen `string` is the citizen's ID. Stored in the game registry.
// Conversation is the conversation's id of the citizen.
// Text is the id of the text in the conversation.
type GameHustlerCitizen struct {
	citizen      string
	conversation string
	text         string
}

// Hustler holds the schema definition for the Hustler entity.
type GameHustler struct {
	ent.Schema
}

func (GameHustler) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.JSON("lastPosition", Position{}),
		field.JSON("relations", []GameHustlerCitizen{}),
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