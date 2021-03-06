// Code generated by entc, DO NOT EDIT.

package gamehustler

import (
	"time"
)

const (
	// Label holds the string label denoting the gamehustler type in the database.
	Label = "game_hustler"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldLastPosition holds the string denoting the last_position field in the database.
	FieldLastPosition = "last_position"
	// FieldCreatedAt holds the string denoting the created_at field in the database.
	FieldCreatedAt = "created_at"
	// EdgeRelations holds the string denoting the relations edge name in mutations.
	EdgeRelations = "relations"
	// EdgeItems holds the string denoting the items edge name in mutations.
	EdgeItems = "items"
	// EdgeQuests holds the string denoting the quests edge name in mutations.
	EdgeQuests = "quests"
	// Table holds the table name of the gamehustler in the database.
	Table = "game_hustlers"
	// RelationsTable is the table that holds the relations relation/edge.
	RelationsTable = "game_hustler_relations"
	// RelationsInverseTable is the table name for the GameHustlerRelation entity.
	// It exists in this package in order to avoid circular dependency with the "gamehustlerrelation" package.
	RelationsInverseTable = "game_hustler_relations"
	// RelationsColumn is the table column denoting the relations relation/edge.
	RelationsColumn = "game_hustler_relations"
	// ItemsTable is the table that holds the items relation/edge.
	ItemsTable = "game_hustler_items"
	// ItemsInverseTable is the table name for the GameHustlerItem entity.
	// It exists in this package in order to avoid circular dependency with the "gamehustleritem" package.
	ItemsInverseTable = "game_hustler_items"
	// ItemsColumn is the table column denoting the items relation/edge.
	ItemsColumn = "game_hustler_items"
	// QuestsTable is the table that holds the quests relation/edge.
	QuestsTable = "game_hustler_quests"
	// QuestsInverseTable is the table name for the GameHustlerQuest entity.
	// It exists in this package in order to avoid circular dependency with the "gamehustlerquest" package.
	QuestsInverseTable = "game_hustler_quests"
	// QuestsColumn is the table column denoting the quests relation/edge.
	QuestsColumn = "game_hustler_quests"
)

// Columns holds all SQL columns for gamehustler fields.
var Columns = []string{
	FieldID,
	FieldLastPosition,
	FieldCreatedAt,
}

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	return false
}

var (
	// DefaultCreatedAt holds the default value on creation for the "created_at" field.
	DefaultCreatedAt func() time.Time
)
