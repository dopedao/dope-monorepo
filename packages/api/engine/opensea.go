package engine

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"sync"
	"time"
)

const assetPath = "/api/v1/assets"

// Opensea is an opensea client
type Opensea struct {
	sync.Mutex
	URL      string
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
func NewOpensea(config OpenseaConfig) *Opensea {
	o := &Opensea{
		URL:      config.URL,
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

			fmt.Println(len(ret.Assets))

			for _, asset := range ret.Assets {
				// Implement save to current Asset and Listing model.
				fmt.Printf("tokenid below")
				fmt.Println(asset.TokenID)
				fmt.Printf("Getting current price")
				fmt.Println(asset.SellOrders)
				if asset.LastSale != nil {
					fmt.Printf("Get last sale price from here")
					fmt.Println(asset.LastSale.TotalPrice)
				}

			}
			o.Unlock()
		case <-ctx.Done():
			return
		}
	}
}

// GetAssetCollection for Opensa
func (o Opensea) GetAssetCollection(ctx context.Context, assetContractAddress string) (*Assets, error) {
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
