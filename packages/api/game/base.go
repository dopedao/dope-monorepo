package game

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/base"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
	"github.com/dopedao/dope-monorepo/packages/api/middleware"
	"github.com/gorilla/websocket"
)

func NewGame() *Game {
	return &Game{
		Ticker:     time.NewTicker(time.Second / 5),
		Register:   make(chan *Player),
		Unregister: make(chan *Player),
		Broadcast:  make(chan BaseMessage),
	}
}

func (g *Game) Handle(client *ent.Client, ctx context.Context, conn *websocket.Conn) {
	ctx, log := base.LogFor(ctx)
	log.Info().Msgf("New connection from ", conn.RemoteAddr().String())

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
			walletAddress, err := middleware.Wallet(ctx)
			if err != nil {
				conn.WriteJSON(generateErrorMessage(http.StatusUnauthorized, "could not get wallet"))
				continue
			}

			has, err := client.Hustler.Query().Where(hustler.HasWalletWith(wallet.IDEQ(walletAddress))).Count(ctx)
			if err != nil || has == 0 {
				conn.WriteJSON(generateErrorMessage(http.StatusUnauthorized, "could not get hustler"))
				continue
			}

			g.HandlePlayerJoin(ctx, conn, data)
		}
	}
}
