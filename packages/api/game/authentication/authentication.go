package authentication

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"math/big"
	"net/http"
	"strconv"
	"time"

	"github.com/aquilax/truncate"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/internal/middleware"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/jiulongw/siwe-go"
	"github.com/rs/zerolog"
)

// seconds
const MAX_BLOCK_AGE = 60 * 5

type LoginBody struct {
	Message   string `json:"message"`
	Signature string `json:"signature"`
}

// Validates signed payload with latest block number
// Block has to maximum [MAX_BLOCK_AGE] old
func LoginHandler(client *ethclient.Client) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		_, log := logger.LogFor(
			r.Context(),
			func(zctx *zerolog.Context) zerolog.Context {
				return zctx.Str("Method", "LoginHandler")
			},
		)

		log.Debug().Msg("Starting login handler...")

		var body LoginBody
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			if err == io.EOF {
				http.Error(w, "missing body", http.StatusBadRequest)
				return
			}
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
		log.Debug().Str("Signature", body.Signature).Msg("Signature")
		signature, err := hexutil.Decode(body.Signature)
		if err != nil {
			http.Error(w, fmt.Sprintf("invalid signature: %s", err.Error()), http.StatusBadRequest)
			return
		}

		// temporary fix for ledger devices (last byte has to be either 0x1b or 0x1c) but
		// signed messages using a ledger end with 0x01/0x00
		v := signature[len(signature)-1]
		if !(v >= 27 && v <= 28) {
			signature[len(signature)-1] += 0x1b
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

		walletAddress := siweMessage.Address.String()

		log.Debug().
			Str("Signature", body.Signature).
			Str("Message", body.Message).
			Str("Wallet Address", walletAddress).
			Msg("Initializing Firebase")

		client, err := middleware.FirebaseInit(r.Context())
		if err != nil {
			log.Err(err).Msgf("firebase init error")
			http.Error(w, "firebase init error", http.StatusInternalServerError)
			return
		}

		token, err := middleware.FirebaseAuth(r.Context(), client, walletAddress)
		if err != nil {
			log.Err(err).Msgf("firebase auth error")
			http.Error(w, "firebase auth error", http.StatusInternalServerError)
			return
		}

		// Saving the JWT token in the user session

		log.Debug().
			Str("Wallet Address", walletAddress).
			Str("Token", token).
			Msg("Setting wallet in session")
		if err := middleware.SetWalletAndToken(r.Context(), walletAddress, token); err != nil {
			log.Err(err).Msgf("set wallet error")
			http.Error(w, "set wallet error", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(200)
		w.Header().Set("Content-Type", "plain/text")
		w.Write([]byte(token))
	}
}

func AuthenticatedHandler(w http.ResponseWriter, r *http.Request) {
	_, log := logger.LogFor(
		r.Context(),
		func(zctx *zerolog.Context) zerolog.Context {
			return zctx.Str("Method", "AuthenticatedHandler")
		},
	)

	sessionIDToken, err := middleware.Token(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	truncatedIDToken := truncate.Truncate(sessionIDToken, 10, "...", truncate.PositionEnd)

	client, err := middleware.FirebaseInit(context.TODO())
	if err != nil {
		log.Err(err).Msgf("firebase init error")
		http.Error(w, "firebase init error", http.StatusUnauthorized)
		return
	}

	log.Debug().
		Str("sessionIDToken", truncatedIDToken).
		Str("client", fmt.Sprintf("%+v", client)).
		Msg("Ready to verify token")

	token, err := client.VerifyIDTokenAndCheckRevoked(r.Context(), sessionIDToken)
	if err != nil {
		log.Err(err).Msgf("verify token error")
		http.Error(w, "verify token error", http.StatusUnauthorized)
		return
	}
	addr, ok := token.Claims["wallet"]
	if !ok {
		http.Error(w, "no wallet address found", http.StatusUnauthorized)
		return
	}

	log.Debug().
		Str("sessionIDToken", truncatedIDToken).
		Str("client", fmt.Sprintf("%+v", client)).
		Msg("VERIFIED TOKEN")

	w.WriteHeader(200)
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(addr.(string)))
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
