// Small helper functions that keep us DRY
package util

import (
	"os"

	"github.com/rs/zerolog/log"
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

// Reduce boilerplate code all over the place with this handy function
func LogFatalOnErr(err error, msg string) {
	if err != nil {
		log.Fatal().Err(err).Msgf(msg) //nolint:gocritic
	}
}
