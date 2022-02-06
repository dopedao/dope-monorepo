package game

import (
	"context"
	"encoding/json"
	"sync"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/base"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type Game struct {
	// ticks per second
	Ticker *time.Ticker

	Mutex sync.Mutex

	Players      []*Player
	ItemEntities []*ItemEntity

	Register   chan *Player
	Unregister chan *Player
	Broadcast  chan BaseMessage
}

func (g *Game) Start(ctx context.Context) {
	_, log := base.LogFor(ctx)

	log.Info().Msg("starting game")

	for {
		select {
		case t := <-g.Ticker.C:
			g.tick(ctx, t)
		case player := <-g.Register:
			g.Players = append(g.Players, player)

			// read incoming messages
			go player.readPump(ctx)
			// write outgoing messages
			go player.writePump(ctx)

			// players data
			playersData := []PlayerJoinClientData{}
			for _, otherPlayer := range g.Players {
				if player.Id == otherPlayer.Id {
					continue
				}

				playersData = append(playersData, PlayerJoinClientData{
					Id:         otherPlayer.Id.String(),
					Name:       otherPlayer.name,
					CurrentMap: otherPlayer.currentMap,
					X:          otherPlayer.x,
					Y:          otherPlayer.y,
				})
			}
			// item entities data
			itemEntitiesData := []ItemEntityData{}
			for _, itemEntity := range(g.ItemEntities) {
				itemEntitiesData = append(itemEntitiesData, ItemEntityData{
					Id: itemEntity.id.String(),
					Item: itemEntity.item,
					X: itemEntity.x,
					Y: itemEntity.y,
				})
			}

			// handshake data, player ID & game state info
			handShakeData, err := json.Marshal(HandshakeData{
				Id:      player.Id.String(),
				Players: playersData,
				ItemEntities: itemEntitiesData,
			})
			if err != nil {
				player.Send <- generateErrorMessage(500, "could not marshal handshake data")
				return
			}

			player.Send <- BaseMessage{
				Event: "player_handshake",
				Data:  handShakeData,
			}

			log.Info().Msgf("player joined: %s | %s", player.Id, player.name)
		case player := <-g.Unregister:
			for i, p := range g.Players {
				if p == player {
					g.Players = append(g.Players[:i], g.Players[i+1:]...)
					break
				}
			}

			log.Info().Msgf("player left: %s | %s", player.Id, player.name)
		case msg := <-g.Broadcast:
			for i, player := range g.Players {
				select {
				case player.Send <- msg:
				default:
					log.Info().Msgf("could not send message to player: %s | %s", player.Id, player.name)
					g.Players = append(g.Players[:i], g.Players[i+1:]...)
					close(player.Send)
				}
			}
		}
	}
}

func (g *Game) tick(ctx context.Context, time time.Time) {
	// for each player, send a tick message
	for _, player := range g.Players {
		players := []PlayerMoveData{}

		for _, otherPlayer := range g.Players {
			// var squaredDist = math.Pow(float64(otherPlayer.x-player.x), 2) + math.Pow(float64(otherPlayer.y-player.y), 2)
			if otherPlayer == player || otherPlayer.currentMap != player.currentMap {
				continue
			}

			players = append(players, PlayerMoveData{
				Id:        otherPlayer.Id.String(),
				X:         otherPlayer.x,
				Y:         otherPlayer.y,
				Direction: otherPlayer.direction,
			})
		}

		data, err := json.Marshal(TickData{
			Tick:    time.UnixMilli(),
			Players: players,
		})
		if err != nil {
			player.Send <- generateErrorMessage(500, "could not marshal player move data")
			continue
		}

		player.Send <- BaseMessage{
			Event: "tick",
			Data:  data,
		}
	}
}

func (g *Game) PlayerByUUID(uuid uuid.UUID) *Player {
	for _, player := range g.Players {
		if player.Id == uuid {
			return player
		}
	}
	return nil
}

func (g *Game) PlayerByConn(conn *websocket.Conn) *Player {
	for _, player := range g.Players {
		if player.conn == conn {
			return player
		}
	}
	return nil
}

func (g *Game) DispatchPlayerJoin(ctx context.Context, player *Player) {
	_, log := base.LogFor(ctx)

	joinData, err := json.Marshal(PlayerJoinClientData{
		Id:         player.Id.String(),
		Name:       player.name,
		CurrentMap: player.currentMap,
		X:          player.x,
		Y:          player.y,
	})
	if err != nil {
		log.Err(err).Msgf("could not marshal join data for player: %s | %s", player.Id, player.name)
		player.Send <- generateErrorMessage(500, "could not marshal join data")
		return
	}

	// tell every other player that this player joined
	g.Broadcast <- BaseMessage{
		Event: "player_join",
		Data:  joinData,
	}
}

func (g *Game) HandlePlayerJoin(ctx context.Context, conn *websocket.Conn, data PlayerJoinData) {
	if data.CurrentMap == "" {
		// we can directly use writejson here
		// because player is not yet registered
		conn.WriteJSON(generateErrorMessage(422, "current_map is not set"))
		return
	}

	player := &Player{
		conn: conn,
		game: g,

		Id:         uuid.New(),
		currentMap: data.CurrentMap,
		name:       data.Name,
		x:          data.X,
		y:          data.Y,

		Send: make(chan BaseMessage, 256),
	}

	g.Register <- player
	g.DispatchPlayerJoin(ctx, player)
}

func (g *Game) DispatchPlayerLeave(ctx context.Context, player *Player) {
	leaveData, err := json.Marshal(IdData{Id: player.Id.String()})
	if err != nil {
		player.Send <- generateErrorMessage(500, "could not marshal leave data")
		return
	}

	// tell every other player that this player left
	g.Broadcast <- BaseMessage{
		Event: "player_leave",
		Data:  leaveData,
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
// 	for _, otherPlayer := range g.Players {
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

// 	for i, player := range g.Players {
// 		if player.Id == uuid {
// 			g.Players[i].x = data.X
// 			g.Players[i].y = data.Y
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
// 	for _, player := range g.Players {
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
// 			for _, player := range g.Players {
// 				player.conn.WriteJSON(BaseMessage{
// 					Event: "item_entity_destroy",
// 					Data:  data,
// 				})
// 			}
// 			break
// 		}
// 	}
// }
