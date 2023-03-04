package player

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"

	"github.com/dopedao/dope-monorepo/packages/api/game/dopemap"
	events "github.com/dopedao/dope-monorepo/packages/api/game/events"
	item "github.com/dopedao/dope-monorepo/packages/api/game/item"
	messages "github.com/dopedao/dope-monorepo/packages/api/game/messages"
	utils "github.com/dopedao/dope-monorepo/packages/api/game/utils"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/rs/zerolog"
)

type Player struct {
	Conn         *websocket.Conn
	Id           uuid.UUID
	HustlerId    string
	Name         string
	CurrentMap   string
	Direction    string
	Position     dopemap.Position
	LastPosition dopemap.Position

	GameItems []*item.ItemEntity

	Chatcolor string

	Items  []item.Item
	Quests []Quest

	// messages sent to player
	Send chan messages.BaseMessage

	// messages broadcasted to the game server
	Unregister chan *Player
	Broadcast  chan messages.BroadcastMessage
}

// The parsed chat message that gets sent out
type ChatMessageClientData struct {
	Message   string `json:"message"`
	Author    string `json:"author"`
	Timestamp int64  `json:"timestamp"`
	Color     string `json:"color"`
}

type CitizenUpdateStateData struct {
	// citizen id
	Citizen string `json:"citizen"`
	// conversation id
	Conversation string `json:"conversation"`
	// text
	Text uint `json:"text"`
}

// received from client
type PlayerUpdateMapData struct {
	CurrentMap string  `json:"current_map"`
	X          float32 `json:"x"`
	Y          float32 `json:"y"`
}

// gets sent out to every other player
type PlayerUpdateMapClientData struct {
	Id         string  `json:"id"`
	CurrentMap string  `json:"current_map"`
	X          float32 `json:"x"`
	Y          float32 `json:"y"`
}

type PlayerAddItemClientData struct {
	Item   string `json:"item"`
	Pickup bool   `json:"pickup"`
}

type PlayerAddQuestClientData struct {
	Quest string `json:"quest"`
}

type PlayerData struct {
	Id         string  `json:"id"`
	HustlerId  string  `json:"hustlerId"`
	Name       string  `json:"name"`
	CurrentMap string  `json:"current_map"`
	X          float32 `json:"x"`
	Y          float32 `json:"y"`
}

// received from client, updates current pos
type PlayerMoveData struct {
	Id        string  `json:"id"`
	X         float32 `json:"x"`
	Y         float32 `json:"y"`
	Direction string  `json:"direction"`
}

type Quest struct {
	Quest     string `json:"quest"`
	Completed bool   `json:"completed"`
}

type Relation struct {
	Citizen      string `json:"citizen"`
	Conversation string `json:"conversation"`
	Text         uint   `json:"text"`
}

// Chatmessage we receive from clients
type ChatMessageData struct {
	Message string `json:"message"`
	Color   string `json:"color"`
}

func NewPlayer(conn *websocket.Conn, broadcast chan messages.BroadcastMessage, unregister chan *Player, hustlerId string, name string, currentMap string, x float32, y float32, items []*item.ItemEntity) *Player {
	p := &Player{
		Conn:      conn,
		Id:        uuid.New(),
		HustlerId: hustlerId,
		Name:      name,
		Chatcolor: "white",

		GameItems: items,

		CurrentMap:   currentMap,
		Position:     dopemap.Position{X: x, Y: y},
		LastPosition: dopemap.Position{X: x, Y: y},

		// CHANNEL HAS TO BE BUFFERED
		Send:       make(chan messages.BaseMessage, 256),
		Broadcast:  broadcast,
		Unregister: unregister,
	}

	return p
}

func (p *Player) Move(x float32, y float32, direction string) {
	p.LastPosition.X = p.Position.X
	p.LastPosition.Y = p.Position.Y

	p.Position.X = x
	p.Position.Y = y
	p.Direction = direction
}

func (p *Player) AddItem(ctx context.Context, client *ent.Client, gameItem item.Item, pickup bool) error {
	if p.HustlerId == "" {
		return errors.New("player must have a hustler to pickup items")
	}
	if _, err := client.GameHustlerItem.Create().SetItem(gameItem.Item).SetHustlerID(p.HustlerId).Save(ctx); err != nil {
		return err
	}

	p.Items = append(p.Items, gameItem)

	message, err := messages.
		NewBaseMessage().
		Data(PlayerAddItemClientData{
			Item:   gameItem.Item,
			Pickup: pickup,
		}).
		Event(events.PLAYER_ADD_ITEM).
		Build()

	if err != nil {
		return err
	}

	p.Send <- *message

	return nil
}

func (p *Player) AddQuest(ctx context.Context, client *ent.Client, quest Quest) error {
	if p.HustlerId == "" {
		return errors.New("player must have a hustler to have quests")
	}
	if _, err := client.GameHustlerQuest.Create().SetQuest(quest.Quest).SetHustlerID(p.HustlerId).Save(ctx); err != nil {
		return err
	}

	p.Quests = append(p.Quests, quest)

	message, err := messages.
		NewBaseMessage().
		Data(PlayerAddQuestClientData{
			Quest: quest.Quest,
		}).
		Event(events.PLAYER_ADD_QUEST).
		Build()

	if err != nil {
		return err
	}

	p.Send <- *message

	return nil
}

func (p *Player) Serialize() PlayerData {
	return PlayerData{
		Id:         p.Id.String(),
		HustlerId:  p.HustlerId,
		Name:       p.Name,
		CurrentMap: p.CurrentMap,
		X:          p.Position.X,
		Y:          p.Position.Y,
	}
}

func (p *Player) ReadPump(ctx context.Context, client *ent.Client) {
	_, log := logger.LogFor(ctx)

	// this will take care of closing the channel
	// and broadcasting the leave event
	// when we break out of the func
	defer handlePlayerLeave(p)

	for {
		var msg messages.BaseMessage
		err := p.Conn.ReadJSON(&msg)

		if err != nil {
			break
		}

		// maybe refactor into a dict<event, func>
		// and loop through it
		switch msg.Event {
		case events.PLAYER_MOVE:
			handlePlayerMove(p, msg.Data)
		case events.PLAYER_UPDATE_MAP:
			handlePlayerUpdateMap(p, msg.Data, &log)
		case events.PLAYER_CHAT_MESSAGE:
			handlePlayerChatMessage(p, msg.Data, &log)
		case events.PLAYER_PICKUP_ITEMENTITY:
			handlePlayerPickupItemEntity(p, msg.Data, ctx, &log, client)
		case events.PLAYER_UPDATE_CITIZEN_STATE:
			handlePlayerUpdateCitizenState(p, msg.Data, ctx, &log, client)
		case events.PLAYER_CHAT_COMMAND:
			handlePlayerCommand(p, msg.Data, &log)
		case events.PLAYER_LEAVE:
			return // see defer
		}
	}
}

func (p *Player) WritePump(ctx context.Context) {
	for {
		select {
		case msg, ok := <-p.Send:
			// if channel is closed, stop writepump
			if !ok {
				return
			}

			p.Conn.WriteJSON(msg)
		}
	}
}

func handlePlayerMove(p *Player, msg json.RawMessage) {
	var data PlayerMoveData

	if err := json.Unmarshal(msg, &data); err != nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not unmarshal player move data")
		return
	}

	p.Move(data.X, data.Y, data.Direction)
}

func handlePlayerLeave(p *Player) {
	message, _ := messages.
		NewBroadcast().
		Data(item.IdData{
			Id: p.Id.String(),
		}).
		Event(events.PLAYER_LEAVE).
		Build()

	p.Unregister <- p
	p.Broadcast <- *message
	// closing p.send will also stop the writepump
	close(p.Send)
}

func handlePlayerUpdateMap(p *Player, msg json.RawMessage, log *zerolog.Logger) {
	var data PlayerUpdateMapData
	if err := json.Unmarshal(msg, &data); err != nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not unmarshal map update data")
		return
	}

	p.CurrentMap = data.CurrentMap
	p.LastPosition.X = p.Position.X
	p.LastPosition.Y = p.Position.Y
	p.Position.X = data.X
	p.Position.Y = data.Y

	message, err := messages.
		NewBroadcast().
		Data(PlayerUpdateMapClientData{
			Id:         p.Id.String(),
			CurrentMap: data.CurrentMap,
			X:          data.X,
			Y:          data.Y,
		}).
		Event(events.PLAYER_UPDATE_MAP).
		Condition(
			func(otherPlayer interface{}) bool {
				ptr, ok := otherPlayer.(*Player)
				if !ok {
					log.Error().Msg("Could not cast interface to Player type")
					return false
				}

				return p != ptr
			},
		).
		Build()

	if err != nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not marshal map update data")
		return
	}

	p.Broadcast <- *message

	log.Info().Msgf("player %s | %s changed map: %s", p.Id, p.Name, data.CurrentMap)
}

func handlePlayerChatMessage(p *Player, msg json.RawMessage, log *zerolog.Logger) {
	var data ChatMessageData
	json.Unmarshal(msg, &data)

	// if message length is 0, no need
	// to broadcast it
	if len(data.Message) == 0 {
		return
	}

	message, err := messages.
		NewBroadcast().
		Data(ChatMessageClientData{
			Message:   data.Message,
			Author:    p.Id.String(),
			Timestamp: utils.NowInUnixMillis(),
			Color:     p.Chatcolor,
		}).
		Event(events.PLAYER_CHAT_MESSAGE).
		Build()

	if err != nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not marshal chat message data")
		return
	}

	p.Broadcast <- *message

	log.Info().Msgf("player %s | %s sent chat message: %s", p.Id, p.Name, data.Message)
}

func handlePlayerPickupItemEntity(p *Player, msg json.RawMessage, ctx context.Context, log *zerolog.Logger, client *ent.Client) {
	if p.HustlerId == "" {
		p.Send <- messages.GenerateErrorMessage(500, "must have a hustler to pickup items")
		return
	}

	var data item.IdData
	json.Unmarshal(msg, &data)

	// search for item entity and remove it + broadcast its removal to all players
	parsedId, err := uuid.Parse(data.Id)
	if err != nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not parse item entity id")
		return
	}

	itemEntity := item.GetItemEntityByUUID(p.GameItems, parsedId)
	if itemEntity == nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not find item entity")
		return
	}

	if !RemoveItemEntity(&p.GameItems, itemEntity, p.Broadcast) {
		p.Send <- messages.GenerateErrorMessage(500, "could not pickup item entity")
		return
	}

	if p.AddItem(ctx, client, itemEntity.Item, true) != nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not add item to inventory")
	}

	log.Info().Msgf("player %s | %s picked up item entity: %s", p.Id, p.Name, data.Id)
}

func handlePlayerUpdateCitizenState(p *Player, msg json.RawMessage, ctx context.Context, log *zerolog.Logger, client *ent.Client) {
	if p.HustlerId == "" {
		p.Send <- messages.GenerateErrorMessage(500, "must have a hustler to update citizen state")
		return
	}

	var data CitizenUpdateStateData
	if err := json.Unmarshal(msg, &data); err != nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not unmarshal citizen update state data")
		return
	}

	// TODO: update citizen state in db player data
	// check citizen in registry with corresponding id, conversation and text index
	// for item/quest to add
	relation, err := client.GameHustlerRelation.Get(ctx, fmt.Sprintf("%s:%s", p.HustlerId, data.Citizen))
	if err != nil {
		// only proceed if error is of type not found, we'll create a new relation entry
		if _, ok := err.(*ent.NotFoundError); !ok {
			p.Send <- messages.GenerateErrorMessage(500, "could not get relation between hustler and citizen")
			return
		}

		if _, err := client.GameHustlerRelation.Create().
			SetID(fmt.Sprintf("%s:%s", p.HustlerId, data.Citizen)).
			SetCitizen(data.Citizen).
			SetHustlerID(p.HustlerId).
			SetConversation(data.Conversation).
			SetText(data.Text).
			Save(ctx); err != nil {
			p.Send <- messages.GenerateErrorMessage(500, "could not create hustler citizen relation")
		}
		return
	}

	if _, err = relation.Update().
		SetConversation(data.Conversation).
		SetText(data.Text).
		Save(ctx); err != nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not update relation state")
		return
	}
	log.Info().Msgf("player %s | %s updated citizen state: %s", p.Id, p.Name, data.Citizen)
}

// should really be in the items package but no idea how to break up item <> player-channel

func RemoveItemEntity(itemEntities *[]*item.ItemEntity, itemEntity *item.ItemEntity, broadcastChan chan messages.BroadcastMessage) bool {
	removed := false

	for i := 0; i < len(*itemEntities); i++ {
		if *(*itemEntities)[i] == *itemEntity {
			*itemEntities = append((*itemEntities)[:i], (*itemEntities)[i+1:]...)
			removed = true

			message, err := messages.
				NewBroadcast().
				Data(item.IdData{Id: itemEntity.Id.String()}).
				Data(events.PLAYER_PICKUP_ITEMENTITY).
				Build()

			if err != nil {
				// TODO: print error message
				break
			}

			broadcastChan <- *message

			break
		}
	}

	return removed
}
