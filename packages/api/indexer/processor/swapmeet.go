package processor

import (
	"context"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"math/big"
	"strconv"
	"strings"

	"github.com/dopedao/dope-monorepo/packages/api/internal/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/item"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/wallet"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/walletitems"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/rs/zerolog"
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
	metadata, err := p.Contract.TokenURI(nil, e.Id)
	if err != nil {
		// Tagged logger
		_, log := logger.LogFor(
			ctx,
			func(zctx *zerolog.Context) zerolog.Context {
				return zctx.
					Str("SwapMeetProcessor", "ProcessSetRle").
					Str("ItemId", e.Id.String())
			})

		log.Warn().Err(err).Msg("Failed getting TokenURI during ProcessSetRle")
		return func(tx *ent.Tx) error {
			if err := tx.Item.Create().
				SetID(e.Id.String()).
				SetTier(item.TierCOMMON).
				SetType("UNKNOWN").
				SetName("UNKNOWN").
				OnConflictColumns(item.FieldID).
				UpdateNewValues().
				Exec(ctx); err != nil {
				return fmt.Errorf("failed adding generic Item inside ProcessSetRle %s rles: %w", e.Id.String(), err)
			}
			return nil
		}, nil
	}

	male, err := p.Contract.TokenRle(nil, e.Id, 0)
	if err != nil {
		return nil, fmt.Errorf("getting item %s male rle: %w", e.Id.String(), err)
	}

	female, err := p.Contract.TokenRle(nil, e.Id, 1)
	if err != nil {
		return nil, fmt.Errorf("getting item %s female rle: %w", e.Id.String(), err)
	}

	decoded, err := base64.StdEncoding.DecodeString(strings.TrimPrefix(metadata, "data:application/json;base64,"))
	if err != nil {
		return nil, fmt.Errorf("decoding metadata: %w", err)
	}

	var parsed Metadata
	if err := json.Unmarshal(decoded, &parsed); err != nil {
		return nil, fmt.Errorf("swapmeet unmarshalling metadata: %w", err)
	}

	return func(tx *ent.Tx) error {
		create := tx.Item.Create().
			SetID(e.Id.String())

		for _, a := range parsed.Attributes {
			v, err := strconv.Unquote(string(a.Value))
			if err != nil {
				return fmt.Errorf("parsing attribute value %v+: %w", a.Value, err)
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

func (p *SwapMeetProcessor) ProcessTransferBatch(
	ctx context.Context,
	e bindings.SwapMeetTransferBatch) (func(tx *ent.Tx) error, error) {
	return handleProcess("ProcessTransferBatch",
		p, ctx, e.From, e.To, e.Ids, e.Values, e.Raw)
}

func (p *SwapMeetProcessor) ProcessTransferSingle(
	ctx context.Context,
	e bindings.SwapMeetTransferSingle) (func(tx *ent.Tx) error, error) {
	idArr := []*big.Int{e.Id}
	valueArr := []*big.Int{e.Value}

	return handleProcess("ProcessTransferSingle",
		p, ctx, e.From, e.To, idArr, valueArr, e.Raw)
}

// Go Generics with structs are not supported yet, so we have to use
// lots of parameters to eliminate boilerplate code.
//
// The benefit is that we don't have to copypasta code across
// and fuck around with a million lines to find out why the indexer is broken.
func handleProcess(
	eventName string,
	p *SwapMeetProcessor,
	ctx context.Context,
	from common.Address,
	to common.Address,
	ids []*big.Int,
	values []*big.Int,
	raw ethtypes.Log) (func(tx *ent.Tx) error, error) {
	// Tagged logger
	_, log := logger.LogFor(
		ctx,
		func(zctx *zerolog.Context) zerolog.Context {
			return zctx.
				Str("SwapMeetProcessor", eventName).
				Str("From", from.Hex()).
				Str("To", to.Hex()).
				Str("IDs", fmt.Sprintf("%v", ids)).
				Uint64("Block", raw.BlockNumber)
		})

	return func(tx *ent.Tx) error {
		if err := ensureWalletExists(ctx, tx, to); err != nil {
			return fmt.Errorf("swapmeet: %w", err)
		}

		log.Info().
			Msg("Transferring gear")

		// Transfer of Gear from wallet to wallet (not the null address)
		if from != (common.Address{}) {
			log.Info().
				Msg("Transferring gear wallet to wallet")

			for i, id := range ids {
				if err := tx.WalletItems.
					UpdateOneID(fmt.Sprintf("%s-%s", from.Hex(), id.String())).
					AddBalance(schema.BigInt{Int: new(big.Int).Neg(values[i])}).
					Exec(ctx); err != nil {
					return fmt.Errorf("swapmeet: update wallet items balance: %w", err)
				}
			}
		}
		// Transfer of Gear to a real wallet (not the null address)
		if to != (common.Address{}) {
			for i, id := range ids {
				if err := tx.WalletItems.
					Create().
					SetID(fmt.Sprintf("%s-%s", to.Hex(), id.String())).
					SetBalance(schema.BigInt{Int: values[i]}).
					SetWalletID(to.Hex()).
					SetItemID(id.String()).
					OnConflictColumns(walletitems.FieldID).
					UpdateNewValues().
					Exec(ctx); err != nil {
					return fmt.Errorf("swapmeet: upsert wallet items balance: %w", err)
				}
			}
		}

		// REFRESH EQUIPMENT OF WALLET ACTED UPON ---------------------------------
		var walletAddressToRefresh string
		var desc string

		if from != (common.Address{}) && to == hustlerAddr {
			// EQUIP of hustler
			walletAddressToRefresh = from.Hex()
			desc = "REFRESH FROM EQUIP"
		} else if from == hustlerAddr {
			// UN-Equip of hustler
			walletAddressToRefresh = to.Hex()
			desc = "REFRESH FROM UNEQUIP"
		} else {
			// Wallet to wallet transfer
			log.Info().
				Str("From", from.Hex()).
				Str("To", to.Hex()).
				Msg("Wallet to wallet transfer - skipping equipment refresh")
			return nil
		}

		log.Info().
			Str("Wallet Address", walletAddressToRefresh).
			Msg("Refreshing equipment for hustler owner")

		wallet, err := tx.Wallet.Query().
			WithHustlers().
			Where(wallet.IDEQ(walletAddressToRefresh)).
			First(ctx)
		if err != nil {
			return fmt.Errorf("getting user's hustlers: %w", err)
		}

		log.Debug().
			Str("Found Wallet Address", walletAddressToRefresh).
			Str("Found Wallet", wallet.ID).
			Int("Hustler Count", len(wallet.Edges.Hustlers)).
			Msgf(desc)

		for _, h := range wallet.Edges.Hustlers {
			if err := RefreshHustlerEquipment(
				ctx, p.Eth, tx, h.ID, hustlerAddr,
				new(big.Int).SetUint64(raw.BlockNumber)); err != nil {
				return err
			}
		}

		return nil
	}, nil
}
