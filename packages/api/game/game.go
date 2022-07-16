package game

import (
	"context"
	"encoding/json"
	"math/rand"
	"sync"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/gamehustler"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/gamehustlerrelation"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type Game struct {
	// current time
	// we wrap around {MINUTES_DAY}
	Time   float32
	Ticker *time.Ticker

	Mutex sync.Mutex

	SpawnPosition schema.Position

	Players      []*Player
	ItemEntities []*ItemEntity

	Register   chan *Player
	Unregister chan *Player
	Broadcast  chan BroadcastMessage
}

func (g *Game) Start(ctx context.Context, client *ent.Client) {
	_, log := logger.LogFor(ctx)

	log.Info().Msg("starting game")

	for {
		select {
		case t := <-g.Ticker.C:
			g.tick(ctx, t)
		case player := <-g.Register:
			g.Players = append(g.Players, player)

			go player.readPump(ctx, client)
			go player.writePump(ctx)

			// handshake data, player ID & game state info
			handShakeData, err := json.Marshal(g.GenerateHandshakeData(ctx, client, player))
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
			// save last position if player has a hustler
			if player.hustlerId != "" {
				gameHustler, err := client.GameHustler.Get(ctx, player.hustlerId)
				if err != nil {
					log.Err(err).Msgf("could not get game hustler: %s", player.hustlerId)
					return
				}

				// update last position
				if err := gameHustler.Update().SetLastPosition(schema.Position{
					CurrentMap: player.currentMap,
					X:          player.position.X,
					Y:          player.position.Y,
				}).Exec(ctx); err != nil {
					log.Err(err).Msgf("saving game hustler: %s", player.hustlerId)
					return
				}
			}

			for i, p := range g.Players {
				if p == player {
					g.Players = append(g.Players[:i], g.Players[i+1:]...)
					break
				}
			}

			log.Info().Msgf("player left: %s | %s", player.Id, player.name)
		case br := <-g.Broadcast:
			for _, player := range g.Players {
				if (br.Condition != nil && !br.Condition(player)) || player.conn == nil {
					continue
				}

				select {
				case player.Send <- br.Message:
				default:
					log.Info().Msgf("could not send message to player: %s | %s", player.Id, player.name)

					data, _ := json.Marshal(IdData{
						Id: player.Id.String(),
					})

					g.Unregister <- player
					g.Broadcast <- BroadcastMessage{
						Message: BaseMessage{
							Event: "player_leave",
							Data:  data,
						},
					}

					close(player.Send)
				}
			}
		}
	}
}

func (g *Game) tick(ctx context.Context, time time.Time) {
	_, log := logger.LogFor(ctx)

	// TODO: better way of doing this?
	if g.Time >= MINUTES_DAY {
		g.Time = 0
	}
	g.Time = (g.Time + 0.5)

	// update fake players positions
	boundaries := Vec2{
		X: 2900,
		Y: 1500,
	}
	for _, player := range g.Players {
		if player.conn != nil {
			continue
		}

		// <= 1/4 x and <= 2/4 y - negative
		// <= 3/4 x and <= 4/4 y - positive
		random := rand.Float32()
		player.lastPosition.X = player.position.X
		player.lastPosition.Y = player.position.Y
		if random <= 0.25 {
			player.position.X = player.position.X - (rand.Float32() * 100)
		} else if random <= 0.5 {
			player.position.Y = player.position.Y - (rand.Float32() * 100)
		} else if random <= 0.75 {
			player.position.X = player.position.X + (rand.Float32() * 100)
		} else {
			player.position.Y = player.position.Y + (rand.Float32() * 100)
		}

		if player.position.X < 0 || player.position.X > boundaries.X {
			player.position.X = player.lastPosition.X
		}
		if player.position.Y < 0 || player.position.Y > boundaries.Y {
			player.position.Y = player.lastPosition.Y
		}
	}

	// for each player, send a tick message
	for _, player := range g.Players {
		if player.conn == nil {
			continue
		}

		players := []PlayerMoveData{}

		for _, otherPlayer := range g.Players {
			// var squaredDist = math.Pow(float64(otherPlayer.x-player.x), 2) + math.Pow(float64(otherPlayer.y-player.y), 2)
			if otherPlayer == player || otherPlayer.currentMap != player.currentMap ||
				(otherPlayer.position.X == otherPlayer.lastPosition.X &&
					otherPlayer.position.Y == otherPlayer.lastPosition.Y) {
				continue
			}

			players = append(players, PlayerMoveData{
				Id:        otherPlayer.Id.String(),
				X:         otherPlayer.position.X,
				Y:         otherPlayer.position.Y,
				Direction: otherPlayer.direction,
			})
		}

		data, err := json.Marshal(TickData{
			Time:    g.Time,
			Tick:    unixMilli(),
			Players: players,
		})
		if err != nil {
			player.Send <- generateErrorMessage(500, "could not marshal player move data")
			continue
		}

		select {
		case player.Send <- BaseMessage{
			Event: "tick",
			Data:  data,
		}:
		default:
			log.Info().Msgf("could not send message to player: %s | %s", player.Id, player.name)

			data, _ := json.Marshal(IdData{
				Id: player.Id.String(),
			})

			g.Unregister <- player
			g.Broadcast <- BroadcastMessage{
				Message: BaseMessage{
					Event: "player_leave",
					Data:  data,
				},
			}

			close(player.Send)
		}
	}
}

func (g *Game) ItemEntityByUUID(uuid uuid.UUID) *ItemEntity {
	for _, itemEntity := range g.ItemEntities {
		if itemEntity.id == uuid {
			return itemEntity
		}
	}
	return nil
}

func (g *Game) PlayerByHustlerID(id string) *Player {
	for _, player := range g.Players {
		if player.hustlerId == id {
			return player
		}
	}
	return nil
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
	_, log := logger.LogFor(ctx)

	joinData, err := json.Marshal(player.Serialize())
	if err != nil {
		log.Err(err).Msgf("could not marshal join data for player: %s | %s", player.Id, player.name)
		return
	}

	// tell every other player that this player joined
	g.Broadcast <- BroadcastMessage{
		Message: BaseMessage{
			Event: "player_join",
			Data:  joinData,
		},
		Condition: func(otherPlayer *Player) bool {
			return otherPlayer != player
		},
	}
}

func (g *Game) HandlePlayerJoin(ctx context.Context, conn *websocket.Conn, client *ent.Client, gameHustler *ent.GameHustler) {
	_, log := logger.LogFor(ctx)
	// if data.CurrentMap == "" {
	// 	// we can directly use writejson here
	// 	// because player is not yet registered
	// 	conn.WriteJSON(generateErrorMessage(422, "current_map is not set"))
	// 	return
	// }

	var player *Player = nil
	if gameHustler != nil {
		hustler, err := client.Hustler.Get(ctx, gameHustler.ID)
		if err != nil {
			log.Err(err).Msgf("could not get hustler: %s", gameHustler.ID)
			conn.WriteJSON(generateErrorMessage(500, "could not get hustler"))
			return
		}
		// query items and quests
		items, err := gameHustler.QueryItems().All(ctx)
		if err != nil {
			log.Err(err).Msgf("could not get items for hustler: %s", gameHustler.ID)
			conn.WriteJSON(generateErrorMessage(500, "could not get items for hustler"))
			return
		}
		quests, err := gameHustler.QueryQuests().All(ctx)
		if err != nil {
			log.Err(err).Msgf("could not get quests for hustler: %s", gameHustler.ID)
			conn.WriteJSON(generateErrorMessage(500, "could not get quests for hustler"))
			return
		}

		player = NewPlayer(conn, g, gameHustler.ID, hustler.Name, gameHustler.LastPosition.CurrentMap, gameHustler.LastPosition.X, gameHustler.LastPosition.Y)
		for _, item := range items {
			player.items = append(player.items, Item{item: item.Item})
		}
		for _, quest := range quests {
			player.quests = append(player.quests, Quest{Quest: quest.Quest, Completed: quest.Completed})
		}
	} else {
		player = NewPlayer(conn, g, "", "Hustler", g.SpawnPosition.CurrentMap, g.SpawnPosition.X, g.SpawnPosition.Y)
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
	g.Broadcast <- BroadcastMessage{
		Message: BaseMessage{
			Event: "player_leave",
			Data:  leaveData,
		},
	}
}

func (g *Game) RemoveItemEntity(itemEntity *ItemEntity) bool {
	removed := false
	for i, entity := range g.ItemEntities {
		if entity == itemEntity {
			g.ItemEntities = append(g.ItemEntities[:i], g.ItemEntities[i+1:]...)
			removed = true

			data, err := json.Marshal(IdData{Id: itemEntity.id.String()})
			if err != nil {
				// TODO: print error message
				break
			}

			g.Broadcast <- BroadcastMessage{
				Message: BaseMessage{
					Event: "player_pickup_itementity",
					Data:  data,
				},
			}

			break
		}
	}

	return removed
}

func (g *Game) GenerateHandshakeData(ctx context.Context, client *ent.Client, player *Player) HandshakeData {
	itemEntitiesData := g.GenerateItemEntitiesData()
	playersData := g.GeneratePlayersData()

	// remove this player from the players data
	for i, p := range playersData {
		if p.Id == player.Id.String() {
			playersData = append(playersData[:i], playersData[i+1:]...)
			break
		}
	}

	relations := map[string]Relation{}
	if player.hustlerId != "" {
		gameJustlerRelations, err := client.GameHustlerRelation.Query().Where(gamehustlerrelation.HasHustlerWith(gamehustler.IDEQ(player.hustlerId))).All(ctx)
		if err == nil {
			for _, relation := range gameJustlerRelations {
				// TODO: log error
				if err == nil {
					relations[relation.Citizen] = Relation{
						Citizen:      relation.Citizen,
						Conversation: relation.Conversation,
						Text:         relation.Text,
					}
				}

			}
		}
	}

	marshalledRelations, _ := json.Marshal(relations)
	return HandshakeData{
		Id:         player.Id.String(),
		CurrentMap: player.currentMap,
		X:          player.position.X,
		Y:          player.position.Y,
		Relations:  marshalledRelations,

		Players:      playersData,
		ItemEntities: itemEntitiesData,
	}
}

func (g *Game) GenerateItemEntitiesData() []ItemEntityData {
	itemEntitiesData := []ItemEntityData{}

	for _, itemEntity := range g.ItemEntities {
		itemEntitiesData = append(itemEntitiesData, itemEntity.Serialize())
	}

	return itemEntitiesData
}

func (g *Game) GeneratePlayersData() []PlayerData {
	playersData := []PlayerData{}

	for _, player := range g.Players {
		playersData = append(playersData, player.Serialize())
	}

	return playersData
}

// func (g *Game) DispatchPlayerMove(ctx context.Context, player *Player) {
// 	_, log := logger.LogFor(ctx)

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

// 	_, log := logger.LogFor(ctx)

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

// 	_, log := logger.LogFor(ctx)

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

// 	_, log := logger.LogFor(ctx)

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
