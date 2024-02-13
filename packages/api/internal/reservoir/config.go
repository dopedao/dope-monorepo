package reservoir

import (
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
)

var apiKey = envcfg.EnvSecretOrDefault("RESERVOIR_API_KEY", "")

var baseUrls = map[string]string{
	"mainnet":  "https://api.reservoir.tools",
	"optimism": "https://api-optimism.reservoir.tools",
}

var ReservoirConfigs = map[string]ReservoirConfig{
	"DOPE": {
		name:            "DOPE",
		baseUrl:         baseUrls["mainnet"],
		contractAddress: "0x8707276df042e89669d69a177d3da7dc78bd8723",
	},
	"HUSTLERS": {
		name:            "HUSTLERS",
		baseUrl:         baseUrls["optimism"],
		contractAddress: "0xDbfEaAe58B6dA8901a8a40ba0712bEB2EE18368E",
	},
	"GEAR": {
		name:            "GEAR",
		baseUrl:         baseUrls["optimism"],
		contractAddress: "0x0E55e1913C50e015e0F60386ff56A4Bfb00D7110",
	},
}
