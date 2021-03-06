// Code generated by entc, DO NOT EDIT.

package syncstate

const (
	// Label holds the string label denoting the syncstate type in the database.
	Label = "sync_state"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldStartBlock holds the string denoting the start_block field in the database.
	FieldStartBlock = "start_block"
	// Table holds the table name of the syncstate in the database.
	Table = "sync_states"
)

// Columns holds all SQL columns for syncstate fields.
var Columns = []string{
	FieldID,
	FieldStartBlock,
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
