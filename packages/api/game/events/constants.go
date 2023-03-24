package events

type Event string

const (
	PLAYER_JOIN                 Event = "player_join"
	PLAYER_LEAVE                Event = "player_leave"
	PLAYER_MOVE                 Event = "player_move"
	PLAYER_UPDATE_MAP           Event = "player_update_map"
	PLAYER_CHAT_MESSAGE         Event = "player_chat_message"
	PLAYER_PICKUP_ITEMENTITY    Event = "player_pickup_itementity"
	PLAYER_UPDATE_CITIZEN_STATE Event = "player_update_citizen_state"
	PLAYER_ADD_QUEST            Event = "player_add_quest"
	PLAYER_ADD_ITEM             Event = "player_add_item"
	PLAYER_HANDSHAKE            Event = "player_handshake"
	PLAYER_CHAT_COMMAND         Event = "player_chat_command"
	PLAYER_CHAT_COMMAND_RESULT  Event = "player_chat_command_result"
	TICK                        Event = "tick"
	ERROR                       Event = "error"
)
