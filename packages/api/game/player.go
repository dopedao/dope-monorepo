package game

import (
	"context"
	"sync"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type PlayersContainer struct {
	data  []*Player
	mutex sync.Mutex
}

type Player struct {
	conn *websocket.Conn

	Id   uuid.UUID
	name string
	x    float32
	y    float32

	// messages sent to player
	Send chan BaseMessage
}

// func (p *Player)

func (pc *PlayersContainer) PlayerByUUID(ctx context.Context, uuid uuid.UUID) *Player {
	for _, player := range pc.data {
		if player.Id == uuid {
			return player
		}
	}
	return nil
}

func (pc *PlayersContainer) PlayerByConn(ctx context.Context, conn *websocket.Conn) *Player {
	for _, player := range pc.data {
		if player.conn == conn {
			return player
		}
	}
	return nil
}
