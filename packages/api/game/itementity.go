package game

import (
	"github.com/dopedao/dope-monorepo/packages/api/game/dopemap"
	"github.com/google/uuid"
)

type ItemEntityData struct {
	Id   string  `json:"id"`
	Item string  `json:"item"`
	X    float32 `json:"x"`
	Y    float32 `json:"y"`
}

type Item struct {
	item string `json:"item"`
}

type ItemEntity struct {
	id       uuid.UUID
	item     Item
	position dopemap.Position
}

func NewItemEntity(item Item, x float32, y float32) *ItemEntity {
	return &ItemEntity{
		id:       uuid.New(),
		item:     item,
		position: dopemap.Position{X: x, Y: y},
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
