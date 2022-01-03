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
	fmt.Printf("Opensea API is %s", o.URL)
	for {
		select {
		case <-o.ticker.C:
			o.Lock()

			ret, _ := o.GetAssetCollection(ctx, o.Contract)

			fmt.Printf("Total assets: %d\n", len(ret.Assets))

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
					fmt.Printf("outputs is : %w \n", outputs)

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
							fmt.Printf("Error upserting to asset: %w, %d, %s, %s, that is the order\n", err, amount, asset.ID, order)
							return err
						}
						fmt.Printf("inputs is : %s\n", inputs)

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
					if asset.SellOrders == nil {
						// Update Active = false and clear listing input outputs
						lstupdt, _ := tx.Listing.UpdateOneID(dlst.ID).SetActive(false).ClearInputs().ClearOutputs().Save(ctx)
						fmt.Printf("Listing ID %v to inacitve: %v \n", lstupdt.ID, lstupdt.Active)
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
							s.Where(sql.EQ("listing_inputs", asset.LastSale.Transaction.BlockHash))
						})

						// If listing_inputs aren't as assets
						if a == nil {
							if err := tx.Listing.
								Create().
								SetID(asset.LastSale.Transaction.BlockHash).
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
				fmt.Printf("Finished total assets: %d\n", len(ret.Assets))
				return nil
			}); err != nil {
				log.Fatalf("Error with opensea collection %+v", err)
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
		Where(ps).WithInputs().WithOutputs().First(ctx)
	if err != nil {
		fmt.Printf("errin getting asset is %s \n", err)
		return nil, err
	}
	fmt.Printf("asset for this tokenid is %s \n", dlst)
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

	fmt.Printf("asset for this tokenid is %s \n", ast)
	return ast, err
}

// GetAssetCollection for Opensa
func (o Opensea) GetAssetCollection(ctx context.Context, assetContractAddress string) (*Assets, error) {
	// TODO: paginate collection 50 at a time to get all 8k
	path := fmt.Sprintf("%s?asset_contract_address=%s&order_direction=asc&limit=%d", assetPath, assetContractAddress, 50)
	b, err := o.getPath(ctx, path)
	if err != nil {
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
