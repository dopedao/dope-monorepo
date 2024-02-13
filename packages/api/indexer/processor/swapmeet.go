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
	"sync"

	"github.com/dopedao/dope-monorepo/packages/api/internal/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/item"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/wallet"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
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
	log := logger.Log.With().
		Str("SwapMeetProcessor", "ProcessSetRle").
		Str("ItemId", e.Id.String()).
		Logger()

	if err != nil {
		log.Warn().Err(err).
			Msg("Failed getting TokenURI during ProcessSetRle")
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

	ctx, log := taggedLogger(ctx, "ProcessTransferBatch", e.From, e.To, e.Ids, e.Raw.BlockNumber)

	if err := ensureWalletExists(ctx, e.To); err != nil {
		return nil, fmt.Errorf("swapmeet: %w", err)
	}

	// Return the committer ================================================
	return handleUpdate("ProcessTransferBatch",
		p, ctx, e.From, e.To, e.Ids, e.Values, e.Raw.BlockNumber, log)
}

func (p *SwapMeetProcessor) ProcessTransferSingle(
	ctx context.Context,
	e bindings.SwapMeetTransferSingle) (func(tx *ent.Tx) error, error) {

	// Since we are only dealing with a single item, we can just pass
	// the ID and value as a slice to the handleUpdate function
	idArr := []*big.Int{e.Id}
	valueArr := []*big.Int{e.Value}

	ctx, log := taggedLogger(ctx, "ProcessTransferSingle", e.From, e.To, idArr, e.Raw.BlockNumber)

	if err := ensureWalletExists(ctx, e.To); err != nil {
		return nil, fmt.Errorf("swapmeet: %w", err)
	}

	// Return the committer ================================================
	return handleUpdate("ProcessTransferSingle",
		p, ctx, e.From, e.To, idArr, valueArr, e.Raw.BlockNumber, log)
}

func handleUpdate(
	eventName string,
	p *SwapMeetProcessor,
	ctx context.Context,
	from common.Address,
	to common.Address,
	ids []*big.Int,
	values []*big.Int,
	blockNumber uint64,
	log *zerolog.Logger) (func(tx *ent.Tx) error, error) {

	return func(tx *ent.Tx) error {
		log.Debug().
			Msgf("Reducing gear balance from previous wallet %s", from)
		for i, id := range ids {
			negativeBal := new(big.Int).Neg(new(big.Int).Abs(values[i]))
			err := updateGearBalance(ctx, tx, id, from, negativeBal)
			if err != nil {
				return fmt.Errorf("updateGearBalance: %w", err)
			}
		}
		log.Debug().
			Msgf("Incrementing gear balance in new wallet %s", to)
		for i, id := range ids {
			err := updateGearBalance(ctx, tx, id, to, values[i])
			if err != nil {
				return fmt.Errorf("updateGearBalance: %w", err)
			}
		}
		err := updateAllHustlerEquipmentForOwner(
			ctx, tx, p, from, to, ids, values, blockNumber)
		if err != nil {
			return fmt.Errorf("updateAllHustlerEquipmentForOwner: %w", err)
		}
		return nil

	}, nil
}

// # THIS IS A DIRTY YUCKY HACK
//
// Because it's impossible to get the hustler ID from the transfer event,
// we need to query the contract to get the owner of the item and then
// update the hustler's equipment.
//
// This doesn't set the owner of the item in the database, it only updates
// the hustler's equipment.
//
// Ideally, we'd be able to get the owner of the item from the transfer event
// but it's too much of a pain in the ass, and would require decoding
// transaction input data for each event.
func updateAllHustlerEquipmentForOwner(
	ctx context.Context,
	tx *ent.Tx,
	p *SwapMeetProcessor,
	from common.Address,
	to common.Address,
	ids []*big.Int,
	values []*big.Int,
	blockNum uint64) error {
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
		log.Debug().
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
		return fmt.Errorf("Getting hustlers for %v: %w", walletAddressToRefresh, err)
	}

	log.Debug().
		Str("Found Wallet Address", walletAddressToRefresh).
		Str("Found Wallet", wallet.ID).
		Int("Hustler Count", len(wallet.Edges.Hustlers)).
		Msgf(desc)

	var wg sync.WaitGroup
	errChan := make(chan error, len(wallet.Edges.Hustlers))

	// Some wallets can have LOTS of hustlers so lets run this
	// in parallel to speed things up
	for _, h := range wallet.Edges.Hustlers {
		wg.Add(1)
		go func(hustlerID string) {
			defer wg.Done()
			err := ProcessAndUpdateHustlerEquipment(
				ctx,
				p.Eth,
				tx,
				hustlerID,
				new(big.Int).SetUint64(blockNum))
			if err != nil {
				errChan <- err
			}
		}(h.ID)
	}

	go func() {
		wg.Wait()
		close(errChan)
	}()

	for err := range errChan {
		log.Error().Err(err).Msg("Failed to refresh hustler equipment")
		return err
	}
	return nil
}

func updateGearBalance(
	ctx context.Context,
	tx *ent.Tx,
	id *big.Int,
	wallet common.Address,
	balance *big.Int, // can be negative!
) error {
	// We don't care about the gear balance for the dead address
	if wallet == (common.Address{}) {
		return nil
	}

	// Check if the item exists
	exists, err := tx.Item.Query().Where(item.ID(id.String())).Exist(ctx)
	if err != nil {
		return fmt.Errorf("Query Gear item: %w", err)
	}
	if !exists {
		return fmt.Errorf("Gear item %s does not exist", id.String())
	}

	// Generate the WalletItem ID
	walletItemID := fmt.Sprintf("%s-%s", wallet.Hex(), id.String())

	// Retrieve the existing WalletItem, if it exists
	wi, err := tx.WalletItems.Get(ctx, walletItemID)
	if err != nil && !ent.IsNotFound(err) {
		return fmt.Errorf("retrieving WalletItem: %w", err)
	}

	// If the WalletItem exists, adjust the balance
	if wi != nil {
		newBalance := new(big.Int).Add(wi.Balance.Int, balance)
		_, err := tx.WalletItems.UpdateOneID(walletItemID).
			SetBalance(schema.BigInt{Int: newBalance}).
			Save(ctx)
		if err != nil {
			return fmt.Errorf("updating WalletItem balance: %w", err)
		}
	} else {
		// If the WalletItem does not exist, create it with the initial balance
		_, err := tx.WalletItems.
			Create().
			SetID(walletItemID).
			SetBalance(schema.BigInt{Int: balance}).
			SetWalletID(wallet.Hex()).
			SetItemID(id.String()).
			Save(ctx)
		if err != nil {
			return fmt.Errorf("creating WalletItem with initial balance: %w", err)
		}
	}

	return nil
}

func taggedLogger(
	ctx context.Context,
	eventName string,
	from common.Address,
	to common.Address,
	ids []*big.Int,
	blockNumber uint64,
) (context.Context, *zerolog.Logger) {
	log := logger.Log.With().
		Str("SwapMeetProcessor", eventName).
		Str("From", from.Hex()).
		Str("To", to.Hex()).
		Str("IDs", fmt.Sprintf("%v", ids)).
		Logger()
	return ctx, &log
}
