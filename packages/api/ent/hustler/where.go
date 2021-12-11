// Code generated by entc, DO NOT EDIT.

package hustler

import (
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/dopedao/dope-monorepo/packages/api/ent/predicate"
)

// ID filters vertices based on their ID field.
func ID(id string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldID), id))
	})
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
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
func IDNotIn(ids ...string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
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
func IDGT(id string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldID), id))
	})
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldID), id))
	})
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldID), id))
	})
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldID), id))
	})
}

// Name applies equality check predicate on the "name" field. It's identical to NameEQ.
func Name(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldName), v))
	})
}

// Title applies equality check predicate on the "title" field. It's identical to TitleEQ.
func Title(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldTitle), v))
	})
}

// Color applies equality check predicate on the "color" field. It's identical to ColorEQ.
func Color(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldColor), v))
	})
}

// Background applies equality check predicate on the "background" field. It's identical to BackgroundEQ.
func Background(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldBackground), v))
	})
}

// Age applies equality check predicate on the "age" field. It's identical to AgeEQ.
func Age(v uint64) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldAge), v))
	})
}

// Svg applies equality check predicate on the "svg" field. It's identical to SvgEQ.
func Svg(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSvg), v))
	})
}

// TypeEQ applies the EQ predicate on the "type" field.
func TypeEQ(v Type) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldType), v))
	})
}

// TypeNEQ applies the NEQ predicate on the "type" field.
func TypeNEQ(v Type) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldType), v))
	})
}

// TypeIn applies the In predicate on the "type" field.
func TypeIn(vs ...Type) predicate.Hustler {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Hustler(func(s *sql.Selector) {
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
func TypeNotIn(vs ...Type) predicate.Hustler {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Hustler(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldType), v...))
	})
}

// NameEQ applies the EQ predicate on the "name" field.
func NameEQ(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldName), v))
	})
}

// NameNEQ applies the NEQ predicate on the "name" field.
func NameNEQ(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldName), v))
	})
}

// NameIn applies the In predicate on the "name" field.
func NameIn(vs ...string) predicate.Hustler {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Hustler(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldName), v...))
	})
}

// NameNotIn applies the NotIn predicate on the "name" field.
func NameNotIn(vs ...string) predicate.Hustler {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Hustler(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldName), v...))
	})
}

// NameGT applies the GT predicate on the "name" field.
func NameGT(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldName), v))
	})
}

// NameGTE applies the GTE predicate on the "name" field.
func NameGTE(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldName), v))
	})
}

// NameLT applies the LT predicate on the "name" field.
func NameLT(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldName), v))
	})
}

// NameLTE applies the LTE predicate on the "name" field.
func NameLTE(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldName), v))
	})
}

// NameContains applies the Contains predicate on the "name" field.
func NameContains(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldName), v))
	})
}

// NameHasPrefix applies the HasPrefix predicate on the "name" field.
func NameHasPrefix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldName), v))
	})
}

// NameHasSuffix applies the HasSuffix predicate on the "name" field.
func NameHasSuffix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldName), v))
	})
}

// NameIsNil applies the IsNil predicate on the "name" field.
func NameIsNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldName)))
	})
}

// NameNotNil applies the NotNil predicate on the "name" field.
func NameNotNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldName)))
	})
}

// NameEqualFold applies the EqualFold predicate on the "name" field.
func NameEqualFold(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldName), v))
	})
}

// NameContainsFold applies the ContainsFold predicate on the "name" field.
func NameContainsFold(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldName), v))
	})
}

// TitleEQ applies the EQ predicate on the "title" field.
func TitleEQ(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldTitle), v))
	})
}

// TitleNEQ applies the NEQ predicate on the "title" field.
func TitleNEQ(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldTitle), v))
	})
}

// TitleIn applies the In predicate on the "title" field.
func TitleIn(vs ...string) predicate.Hustler {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Hustler(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldTitle), v...))
	})
}

// TitleNotIn applies the NotIn predicate on the "title" field.
func TitleNotIn(vs ...string) predicate.Hustler {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Hustler(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldTitle), v...))
	})
}

// TitleGT applies the GT predicate on the "title" field.
func TitleGT(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldTitle), v))
	})
}

// TitleGTE applies the GTE predicate on the "title" field.
func TitleGTE(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldTitle), v))
	})
}

// TitleLT applies the LT predicate on the "title" field.
func TitleLT(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldTitle), v))
	})
}

// TitleLTE applies the LTE predicate on the "title" field.
func TitleLTE(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldTitle), v))
	})
}

// TitleContains applies the Contains predicate on the "title" field.
func TitleContains(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldTitle), v))
	})
}

// TitleHasPrefix applies the HasPrefix predicate on the "title" field.
func TitleHasPrefix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldTitle), v))
	})
}

// TitleHasSuffix applies the HasSuffix predicate on the "title" field.
func TitleHasSuffix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldTitle), v))
	})
}

// TitleIsNil applies the IsNil predicate on the "title" field.
func TitleIsNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldTitle)))
	})
}

// TitleNotNil applies the NotNil predicate on the "title" field.
func TitleNotNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldTitle)))
	})
}

// TitleEqualFold applies the EqualFold predicate on the "title" field.
func TitleEqualFold(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldTitle), v))
	})
}

// TitleContainsFold applies the ContainsFold predicate on the "title" field.
func TitleContainsFold(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldTitle), v))
	})
}

// ColorEQ applies the EQ predicate on the "color" field.
func ColorEQ(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldColor), v))
	})
}

// ColorNEQ applies the NEQ predicate on the "color" field.
func ColorNEQ(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldColor), v))
	})
}

// ColorIn applies the In predicate on the "color" field.
func ColorIn(vs ...string) predicate.Hustler {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Hustler(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldColor), v...))
	})
}

// ColorNotIn applies the NotIn predicate on the "color" field.
func ColorNotIn(vs ...string) predicate.Hustler {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Hustler(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldColor), v...))
	})
}

// ColorGT applies the GT predicate on the "color" field.
func ColorGT(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldColor), v))
	})
}

// ColorGTE applies the GTE predicate on the "color" field.
func ColorGTE(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldColor), v))
	})
}

// ColorLT applies the LT predicate on the "color" field.
func ColorLT(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldColor), v))
	})
}

// ColorLTE applies the LTE predicate on the "color" field.
func ColorLTE(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldColor), v))
	})
}

// ColorContains applies the Contains predicate on the "color" field.
func ColorContains(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldColor), v))
	})
}

// ColorHasPrefix applies the HasPrefix predicate on the "color" field.
func ColorHasPrefix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldColor), v))
	})
}

// ColorHasSuffix applies the HasSuffix predicate on the "color" field.
func ColorHasSuffix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldColor), v))
	})
}

// ColorIsNil applies the IsNil predicate on the "color" field.
func ColorIsNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldColor)))
	})
}

// ColorNotNil applies the NotNil predicate on the "color" field.
func ColorNotNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldColor)))
	})
}

// ColorEqualFold applies the EqualFold predicate on the "color" field.
func ColorEqualFold(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldColor), v))
	})
}

// ColorContainsFold applies the ContainsFold predicate on the "color" field.
func ColorContainsFold(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldColor), v))
	})
}

// BackgroundEQ applies the EQ predicate on the "background" field.
func BackgroundEQ(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldBackground), v))
	})
}

// BackgroundNEQ applies the NEQ predicate on the "background" field.
func BackgroundNEQ(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldBackground), v))
	})
}

// BackgroundIn applies the In predicate on the "background" field.
func BackgroundIn(vs ...string) predicate.Hustler {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Hustler(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldBackground), v...))
	})
}

// BackgroundNotIn applies the NotIn predicate on the "background" field.
func BackgroundNotIn(vs ...string) predicate.Hustler {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Hustler(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldBackground), v...))
	})
}

// BackgroundGT applies the GT predicate on the "background" field.
func BackgroundGT(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldBackground), v))
	})
}

// BackgroundGTE applies the GTE predicate on the "background" field.
func BackgroundGTE(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldBackground), v))
	})
}

// BackgroundLT applies the LT predicate on the "background" field.
func BackgroundLT(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldBackground), v))
	})
}

// BackgroundLTE applies the LTE predicate on the "background" field.
func BackgroundLTE(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldBackground), v))
	})
}

// BackgroundContains applies the Contains predicate on the "background" field.
func BackgroundContains(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldBackground), v))
	})
}

// BackgroundHasPrefix applies the HasPrefix predicate on the "background" field.
func BackgroundHasPrefix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldBackground), v))
	})
}

// BackgroundHasSuffix applies the HasSuffix predicate on the "background" field.
func BackgroundHasSuffix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldBackground), v))
	})
}

// BackgroundIsNil applies the IsNil predicate on the "background" field.
func BackgroundIsNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldBackground)))
	})
}

// BackgroundNotNil applies the NotNil predicate on the "background" field.
func BackgroundNotNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldBackground)))
	})
}

// BackgroundEqualFold applies the EqualFold predicate on the "background" field.
func BackgroundEqualFold(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldBackground), v))
	})
}

// BackgroundContainsFold applies the ContainsFold predicate on the "background" field.
func BackgroundContainsFold(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldBackground), v))
	})
}

// AgeEQ applies the EQ predicate on the "age" field.
func AgeEQ(v uint64) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldAge), v))
	})
}

// AgeNEQ applies the NEQ predicate on the "age" field.
func AgeNEQ(v uint64) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldAge), v))
	})
}

// AgeIn applies the In predicate on the "age" field.
func AgeIn(vs ...uint64) predicate.Hustler {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Hustler(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldAge), v...))
	})
}

// AgeNotIn applies the NotIn predicate on the "age" field.
func AgeNotIn(vs ...uint64) predicate.Hustler {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Hustler(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldAge), v...))
	})
}

// AgeGT applies the GT predicate on the "age" field.
func AgeGT(v uint64) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldAge), v))
	})
}

// AgeGTE applies the GTE predicate on the "age" field.
func AgeGTE(v uint64) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldAge), v))
	})
}

// AgeLT applies the LT predicate on the "age" field.
func AgeLT(v uint64) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldAge), v))
	})
}

// AgeLTE applies the LTE predicate on the "age" field.
func AgeLTE(v uint64) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldAge), v))
	})
}

// SexEQ applies the EQ predicate on the "sex" field.
func SexEQ(v Sex) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSex), v))
	})
}

// SexNEQ applies the NEQ predicate on the "sex" field.
func SexNEQ(v Sex) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldSex), v))
	})
}

// SexIn applies the In predicate on the "sex" field.
func SexIn(vs ...Sex) predicate.Hustler {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Hustler(func(s *sql.Selector) {
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
func SexNotIn(vs ...Sex) predicate.Hustler {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Hustler(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldSex), v...))
	})
}

// SvgEQ applies the EQ predicate on the "svg" field.
func SvgEQ(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSvg), v))
	})
}

// SvgNEQ applies the NEQ predicate on the "svg" field.
func SvgNEQ(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldSvg), v))
	})
}

// SvgIn applies the In predicate on the "svg" field.
func SvgIn(vs ...string) predicate.Hustler {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Hustler(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldSvg), v...))
	})
}

// SvgNotIn applies the NotIn predicate on the "svg" field.
func SvgNotIn(vs ...string) predicate.Hustler {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Hustler(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldSvg), v...))
	})
}

// SvgGT applies the GT predicate on the "svg" field.
func SvgGT(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldSvg), v))
	})
}

// SvgGTE applies the GTE predicate on the "svg" field.
func SvgGTE(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldSvg), v))
	})
}

// SvgLT applies the LT predicate on the "svg" field.
func SvgLT(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldSvg), v))
	})
}

// SvgLTE applies the LTE predicate on the "svg" field.
func SvgLTE(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldSvg), v))
	})
}

// SvgContains applies the Contains predicate on the "svg" field.
func SvgContains(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldSvg), v))
	})
}

// SvgHasPrefix applies the HasPrefix predicate on the "svg" field.
func SvgHasPrefix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldSvg), v))
	})
}

// SvgHasSuffix applies the HasSuffix predicate on the "svg" field.
func SvgHasSuffix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldSvg), v))
	})
}

// SvgIsNil applies the IsNil predicate on the "svg" field.
func SvgIsNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldSvg)))
	})
}

// SvgNotNil applies the NotNil predicate on the "svg" field.
func SvgNotNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldSvg)))
	})
}

// SvgEqualFold applies the EqualFold predicate on the "svg" field.
func SvgEqualFold(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldSvg), v))
	})
}

// SvgContainsFold applies the ContainsFold predicate on the "svg" field.
func SvgContainsFold(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldSvg), v))
	})
}

// HasWallet applies the HasEdge predicate on the "wallet" edge.
func HasWallet() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(WalletTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, WalletTable, WalletColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasWalletWith applies the HasEdge predicate on the "wallet" edge with a given conditions (other predicates).
func HasWalletWith(preds ...predicate.Wallet) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(WalletInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, WalletTable, WalletColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasItems applies the HasEdge predicate on the "items" edge.
func HasItems() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(ItemsTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, ItemsTable, ItemsColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasItemsWith applies the HasEdge predicate on the "items" edge with a given conditions (other predicates).
func HasItemsWith(preds ...predicate.Item) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(ItemsInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, ItemsTable, ItemsColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasBody applies the HasEdge predicate on the "body" edge.
func HasBody() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(BodyTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, BodyTable, BodyColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasBodyWith applies the HasEdge predicate on the "body" edge with a given conditions (other predicates).
func HasBodyWith(preds ...predicate.BodyPart) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(BodyInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, BodyTable, BodyColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasHair applies the HasEdge predicate on the "hair" edge.
func HasHair() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(HairTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, HairTable, HairColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasHairWith applies the HasEdge predicate on the "hair" edge with a given conditions (other predicates).
func HasHairWith(preds ...predicate.BodyPart) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(HairInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, HairTable, HairColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasBeard applies the HasEdge predicate on the "beard" edge.
func HasBeard() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(BeardTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, BeardTable, BeardColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasBeardWith applies the HasEdge predicate on the "beard" edge with a given conditions (other predicates).
func HasBeardWith(preds ...predicate.BodyPart) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(BeardInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, BeardTable, BeardColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.Hustler) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.Hustler) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
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
func Not(p predicate.Hustler) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		p(s.Not())
	})
}
