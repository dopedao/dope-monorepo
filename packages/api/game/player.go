package game

import (
	"context"
	"encoding/json"
	"sync"

	"github.com/dopedao/dope-monorepo/packages/api/base"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type PlayersContainer struct {
	data  []*Player
	mutex sync.Mutex
}

type Player struct {
	conn *websocket.Conn
	game *Game

	Id         uuid.UUID
	name       string
	currentMap string
	x          float32
	y          float32

	// messages sent to player
	Send chan BaseMessage
}

func (p *Player) readPump(ctx context.Context) {
	_, log := base.LogFor(ctx)

	defer func() { close(p.Send) }()

	for {
		var msg BaseMessage
		err := p.conn.ReadJSON(&msg)

		if err != nil {
			break
		}

		switch msg.Event {
		case "player_chat_message":
			var data ChatMessageData
			json.Unmarshal(msg.Data, &data)

			broadcastedData, err := json.Marshal(ChatMessageClientData{
				Message: data.Message,
				Author:  p.Id.String(),
			})

			if err != nil {
				p.Send <- generateErrorMessage("could not marshal chat message data")
				break
			}

			p.game.Broadcast <- BaseMessage{
				Event: "player_chat_message",
				Data:  broadcastedData,
			}

			log.Info().Msgf("player %s | %s sent chat message: %s", p.Id, p.name, data.Message)
		case "player_leave":
			msg.Data, _ = json.Marshal(IdData{
				Id: p.Id.String(),
			})
			p.game.Unregister <- p
			p.game.Broadcast <- msg
			return
		}
	}
}

func (p *Player) writePump(ctx context.Context) {
	// p.game.Players.mutex.Lock()
	for {
		select {
		case msg, ok := <-p.Send:
			if !ok {
				return
			}

			p.conn.WriteJSON(msg)
		}
	}
}

func (pc *PlayersContainer) PlayerByUUID(uuid uuid.UUID) *Player {
	for _, player := range pc.data {
		if player.Id == uuid {
			return player
		}
	}
	return nil
}

func (pc *PlayersContainer) PlayerByConn(conn *websocket.Conn) *Player {
	for _, player := range pc.data {
		if player.conn == conn {
			return player
		}
	}
	return nil
}
