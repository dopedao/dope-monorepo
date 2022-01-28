package game

import (
	"context"
	"encoding/json"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/base"
	"github.com/gorilla/websocket"
)

func NewGame() *Game {
	return &Game{
		// tick each 1/60th of a second
		Ticker:     time.NewTicker(time.Second / 60),
		Register:   make(chan *Player),
		Unregister: make(chan *Player),
		Broadcast:  make(chan BaseMessage),
	}
}

func (g *Game) Handle(ctx context.Context, conn *websocket.Conn) {
	ctx, log := base.LogFor(ctx)
	log.Info().Msgf("New connection from ", conn.RemoteAddr().String())

	for {
		// ignore if player is already registered
		if g.PlayerByConn(conn) != nil {
			continue
		}

		var msg BaseMessage
		if err := conn.ReadJSON(&msg); err != nil {
			// facing a close error, we need to stop handling messages
			if _, ok := err.(*websocket.CloseError); ok {
				return
			}

			// we can directly use writejson here
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

			g.HandlePlayerJoin(ctx, conn, data)
		}
	}
}
