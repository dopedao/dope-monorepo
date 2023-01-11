package game

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"

	"github.com/dopedao/dope-monorepo/packages/api/game/dopemap"
	events "github.com/dopedao/dope-monorepo/packages/api/game/events"
	messages "github.com/dopedao/dope-monorepo/packages/api/game/messages"
	utils "github.com/dopedao/dope-monorepo/packages/api/game/utils"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/rs/zerolog"
)

type Player struct {
	conn *websocket.Conn
	game *Game

	Id           uuid.UUID
	hustlerId    string
	name         string
	currentMap   string
	direction    string
	position     dopemap.Position
	lastPosition dopemap.Position

	items  []Item
	quests []Quest

	// messages sent to player
	Send chan messages.BaseMessage
}

type BroadcastMessage struct {
	Message   messages.BaseMessage
	Condition func(p *Player) bool
}

type CitizenUpdateStateData struct {
	// citizen id
	Citizen string `json:"citizen"`
	// conversation id
	Conversation string `json:"conversation"`
	// text
	Text uint `json:"text"`
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

func NewPlayer(conn *websocket.Conn, game *Game, hustlerId string, name string, currentMap string, x float32, y float32) *Player {
	p := &Player{
		conn:         conn,
		game:         game,
		Id:           uuid.New(),
		hustlerId:    hustlerId,
		name:         name,
		currentMap:   currentMap,
		position:     dopemap.Position{X: x, Y: y},
		lastPosition: dopemap.Position{X: x, Y: y},

		// CHANNEL HAS TO BE BUFFERED
		Send: make(chan messages.BaseMessage, 256),
	}

	return p
}

func (p *Player) Move(x float32, y float32, direction string) {
	p.lastPosition.X = p.position.X
	p.lastPosition.Y = p.position.Y

	p.position.X = x
	p.position.Y = y
	p.direction = direction
}

func (p *Player) AddItem(ctx context.Context, client *ent.Client, item Item, pickup bool) error {
	if p.hustlerId == "" {
		return errors.New("player must have a hustler to pickup items")
	}
	if _, err := client.GameHustlerItem.Create().SetItem(item.item).SetHustlerID(p.hustlerId).Save(ctx); err != nil {
		return err
	}

	p.items = append(p.items, item)

	data, err := json.Marshal(PlayerAddItemClientData{
		Item:   item.item,
		Pickup: pickup,
	})
	if err != nil {
		return err
	}

	p.Send <- messages.BaseMessage{
		Event: events.PLAYER_ADD_ITEM,
		Data:  data,
	}

	return nil
}

func (p *Player) AddQuest(ctx context.Context, client *ent.Client, quest Quest) error {
	if p.hustlerId == "" {
		return errors.New("player must have a hustler to have quests")
	}
	if _, err := client.GameHustlerQuest.Create().SetQuest(quest.Quest).SetHustlerID(p.hustlerId).Save(ctx); err != nil {
		return err
	}

	p.quests = append(p.quests, quest)

	data, err := json.Marshal(PlayerAddQuestClientData{
		Quest: quest.Quest,
	})
	if err != nil {
		return err
	}

	p.Send <- messages.BaseMessage{
		Event: events.PLAYER_ADD_QUEST,
		Data:  data,
	}

	return nil
}

func (p *Player) Serialize() PlayerData {
	return PlayerData{
		Id:         p.Id.String(),
		HustlerId:  p.hustlerId,
		Name:       p.name,
		CurrentMap: p.currentMap,
		X:          p.position.X,
		Y:          p.position.Y,
	}
}

func (p *Player) readPump(ctx context.Context, client *ent.Client) {
	_, log := logger.LogFor(ctx)

	// this will take care of closing the channel
	// and broadcasting the leave event
	// when we break out of the func
	defer handlePlayerLeave(p)

	for {
		var msg messages.BaseMessage
		err := p.conn.ReadJSON(&msg)

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
		case events.PLAYER_LEAVE:
			return // see defer
		}
	}
}

func (p *Player) writePump(ctx context.Context) {
	for {
		select {
		case msg, ok := <-p.Send:
			// if channel is closed, stop writepump
			if !ok {
				return
			}

			p.conn.WriteJSON(msg)
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
	data, _ := json.Marshal(IdData{
		Id: p.Id.String(),
	})

	p.game.Unregister <- p
	p.game.Broadcast <- BroadcastMessage{
		Message: messages.BaseMessage{
			Event: events.PLAYER_LEAVE,
			Data:  data,
		},
	}
	// closing p.send will also stop the writepump
	close(p.Send)
}

func handlePlayerUpdateMap(p *Player, msg json.RawMessage, log *zerolog.Logger) {
	var data PlayerUpdateMapData
	if err := json.Unmarshal(msg, &data); err != nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not unmarshal map update data")
		return
	}

	p.currentMap = data.CurrentMap
	p.lastPosition.X = p.position.X
	p.lastPosition.Y = p.position.Y
	p.position.X = data.X
	p.position.Y = data.Y

	broadcastedData, err := json.Marshal(PlayerUpdateMapClientData{
		Id:         p.Id.String(),
		CurrentMap: data.CurrentMap,
		X:          data.X,
		Y:          data.Y,
	})
	if err != nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not marshal map update data")
		return
	}

	p.game.Broadcast <- BroadcastMessage{
		Message: messages.BaseMessage{
			Event: events.PLAYER_UPDATE_MAP,
			Data:  broadcastedData,
		},
		Condition: func(otherPlayer *Player) bool {
			return p != otherPlayer
		},
	}

	log.Info().Msgf("player %s | %s changed map: %s", p.Id, p.name, data.CurrentMap)
}

func handlePlayerChatMessage(p *Player, msg json.RawMessage, log *zerolog.Logger) {
	var data messages.ChatMessageData
	json.Unmarshal(msg, &data)

	// if message length is 0, no need
	// to broadcast it
	if len(data.Message) == 0 {
		return
	}

	broadcastedData, err := json.Marshal(messages.ChatMessageClientData{
		Message:   data.Message,
		Author:    p.Id.String(),
		Timestamp: utils.NowInUnixMillis(),
	})

	if err != nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not marshal chat message data")
		return
	}

	p.game.Broadcast <- BroadcastMessage{
		Message: messages.BaseMessage{
			Event: events.PLAYER_CHAT_MESSAGE,
			Data:  broadcastedData,
		},
	}

	log.Info().Msgf("player %s | %s sent chat message: %s", p.Id, p.name, data.Message)
}

func handlePlayerPickupItemEntity(p *Player, msg json.RawMessage, ctx context.Context, log *zerolog.Logger, client *ent.Client) {
	if p.hustlerId == "" {
		p.Send <- messages.GenerateErrorMessage(500, "must have a hustler to pickup items")
		return
	}

	var data IdData
	json.Unmarshal(msg, &data)

	// search for item entity and remove it + broadcast its removal to all players
	parsedId, err := uuid.Parse(data.Id)
	if err != nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not parse item entity id")
		return
	}

	itemEntity := p.game.ItemEntityByUUID(parsedId)
	if itemEntity == nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not find item entity")
		return
	}

	if !p.game.RemoveItemEntity(itemEntity) {
		p.Send <- messages.GenerateErrorMessage(500, "could not pickup item entity")
		return
	}

	if p.AddItem(ctx, client, itemEntity.item, true) != nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not add item to inventory")
	}

	log.Info().Msgf("player %s | %s picked up item entity: %s", p.Id, p.name, data.Id)
}

func handlePlayerUpdateCitizenState(p *Player, msg json.RawMessage, ctx context.Context, log *zerolog.Logger, client *ent.Client) {
	if p.hustlerId == "" {
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
	relation, err := client.GameHustlerRelation.Get(ctx, fmt.Sprintf("%s:%s", p.hustlerId, data.Citizen))
	if err != nil {
		// only proceed if error is of type not found, we'll create a new relation entry
		if _, ok := err.(*ent.NotFoundError); !ok {
			p.Send <- messages.GenerateErrorMessage(500, "could not get relation between hustler and citizen")
			return
		}

		if _, err := client.GameHustlerRelation.Create().
			SetID(fmt.Sprintf("%s:%s", p.hustlerId, data.Citizen)).
			SetCitizen(data.Citizen).
			SetHustlerID(p.hustlerId).
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
	log.Info().Msgf("player %s | %s updated citizen state: %s", p.Id, p.name, data.Citizen)
}
