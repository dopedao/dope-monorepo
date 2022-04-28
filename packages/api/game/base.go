package game

import (
	"context"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/wallet"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/internal/middleware"
	"github.com/gorilla/websocket"
)

const TICKRATE = time.Second / 5
const MINUTES_DAY = 24 * 60
const BOT_COUNT = 0

func NewGame() *Game {
	game := Game{
		Ticker: time.NewTicker(TICKRATE),
		SpawnPosition: schema.Position{
			X: 500, Y: 200,
			CurrentMap: "NY_Bushwick_Basket",
		},
		Register:   make(chan *Player),
		Unregister: make(chan *Player),
		Broadcast:  make(chan BroadcastMessage),
	}

	// add fake players
	for i := 0; i < BOT_COUNT; i++ {
		hustlerId := int(rand.Float64() * 1500)
		game.Players = append(game.Players, NewPlayer(nil, &game,
			strconv.Itoa(hustlerId), fmt.Sprintf("Bot #%d - %d", i, hustlerId),
			game.SpawnPosition.CurrentMap, game.SpawnPosition.X, game.SpawnPosition.Y))
	}

	return &game
}

func (g *Game) Handle(ctx context.Context, client *ent.Client, conn *websocket.Conn) {
	ctx, log := logger.LogFor(ctx)
	log.Info().Msgf("New connection from %s", conn.RemoteAddr().String())

	WHITELISTED_WALLETS := []string{
		"0x7C02b7eeB44E32eDa9599a85B8B373b6D1f58BD4",
	}

	for {
		// ignore if player is already registered
		// when a player is registered, it uses its own read and write pumps
		if g.PlayerByConn(conn) != nil {
			continue
		}

		var msg BaseMessage
		if err := conn.ReadJSON(&msg); err != nil {
			// facing a close error, we need to stop handling messages
			if _, ok := err.(*websocket.CloseError); ok {
				break
			}

			// we need to use writejson here
			// because player is not yet registered
			conn.WriteJSON(generateErrorMessage(500, "could not read json"))
			continue
		}

		// messages from players are handled else where
		switch msg.Event {
		case "player_join":
			var data PlayerJoinData
			if err := json.Unmarshal(msg.Data, &data); err != nil {
				// we can directly use writejson here
				// because player is not yet registered
				conn.WriteJSON(generateErrorMessage(500, "could not unmarshal player_join data"))
				continue
			}

			// check if authenticated wallet contains used hustler
			// and get data from db
			var gameHustler *ent.GameHustler = nil
			if data.HustlerId != "" {
				// 2 players cannot have the same hustler id
				if g.PlayerByHustlerID(data.HustlerId) != nil {
					conn.WriteJSON(generateErrorMessage(409, "an instance of this hustler is already in the game"))
					continue
				}

				walletAddress, err := middleware.Wallet(ctx)
				if err != nil {
					conn.WriteJSON(generateErrorMessage(http.StatusUnauthorized, "could not get wallet"))
					continue
				}

				associatedAddress, err := client.Wallet.Query().Where(wallet.HasHustlersWith(hustler.IDEQ(data.HustlerId))).OnlyID(ctx)
				if err != nil || associatedAddress != walletAddress {
					conn.WriteJSON(generateErrorMessage(http.StatusUnauthorized, "could not get hustler"))
					continue
				}

				// check if wallet whitelisted for event
				whitelisted := false

				// whitelist if og, enable in case of events
				// hustlerId, _ := strconv.ParseInt(data.HustlerId, 10, 32)
				// whitelisted = hustlerId <= 500

				if !whitelisted {
					for _, addr := range WHITELISTED_WALLETS {
						if walletAddress == addr {
							whitelisted = true
							break
						}
					}
				}

				if !whitelisted {
					conn.WriteJSON(generateErrorMessage(http.StatusUnauthorized, "not whitelisted"))
					continue
				}

				// get game hustler from hustler id
				gameHustler, err = client.GameHustler.Get(ctx, data.HustlerId)
				if err != nil {
					gameHustler, err = client.GameHustler.Create().
						SetID(data.HustlerId).
						// TODO: define spawn position constant
						SetLastPosition(g.SpawnPosition).
						Save(ctx)
					if err != nil {
						conn.WriteJSON(generateErrorMessage(500, "could not create game hustler"))
						continue
					}
				}
			}

			g.HandlePlayerJoin(ctx, conn, client, gameHustler)
		}
	}
}
