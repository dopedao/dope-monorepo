// Shared ENV variables we use across multiple command line tools.
package envcfg

import (
	"fmt"

	"github.com/dopedao/dope-monorepo/packages/api/internal/flag"
	"github.com/spf13/pflag"
)

// Listen to env variable PORT or default to 8080
// to avoid warning GCP was giving us about this issue.
// https://cloud.google.com/appengine/docs/flexible/custom-runtimes/configuring-your-app-with-app-yaml
var port = flag.GetEnvOrFallback("PORT", "8080")
var Listen = pflag.String("listen", port, "server listen port")

const MAX_DB_CONN = 77

var pgHost = flag.GetEnvOrFallback("PG_HOST", "localhost:5433")
var pgPass = flag.GetEnvOrFallback("PG_PASS", "postgres")

var PgConnString = flag.SecretEnv("PG_CONNSTR",
	fmt.Sprintf("postgres://postgres:%s@%s?sslmode=disable", pgPass, pgHost))

var OpenSeaApiKey = flag.SecretEnv("OPENSEA", "plaintext://")

var Network = flag.GetEnvOrFallback("NETWORK", "mainnet")
