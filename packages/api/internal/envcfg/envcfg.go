// Shared ENV variables we use across multiple command line tools.
package envcfg

import (
	"github.com/dopedao/dope-monorepo/packages/api/internal/flag"
	"github.com/spf13/pflag"
)

// Listen to env variable PORT or default to 8080
// to avoid warning GCP was giving us about this issue.
// https://cloud.google.com/appengine/docs/flexible/custom-runtimes/configuring-your-app-with-app-yaml
var port = flag.GetEnvOrFallback("PORT", "8080")
var Listen = pflag.String("listen", port, "server listen port")

var OpenSeaApiKey = flag.SecretEnv("OPENSEA", "plaintext://")
var Network = flag.GetEnvOrFallback("NETWORK", "mainnet")
