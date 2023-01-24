package item

import (
	"github.com/dopedao/dope-monorepo/packages/api/game/dopemap"
	"github.com/google/uuid"
)

type IdData struct {
	Id string `json:"id"`
}

type ItemEntityData struct {
	Id   string  `json:"id"`
	Item string  `json:"item"`
	X    float32 `json:"x"`
	Y    float32 `json:"y"`
}

type Item struct {
	Item string `json:"item"`
}

type ItemEntity struct {
	Id       uuid.UUID
	Item     Item
	Position dopemap.Position
}

func NewItemEntity(item Item, x float32, y float32) *ItemEntity {
	return &ItemEntity{
		Id:       uuid.New(),
		Item:     item,
		Position: dopemap.Position{X: x, Y: y},
	}
}

func (i *ItemEntity) Serialize() ItemEntityData {
	return ItemEntityData{
		Id:   i.Id.String(),
		Item: i.Item.Item,
		X:    i.Position.X,
		Y:    i.Position.Y,
	}
}

func GetItemEntityByUUID(items []*ItemEntity, uuid uuid.UUID) *ItemEntity {
	for i := 0; i < len(items); i++ {
		if items[i].Id == uuid {
			return items[i]
		}
	}

	return nil
}
