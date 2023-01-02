// Shared variables we use across multiple tools.
// Most of this configuration is set via environment variables
//
// Depending on the value of that variable, we might fetch
// the value from
package envcfg

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"
	"sync"
	"time"

	secretmanager "cloud.google.com/go/secretmanager/apiv1"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/spf13/pflag"
	secretmanagerpb "google.golang.org/genproto/googleapis/cloud/secretmanager/v1"
)

/* Global config vars */
var Listen *string

var OpenSeaApiKey string
var Network string
var DbotAuthSecret string
var DbotClientId string
var DbotGuildId string
var DbotRedirectUri string
var RedisAddress string
var RedisPassword string

func init() {
	// Listen to env variable PORT or default to 8080
	// to avoid warning GCP was giving us about this issue.
	// https://cloud.google.com/appengine/docs/flexible/custom-runtimes/configuring-your-app-with-app-yaml
	port := EnvSecretOrDefault("PORT", "8080")
	Network = EnvSecretOrDefault("NETWORK", "mainnet")
	OpenSeaApiKey = EnvSecretOrDefault(
		"OPENSEA",
		"set-a-real-api-key-in-your-env-or-this-will-break")
	DbotAuthSecret = EnvSecretOrDefault("DBOT_OAUTH_SECRET", "you-cant-talk-to-the-disc-api-without-it") /* !!! NOT the client token !!! */
	DbotClientId = EnvSecretOrDefault("DBOT_CLIENT_ID", "973336825223598090")
	DbotGuildId = EnvSecretOrDefault("DBOT_GUILD_ID", "955075782240239676")
	DbotRedirectUri = EnvSecretOrDefault("DBOT_REDIRECT_URI", "http://localhost:3000/verify")
	RedisPassword = EnvSecretOrDefault("REDIS_PASSWORD", "")
	RedisAddress = EnvSecretOrDefault("REDIS_ADDRESS", "localhost:6379")

	/* Cli flags, usage: go run ... --listen 6060
	 * Uses EnvSecretOrDefault from above if not specified
	 */
	Listen = pflag.String("listen", port, "server listen port")

	pflag.Parse()
}

// Reads a value from environment variable.
//
// If that value includes "secret://" we will attempt to
// fetch it from Google Secrets manager using that value.
//
// If nothing is specified the "def" value is returned.
func EnvSecretOrDefault(key, def string) string {
	var v string
	secretPrefix := "secret://"
	vFromEnv, ok := os.LookupEnv(key)
	if !ok {
		v = def
	} else {
		v = vFromEnv
	}

	if strings.HasPrefix(v, secretPrefix) {
		v = getSecretFromGcp(strings.TrimPrefix(v, secretPrefix))
	}

	return v
}

var (
	smOnce sync.Once
	sm     *secretmanager.Client
)

// GCP Secret Manager Client
func smClient() *secretmanager.Client {
	smOnce.Do(func() {
		c, err := secretmanager.NewClient(context.Background())
		if err != nil {
			log.Fatalf("Initializing secretmanager client: %v", err)
		}
		sm = c
	})
	return sm
}

// A secretPath would be something like projects/12345/secrets/key-name/1
//
// These are available from console.cloud.google.com/security/secret-manager
// assuming you have access to the hosting platform.
func getSecretFromGcp(secretPath string) string {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()
	result, err := smClient().AccessSecretVersion(ctx, &secretmanagerpb.AccessSecretVersionRequest{Name: secretPath})
	if err != nil {
		logger.LogFatalOnErr(
			err,
			fmt.Sprintf("Accessing GCP Secret %s", secretPath))
	}

	return string(result.Payload.Data)
}
