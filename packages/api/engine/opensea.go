package engine

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/big"
	"net/http"
	"sync"
	"time"

	"entgo.io/ent/dialect/sql"

	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/predicate"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
)

const assetPath = "/api/v1/assets"
const maxTokens = 8000

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
	defer o.ticker.Stop()

	for {
		select {
		case <-o.ticker.C:
			o.Lock()
			const assetsPerPage = 50
			assetsCompleted := 0
			for offset := 0; offset <= maxTokens; offset += assetsPerPage {
				ret, _ := o.GetAssetCollection(ctx, o.Contract, assetsPerPage, offset)
				if ret == nil {
					fmt.Printf("received nil from Opensea, breaking")
					break
				}

				if err := ent.WithTx(ctx, o.ent, func(tx *ent.Tx) error {

					for _, asset := range ret.Assets {
						var amount *big.Int
						order := ""
						onSale := false
						fmt.Printf("Updating Opensea record for asset.ID: %s\n\n", asset.ID)

						// Getting `amount` 1 DOPE for the payment
						outputs, err := tx.Asset.
							Create().
							SetID(fmt.Sprintf("%d/%s", asset.ID, asset.TokenID)).
							SetAddress(string(asset.AssetContract.Address)).
							SetSymbol(asset.AssetContract.Symbol).
							SetType("DOPE").
							SetAmount(schema.BigInt{Int: big.NewInt(1)}).
							SetDecimals(18).
							OnConflictColumns("id").
							UpdateNewValues().ID(ctx)
						if err != nil {
							fmt.Errorf("Error upserting to asset: %w", err)
							return err
						}

						// If SellOrders then asset on sale
						if asset.SellOrders != nil {
							amount = asset.SellOrders[0].CurrentPrice.Big()
							order = asset.SellOrders[0].OrderHash
							onSale = true
						}

						a, err := QueryAssets(ctx, tx, func(s *sql.Selector) {
							s.Where(sql.EQ("listing_inputs", order))
						})

						// If listing_inputs aren't in assets
						if a == nil && asset.SellOrders != nil {
							// paying `amount` for this
							inputs, err := tx.Asset.
								Create().
								SetID(fmt.Sprintf("%d", asset.ID)).
								SetAddress(order).
								SetSymbol(asset.AssetContract.Symbol).
								SetType("ETH").
								SetAmount(schema.BigInt{Int: amount}).
								SetDecimals(18).
								OnConflictColumns("id").
								UpdateNewValues().ID(ctx) // Exec(ctx)

							if err != nil {
								fmt.Printf("Error upserting to asset: %w\n", err)
								return err
							}

							if err := tx.Listing.
								Create().
								SetID(order).
								SetSource("OPENSEA").
								SetActive(onSale).
								SetDopeID(asset.TokenID).
								AddInputIDs(inputs).
								AddOutputIDs(outputs).
								OnConflictColumns("id").
								Update(func(o *ent.ListingUpsert) {
									o.SetActive(onSale)
								}).
								Exec(ctx); err != nil {
								fmt.Println("Error upserting to asset: %w", err)
								return err
							}

						}

						dlst, err := QueryListings(ctx, tx, func(s *sql.Selector) {
							s.Where(sql.EQ("dope_listings", asset.TokenID))
						})
						// If sell orders were removed in Opensea
						if asset.SellOrders == nil && dlst != nil {
							// Update Active = false and clear listing input outputs
							lstupdt, _ := tx.Listing.UpdateOneID(dlst.ID).SetActive(false).ClearInputs().ClearOutputs().Save(ctx)
							fmt.Printf("Listing ID %v to active: %v \n", lstupdt.ID, lstupdt.Active)
						}
						// Save to listings with asset record
						if asset.LastSale != nil {
							// paying `amount` for this
							sold, err := tx.Asset.
								Create().
								SetID(fmt.Sprintf("%d", asset.LastSale.Transaction.ID)).
								SetAddress(order).
								SetSymbol(asset.AssetContract.Symbol).SetType("ETH").
								SetAmount(schema.BigInt{Int: asset.LastSale.TotalPrice.Big()}).
								SetDecimals(18).
								OnConflictColumns("id").
								UpdateNewValues().ID(ctx) // Exec(ctx)
							if err != nil {
								fmt.Errorf("Error upserting to last sale asset: %w", err)
								return err
							}
							fmt.Printf("sold ID is: %s\n", sold)

							a, err := QueryAssets(ctx, tx, func(s *sql.Selector) {
								s.Where(sql.EQ("listing_inputs", asset.LastSale.Transaction.TransactionHash))
							})
							lastsales, err := QueryDopes(ctx, tx, func(s *sql.Selector) {
								s.Where(sql.EQ("id", asset.TokenID))
							})
							dopeLastsale, _ := lastsales.QueryLastSale().First(ctx)

							// If listing_inputs aren't as assets
							if a == nil {
								// if dope has last_sale and there was a new sale, clear dope last sales
								if dopeLastsale != nil && dopeLastsale.ID != asset.LastSale.Transaction.TransactionHash {
									updated, _ := tx.Listing.UpdateOneID(dopeLastsale.ID).ClearDopeLastsales().Save(ctx)
									fmt.Printf("updated dopeLastsale id is %s", updated)
								}

								if err := tx.Listing.
									Create().
									SetID(asset.LastSale.Transaction.TransactionHash).
									SetSource("OPENSEA").
									SetActive(false).
									AddInputIDs(sold).
									SetDopeLastsalesID(asset.TokenID).
									OnConflictColumns("id").
									UpdateNewValues().
									Exec(ctx); err != nil {
									fmt.Println("Error upserting to listing lastsale: %w", err)
									return err
								}

							}
						}

					}
					assetsCompleted += len(ret.Assets)
					fmt.Printf("Finished total assets: %d, current offset: %d\n", assetsCompleted, offset)
					return nil
				}); err != nil {
					log.Fatalf("Error with opensea collection %+v", err)
				}
			}
			o.Unlock()
		case <-ctx.Done():
			return
		}
	}
}

// QueryListings filter by dope_listings
func QueryListings(ctx context.Context, tx *ent.Tx, ps predicate.Listing) (*ent.Listing, error) {
	dlst, err := tx.Listing.
		Query().
		Where(ps).WithInputs().WithOutputs().WithDopeLastsales().First(ctx)
	if err != nil {
		fmt.Printf("Error retrieving listing for ps %s \n", err)
		return nil, err
	}
	return dlst, err
}

// QueryAssets filter by dope_listings
func QueryAssets(ctx context.Context, tx *ent.Tx, ps predicate.Asset) (*ent.Asset, error) {
	ast, err := tx.Asset.
		Query().
		Where(ps).First(ctx)
	if err != nil {
		fmt.Printf("Error retrieving asset for ps %w \n", ps)
		return nil, err
	}

	// fmt.Printf("asset for this tokenid is %s \n", ast)
	return ast, err
}

// QueryDopes filter by dope_listings
func QueryDopes(ctx context.Context, tx *ent.Tx, ps predicate.Dope) (*ent.Dope, error) {
	dope, err := tx.Dope.
		Query().
		Where(ps).First(ctx)
	if err != nil {
		fmt.Printf("Error retrieving asset for ps %w \n", ps)
		return nil, err
	}

	return dope, err
}

// GetAssetCollection for Opensea
func (o Opensea) GetAssetCollection(ctx context.Context, contract string, page int, offset int) (*Assets, error) {
	const assetsPerPage = 50
	path := fmt.Sprintf("%s?asset_contract_address=%s&order_direction=asc&limit=%d&offset=%d", assetPath, contract, page, offset)
	b, err := o.getPath(ctx, path)
	if err != nil {
		log.Fatalf("error retrieving opensea assets %w", err)
		return nil, err
	}
	ret := &Assets{Assets: []Asset{}}
	return ret, json.Unmarshal(b, ret)
}

func (o Opensea) getPath(ctx context.Context, path string) ([]byte, error) {
	return o.getURL(ctx, o.URL+path)
}

func (o Opensea) getURL(ctx context.Context, url string) ([]byte, error) {
	client := httpClient()
	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if o.APIKey != "" {
		req.Header.Add("X-API-KEY", o.APIKey)
	}
	req.Header.Add("Accept", "application/json")
	resp, err := client.Do(req)
	fmt.Println(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	fmt.Println(resp.Body)
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		e := new(errorResponse)
		err = json.Unmarshal(body, e)
		if err != nil {
			return nil, err
		}
		if !e.Success {
			return nil, e
		}

		return nil, fmt.Errorf("Backend returns status %d msg: %s", resp.StatusCode, string(body))
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
