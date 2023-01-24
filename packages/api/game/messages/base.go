package messages

import (
	"encoding/json"

	"github.com/dopedao/dope-monorepo/packages/api/game/events"
)

// message that only gets sent to players meeting the condition
type BroadcastMessage struct {
	Message   BaseMessage
	Condition func(interface{}) bool
}

// The base message which wraps all event messages
type BaseMessage struct {
	Event events.Event    `json:"event"`
	Data  json.RawMessage `json:"data"`
}

// Generic error message we use
type ErrorMessageData struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

// helper func to create error messages which can be sent to the client
func GenerateErrorMessage(code int, message string) BaseMessage {
	data, _ := json.Marshal(ErrorMessageData{
		Code:    code,
		Message: message,
	})

	return BaseMessage{
		Event: events.ERROR,
		Data:  data,
	}
}
