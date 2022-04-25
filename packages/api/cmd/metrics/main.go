package main

import (
	"context"
	"log"
	"math/rand"
	"sort"
	"sync"
	"time"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/item"

	_ "github.com/lib/pq"
)

// var componentType = map[item.Type]uint8{
// 	item.TypeWEAPON:    0,
// 	item.TypeCLOTHES:   1,
// 	item.TypeVEHICLE:   2,
// 	item.TypeWAIST:     3,
// 	item.TypeFOOT:      4,
// 	item.TypeHAND:      5,
// 	item.TypeDRUGS:     6,
// 	item.TypeNECK:      7,
// 	item.TypeRING:      8,
// 	item.TypeACCESSORY: 9,
// }

func main() {
	ctx := context.Background()

	db, err := sql.Open(dialect.Postgres, "postgres://postgres:postgres@localhost:5433?sslmode=disable")
	if err != nil {
		log.Fatalf("Connecting to db: %+v", err) //nolint:gocritic
	}

	client := ent.NewClient(ent.Driver(db))

	// Run the auto migration tool.
	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("Migrating db: %+v", err) //nolint:gocritic
	}

	// retryableHTTPClient := retryablehttp.NewClient()
	// c, err := rpc.DialHTTPWithClient("https://opt-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG", retryableHTTPClient.StandardClient())
	// if err != nil {
	// 	log.Fatal("Dialing ethereum rpc.") //nolint:gocritic
	// }

	// eth := ethclient.NewClient(c)

	// components, err := bindings.NewComponents(common.HexToAddress("0xe03C4eb2a0a797766a5DB708172e04f6A970DC7f"), eth)
	// if err != nil {
	// 	log.Fatalf("Creating Components bindings: %+v", err)
	// }

	// var greatnesses sync.Map
	// var occurences sync.Map

	// var wg sync.WaitGroup
	// wg.Add(8000 * 9)

	// for _, dope := range dopes {
	// 	for _, item := range dope.Edges.Items {
	// 		go func(dope *ent.Dope, item *ent.Item) {
	// 			r := rand.Intn(180)
	// 			time.Sleep(time.Duration(r) * time.Second)

	// 			id, ok := new(big.Int).SetString(dope.ID, 10)
	// 			if !ok {
	// 				log.Fatalf("Parsing dope id: %+v", dope.ID)
	// 			}

	// 			_, greatness, err := components.Seed(nil, id, componentType[item.Type])
	// 			if err != nil {
	// 				log.Fatalf("Getting item greatness %+v", dope.ID)
	// 			}

	// 			greatnesses.Store(item.ID, int(greatness.Int64()))
	// 			occur, ok := occurences.Load(item.ID)
	// 			if !ok {
	// 				occur = 0
	// 			}
	// 			occurences.Store(item.ID, occur.(int)+1)

	// 			wg.Done()
	// 		}(dope, item)
	// 	}
	// }

	// wg.Wait()

	// wg.Add(8000 * 9)
	// occurences.Range(func(key interface{}, value interface{}) bool {
	// 	go func(key string, value int) {
	// 		r := rand.Intn(180)
	// 		time.Sleep(time.Duration(r) * time.Second)

	// 		cur, ok := greatnesses.Load(key)
	// 		if !ok {
	// 			log.Fatal("Loading greatness")
	// 		}
	// 		client.Item.UpdateOneID(key).SetCount(value).SetGreatness(cur.(int)).ExecX(ctx)
	// 		println("Updating item", key)
	// 		wg.Done()
	// 	}(key.(string), value.(int))
	// 	return true
	// })

	// wg.Wait()

	items, err := client.Item.Query().All(ctx)
	if err != nil {
		log.Fatal("getting items")
	}

	var wg sync.WaitGroup
	wg.Add(len(items))
	for _, itm := range items {

		go func(itm *ent.Item) {
			r := rand.Intn(200)
			time.Sleep(time.Duration(r) * time.Second)

			switch g := itm.Greatness; {
			case g > 19:
				client.Item.UpdateOneID(itm.ID).SetTier(item.TierBLACK_MARKET).ExecX(ctx)
			case g == 19:
				client.Item.UpdateOneID(itm.ID).SetTier(item.TierCUSTOM).ExecX(ctx)
			case g > 14:
				client.Item.UpdateOneID(itm.ID).SetTier(item.TierRARE).ExecX(ctx)
			default:
				client.Item.UpdateOneID(itm.ID).SetTier(item.TierCOMMON).ExecX(ctx)
			}
			wg.Done()
		}(itm)
	}

	wg.Wait()

	dopes, err := client.Dope.Query().WithItems().All(ctx)
	if err != nil {
		log.Fatalf("Getting dopes: %+v", err)
	}

	for _, dope := range dopes {
		score := 0
		for _, itm := range dope.Edges.Items {

			switch itm.Tier {
			case item.TierBLACK_MARKET:
				score += 3
			case item.TierCUSTOM:
				score += 2
			case item.TierRARE:
				score += 1
			}
		}
		dope.Score = score
	}

	sort.Slice(dopes, func(i int, j int) bool {
		return dopes[i].Score < dopes[j].Score
	})

	for i, dope := range dopes {
		client.Dope.UpdateOneID(dope.ID).SetRank(i).SetScore(dope.Score).ExecX(ctx)
		println("Updating dope:", dope.ID)
	}
}
