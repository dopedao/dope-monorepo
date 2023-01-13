package message

import (
	"encoding/json"
)

type BaseMessage struct {
	Event string          `json:"event"`
	Data  json.RawMessage `json:"data"`
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

type BroadcastMessage struct {
	Message  BaseMessage
	IsPlayer bool
}

func GenerateErrorMessage(code int, message string) BaseMessage {
	data, _ := json.Marshal(ErrorMessageData{
		Code:    code,
		Message: message,
	})

	return BaseMessage{
		Event: "error",
		Data:  data,
	}
}
