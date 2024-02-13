package processor

import (
	"context"
	"fmt"
	"math/big"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/indexer/utils"
	"github.com/dopedao/dope-monorepo/packages/api/internal/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/wallet"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/ethereum/go-ethereum/common"
	"github.com/rs/zerolog"
)

// This ensures we don't hammer the RPC for checking claims since below
// contains a dumb loop
var skipClaimsDuration = 10 * time.Minute

type PaperProcessor struct {
	bindings.BasePaperProcessor
}

func (p *PaperProcessor) ProcessTransfer(ctx context.Context, e bindings.PaperTransfer) (func(tx *ent.Tx) error, error) {
	log := logger.Log.With().Str("PaperProcessor", "ProcessTransfer").Logger()

	blockTimeStamp, err := utils.EthBlockCache.GetTimestampByNumber(context.Background(),
		p.Eth,
		new(big.Int).SetUint64(e.Raw.BlockNumber))
	if err != nil {
		return nil, fmt.Errorf("PAPER getting block %d: %w", e.Raw.BlockNumber, err)
	}
	blockTime := time.Unix(int64(blockTimeStamp), 0)

	log.Debug().
		Int("Amount", int(e.Value.Int64())).
		Str("Wallet From", e.From.Hex()).
		Str("Wallet To", e.To.Hex())

	err = ensureWalletExists(ctx, e.From)
	if err != nil {
		return nil, err
	}
	fromWalletBal, fromShouldUpdate, fromErr := checkBalanceForWalletWithTimeout(
		ctx, p, e, e.From, blockTime, &log)
	if fromErr != nil {
		return nil, fromErr
	}

	err = ensureWalletExists(ctx, e.To)
	if err != nil {
		return nil, err
	}
	toWalletBal, toShouldUpdate, toErr := checkBalanceForWalletWithTimeout(
		ctx, p, e, e.To, blockTime, &log)
	if toErr != nil {
		return nil, toErr
	}

	return func(tx *ent.Tx) error {
		// Set balances for everything except the null address
		// from the paper contract.
		if e.From != (common.Address{}) && fromShouldUpdate {
			err = updatePaperBalanceForWallet(
				ctx, tx, p, e, e.From, fromWalletBal, blockTime)
			if err != nil {
				return err
			}
		}
		if e.To != (common.Address{}) && toShouldUpdate {
			err = updatePaperBalanceForWallet(
				ctx, tx, p, e, e.To, toWalletBal, blockTime)
			if err != nil {
				return err
			}
		}
		return nil
	}, nil
}

func checkBalanceForWalletWithTimeout(
	ctx context.Context,
	p *PaperProcessor,
	e bindings.PaperTransfer,
	walletAddress common.Address,
	blockTime time.Time,
	log *zerolog.Logger) (*big.Int, bool, error) {

	ctxWithTimeout, cancel := context.WithTimeout(ctx, 1*time.Second)
	defer cancel()

	// Create a channel to receive the result
	result := make(chan struct {
		*big.Int
		bool
		error
	}, 1)

	go func() {
		bal, ok, err := checkBalanceForWallet(ctxWithTimeout, p, e, walletAddress, blockTime, log)
		result <- struct {
			*big.Int
			bool
			error
		}{bal, ok, err}
	}()

	// Wait for the result or timeout
	select {
	case <-ctxWithTimeout.Done():
		// Not the end of the world right now if balance isn't updated
		// properly when updating a ton of them at once during initialization.
		//
		// We'll just get it next time.
		log.Warn().Msgf("checkBalanceForWalletWithTimeout timed out for wallet %s", walletAddress.Hex())
		return nil, false, nil
		// return nil, false, fmt.Errorf("checkBalanceForWalletWithTimeout timed out for wallet %s", walletAddress.Hex())
	case res := <-result:
		return res.Int, res.bool, res.error
	}
}

func checkBalanceForWallet(
	ctx context.Context,
	p *PaperProcessor,
	e bindings.PaperTransfer,
	walletAddress common.Address,
	blockTime time.Time,
	log *zerolog.Logger) (*big.Int, bool, error) {
	bal := big.NewInt(0)

	// Only update if the balance is different &
	// block time is newer than last_set_paper_balance_at
	dbWallet, err := dbClient.Wallet.Get(ctx, walletAddress.Hex())
	if err != nil {
		return bal, false, fmt.Errorf("PAPER getting wallet %s from db: %w", walletAddress.Hex(), err)
	}

	if dbWallet.LastSetPaperBalanceAt.After(blockTime) {
		return bal, false, nil
	}
	log.Debug().Msgf("✅ Checking PAPER balance for %v", walletAddress.Hex())

	paperBalance, err := p.Contract.BalanceOf(nil, walletAddress)
	log.Debug().Msgf("📜 PAPER balance for %v is %v", walletAddress.Hex(), paperBalance.String())
	if err != nil {
		return bal, false, fmt.Errorf("PAPER getting from wallet %s balance at txn %s: %w", e.From.Hex(), e.Raw.TxHash.Hex(), err)
	}
	// Skip tx if the balance is the same
	if dbWallet.Paper.Int.Cmp(paperBalance) == 0 {
		return bal, false, nil
	}
	return bal, true, nil
}

func updatePaperBalanceForWallet(
	ctx context.Context,
	tx *ent.Tx,
	p *PaperProcessor,
	e bindings.PaperTransfer,
	walletAddress common.Address,
	paperBalance *big.Int,
	blockTime time.Time) error {
	log := logger.Log.With().Str("PaperProcessor", "updatePaperBalanceForWallet").Logger()

	log.Debug().
		Str("Wallet", walletAddress.Hex()).
		Str("Paper Balance", paperBalance.String()).
		Msg("Setting PAPER balance")

	err := tx.Wallet.Create().
		SetID(walletAddress.Hex()).
		SetPaper(schema.BigInt{Int: paperBalance}).
		SetLastSetPaperBalanceAt(blockTime).
		OnConflictColumns(wallet.FieldID).
		SetPaper(schema.BigInt{Int: paperBalance}).
		Exec(ctx)
	if err != nil {
		return fmt.Errorf("PAPER update from wallet %s at txn %s: %w", walletAddress, e.Raw.TxHash.Hex(), err)
	}
	return nil
}
