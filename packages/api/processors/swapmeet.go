package processors

import (
	"context"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"math/big"
	"strings"

	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
	"github.com/dopedao/dope-monorepo/packages/api/ent/walletitems"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
)

type SwapMeetProcessor struct {
	bindings.UnimplementedSwapMeetProcessor
	hustlers *bindings.HustlerCaller
}

type Metadata struct {
	Image string `json:"image"`
}

var hustlerAddr = common.HexToAddress("0xDbfEaAe58B6dA8901a8a40ba0712bEB2EE18368E")

func (p *SwapMeetProcessor) Setup(address common.Address, eth interface {
	ethereum.ChainReader
	ethereum.ChainStateReader
	ethereum.TransactionReader
	bind.ContractBackend
}) error {
	if err := p.UnimplementedSwapMeetProcessor.Setup(address, eth); err != nil {
		return fmt.Errorf("swapmeet setup: %+v", err)
	}

	var err error
	p.hustlers, err = bindings.NewHustlerCaller(hustlerAddr, eth)
	if err != nil {
		return fmt.Errorf("swapmeet setup: %+v", err)
	}

	return nil
}

func (p *SwapMeetProcessor) ProcessSetRle(ctx context.Context, e *bindings.SwapMeetSetRle, tx *ent.Tx) error {
	male, err := p.Contract.TokenRle(nil, e.Id, 0)
	if err != nil {
		return fmt.Errorf("getting male item rle: %w", err)
	}

	female, err := p.Contract.TokenRle(nil, e.Id, 1)
	if err != nil {
		return fmt.Errorf("getting female item rle: %w", err)
	}

	metadata, err := p.Contract.TokenURI(nil, e.Id)
	if err != nil {
		return fmt.Errorf("getting metadata item rle: %w", err)
	}

	decoded, err := base64.StdEncoding.DecodeString(strings.TrimPrefix(metadata, "data:application/json;base64,"))
	if err != nil {
		return fmt.Errorf("decoding metadata: %w", err)
	}

	var parsed Metadata
	if err := json.Unmarshal(decoded, &parsed); err != nil {
		return fmt.Errorf("unmarshalling metadata: %w", err)
	}

	if err := tx.Item.UpdateOneID(e.Id.String()).SetRles(schema.RLEs{
		Male:   hex.EncodeToString(male),
		Female: hex.EncodeToString(female),
	}).SetSvg(parsed.Image).Exec(ctx); err != nil {
		return fmt.Errorf("updating item %s rles: %w", e.Id.String(), err)
	}

	return nil
}

func (p *SwapMeetProcessor) ProcessTransferBatch(ctx context.Context, e *bindings.SwapMeetTransferBatch, tx *ent.Tx) error {
	if e.From != (common.Address{}) {
		for i, id := range e.Ids {
			if err := tx.WalletItems.
				UpdateOneID(fmt.Sprintf("%s-%s", e.From.Hex(), id.String())).
				AddBalance(schema.BigInt{Int: new(big.Int).Neg(e.Values[i])}).Exec(ctx); err != nil {
				return fmt.Errorf("swapmeet: update wallet items balance: %w", err)
			}
		}
	}

	if e.To != (common.Address{}) {
		for i, id := range e.Ids {
			if err := tx.WalletItems.
				Create().
				SetID(fmt.Sprintf("%s-%s", e.To.Hex(), id.String())).
				SetBalance(schema.BigInt{Int: e.Values[i]}).
				OnConflictColumns(walletitems.FieldID).
				AddBalance(schema.BigInt{Int: e.Values[i]}).
				Exec(ctx); err != nil {
				return fmt.Errorf("swapmeet: upsert wallet items balance: %w", err)
			}
		}
	}

	return nil
}

func (p *SwapMeetProcessor) ProcessTransferSingle(ctx context.Context, e *bindings.SwapMeetTransferSingle, tx *ent.Tx) error {
	if e.From != (common.Address{}) {
		if err := tx.Wallet.UpdateOneID(e.From.Hex()).RemoveItemIDs(e.Id.String()).Exec(ctx); err != nil {
			return fmt.Errorf("update from wallet: %w", err)
		}
	}

	if e.To != (common.Address{}) {
		if err := tx.Wallet.Create().
			SetID(e.To.Hex()).
			AddItemIDs(e.Id.String()).
			OnConflictColumns(wallet.FieldID).
			UpdateNewValues().
			Exec(ctx); err != nil {
			return fmt.Errorf("upsert to wallet: %w", err)
		}
	}

	// If it is not from the zero address and to the hustler contract, it is
	// an equip to an existing hustler.
	if e.From != (common.Address{}) && e.To == hustlerAddr {
		hustlers, err := tx.Wallet.Query().WithHustlers().Where(wallet.IDEQ(e.From.Hex())).All(ctx)
		if err != nil {
			return fmt.Errorf("getting user's hustlers: %w", err)
		}

		for _, h := range hustlers {
			if err := refreshEquipment(ctx, p.Eth, tx, h.ID, hustlerAddr, new(big.Int).SetUint64(e.Raw.BlockNumber)); err != nil {
				return err
			}
		}
	}

	// If from the hustler contract this is an unequip.
	if e.From == hustlerAddr {
		hustlers, err := tx.Wallet.Query().WithHustlers().Where(wallet.IDEQ(e.To.Hex())).All(ctx)
		if err != nil {
			return fmt.Errorf("getting user's hustlers: %w", err)
		}

		for _, h := range hustlers {
			if err := refreshEquipment(ctx, p.Eth, tx, h.ID, hustlerAddr, new(big.Int).SetUint64(e.Raw.BlockNumber)); err != nil {
				return err
			}
		}
	}

	return nil
}
