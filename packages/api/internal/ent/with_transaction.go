package ent

import (
	"context"

	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/pkg/errors"
)

func WithTx(
	ctx context.Context,
	client *Client,
	fn func(tx *Tx) error) error {

	log := logger.Log.With().Str("method", "WithTx").Logger()

	// ctxWithTimeout, cancel := context.WithTimeout(ctx, 5*time.Second)
	// defer cancel() // Cancel ctx as soon as we're done
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
		log.Warn().Err(err).Msg("Transaction failed, rolling back.")
		if rerr := tx.Rollback(); rerr != nil {
			err = errors.Wrapf(err, "Rollback transaction: %v", rerr)
		}
		return err
	}

	if err := tx.Commit(); err != nil {
		return errors.Wrapf(err, "Committing transaction: %v", err)
	}
	return nil
}
