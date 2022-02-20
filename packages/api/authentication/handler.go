package authentication

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/sessions"
	"github.com/jiulongw/siwe-go"
)

type LoginBody struct {
	Message   string `json:"message"`
	Signature string `json:"signature"`
}

var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))

// Generates a nonce for the session
func NonceHandler() func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session, err := store.Get(r, "session")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		nonce := siwe.GenerateNonce()

		session.Values["nonce"] = nonce
		// user has 30 seconds to use nonce until it's not valid anymore
		session.Options.MaxAge = 30
		session.Save(r, w)

		w.Header().Set("Content-Type", "text/plain")
		w.WriteHeader(200)
		w.Write([]byte(nonce))
	}
}

// Validates signed payload with nonce
func LoginHandler() func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		var body LoginBody

		err := json.NewDecoder(r.Body).Decode(&body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		siweMessage, err := siwe.MessageFromString(body.Message)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		signature, err := hex.DecodeString(body.Signature[2:])
		if err != nil {
			http.Error(w, fmt.Sprintf("invalid signature: %s", err.Error()), http.StatusBadRequest)
			return
		}

		// verify that signature is valid and time constraint is met
		if err := siweMessage.Verify(signature); err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		session, err := store.Get(r, "session")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// verify that nonce in signed message corresponds to nonce in session
		if siweMessage.Nonce != session.Values["nonce"] {
			http.Error(w, "invalid nonce", http.StatusUnauthorized)
			return
		}

		if siweMessage.ExpirationTime != nil {
			session.Options.MaxAge = int(time.Until(*siweMessage.ExpirationTime).Seconds())
		}

		session.Values["siwe"] = body.Message
		session.Save(r, w)

		w.WriteHeader(200)
		w.Header().Set("Content-Type", "text/plain")
		w.Write([]byte("OK"))
	}
}

func AuthorizedHandler() func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session, err := store.Get(r, "session")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if session.Values["siwe"] == nil {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}

		w.WriteHeader(200)
		w.Header().Set("Content-Type", "text/plain")
		w.Write([]byte("OK"))
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
		session.Save(r, w)

		w.WriteHeader(200)
		w.Header().Set("Content-Type", "text/plain")
		w.Write([]byte("OK"))
	}
}
