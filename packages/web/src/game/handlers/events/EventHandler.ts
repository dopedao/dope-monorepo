export enum Events {
  SHOW_NOTIFICAION = 'show_notification',

  PLAYER_INVENTORY_OPEN = 'player_open_inventory',
  PLAYER_INVENTORY_CLOSE = 'player_close_inventory',
  PLAYER_INVENTORY_ADD_ITEM = 'player_add_item_inventory',
  PLAYER_INVENTORY_REMOVE_ITEM = 'player_remove_item_inventory',

  PLAYER_ZONE_ENTER = 'player_enter_zone',
  PLAYER_ZONE_LEAVE = 'player_leave_zone',

  PLAYER_CITIZEN_INTERACT = 'player_interact_npc',
  PLAYER_CITIZEN_INTERACT_FINISH = 'player_interact_npc_finish',

  PLAYER_QUEST_NEW = 'player_new_quest',
  PLAYER_QUEST_START = 'player_start_quest',
  PLAYER_QUEST_COMPLETE = 'player_complete_quest',

  CHAT_MESSAGE = 'chat_message',
  CHAT_COMMAND_RESULT = "chat_command_result",

  ITEM_ENTITY_DESTROYED = 'item_entity_destroyed',
}

export default class EventHandler {
  private static _emitter: Phaser.Events.EventEmitter;

  constructor() {
    EventHandler._emitter = new Phaser.Events.EventEmitter();
  }

  static emitter() {
    if (!EventHandler._emitter) new EventHandler();

    return EventHandler._emitter;
  }
}
