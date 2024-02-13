package jobs

import (
	"context"
	"strings"
	"sync"

	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/dope"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/internal/reservoir"
)

// Checks token ownership of NFTs in system set by our indexer
// versus the Reservoir API to ensure that the data is up to date.
//
// This is a sanity check to ensure that the data in the system is
// up to date and that the indexer is working as expected.
func (s CheckTokenOwners) Run() {
	logger.Init()
	ctx := context.Background()
	var wg sync.WaitGroup
	wg.Add(3)

	go func() {
		defer wg.Done()
		checkDopeOwners(ctx)
	}()

	go func() {
		defer wg.Done()
		checkHustlerOwners(ctx)
	}()

	go func() {
		defer wg.Done()
		// Skip gear for now until we come up with a streamlined
		// way to handle the semi-fungible nature of erc1155s from
		// the Reservoir API.
		//
		// See method for info.
		//
		// checkGearOwners(ctx)
	}()

	wg.Wait()

	dbprovider.RefreshSearchIndex(ctx)
}

func checkOwners(ctx context.Context, contractName string) ([]reservoir.Token, error) {
	logger.Log.Info().Msgf("Getting %s tokens", contractName)
	tokens, err := reservoir.GetAllTokens(reservoir.ReservoirConfigs[contractName])
	if err != nil {
		logger.Log.Err(err).Msgf("Failed getting %s tokens", contractName)
		return nil, err
	}
	logger.Log.Info().Msgf("%v - Got %v tokens", contractName, len(tokens))

	return tokens, nil
}

func checkDopeOwners(ctx context.Context) {
	name := "DOPE"
	tokens, err := checkOwners(ctx, name)
	if err != nil {
		logger.Log.Error().Msgf("%v", err)
	}
	// ids and owners from db
	var dbValues []DopeTokenOwner
	err = dbClient.Dope.Query().
		Select(dope.FieldID, dope.WalletColumn).
		Scan(ctx, &dbValues)
	if err != nil {
		logger.Log.Error().Msgf("%v", err)
		return
	}

	// have to convert to interface for diffTokens
	var tokenOwners []TokenOwner
	for _, dbValue := range dbValues {
		tokenOwners = append(tokenOwners, &dbValue)
	}

	// compare
	tokenDiff := diffTokens(tokens, tokenOwners)

	// log
	if len(tokenDiff) > 0 {
		logger.Log.Error().Msgf("%s - Owner differences: %v", name, len(tokenDiff))
	} else {
		logger.Log.Info().Msgf("%s - No owner differences", name)
	}
}

func checkHustlerOwners(ctx context.Context) {
	name := "HUSTLERS"
	tokens, err := checkOwners(ctx, name)
	if err != nil {
		logger.Log.Error().Msgf("%v", err)
	}
	// ids and owners from db
	var dbValues []HustlerTokenOwner
	err = dbClient.Hustler.Query().
		Select(hustler.FieldID, hustler.WalletColumn).
		Scan(ctx, &dbValues)
	if err != nil {
		logger.Log.Error().Msgf("%v", err)
		return
	}

	// have to convert to interface for diffTokens
	var tokenOwners []TokenOwner
	for _, dbValue := range dbValues {
		tokenOwners = append(tokenOwners, &dbValue)
	}

	// compare
	tokenDiff := diffTokens(tokens, tokenOwners)

	// log
	if len(tokenDiff) > 0 {
		logger.Log.Error().Msgf("%s - Owner differences: %v", name, len(tokenDiff))
	} else {
		logger.Log.Info().Msgf("%s - No owner differences", name)
	}
}

// GEAR (Items) are erc1155 tokens, so they have a different ownership
// structure than the other tokens. Tokens are semi-fungible, so they
// have a quantity and are owned by a wallet.
func checkGearOwners(ctx context.Context) {
	// name := "GEAR"
	// tokens, err := checkOwners(ctx, name)
	// if err != nil {
	// 	logger.Log.Error().Msgf("%v", err)
	// }
	// // ids and owners from db
	// var dbValues []GearTokenOwner
	// err = dbClient.WalletItems.Query().
	// 	Select(walletitems.WalletColumn, walletitems.ItemColumn).
	// 	Scan(ctx, &dbValues)
	// if err != nil {
	// 	logger.Log.Error().Msgf("%v", err)
	// 	return
	// }

	// // have to convert to interface for diffTokens
	// var tokenOwners []TokenOwner
	// for _, dbValue := range dbValues {
	// 	tokenOwners = append(tokenOwners, &dbValue)
	// }

	// // compare
	// tokenDiff := diffTokens(tokens, tokenOwners)

	// // log
	// if len(tokenDiff) > 0 {
	// 	logger.Log.Info().Msgf("%s - Owner differences: %v", name, len(tokenDiff))
	// }
}

func diffTokens(
	resTokens []reservoir.Token,
	dbValues []TokenOwner) []TokenOwnerDiff {
	var tokenDiff []TokenOwnerDiff
	for _, token := range resTokens {
		for _, dbValue := range dbValues {
			if token.Details.TokenId == dbValue.GetID() {
				if strings.ToLower(token.Details.Owner) != strings.ToLower(dbValue.GetWallet()) {
					tokenDiff = append(tokenDiff, TokenOwnerDiff{
						ID:            token.Details.TokenId,
						WalletFromDb:  dbValue.GetWallet(),
						WalletFromApi: token.Details.Owner,
					})
				}
			}
		}
	}
	return tokenDiff
}
