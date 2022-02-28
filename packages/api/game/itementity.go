package game

import (
	"github.com/google/uuid"
)

type ItemEntity struct {
	id       uuid.UUID
	item     string
	position Vec2
}

func NewItemEntity(item string, position Vec2) *ItemEntity {
	return &ItemEntity{
		id:       uuid.New(),
		item:     item,
		position: position,
	}
}

func (i *ItemEntity) Serialize() ItemEntityData {
	return ItemEntityData{
		Id:   i.id.String(),
		Item: i.item,
		X:    i.position.X,
		Y:    i.position.Y,
	}
}
