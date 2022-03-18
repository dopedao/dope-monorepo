
// Code generated by entc, DO NOT EDIT.



	

package syncstate




import (
	"context"
	"errors"
	"fmt"
	"math"
	"strings"
	"time"
		"github.com/dopedao/dope-monorepo/packages/api/ent/predicate"
	"entgo.io/ent"
	"entgo.io/ent/dialect"
			"entgo.io/ent/dialect/sql"
			"entgo.io/ent/dialect/sql/sqlgraph"
			"entgo.io/ent/schema/field"

)


// ID filters vertices based on their ID field.
func ID(id string) predicate.SyncState {
	return predicate.SyncState(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}


	
	
	// IDEQ applies the EQ predicate on the ID field.
	func IDEQ(id string) predicate.SyncState {
		return predicate.SyncState(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID),id))
	})
	}

	
	
	// IDNEQ applies the NEQ predicate on the ID field.
	func IDNEQ(id string) predicate.SyncState {
		return predicate.SyncState(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldID),id))
	})
	}

	
	
	// IDIn applies the In predicate on the ID field.
	func IDIn(ids ...string) predicate.SyncState {
		return predicate.SyncState(func(s *sql.Selector) {
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
	func IDNotIn(ids ...string) predicate.SyncState {
		return predicate.SyncState(func(s *sql.Selector) {
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
	func IDGT(id string) predicate.SyncState {
		return predicate.SyncState(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldID),id))
	})
	}

	
	
	// IDGTE applies the GTE predicate on the ID field.
	func IDGTE(id string) predicate.SyncState {
		return predicate.SyncState(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldID),id))
	})
	}

	
	
	// IDLT applies the LT predicate on the ID field.
	func IDLT(id string) predicate.SyncState {
		return predicate.SyncState(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldID),id))
	})
	}

	
	
	// IDLTE applies the LTE predicate on the ID field.
	func IDLTE(id string) predicate.SyncState {
		return predicate.SyncState(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldID),id))
	})
	}



	
	
	
	
	
		
		// StartBlock applies equality check predicate on the "start_block" field. It's identical to StartBlockEQ.
		func StartBlock(v uint64) predicate.SyncState {
			return predicate.SyncState(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldStartBlock), v))
	})
		}



	
		
		
		
		
		// StartBlockEQ applies the EQ predicate on the "start_block" field.
		func StartBlockEQ(v uint64) predicate.SyncState {
			return predicate.SyncState(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldStartBlock), v))
	})
		}
	
		
		
		
		
		// StartBlockNEQ applies the NEQ predicate on the "start_block" field.
		func StartBlockNEQ(v uint64) predicate.SyncState {
			return predicate.SyncState(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldStartBlock), v))
	})
		}
	
		
		
		
		
		// StartBlockIn applies the In predicate on the "start_block" field.
		func StartBlockIn(vs ...uint64) predicate.SyncState {
				v := make([]interface{}, len(vs))
				for i := range v {
						v[i] = vs[i]
				}
			return predicate.SyncState(func(s *sql.Selector) {
			// if not arguments were provided, append the FALSE constants,
			// since we can't apply "IN ()". This will make this predicate falsy.
			if len(v) == 0 {
				s.Where(sql.False())
				return
			}
		s.Where(sql.In(s.C(FieldStartBlock), v...))
	})
		}
	
		
		
		
		
		// StartBlockNotIn applies the NotIn predicate on the "start_block" field.
		func StartBlockNotIn(vs ...uint64) predicate.SyncState {
				v := make([]interface{}, len(vs))
				for i := range v {
						v[i] = vs[i]
				}
			return predicate.SyncState(func(s *sql.Selector) {
			// if not arguments were provided, append the FALSE constants,
			// since we can't apply "IN ()". This will make this predicate falsy.
			if len(v) == 0 {
				s.Where(sql.False())
				return
			}
		s.Where(sql.NotIn(s.C(FieldStartBlock), v...))
	})
		}
	
		
		
		
		
		// StartBlockGT applies the GT predicate on the "start_block" field.
		func StartBlockGT(v uint64) predicate.SyncState {
			return predicate.SyncState(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldStartBlock), v))
	})
		}
	
		
		
		
		
		// StartBlockGTE applies the GTE predicate on the "start_block" field.
		func StartBlockGTE(v uint64) predicate.SyncState {
			return predicate.SyncState(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldStartBlock), v))
	})
		}
	
		
		
		
		
		// StartBlockLT applies the LT predicate on the "start_block" field.
		func StartBlockLT(v uint64) predicate.SyncState {
			return predicate.SyncState(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldStartBlock), v))
	})
		}
	
		
		
		
		
		// StartBlockLTE applies the LTE predicate on the "start_block" field.
		func StartBlockLTE(v uint64) predicate.SyncState {
			return predicate.SyncState(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldStartBlock), v))
	})
		}
	




// And groups predicates with the AND operator between them.
func And(predicates ...predicate.SyncState) predicate.SyncState {
	return predicate.SyncState(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.SyncState) predicate.SyncState {
	return predicate.SyncState(func(s *sql.Selector) {
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
func Not(p predicate.SyncState) predicate.SyncState {
	return predicate.SyncState(func(s *sql.Selector) {
		p(s.Not())
	})
}





