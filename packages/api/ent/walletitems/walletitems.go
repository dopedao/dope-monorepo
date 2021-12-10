// Code generated by entc, DO NOT EDIT.

package walletitems

import (
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
)

const (
	// Label holds the string label denoting the walletitems type in the database.
	Label = "wallet_items"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldBalance holds the string denoting the balance field in the database.
	FieldBalance = "balance"
	// EdgeWallet holds the string denoting the wallet edge name in mutations.
	EdgeWallet = "wallet"
	// EdgeItem holds the string denoting the item edge name in mutations.
	EdgeItem = "item"
	// Table holds the table name of the walletitems in the database.
	Table = "wallet_items"
	// WalletTable is the table that holds the wallet relation/edge.
	WalletTable = "wallet_items"
	// WalletInverseTable is the table name for the Wallet entity.
	// It exists in this package in order to avoid circular dependency with the "wallet" package.
	WalletInverseTable = "wallets"
	// WalletColumn is the table column denoting the wallet relation/edge.
	WalletColumn = "wallet_items"
	// ItemTable is the table that holds the item relation/edge.
	ItemTable = "wallet_items"
	// ItemInverseTable is the table name for the Item entity.
	// It exists in this package in order to avoid circular dependency with the "item" package.
	ItemInverseTable = "items"
	// ItemColumn is the table column denoting the item relation/edge.
	ItemColumn = "item_wallets"
)

// Columns holds all SQL columns for walletitems fields.
var Columns = []string{
	FieldID,
	FieldBalance,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the "wallet_items"
// table and are not defined as standalone fields in the schema.
var ForeignKeys = []string{
	"item_wallets",
	"wallet_items",
}

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	for i := range ForeignKeys {
		if column == ForeignKeys[i] {
			return true
		}
	}
	return false
}

var (
	// DefaultBalance holds the default value on creation for the "balance" field.
	DefaultBalance func() schema.BigInt
)
