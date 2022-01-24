package game

import (
	"context"
	"encoding/json"
	"fmt"

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
		err := conn.ReadJSON(&msg)

		if err != nil {
			return err
		}

		switch msg.Event {
		case "player_join":
			var data PlayerJoinData
			json.Unmarshal(msg.Data, &data)
			g.HandlePlayerJoin(ctx, conn, data)
			fmt.Println(data)
		// case "player_move":
		// 	var data PlayerMoveData
		// 	json.Unmarshal(msg.Data, &data)
		// 	g.HandlePlayerMove(ctx, data)
		case "player_leave":
			var data IdData
			json.Unmarshal(msg.Data, &data)
			g.HandlePlayerLeave(ctx, conn, data)
			fmt.Println(data)
		}
	}
}
