package game

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type BaseMessage struct {
	Event string          `json:"event"`
	Data  json.RawMessage `json:"data"`
}

type PlayerJoinData struct {
	name string
	x    float32
	y    float32
}

type PlayerMoveData struct {
	id string
	x  float32
	y  float32
}

type IdData struct {
	id string
}

type ItemEntityCreateData struct {
	item string
	x    float32
	y    float32
}

type Game struct {
	ctx          context.Context
	connection   *websocket.Conn
	players      []*Player
	itemEntities []*ItemEntity
}

func (g *Game) HandlePlayerJoin(data PlayerJoinData) {
	fmt.Println("player join")

	player := &Player{
		id:   uuid.New(),
		name: data.name,
		x:    data.x,
		y:    data.y,
	}

	playersPatched := append(g.players, player)
	fmt.Println("players patched: ", playersPatched)
}

func (g *Game) HandlePlayerLeave(data IdData) {
	fmt.Println("player leave")

	for i, player := range g.players {
		uuid, err := uuid.FromBytes([]byte(data.id))
		if err != nil {
			fmt.Println("could not parse uuid: ", err)
			continue
		}

		if player.id == uuid {
			g.players = append(g.players[:i], g.players[i+1:]...)
			break
		}
	}
}

func (g *Game) HandlePlayerMove(data PlayerMoveData) {
	fmt.Println("player move")

	for i, player := range g.players {
		uuid, err := uuid.FromBytes([]byte(data.id))
		if err != nil {
			fmt.Println("could not parse uuid: ", err)
			continue
		}

		if player.id == uuid {
			g.players[i].x = data.x
			g.players[i].y = data.y
			break
		}
	}
}

func (g *Game) HandleItemEntityCreate(data ItemEntityCreateData) {
	fmt.Println("item entity create")

	itemEntitiesPatched := append(g.itemEntities, &ItemEntity{
		id:   uuid.New(),
		item: data.item,
		x:    data.x,
		y:    data.y,
	})
	fmt.Println("item entities patched: ", itemEntitiesPatched)
}

func (g *Game) HandleItemEntityDestroy(data IdData) {
	fmt.Println("item entity destroy")

	for i, itemEntity := range g.itemEntities {
		uuid, err := uuid.FromBytes([]byte(data.id))
		if err != nil {
			fmt.Println("could not parse uuid: ", err)
			continue
		}

		if itemEntity.id == uuid {
			g.itemEntities = append(g.itemEntities[:i], g.itemEntities[i+1:]...)
			break
		}
	}
}

type Player struct {
	id   uuid.UUID
	name string
	x    float32
	y    float32
}

type ItemEntity struct {
	id   uuid.UUID
	item string
	x    float32
	y    float32
}

// type Item struct {

// }
