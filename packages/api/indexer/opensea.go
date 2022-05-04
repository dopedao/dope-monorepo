package indexer

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/big"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/amount"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/dope"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/listing"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/hashicorp/go-retryablehttp"

	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/schema"
)

const assetPath = "/api/v1/assets"
const maxTokens = 8000
const limit = 150

// Opensea is an opensea client
type Opensea struct {
	sync.Mutex
	URL      string
	ent      *ent.Client
	APIKey   string
	Contract string
	ticker   *time.Ticker
}

type errorResponse struct {
	Success bool `json:"success"`
}

func (e errorResponse) Error() string {
	return "Not success"
}

// OpenseaConfig config
type OpenseaConfig struct {
	URL      string
	Contract string
	Interval time.Duration
	APIKey   string
}

func NewOpenseaIndexer(client *ent.Client, config OpenseaConfig) *Opensea {
	o := &Opensea{
		APIKey:   config.APIKey,
		URL:      config.URL,
		ent:      client,
		Contract: config.Contract,
		ticker:   time.NewTicker(config.Interval),
	}
	return o
}

func (o *Opensea) Sync(ctx context.Context) {
	ctx, log := logger.LogFor(ctx)

	log.Debug().Msg("Starting sync")

	defer o.ticker.Stop()

	for {
		assetsCompleted := 0
		// If we don't encounter any current sell orders that's
		// a pretty good sign that we are doing something wrong.
		atLeastOneItemOnSale := false
		for offset := 0; offset <= maxTokens; offset += limit {
			ret, err := o.getAssetCollection(ctx, o.Contract, limit, offset)
			if err != nil {
				log.Err(err).Msg("OPENSEA: Getting asset collection failed.")
				break
			}

			if ret == nil {
				log.Debug().Msg("OPENSEA: Received nil. Breaking.")
				break
			}

			for _, asset := range ret.Assets {
				if err := ent.WithTx(ctx, o.ent, func(tx *ent.Tx) error {
					dopeID, ok := new(big.Int).SetString(asset.TokenID, 10)
					if !ok {
						return fmt.Errorf("marshalling dope id to big int: %s", asset.TokenID)
					}

					// log.Debug().Msgf("OPENSEA: Listings inactive for %s", asset.TokenID)
					if err := tx.Listing.Update().
						Where(listing.HasDopeWith(dope.IDEQ(asset.TokenID))).
						SetActive(false).Exec(ctx); err != nil {
						return fmt.Errorf("deactivating existing listings: %w", err)
					}

					for _, so := range asset.SellOrders {
						onSale := !so.Cancelled && !so.Finalized
						if onSale {
							atLeastOneItemOnSale = true
							// Debugging to see if we get orders back or not
							// pp.Print(so)
						}
						mashalled, err := json.Marshal(so)
						if err != nil {
							return fmt.Errorf("marshalling opensea order: %v+", err)
						}

						if err := tx.Listing.
							Create().
							SetID(so.OrderHash).
							SetSource(listing.SourceOPENSEA).
							SetActive(onSale).
							SetDopeID(asset.TokenID).
							SetOrder(mashalled).
							OnConflictColumns(listing.FieldID).
							Update(func(o *ent.ListingUpsert) {
								o.SetActive(onSale)
								o.SetOrder(mashalled)
							}).
							Exec(ctx); err != nil {
							return fmt.Errorf("upserting to listing: %w", err)
						}

						if err := tx.Amount.
							Create().
							SetID(fmt.Sprintf("input_%s", so.OrderHash)).
							SetAmount(schema.BigInt{Int: so.CurrentPrice.Big()}).
							SetType(amount.TypeETH).
							SetListingInputID(so.OrderHash).
							OnConflictColumns(amount.FieldID).
							DoNothing().
							Exec(ctx); err != nil && !ent.IsNoRowsInResultSetError(err) {
							return fmt.Errorf("upserting to asset: %w", err)
						}

						// Output of OpenSea sale is the DOPE token.
						// TODO: How do bundles work?
						if err := tx.Amount.
							Create().
							SetID(fmt.Sprintf("output_%s", so.OrderHash)).
							SetType(amount.TypeDOPE).
							SetAssetID(schema.BigInt{Int: dopeID}).
							SetAmount(schema.BigInt{Int: big.NewInt(1)}).
							SetListingOutputID(so.OrderHash).
							OnConflictColumns("id").
							DoNothing().
							Exec(ctx); err != nil && !ent.IsNoRowsInResultSetError(err) {
							return fmt.Errorf("upserting to asset: %w", err)
						}
					}

					// Save to listings with asset record
					if asset.LastSale != nil {
						id := fmt.Sprintf("%d", asset.LastSale.Transaction.ID)
						if err := tx.Listing.
							Create().
							SetID(id).
							SetSource("OPENSEA").
							SetActive(false).
							SetDopeID(asset.TokenID).
							OnConflictColumns("id").
							DoNothing().
							Exec(ctx); err != nil && !ent.IsNoRowsInResultSetError(err) {
							return fmt.Errorf("upserting to listing lastsale: %w", err)
						}

						// paying `amount` for this
						if err := tx.Amount.
							Create().
							SetID(fmt.Sprintf("input_%s", id)).
							SetAmount(schema.BigInt{Int: asset.LastSale.TotalPrice.Big()}).
							SetType(amount.TypeETH).
							SetListingInputID(id).
							OnConflictColumns("id").
							DoNothing().Exec(ctx); err != nil && !ent.IsNoRowsInResultSetError(err) {
							return fmt.Errorf("upserting to last sale asset: %w", err)
						}

						// Output of OpenSea sale is the DOPE token.
						// TODO: How do bundles work?
						if err := tx.Amount.
							Create().
							SetID(fmt.Sprintf("output_%s", id)).
							SetType(amount.TypeDOPE).
							SetAssetID(schema.BigInt{Int: dopeID}).
							SetAmount(schema.BigInt{Int: big.NewInt(1)}).
							SetListingOutputID(id).
							OnConflictColumns("id").
							DoNothing().
							Exec(ctx); err != nil && !ent.IsNoRowsInResultSetError(err) {
							return fmt.Errorf("upserting to asset: %w", err)
						}
					}

					return nil
				}); err != nil {
					log.Err(err).Msg("Indexing opensea collection.")
				}
			}

			assetsCompleted += len(ret.Assets)
			log.Info().Msgf("OPENSEA: Finished total assets: %d, current offset: %d", assetsCompleted, offset)
		}

		if !atLeastOneItemOnSale {
			log.Error().Msg("OPENSEA: No items found listed for sale. This seems incorrect.")
		}

		if err := o.ent.RefreshSearchIndex(ctx); err != nil {
			log.Err(err).Msgf("Refreshing search index.")
		}

		select {
		case <-o.ticker.C:
			continue
		case <-ctx.Done():
			return
		}
	}
}

// getAssetCollection for Opensea
func (o *Opensea) getAssetCollection(ctx context.Context, contract string, limit int, offset int) (*Assets, error) {
	ctx, log := logger.LogFor(ctx)
	path := fmt.Sprintf("%s?asset_contract_address=%s&include_orders=true&order_direction=asc&limit=%d&offset=%d", assetPath, contract, limit, offset)
	url := o.URL + path

	log.Debug().Str("url", url).Msg("Getting asset collection.")
	bytes, err := o.getURL(ctx, url)
	if err != nil {
		return nil, fmt.Errorf("retrieving opensea assets: %w", err)
	}
	// Dump json file to tmp so we can debug
	os.WriteFile(
		fmt.Sprintf("./tmp/assets-%v.json", offset),
		bytes, 0644)
	parsedAssets := &Assets{Assets: []Asset{}}

	return parsedAssets, json.Unmarshal(bytes, parsedAssets)
}

func (o *Opensea) getURL(ctx context.Context, url string) ([]byte, error) {
	client := retryablehttp.NewClient().StandardClient()
	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return nil, err
	}

	if o.APIKey != "" {
		req.Header.Add("X-API-KEY", o.APIKey)
	}
	req.Header.Add("Accept", "application/json")
	req.Header.Add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0")

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		e := new(errorResponse)
		if err := json.Unmarshal(body, e); err != nil {
			return nil, err
		}
		if !e.Success {
			return nil, e
		}

		return nil, fmt.Errorf("backend returns status %d msg: %s", resp.StatusCode, string(body))
	}

	return body, nil
}
