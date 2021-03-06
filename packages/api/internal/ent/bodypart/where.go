// Code generated by entc, DO NOT EDIT.

package bodypart

import (
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/predicate"
)

// ID filters vertices based on their ID field.
func ID(id string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldID), id))
	})
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
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
func IDNotIn(ids ...string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
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
func IDGT(id string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldID), id))
	})
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldID), id))
	})
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldID), id))
	})
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldID), id))
	})
}

// Rle applies equality check predicate on the "rle" field. It's identical to RleEQ.
func Rle(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldRle), v))
	})
}

// Sprite applies equality check predicate on the "sprite" field. It's identical to SpriteEQ.
func Sprite(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSprite), v))
	})
}

// TypeEQ applies the EQ predicate on the "type" field.
func TypeEQ(v Type) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldType), v))
	})
}

// TypeNEQ applies the NEQ predicate on the "type" field.
func TypeNEQ(v Type) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldType), v))
	})
}

// TypeIn applies the In predicate on the "type" field.
func TypeIn(vs ...Type) predicate.BodyPart {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.BodyPart(func(s *sql.Selector) {
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
func TypeNotIn(vs ...Type) predicate.BodyPart {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.BodyPart(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldType), v...))
	})
}

// SexEQ applies the EQ predicate on the "sex" field.
func SexEQ(v Sex) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSex), v))
	})
}

// SexNEQ applies the NEQ predicate on the "sex" field.
func SexNEQ(v Sex) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldSex), v))
	})
}

// SexIn applies the In predicate on the "sex" field.
func SexIn(vs ...Sex) predicate.BodyPart {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.BodyPart(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldSex), v...))
	})
}

// SexNotIn applies the NotIn predicate on the "sex" field.
func SexNotIn(vs ...Sex) predicate.BodyPart {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.BodyPart(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldSex), v...))
	})
}

// RleEQ applies the EQ predicate on the "rle" field.
func RleEQ(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldRle), v))
	})
}

// RleNEQ applies the NEQ predicate on the "rle" field.
func RleNEQ(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldRle), v))
	})
}

// RleIn applies the In predicate on the "rle" field.
func RleIn(vs ...string) predicate.BodyPart {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.BodyPart(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldRle), v...))
	})
}

// RleNotIn applies the NotIn predicate on the "rle" field.
func RleNotIn(vs ...string) predicate.BodyPart {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.BodyPart(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldRle), v...))
	})
}

// RleGT applies the GT predicate on the "rle" field.
func RleGT(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldRle), v))
	})
}

// RleGTE applies the GTE predicate on the "rle" field.
func RleGTE(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldRle), v))
	})
}

// RleLT applies the LT predicate on the "rle" field.
func RleLT(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldRle), v))
	})
}

// RleLTE applies the LTE predicate on the "rle" field.
func RleLTE(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldRle), v))
	})
}

// RleContains applies the Contains predicate on the "rle" field.
func RleContains(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldRle), v))
	})
}

// RleHasPrefix applies the HasPrefix predicate on the "rle" field.
func RleHasPrefix(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldRle), v))
	})
}

// RleHasSuffix applies the HasSuffix predicate on the "rle" field.
func RleHasSuffix(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldRle), v))
	})
}

// RleEqualFold applies the EqualFold predicate on the "rle" field.
func RleEqualFold(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldRle), v))
	})
}

// RleContainsFold applies the ContainsFold predicate on the "rle" field.
func RleContainsFold(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldRle), v))
	})
}

// SpriteEQ applies the EQ predicate on the "sprite" field.
func SpriteEQ(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSprite), v))
	})
}

// SpriteNEQ applies the NEQ predicate on the "sprite" field.
func SpriteNEQ(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldSprite), v))
	})
}

// SpriteIn applies the In predicate on the "sprite" field.
func SpriteIn(vs ...string) predicate.BodyPart {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.BodyPart(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldSprite), v...))
	})
}

// SpriteNotIn applies the NotIn predicate on the "sprite" field.
func SpriteNotIn(vs ...string) predicate.BodyPart {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.BodyPart(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldSprite), v...))
	})
}

// SpriteGT applies the GT predicate on the "sprite" field.
func SpriteGT(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldSprite), v))
	})
}

// SpriteGTE applies the GTE predicate on the "sprite" field.
func SpriteGTE(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldSprite), v))
	})
}

// SpriteLT applies the LT predicate on the "sprite" field.
func SpriteLT(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldSprite), v))
	})
}

// SpriteLTE applies the LTE predicate on the "sprite" field.
func SpriteLTE(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldSprite), v))
	})
}

// SpriteContains applies the Contains predicate on the "sprite" field.
func SpriteContains(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldSprite), v))
	})
}

// SpriteHasPrefix applies the HasPrefix predicate on the "sprite" field.
func SpriteHasPrefix(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldSprite), v))
	})
}

// SpriteHasSuffix applies the HasSuffix predicate on the "sprite" field.
func SpriteHasSuffix(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldSprite), v))
	})
}

// SpriteIsNil applies the IsNil predicate on the "sprite" field.
func SpriteIsNil() predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldSprite)))
	})
}

// SpriteNotNil applies the NotNil predicate on the "sprite" field.
func SpriteNotNil() predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldSprite)))
	})
}

// SpriteEqualFold applies the EqualFold predicate on the "sprite" field.
func SpriteEqualFold(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldSprite), v))
	})
}

// SpriteContainsFold applies the ContainsFold predicate on the "sprite" field.
func SpriteContainsFold(v string) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldSprite), v))
	})
}

// HasHustlerBodies applies the HasEdge predicate on the "hustler_bodies" edge.
func HasHustlerBodies() predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(HustlerBodiesTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, HustlerBodiesTable, HustlerBodiesColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasHustlerBodiesWith applies the HasEdge predicate on the "hustler_bodies" edge with a given conditions (other predicates).
func HasHustlerBodiesWith(preds ...predicate.Hustler) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(HustlerBodiesInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, HustlerBodiesTable, HustlerBodiesColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasHustlerHairs applies the HasEdge predicate on the "hustler_hairs" edge.
func HasHustlerHairs() predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(HustlerHairsTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, HustlerHairsTable, HustlerHairsColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasHustlerHairsWith applies the HasEdge predicate on the "hustler_hairs" edge with a given conditions (other predicates).
func HasHustlerHairsWith(preds ...predicate.Hustler) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(HustlerHairsInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, HustlerHairsTable, HustlerHairsColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasHustlerBeards applies the HasEdge predicate on the "hustler_beards" edge.
func HasHustlerBeards() predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(HustlerBeardsTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, HustlerBeardsTable, HustlerBeardsColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasHustlerBeardsWith applies the HasEdge predicate on the "hustler_beards" edge with a given conditions (other predicates).
func HasHustlerBeardsWith(preds ...predicate.Hustler) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(HustlerBeardsInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, HustlerBeardsTable, HustlerBeardsColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.BodyPart) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.BodyPart) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
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
func Not(p predicate.BodyPart) predicate.BodyPart {
	return predicate.BodyPart(func(s *sql.Selector) {
		p(s.Not())
	})
}
