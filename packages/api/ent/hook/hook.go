// Code generated by entc, DO NOT EDIT.

package hook

import (
	"context"
	"fmt"

	"github.com/dopedao/dope-monorepo/packages/api/ent"
)

// The AmountFunc type is an adapter to allow the use of ordinary
// function as Amount mutator.
type AmountFunc func(context.Context, *ent.AmountMutation) (ent.Value, error)

// Mutate calls f(ctx, m).
func (f AmountFunc) Mutate(ctx context.Context, m ent.Mutation) (ent.Value, error) {
	mv, ok := m.(*ent.AmountMutation)
	if !ok {
		return nil, fmt.Errorf("unexpected mutation type %T. expect *ent.AmountMutation", m)
	}
	return f(ctx, mv)
}

// The BodyPartFunc type is an adapter to allow the use of ordinary
// function as BodyPart mutator.
type BodyPartFunc func(context.Context, *ent.BodyPartMutation) (ent.Value, error)

// Mutate calls f(ctx, m).
func (f BodyPartFunc) Mutate(ctx context.Context, m ent.Mutation) (ent.Value, error) {
	mv, ok := m.(*ent.BodyPartMutation)
	if !ok {
		return nil, fmt.Errorf("unexpected mutation type %T. expect *ent.BodyPartMutation", m)
	}
	return f(ctx, mv)
}

// The DopeFunc type is an adapter to allow the use of ordinary
// function as Dope mutator.
type DopeFunc func(context.Context, *ent.DopeMutation) (ent.Value, error)

// Mutate calls f(ctx, m).
func (f DopeFunc) Mutate(ctx context.Context, m ent.Mutation) (ent.Value, error) {
	mv, ok := m.(*ent.DopeMutation)
	if !ok {
		return nil, fmt.Errorf("unexpected mutation type %T. expect *ent.DopeMutation", m)
	}
	return f(ctx, mv)
}

// The EventFunc type is an adapter to allow the use of ordinary
// function as Event mutator.
type EventFunc func(context.Context, *ent.EventMutation) (ent.Value, error)

// Mutate calls f(ctx, m).
func (f EventFunc) Mutate(ctx context.Context, m ent.Mutation) (ent.Value, error) {
	mv, ok := m.(*ent.EventMutation)
	if !ok {
		return nil, fmt.Errorf("unexpected mutation type %T. expect *ent.EventMutation", m)
	}
	return f(ctx, mv)
}

// The HustlerFunc type is an adapter to allow the use of ordinary
// function as Hustler mutator.
type HustlerFunc func(context.Context, *ent.HustlerMutation) (ent.Value, error)

// Mutate calls f(ctx, m).
func (f HustlerFunc) Mutate(ctx context.Context, m ent.Mutation) (ent.Value, error) {
	mv, ok := m.(*ent.HustlerMutation)
	if !ok {
		return nil, fmt.Errorf("unexpected mutation type %T. expect *ent.HustlerMutation", m)
	}
	return f(ctx, mv)
}

// The ItemFunc type is an adapter to allow the use of ordinary
// function as Item mutator.
type ItemFunc func(context.Context, *ent.ItemMutation) (ent.Value, error)

// Mutate calls f(ctx, m).
func (f ItemFunc) Mutate(ctx context.Context, m ent.Mutation) (ent.Value, error) {
	mv, ok := m.(*ent.ItemMutation)
	if !ok {
		return nil, fmt.Errorf("unexpected mutation type %T. expect *ent.ItemMutation", m)
	}
	return f(ctx, mv)
}

// The ListingFunc type is an adapter to allow the use of ordinary
// function as Listing mutator.
type ListingFunc func(context.Context, *ent.ListingMutation) (ent.Value, error)

// Mutate calls f(ctx, m).
func (f ListingFunc) Mutate(ctx context.Context, m ent.Mutation) (ent.Value, error) {
	mv, ok := m.(*ent.ListingMutation)
	if !ok {
		return nil, fmt.Errorf("unexpected mutation type %T. expect *ent.ListingMutation", m)
	}
	return f(ctx, mv)
}

// The SearchFunc type is an adapter to allow the use of ordinary
// function as Search mutator.
type SearchFunc func(context.Context, *ent.SearchMutation) (ent.Value, error)

// Mutate calls f(ctx, m).
func (f SearchFunc) Mutate(ctx context.Context, m ent.Mutation) (ent.Value, error) {
	mv, ok := m.(*ent.SearchMutation)
	if !ok {
		return nil, fmt.Errorf("unexpected mutation type %T. expect *ent.SearchMutation", m)
	}
	return f(ctx, mv)
}

// The SyncStateFunc type is an adapter to allow the use of ordinary
// function as SyncState mutator.
type SyncStateFunc func(context.Context, *ent.SyncStateMutation) (ent.Value, error)

// Mutate calls f(ctx, m).
func (f SyncStateFunc) Mutate(ctx context.Context, m ent.Mutation) (ent.Value, error) {
	mv, ok := m.(*ent.SyncStateMutation)
	if !ok {
		return nil, fmt.Errorf("unexpected mutation type %T. expect *ent.SyncStateMutation", m)
	}
	return f(ctx, mv)
}

// The WalletFunc type is an adapter to allow the use of ordinary
// function as Wallet mutator.
type WalletFunc func(context.Context, *ent.WalletMutation) (ent.Value, error)

// Mutate calls f(ctx, m).
func (f WalletFunc) Mutate(ctx context.Context, m ent.Mutation) (ent.Value, error) {
	mv, ok := m.(*ent.WalletMutation)
	if !ok {
		return nil, fmt.Errorf("unexpected mutation type %T. expect *ent.WalletMutation", m)
	}
	return f(ctx, mv)
}

// The WalletItemsFunc type is an adapter to allow the use of ordinary
// function as WalletItems mutator.
type WalletItemsFunc func(context.Context, *ent.WalletItemsMutation) (ent.Value, error)

// Mutate calls f(ctx, m).
func (f WalletItemsFunc) Mutate(ctx context.Context, m ent.Mutation) (ent.Value, error) {
	mv, ok := m.(*ent.WalletItemsMutation)
	if !ok {
		return nil, fmt.Errorf("unexpected mutation type %T. expect *ent.WalletItemsMutation", m)
	}
	return f(ctx, mv)
}

// Condition is a hook condition function.
type Condition func(context.Context, ent.Mutation) bool

// And groups conditions with the AND operator.
func And(first, second Condition, rest ...Condition) Condition {
	return func(ctx context.Context, m ent.Mutation) bool {
		if !first(ctx, m) || !second(ctx, m) {
			return false
		}
		for _, cond := range rest {
			if !cond(ctx, m) {
				return false
			}
		}
		return true
	}
}

// Or groups conditions with the OR operator.
func Or(first, second Condition, rest ...Condition) Condition {
	return func(ctx context.Context, m ent.Mutation) bool {
		if first(ctx, m) || second(ctx, m) {
			return true
		}
		for _, cond := range rest {
			if cond(ctx, m) {
				return true
			}
		}
		return false
	}
}

// Not negates a given condition.
func Not(cond Condition) Condition {
	return func(ctx context.Context, m ent.Mutation) bool {
		return !cond(ctx, m)
	}
}

// HasOp is a condition testing mutation operation.
func HasOp(op ent.Op) Condition {
	return func(_ context.Context, m ent.Mutation) bool {
		return m.Op().Is(op)
	}
}

// HasAddedFields is a condition validating `.AddedField` on fields.
func HasAddedFields(field string, fields ...string) Condition {
	return func(_ context.Context, m ent.Mutation) bool {
		if _, exists := m.AddedField(field); !exists {
			return false
		}
		for _, field := range fields {
			if _, exists := m.AddedField(field); !exists {
				return false
			}
		}
		return true
	}
}

// HasClearedFields is a condition validating `.FieldCleared` on fields.
func HasClearedFields(field string, fields ...string) Condition {
	return func(_ context.Context, m ent.Mutation) bool {
		if exists := m.FieldCleared(field); !exists {
			return false
		}
		for _, field := range fields {
			if exists := m.FieldCleared(field); !exists {
				return false
			}
		}
		return true
	}
}

// HasFields is a condition validating `.Field` on fields.
func HasFields(field string, fields ...string) Condition {
	return func(_ context.Context, m ent.Mutation) bool {
		if _, exists := m.Field(field); !exists {
			return false
		}
		for _, field := range fields {
			if _, exists := m.Field(field); !exists {
				return false
			}
		}
		return true
	}
}

// If executes the given hook under condition.
//
//	hook.If(ComputeAverage, And(HasFields(...), HasAddedFields(...)))
//
func If(hk ent.Hook, cond Condition) ent.Hook {
	return func(next ent.Mutator) ent.Mutator {
		return ent.MutateFunc(func(ctx context.Context, m ent.Mutation) (ent.Value, error) {
			if cond(ctx, m) {
				return hk(next).Mutate(ctx, m)
			}
			return next.Mutate(ctx, m)
		})
	}
}

// On executes the given hook only for the given operation.
//
//	hook.On(Log, ent.Delete|ent.Create)
//
func On(hk ent.Hook, op ent.Op) ent.Hook {
	return If(hk, HasOp(op))
}

// Unless skips the given hook only for the given operation.
//
//	hook.Unless(Log, ent.Update|ent.UpdateOne)
//
func Unless(hk ent.Hook, op ent.Op) ent.Hook {
	return If(hk, Not(HasOp(op)))
}

// FixedError is a hook returning a fixed error.
func FixedError(err error) ent.Hook {
	return func(ent.Mutator) ent.Mutator {
		return ent.MutateFunc(func(context.Context, ent.Mutation) (ent.Value, error) {
			return nil, err
		})
	}
}

// Reject returns a hook that rejects all operations that match op.
//
//	func (T) Hooks() []ent.Hook {
//		return []ent.Hook{
//			Reject(ent.Delete|ent.Update),
//		}
//	}
//
func Reject(op ent.Op) ent.Hook {
	hk := FixedError(fmt.Errorf("%s operation is not allowed", op))
	return On(hk, op)
}

// Chain acts as a list of hooks and is effectively immutable.
// Once created, it will always hold the same set of hooks in the same order.
type Chain struct {
	hooks []ent.Hook
}

// NewChain creates a new chain of hooks.
func NewChain(hooks ...ent.Hook) Chain {
	return Chain{append([]ent.Hook(nil), hooks...)}
}

// Hook chains the list of hooks and returns the final hook.
func (c Chain) Hook() ent.Hook {
	return func(mutator ent.Mutator) ent.Mutator {
		for i := len(c.hooks) - 1; i >= 0; i-- {
			mutator = c.hooks[i](mutator)
		}
		return mutator
	}
}

// Append extends a chain, adding the specified hook
// as the last ones in the mutation flow.
func (c Chain) Append(hooks ...ent.Hook) Chain {
	newHooks := make([]ent.Hook, 0, len(c.hooks)+len(hooks))
	newHooks = append(newHooks, c.hooks...)
	newHooks = append(newHooks, hooks...)
	return Chain{newHooks}
}

// Extend extends a chain, adding the specified chain
// as the last ones in the mutation flow.
func (c Chain) Extend(chain Chain) Chain {
	return c.Append(chain.hooks...)
}
