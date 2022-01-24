package game

import "encoding/json"

type BaseMessage struct {
	Event string          `json:"event"`
	Data  json.RawMessage `json:"data"`
}

type PlayerJoinClientData struct {
	Id   string  `json:"id"`
	Name string  `json:"name"`
	X    float32 `json:"x"`
	Y    float32 `json:"y"`
}

type PlayerJoinData struct {
	Name string  `json:"name"`
	X    float32 `json:"x"`
	Y    float32 `json:"y"`
}

type PlayerMoveData struct {
	Id string  `json:"id"`
	X  float32 `json:"x"`
	Y  float32 `json:"y"`
}

type IdData struct {
	Id string `json:"id"`
}
