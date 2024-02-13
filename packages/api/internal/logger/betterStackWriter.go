package logger

import (
	"bytes"
	"fmt"
	"net/http"

	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
)

type betterStackWriter struct{}

// Sends zerolog logs to Better Stack
// https://betterstack.com/
func (b betterStackWriter) Write(p []byte) (n int, err error) {
	// Initialize a new POST HTTP request
	req, err := http.NewRequest("POST", "https://in.logs.betterstack.com/", bytes.NewBuffer(p))
	if err != nil {
		return 0, err
	}

	// Set the Content-Type header to application/json
	req.Header.Set("Content-Type", "application/json")

	// Set the Authorization header
	req.Header.Set(
		"Authorization",
		fmt.Sprintf(
			"Bearer %s", envcfg.EnvSecretOrDefault("BETTER_STACK_API_KEY", "")),
	)

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()

	// Wait for a 202 response
	if resp.StatusCode != http.StatusAccepted {
		return 0, fmt.Errorf("Couldn't write to BetterStack: expected status 202, got %d\nPlease ensure BETTER_STACK_API_KEY is set properly.", resp.StatusCode)
	}

	return len(p), nil
}
