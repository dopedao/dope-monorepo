package game

import (
	"encoding/json"
)

type Vec2 struct {
	X float32
	Y float32
}

type BaseMessage struct {
	Event string          `json:"event"`
	Data  json.RawMessage `json:"data"`
}

type HandshakeData struct {
	Id           string                 `json:"id"`
	Players      []PlayerJoinClientData `json:"players"`
	ItemEntities []ItemEntityData       `json:"itemEntities"`
}

type TickData struct {
	Tick    int64            `json:"tick"`
	Players []PlayerMoveData `json:"players"`
}

type ErrorMessageData struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type ChatMessageData struct {
	Message string `json:"message"`
}

type ChatMessageClientData struct {
	Message string `json:"message"`
	Author  string `json:"author"`
}

type ItemEntityData struct {
	Id   string  `json:"id"`
	Item string  `json:"item"`
	X    float32 `json:"x"`
	Y    float32 `json:"y"`
}

type PlayerJoinClientData struct {
	Id         string  `json:"id"`
	HustlerId  string  `json:"hustlerId"`
	Name       string  `json:"name"`
	CurrentMap string  `json:"current_map"`
	X          float32 `json:"x"`
	Y          float32 `json:"y"`
}

type PlayerJoinData struct {
	Name       string  `json:"name"`
	HustlerId  string  `json:"hustlerId"`
	CurrentMap string  `json:"current_map"`
	X          float32 `json:"x"`
	Y          float32 `json:"y"`
}

type PlayerUpdateMapData struct {
	CurrentMap string  `json:"current_map"`
	X          float32 `json:"x"`
	Y          float32 `json:"y"`
}

type PlayerUpdateMapClientData struct {
	Id         string  `json:"id"`
	CurrentMap string  `json:"current_map"`
	X          float32 `json:"x"`
	Y          float32 `json:"y"`
}

type PlayerMoveData struct {
	Id        string  `json:"id"`
	X         float32 `json:"x"`
	Y         float32 `json:"y"`
	Direction string  `json:"direction"`
}

type CitizenUpdateStateData struct {
	// citizen id
	Id string `json:"id"`
	// increment conversation index
	IncrementConversations bool `json:"incConversations"`
	// increment text index
	IncrementTexts bool `json:"incTexts"`
}

type IdData struct {
	Id string `json:"id"`
}

func generateErrorMessage(code int, message string) BaseMessage {
	data, _ := json.Marshal(ErrorMessageData{
		Code:    code,
		Message: message,
	})

	return BaseMessage{
		Event: "error",
		Data:  data,
	}
}
