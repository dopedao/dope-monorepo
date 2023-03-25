package messages

import (
	"encoding/json"
	"log"

	"github.com/dopedao/dope-monorepo/packages/api/game/events"
)

type MessageBuilder struct {
	baseMessage *BaseMessage
	err         error
}

func NewBaseMessage() *MessageBuilder {
	return &MessageBuilder{}
}

func (mb *MessageBuilder) Event(event events.Event) *MessageBuilder {
	mb.baseMessage.Event = event

	return mb
}

func (mb *MessageBuilder) Data(unserialized any) *MessageBuilder {
	d, err := json.Marshal(unserialized)
	if err != nil {
		mb.err = err

		return mb
	}

	if mb.baseMessage == nil {
		mb.baseMessage = &BaseMessage{}
	}

	mb.baseMessage.Data = d

	return mb
}

func (mb *MessageBuilder) ToBroadcast() *BroadcastBuilder {
	return &BroadcastBuilder{
		&BroadcastMessage{
			Message: *mb.baseMessage,
		},
		mb.err,
	}
}

func (mb *MessageBuilder) Build() (*BaseMessage, error) {
	return mb.baseMessage, mb.err
}

type BroadcastBuilder struct {
	broadcast *BroadcastMessage
	err       error
}

func NewBroadcast() *BroadcastBuilder {
	return &BroadcastBuilder{
		broadcast: &BroadcastMessage{
			Message: BaseMessage{
				Data: []byte{},
			},
		},
	}
}

func (bb *BroadcastBuilder) Event(event events.Event) *BroadcastBuilder {
	bb.broadcast.Message.Event = event

	return bb
}

func (bb *BroadcastBuilder) Data(unserialized any) *BroadcastBuilder {
	if bb == nil || bb.broadcast == nil {
		log.Println("BroadcastBuilder or Broadcast is nil")
		return bb
	}

	if bb.broadcast.Message.Data == nil {
		bb.broadcast.Message.Data = []byte{}
	}

	d, err := json.Marshal(unserialized)
	if err != nil {
		bb.err = err
		return bb
	}

	bb.broadcast.Message.Data = d

	return bb
}

func (bb *BroadcastBuilder) Condition(condition func(interface{}) bool) *BroadcastBuilder {
	bb.broadcast.Condition = condition

	return bb
}

func (bb *BroadcastBuilder) Build() (*BroadcastMessage, error) {
	return bb.broadcast, bb.err
}
