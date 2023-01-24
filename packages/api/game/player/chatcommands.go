package player

import (
	"encoding/json"
	"strings"

	events "github.com/dopedao/dope-monorepo/packages/api/game/events"
	messages "github.com/dopedao/dope-monorepo/packages/api/game/messages"
	"github.com/dopedao/dope-monorepo/packages/api/game/utils"
	"github.com/rs/zerolog"
)

// Chatcommand we receive from client
type ChatCommandData struct {
	Name string   `json:"name"`
	Args []string `json:"args"`
}

const (
	SETCOLOR = "setcolor"
)

var (
	allowedColors = [5]string{"blue", "white", "yellow", "gold", "green"}
)

func handlePlayerCommand(p *Player, msg json.RawMessage, log *zerolog.Logger) {
	var command ChatCommandData
	if err := json.Unmarshal(msg, &command); err != nil {
		messages.GenerateErrorMessage(500, "could not marshal command data")
		return
	}

	switch command.Name {
	case SETCOLOR:
		handleSetcolor(command.Args, p, log)
	default:
		log.Info().Msgf("player %s | tried running an unknown command: %s", p.Id, command.Name)
		var errorToast = messages.Toast{
			Status:  messages.ERROR,
			Message: command.Name + " is not a valid command.",
		}

		errorToastJson, err := json.Marshal(errorToast)
		if err != nil {
			p.Send <- messages.GenerateErrorMessage(500, "could not marshal invalid command error")
			return
		}

		p.Broadcast <- messages.BroadcastMessage{
			Message: messages.BaseMessage{
				Event: events.PLAYER_CHAT_COMMAND_RESULT,
				Data:  errorToastJson,
			},
			Condition: func(other interface{}) bool {
				ptr, ok := other.(*Player)
				if !ok {
					log.Error().Msg("Could not cast interface to Player type")
					return false
				}

				return p == ptr
			},
		}
	}
}

func handleSetcolor(args []string, p *Player, log *zerolog.Logger) {
	//do nothing when no args
	if len(args) <= 0 {
		return
	}

	colorArg := args[0]

	if !utils.Contains(allowedColors[:], colorArg) {
		log.Info().Msgf("player %s | tried using a forbidden color: %s", p.Id, colorArg)
		// Toast inputs we show the client ingame
		invalidArgErr := messages.Toast{
			Status:  messages.ERROR,
			Message: colorArg + " is not a valid color! Allowed colors are: [" + strings.Join(allowedColors[:], ", ") + "]",
		}

		invalidArgErrJson, err := json.Marshal(&invalidArgErr)
		if err != nil {
			p.Send <- messages.GenerateErrorMessage(500, "could not update chatcolor")
			return
		}

		p.Broadcast <- messages.BroadcastMessage{
			Message: messages.BaseMessage{
				Event: events.PLAYER_CHAT_COMMAND_RESULT,
				Data:  invalidArgErrJson,
			},
			// show toast only to the player that issued the command
			Condition: func(other interface{}) bool {
				ptr, ok := other.(*Player)
				if !ok {
					log.Error().Msg("Could not cast interface to Player type")
					return false
				}

				return p == ptr
			},
		}
		return
	}

	// store color in player struct for playing duration
	// maybe store in DB in the future ?
	log.Info().Msgf("player %s | updated color from %s to %s", p.Id, p.Chatcolor, colorArg)
	p.Chatcolor = colorArg

	clientData := messages.Toast{
		Status:  messages.SUCCESS,
		Message: "Chatcolor changed to: " + p.Chatcolor,
	}

	clientDataJson, err := json.Marshal(&clientData)
	if err != nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not update chatcolor")
		return
	}

	p.Broadcast <- messages.BroadcastMessage{
		Message: messages.BaseMessage{
			Event: events.PLAYER_CHAT_COMMAND_RESULT,
			Data:  clientDataJson,
		},
		Condition: func(other interface{}) bool {
			ptr, ok := other.(*Player)
			if !ok {
				log.Error().Msg("Could not cast interface to Player type")
				return false
			}

			return p == ptr
		},
	}
}
