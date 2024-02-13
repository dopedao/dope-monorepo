package api

import (
	"context"
	"net/http"

	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/gorilla/mux"
	"github.com/hashicorp/go-retryablehttp"
	"github.com/rs/cors"

	"github.com/dopedao/dope-monorepo/packages/api/game"
	"github.com/dopedao/dope-monorepo/packages/api/game/api/health"
	ws "github.com/dopedao/dope-monorepo/packages/api/game/api/ws"
	"github.com/dopedao/dope-monorepo/packages/api/game/authentication"
	"github.com/dopedao/dope-monorepo/packages/api/indexer"
	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/internal/middleware"
)

var (
	gameState = game.NewGame()
)

func NewServer(ctx context.Context, network string) (http.Handler, error) {
	log := logger.Log

	log.Info().Msg("Starting Game Server [NEW SERVER]")

	r := mux.NewRouter()
	r.Use(middleware.Session(middleware.Store))

	// run game server loop in the background
	go gameState.Start(ctx, dbprovider.Ent())

	// Health check
	r.HandleFunc("/game/health", health.Handle())

	// Websocket endpoint
	r.HandleFunc("/game/ws", ws.HandleConnection(gameState))

	// Get Eth client for authentication endpoint
	retryableHTTPClient := retryablehttp.NewClient()
	retryableHTTPClient.Logger = nil
	// 0 = ethconfig
	c, err := rpc.DialHTTPWithClient(indexer.Config[network][0].(indexer.EthConfig).RPC, retryableHTTPClient.StandardClient())
	if err != nil {
		log.Fatal().Msg("Dialing ethereum rpc.") //nolint:gocritic
	}
	ethClient := ethclient.NewClient(c)

	// Game authentication
	authRouter := r.PathPrefix("/authentication").Subrouter()
	authCors := cors.New(cors.Options{
		AllowedOrigins:   []string{"https://dopewars.gg", "http://localhost:3000"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})
	authRouter.Use(authCors.Handler)
	authRouter.HandleFunc("/login", authentication.LoginHandler(ethClient))
	authRouter.HandleFunc("/authenticated", authentication.AuthenticatedHandler)
	authRouter.HandleFunc("/logout", authentication.LogoutHandler)

	return cors.New(cors.Options{
		// from cors.AllowAll()
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{
			http.MethodHead,
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodPatch,
			http.MethodDelete,
		},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: false,

		// + we need this to let our subroutes handle options requests with
		// their custom cors options
		OptionsPassthrough: true,
	}).Handler(r), nil
}
