// Shared ENV variables we use across multiple command line tools.
package envcfg

import (
	"github.com/dopedao/dope-monorepo/packages/api/internal/flag"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/spf13/pflag"
)

var Listen *string
var OpenSeaApiKey string
var Network string

func init() {
	// Listen to env variable PORT or default to 8080
	// to avoid warning GCP was giving us about this issue.
	// https://cloud.google.com/appengine/docs/flexible/custom-runtimes/configuring-your-app-with-app-yaml
	port := flag.GetEnvOrFallback("PORT", "8080")
	Listen = pflag.String("listen", port, "server listen port")

	Network = flag.GetEnvOrFallback("NETWORK", "mainnet")

	osVal, err := flag.SecretEnv("OPENSEA", "plaintext://").Value()
	if err != nil {
		logger.LogFatalOnErr(err, "Env OPENSEA not set")
	}
	OpenSeaApiKey = osVal
}
