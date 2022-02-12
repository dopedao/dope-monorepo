enum UniversalEventNames {
  PLAYER_JOIN = 'player_join',
  PLAYER_LEAVE = 'player_leave',
  PLAYER_MOVE = 'player_move',
  PLAYER_CHAT_MESSAGE = 'player_chat_message',
  PLAYER_UPDATE_MAP = 'player_update_map',
  PLAYER_PICKUP_ITEMENTITY = 'player_pickup_itementity',
}

enum NetworkEvents {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  RECONNECTED = 'reconnected',

  // Coming from server
  TICK = 'tick',
  ERROR = 'error',
  PLAYER_HANDSHAKE = 'player_handshake',

  SERVER_PLAYER_JOIN = 'server_player_join',
  SERVER_PLAYER_LEAVE = 'server_player_leave',
  SERVER_PLAYER_MOVE = 'server_player_move',
  SERVER_PLAYER_CHAT_MESSAGE = 'server_player_chat_message',
  SERVER_PLAYER_UPDATE_MAP = 'server_player_update_map',

  // From client to server
  CLIENT_PLAYER_JOIN = 'client_player_join',
  CLIENT_PLAYER_LEAVE = 'client_player_leave',
  CLIENT_PLAYER_MOVE = 'client_player_move',
  CLIENT_PLAYER_CHAT_MESSAGE = 'client_player_chat_message',
  CLIENT_PLAYER_UPDATE_MAP = 'client_player_update_map',
  CLIENT_PLAYER_PICKUP_ITEMENTITY = 'client_player_pickup_itementity',
}

interface DataTypes {
  // Data coming from server
  [NetworkEvents.TICK]: {
    tick: bigint;
    players: Array<DataTypes[NetworkEvents.SERVER_PLAYER_MOVE]>;
  };
  [NetworkEvents.ERROR]: {
    code: number;
    message: string;
  };
  [NetworkEvents.PLAYER_HANDSHAKE]: {
    id: string;
    players: Array<DataTypes[NetworkEvents.SERVER_PLAYER_JOIN]>;
    itemEntities: Array<{
      id: string;
      item: string;
      x: number;
      y: number;
    }>;
  };
  [NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE]: {
    message: string;
    // author id
    author: string;
  };
  [NetworkEvents.SERVER_PLAYER_JOIN]: {
    id: string;
    hustlerId: string;
    name: string;
    current_map: string;
    x: number;
    y: number;
  };
  [NetworkEvents.SERVER_PLAYER_LEAVE]: {
    id: string;
  };
  [NetworkEvents.SERVER_PLAYER_MOVE]: {
    id: string;
    x: number;
    y: number;
    direction: string;
  };
  [NetworkEvents.SERVER_PLAYER_UPDATE_MAP]: {
    id: string;
    current_map: string;
    x: number;
    y: number;
  };

  // From client to server
  [NetworkEvents.CLIENT_PLAYER_JOIN]: {
    name: string;
    hustlerId: string;
    current_map: string;
    x: number;
    y: number;
  };
  // no data is needed for leaving, only event
  [NetworkEvents.CLIENT_PLAYER_LEAVE]: null;
  [NetworkEvents.CLIENT_PLAYER_MOVE]: {
    x: number;
    y: number;
    direction: string;
  };
  [NetworkEvents.CLIENT_PLAYER_CHAT_MESSAGE]: {
    message: string;
  };
  [NetworkEvents.CLIENT_PLAYER_UPDATE_MAP]: {
    current_map: string;
    x: number;
    y: number;
  };
  [NetworkEvents.CLIENT_PLAYER_PICKUP_ITEMENTITY]: {
    id: string;
  };
}

export { UniversalEventNames, NetworkEvents };
export type { DataTypes };
