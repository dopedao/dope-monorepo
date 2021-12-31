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

	"github.com/dopedao/dope-monorepo/packages/api/ent"
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
			fmt.Printf("in for API is %s", o.URL)
			o.Lock()

			ret, _ := o.GetAssetCollection(ctx, o.Contract)

			fmt.Printf("Total assets: %d\n", len(ret.Assets))

			if err := ent.WithTx(ctx, o.ent, func(tx *ent.Tx) error {

				for _, asset := range ret.Assets {
					var amount *big.Int
					onSale := false
					if asset.SellOrders != nil {
						amount = asset.SellOrders[0].CurrentPrice.Big()
						fmt.Println(asset.SellOrders[0].CurrentPrice)
						onSale = true
					} else {
						amount = big.NewInt(0)
					}

					if err := tx.Asset.
						Create().
						SetID(fmt.Sprintf("%d", asset.ID)).
						SetAddress(string(asset.AssetContract.Address)).
						SetSymbol(asset.AssetContract.Symbol).SetType("ETH").
						SetAmount(schema.BigInt{Int: amount}).
						SetDecimals(18).
						OnConflictColumns("id").
						UpdateNewValues().
						Exec(ctx); err != nil {
						fmt.Errorf("Error upserting to asset: %w", err)
						return err
					}

					for _, listing := range asset.SellOrders {
						fmt.Println("Iterating over: %s", fmt.Sprintf("%d", asset.ID))
						fmt.Println("order hash is: %s", fmt.Sprintf("%d", listing.OrderHash))
						// TODO: Query for this listing ID, only update if listing amount has changed
						// err := tx.Listing.
						// 	Query().
						// 	Where(listing.Has)
						if err := tx.Listing.
							Create().
							SetID(listing.OrderHash).
							SetSource("OPENSEA").
							SetActive(onSale).
							SetDopeID(asset.TokenID).
							AddOutputIDs(fmt.Sprintf("%d", asset.ID)). // output for sale
							// AddInputIDs(fmt.Sprintf("%d", asset.ID)).
							OnConflictColumns("id").
							Update(func(o *ent.ListingUpsert) {
								o.SetActive(onSale)
							}).
							// UpdateNewValues().
							Exec(ctx); err != nil {
							fmt.Println("Error upserting to asset: %w", err)
							return err
						}
						fmt.Println("Saved: %s", fmt.Sprintf("%d", asset.ID))
					}
					// // Save to listings with asset record
					// if asset.LastSale != nil {
					// 	if err := tx.Listing.
					// 		Create().
					// 		SetID(asset.LastSale.Transaction.BlockHash).
					// 		SetSource("OPENSEA").
					// 		SetActive(false).
					// 		SetDopeID(asset.TokenID).
					// 		AddDopeLastsaleIDs(fmt.Sprintf("%d", asset.ID)).
					// 		// AddInputIDs(fmt.Sprintf("%d", asset.ID)).
					// 		OnConflictColumns("id").
					// 		UpdateNewValues().
					// 		Exec(ctx); err != nil {
					// 		fmt.Errorf("Error upserting to asset: %w", err)
					// 		return err
					// 	}

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

// GetAssetCollection for Opensa
func (o Opensea) GetAssetCollection(ctx context.Context, assetContractAddress string) (*Assets, error) {
	// TODO: paginate collection 50 at a time to get all 8k
	path := fmt.Sprintf("%s?asset_contract_address=%s&order_direction=asc&limit=%d", assetPath, assetContractAddress, 2)
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
