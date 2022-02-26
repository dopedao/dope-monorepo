package game

import (
	"context"
	"encoding/json"

	"github.com/dopedao/dope-monorepo/packages/api/base"
	"github.com/gorilla/websocket"
)

func NewGame() *Game {
	return &Game{
		Register:   make(chan *Player),
		Unregister: make(chan *Player),
		Broadcast:  make(chan BaseMessage),
	}
}

func (g *Game) Handle(ctx context.Context, conn *websocket.Conn) error {
	ctx, log := base.LogFor(ctx)
	log.Info().Msg("New connection from " + conn.RemoteAddr().String())

	for {
		var msg BaseMessage
		if err := conn.ReadJSON(&msg); err != nil {
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
