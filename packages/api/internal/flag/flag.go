// Provides simple access for ENV variables,
// and more complicated access to Google Secret managers
package flag

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"
	"sync"
	"time"

	secretmanager "cloud.google.com/go/secretmanager/apiv1"
	secretmanagerpb "google.golang.org/genproto/googleapis/cloud/secretmanager/v1"
)

// Allows specifying a fallback value if ENV variable isn't set
func GetEnvOrFallback(key, fallback string) string {
	value, ok := os.LookupEnv(key)
	if !ok {
		return fallback
	} else {
		return value
	}
}

var (
	smOnce sync.Once
	sm     *secretmanager.Client
)

func smClient() *secretmanager.Client {
	smOnce.Do(func() {
		c, err := secretmanager.NewClient(context.Background())
		if err != nil {
			log.Fatalf("Setting up secretsmanager client: %v", err)
		}
		sm = c
	})
	return sm
}

// Enables secret manager access for cli flags.
type SecretValue struct {
	name  string
	value string
}

func SecretEnv(env string, def string) *SecretValue {
	v := os.Getenv(env)

	if len(v) == 0 {
		v = def
	}

	sv := SecretValue{name: env, value: v}
	return &sv
}

func (sv *SecretValue) String() string { return sv.name }
func (sv *SecretValue) Value() (string, error) {
	if sv.value == "" {
		if err := sv.Set(sv.name); err != nil {
			return "", err
		}
	}
	return sv.value, nil
}

func (sv *SecretValue) Set(name string) error {
	const plain = "plaintext://"
	if strings.HasPrefix(name, plain) {
		sv.name = name
		sv.value = strings.TrimPrefix(name, plain)
		return nil
	}

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()
	result, err := smClient().AccessSecretVersion(ctx, &secretmanagerpb.AccessSecretVersionRequest{Name: name})
	if err != nil {
		return fmt.Errorf("accessing secret %s: %w", name, err)
	}

	sv.name = name
	sv.value = string(result.Payload.Data)

	return nil
}

func (sv *SecretValue) Type() string { return "secretmanager" }
