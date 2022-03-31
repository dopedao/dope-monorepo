package game

import (
	"github.com/google/uuid"
)

type Item struct {
	item string `json:"item"`
}

type ItemEntity struct {
	id       uuid.UUID
	item     Item
	position Vec2
}

func NewItemEntity(item Item, x float32, y float32) *ItemEntity {
	return &ItemEntity{
		id:       uuid.New(),
		item:     item,
		position: Vec2{X: x, Y: y},
	}
}

func (i *ItemEntity) Serialize() ItemEntityData {
	return ItemEntityData{
		Id:   i.id.String(),
		Item: i.item.item,
		X:    i.position.X,
		Y:    i.position.Y,
	}
}
