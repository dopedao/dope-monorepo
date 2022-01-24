package ent

import (
	"context"

	"github.com/dopedao/dope-monorepo/packages/api/base"
	"github.com/pkg/errors"
)

func WithTx(ctx context.Context, client *Client, fn func(tx *Tx) error) error {
	ctx, log := base.LogFor(ctx)
	tx, err := client.Tx(ctx)
	if err != nil {
		return err
	}
	defer func() {
		if v := recover(); v != nil {
			if err := tx.Rollback(); err != nil {
				log.Err(err).Msg("Transaction Rollback.")
			}
			panic(v)
		}
	}()
	if err := fn(tx); err != nil {
		if rerr := tx.Rollback(); rerr != nil {
			err = errors.Wrapf(err, "rolling back transaction: %v", rerr)
		}
		return err
	}
	if err := tx.Commit(); err != nil {
		return errors.Wrapf(err, "committing transaction: %v", err)
	}
	return nil
}
