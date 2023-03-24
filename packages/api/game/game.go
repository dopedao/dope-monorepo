package game

import (
	"context"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/game/dopemap"
	events "github.com/dopedao/dope-monorepo/packages/api/game/events"
	gameItem "github.com/dopedao/dope-monorepo/packages/api/game/item"
	messages "github.com/dopedao/dope-monorepo/packages/api/game/messages"
	p "github.com/dopedao/dope-monorepo/packages/api/game/player"
	utils "github.com/dopedao/dope-monorepo/packages/api/game/utils"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/gamehustler"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/gamehustlerrelation"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/wallet"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/internal/middleware"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

const (
	TICKRATE    = time.Second / 5
	MINUTES_DAY = 24 * 60
	BOT_COUNT   = 0
)

type Game struct {
	// current time
	// we wrap around {MINUTES_DAY}
	Time   float32
	Ticker *time.Ticker

	//Mutex sync.Mutex

	SpawnPosition schema.Position

	Players      []*p.Player
	ItemEntities []*gameItem.ItemEntity

	Register   chan *p.Player
	Unregister chan *p.Player
	Broadcast  chan messages.BroadcastMessage
}

type TickData struct {
	Time    float32            `json:"time"`
	Tick    int64              `json:"tick"`
	Players []p.PlayerMoveData `json:"players"`
}

type HandshakeData struct {
	Id         string  `json:"id"`
	CurrentMap string  `json:"current_map"`
	X          float32 `json:"x"`
	Y          float32 `json:"y"`
	// citizen: relation{}
	Relations json.RawMessage `json:"relations"`

	Players      []p.PlayerData            `json:"players"`
	ItemEntities []gameItem.ItemEntityData `json:"itemEntities"`
}

type PlayerJoinData struct {
	Name      string `json:"name"`
	HustlerId string `json:"hustlerId"`
}

func (g *Game) HandleGameMessages(ctx context.Context, client *ent.Client, conn *websocket.Conn) {
	ctx, log := logger.LogFor(ctx)
	log.Info().Msgf("New connection from %s", conn.RemoteAddr().String())

	WHITELISTED_WALLETS := []string{
		"0x7C02b7eeB44E32eDa9599a85B8B373b6D1f58BD4",
	}

	for {
		// ignore if player is already registered
		// when a player is registered, it uses its own read and write pumps
		if g.PlayerByConn(conn) != nil {
			continue
		}

		var msg messages.BaseMessage
		if err := conn.ReadJSON(&msg); err != nil {
			// facing a close error, we need to stop handling messages
			if _, ok := err.(*websocket.CloseError); ok {
				break
			}

			// we need to use writejson here
			// because player is not yet registered
			conn.WriteJSON(messages.GenerateErrorMessage(500, "could not read json"))
			continue
		}

		// messages from players are handled else where
		switch msg.Event {
		case events.PLAYER_JOIN:
			var data PlayerJoinData
			if err := json.Unmarshal(msg.Data, &data); err != nil {
				// we can directly use writejson here
				// because player is not yet registered
				conn.WriteJSON(messages.GenerateErrorMessage(500, "could not unmarshal player_join data"))
				continue
			}

			// check if authenticated wallet contains used hustler
			// and get data from db
			var gameHustler *ent.GameHustler = nil
			if data.HustlerId != "" {
				// 2 players cannot have the same hustler id
				if g.PlayerByHustlerID(data.HustlerId) != nil {
					conn.WriteJSON(messages.GenerateErrorMessage(409, "an instance of this hustler is already in the game"))
					continue
				}

				walletAddress, err := middleware.Wallet(ctx)
				if err != nil {
					conn.WriteJSON(messages.GenerateErrorMessage(http.StatusUnauthorized, "could not get wallet"))
					continue
				}

				associatedAddress, err := client.Wallet.Query().Where(wallet.HasHustlersWith(hustler.IDEQ(data.HustlerId))).OnlyID(ctx)
				if err != nil || associatedAddress != walletAddress {
					conn.WriteJSON(messages.GenerateErrorMessage(http.StatusUnauthorized, "could not get hustler"))
					continue
				}

				// check if wallet whitelisted for event
				whitelisted := false

				// whitelist if og, enable in case of events
				// hustlerId, _ := strconv.ParseInt(data.HustlerId, 10, 32)
				// whitelisted = hustlerId <= 500

				if !whitelisted {
					for _, addr := range WHITELISTED_WALLETS {
						if walletAddress == addr {
							whitelisted = true
							break
						}
					}
				}

				if !whitelisted {
					conn.WriteJSON(messages.GenerateErrorMessage(http.StatusUnauthorized, "not whitelisted"))
					continue
				}

				// get game hustler from hustler id
				gameHustler, err = client.GameHustler.Get(ctx, data.HustlerId)
				if err != nil {
					gameHustler, err = client.GameHustler.Create().
						SetID(data.HustlerId).
						// TODO: define spawn position constant
						SetLastPosition(g.SpawnPosition).
						Save(ctx)
					if err != nil {
						conn.WriteJSON(messages.GenerateErrorMessage(500, "could not create game hustler"))
						continue
					}
				}
			}

			g.HandlePlayerJoin(ctx, conn, client, gameHustler)
		}
	}
}

func (g *Game) Start(ctx context.Context, client *ent.Client) {
	_, log := logger.LogFor(ctx)

	log.Info().Msg("starting game")

	for {
		select {
		case t := <-g.Ticker.C:
			g.tick(ctx, t)
		case player := <-g.Register:
			g.Players = append(g.Players, player)

			go player.ReadPump(ctx, client)
			go player.WritePump(ctx)

			// handshake data, player ID & game state info
			message, err := messages.
				NewBaseMessage().
				Data(g.GenerateHandshakeData(ctx, client, player)).
				Event(events.PLAYER_HANDSHAKE).
				Build()
			if err != nil {
				player.Send <- messages.GenerateErrorMessage(500, "could not marshal handshake data")
				return
			}

			player.Send <- *message

			log.Info().Msgf("player joined: %s | %s", player.Id, player.Name)
		case player := <-g.Unregister:
			// save last position if player has a hustler
			if player.HustlerId != "" {
				gameHustler, err := client.GameHustler.Get(ctx, player.HustlerId)
				if err != nil {
					log.Err(err).Msgf("could not get game hustler: %s", player.HustlerId)
					return
				}

				// update last position
				if err := gameHustler.Update().SetLastPosition(schema.Position{
					CurrentMap: player.CurrentMap,
					X:          player.Position.X,
					Y:          player.Position.Y,
				}).Exec(ctx); err != nil {
					log.Err(err).Msgf("saving game hustler: %s", player.HustlerId)
					return
				}
			}

			for i, p := range g.Players {
				if p == player {
					g.Players = append(g.Players[:i], g.Players[i+1:]...)
					break
				}
			}

			log.Info().Msgf("player left: %s | %s", player.Id, player.Name)
		case br := <-g.Broadcast:
			for _, player := range g.Players {
				if (br.Condition != nil && !br.Condition(player)) || player.Conn == nil {
					continue
				}

				select {
				case player.Send <- br.Message:
				default:
					log.Info().Msgf("could not send message to player: %s | %s", player.Id, player.Name)
					message, _ := messages.
						NewBroadcast().
						Data(gameItem.IdData{
							Id: player.Id.String(),
						}).
						Event(events.PLAYER_LEAVE).
						Build()

					g.Unregister <- player
					g.Broadcast <- *message

					close(player.Send)
				}
			}
		}
	}
}

func NewGame() *Game {
	game := Game{
		Ticker: time.NewTicker(TICKRATE),
		SpawnPosition: schema.Position{
			X: 500, Y: 200,
			CurrentMap: dopemap.NY_BUSHWICK_BASKET,
		},
		Register:   make(chan *p.Player),
		Unregister: make(chan *p.Player),
		Broadcast:  make(chan messages.BroadcastMessage),
	}

	game.AddBots(BOT_COUNT)

	return &game
}

func (game *Game) AddBots(amount int) {
	for i := 0; i < amount; i++ {
		hustlerId := int(rand.Float64() * 1500)
		game.Players = append(game.Players, p.NewPlayer(nil, game.Broadcast, game.Unregister,
			strconv.Itoa(hustlerId), fmt.Sprintf("Bot #%d - %d", i, hustlerId),
			game.SpawnPosition.CurrentMap, game.SpawnPosition.X, game.SpawnPosition.Y, game.ItemEntities))
	}
}

func (g *Game) PlayerByConn(conn *websocket.Conn) *p.Player {
	for _, player := range g.Players {
		if player.Conn == conn {
			return player
		}
	}
	return nil
}

func (g *Game) tick(ctx context.Context, time time.Time) {
	_, log := logger.LogFor(ctx)

	// TODO: better way of doing this?
	if g.Time >= MINUTES_DAY {
		g.Time = 0
	}
	g.Time = (g.Time + 0.5)

	// update fake players positions
	boundaries := dopemap.Position{
		X: 2900,
		Y: 1500,
	}
	for _, player := range g.Players {
		if player.Conn != nil {
			continue
		}

		// <= 1/4 x and <= 2/4 y - negative
		// <= 3/4 x and <= 4/4 y - positive
		random := rand.Float32()
		player.LastPosition.X = player.Position.X
		player.LastPosition.Y = player.Position.Y
		if random <= 0.25 {
			player.Position.X = player.Position.X - (rand.Float32() * 100)
		} else if random <= 0.5 {
			player.Position.Y = player.Position.Y - (rand.Float32() * 100)
		} else if random <= 0.75 {
			player.Position.X = player.Position.X + (rand.Float32() * 100)
		} else {
			player.Position.Y = player.Position.Y + (rand.Float32() * 100)
		}

		if player.Position.X < 0 || player.Position.X > boundaries.X {
			player.Position.X = player.LastPosition.X
		}
		if player.Position.Y < 0 || player.Position.Y > boundaries.Y {
			player.Position.Y = player.LastPosition.Y
		}
	}

	// for each player, send a tick message
	for _, player := range g.Players {
		if player.Conn == nil {
			continue
		}

		players := []p.PlayerMoveData{}

		for _, otherPlayer := range g.Players {
			// var squaredDist = math.Pow(float64(otherPlayer.x-player.x), 2) + math.Pow(float64(otherPlayer.y-player.y), 2)
			if otherPlayer == player || otherPlayer.CurrentMap != player.CurrentMap ||
				(otherPlayer.Position.X == otherPlayer.LastPosition.X &&
					otherPlayer.Position.Y == otherPlayer.LastPosition.Y) {
				continue
			}

			players = append(players, p.PlayerMoveData{
				Id:        otherPlayer.Id.String(),
				X:         otherPlayer.Position.X,
				Y:         otherPlayer.Position.Y,
				Direction: otherPlayer.Direction,
			})
		}

		message, err := messages.NewBaseMessage().
			Data(TickData{
				Time:    g.Time,
				Tick:    utils.NowInUnixMillis(),
				Players: players,
			}).
			Event(events.TICK).
			Build()

		if err != nil {
			player.Send <- messages.GenerateErrorMessage(500, "could not marshal player move data")
			continue
		}

		select {
		case player.Send <- *message: // Fallthrough
		default:
			log.Info().Msgf("could not send message to player: %s | %s", player.Id, player.Name)

			message, _ := messages.NewBroadcast().
				Data(gameItem.IdData{
					Id: player.Id.String(),
				}).
				Event(events.PLAYER_LEAVE).
				Build()

			g.Unregister <- player
			g.Broadcast <- *message

			close(player.Send)
		}
	}
}

func (g *Game) PlayerByHustlerID(id string) *p.Player {
	for _, player := range g.Players {
		if player.HustlerId == id {
			return player
		}
	}
	return nil
}

func (g *Game) PlayerByUUID(uuid uuid.UUID) *p.Player {
	for _, player := range g.Players {
		if player.Id == uuid {
			return player
		}
	}
	return nil
}

func (g *Game) DispatchPlayerJoin(ctx context.Context, player *p.Player) {
	_, log := logger.LogFor(ctx)

	message, err := messages.NewBroadcast().
		Data(player.Serialize()).
		Event(events.PLAYER_JOIN).
		Condition(
			func(otherPlayer interface{}) bool {
				ptr, ok := otherPlayer.(*p.Player)
				if !ok {
					log.Error().Msg("Could not cast interface to Player type")
					return false
				}
				return player != ptr
			},
		).
		Build()

	if err != nil {
		log.Err(err).Msgf("could not marshal join data for player: %s | %s", player.Id, player.Name)
		return
	}

	// tell every other player that this player joined
	g.Broadcast <- *message
}

func (g *Game) HandlePlayerJoin(ctx context.Context, conn *websocket.Conn, client *ent.Client, gameHustler *ent.GameHustler) {
	_, log := logger.LogFor(ctx)
	// if data.CurrentMap == "" {
	// 	// we can directly use writejson here
	// 	// because player is not yet registered
	// 	conn.WriteJSON(generateErrorMessage(422, "current_map is not set"))
	// 	return
	// }

	var player *p.Player = nil
	if gameHustler != nil {
		hustler, err := client.Hustler.Get(ctx, gameHustler.ID)
		if err != nil {
			log.Err(err).Msgf("could not get hustler: %s", gameHustler.ID)
			conn.WriteJSON(messages.GenerateErrorMessage(500, "could not get hustler"))
			return
		}
		// query items and quests
		items, err := gameHustler.QueryItems().All(ctx)
		if err != nil {
			log.Err(err).Msgf("could not get items for hustler: %s", gameHustler.ID)
			conn.WriteJSON(messages.GenerateErrorMessage(500, "could not get items for hustler"))
			return
		}
		quests, err := gameHustler.QueryQuests().All(ctx)
		if err != nil {
			log.Err(err).Msgf("could not get quests for hustler: %s", gameHustler.ID)
			conn.WriteJSON(messages.GenerateErrorMessage(500, "could not get quests for hustler"))
			return
		}

		player = p.NewPlayer(conn, g.Broadcast, g.Unregister, gameHustler.ID, hustler.Name, gameHustler.LastPosition.CurrentMap, gameHustler.LastPosition.X, gameHustler.LastPosition.Y, g.ItemEntities)
		for _, item := range items {
			player.Items = append(player.Items, gameItem.Item{Item: item.Item})
		}
		for _, quest := range quests {
			player.Quests = append(player.Quests, p.Quest{Quest: quest.Quest, Completed: quest.Completed})
		}
	} else {
		player = p.NewPlayer(conn, g.Broadcast, g.Unregister, "", "Hustler", g.SpawnPosition.CurrentMap, g.SpawnPosition.X, g.SpawnPosition.Y, g.ItemEntities)
	}

	g.Register <- player
	g.DispatchPlayerJoin(ctx, player)
}

func (g *Game) DispatchPlayerLeave(ctx context.Context, player *p.Player) {
	message, err := messages.NewBroadcast().
		Data(gameItem.IdData{Id: player.Id.String()}).
		Event(events.PLAYER_LEAVE).
		Build()

	if err != nil {
		player.Send <- messages.GenerateErrorMessage(500, "could not marshal leave data")
		return
	}

	// tell every other player that this player left
	g.Broadcast <- *message
}

func (g *Game) GenerateHandshakeData(ctx context.Context, client *ent.Client, player *p.Player) HandshakeData {
	itemEntitiesData := g.GenerateItemEntitiesData()
	playersData := g.GeneratePlayersData()

	// remove this player from the players data
	for i, p := range playersData {
		if p.Id == player.Id.String() {
			playersData = append(playersData[:i], playersData[i+1:]...)
			break
		}
	}

	relations := map[string]p.Relation{}
	if player.HustlerId != "" {
		gameJustlerRelations, err := client.GameHustlerRelation.Query().Where(gamehustlerrelation.HasHustlerWith(gamehustler.IDEQ(player.HustlerId))).All(ctx)
		if err == nil {
			for _, relation := range gameJustlerRelations {
				// TODO: log error
				if err == nil {
					relations[relation.Citizen] = p.Relation{
						Citizen:      relation.Citizen,
						Conversation: relation.Conversation,
						Text:         relation.Text,
					}
				}

			}
		}
	}

	marshalledRelations, _ := json.Marshal(relations)
	return HandshakeData{
		Id:         player.Id.String(),
		CurrentMap: player.CurrentMap,
		X:          player.Position.X,
		Y:          player.Position.Y,
		Relations:  marshalledRelations,

		Players:      playersData,
		ItemEntities: itemEntitiesData,
	}
}

func (g *Game) GenerateItemEntitiesData() []gameItem.ItemEntityData {
	itemEntitiesData := []gameItem.ItemEntityData{}

	for _, itemEntity := range g.ItemEntities {
		itemEntitiesData = append(itemEntitiesData, itemEntity.Serialize())
	}

	return itemEntitiesData
}

func (g *Game) GeneratePlayersData() []p.PlayerData {
	playersData := []p.PlayerData{}

	for _, player := range g.Players {
		playersData = append(playersData, player.Serialize())
	}

	return playersData
}

// func (g *Game) DispatchPlayerMove(ctx context.Context, player *Player) {
// 	_, log := logger.LogFor(ctx)

// 	moveData, err := json.Marshal(PlayerMoveData{
// 		Id: player.Id.String(),
// 		X:  player.x,
// 		Y:  player.y,
// 	})
// 	if err != nil {
// 		log.Err(err).Msg("could not marshal move data")
// 		return
// 	}

// 	// tell every other player that this player moved
// 	for _, otherPlayer := range g.Players {
// 		if player.Id == otherPlayer.Id {
// 			continue
// 		}

// 		// player move message
// 		otherPlayer.conn.WriteJSON(BaseMessage{
// 			Event: "player_move",
// 			Data:  moveData,
// 		})
// 	}
// }

// func (g *Game) HandlePlayerMove(ctx context.Context, data PlayerMoveData) {
// 	g.players.mutex.Lock()
// 	defer g.players.mutex.Unlock()

// 	_, log := logger.LogFor(ctx)

// 	uuid, err := uuid.Parse(data.Id)
// 	if err != nil {
// 		log.Err(err).Msg("could not parse uuid: " + data.Id)
// 		return
// 	}

// 	for i, player := range g.Players {
// 		if player.Id == uuid {
// 			g.Players[i].x = data.X
// 			g.Players[i].y = data.Y
// 			g.DispatchPlayerMove(ctx, player)
// 			break
// 		}
// 	}
// }

// func (g *Game) HandleItemEntityCreate(ctx context.Context, data ItemEntityCreateData) {
// 	g.itemEntities.mutex.Lock()
// 	defer g.itemEntities.mutex.Unlock()

// 	_, log := logger.LogFor(ctx)

// 	g.itemEntities.data = append(g.itemEntities.data, &ItemEntity{
// 		id:   uuid.New(),
// 		item: data.Item,
// 		x:    data.X,
// 		y:    data.Y,
// 	})

// 	log.Info().Msgf("item entity created: %s | %s", g.itemEntities.data[len(g.itemEntities.data)-1].id, data.Item)

// 	marshaledData, err := json.Marshal(data)
// 	if err != nil {
// 		log.Err(err).Msg("could not marshal item entity create data")
// 		return
// 	}

// 	// dispatch to all players item entity creation
// 	for _, player := range g.Players {
// 		player.conn.WriteJSON(BaseMessage{
// 			Event: "item_entity_create",
// 			Data:  marshaledData,
// 		})
// 	}
// }

// func (g *Game) HandleItemEntityDestroy(ctx context.Context, data IdData) {
// 	g.itemEntities.mutex.Lock()
// 	defer g.itemEntities.mutex.Unlock()

// 	_, log := logger.LogFor(ctx)

// 	uuid, err := uuid.Parse(data.Id)
// 	if err != nil {
// 		log.Err(err).Msgf("could not parse uuid: %s", data.Id)
// 		return
// 	}

// 	for i, itemEntity := range g.itemEntities.data {
// 		if itemEntity.id == uuid {
// 			// remove item entity
// 			g.itemEntities.data = append(g.itemEntities.data[:i], g.itemEntities.data[i+1:]...)

// 			data, err := json.Marshal(IdData{Id: itemEntity.id.String()})
// 			if err != nil {
// 				log.Err(err).Msg("could not marshal item entity destroy data")
// 				break
// 			}
// 			// dispatch item entity destroy message to other players
// 			for _, player := range g.Players {
// 				player.conn.WriteJSON(BaseMessage{
// 					Event: "item_entity_destroy",
// 					Data:  data,
// 				})
// 			}
// 			break
// 		}
// 	}
// }
