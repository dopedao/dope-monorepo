package jobs

import (
	"context"
	"fmt"
	"strings"
	"sync"

	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/internal/reservoir"
)

type SetBestTokenPrices struct{}

// Sets best tokens prices in ETH for NFTS from Reservoir API.
// Intended to be run as a cron job FREQUENTLY.
//
// Ent and GO are too rigid to allow for a generic function to update all models
// with a token price, so we have to do it manually with SQL.
//
// Faster anyway, fuck it.
func (s SetBestTokenPrices) Run() {
	ctx := context.Background()

	logger.Init()
	log := logger.Log
	log.Debug().Msg("SetBestTokenPrices job running…")

	var wg sync.WaitGroup
	wg.Add(3)

	go func() {
		defer wg.Done()
		if err := setPrices(ctx, "dopes", "DOPE"); err != nil {
			log.Error().Err(err).Msg("Setting Prices for DOPE")
		}
	}()

	go func() {
		defer wg.Done()
		if err := setPrices(ctx, "hustlers", "HUSTLERS"); err != nil {
			log.Error().Err(err).Msg("Setting Prices for HUSTLERS")
		}
	}()

	go func() {
		defer wg.Done()
		if err := setPrices(ctx, "items", "GEAR"); err != nil {
			log.Error().Err(err).Msg("Setting Prices for GEAR")
		}
	}()

	wg.Wait()

	dbprovider.RefreshSearchIndex(ctx)
}

// Go sucks at generics and polymorphism so we just set this
// via SQL instead of using the Ent ORM because it's faster and less verbose.
func setPrices(ctx context.Context, tableName string, contractName string) error {
	logger.Log.Debug().Msgf("Getting best token prices for %s", tableName)

	r, _ := reservoir.GetTokenPricesForContract(reservoir.ReservoirConfigs[contractName])
	logger.Log.Debug().Msgf("Getting %s prices", contractName)

	// clear old prices
	updateManySql := fmt.Sprintf("UPDATE %s SET best_ask_price_eth = NULL;", tableName)

	// create one sql query and append to it
	ids := make([]string, 0, len(r.TokenPrices))
	updateManySql += fmt.Sprintf(
		"UPDATE %s SET best_ask_price_eth = CASE id", tableName)
	for id, price := range r.TokenPrices {
		updateManySql += fmt.Sprintf(" WHEN '%s' THEN %v", id, price)
		ids = append(ids, fmt.Sprintf("'%s'", id))
	}
	// zero everything except what we got back.
	updateManySql += "\nELSE 0\nEND\nWHERE id IN (" + strings.Join(ids, ", ") + ");"

	logger.Log.Debug().Msgf("Updating %s", contractName)
	_, err := dbprovider.Conn().ExecContext(ctx, updateManySql)
	if err != nil {
		return err
	}

	return nil
}
