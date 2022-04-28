package game

import (
	"context"
	"net/http"

	"github.com/dopedao/dope-monorepo/packages/api/game/authentication"
	"github.com/dopedao/dope-monorepo/packages/api/indexer"
	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/internal/middleware"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/hashicorp/go-retryablehttp"
	"github.com/rs/cors"
)

var (
	wsUpgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin:     func(r *http.Request) bool { return true },
	}
	gameState = NewGame()
)

func NewServer(ctx context.Context, network string) (http.Handler, error) {
	_, log := logger.LogFor(ctx)

	log.Debug().Msg("Starting Game Server")

	r := mux.NewRouter()
	r.Use(middleware.Session(middleware.Store))

	// run game server loop in the background
	go gameState.Start(ctx, dbprovider.Ent())

	// Websocket endpoint
	r.HandleFunc("/game/ws", func(w http.ResponseWriter, r *http.Request) {
		// check if authenticated
		if !middleware.IsAuthenticated(r.Context()) {
			http.Error(w, "not authenticated", http.StatusUnauthorized)
			return
		}

		wsConn, err := wsUpgrader.Upgrade(w, r, nil)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// close the connection when the function returns
		defer wsConn.Close()

		// handle messages
		gameState.Handle(r.Context(), dbprovider.Ent(), wsConn)
	})

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
