package game

import (
	"encoding/json"
)

type BaseMessage struct {
	Event string          `json:"event"`
	Data  json.RawMessage `json:"data"`
}

type HandshakeData struct {
	Id      string                 `json:"id"`
	Players []PlayerJoinClientData `json:"players"`
	// ItemEntities []*ItemEntity `json:"itemEntities"`
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

type PlayerJoinClientData struct {
	Id         string  `json:"id"`
	Name       string  `json:"name"`
	CurrentMap string  `json:"current_map"`
	X          float32 `json:"x"`
	Y          float32 `json:"y"`
}

type PlayerJoinData struct {
	Name       string  `json:"name"`
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
