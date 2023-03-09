// Some SVGs cannot be rendered on-chain because of errors
// in the smart contract arguments.
//
// @bort was able to figure out that Hustlers who have
// unknown items in their storage slots will cause errors
// when trying to render them on-chain.
//
// Potentially an issue with this might be our indexer
// generating the images AFTER reading the storage slots.
package jobs

import (
	"context"
	"math/big"
	"os"

	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/hustler"
	svgR "github.com/dopedao/dope-monorepo/packages/api/internal/svg-render"
	"github.com/rs/zerolog"
)

var dbClient = dbprovider.Ent()

func FixHustlerImages() {
	ctx := context.Background()
	log := zerolog.New(os.Stderr)
	if err := svgR.InitRenderer(); err != nil {
		log.Fatal().Msg("initializing svg-renderer")
	}

	blankHustlers, err := dbClient.Hustler.
		Query().
		Where(hustler.SvgEQ("")).
		All(ctx)
	if err != nil {
		log.Error().Msgf("Error getting Hustlers with no images %v", err)
		return
	}
	log.Debug().Msgf("%v Hustlers with no image in database", len(blankHustlers))

	for i := 0; i < len(blankHustlers); i++ {
		h := blankHustlers[i]
		bigId, ok := new(big.Int).SetString(h.ID, 10)
		if !ok {
			log.Warn().Msgf("Error converting id to int %v", err)
			continue
		}

		offchainHustlerSvg, err := svgR.GetOffchainRender(bigId)
		if err != nil {
			log.Warn().Msgf("Error getting offchain render for %v", h.ID)
		}

		log.Debug().Msgf("Updating %v with offchain image", h.ID)
		dbClient.Hustler.UpdateOneID(h.ID).SetSvg(offchainHustlerSvg).Exec(ctx)
	}
}
