package processor

import (
	"context"
	"fmt"
	"math/big"

	"github.com/dopedao/dope-monorepo/packages/api/internal/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/wallet"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/ethereum/go-ethereum/common"
	"github.com/rs/zerolog/log"
)

type PaperProcessor struct {
	bindings.BasePaperProcessor
}

func (p *PaperProcessor) ProcessTransfer(ctx context.Context, e bindings.PaperTransfer) (func(tx *ent.Tx) error, error) {
	ctx, log := logger.LogFor(ctx)

	log.Debug().
		Str("From", e.From.Hex()).
		Str("to", e.To.Hex()).
		Str("Amount", e.Value.String()).
		Msg("PAPER transfer")

	return func(tx *ent.Tx) error {
		if e.To != (common.Address{}) {

			bal, err := p.Contract.BalanceOf(nil, e.To)
			if err != nil {
				return fmt.Errorf("PAPER getting to wallet %s balance at txn %s: %w", e.To.Hex(), e.Raw.TxHash.Hex(), err)
			}

			if err := tx.Wallet.Create().
				SetID(e.To.Hex()).
				SetPaper(schema.BigInt{Int: bal}).
				OnConflictColumns(wallet.FieldID).
				SetPaper(schema.BigInt{Int: bal}).
				Exec(ctx); err != nil {
				return fmt.Errorf("PAPER update to wallet %s at txn %s: %w", e.To.Hex(), e.Raw.TxHash.Hex(), err)
			}
		}

		if e.From != (common.Address{}) {
			log.Debug().Msgf("PAPER transfer from %s", e.From.Hex())
			bal, err := p.Contract.BalanceOf(nil, e.From)
			if err != nil {
				return fmt.Errorf("PAPER getting from wallet %s balance at txn %s: %w", e.From.Hex(), e.Raw.TxHash.Hex(), err)
			}

			if err := tx.Wallet.Create().
				SetID(e.From.Hex()).
				SetPaper(schema.BigInt{Int: bal}).
				OnConflictColumns(wallet.FieldID).
				SetPaper(schema.BigInt{Int: bal}).
				Exec(ctx); err != nil {
				return fmt.Errorf("PAPER update from wallet %s at txn %s: %w", e.From.Hex(), e.Raw.TxHash.Hex(), err)
			}
		}

		// PAPER Mint.
		//
		// Could be from claimAllForOwner, claimRangeForOwner,
		// or claimById. (or other?)
		//
		// We don't know which, so we just update all DOPEs owned by address
		// to set their claim status.
		if e.From == (common.Address{}) {
			// We have other scripts to handle this in a more comprehensive fashion
			// so fire and forget here. We can monitor the logs for errors.
			go func() {
				err := handlePaperMint(ctx, e, p)
				if err != nil {
					log.Err(err).Msg("PAPER mint handler error")
				}
			}()
		}

		return nil
	}, nil
}

var paperClaimIndexedWalletAddresses = map[string]bool{}

func handlePaperMint(
	ctx context.Context,
	e bindings.PaperTransfer,
	p *PaperProcessor,
) error {
	log.Debug().Msgf("PAPER MINT from %s", e.From.Hex())

	if paperClaimIndexedWalletAddresses[e.To.Hex()] {
		fmt.Printf("SKIPPING %v\n", e.To.Hex())
		return nil
	} else {
		// We check all DOPES for this address below,
		// so we don't need to do it more than once
		paperClaimIndexedWalletAddresses[e.To.Hex()] = true
	}

	// "Loot" is a throwback to the original Loot project.
	// We didn't do lots of planning naming this stuff.
	loot, err := p.Contract.Loot(nil)
	if err != nil {
		return fmt.Errorf("PAPER getting DOPE NFT address: %w", err)
	}
	// Get contract bindings for DOPE
	dope, err := bindings.NewDope(loot, p.Eth)
	if err != nil {
		return fmt.Errorf("PAPER initializing dope contract: %w", err)
	}
	// Find out how many DOPEs are owned by the address
	bal, err := dope.BalanceOf(nil, e.To)
	if err != nil {
		return fmt.Errorf("PAPER getting dope balance: %w", err)
	}

	// Loop all DOPEs owned by address.
	for i := 0; i < int(bal.Int64()); i++ {
		// log.Debug().
		// 	Str("wallet address", e.To.Hex()).
		// 	Str("balance", bal.String()).
		// 	Int("index", i).
		// 	Msg("")

		// This is slow because it has to make a contract call to get token ID
		id, err := dope.TokenOfOwnerByIndex(nil, e.To, big.NewInt(int64(i)))

		if err != nil {
			return fmt.Errorf("PAPER token of owner by index: %w", err)
		}

		// If claimed already in our DB skip the rest
		dbDope, err := dbprovider.Ent().Dope.Get(ctx, id.String())
		if err == nil && dbDope.Claimed {
			// log.Debug().Msgf("PAPER ✨already✨ claimed for DOPE %v", id.String())
			continue
		} else if err != nil {
			return fmt.Errorf("PAPER getting dope from db: %w", err)
		}

		// This is slow because it has to make a contract call
		claimed, err := p.Contract.ClaimedByTokenId(nil, id)
		if err != nil {
			return fmt.Errorf("PAPER claimed by token id: %w", err)
		}

		if err := dbprovider.Ent().Dope.UpdateOneID(id.String()).SetClaimed(claimed).Exec(ctx); err != nil {
			return fmt.Errorf("PAPER updating dope claimed status: %w", err)
		} else {
			log.Debug().Msgf("💸 NEW PAPER claimed for DOPE %v", id.String())
		}
	}
	return nil
}
