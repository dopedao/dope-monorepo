package schema

import (
	"time"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// SyncState stores how far we've synced our indexer
// on a per contract address basis
type SyncState struct {
	ent.Schema
}

func (SyncState) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.String("contract_name").Optional(),
		field.Uint64("start_block").
			Annotations(
				entgql.Type("Long"),
			),
		field.Time("block_time").Optional(),
		field.Time("last_synced_at").
			Default(time.Now).
			UpdateDefault(time.Now).
			Optional(),
	}
}

// Edges of the SyncState.
func (SyncState) Edges() []ent.Edge {
	return nil
}
