package processors

import (
	"context"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"math/big"
	"strconv"
	"strings"

	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/item"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
	"github.com/dopedao/dope-monorepo/packages/api/ent/walletitems"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
)

type SwapMeetProcessor struct {
	bindings.BaseSwapMeetProcessor
	hustlers *bindings.HustlerCaller
}

type Attribute struct {
	Type        string          `json:"trait_type"`
	DisplayType string          `json:"display_type"`
	Value       json.RawMessage `json:"value"`
}

type Metadata struct {
	Image      string      `json:"image"`
	Attributes []Attribute `json:"attributes"`
}

func (p *SwapMeetProcessor) Setup(address common.Address, eth interface {
	ethereum.ChainReader
	ethereum.ChainStateReader
	ethereum.TransactionReader
	bind.ContractBackend
}) error {
	if err := p.BaseSwapMeetProcessor.Setup(address, eth); err != nil {
		return fmt.Errorf("swapmeet setup: %+v", err)
	}

	var err error
	p.hustlers, err = bindings.NewHustlerCaller(hustlerAddr, eth)
	if err != nil {
		return fmt.Errorf("swapmeet setup: %+v", err)
	}

	return nil
}

func (p *SwapMeetProcessor) ProcessSetRle(ctx context.Context, e bindings.SwapMeetSetRle) (func(tx *ent.Tx) error, error) {
	male, err := p.Contract.TokenRle(nil, e.Id, 0)
	if err != nil {
		return nil, fmt.Errorf("getting item %s male rle: %w", e.Id.String(), err)
	}

	female, err := p.Contract.TokenRle(nil, e.Id, 1)
	if err != nil {
		return nil, fmt.Errorf("getting item %s female rle: %w", e.Id.String(), err)
	}

	metadata, err := p.Contract.TokenURI(nil, e.Id)
	if err != nil {
		return nil, fmt.Errorf("getting item %s metadata: %w", e.Id.String(), err)
	}

	decoded, err := base64.StdEncoding.DecodeString(strings.TrimPrefix(metadata, "data:application/json;base64,"))
	if err != nil {
		return nil, fmt.Errorf("decoding metadata: %w", err)
	}

	var parsed Metadata
	if err := json.Unmarshal(decoded, &parsed); err != nil {
		return nil, fmt.Errorf("unmarshalling metadata: %w", err)
	}

	return func(tx *ent.Tx) error {
		create := tx.Item.Create().
			SetID(e.Id.String())

		for _, a := range parsed.Attributes {
			v, err := strconv.Unquote(string(a.Value))
			if err != nil {
				return fmt.Errorf("parsing attribuet value %v+: %w", a.Value, err)
			}

			switch a.Type {
			case "Slot":
				create = create.SetType(item.Type(strings.ToUpper(v)))
			case "Item":
				create = create.SetName(v)
			case "Suffix":
				create = create.SetSuffix(v)
			case "Name Prefix":
				create = create.SetNamePrefix(v)
			case "Name Suffix":
				create = create.SetNameSuffix(v)
			case "Augmentation":
				create = create.SetAugmented(true)
			}
		}

		greatness := 1
		tier := item.TierCOMMON

		switch len(parsed.Attributes) {
		case 3:
			greatness = 2
			tier = item.TierRARE
		case 5:
			greatness = 3
			tier = item.TierCUSTOM
		case 6:
			greatness = 4
			tier = item.TierBLACK_MARKET
		}

		if err := create.SetTier(tier).
			SetGreatness(greatness).
			SetRles(schema.RLEs{
				Male:   hex.EncodeToString(male),
				Female: hex.EncodeToString(female),
			}).SetSvg(parsed.Image).
			OnConflictColumns(item.FieldID).
			UpdateNewValues().
			Exec(ctx); err != nil {
			return fmt.Errorf("updating item %s rles: %w", e.Id.String(), err)
		}

		return nil
	}, nil
}

func (p *SwapMeetProcessor) ProcessTransferBatch(ctx context.Context, e bindings.SwapMeetTransferBatch) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error {
		if err := ensureWallet(ctx, tx, e.To); err != nil {
			return fmt.Errorf("swapmeet: %w", err)
		}

		if e.From != (common.Address{}) {
			for i, id := range e.Ids {
				if err := tx.WalletItems.
					UpdateOneID(fmt.Sprintf("%s-%s", e.From.Hex(), id.String())).
					AddBalance(schema.BigInt{Int: new(big.Int).Neg(e.Values[i])}).
					Exec(ctx); err != nil {
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
					SetWalletID(e.To.Hex()).
					SetItemID(id.String()).
					OnConflictColumns(walletitems.FieldID).
					AddBalance(schema.BigInt{Int: e.Values[i]}).
					Exec(ctx); err != nil {
					return fmt.Errorf("swapmeet: upsert wallet items balance: %w", err)
				}
			}
		}

		// If it is not from the zero address and to the hustler contract, it is
		// an equip to an existing hustler.
		if e.From != (common.Address{}) && e.To == hustlerAddr {
			wallet, err := tx.Wallet.Query().WithHustlers().Where(wallet.IDEQ(e.From.Hex())).First(ctx)
			if err != nil {
				return fmt.Errorf("getting user's hustlers: %w", err)
			}

			for _, h := range wallet.Edges.Hustlers {
				if err := refreshEquipment(ctx, p.Eth, tx, h.ID, hustlerAddr, new(big.Int).SetUint64(e.Raw.BlockNumber)); err != nil {
					return err
				}
			}
		}

		// If from the hustler contract this is an unequip.
		if e.From == hustlerAddr {
			wallet, err := tx.Wallet.Query().WithHustlers().Where(wallet.IDEQ(e.To.Hex())).First(ctx)
			if err != nil {
				return fmt.Errorf("getting user's hustlers: %w", err)
			}

			for _, h := range wallet.Edges.Hustlers {
				if err := refreshEquipment(ctx, p.Eth, tx, h.ID, hustlerAddr, new(big.Int).SetUint64(e.Raw.BlockNumber)); err != nil {
					return err
				}
			}
		}

		return nil
	}, nil
}

func (p *SwapMeetProcessor) ProcessTransferSingle(ctx context.Context, e bindings.SwapMeetTransferSingle) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error {
		if err := ensureWallet(ctx, tx, e.To); err != nil {
			return fmt.Errorf("swapmeet: %w", err)
		}

		if e.From != (common.Address{}) {
			if err := tx.WalletItems.
				UpdateOneID(fmt.Sprintf("%s-%s", e.From.Hex(), e.Id.String())).
				AddBalance(schema.BigInt{Int: new(big.Int).Neg(e.Value)}).
				Exec(ctx); err != nil {
				return fmt.Errorf("swapmeet: update wallet item balance: %w", err)
			}
		}

		if e.To != (common.Address{}) {
			if err := tx.WalletItems.
				Create().
				SetID(fmt.Sprintf("%s-%s", e.To.Hex(), e.Id.String())).
				SetBalance(schema.BigInt{Int: e.Value}).
				SetWalletID(e.To.Hex()).
				SetItemID(e.Id.String()).
				OnConflictColumns(walletitems.FieldID).
				AddBalance(schema.BigInt{Int: e.Value}).
				Exec(ctx); err != nil {
				return fmt.Errorf("swapmeet: upsert wallet item balance: %w", err)
			}
		}

		// If it is not from the zero address and to the hustler contract, it is
		// an equip to an existing hustler.
		if e.From != (common.Address{}) && e.To == hustlerAddr {
			wallet, err := tx.Wallet.Query().WithHustlers().Where(wallet.IDEQ(e.From.Hex())).First(ctx)
			if err != nil {
				return fmt.Errorf("getting user's hustlers: %w", err)
			}

			for _, h := range wallet.Edges.Hustlers {
				if err := refreshEquipment(ctx, p.Eth, tx, h.ID, hustlerAddr, new(big.Int).SetUint64(e.Raw.BlockNumber)); err != nil {
					return err
				}
			}
		}

		// If from the hustler contract this is an unequip.
		if e.From == hustlerAddr {
			wallet, err := tx.Wallet.Query().WithHustlers().Where(wallet.IDEQ(e.To.Hex())).First(ctx)
			if err != nil {
				return fmt.Errorf("getting user's hustlers: %w", err)
			}

			for _, h := range wallet.Edges.Hustlers {
				if err := refreshEquipment(ctx, p.Eth, tx, h.ID, hustlerAddr, new(big.Int).SetUint64(e.Raw.BlockNumber)); err != nil {
					return err
				}
			}
		}

		return nil
	}, nil
}
