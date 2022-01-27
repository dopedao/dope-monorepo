enum NetworkEvents
{
    CONNECTED = "connected",
    DISCONNECTED = "disconnected",
    RECONNECTED = "reconnected",

    // Coming from server
    TICK = "tick",
    
    PLAYER_JOIN = "player_join",
    PLAYER_LEAVE = "player_leave",
    PLAYER_MOVE = "player_move",
    PLAYER_CHAT_MESSAGE = "player_chat_message",
}

// Data coming from server to client
interface ClientDataTypes
{
    [NetworkEvents.TICK]: {
        tick: bigint,
        players: Array<ClientDataTypes[NetworkEvents.PLAYER_MOVE]>,
    }
    [NetworkEvents.PLAYER_CHAT_MESSAGE]: {
        message: string
        // author id
        author: string
    },
    [NetworkEvents.PLAYER_JOIN]: {
        id: string,
        name: string,
        currentMap: string,
        x: number,
        y: number,
    },
    [NetworkEvents.PLAYER_LEAVE]: {
        id: string,
    },
    [NetworkEvents.PLAYER_MOVE]: {
        id: string,
        x: number,
        y: number,
    }
}

// What gets sent to the server
interface ServerDataTypes
{
    [NetworkEvents.PLAYER_JOIN]: {
        name: string,
        currentMap: string,
        x: number,
        y: number,
    },
    // no data is needed for leaving, only event
    [NetworkEvents.PLAYER_LEAVE]: null,
    [NetworkEvents.PLAYER_MOVE]: {
        x: number,
        y: number,
    },
    [NetworkEvents.PLAYER_CHAT_MESSAGE]: {
        message: string
    }
}

export { NetworkEvents, type ClientDataTypes };