package opensea

import (
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
)

type Config struct {
	URL      string
	Contract string
	Interval time.Duration
	APIKey   string
}

type ConfigCollection []interface{}

var ConfigList = map[string]ConfigCollection{
	"mainnet": {
		Config{
			APIKey:   envcfg.OpenSeaApiKey,
			URL:      "https://api.opensea.io",
			Contract: "0x8707276df042e89669d69a177d3da7dc78bd8723",
			Interval: time.Minute * 20,
		},
	},
	"testnet": {
		Config{
			APIKey:   envcfg.OpenSeaApiKey,
			URL:      "https://api.opensea.io",
			Contract: "0x8707276df042e89669d69a177d3da7dc78bd8723",
			Interval: time.Minute * 600,
		},
	},
}
