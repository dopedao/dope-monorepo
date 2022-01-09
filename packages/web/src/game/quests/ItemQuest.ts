import EventHandler, { Events } from "game/handlers/EventHandler";
import Item from "game/inventory/Item";
import QuestManager from "game/managers/QuestManager";
import { compareByMostAffordable } from "utils/DopeDatabase";
import Quest from "./Quest";

export default class ItemQuest extends Quest
{
    private _item: Item;
        
    get item() { return this._item; }

    constructor(questManager: QuestManager, item: Item, name: string, description: string, start?: () => void, complete?: () => void, isActive?: boolean) {
        super(questManager, name, description, start, complete, isActive);

        this._item = item;
    }

    private _handleItemEvent(item: Item)
    {
        if (item === this.item)
            this.questManager.completeQuest(this);
    }

    onStart() 
    {
        super.onStart();

        EventHandler.emitter().on(Events.PLAYER_INVENTORY_ADD_ITEM, this._handleItemEvent, this);
    }

    onComplete()
    {
        super.onComplete();

        // unsubscribe from event when quest is completed
        EventHandler.emitter().removeListener(Events.PLAYER_INVENTORY_ADD_ITEM, this._handleItemEvent);
    }
} 