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
	direction  string
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
		case "player_move":
			var data PlayerMoveData
			err := json.Unmarshal(msg.Data, &data)

			if err != nil {
				p.Send <- generateErrorMessage(500, "could not marshal chat message data")
				break
			}

			p.x = data.X
			p.y = data.Y
			p.direction = data.Direction
		case "player_update_map":
			var data PlayerUpdateMapData
			if err := json.Unmarshal(msg.Data, &data); err != nil {
				p.Send <- generateErrorMessage(500, "could not marshal map update data")
				break
			}

			p.currentMap = data.CurrentMap
			p.x = data.X
			p.y = data.Y

			broadcastedData, err := json.Marshal(PlayerUpdateMapClientData{
				Id: p.Id.String(),
				CurrentMap: data.CurrentMap,
				X: data.X,
				Y: data.Y,
			})
			if err != nil {
				p.Send <- generateErrorMessage(500, "could not marshal map update data")
				break
			}

			p.game.Broadcast <- BaseMessage{
				Event: "player_update_map",
				Data:  broadcastedData,
			}

			log.Info().Msgf("player %s | %s changed map: %s", p.Id, p.name, data.CurrentMap)
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
		case "player_pickup_itementity":
			var data IdData
			json.Unmarshal(msg.Data, &data)

			// search for item entity and remove it + broadcast its removal to all players
			for i, itemEntity := range(p.game.ItemEntities) {
				if (itemEntity.id.String() != data.Id) {
					continue
				}

				p.game.ItemEntities = append(p.game.ItemEntities[:i], p.game.ItemEntities[i+1:]...)
				// broadcast the item entity removal to all players
				p.game.Broadcast <- BaseMessage{
					Event: "itementity_destroy",
					Data: msg.Data,
				}
				break
			}

			// TODO: confirm item entitiy pickup by addingf item to players inventory
			log.Info().Msgf("player %s | %s picked up item entity: %s", p.Id, p.name, data.Id)
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
