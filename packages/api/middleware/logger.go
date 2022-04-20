package middleware

import (
	"fmt"
	"net/http"

	"github.com/rs/zerolog/log"
)

func Logger(nextHandler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Debug().
			Str("path", r.URL.Path).
			Str("query", fmt.Sprintf("%s", r.URL.Query())).
			Str("body", fmt.Sprintf("%s", r.Body)).
			Send()
		nextHandler.ServeHTTP(w, r)
	})
}
