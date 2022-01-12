package engine

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/big"
	"net/http"
	"sync"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/base"
	"github.com/dopedao/dope-monorepo/packages/api/ent/amount"
	"github.com/dopedao/dope-monorepo/packages/api/ent/listing"

	"entgo.io/ent/dialect/sql"

	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
)

const assetPath = "/api/v1/assets"
const maxTokens = 8000
const assetsPerPage = 50

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

// NewOpensea creates an opensea API client on maassetet
func NewOpensea(client *ent.Client, config OpenseaConfig) *Opensea {
	o := &Opensea{
		URL:      config.URL,
		ent:      client,
		Contract: config.Contract,
		ticker:   time.NewTicker(config.Interval),
	}
	return o
}

// Sync implemented for Opensa
func (o *Opensea) Sync(ctx context.Context) {
	ctx, log := base.LogFor(ctx)

	defer o.ticker.Stop()

	for {
		assetsCompleted := 0
		for offset := 0; offset <= maxTokens; offset += assetsPerPage {
			ret, err := o.getAssetCollection(ctx, o.Contract, assetsPerPage, offset)
			if err != nil {
				log.Err(err).Msg("Getting asset collection")
				break
			}

			if ret == nil {
				log.Debug().Msg("Received nil from Opensea, breaking")
				break
			}

			for _, oasset := range ret.Assets {
				if err := ent.WithTx(ctx, o.ent, func(tx *ent.Tx) error {
					price := big.NewInt(0)
					order := ""
					onSale := false

					dopeID, ok := new(big.Int).SetString(oasset.TokenID, 10)
					if !ok {
						return fmt.Errorf("marshalling dope id to big int: %s", oasset.TokenID)
					}

					// Getting `amount` 1 DOPE for the payment
					outputs, err := tx.Amount.
						Create().
						SetID(fmt.Sprintf("%d/%s", oasset.ID, oasset.TokenID)).
						SetType(amount.TypeDOPE).
						SetAssetID(schema.BigInt{Int: dopeID}).
						SetAmount(schema.BigInt{Int: big.NewInt(1)}).
						OnConflictColumns("id").
						UpdateNewValues().
						ID(ctx)
					if err != nil {
						return fmt.Errorf("upserting to asset: %w", err)
					}

					// If SellOrders then asset on sale
					if oasset.SellOrders != nil {
						price = oasset.SellOrders[0].CurrentPrice.Big()
						order = oasset.SellOrders[0].OrderHash
						onSale = true
					}

					assetByOrder, err := tx.Amount.
						Query().
						Where(func(s *sql.Selector) {
							s.Where(sql.EQ("listing_inputs", order))
						}).First(ctx)
					if err != nil && !ent.IsNotFound(err) {
						return fmt.Errorf("retrieving asset by order %s: %w", order, err)
					}

					dlst, err := tx.Listing.
						Query().
						Where(func(s *sql.Selector) {
							s.Where(sql.EQ("dope_listings", oasset.TokenID))
						}).First(ctx)
					if err != nil && !ent.IsNotFound(err) {
						return fmt.Errorf("retrieving listing %s: %w", oasset.TokenID, err)
					}

					// If sell orders were removed in Opensea
					if oasset.SellOrders == nil && dlst != nil {
						if err := clearListings(ctx, tx, dlst.ID); err != nil {
							return fmt.Errorf("clearing listing inputs and outputs: %w", err)
						}
					}

					// If listing_inputs aren't in assets
					if assetByOrder == nil && oasset.SellOrders != nil {
						// User changed listing amount and assetByOrder doesn't match order hash
						if dlst != nil {
							if err := clearListings(ctx, tx, dlst.ID); err != nil {
								return fmt.Errorf("clearing listing inputs and outputs: %w", err)
							}
						}

						// paying `amount` for this
						inputs, err := tx.Amount.
							Create().
							SetID(fmt.Sprintf("%d", oasset.ID)).
							SetAmount(schema.BigInt{Int: price}).
							SetType(amount.TypeETH).
							OnConflictColumns(amount.FieldID).
							UpdateNewValues().ID(ctx)
						if err != nil {
							return fmt.Errorf("upserting to asset: %w", err)
						}

						if err := tx.Listing.
							Create().
							SetID(order).
							SetSource(listing.SourceOPENSEA).
							SetActive(onSale).
							SetDopeID(oasset.TokenID).
							AddInputIDs(inputs).
							AddOutputIDs(outputs).
							OnConflictColumns(listing.FieldID).
							Update(func(o *ent.ListingUpsert) {
								o.SetActive(onSale)
							}).
							Exec(ctx); err != nil {
							return fmt.Errorf("upserting to listing: %w", err)
						}
					}
					// Save to listings with asset record
					if oasset.LastSale != nil {
						// paying `amount` for this
						sold, err := tx.Amount.
							Create().
							SetID(fmt.Sprintf("%d", oasset.LastSale.Transaction.ID)).
							SetAmount(schema.BigInt{Int: oasset.LastSale.TotalPrice.Big()}).
							SetType(amount.TypeETH).
							OnConflictColumns("id").
							UpdateNewValues().ID(ctx)
						if err != nil {
							return fmt.Errorf("upserting to last sale asset: %w", err)
						}

						a, err := tx.Amount.
							Query().
							Where(func(s *sql.Selector) {
								s.Where(sql.EQ("listing_inputs", oasset.LastSale.Transaction.TransactionHash))
							}).First(ctx)
						if err != nil && !ent.IsNotFound(err) {
							return fmt.Errorf("getting assets by listing inputs: %w", err)
						}

						// If listing_inputs aren't as assets
						if a == nil {
							if err := tx.Listing.
								Create().
								SetID(oasset.LastSale.Transaction.TransactionHash).
								SetSource("OPENSEA").
								SetActive(false).
								AddInputIDs(sold).
								OnConflictColumns("id").
								UpdateNewValues().
								Exec(ctx); err != nil {
								return fmt.Errorf("upserting to listing lastsale: %w", err)
							}

							if err := tx.Dope.UpdateOneID(oasset.TokenID).SetLastSaleID(oasset.LastSale.Transaction.TransactionHash).
								Exec(ctx); err != nil {
								return fmt.Errorf("upserting to dope lastsale: %w", err)
							}

						}
					}

					return nil
				}); err != nil {
					log.Err(err).Msg("Indexing opensea collection.")
				}
			}

			assetsCompleted += len(ret.Assets)
			log.Info().Msgf("Syncing opensea: finished total assets: %d, current offset: %d", assetsCompleted, offset)
		}

		select {
		case <-o.ticker.C:
			continue
		case <-ctx.Done():
			return
		}
	}
}

// clearListings clears inputs and outputs
func clearListings(ctx context.Context, tx *ent.Tx, id string) error {
	// Update Active = false and clear listing input outputs
	if _, err := tx.Listing.UpdateOneID(id).SetActive(false).ClearInputs().ClearOutputs().Save(ctx); err != nil {
		return fmt.Errorf("clearing listing inputs and outputs: %w", err)
	}
	return nil
}

// getAssetCollection for Opensea
func (o *Opensea) getAssetCollection(ctx context.Context, contract string, page int, offset int) (*Assets, error) {
	path := fmt.Sprintf("%s?asset_contract_address=%s&order_direction=asc&limit=%d&offset=%d", assetPath, contract, page, offset)
	b, err := o.getURL(ctx, o.URL+path)
	if err != nil {
		return nil, fmt.Errorf("retrieving opensea assets %w", err)
	}
	ret := &Assets{Assets: []Asset{}}
	return ret, json.Unmarshal(b, ret)
}

func (o *Opensea) getURL(ctx context.Context, url string) ([]byte, error) {
	client := httpClient()
	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return nil, err
	}
	if o.APIKey != "" {
		req.Header.Add("X-API-KEY", o.APIKey)
	}
	req.Header.Add("Accept", "application/json")
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

func httpClient() *http.Client {
	client := new(http.Client)
	var transport http.RoundTripper = &http.Transport{
		MaxIdleConns:    100,
		IdleConnTimeout: 90 * time.Second,
	}
	client.Transport = transport
	client.Timeout = 10 * time.Second
	return client
}
