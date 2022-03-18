



// Code generated by entc, DO NOT EDIT.



package ent



import (
	"context"
	"errors"
	"fmt"
	"math"
	"strings"
	"time"
		"github.com/dopedao/dope-monorepo/packages/api/ent/predicate"
			"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
	"entgo.io/ent"
	"entgo.io/ent/dialect"
			"entgo.io/ent/dialect/sql"
			"entgo.io/ent/dialect/sql/sqlgraph"
			"entgo.io/ent/schema/field"

)


import (
		"github.com/dopedao/dope-monorepo/packages/api/ent/walletitems"
		"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
		"github.com/dopedao/dope-monorepo/packages/api/ent/item"
)

// WalletItems is the model entity for the WalletItems schema.
type WalletItems struct {
	config `json:"-"`
	// ID of the ent.
	ID string `json:"id,omitempty"`
	// Balance holds the value of the "balance" field.
		Balance schema.BigInt `json:"balance,omitempty"`
		// Edges holds the relations/edges for other nodes in the graph.
		// The values are being populated by the WalletItemsQuery when eager-loading is set.
		Edges WalletItemsEdges `json:"edges"`
		item_wallets *string
		wallet_items *string

	
}
// WalletItemsEdges holds the relations/edges for other nodes in the graph.
type WalletItemsEdges struct {
		// Wallet holds the value of the wallet edge.
		Wallet *Wallet `json:"wallet,omitempty"`
		// Item holds the value of the item edge.
		Item *Item `json:"item,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [2]bool
}
	// WalletOrErr returns the Wallet value or an error if the edge
	// was not loaded in eager-loading, or loaded but was not found.
	func (e WalletItemsEdges) WalletOrErr() (*Wallet, error) {
		if e.loadedTypes[0] {
				if e.Wallet == nil {
					// The edge wallet was loaded in eager-loading,
					// but was not found.
					return nil, &NotFoundError{label: wallet.Label}
				}
			return e.Wallet, nil
		}
		return nil, &NotLoadedError{edge: "wallet"}
	}
	// ItemOrErr returns the Item value or an error if the edge
	// was not loaded in eager-loading, or loaded but was not found.
	func (e WalletItemsEdges) ItemOrErr() (*Item, error) {
		if e.loadedTypes[1] {
				if e.Item == nil {
					// The edge item was loaded in eager-loading,
					// but was not found.
					return nil, &NotFoundError{label: item.Label}
				}
			return e.Item, nil
		}
		return nil, &NotLoadedError{edge: "item"}
	}








	
	
	
	


// scanValues returns the types for scanning values from sql.Rows.
func (*WalletItems) scanValues(columns []string) ([]interface{}, error) {
	values := make([]interface{}, len(columns))
	for i := range columns {
		switch columns[i] {
				case walletitems.FieldBalance:
					values[i] = new(schema.BigInt)
				case walletitems.FieldID:
					values[i] = new(sql.NullString)
				case walletitems.ForeignKeys[0]: // item_wallets
					values[i] = new(sql.NullString)
				case walletitems.ForeignKeys[1]: // wallet_items
					values[i] = new(sql.NullString)
			default:
				return nil, fmt.Errorf("unexpected column %q for type WalletItems", columns[i])
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the WalletItems fields.
func (wi *WalletItems) assignValues(columns []string, values []interface{}) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case walletitems.FieldID:
					if value, ok := values[i].(*sql.NullString); !ok {
			return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value.Valid {
					wi.ID = value.String
		}
			case walletitems.FieldBalance:
					if value, ok := values[i].(*schema.BigInt); !ok {
			return fmt.Errorf("unexpected type %T for field balance", values[i])
			} else if value != nil {
				wi.Balance = *value
		}
			case walletitems.ForeignKeys[0]:
						if value, ok := values[i].(*sql.NullString); !ok {
			return fmt.Errorf("unexpected type %T for field item_wallets", values[i])
			} else if value.Valid {
					wi.item_wallets = new(string)
					*wi.item_wallets = value.String
		}
			case walletitems.ForeignKeys[1]:
						if value, ok := values[i].(*sql.NullString); !ok {
			return fmt.Errorf("unexpected type %T for field wallet_items", values[i])
			} else if value.Valid {
					wi.wallet_items = new(string)
					*wi.wallet_items = value.String
		}
		}
	}
	return nil
}





	
	// QueryWallet queries the "wallet" edge of the WalletItems entity.
	func (wi *WalletItems) QueryWallet() *WalletQuery {
		return (&WalletItemsClient{config: wi.config}).QueryWallet(wi)
	}

	
	// QueryItem queries the "item" edge of the WalletItems entity.
	func (wi *WalletItems) QueryItem() *ItemQuery {
		return (&WalletItemsClient{config: wi.config}).QueryItem(wi)
	}


// Update returns a builder for updating this WalletItems.
// Note that you need to call WalletItems.Unwrap() before calling this method if this WalletItems
// was returned from a transaction, and the transaction was committed or rolled back.
func (wi *WalletItems) Update() *WalletItemsUpdateOne {
	return (&WalletItemsClient{config: wi.config}).UpdateOne(wi)
}

// Unwrap unwraps the WalletItems entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (wi *WalletItems) Unwrap() *WalletItems {
	tx, ok := wi.config.driver.(*txDriver)
	if !ok {
		panic("ent: WalletItems is not a transactional entity")
	}
	wi.config.driver = tx.drv
	return wi
}


	

	// String implements the fmt.Stringer.
	func (wi *WalletItems) String() string {
		var builder strings.Builder
		builder.WriteString("WalletItems(")
		builder.WriteString(fmt.Sprintf("id=%v", wi.ID))
					builder.WriteString(", balance=")
						builder.WriteString(fmt.Sprintf("%v", wi.Balance))
		builder.WriteByte(')')
		return builder.String()
	}






// WalletItemsSlice is a parsable slice of WalletItems.
type WalletItemsSlice []*WalletItems


	
	



func (wi WalletItemsSlice) config(cfg config) {
	for _i := range wi {
		wi[_i].config = cfg
	}
}
