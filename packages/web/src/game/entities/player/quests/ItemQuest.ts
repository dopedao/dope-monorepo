import Citizen from 'game/entities/citizen/Citizen';
import EventHandler, { Events } from 'game/handlers/events/EventHandler';
import Item from 'game/entities/player/inventory/Item';
import QuestManager from 'game/entities/player/managers/QuestManager';
import Quest from './Quest';

export default class ItemQuest extends Quest {
  protected _item: Item;

  get item() {
    return this._item;
  }

  constructor(  
    name: string,
    description: string,
    item: Item,
    questManager: QuestManager,
    questReferer?: Citizen,
    start?: () => void,
    complete?: () => void,
    isActive?: boolean,
  ) {
    super(name, description, questManager, questReferer, start, complete, isActive);

    this._item = item;
  }

  protected _handleItemEvent(item: Item) {
    if (item === this.item) this.questManager.completeQuest(this);
  }

  onStart() {
    super.onStart();

    EventHandler.emitter().on(Events.PLAYER_INVENTORY_ADD_ITEM, this._handleItemEvent, this);
  }

  onComplete() {
    super.onComplete();

    // unsubscribe from event when quest is completed
    EventHandler.emitter().removeListener(Events.PLAYER_INVENTORY_ADD_ITEM, this._handleItemEvent);
  }
}
