enum UniversalEventNames
{
    PLAYER_JOIN = 'player_join',
    PLAYER_LEAVE = 'player_leave',
    PLAYER_MOVE = 'player_move',
    PLAYER_CHAT_MESSAGE = 'player_chat_message',
}

enum NetworkEvents
{
    CONNECTED = "connected",
    DISCONNECTED = "disconnected",
    RECONNECTED = "reconnected",

    // Coming from server
    TICK = "tick",
    
    SERVER_PLAYER_JOIN = "server_player_join",
    SERVER_PLAYER_LEAVE = "server_player_leave",
    SERVER_PLAYER_MOVE = "server_player_move",
    SERVER_PLAYER_CHAT_MESSAGE = "server_player_chat_message",

    // From client to server
    CLIENT_PLAYER_JOIN = "client_player_join",
    CLIENT_PLAYER_LEAVE = "client_player_leave",
    CLIENT_PLAYER_MOVE = "client_player_move",
    CLIENT_PLAYER_CHAT_MESSAGE = "client_player_chat_message",

}

interface DataTypes
{
    // Data coming from server
    [NetworkEvents.TICK]: {
        tick: bigint,
        players: Array<DataTypes[NetworkEvents.SERVER_PLAYER_MOVE]>,
    }
    [NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE]: {
        message: string
        // author id
        author: string
    },
    [NetworkEvents.SERVER_PLAYER_JOIN]: {
        id: string,
        name: string,
        currentMap: string,
        x: number,
        y: number,
    },
    [NetworkEvents.SERVER_PLAYER_LEAVE]: {
        id: string,
    },
    [NetworkEvents.SERVER_PLAYER_MOVE]: {
        id: string,
        x: number,
        y: number,
    },

    // From client to server
    [NetworkEvents.CLIENT_PLAYER_JOIN]: {
        name: string,
        currentMap: string,
        x: number,
        y: number,
    },
    // no data is needed for leaving, only event
    [NetworkEvents.CLIENT_PLAYER_LEAVE]: null,
    [NetworkEvents.CLIENT_PLAYER_MOVE]: {
        x: number,
        y: number,
    },
    [NetworkEvents.CLIENT_PLAYER_CHAT_MESSAGE]: {
        message: string
    }
}

export { UniversalEventNames, NetworkEvents, type DataTypes };