package common

import (
	"os"
)

// Allows specifying a fallback value if ENV variable isn't set
func GetEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
