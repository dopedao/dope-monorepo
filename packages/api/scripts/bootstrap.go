package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"math/big"
	"strconv"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/item"
	"github.com/dopedao/dope-monorepo/packages/api/ent/migrate"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/hashicorp/go-retryablehttp"

	_ "github.com/mattn/go-sqlite3"
)

type Trait struct {
	TraitType string `json:"trait_type"`
	Value     string `json:"value"`
}

type Metadata struct {
	Traits []Trait `json:"traits"`
}

var componentTypes = []item.Type{item.TypeWeapon, item.TypeClothes, item.TypeVehicle, item.TypeWaist, item.TypeFoot, item.TypeHand, item.TypeDrugs, item.TypeNeck, item.TypeRing}

func main() {
	ctx := context.Background()

	db, err := sql.Open(dialect.SQLite, "file:ent?mode=memory&cache=shared&_fk=1")
	if err != nil {
		log.Fatalf("Connecting to db: %+v", err) //nolint:gocritic
	}

	client := ent.NewClient(ent.Driver(db))

	// Run the auto migration tool.
	if err := client.Schema.Create(context.Background(), migrate.WithGlobalUniqueID(true)); err != nil {
		log.Fatal("Migrating db.") //nolint:gocritic
	}

	retryableHTTPClient := retryablehttp.NewClient()
	c, err := rpc.DialHTTPWithClient("https://opt-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG", retryableHTTPClient.StandardClient())
	if err != nil {
		log.Fatal("Dialing ethereum rpc.") //nolint:gocritic
	}

	eth := ethclient.NewClient(c)

	components, err := bindings.NewComponents(common.HexToAddress("0xe03C4eb2a0a797766a5DB708172e04f6A970DC7f"), eth)
	if err != nil {
		log.Fatalf("Creating Components bindings: %+v", err)
	}

	swapmeet, err := bindings.NewSwapMeet(common.HexToAddress("0x0E55e1913C50e015e0F60386ff56A4Bfb00D7110"), eth)
	if err != nil {
		log.Fatalf("Creating SwapMeet bindings: %+v", err)
	}

	for i := 0; i < 8000; i++ {
		ids, err := swapmeet.ItemIds(nil, big.NewInt(int64(i)))
		if err != nil {
			log.Fatalf("Getting items ids: %+v", err)
		}

		items, err := components.Items(nil, big.NewInt(int64(i)))
		if err != nil {
			log.Fatalf("Getting items: %+v", err)
		}

		dope, err := client.Dope.Create().SetID(strconv.Itoa(i)).Save(ctx)
		if err != nil {
			log.Fatalf("Creating dope: %+v", err)
		}

		for j, item := range items {
			attributes, err := components.Attributes(nil, item, uint8(j))
			if err != nil {
				log.Fatalf("Getting item name: %+v", err)
			}

			var metadata Metadata
			if err := json.Unmarshal([]byte(fmt.Sprintf("{\"traits\":%s}", attributes)), &metadata); err != nil {
				log.Fatalf("Unmarshalling metadata: %+v", err)
			}

			m := client.Item.Create().SetID(ids[j].String()).SetType(componentTypes[j]).AddDopes(dope)
			for _, trait := range metadata.Traits {
				switch trait.TraitType {
				case "Item":
					m.SetName(trait.Value)
				case "Suffix":
					m.SetSuffix(trait.Value)
				case "Name Prefix":
					m.SetNamePrefix(trait.Value)
				case "Name Suffix":
					m.SetNameSuffix(trait.Value)
				case "Augmentation":
					m.SetAugmented(true)
				}
			}

			m.SaveX(ctx)
		}
	}
}
