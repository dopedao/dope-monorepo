package main

import (
	"context"
	"encoding/hex"
	"fmt"
	"math/big"
	"os"
	"reflect"
	"regexp"

	"github.com/dopedao/dope-monorepo/packages/api/indexer/processor"
	"github.com/dopedao/dope-monorepo/packages/api/internal/contracts/bindings"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	solsha3 "github.com/miguelmota/go-solidity-sha3"
)

type Slots struct {
	Vehicle   *big.Int
	Clothes   *big.Int
	Weapon    *big.Int
	Waist     *big.Int
	Foot      *big.Int
	Hand      *big.Int
	Drug      *big.Int
	Neck      *big.Int
	Ring      *big.Int
	Accessory *big.Int
}

const (
	MaleBody   uint8 = 0
	FemaleBody uint8 = 1
	MaleHair   uint8 = 2
	FemaleHair uint8 = 3
	Beard      uint8 = 4

	SHADOW_DRUGS        = "00362f3729062b"
	BODY_DEFAULT_MALE   = "00092736190700011a021b04000600011a011b021c011b03000600011a011b031c03000600011c0140011c011a014003000600011a021c011a011c03000700011c021b011c03000700011a021c04000700021a05000400041a031c03000200021a091c01000100011a0c1c0100011a0c1c0100011a0c1c011a021c011a021c011a031c011a011c011a011c011a011c031a071c011a011c011a011c0100021a071c011a011c011a011c0100021a071c011a011c011a011c0100021a071c011a011c011a011c0100021a071c011a011c011a011c0100021a071c011a011c011a011c0100021a071c011a011c011a011c0100021a071c011a011c011a011c0100021a071c011a011c011a011c0100021a091c011a021c021a071c0100011c0100011c0100021a011c0300021a021c01000300021a011c0300021a011c02000300021a011c0300021a011c02000300021a011c0300021a011c02000300021a011c0300021a011c02000300021a011c0300021a011c02000300021a011c0300021a011c02000300021a011c0300021a011c02000300011a021c0300011a021c02000300021a0400021a03000300011a011c0400011a011c03000300011a011c0400011a011c03000300011a011c0400011a011c03000300011a011c0400011a011c03000300011a011c0400011a011c03000300011a011c0400011a011c03000300011a011c0400011a011c03000300011a011c0400011a011c03000300021a0400011a021c02000300011b021c0300021a021c0100"
	BODY_DEFAULT_FEMALE = "000b26361a0600011a021b03000500011a011b021c011b02000500011a011b031c02000500011c011d011c011a011d02000500011a021c011a011c02000600011c011e021c02000600011a021c03000600021a04000600011a011c04000400021a041c02000300011a071c01000200011a091c0200011a041c011a041c0100011a011c0100011a021c011a021c011a011c0100011c0200011a011c011f011a011c011f0100011c0100011c0300021a011c021a0100011c0100011c0300011a031c0200011c0100011c0300011a031c0200011c0100011c0300011a011c011a011c0200011c0100011c0300011a031c0200011c0100011c0200021a041c0100011c011a011c0100021a071c011a011c0100021a051c0100011c011a0200021a021c011a031c01000400011a011c0200011a011c02000400011a011c0200011a011c02000400011a011c0200011a011c02000400011a011c0200011a011c02000400011a011c0200011a011c02000400011a011c0200011a011c02000400011a011c0200011a011c02000400021c0200021c02000400011a0300011a03000400011c0300011c03000400011c0300011c03000400011c0300011c03000400011c0300011c03000400011c0300011c03000400011c0300011c03000400011c0300011c03000400011c0300011c03000400011c0300011c03000400021a0200021c011a0100"
)

var (
	componentsAddr = common.HexToAddress("0xe03C4eb2a0a797766a5DB708172e04f6A970DC7f")
	hustlerAddr    = common.HexToAddress("0xDbfEaAe58B6dA8901a8a40ba0712bEB2EE18368E")
	swapmeetAddr   = common.HexToAddress("0x0E55e1913C50e015e0F60386ff56A4Bfb00D7110")

	maskSlot      = big.NewInt(0)
	viewboxSlot   = big.NewInt(1)
	bodySlot      = big.NewInt(2)
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

func main() {
	eth, _ := ethclient.Dial("https://opt-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG")

	hustlerId := big.NewInt(2471)

	h, err := bindings.NewHustlerCaller(hustlerAddr, eth)
	if err != nil {
		fmt.Printf("Couldn't get hustler contract: %v", err)
	}

	c, err := bindings.NewComponentsCaller(componentsAddr, eth)
	if err != nil {
		fmt.Printf("Couldn't get components contract: %v", err)
	}

	s, err := bindings.NewSwapMeetCaller(swapmeetAddr, eth)
	if err != nil {
		fmt.Printf("Couldn't get swapmeet contract: %v", err)
	}

	hustlerMeta, err := h.Metadata(nil, hustlerId)
	if err != nil {
		fmt.Printf("Couldnt get hustler meta: %v", err)
	}

	foreground := hex.EncodeToString(hustlerMeta.Color[:])
	background := hex.EncodeToString(hustlerMeta.Background[:])

	metadataKey := new(big.Int).SetBytes(solsha3.SoliditySHA3(
		// types
		[]string{"uint256", "uint256"},

		// values
		[]interface{}{
			hustlerId.String(),
			"19",
		},
	))

	currentBlock, err := eth.BlockNumber(context.Background())
	if err != nil {
		fmt.Printf("Couldn't get latest block: %v", err)
	}

	viewbox, err := eth.StorageAt(
		context.Background(),
		hustlerAddr,
		common.BytesToHash(
			new(big.Int).Add(metadataKey, viewboxSlot).Bytes(),
		),
		new(big.Int).SetUint64(currentBlock))
	if err != nil {
		fmt.Printf("Couldn't get viewbox: %v", err)
	}

	bodyParts, err := eth.StorageAt(
		context.Background(),
		hustlerAddr,
		common.BytesToHash(
			new(big.Int).Add(metadataKey, bodySlot).Bytes(),
		),
		new(big.Int).SetUint64(currentBlock))
	if err != nil {
		fmt.Printf("Couldn't get bodyParts: %v", err)
	}

	var gender uint8 = 0
	if new(big.Int).SetBytes(bodyParts[31:32]).Uint64() == 1 {
		gender = 1
	}

	// only OGs have a title
	var title string = ""
	if hustlerId.Cmp(big.NewInt(500)) == -1 {
		ogTitle, err := c.Title(nil, hustlerId)
		if err == nil {
			title = ogTitle
		} else {
			fmt.Printf("Couldn't get title: %v", err)
		}
	}

	//hustler part data that will get rendered
	parts := []string{}
	partNames := []string{}
	var hasBody bool

	slots, err := equipmentSlots(context.Background(), eth, hustlerId.String(), hustlerAddr, big.NewInt(int64(currentBlock)))
	if err != nil {
		fmt.Printf("Couldn't get slots: %v", err)
	}

	if slots.Vehicle != nil {
		rawVehicle, err := s.TokenRle(nil, slots.Vehicle, gender)
		if err != nil {
			fmt.Printf("Couldn't get vehicle from contract: %v", err)
		}
		vehicle := common.Bytes2Hex(rawVehicle)
		parts = append(parts, vehicle)
	}

	//shadow, ?, body, hair, beard
	hustlerPartsRaw, err := h.HustlerParts(nil, hustlerId)
	if err != nil {
		fmt.Printf("Couldn't get hustlerparts from contract: %v", err)
	}
	if len(hustlerPartsRaw) > 0 {
		for i, bp := range hustlerPartsRaw {
			if len(bp) > 0 {
				//some hustlers dont have a body for some reason and then everything breaks
				if i == 2 {
					hasBody = true
				}

				bpstr := common.Bytes2Hex(bp)
				parts = append(parts, bpstr)
			}
		}
	}

	if !hasBody {
		if gender == 0 {
			parts = append(parts, BODY_DEFAULT_MALE)
		} else {
			parts = append(parts, BODY_DEFAULT_FEMALE)
		}
	}

	v := reflect.Indirect(reflect.ValueOf(slots))

	//skip vehicle for correct order
	for i := 1; i < v.NumField(); i++ {
		fieldName := v.Type().Field(i).Name
		field := v.Field(i).Interface()

		if field.(*big.Int) != nil {
			rawPart, err := s.TokenRle(nil, field.(*big.Int), gender)

			if err != nil {
				fmt.Printf("Couldn't get %s from contract", fieldName)
				continue
			}
			partNames = append(partNames, fieldName)

			part := common.Bytes2Hex(rawPart)
			parts = append(parts, part)
		}
	}

	viewBox := [4]*big.Int{
		new(big.Int).SetBytes(viewbox[31:32]),
		new(big.Int).SetBytes(viewbox[30:31]),
		new(big.Int).SetBytes(viewbox[29:30]),
		new(big.Int).SetBytes(viewbox[28:29]),
	}

	//zoomed in image
	resolution := 64
	if slots.Vehicle != nil {
		//fullsize
		resolution = 160
	}

	cleanTitle := cleanString(title)
	cleanName := cleanString(hustlerMeta.Name)

	fmt.Printf("Rendering hustler#%s\nName: %s\nTitle: %s\nForeground: %s\nBackground: %s\nSex: %d\nParts: %v\nResolution: %d\nViewBox: %v",
		hustlerId.String(),
		cleanName,
		cleanTitle,
		foreground,
		background,
		gender,
		partNames,
		resolution,
		viewBox,
	)

	svg := processor.BuildSVG(parts, background, foreground, cleanTitle, cleanName, viewBox, resolution)
	os.WriteFile("test.svg", []byte(svg), 0777)
}

func cleanString(dirty string) string {
	cleanRegex := regexp.MustCompile(`[^a-zA-Z0-9 ]+`)

	return cleanRegex.ReplaceAllString(dirty, "")
}

func equipmentSlots(
	ctx context.Context,
	eth *ethclient.Client,
	id string,
	address common.Address,
	blockNumber *big.Int,
) (*Slots, error) {
	slots := &Slots{}

	metadataKey := new(big.Int).SetBytes(solsha3.SoliditySHA3(
		[]string{"uint256", "uint256"},
		[]interface{}{
			id,
			"19",
		},
	))

	mask, err := eth.StorageAt(
		ctx,
		address,
		common.BytesToHash(
			new(big.Int).Add(metadataKey, maskSlot).Bytes(),
		),
		blockNumber)
	if err != nil {
		return nil, fmt.Errorf("getting mask from storage: %w", err)
	}

	// Little endian
	if mask[31-8]&1 != 0 {
		slots.Weapon, err = equipmentSlot(ctx, eth, id, address, weaponSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting weapon from storage: %w", err)
		}
	}

	if mask[31-8]&2 != 0 {
		slots.Clothes, err = equipmentSlot(ctx, eth, id, address, clothesSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting clothes from storage: %w", err)
		}
	}

	if mask[31-8]&4 != 0 {
		slots.Vehicle, err = equipmentSlot(ctx, eth, id, address, vehicleSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting vehicle from storage: %w", err)
		}
	}

	if mask[31-8]&8 != 0 {
		slots.Waist, err = equipmentSlot(ctx, eth, id, address, waistSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting waist from storage: %w", err)
		}
	}

	if mask[31-8]&16 != 0 {
		slots.Foot, err = equipmentSlot(ctx, eth, id, address, footSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting foot from storage: %w", err)
		}
	}

	if mask[31-8]&32 != 0 {
		slots.Hand, err = equipmentSlot(ctx, eth, id, address, handSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting hand from storage: %w", err)
		}
	}

	if mask[31-8]&64 != 0 {
		slots.Drug, err = equipmentSlot(ctx, eth, id, address, drugSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting drug from storage: %w", err)
		}
	}

	if mask[31-8]&128 != 0 {
		slots.Neck, err = equipmentSlot(ctx, eth, id, address, neckSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting neck from storage: %w", err)
		}
	}

	if mask[31-9]&1 != 0 {
		slots.Ring, err = equipmentSlot(ctx, eth, id, address, ringSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting ring from storage: %w", err)
		}
	}

	if mask[31-9]&2 != 0 {
		slots.Accessory, err = equipmentSlot(ctx, eth, id, address, accessorySlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting accessory from storage: %w", err)
		}
	}

	return slots, nil
}

func equipmentSlot(ctx context.Context, eth *ethclient.Client, id string, address common.Address, slot *big.Int, blockNumber *big.Int) (*big.Int, error) {
	metadataKey := new(big.Int).SetBytes(solsha3.SoliditySHA3(
		[]string{"uint256", "uint256"},
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
