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
	"github.com/dopedao/dope-monorepo/packages/api/ent/bodypart"
	"github.com/dopedao/dope-monorepo/packages/api/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	solsha3 "github.com/miguelmota/go-solidity-sha3"
)

const (
	MaleBody   uint8 = 0
	FemaleBody uint8 = 1
	MaleHair   uint8 = 2
	FemaleHair uint8 = 3
	Beard      uint8 = 4
)

var (
	componentsAddr = common.HexToAddress("0xe03C4eb2a0a797766a5DB708172e04f6A970DC7f")
	hustlerAddr    = common.HexToAddress("0xDbfEaAe58B6dA8901a8a40ba0712bEB2EE18368E")

	viewboxSlot   = big.NewInt(1)
	bodySlot      = big.NewInt(2)
	orderSlot     = big.NewInt(3)
	weaponSlot    = big.NewInt(5)
	clothesSlot   = big.NewInt(6)
	vehicleSlot   = big.NewInt(7)
	waistSlot     = big.NewInt(8)
	footSlot      = big.NewInt(9)
	handSlot      = big.NewInt(10)
	drugSlot      = big.NewInt(11)
	neckSlot      = big.NewInt(12)
	ringSlot      = big.NewInt(13)
	accessorySlot = big.NewInt(14)
)

type HustlerProcessor struct {
	bindings.UnimplementedHustlerProcessor
	components *bindings.Components
}

func (p *HustlerProcessor) Setup(address common.Address, eth interface {
	ethereum.ChainReader
	ethereum.ChainStateReader
	ethereum.TransactionReader
	bind.ContractBackend
}) error {
	if err := p.UnimplementedHustlerProcessor.Setup(address, eth); err != nil {
		return err
	}

	var err error
	p.components, err = bindings.NewComponents(componentsAddr, eth)
	if err != nil {
		return err
	}

	return nil
}

func (p *HustlerProcessor) ProcessAddRles(ctx context.Context, e *bindings.HustlerAddRles, tx *ent.Tx) error {
	var builders []*ent.BodyPartCreate

	var part bodypart.Type
	var sex bodypart.Sex

	switch e.Part {
	case MaleBody:
		part = bodypart.TypeBody
		sex = bodypart.SexMale
	case FemaleBody:
		part = bodypart.TypeBody
		sex = bodypart.SexFemale
	case MaleHair:
		part = bodypart.TypeHair
		sex = bodypart.SexMale
	case FemaleHair:
		part = bodypart.TypeHair
		sex = bodypart.SexFemale
	case Beard:
		part = bodypart.TypeBeard
		sex = bodypart.SexMale
	}

	n, err := tx.BodyPart.Query().Where(bodypart.And(bodypart.TypeEQ(part), bodypart.SexEQ(sex))).Count(ctx)
	if err != nil {
		return fmt.Errorf("hustler: getting body count: %w", err)
	}

	for i := 0; i < int(e.Len.Int64()); i++ {
		id := int64(n + i)
		rle, err := p.Contract.BodyRle(nil, e.Part, big.NewInt(id))
		if err != nil {
			return fmt.Errorf("hustler: getting body rle part %d, id: %d: %w", e.Part, id, err)
		}
		builders = append(builders, tx.BodyPart.Create().
			SetID(fmt.Sprintf("%s-%s-%d", sex, part, id)).
			SetRle(hex.EncodeToString(rle)).
			SetType(part).
			SetSex(sex),
		)
	}

	if err := tx.BodyPart.CreateBulk(builders...).Exec(ctx); err != nil {
		return fmt.Errorf("hustler: creating bodyparts: %w", err)
	}

	return nil
}

func (p *HustlerProcessor) ProcessMetadataUpdate(ctx context.Context, e *bindings.HustlerMetadataUpdate, tx *ent.Tx) error {
	meta, err := p.Contract.Metadata(nil, e.Id)
	if err != nil {
		return fmt.Errorf("hustler: getting metadata: %w", err)
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

	metadataKey := new(big.Int).SetBytes(solsha3.SoliditySHA3(
		// types
		[]string{"uint256", "uint256"},

		// values
		[]interface{}{
			e.Id.String(),
			"19",
		},
	))

	viewbox, err := p.Eth.StorageAt(
		ctx,
		p.Address,
		common.BytesToHash(
			new(big.Int).Add(metadataKey, viewboxSlot).Bytes(),
		),
		new(big.Int).SetUint64(e.Raw.BlockNumber))
	if err != nil {
		return fmt.Errorf("getting viewbox from storage: %w", err)
	}

	order, err := p.Eth.StorageAt(
		ctx,
		p.Address,
		common.BytesToHash(
			new(big.Int).Add(metadataKey, orderSlot).Bytes(),
		),
		new(big.Int).SetUint64(e.Raw.BlockNumber))
	if err != nil {
		return fmt.Errorf("getting order from storage: %w", err)
	}

	bodyParts, err := p.Eth.StorageAt(
		ctx,
		p.Address,
		common.BytesToHash(
			new(big.Int).Add(metadataKey, bodySlot).Bytes(),
		),
		new(big.Int).SetUint64(e.Raw.BlockNumber))
	if err != nil {
		return fmt.Errorf("getting body from storage: %w", err)
	}

	var beardID *string
	sex := hustler.DefaultSex
	if new(big.Int).SetBytes(bodyParts[31:32]).Uint64() == 1 {
		sex = hustler.SexFemale
	} else {
		sex = hustler.SexMale
		beardID_ := fmt.Sprintf("%s-%s-%d", sex, bodypart.TypeBeard, new(big.Int).SetBytes(bodyParts[28:29]).Uint64())
		beardID = &beardID_
	}

	bodyID := fmt.Sprintf("%s-%s-%d", sex, bodypart.TypeBody, new(big.Int).SetBytes(bodyParts[30:31]).Uint64())
	hairID := fmt.Sprintf("%s-%s-%d", sex, bodypart.TypeHair, new(big.Int).SetBytes(bodyParts[29:30]).Uint64())

	var title *string
	typ := hustler.TypeRegular
	if e.Id.Cmp(big.NewInt(500)) == -1 {
		title_, err := p.components.Title(nil, e.Id)
		if err != nil {
			return fmt.Errorf("getting hustler title %s metadata: %w", e.Id.String(), err)
		}
		title = &title_
		typ = hustler.TypeOriginalGangsta
	}

	block, err := p.Eth.BlockByNumber(ctx, new(big.Int).SetUint64(e.Raw.BlockNumber))
	if err != nil {
		return fmt.Errorf("updating hustler %s metadata: %w", e.Id.String(), err)
	}

	if err := tx.Hustler.Create().
		SetID(e.Id.String()).
		SetType(typ).
		SetAge(block.Time()).
		SetName(meta.Name).
		SetBackground(hex.EncodeToString(meta.Background[:])).
		SetColor(hex.EncodeToString(meta.Color[:])).
		SetSex(sex).
		SetBodyID(bodyID).
		SetHairID(hairID).
		SetNillableBeardID(beardID).
		SetNillableTitle(title).
		SetSvg(parsed.Image).
		SetViewbox([]int{
			int(new(big.Int).SetBytes(viewbox[31:32]).Int64()),
			int(new(big.Int).SetBytes(viewbox[30:31]).Int64()),
			int(new(big.Int).SetBytes(viewbox[29:30]).Int64()),
			int(new(big.Int).SetBytes(viewbox[28:29]).Int64()),
		}).
		SetOrder([]int{
			int(new(big.Int).SetBytes(order[31:32]).Int64()),
			int(new(big.Int).SetBytes(order[30:31]).Int64()),
			int(new(big.Int).SetBytes(order[29:30]).Int64()),
			int(new(big.Int).SetBytes(order[28:29]).Int64()),
			int(new(big.Int).SetBytes(order[27:28]).Int64()),
			int(new(big.Int).SetBytes(order[26:27]).Int64()),
			int(new(big.Int).SetBytes(order[25:26]).Int64()),
			int(new(big.Int).SetBytes(order[24:25]).Int64()),
			int(new(big.Int).SetBytes(order[23:24]).Int64()),
			int(new(big.Int).SetBytes(order[22:23]).Int64()),
		}).
		OnConflictColumns(hustler.FieldID).
		UpdateNewValues().
		Exec(ctx); err != nil {
		return fmt.Errorf("updating hustler %s metadata: %w", e.Id.String(), err)
	}

	return nil
}

func (p *HustlerProcessor) ProcessTransferBatch(ctx context.Context, e *bindings.HustlerTransferBatch, tx *ent.Tx) error {
	var ids []string
	for _, id := range e.Ids {
		ids = append(ids, id.String())
	}

	if e.From != (common.Address{}) {
		if err := tx.Wallet.UpdateOneID(e.From.Hex()).RemoveHustlerIDs(ids...).Exec(ctx); err != nil {
			return fmt.Errorf("hustler: update from wallet: %w", err)
		}

		// TODO: reset age for non-og
	} else {
		for i, id := range ids {
			typ := hustler.TypeRegular
			if e.Ids[i].Cmp(big.NewInt(500)) == -1 {
				typ = hustler.TypeOriginalGangsta
			}

			if err := tx.Hustler.Create().SetID(id).SetType(typ).SetAge(e.Raw.BlockNumber).Exec(ctx); err != nil {
				return fmt.Errorf("hustler: create hustler: %w", err)
			}
		}
	}

	if e.To != (common.Address{}) {
		if err := tx.Wallet.Create().
			SetID(e.To.Hex()).
			AddHustlerIDs(ids...).
			OnConflictColumns(wallet.FieldID).
			UpdateNewValues().
			Exec(ctx); err != nil {
			return fmt.Errorf("hustler: upsert to wallet: %w", err)
		}
	}

	return nil
}

func (p *HustlerProcessor) ProcessTransferSingle(ctx context.Context, e *bindings.HustlerTransferSingle, tx *ent.Tx) error {
	if e.From != (common.Address{}) {
		if err := tx.Wallet.UpdateOneID(e.From.Hex()).RemoveHustlerIDs(e.Id.String()).Exec(ctx); err != nil {
			return fmt.Errorf("hustler: update from wallet: %w", err)
		}
	} else {
		typ := hustler.TypeRegular
		if e.Id.Cmp(big.NewInt(500)) == -1 {
			typ = hustler.TypeOriginalGangsta
		}

		block, err := p.Eth.BlockByNumber(ctx, new(big.Int).SetUint64(e.Raw.BlockNumber))
		if err != nil {
			return fmt.Errorf("updating hustler %s metadata: %w", e.Id.String(), err)
		}

		if err := tx.Hustler.
			Create().
			SetID(e.Id.String()).
			SetType(typ).
			SetAge(block.Time()).
			OnConflictColumns(hustler.FieldID).
			UpdateNewValues().
			Exec(ctx); err != nil {
			return fmt.Errorf("hustler: create hustler: %w", err)
		}

		if err := refreshEquipment(ctx, p.Eth, tx, e.Id.String(), hustlerAddr, new(big.Int).SetUint64(e.Raw.BlockNumber)); err != nil {
			return err
		}
	}

	if e.To != (common.Address{}) {
		if err := tx.Wallet.Create().
			SetID(e.To.Hex()).
			AddHustlerIDs(e.Id.String()).
			OnConflictColumns(wallet.FieldID).
			UpdateNewValues().
			Exec(ctx); err != nil {
			return fmt.Errorf("hustler: upsert to wallet: %w", err)
		}
	}

	return nil
}

func refreshEquipment(ctx context.Context, eth interface {
	ethereum.ChainStateReader
	ethereum.TransactionReader
}, tx *ent.Tx, id string, address common.Address, blockNumber *big.Int) error {
	slots, err := equipmentSlots(ctx, eth, id, address, blockNumber)
	if err != nil {
		return err
	}

	if err := tx.Hustler.Update().
		Where(hustler.IDEQ(id)).
		SetWeaponID(slots.Weapon.String()).
		SetClothesID(slots.Clothes.String()).
		SetVehicleID(slots.Vehicle.String()).
		SetWaistID(slots.Waist.String()).
		SetFootID(slots.Foot.String()).
		SetHandID(slots.Hand.String()).
		SetDrugID(slots.Drug.String()).
		SetNeckID(slots.Neck.String()).
		SetRingID(slots.Ring.String()).
		SetAccessoryID(slots.Accessory.String()).Exec(ctx); err != nil {
		return fmt.Errorf("updating equipment: %w", err)
	}

	return nil
}

type Slots struct {
	Weapon    *big.Int
	Clothes   *big.Int
	Vehicle   *big.Int
	Waist     *big.Int
	Foot      *big.Int
	Hand      *big.Int
	Drug      *big.Int
	Neck      *big.Int
	Ring      *big.Int
	Accessory *big.Int
}

func equipmentSlots(ctx context.Context, eth interface {
	ethereum.ChainStateReader
	ethereum.TransactionReader
}, id string, address common.Address, blockNumber *big.Int) (*Slots, error) {
	weapon, err := equipmentSlot(ctx, eth, id, address, weaponSlot, blockNumber)
	if err != nil {
		return nil, fmt.Errorf("getting weapon from storage: %w", err)
	}

	clothes, err := equipmentSlot(ctx, eth, id, address, clothesSlot, blockNumber)
	if err != nil {
		return nil, fmt.Errorf("getting clothes from storage: %w", err)
	}

	vehicle, err := equipmentSlot(ctx, eth, id, address, vehicleSlot, blockNumber)
	if err != nil {
		return nil, fmt.Errorf("getting vehicle from storage: %w", err)
	}

	waist, err := equipmentSlot(ctx, eth, id, address, waistSlot, blockNumber)
	if err != nil {
		return nil, fmt.Errorf("getting waist from storage: %w", err)
	}

	foot, err := equipmentSlot(ctx, eth, id, address, footSlot, blockNumber)
	if err != nil {
		return nil, fmt.Errorf("getting foot from storage: %w", err)
	}

	hand, err := equipmentSlot(ctx, eth, id, address, handSlot, blockNumber)
	if err != nil {
		return nil, fmt.Errorf("getting hand from storage: %w", err)
	}

	drug, err := equipmentSlot(ctx, eth, id, address, drugSlot, blockNumber)
	if err != nil {
		return nil, fmt.Errorf("getting drug from storage: %w", err)
	}

	neck, err := equipmentSlot(ctx, eth, id, address, neckSlot, blockNumber)
	if err != nil {
		return nil, fmt.Errorf("getting neck from storage: %w", err)
	}

	ring, err := equipmentSlot(ctx, eth, id, address, ringSlot, blockNumber)
	if err != nil {
		return nil, fmt.Errorf("getting ring from storage: %w", err)
	}

	accessory, err := equipmentSlot(ctx, eth, id, address, accessorySlot, blockNumber)
	if err != nil {
		return nil, fmt.Errorf("getting accessory from storage: %w", err)
	}

	return &Slots{
		Weapon:    weapon,
		Clothes:   clothes,
		Vehicle:   vehicle,
		Waist:     waist,
		Foot:      foot,
		Hand:      hand,
		Drug:      drug,
		Neck:      neck,
		Ring:      ring,
		Accessory: accessory,
	}, nil
}

func equipmentSlot(ctx context.Context, eth interface {
	ethereum.ChainStateReader
	ethereum.TransactionReader
}, id string, address common.Address, slot *big.Int, blockNumber *big.Int) (*big.Int, error) {
	metadataKey := new(big.Int).SetBytes(solsha3.SoliditySHA3(
		// types
		[]string{"uint256", "uint256"},

		// values
		[]interface{}{
			id,
			"19",
		},
	))

	value, err := eth.StorageAt(
		ctx,
		address,
		common.BytesToHash(
			new(big.Int).Add(metadataKey, slot).Bytes(),
		),
		blockNumber)
	if err != nil {
		return nil, fmt.Errorf("getting equipment from storage: %w", err)
	}

	return new(big.Int).SetBytes(value), nil
}
