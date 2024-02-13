package svgrender

import (
	"context"
	"encoding/hex"
	"fmt"
	"math/big"
	"reflect"
	"regexp"

	"github.com/dopedao/dope-monorepo/packages/api/internal/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/hashicorp/go-retryablehttp"
	solsha3 "github.com/miguelmota/go-solidity-sha3"
)

type slots struct {
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
	shadow_body         = "0036283818022b01000d2b0500092b0200"
	shadow_drugs        = "00362f3729062b"
	body_default_male   = "00092736190700011a021b04000600011a011b021c011b03000600011a011b031c03000600011c0140011c011a014003000600011a021c011a011c03000700011c021b011c03000700011a021c04000700021a05000400041a031c03000200021a091c01000100011a0c1c0100011a0c1c0100011a0c1c011a021c011a021c011a031c011a011c011a011c011a011c031a071c011a011c011a011c0100021a071c011a011c011a011c0100021a071c011a011c011a011c0100021a071c011a011c011a011c0100021a071c011a011c011a011c0100021a071c011a011c011a011c0100021a071c011a011c011a011c0100021a071c011a011c011a011c0100021a071c011a011c011a011c0100021a091c011a021c021a071c0100011c0100011c0100021a011c0300021a021c01000300021a011c0300021a011c02000300021a011c0300021a011c02000300021a011c0300021a011c02000300021a011c0300021a011c02000300021a011c0300021a011c02000300021a011c0300021a011c02000300021a011c0300021a011c02000300011a021c0300011a021c02000300021a0400021a03000300011a011c0400011a011c03000300011a011c0400011a011c03000300011a011c0400011a011c03000300011a011c0400011a011c03000300011a011c0400011a011c03000300011a011c0400011a011c03000300011a011c0400011a011c03000300011a011c0400011a011c03000300021a0400011a021c02000300011b021c0300021a021c0100"
	body_default_female = "000b26361a0600011a021b03000500011a011b021c011b02000500011a011b031c02000500011c011d011c011a011d02000500011a021c011a011c02000600011c011e021c02000600011a021c03000600021a04000600011a011c04000400021a041c02000300011a071c01000200011a091c0200011a041c011a041c0100011a011c0100011a021c011a021c011a011c0100011c0200011a011c011f011a011c011f0100011c0100011c0300021a011c021a0100011c0100011c0300011a031c0200011c0100011c0300011a031c0200011c0100011c0300011a011c011a011c0200011c0100011c0300011a031c0200011c0100011c0200021a041c0100011c011a011c0100021a071c011a011c0100021a051c0100011c011a0200021a021c011a031c01000400011a011c0200011a011c02000400011a011c0200011a011c02000400011a011c0200011a011c02000400011a011c0200011a011c02000400011a011c0200011a011c02000400011a011c0200011a011c02000400011a011c0200011a011c02000400021c0200021c02000400011a0300011a03000400011c0300011c03000400011c0300011c03000400011c0300011c03000400011c0300011c03000400011c0300011c03000400011c0300011c03000400011c0300011c03000400011c0300011c03000400011c0300011c03000400021a0200021c011a0100"

	//RleParts Index of BEARD
	BEARD_RLE = 4
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

	eth *ethclient.Client
	h   *bindings.HustlerCaller
	c   *bindings.ComponentsCaller
	s   *bindings.SwapMeetCaller
)

type BodyParts struct {
	Body  string
	Hair  string
	Beard string
}

func InitRenderer() error {
	rpc, err := rpc.DialHTTPWithClient("https://opt-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG", retryablehttp.NewClient().StandardClient())
	if err != nil {
		return fmt.Errorf("dialing rpc")
	}
	_eth := ethclient.NewClient(rpc)
	eth = _eth

	_h, err := bindings.NewHustlerCaller(hustlerAddr, _eth)
	if err != nil {
		return fmt.Errorf("creating hustler contract caller: %v", err)
	}
	h = _h

	_c, err := bindings.NewComponentsCaller(componentsAddr, _eth)
	if err != nil {
		return fmt.Errorf("creating components contract caller: %v", err)
	}
	c = _c

	_s, err := bindings.NewSwapMeetCaller(swapmeetAddr, _eth)
	if err != nil {
		return fmt.Errorf("creating swapmeet contract caller: %v", err)
	}
	s = _s

	return nil
}

func GetOffchainRender(hustlerId *big.Int) (string, error) {
	hustlerMeta, err := h.Metadata(nil, hustlerId)
	if err != nil {
		return "", fmt.Errorf("getting hustler meta: %v", err)
	}

	foreground := hex.EncodeToString(hustlerMeta.Color[:])
	background := hex.EncodeToString(hustlerMeta.Background[:])

	currentBlock, err := eth.BlockNumber(context.Background())
	if err != nil {
		return "", fmt.Errorf("getting latest block: %v", err)
	}

	viewboxbytes, err := getSlot(viewboxSlot, hustlerId.String(), currentBlock)
	if err != nil {
		return "", fmt.Errorf("getting viewbox: %v", err)
	}

	bodyParts, err := getSlot(bodySlot, hustlerId.String(), currentBlock)
	if err != nil {
		return "", fmt.Errorf("getting bodyParts: %v", err)
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
			return "", fmt.Errorf("getting title: %v", err)
		}
	}

	//hustler part data that will get rendered
	parts := []string{}
	//just for logs
	partNames := []string{}

	slots, err := equipmentSlots(context.Background(), hustlerId.String(), big.NewInt(int64(currentBlock)))
	if err != nil {
		return "", fmt.Errorf("getting equipment slots: %v", err)
	}

	//We have to render this first or the svg will be messed up
	if slots.Vehicle != nil {
		rawVehicle, err := s.TokenRle(nil, slots.Vehicle, gender)

		if err != nil {
			return "", fmt.Errorf("getting vehicle from contract: %v", err)
		}

		vehicle := common.Bytes2Hex(rawVehicle)
		parts = append(parts, vehicle)
	}

	if slots.Drug != nil {
		parts = append(parts, shadow_drugs)
	}

	parts = append(parts, shadow_body)

	bp := getBodyParts(bodyParts)
	bpFields := reflect.Indirect(reflect.ValueOf(bp))
	for i := 0; i < bpFields.NumField(); i++ {
		fieldName := bpFields.Type().Field(i).Name
		part := bpFields.Field(i).Interface().(string)

		if part != "" {
			parts = append(parts, part)
			partNames = append(partNames, fieldName)
		}
	}

	equipmentSlots := reflect.Indirect(reflect.ValueOf(slots))
	//skip vehicle to retain correct order
	for i := 1; i < equipmentSlots.NumField(); i++ {
		fieldName := equipmentSlots.Type().Field(i).Name
		field := equipmentSlots.Field(i).Interface().(*big.Int)

		if field != nil {
			rawPart, err := s.TokenRle(nil, field, gender)

			if err != nil {
				return "", fmt.Errorf("getting %s from contract", fieldName)
			}
			partNames = append(partNames, fieldName)

			part := common.Bytes2Hex(rawPart)
			parts = append(parts, part)
		}
	}

	viewBox := [4]*big.Int{
		new(big.Int).SetBytes(viewboxbytes[31:32]),
		new(big.Int).SetBytes(viewboxbytes[30:31]),
		new(big.Int).SetBytes(viewboxbytes[29:30]),
		new(big.Int).SetBytes(viewboxbytes[28:29]),
	}

	//zoomed in image
	resolution := 64
	if slots.Vehicle != nil {
		//fullsize
		resolution = 160
	}

	cleanTitle := cleanString(title)
	cleanName := cleanString(hustlerMeta.Name)

	log := logger.Log
	log.With().Str("method", "SvgRender").Str("hustler", hustlerId.String())

	log.Info().
		Str("Name", cleanName).
		Str("Title", cleanTitle).
		Str("Foreground", foreground).
		Str("Background", background).
		Int("Sex", int(gender)).
		Int("Resolution", resolution).
		Msgf("Parts: %v\nViewBox: %v", partNames, viewBox)

	svg := BuildSVG(parts, background, foreground, cleanTitle, cleanName, viewBox, resolution)
	if len(svg) == 0 {
		return "", fmt.Errorf("rendering hustler %s", hustlerId.String())
	}

	return svg, nil
}

func getBodyParts(rawBodyParts []byte) BodyParts {
	var bodyParts BodyParts
	genderId := new(big.Int).SetBytes(rawBodyParts[31:32]).Uint64()
	bodyId := new(big.Int).SetBytes(rawBodyParts[30:31])
	hairId := new(big.Int).SetBytes(rawBodyParts[29:30])
	beardId := new(big.Int).SetBytes(rawBodyParts[28:29])

	body, err := h.BodyRle(nil, uint8(genderId), bodyId)
	if err != nil {
		fmt.Printf("Couldnt get body with id: %v, using fallback", bodyId.String())
		bodyParts.Body = body_default_male
	} else {
		bodyParts.Body = common.Bytes2Hex(body)
	}

	hair, err := h.BodyRle(nil, uint8(genderId)+2, hairId)
	if err != nil {
		fmt.Println("Couldnt get hair")
	}
	bodyParts.Hair = common.Bytes2Hex(hair)

	beard, err := h.BodyRle(nil, BEARD_RLE, beardId)
	if err != nil {
		fmt.Println("Couldnt get beard")
	}
	bodyParts.Beard = common.Bytes2Hex(beard)

	return bodyParts
}

func cleanString(dirty string) string {
	cleanRegex := regexp.MustCompile(`[^a-zA-Z0-9 ]+`)

	return cleanRegex.ReplaceAllString(dirty, "")
}

func getSlot(
	slot *big.Int,
	id string,
	blockNumber uint64,
) ([]byte, error) {
	metadataKey := createMetadataKey(id)
	return eth.StorageAt(
		context.Background(),
		hustlerAddr,
		common.BytesToHash(
			new(big.Int).Add(metadataKey, slot).Bytes(),
		),
		new(big.Int).SetUint64(blockNumber),
	)
}

func equipmentSlots(
	ctx context.Context,
	id string,
	blockNumber *big.Int,
) (*slots, error) {
	slots := &slots{}
	metadataKey := createMetadataKey(id)

	mask, err := eth.StorageAt(
		ctx,
		hustlerAddr,
		common.BytesToHash(
			new(big.Int).Add(metadataKey, maskSlot).Bytes(),
		),
		blockNumber)
	if err != nil {
		return nil, fmt.Errorf("getting mask from storage: %w", err)
	}

	// Little endian
	if mask[31-8]&1 != 0 {
		slots.Weapon, err = equipmentSlot(ctx, id, weaponSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting weapon from storage: %w", err)
		}
	}

	if mask[31-8]&2 != 0 {
		slots.Clothes, err = equipmentSlot(ctx, id, clothesSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting clothes from storage: %w", err)
		}
	}

	if mask[31-8]&4 != 0 {
		slots.Vehicle, err = equipmentSlot(ctx, id, vehicleSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting vehicle from storage: %w", err)
		}
	}

	if mask[31-8]&8 != 0 {
		slots.Waist, err = equipmentSlot(ctx, id, waistSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting waist from storage: %w", err)
		}
	}

	if mask[31-8]&16 != 0 {
		slots.Foot, err = equipmentSlot(ctx, id, footSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting foot from storage: %w", err)
		}
	}

	if mask[31-8]&32 != 0 {
		slots.Hand, err = equipmentSlot(ctx, id, handSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting hand from storage: %w", err)
		}
	}

	if mask[31-8]&64 != 0 {
		slots.Drug, err = equipmentSlot(ctx, id, drugSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting drug from storage: %w", err)
		}
	}

	if mask[31-8]&128 != 0 {
		slots.Neck, err = equipmentSlot(ctx, id, neckSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting neck from storage: %w", err)
		}
	}

	if mask[31-9]&1 != 0 {
		slots.Ring, err = equipmentSlot(ctx, id, ringSlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting ring from storage: %w", err)
		}
	}

	if mask[31-9]&2 != 0 {
		slots.Accessory, err = equipmentSlot(ctx, id, accessorySlot, blockNumber)
		if err != nil {
			return nil, fmt.Errorf("getting accessory from storage: %w", err)
		}
	}

	return slots, nil
}

func equipmentSlot(ctx context.Context, id string, slot *big.Int, blockNumber *big.Int) (*big.Int, error) {
	metadataKey := createMetadataKey(id)
	value, err := eth.StorageAt(
		ctx,
		hustlerAddr,
		common.BytesToHash(
			new(big.Int).Add(metadataKey, slot).Bytes(),
		),
		blockNumber)
	if err != nil {
		return nil, fmt.Errorf("getting equipment from storage: %w", err)
	}

	return new(big.Int).SetBytes(value), nil
}

func createMetadataKey(id string) *big.Int {
	return new(big.Int).SetBytes(solsha3.SoliditySHA3(
		[]string{"uint256", "uint256"},
		[]interface{}{
			id,
			"19",
		},
	))
}
