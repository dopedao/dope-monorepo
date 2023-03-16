package jobs

import (
	"context"
	"math/big"
	"math/rand"
	"os"
	"sort"
	"sync"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/internal/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/item"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/hashicorp/go-retryablehttp"
	"github.com/rs/zerolog"
)

var componentType = map[item.Type]uint8{
	item.TypeWEAPON:    0,
	item.TypeCLOTHES:   1,
	item.TypeVEHICLE:   2,
	item.TypeWAIST:     3,
	item.TypeFOOT:      4,
	item.TypeHAND:      5,
	item.TypeDRUGS:     6,
	item.TypeNECK:      7,
	item.TypeRING:      8,
	item.TypeACCESSORY: 9,
}

func GearMetrics() {
	ctx := context.Background()
	// Tagged logger
	// _, log := logger.LogFor(
	// 	os.Stderr,
	// 	func(zctx *zerolog.Context) zerolog.Context {
	// 		return zctx.Str("Job", "GearMetrics")
	// 	})
	log := zerolog.New(os.Stderr)
	dbClient := dbprovider.Ent()

	retryableHTTPClient := retryablehttp.NewClient()
	c, err := rpc.DialHTTPWithClient("https://opt-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG", retryableHTTPClient.StandardClient())
	if err != nil {
		log.Fatal().Err(err).Msg("Dialing ethereum rpc.") //nolint:gocritic
	}

	eth := ethclient.NewClient(c)

	components, err := bindings.NewComponents(common.HexToAddress("0xe03C4eb2a0a797766a5DB708172e04f6A970DC7f"), eth)
	if err != nil {
		log.Fatal().Err(err).Msg("Creating Components bindings")
	}

	var greatnesses sync.Map
	var occurrences sync.Map

	var wg sync.WaitGroup

	log.Info().Msg("Getting dopes")
	dopes, dopeFindErr := dbClient.Dope.Query().All(ctx)
	if dopeFindErr != nil {
		log.Fatal().Err(err).Msg("getting dopes")
	}
	log.Info().Msgf("Found %d dopes", len(dopes))

	for _, dope := range dopes {
		log.Info().Msgf("Getting item greatness for dope %s", dope.ID)
		for _, item := range dope.Edges.Items {
			wg.Add(1)
			go func(dope *ent.Dope, item *ent.Item) {
				r := rand.Intn(180)
				time.Sleep(time.Duration(r) * time.Second)

				id, ok := new(big.Int).SetString(dope.ID, 10)
				if !ok {
					log.Fatal().Msgf("Parsing dope id: %+v", dope.ID)
				}
				log.Debug().Msgf("Getting item greatness for dope %s, item %s", dope.ID, item.ID)
				_, greatness, err := components.Seed(nil, id, componentType[item.Type])
				if err != nil {
					log.Fatal().Msgf("Getting item greatness %+v", dope.ID)
				}

				greatnesses.Store(item.ID, int(greatness.Int64()))
				occur, ok := occurrences.Load(item.ID)
				if !ok {
					occur = 0
				}
				occurrences.Store(item.ID, occur.(int)+1)

				wg.Done()
			}(dope, item)
		}
	}
	wg.Wait()

	log.Info().Msg("Setting count and greatness for items")
	occurrences.Range(func(key interface{}, value interface{}) bool {
		wg.Add(1)
		log.Debug().Msgf("Setting count and greatness for item %s", key)
		go func(key string, value int) {
			r := rand.Intn(180)
			time.Sleep(time.Duration(r) * time.Second)

			log.Debug().Msgf("Setting count and greatness for item %s", key)
			cur, ok := greatnesses.Load(key)
			if !ok {
				log.Fatal().Msgf("Loading greatness")
			}
			dbClient.Item.UpdateOneID(key).SetCount(value).SetGreatness(cur.(int)).ExecX(ctx)
			println("Updating item", key)
			wg.Done()
		}(key.(string), value.(int))
		return true
	})
	wg.Wait()

	items, err := dbClient.Item.Query().All(ctx)
	if err != nil {
		log.Fatal().Msgf("getting items")
	}

	log.Info().Msg("Setting tier for items")
	wg.Add(len(items) - 1)
	for _, itm := range items {

		log.Debug().Msgf("Setting tier for item %s", itm.ID)

		go func(itm *ent.Item) {
			r := rand.Intn(200)
			time.Sleep(time.Duration(r) * time.Second)

			switch g := itm.Greatness; {
			case g > 19:
				dbClient.Item.UpdateOneID(itm.ID).SetTier(item.TierBLACK_MARKET).ExecX(ctx)
			case g == 19:
				dbClient.Item.UpdateOneID(itm.ID).SetTier(item.TierCUSTOM).ExecX(ctx)
			case g > 14:
				dbClient.Item.UpdateOneID(itm.ID).SetTier(item.TierRARE).ExecX(ctx)
			default:
				dbClient.Item.UpdateOneID(itm.ID).SetTier(item.TierCOMMON).ExecX(ctx)
			}
			wg.Done()
		}(itm)
	}

	wg.Wait()

	log.Info().Msg("Setting rank and score for dopes")
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
		dbClient.Dope.UpdateOneID(dope.ID).SetRank(i).SetScore(dope.Score).ExecX(ctx)
		println("Updating dope:", dope.ID)
	}
	log.Info().Msg("DONE: GearMetrics")
}
