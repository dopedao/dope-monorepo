import Citizen from "game/entities/citizen/Citizen";
import EventHandler, { Events } from "game/handlers/EventHandler";
import Item from "game/inventory/Item";
import ItemQuest from "./ItemQuest";

export default class BringItemQuest extends ItemQuest
{
    private _hasItem: boolean = false;

    get hasItem() { return this._hasItem; }

    protected _handleItemEvent(item: Item)
    {
        if (item === this.item)
        {
            this._hasItem = true;
            // unsubscribe from event when item is picked up
            EventHandler.emitter().removeListener(Events.PLAYER_INVENTORY_ADD_ITEM, this._handleItemEvent);
            // shift conversations
            this.questReferer.conversations.shift();
        }
    }

    private _handleCitizenEvent(citizen: Citizen)
    {
        if (citizen !== this.questReferer)
            return;
        
        this.onComplete();
    }

    onStart()
    {
        super.onStart();

        EventHandler.emitter().on(Events.PLAYER_CITIZEN_INTERACT_COMPLETE, this._handleCitizenEvent, this);
    }

    onComplete()
    {
        super.onComplete();

        // unsubscribe from events
        EventHandler.emitter().removeListener(Events.PLAYER_CITIZEN_INTERACT_COMPLETE, this._handleCitizenEvent);
    }
}