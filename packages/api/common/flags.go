package common

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
	name := os.Getenv(env)

	if len(name) == 0 {
		name = def
	}

	sv := SecretValue{name: name}
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
