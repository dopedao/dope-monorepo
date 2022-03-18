
// Code generated by entc, DO NOT EDIT.



	

package walletitems




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


// ID filters vertices based on their ID field.
func ID(id string) predicate.WalletItems {
	return predicate.WalletItems(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}


	
	
	// IDEQ applies the EQ predicate on the ID field.
	func IDEQ(id string) predicate.WalletItems {
		return predicate.WalletItems(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID),id))
	})
	}

	
	
	// IDNEQ applies the NEQ predicate on the ID field.
	func IDNEQ(id string) predicate.WalletItems {
		return predicate.WalletItems(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldID),id))
	})
	}

	
	
	// IDIn applies the In predicate on the ID field.
	func IDIn(ids ...string) predicate.WalletItems {
		return predicate.WalletItems(func(s *sql.Selector) {
			// if not arguments were provided, append the FALSE constants,
			// since we can't apply "IN ()". This will make this predicate falsy.
			if len(ids) == 0 {
				s.Where(sql.False())
				return
			}
			v := make([]interface{}, len(ids))
			for i := range v {
				v[i] = ids[i]
			}
		s.Where(sql.In(s.C(FieldID),v...))
	})
	}

	
	
	// IDNotIn applies the NotIn predicate on the ID field.
	func IDNotIn(ids ...string) predicate.WalletItems {
		return predicate.WalletItems(func(s *sql.Selector) {
			// if not arguments were provided, append the FALSE constants,
			// since we can't apply "IN ()". This will make this predicate falsy.
			if len(ids) == 0 {
				s.Where(sql.False())
				return
			}
			v := make([]interface{}, len(ids))
			for i := range v {
				v[i] = ids[i]
			}
		s.Where(sql.NotIn(s.C(FieldID),v...))
	})
	}

	
	
	// IDGT applies the GT predicate on the ID field.
	func IDGT(id string) predicate.WalletItems {
		return predicate.WalletItems(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldID),id))
	})
	}

	
	
	// IDGTE applies the GTE predicate on the ID field.
	func IDGTE(id string) predicate.WalletItems {
		return predicate.WalletItems(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldID),id))
	})
	}

	
	
	// IDLT applies the LT predicate on the ID field.
	func IDLT(id string) predicate.WalletItems {
		return predicate.WalletItems(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldID),id))
	})
	}

	
	
	// IDLTE applies the LTE predicate on the ID field.
	func IDLTE(id string) predicate.WalletItems {
		return predicate.WalletItems(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldID),id))
	})
	}



	
	
	
	
	
		
		// Balance applies equality check predicate on the "balance" field. It's identical to BalanceEQ.
		func Balance(v schema.BigInt) predicate.WalletItems {
			return predicate.WalletItems(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldBalance), v))
	})
		}



	
		
		
		
		
		// BalanceEQ applies the EQ predicate on the "balance" field.
		func BalanceEQ(v schema.BigInt) predicate.WalletItems {
			return predicate.WalletItems(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldBalance), v))
	})
		}
	
		
		
		
		
		// BalanceNEQ applies the NEQ predicate on the "balance" field.
		func BalanceNEQ(v schema.BigInt) predicate.WalletItems {
			return predicate.WalletItems(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldBalance), v))
	})
		}
	
		
		
		
		
		// BalanceIn applies the In predicate on the "balance" field.
		func BalanceIn(vs ...schema.BigInt) predicate.WalletItems {
				v := make([]interface{}, len(vs))
				for i := range v {
						v[i] = vs[i]
				}
			return predicate.WalletItems(func(s *sql.Selector) {
			// if not arguments were provided, append the FALSE constants,
			// since we can't apply "IN ()". This will make this predicate falsy.
			if len(v) == 0 {
				s.Where(sql.False())
				return
			}
		s.Where(sql.In(s.C(FieldBalance), v...))
	})
		}
	
		
		
		
		
		// BalanceNotIn applies the NotIn predicate on the "balance" field.
		func BalanceNotIn(vs ...schema.BigInt) predicate.WalletItems {
				v := make([]interface{}, len(vs))
				for i := range v {
						v[i] = vs[i]
				}
			return predicate.WalletItems(func(s *sql.Selector) {
			// if not arguments were provided, append the FALSE constants,
			// since we can't apply "IN ()". This will make this predicate falsy.
			if len(v) == 0 {
				s.Where(sql.False())
				return
			}
		s.Where(sql.NotIn(s.C(FieldBalance), v...))
	})
		}
	
		
		
		
		
		// BalanceGT applies the GT predicate on the "balance" field.
		func BalanceGT(v schema.BigInt) predicate.WalletItems {
			return predicate.WalletItems(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldBalance), v))
	})
		}
	
		
		
		
		
		// BalanceGTE applies the GTE predicate on the "balance" field.
		func BalanceGTE(v schema.BigInt) predicate.WalletItems {
			return predicate.WalletItems(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldBalance), v))
	})
		}
	
		
		
		
		
		// BalanceLT applies the LT predicate on the "balance" field.
		func BalanceLT(v schema.BigInt) predicate.WalletItems {
			return predicate.WalletItems(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldBalance), v))
	})
		}
	
		
		
		
		
		// BalanceLTE applies the LTE predicate on the "balance" field.
		func BalanceLTE(v schema.BigInt) predicate.WalletItems {
			return predicate.WalletItems(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldBalance), v))
	})
		}
	



	
	// HasWallet applies the HasEdge predicate on the "wallet" edge.
	func HasWallet() predicate.WalletItems {
		return predicate.WalletItems(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(WalletTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, WalletTable,WalletColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
	}
	
	// HasWalletWith applies the HasEdge predicate on the "wallet" edge with a given conditions (other predicates).
	func HasWalletWith(preds ...predicate.Wallet) predicate.WalletItems {
		return predicate.WalletItems(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(WalletInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, WalletTable,WalletColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
	}

	
	// HasItem applies the HasEdge predicate on the "item" edge.
	func HasItem() predicate.WalletItems {
		return predicate.WalletItems(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(ItemTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, ItemTable,ItemColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
	}
	
	// HasItemWith applies the HasEdge predicate on the "item" edge with a given conditions (other predicates).
	func HasItemWith(preds ...predicate.Item) predicate.WalletItems {
		return predicate.WalletItems(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(ItemInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, ItemTable,ItemColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
	}


// And groups predicates with the AND operator between them.
func And(predicates ...predicate.WalletItems) predicate.WalletItems {
	return predicate.WalletItems(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.WalletItems) predicate.WalletItems {
	return predicate.WalletItems(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for i, p := range predicates {
			if i > 0 {
				s1.Or()
			}
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Not applies the not operator on the given predicate.
func Not(p predicate.WalletItems) predicate.WalletItems {
	return predicate.WalletItems(func(s *sql.Selector) {
		p(s.Not())
	})
}





