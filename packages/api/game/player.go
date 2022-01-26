package game

import (
	"context"
	"encoding/json"

	"github.com/dopedao/dope-monorepo/packages/api/base"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

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

	defer func() {
		data, _ := json.Marshal(IdData{
			Id: p.Id.String(),
		})
		p.game.Unregister <- p
		p.game.Broadcast <- BaseMessage{
			Event: "player_leave",
			Data:  data,
		}
		// closing p.send will also stop the writepump
		close(p.Send)
	}()

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

			// if message length is 0, no need
			// to broadcast it
			if len(data.Message) == 0 {
				continue
			}

			broadcastedData, err := json.Marshal(ChatMessageClientData{
				Message: data.Message,
				Author:  p.Id.String(),
			})

			if err != nil {
				p.Send <- generateErrorMessage(500, "could not marshal chat message data")
				break
			}

			p.game.Broadcast <- BaseMessage{
				Event: "player_chat_message",
				Data:  broadcastedData,
			}

			log.Info().Msgf("player %s | %s sent chat message: %s", p.Id, p.name, data.Message)
		case "player_leave":
			// see defer
			return
		}
	}
}

func (p *Player) writePump(ctx context.Context) {
	for {
		select {
		case msg, ok := <-p.Send:
			// if channel is closed, stop writepump
			if !ok {
				return
			}

			p.conn.WriteJSON(msg)
		}
	}
}
