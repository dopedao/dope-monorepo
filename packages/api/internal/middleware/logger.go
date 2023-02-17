package middleware

import (
	"bytes"
	"fmt"
	"io/ioutil"

	"net/http"

	"github.com/rs/zerolog/log"
)

// Writes the HTTP Querystring and Request Body to log for debugging.
func Logger(nextHandler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Have to read an array of bytes from Body, transform into string
		buf, err := ioutil.ReadAll(r.Body)
		if err != nil {
			log.Error().
				Str("bodyErr", err.Error()).
				Send()
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		log.Debug().
			Str("path", r.URL.Path).
			Str("query", fmt.Sprintf("%s", r.URL.Query())).
			Str("body", string(buf)).
			Send()

		// Must close reader & reassign to Body
		// since we read it already
		reader := ioutil.NopCloser(bytes.NewBuffer(buf))
		r.Body = reader
		nextHandler.ServeHTTP(w, r)
	})
}
