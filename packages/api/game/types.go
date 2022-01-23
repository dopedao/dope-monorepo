package game

import (
	"context"
	"encoding/json"
	"sync"

	"github.com/dopedao/dope-monorepo/packages/api/base"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type BaseMessage struct {
	Event string          `json:"event"`
	Data  json.RawMessage `json:"data"`
}

type PlayerJoinClientData struct {
	Id   string  `json:"id"`
	Name string  `json:"name"`
	X    float32 `json:"x"`
	Y    float32 `json:"y"`
}

type PlayerJoinData struct {
	Name string  `json:"name"`
	X    float32 `json:"x"`
	Y    float32 `json:"y"`
}

type PlayerMoveData struct {
	Id string  `json:"id"`
	X  float32 `json:"x"`
	Y  float32 `json:"y"`
}

type IdData struct {
	Id string `json:"id"`
}

type ItemEntityCreateData struct {
	Item string  `json:"item"`
	X    float32 `json:"x"`
	Y    float32 `json:"y"`
}

type PlayersContainer struct {
	data  []*Player
	mutex sync.Mutex
}

type ItemEntitiesContainer struct {
	data  []*ItemEntity
	mutex sync.Mutex
}

type Game struct {
	players      PlayersContainer
	itemEntities ItemEntitiesContainer

	// playerMessages chan *BaseMessage
}

func (g *Game) PlayerByUUID(ctx context.Context, uuid uuid.UUID) *Player {
	g.players.mutex.Lock()
	defer g.players.mutex.Unlock()

	for _, player := range g.players.data {
		if player.Id == uuid {
			return player
		}
	}
	return nil
}

func (g *Game) PlayerByConn(ctx context.Context, conn *websocket.Conn) *Player {
	g.players.mutex.Lock()
	defer g.players.mutex.Unlock()

	for _, player := range g.players.data {
		if player.conn == conn {
			return player
		}
	}
	return nil
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
	for _, otherPlayer := range g.players.data {
		if player.Id == otherPlayer.Id {
			continue
		}

		// player join message
		otherPlayer.conn.WriteJSON(BaseMessage{
			Event: "player_join",
			Data:  joinData,
		})
	}
}

func (g *Game) HandlePlayerJoin(ctx context.Context, conn *websocket.Conn, data PlayerJoinData) {
	g.players.mutex.Lock()
	defer g.players.mutex.Unlock()

	_, log := base.LogFor(ctx)

	player := &Player{
		conn: conn,

		Id:   uuid.New(),
		name: data.Name,
		x:    data.X,
		y:    data.Y,
	}

	g.players.data = append(g.players.data, player)
	handShakeData, err := json.Marshal(IdData{Id: player.Id.String()})
	if err != nil {
		log.Err(err).Msg("could not marshal handshake data")
		// remove player
		g.players.data = append(g.players.data[:len(g.players.data)-1], g.players.data[len(g.players.data)-1+1:]...)
		return
	}

	// send back id to player
	conn.WriteJSON(BaseMessage{
		Event: "player_handshake",
		Data:  handShakeData,
	})

	g.DispatchPlayerJoin(ctx, player)

	log.Info().Msgf("player joined: %s | %s", player.Id, player.name)
}

func (g *Game) DispatchPlayerLeave(ctx context.Context, player *Player) {
	_, log := base.LogFor(ctx)

	leaveData, err := json.Marshal(IdData{Id: player.Id.String()})
	if err != nil {
		log.Err(err).Msg("could not marshal leave data")
		return
	}

	// tell every other player that this player left
	for _, otherPlayer := range g.players.data {
		if player.Id == otherPlayer.Id {
			continue
		}

		// player leave message
		otherPlayer.conn.WriteJSON(BaseMessage{
			Event: "player_leave",
			Data:  leaveData,
		})
	}
}

func (g *Game) HandlePlayerLeave(ctx context.Context, conn *websocket.Conn, data IdData) {
	g.players.mutex.Lock()
	defer g.players.mutex.Unlock()

	_, log := base.LogFor(ctx)

	uuid, err := uuid.Parse(data.Id)
	if err != nil {
		log.Err(err).Msgf("could not parse uuid: %s", data.Id)
		return
	}

	for i, player := range g.players.data {
		if player.Id == uuid {
			g.players.data = append(g.players.data[:i], g.players.data[i+1:]...)
			conn.Close()
			g.DispatchPlayerLeave(ctx, player)
			log.Info().Msgf("player left: %s | %s", player.Id, player.name)
			break
		}
	}
}

func (g *Game) DispatchPlayerMove(ctx context.Context, player *Player) {
	_, log := base.LogFor(ctx)

	moveData, err := json.Marshal(PlayerMoveData{
		Id: player.Id.String(),
		X:  player.x,
		Y:  player.y,
	})
	if err != nil {
		log.Err(err).Msg("could not marshal move data")
		return
	}

	// tell every other player that this player moved
	for _, otherPlayer := range g.players.data {
		if player.Id == otherPlayer.Id {
			continue
		}

		// player move message
		otherPlayer.conn.WriteJSON(BaseMessage{
			Event: "player_move",
			Data:  moveData,
		})
	}
}

func (g *Game) HandlePlayerMove(ctx context.Context, data PlayerMoveData) {
	g.players.mutex.Lock()
	defer g.players.mutex.Unlock()

	_, log := base.LogFor(ctx)

	uuid, err := uuid.Parse(data.Id)
	if err != nil {
		log.Err(err).Msg("could not parse uuid: " + data.Id)
		return
	}

	for i, player := range g.players.data {
		if player.Id == uuid {
			g.players.data[i].x = data.X
			g.players.data[i].y = data.Y
			g.DispatchPlayerMove(ctx, player)
			break
		}
	}
}

func (g *Game) HandleItemEntityCreate(ctx context.Context, data ItemEntityCreateData) {
	g.itemEntities.mutex.Lock()
	defer g.itemEntities.mutex.Unlock()

	_, log := base.LogFor(ctx)

	g.itemEntities.data = append(g.itemEntities.data, &ItemEntity{
		id:   uuid.New(),
		item: data.Item,
		x:    data.X,
		y:    data.Y,
	})

	log.Info().Msgf("item entity created: %s | %s", g.itemEntities.data[len(g.itemEntities.data)-1].id, data.Item)

	marshaledData, err := json.Marshal(data)
	if err != nil {
		log.Err(err).Msg("could not marshal item entity create data")
		return
	}

	// dispatch to all players item entity creation
	for _, player := range g.players.data {
		player.conn.WriteJSON(BaseMessage{
			Event: "item_entity_create",
			Data:  marshaledData,
		})
	}
}

func (g *Game) HandleItemEntityDestroy(ctx context.Context, data IdData) {
	g.itemEntities.mutex.Lock()
	defer g.itemEntities.mutex.Unlock()

	_, log := base.LogFor(ctx)

	uuid, err := uuid.Parse(data.Id)
	if err != nil {
		log.Err(err).Msgf("could not parse uuid: %s", data.Id)
		return
	}

	for i, itemEntity := range g.itemEntities.data {
		if itemEntity.id == uuid {
			// remove item entity
			g.itemEntities.data = append(g.itemEntities.data[:i], g.itemEntities.data[i+1:]...)

			data, err := json.Marshal(IdData{Id: itemEntity.id.String()})
			if err != nil {
				log.Err(err).Msg("could not marshal item entity destroy data")
				break
			}
			// dispatch item entity destroy message to other players
			for _, player := range g.players.data {
				player.conn.WriteJSON(BaseMessage{
					Event: "item_entity_destroy",
					Data:  data,
				})
			}
			break
		}
	}
}

type Player struct {
	conn *websocket.Conn

	Id   uuid.UUID
	name string
	x    float32
	y    float32

	// messages chan
}

type ItemEntity struct {
	id   uuid.UUID
	item string
	x    float32
	y    float32
}
