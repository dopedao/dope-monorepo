package game

import (
	"sync"

	"github.com/google/uuid"
)

type ItemEntity struct {
	id   uuid.UUID
	item string
	x    float32
	y    float32
}

type ItemEntitiesContainer struct {
	data  []*ItemEntity
	mutex sync.Mutex
}
