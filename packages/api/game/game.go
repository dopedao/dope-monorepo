package game

import (
	"context"
	"encoding/json"

	"github.com/dopedao/dope-monorepo/packages/api/base"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type Game struct {
	Players      PlayersContainer
	ItemEntities ItemEntitiesContainer

	Register   chan *Player
	Unregister chan *Player
	Broadcast  chan BaseMessage
}

func (g *Game) Start(ctx context.Context) {
	_, log := base.LogFor(ctx)

	for {
		select {
		case player := <-g.Register:
			g.Players.mutex.Lock()
			g.Players.data = append(g.Players.data, player)

			// handshake
			handShakeData, err := json.Marshal(IdData{Id: player.Id.String()})
			if err != nil {
				log.Err(err).Msg("could not marshal handshake data")
				return
			}

			// send back id to player
			player.conn.WriteJSON(BaseMessage{
				Event: "player_handshake",
				Data:  handShakeData,
			})
			g.Players.mutex.Unlock()

			// read incoming messages
			go player.readPump(ctx)
			// write outgoing messages
			go player.writePump(ctx)

			log.Info().Msgf("player joined: %s | %s", player.Id, player.name)
		case player := <-g.Unregister:
			g.Players.mutex.Lock()
			for i, p := range g.Players.data {
				if p == player {
					g.Players.data = append(g.Players.data[:i], g.Players.data[i+1:]...)
					break
				}
			}
			g.Players.mutex.Unlock()

			log.Info().Msgf("player left: %s | %s", player.Id, player.name)
		case msg := <-g.Broadcast:
			g.Players.mutex.Lock()
			for _, player := range g.Players.data {
				player.conn.WriteJSON(msg)
			}
			g.Players.mutex.Unlock()
		}
	}
}

func (g *Game) DispatchPlayerJoin(ctx context.Context, player *Player) {
	_, log := base.LogFor(ctx)

	joinData, err := json.Marshal(PlayerJoinClientData{
		Id:   player.Id.String(),
		Name: player.name,
		X:    player.x,
		Y:    player.y,
	})
	if err != nil {
		log.Err(err).Msg("could not marshal join data")
		return
	}

	// tell every other player that this player joined
	g.Broadcast <- BaseMessage{
		Event: "player_join",
		Data:  joinData,
	}
}

func (g *Game) HandlePlayerJoin(ctx context.Context, conn *websocket.Conn, data PlayerJoinData) {
	player := &Player{
		conn: conn,
		game: g,

		Id:         uuid.New(),
		currentMap: data.CurrentMap,
		name:       data.Name,
		x:          data.X,
		y:          data.Y,
	}

	g.Register <- player
	g.DispatchPlayerJoin(ctx, player)
}

func (g *Game) DispatchPlayerLeave(ctx context.Context, player *Player) {
	_, log := base.LogFor(ctx)

	leaveData, err := json.Marshal(IdData{Id: player.Id.String()})
	if err != nil {
		log.Err(err).Msg("could not marshal leave data")
		return
	}

	// tell every other player that this player left
	g.Broadcast <- BaseMessage{
		Event: "player_leave",
		Data:  leaveData,
	}
}

func (g *Game) HandlePlayerLeave(ctx context.Context, conn *websocket.Conn, data IdData) {
	_, log := base.LogFor(ctx)

	uuid, err := uuid.Parse(data.Id)
	if err != nil {
		log.Err(err).Msgf("could not parse uuid: %s", data.Id)
		return
	}

	for _, player := range g.Players.data {
		if player.Id == uuid {
			g.Unregister <- player
			g.DispatchPlayerLeave(ctx, player)
			break
		}
	}
}

// func (g *Game) DispatchPlayerMove(ctx context.Context, player *Player) {
// 	_, log := base.LogFor(ctx)

// 	moveData, err := json.Marshal(PlayerMoveData{
// 		Id: player.Id.String(),
// 		X:  player.x,
// 		Y:  player.y,
// 	})
// 	if err != nil {
// 		log.Err(err).Msg("could not marshal move data")
// 		return
// 	}

// 	// tell every other player that this player moved
// 	for _, otherPlayer := range g.players.data {
// 		if player.Id == otherPlayer.Id {
// 			continue
// 		}

// 		// player move message
// 		otherPlayer.conn.WriteJSON(BaseMessage{
// 			Event: "player_move",
// 			Data:  moveData,
// 		})
// 	}
// }

// func (g *Game) HandlePlayerMove(ctx context.Context, data PlayerMoveData) {
// 	g.players.mutex.Lock()
// 	defer g.players.mutex.Unlock()

// 	_, log := base.LogFor(ctx)

// 	uuid, err := uuid.Parse(data.Id)
// 	if err != nil {
// 		log.Err(err).Msg("could not parse uuid: " + data.Id)
// 		return
// 	}

// 	for i, player := range g.players.data {
// 		if player.Id == uuid {
// 			g.players.data[i].x = data.X
// 			g.players.data[i].y = data.Y
// 			g.DispatchPlayerMove(ctx, player)
// 			break
// 		}
// 	}
// }

// func (g *Game) HandleItemEntityCreate(ctx context.Context, data ItemEntityCreateData) {
// 	g.itemEntities.mutex.Lock()
// 	defer g.itemEntities.mutex.Unlock()

// 	_, log := base.LogFor(ctx)

// 	g.itemEntities.data = append(g.itemEntities.data, &ItemEntity{
// 		id:   uuid.New(),
// 		item: data.Item,
// 		x:    data.X,
// 		y:    data.Y,
// 	})

// 	log.Info().Msgf("item entity created: %s | %s", g.itemEntities.data[len(g.itemEntities.data)-1].id, data.Item)

// 	marshaledData, err := json.Marshal(data)
// 	if err != nil {
// 		log.Err(err).Msg("could not marshal item entity create data")
// 		return
// 	}

// 	// dispatch to all players item entity creation
// 	for _, player := range g.players.data {
// 		player.conn.WriteJSON(BaseMessage{
// 			Event: "item_entity_create",
// 			Data:  marshaledData,
// 		})
// 	}
// }

// func (g *Game) HandleItemEntityDestroy(ctx context.Context, data IdData) {
// 	g.itemEntities.mutex.Lock()
// 	defer g.itemEntities.mutex.Unlock()

// 	_, log := base.LogFor(ctx)

// 	uuid, err := uuid.Parse(data.Id)
// 	if err != nil {
// 		log.Err(err).Msgf("could not parse uuid: %s", data.Id)
// 		return
// 	}

// 	for i, itemEntity := range g.itemEntities.data {
// 		if itemEntity.id == uuid {
// 			// remove item entity
// 			g.itemEntities.data = append(g.itemEntities.data[:i], g.itemEntities.data[i+1:]...)

// 			data, err := json.Marshal(IdData{Id: itemEntity.id.String()})
// 			if err != nil {
// 				log.Err(err).Msg("could not marshal item entity destroy data")
// 				break
// 			}
// 			// dispatch item entity destroy message to other players
// 			for _, player := range g.players.data {
// 				player.conn.WriteJSON(BaseMessage{
// 					Event: "item_entity_destroy",
// 					Data:  data,
// 				})
// 			}
// 			break
// 		}
// 	}
// }
