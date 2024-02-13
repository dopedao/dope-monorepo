package coingecko

import (
	"fmt"
	"io"
	"net/http"
	"sync"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
)

// Simple in-memory cache
type Cache struct {
	sync.RWMutex
	body []byte
	last time.Time
}

var cache = &Cache{}
var CACHE_DURATION = time.Minute * 1

// PaperPrice returns the current price of DOPE in USD
func HandlePaperPrice() func(http.ResponseWriter, *http.Request) {
	baseUrl := "https://api.coingecko.com/api/v3/simple/price?ids=dope-wars-paper,eth,usd,optimism&vs_currencies=eth,usd,optimism&include_market_cap=true"
	return func(w http.ResponseWriter, r *http.Request) {
		// ctx := r.Context()
		log := logger.Log.With().
			Str("method", "HandlePaperPrice").
			Logger()

		url := fmt.Sprintf("%s?ids=dope-wars-paper,eth,usd-optimism&vs_currencies=eth,usd,optimism&include_market_cap=true", baseUrl)

		priceJson, err := getPrices(url)
		if err != nil {
			log.Err(err).Msg("Failed getting token prices")
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(`{"error": "Failed getting token prices"}`))
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write(priceJson)
	}
}

func getPrices(url string) ([]byte, error) {
	cache.RLock()
	// If the cache is less than a few minutes old, return the cached body.
	if time.Since(cache.last) < CACHE_DURATION {
		body := cache.body
		cache.RUnlock()
		return body, nil
	}
	cache.RUnlock()

	// Otherwise, make a new HTTP request.
	body, err := makeHttpRequest(url)
	if err != nil {
		return nil, err
	}

	// Update the cache.
	cache.Lock()
	cache.body = body
	cache.last = time.Now()
	cache.Unlock()

	return body, nil
}

func makeHttpRequest(url string) ([]byte, error) {
	apiKey := envcfg.EnvSecretOrDefault("CG_API_KEY", "coingecko-api-key")

	body := []byte{}

	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("accept", "*/*")
	req.Header.Add("x-cg-demo-api-key", apiKey)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		logger.Log.Err(err).Msg("Error making request")
		return body, err
	}

	defer res.Body.Close()
	body, err = io.ReadAll(res.Body)
	if err != nil {
		logger.Log.Err(err).Msg("Failed reading response body")
		return body, err
	}
	return body, nil
}
