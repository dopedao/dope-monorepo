import Citizen from "game/entities/citizen/Citizen";
import Hustler from "game/entities/Hustler";
import Item from "game/entities/player/inventory/Item";
import Quest from "game/entities/player/quests/Quest";

export enum Events
{
    // add events
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
    ITEM_ENTITY_DESTROYED = 'item_entity_destroyed',
}

export default class EventHandler
{
    private static _emitter: Phaser.Events.EventEmitter;

    constructor()
    {
        EventHandler._emitter = new Phaser.Events.EventEmitter();
        
        // handle events
        EventHandler._emitter.on(Events.PLAYER_INVENTORY_OPEN, () => this._log('Opened inventory'));
        EventHandler._emitter.on(Events.PLAYER_INVENTORY_CLOSE, () => this._log('Closed inventory'));
        EventHandler._emitter.on(Events.PLAYER_INVENTORY_ADD_ITEM, (item: Item, pickup?: boolean) => this._log(`Added item to inventory: ${item.name}
            picked up?: ${pickup ?? false}`));
        EventHandler._emitter.on(Events.PLAYER_INVENTORY_REMOVE_ITEM, (item: Item, drop?: boolean) => this._log(`Removed item from inventory: ${item.name}
            dropped?: ${drop ?? false}`));

        EventHandler._emitter.on(Events.PLAYER_ZONE_ENTER, () => this._log('Entered zone'));
        EventHandler._emitter.on(Events.PLAYER_ZONE_LEAVE, () => this._log('Left zone'));
        
        EventHandler._emitter.on(Events.PLAYER_CITIZEN_INTERACT, (citizen: Citizen) => this._log(`Started interaction with citizen: ${citizen.name}`));
        EventHandler._emitter.on(Events.PLAYER_CITIZEN_INTERACT_FINISH, (citizen: Citizen, cancelled: boolean) => this._log(`Finished interaction with citizen: ${citizen.name}
            cancelled?: ${cancelled}`));

        EventHandler._emitter.on(Events.PLAYER_QUEST_NEW, (quest: Quest) => this._log(`New quest: ${quest.name}`));
        EventHandler._emitter.on(Events.PLAYER_QUEST_START, (quest: Quest) => this._log(`Started quest: ${quest.name}`));
        EventHandler._emitter.on(Events.PLAYER_QUEST_COMPLETE, (quest: Quest) => this._log(`Completed quest: ${quest.name}`));
    
        EventHandler._emitter.on(Events.CHAT_MESSAGE, (hustler: Hustler, message: string) => this._log(`${hustler.name} says: ${message}`));
    }

    private _log(event: string, ...args: any[])
    {
        console.log(`%c[Event] ${event}`, ...args, "color: #349eeb;");
    }

    static emitter()
    {
        if (!EventHandler._emitter)
            new EventHandler();

        return EventHandler._emitter;
    }

}