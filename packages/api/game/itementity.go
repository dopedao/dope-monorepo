package game

import (
	"github.com/google/uuid"
)

type ItemEntity struct {
	id   uuid.UUID
	item string
	x    float32
	y    float32
}
