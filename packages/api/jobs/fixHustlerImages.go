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

	"github.com/dopedao/dope-monorepo/packages/api/indexer"
	"github.com/dopedao/dope-monorepo/packages/api/indexer/processor"
	"github.com/dopedao/dope-monorepo/packages/api/internal/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	hustlerModel "github.com/dopedao/dope-monorepo/packages/api/internal/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	svgR "github.com/dopedao/dope-monorepo/packages/api/internal/svg-render"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/hashicorp/go-retryablehttp"
	"github.com/rs/zerolog"
)

var dbClient = dbprovider.Ent()

type FixHustlerImages struct{}

func (fhi FixHustlerImages) Run() {
	ctx := context.Background()
	logger.Init()
	hContractBinding := GetHustlerContractBinding(*logger.Log)

	if err := svgR.InitRenderer(); err != nil {
		logger.Log.Fatal().Msg("initializing svg-renderer")
	}

	blankHustlers, err := dbClient.Hustler.
		Query().
		Where(hustlerModel.SvgEQ("")).
		All(ctx)
	if err != nil {
		logger.Log.Error().
			Str("Job", "FixHustlerImages").
			Msgf("Error getting Hustlers with no images %v", err)
		return
	}
	logger.Log.Debug().
		Str("Job", "FixHustlerImages").
		Msgf("%v Hustlers with no image in database", len(blankHustlers))

	for i := 0; i < len(blankHustlers); i++ {
		h := blankHustlers[i]
		bigId, ok := new(big.Int).SetString(h.ID, 10)

		logger.Log.Info().
			Str("Job", "FixHustlerImages").
			Msgf("Fixing image for %v", h.ID)

		if !ok {
			logger.Log.Error().
				Str("Job", "FixHustlerImages").
				Msgf("Error converting id to int %v", err)
			continue
		}

		hustlerSvg, err := processor.GetHustlerSvg(
			hContractBinding, bigId, logger.Log)
		if err != nil {
			logger.Log.Error().
				Str("Job", "FixHustlerImages").
				Msgf("Error getting offchain render for %v", h.ID)
		}

		logger.Log.Debug().
			Str("Job", "FixHustlerImages").
			Msgf("Persisting %v svg to database", h.ID)
		dbClient.Hustler.UpdateOneID(h.ID).SetSvg(hustlerSvg).Exec(ctx)
	}
}

func GetHustlerContractBinding(log zerolog.Logger) *bindings.Hustler {
	// Setup ethereum client
	retryableHTTPClient := retryablehttp.NewClient()
	retryableHTTPClient.Logger = nil
	// Optimism mainnet
	c, err := rpc.DialHTTPWithClient(
		indexer.Config["mainnet"][1].(indexer.EthConfig).RPC, retryableHTTPClient.StandardClient())
	if err != nil {
		log.Fatal().Msg("Dialing ethereum rpc.") //nolint:gocritic
	}
	ethClient := ethclient.NewClient(c)

	// Setup hustler processor contract binding to get from chain
	hB, err := bindings.NewHustler(
		common.HexToAddress("0xDbfEaAe58B6dA8901a8a40ba0712bEB2EE18368E"), ethClient)
	if err != nil {
		log.Fatal().Msg("initializing hustler contract binding")
	}
	return hB
}
