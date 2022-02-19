package authentication

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/sessions"
)

type LoginBody struct {
	Message   string `json:"message"`
	Signature string `json:"signature"`
}

var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))

// Generates a nonce for the session.
func NonceHandler() func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		// Generate a 12 bytes (96 bits) randomized string
		nonce := Bytes(22)
		session, err := store.Get(r, "session")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		session.Values["nonce"] = nonce

		w.WriteHeader(200)
		w.Write(nonce)
	}
}

func LoginHandler() func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		var body LoginBody

		err := json.NewDecoder(r.Body).Decode(&body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		message, err := ParseMessage(body.Message)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		session, err := store.Get(r, "session")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if !message.Validate(body.Signature) || session.Values["nonce"] != message.Nonce {
			http.Error(w, "invalid nonce or signature", http.StatusUnauthorized)
			return
		}

		parsedTime, err := time.Parse(time.RFC3339, message.ExpirationTime)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		session.Values["siwe"] = message
		session.Options.MaxAge = int(time.Until(parsedTime).Seconds())
		session.Save(r, w)
	}
}

func LogoutHandler() func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session, err := store.Get(r, "session")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if session.Values["siwe"] == nil {
			http.Error(w, "not logged in", http.StatusUnauthorized)
			return
		}

		session.Options.MaxAge = -1
	}
}
