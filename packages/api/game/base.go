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
		Ticker:     time.NewTicker(time.Second / 3),
		Register:   make(chan *Player),
		Unregister: make(chan *Player),
		Broadcast:  make(chan BaseMessage),
	}
}

func (g *Game) Handle(ctx context.Context, conn *websocket.Conn) error {
	ctx, log := base.LogFor(ctx)
	log.Info().Msg("New connection from " + conn.RemoteAddr().String())

	for {
		// ignore if player is already registered
		if g.Players.PlayerByConn(conn) != nil {
			continue
		}

		var msg BaseMessage
		err := conn.ReadJSON(&msg)

		if err != nil {
			return err
		}

		// messages from players are handled else where
		switch msg.Event {
		case "player_join":
			var data PlayerJoinData
			json.Unmarshal(msg.Data, &data)
			g.HandlePlayerJoin(ctx, conn, data)
		}
	}
}
