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

// NamePrefix applies equality check predicate on the "name_prefix" field. It's identical to NamePrefixEQ.
func NamePrefix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldNamePrefix), v))
	})
}

// NameSuffix applies equality check predicate on the "name_suffix" field. It's identical to NameSuffixEQ.
func NameSuffix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldNameSuffix), v))
	})
}

// Name applies equality check predicate on the "name" field. It's identical to NameEQ.
func Name(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldName), v))
	})
}

// Suffix applies equality check predicate on the "suffix" field. It's identical to SuffixEQ.
func Suffix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSuffix), v))
	})
}

// Augmented applies equality check predicate on the "augmented" field. It's identical to AugmentedEQ.
func Augmented(v bool) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldAugmented), v))
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

// NamePrefixEQ applies the EQ predicate on the "name_prefix" field.
func NamePrefixEQ(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldNamePrefix), v))
	})
}

// NamePrefixNEQ applies the NEQ predicate on the "name_prefix" field.
func NamePrefixNEQ(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldNamePrefix), v))
	})
}

// NamePrefixIn applies the In predicate on the "name_prefix" field.
func NamePrefixIn(vs ...string) predicate.Hustler {
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
		s.Where(sql.In(s.C(FieldNamePrefix), v...))
	})
}

// NamePrefixNotIn applies the NotIn predicate on the "name_prefix" field.
func NamePrefixNotIn(vs ...string) predicate.Hustler {
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
		s.Where(sql.NotIn(s.C(FieldNamePrefix), v...))
	})
}

// NamePrefixGT applies the GT predicate on the "name_prefix" field.
func NamePrefixGT(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldNamePrefix), v))
	})
}

// NamePrefixGTE applies the GTE predicate on the "name_prefix" field.
func NamePrefixGTE(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldNamePrefix), v))
	})
}

// NamePrefixLT applies the LT predicate on the "name_prefix" field.
func NamePrefixLT(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldNamePrefix), v))
	})
}

// NamePrefixLTE applies the LTE predicate on the "name_prefix" field.
func NamePrefixLTE(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldNamePrefix), v))
	})
}

// NamePrefixContains applies the Contains predicate on the "name_prefix" field.
func NamePrefixContains(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldNamePrefix), v))
	})
}

// NamePrefixHasPrefix applies the HasPrefix predicate on the "name_prefix" field.
func NamePrefixHasPrefix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldNamePrefix), v))
	})
}

// NamePrefixHasSuffix applies the HasSuffix predicate on the "name_prefix" field.
func NamePrefixHasSuffix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldNamePrefix), v))
	})
}

// NamePrefixIsNil applies the IsNil predicate on the "name_prefix" field.
func NamePrefixIsNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldNamePrefix)))
	})
}

// NamePrefixNotNil applies the NotNil predicate on the "name_prefix" field.
func NamePrefixNotNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldNamePrefix)))
	})
}

// NamePrefixEqualFold applies the EqualFold predicate on the "name_prefix" field.
func NamePrefixEqualFold(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldNamePrefix), v))
	})
}

// NamePrefixContainsFold applies the ContainsFold predicate on the "name_prefix" field.
func NamePrefixContainsFold(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldNamePrefix), v))
	})
}

// NameSuffixEQ applies the EQ predicate on the "name_suffix" field.
func NameSuffixEQ(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldNameSuffix), v))
	})
}

// NameSuffixNEQ applies the NEQ predicate on the "name_suffix" field.
func NameSuffixNEQ(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldNameSuffix), v))
	})
}

// NameSuffixIn applies the In predicate on the "name_suffix" field.
func NameSuffixIn(vs ...string) predicate.Hustler {
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
		s.Where(sql.In(s.C(FieldNameSuffix), v...))
	})
}

// NameSuffixNotIn applies the NotIn predicate on the "name_suffix" field.
func NameSuffixNotIn(vs ...string) predicate.Hustler {
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
		s.Where(sql.NotIn(s.C(FieldNameSuffix), v...))
	})
}

// NameSuffixGT applies the GT predicate on the "name_suffix" field.
func NameSuffixGT(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldNameSuffix), v))
	})
}

// NameSuffixGTE applies the GTE predicate on the "name_suffix" field.
func NameSuffixGTE(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldNameSuffix), v))
	})
}

// NameSuffixLT applies the LT predicate on the "name_suffix" field.
func NameSuffixLT(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldNameSuffix), v))
	})
}

// NameSuffixLTE applies the LTE predicate on the "name_suffix" field.
func NameSuffixLTE(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldNameSuffix), v))
	})
}

// NameSuffixContains applies the Contains predicate on the "name_suffix" field.
func NameSuffixContains(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldNameSuffix), v))
	})
}

// NameSuffixHasPrefix applies the HasPrefix predicate on the "name_suffix" field.
func NameSuffixHasPrefix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldNameSuffix), v))
	})
}

// NameSuffixHasSuffix applies the HasSuffix predicate on the "name_suffix" field.
func NameSuffixHasSuffix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldNameSuffix), v))
	})
}

// NameSuffixIsNil applies the IsNil predicate on the "name_suffix" field.
func NameSuffixIsNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldNameSuffix)))
	})
}

// NameSuffixNotNil applies the NotNil predicate on the "name_suffix" field.
func NameSuffixNotNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldNameSuffix)))
	})
}

// NameSuffixEqualFold applies the EqualFold predicate on the "name_suffix" field.
func NameSuffixEqualFold(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldNameSuffix), v))
	})
}

// NameSuffixContainsFold applies the ContainsFold predicate on the "name_suffix" field.
func NameSuffixContainsFold(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldNameSuffix), v))
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

// SuffixEQ applies the EQ predicate on the "suffix" field.
func SuffixEQ(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldSuffix), v))
	})
}

// SuffixNEQ applies the NEQ predicate on the "suffix" field.
func SuffixNEQ(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldSuffix), v))
	})
}

// SuffixIn applies the In predicate on the "suffix" field.
func SuffixIn(vs ...string) predicate.Hustler {
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
		s.Where(sql.In(s.C(FieldSuffix), v...))
	})
}

// SuffixNotIn applies the NotIn predicate on the "suffix" field.
func SuffixNotIn(vs ...string) predicate.Hustler {
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
		s.Where(sql.NotIn(s.C(FieldSuffix), v...))
	})
}

// SuffixGT applies the GT predicate on the "suffix" field.
func SuffixGT(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldSuffix), v))
	})
}

// SuffixGTE applies the GTE predicate on the "suffix" field.
func SuffixGTE(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldSuffix), v))
	})
}

// SuffixLT applies the LT predicate on the "suffix" field.
func SuffixLT(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldSuffix), v))
	})
}

// SuffixLTE applies the LTE predicate on the "suffix" field.
func SuffixLTE(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldSuffix), v))
	})
}

// SuffixContains applies the Contains predicate on the "suffix" field.
func SuffixContains(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldSuffix), v))
	})
}

// SuffixHasPrefix applies the HasPrefix predicate on the "suffix" field.
func SuffixHasPrefix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldSuffix), v))
	})
}

// SuffixHasSuffix applies the HasSuffix predicate on the "suffix" field.
func SuffixHasSuffix(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldSuffix), v))
	})
}

// SuffixIsNil applies the IsNil predicate on the "suffix" field.
func SuffixIsNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldSuffix)))
	})
}

// SuffixNotNil applies the NotNil predicate on the "suffix" field.
func SuffixNotNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldSuffix)))
	})
}

// SuffixEqualFold applies the EqualFold predicate on the "suffix" field.
func SuffixEqualFold(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldSuffix), v))
	})
}

// SuffixContainsFold applies the ContainsFold predicate on the "suffix" field.
func SuffixContainsFold(v string) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldSuffix), v))
	})
}

// AugmentedEQ applies the EQ predicate on the "augmented" field.
func AugmentedEQ(v bool) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldAugmented), v))
	})
}

// AugmentedNEQ applies the NEQ predicate on the "augmented" field.
func AugmentedNEQ(v bool) predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldAugmented), v))
	})
}

// AugmentedIsNil applies the IsNil predicate on the "augmented" field.
func AugmentedIsNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.IsNull(s.C(FieldAugmented)))
	})
}

// AugmentedNotNil applies the NotNil predicate on the "augmented" field.
func AugmentedNotNil() predicate.Hustler {
	return predicate.Hustler(func(s *sql.Selector) {
		s.Where(sql.NotNull(s.C(FieldAugmented)))
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