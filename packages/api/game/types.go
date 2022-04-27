package game

import (
	"encoding/json"
	"time"
)

type Vec2 struct {
	X float32
	Y float32
}

type BroadcastMessage struct {
	Message   BaseMessage
	Condition func(p *Player) bool
}

type BaseMessage struct {
	Event string          `json:"event"`
	Data  json.RawMessage `json:"data"`
}

type HandshakeData struct {
	Id         string  `json:"id"`
	CurrentMap string  `json:"current_map"`
	X          float32 `json:"x"`
	Y          float32 `json:"y"`
	// citizen: relation{}
	Relations json.RawMessage `json:"relations"`

	Players      []PlayerData     `json:"players"`
	ItemEntities []ItemEntityData `json:"itemEntities"`
}

type TickData struct {
	Time    float32          `json:"time"`
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
	Message   string `json:"message"`
	Author    string `json:"author"`
	Timestamp int64  `json:"timestamp"`
}

type ItemEntityData struct {
	Id   string  `json:"id"`
	Item string  `json:"item"`
	X    float32 `json:"x"`
	Y    float32 `json:"y"`
}

type PlayerData struct {
	Id         string  `json:"id"`
	HustlerId  string  `json:"hustlerId"`
	Name       string  `json:"name"`
	CurrentMap string  `json:"current_map"`
	X          float32 `json:"x"`
	Y          float32 `json:"y"`
}

type PlayerJoinData struct {
	Name      string `json:"name"`
	HustlerId string `json:"hustlerId"`
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

type PlayerAddItemClientData struct {
	Item   string `json:"item"`
	Pickup bool   `json:"pickup"`
}

type PlayerAddQuestClientData struct {
	Quest string `json:"quest"`
}

type CitizenUpdateStateData struct {
	// citizen id
	Citizen string `json:"citizen"`
	// conversation id
	Conversation string `json:"conversation"`
	// text
	Text uint `json:"text"`
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

func unixMilli() int64 {
	return time.Now().UnixNano() / int64(time.Millisecond)
}
