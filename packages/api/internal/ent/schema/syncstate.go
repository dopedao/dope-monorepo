package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// SyncState holds the schema definition for the SyncState entity.
type SyncState struct {
	ent.Schema
}

// Fields of the SyncState.
func (SyncState) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.Uint64("start_block").
			Annotations(
				entgql.Type("Long"),
			),
	}
}

// Edges of the SyncState.
func (SyncState) Edges() []ent.Edge {
	return nil
}
