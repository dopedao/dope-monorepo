package game

import "encoding/json"

type BaseMessage struct {
	Event string          `json:"event"`
	Data  json.RawMessage `json:"data"`
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
	Id string  `json:"id"`
	X  float32 `json:"x"`
	Y  float32 `json:"y"`
}

type IdData struct {
	Id string `json:"id"`
}
