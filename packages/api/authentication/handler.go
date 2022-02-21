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

var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))

// seconds
const MAX_NONCE_AGE = 30

// Generates a nonce for the session
func NonceHandler() func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session, err := store.Get(r, "nonce")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		nonce := siwe.GenerateNonce()

		session.Values["nonce"] = nonce
		// user has [MAX_NONCE_AGE] seconds to use nonce until it's not valid anymore
		session.Options.MaxAge = MAX_NONCE_AGE
		if err := session.Save(r, w); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "text/plain")
		w.WriteHeader(200)
		// send back nonce + its max age
		// [nonce] [max-age]
		w.Write([]byte(fmt.Sprintf("%s %d", nonce, session.Options.MaxAge)))
	}
}

// Validates signed payload with nonce
func LoginHandler() func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		var body LoginBody
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		siweMessage, err := siwe.MessageFromString(body.Message)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// parse hex signature into a sequence of bytes
		// ignore 0x if starting with it
		var signature []byte
		if body.Signature[0:2] != "0x" {
			signature, err = hex.DecodeString(body.Signature)
		} else {
			signature, err = hex.DecodeString(body.Signature[2:])
		}
		if err != nil {
			http.Error(w, fmt.Sprintf("invalid signature: %s", err.Error()), http.StatusBadRequest)
			return
		}

		// verify that signature is valid and time constraint is met
		if err := siweMessage.Verify(signature); err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		nonceSession, err := store.Get(r, "nonce")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// verify that nonce in signed message corresponds to nonce in session
		if siweMessage.Nonce != nonceSession.Values["nonce"] {
			http.Error(w, "invalid nonce", http.StatusUnauthorized)
			return
		}

		session, err := store.Get(r, "session")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if siweMessage.ExpirationTime != nil {
			session.Options.MaxAge = int(time.Until(*siweMessage.ExpirationTime).Seconds())
		} else {
			session.Options.MaxAge = 0
		}

		// destroy nonce session to prevent
		// nonce reuse after successful login
		nonceSession.Options.MaxAge = -1
		if err := session.Save(r, w); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		session.Values["siwe"] = body.Message
		if err := session.Save(r, w); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

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
		if err := session.Save(r, w); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(200)
		w.Header().Set("Content-Type", "text/plain")
		w.Write([]byte("OK"))
	}
}
