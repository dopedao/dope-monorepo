// Code generated by entc, DO NOT EDIT.

package amount

import (
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/predicate"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/schema"
)

// ID filters vertices based on their ID field.
func ID(id string) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id string) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id string) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldID), id))
	})
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...string) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
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
		s.Where(sql.In(s.C(FieldID), v...))
	})
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...string) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
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
		s.Where(sql.NotIn(s.C(FieldID), v...))
	})
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id string) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldID), id))
	})
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id string) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldID), id))
	})
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id string) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldID), id))
	})
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id string) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldID), id))
	})
}

// Amount applies equality check predicate on the "amount" field. It's identical to AmountEQ.
func Amount(v schema.BigInt) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldAmount), v))
	})
}

// AssetID applies equality check predicate on the "asset_id" field. It's identical to AssetIDEQ.
func AssetID(v schema.BigInt) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldAssetID), v))
	})
}

// TypeEQ applies the EQ predicate on the "type" field.
func TypeEQ(v Type) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldType), v))
	})
}

// TypeNEQ applies the NEQ predicate on the "type" field.
func TypeNEQ(v Type) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldType), v))
	})
}

// TypeIn applies the In predicate on the "type" field.
func TypeIn(vs ...Type) predicate.Amount {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Amount(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldType), v...))
	})
}

// TypeNotIn applies the NotIn predicate on the "type" field.
func TypeNotIn(vs ...Type) predicate.Amount {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Amount(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldType), v...))
	})
}

// AmountEQ applies the EQ predicate on the "amount" field.
func AmountEQ(v schema.BigInt) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldAmount), v))
	})
}

// AmountNEQ applies the NEQ predicate on the "amount" field.
func AmountNEQ(v schema.BigInt) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldAmount), v))
	})
}

// AmountIn applies the In predicate on the "amount" field.
func AmountIn(vs ...schema.BigInt) predicate.Amount {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Amount(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldAmount), v...))
	})
}

// AmountNotIn applies the NotIn predicate on the "amount" field.
func AmountNotIn(vs ...schema.BigInt) predicate.Amount {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Amount(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldAmount), v...))
	})
}

// AmountGT applies the GT predicate on the "amount" field.
func AmountGT(v schema.BigInt) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldAmount), v))
	})
}

// AmountGTE applies the GTE predicate on the "amount" field.
func AmountGTE(v schema.BigInt) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldAmount), v))
	})
}

// AmountLT applies the LT predicate on the "amount" field.
func AmountLT(v schema.BigInt) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldAmount), v))
	})
}

// AmountLTE applies the LTE predicate on the "amount" field.
func AmountLTE(v schema.BigInt) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldAmount), v))
	})
}

// AssetIDEQ applies the EQ predicate on the "asset_id" field.
func AssetIDEQ(v schema.BigInt) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldAssetID), v))
	})
}

// AssetIDNEQ applies the NEQ predicate on the "asset_id" field.
func AssetIDNEQ(v schema.BigInt) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldAssetID), v))
	})
}

// AssetIDIn applies the In predicate on the "asset_id" field.
func AssetIDIn(vs ...schema.BigInt) predicate.Amount {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Amount(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldAssetID), v...))
	})
}

// AssetIDNotIn applies the NotIn predicate on the "asset_id" field.
func AssetIDNotIn(vs ...schema.BigInt) predicate.Amount {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Amount(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldAssetID), v...))
	})
}

// AssetIDGT applies the GT predicate on the "asset_id" field.
func AssetIDGT(v schema.BigInt) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldAssetID), v))
	})
}

// AssetIDGTE applies the GTE predicate on the "asset_id" field.
func AssetIDGTE(v schema.BigInt) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldAssetID), v))
	})
}

// AssetIDLT applies the LT predicate on the "asset_id" field.
func AssetIDLT(v schema.BigInt) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldAssetID), v))
	})
}

// AssetIDLTE applies the LTE predicate on the "asset_id" field.
func AssetIDLTE(v schema.BigInt) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldAssetID), v))
	})
}

// HasListingInput applies the HasEdge predicate on the "listing_input" edge.
func HasListingInput() predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(ListingInputTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, ListingInputTable, ListingInputColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasListingInputWith applies the HasEdge predicate on the "listing_input" edge with a given conditions (other predicates).
func HasListingInputWith(preds ...predicate.Listing) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(ListingInputInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, ListingInputTable, ListingInputColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasListingOutput applies the HasEdge predicate on the "listing_output" edge.
func HasListingOutput() predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(ListingOutputTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, ListingOutputTable, ListingOutputColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasListingOutputWith applies the HasEdge predicate on the "listing_output" edge with a given conditions (other predicates).
func HasListingOutputWith(preds ...predicate.Listing) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(ListingOutputInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, ListingOutputTable, ListingOutputColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.Amount) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.Amount) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
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
func Not(p predicate.Amount) predicate.Amount {
	return predicate.Amount(func(s *sql.Selector) {
		p(s.Not())
	})
}
