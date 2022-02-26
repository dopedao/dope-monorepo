package authentication

import (
	"encoding/json"
	"fmt"
	"math/big"
	"net/http"
	"strconv"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/middleware"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/gorilla/handlers"
	"github.com/jiulongw/siwe-go"
)

// seconds
const MAX_BLOCK_AGE = 60 * 5

type LoginBody struct {
	Message   string `json:"message"`
	Signature string `json:"signature"`
}

func CORS() func(http.Handler) http.Handler {
	headersOk := handlers.AllowedHeaders([]string{"*"})
	originsOk := handlers.AllowedOrigins([]string{"https://dopewars.gg"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST"})
	credentialsOk := handlers.AllowCredentials()
	return handlers.CORS(headersOk, originsOk, methodsOk, credentialsOk)
}

// Validates signed payload with latest block number
// Block has to maximum [MAX_BLOCK_AGE] old
func LoginHandler(client *ethclient.Client) func(w http.ResponseWriter, r *http.Request) {
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
		signature, err := hexutil.Decode(body.Signature)
		if err != nil {
			http.Error(w, fmt.Sprintf("invalid signature: %s", err.Error()), http.StatusBadRequest)
			return
		}

		// verify that signature is valid and time constraint is met
		if err := siweMessage.Verify(signature); err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		// siwe message nonce is a block number
		blockNumber, err := strconv.ParseInt(siweMessage.Nonce, 10, 64)
		if err != nil {
			http.Error(w, fmt.Sprintf("invalid block number: %s", err.Error()), http.StatusBadRequest)
			return
		}

		block, err := client.BlockByNumber(r.Context(), big.NewInt(blockNumber))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// if block timestamp is more than [MAX_BLOCK_AGE] seconds old, reject
		if time.Now().UTC().Unix()-int64(block.Time()) > MAX_BLOCK_AGE {
			http.Error(w, fmt.Sprintf("block %v outdated: age has to be less than %v seconds", blockNumber, MAX_BLOCK_AGE), http.StatusUnauthorized)
			return
		}

		sc := middleware.SessionFor(r.Context())
		session, err := sc.Get(middleware.Key)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if siweMessage.ExpirationTime != nil {
			session.Options.MaxAge = int(time.Until(*siweMessage.ExpirationTime).Seconds())
		} else {
			session.Options.MaxAge = 0
		}

		middleware.SetWallet(r.Context(), siweMessage.Address.String())
		middleware.SetSiwe(r.Context(), *siweMessage)
		if err := session.Save(r, w); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(200)
		w.Header().Set("Content-Type", "text/plain")
		w.Write([]byte("OK"))
	}
}

func AuthenticatedHandler(w http.ResponseWriter, r *http.Request) {
	wallet, err := middleware.Wallet(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	w.WriteHeader(200)
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(wallet))
}

func LogoutHandler(w http.ResponseWriter, r *http.Request) {
	if err := middleware.Clear(r.Context()); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(200)
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte("OK"))
}
