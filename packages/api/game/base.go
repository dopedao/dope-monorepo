package game

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/gorilla/websocket"
)

func NewGame(ctx context.Context, conn *websocket.Conn) *Game {
	return &Game{
		ctx:        ctx,
		connection: conn,
	}
}

func Handle(ctx context.Context, conn *websocket.Conn, game *Game) {
	for {
		var msg BaseMessage
		err := conn.ReadJSON(&msg)

		if err != nil {
			fmt.Println("error reading message: ", err)
			break
		}

		var data interface{}
		json.Unmarshal(msg.Data, &data)

		switch msg.Event {
		case "player_join":
			game.HandlePlayerJoin(data.(PlayerJoinData))
		case "player_move":
			game.HandlePlayerMove(data.(PlayerMoveData))
		case "player_leave":
			game.HandlePlayerLeave(data.(IdData))
		case "item_create":
			game.HandleItemEntityCreate(data.(ItemEntityCreateData))
		case "item_destroy":
			game.HandleItemEntityDestroy(data.(IdData))
		}
	}
}
