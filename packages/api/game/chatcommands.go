package game

import (
	"encoding/json"
	"strings"

	events "github.com/dopedao/dope-monorepo/packages/api/game/events"
	messages "github.com/dopedao/dope-monorepo/packages/api/game/messages"
	status "github.com/dopedao/dope-monorepo/packages/api/game/status"
	"github.com/rs/zerolog"
)

const (
	SETCOLOR = "setcolor"
)

var (
	allowedColors = [5]string{"blue", "white", "yellow", "gold", "green"}
)

func handlePlayerCommand(p *Player, msg json.RawMessage, log *zerolog.Logger) {
	var command messages.ChatCommandData
	if err := json.Unmarshal(msg, &command); err != nil {
		messages.GenerateErrorMessage(500, "could not marshal command data")
		return
	}

	switch command.Name {
	case SETCOLOR:
		handleSetcolor(command.Args, p, log)
	default:
		log.Info().Msgf("player %s | tried running an unknown command: %s", p.Id, command.Name)
		var errorToast = messages.ChatCommandClientData{
			Status:  status.ERROR,
			Message: command.Name + " is not a valid command.",
		}

		errorToastJson, err := json.Marshal(errorToast)
		if err != nil {
			messages.GenerateErrorMessage(500, "could not marshal invalid command error")
		}

		p.game.Broadcast <- BroadcastMessage{
			Message: messages.BaseMessage{
				Event: events.PLAYER_CHAT_COMMAND_RESULT,
				Data:  errorToastJson,
			},
			Condition: func(other *Player) bool {
				return p == other
			},
		}
	}
}

func handleSetcolor(args []string, p *Player, log *zerolog.Logger) {
	colorArg := args[0]

	if !contains(allowedColors[:], colorArg) {
		log.Info().Msgf("player %s | tried using a forbidden color: %s", p.Id, colorArg)
		// Toast inputs we show the client ingame
		invalidArgErr := messages.ChatCommandClientData{
			Status:  status.ERROR,
			Message: colorArg + " is not a valid color! Allowed colors are: [" + strings.Join(allowedColors[:], ", ") + "]",
		}

		invalidArgErrJson, err := json.Marshal(&invalidArgErr)
		if err != nil {
			p.Send <- messages.GenerateErrorMessage(500, "could not update chatcolor")
			return
		}

		p.game.Broadcast <- BroadcastMessage{
			Message: messages.BaseMessage{
				Event: events.PLAYER_CHAT_COMMAND_RESULT,
				Data:  invalidArgErrJson,
			},
			// show toast only player that issued the command
			Condition: func(other *Player) bool {
				return p == other
			},
		}
		return
	}

	// store color in player struct for playing duration
	// maybe store in DB in the future ?
	log.Info().Msgf("player %s | updated color from %s to %s", p.Id, p.Chatcolor, colorArg)
	p.Chatcolor = colorArg

	clientData := messages.ChatCommandClientData{
		Status:  status.SUCCESS,
		Message: "Chatcolor changed to: " + p.Chatcolor,
	}

	clientDataJson, err := json.Marshal(&clientData)
	if err != nil {
		p.Send <- messages.GenerateErrorMessage(500, "could not update chatcolor")
		return
	}

	p.game.Broadcast <- BroadcastMessage{
		Message: messages.BaseMessage{
			Event: events.PLAYER_CHAT_COMMAND_RESULT,
			Data:  clientDataJson,
		},
		Condition: func(other *Player) bool {
			return p == other
		},
	}
}

func contains(haystack []string, needle string) bool {
	for i := range haystack {
		if haystack[i] == needle {
			return true
		}
	}

	return false
}
