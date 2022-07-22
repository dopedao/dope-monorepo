import Citizen from 'game/entities/citizen/Citizen';
import EventHandler, { Events } from 'game/handlers/events/EventHandler';
import Item from 'game/entities/player/inventory/Item';
import ItemQuest from './ItemQuest';
import QuestManager from '../managers/QuestManager';
import Quest from './Quest';

export default class BringItemQuest extends ItemQuest {
  // if picked up item during quest "lifetime"
  // will not be true if the player has the item
  // before the quest's start
  private _hasItem: boolean = false;

  get hasItem() {
    return this._hasItem;
  }

  // override constructor to have questReferer not optional
  constructor(  
    name: string,
    description: string,
    item: Item,
    questManager: QuestManager,
    questReferer: Citizen,
    start?: (quest: Quest) => void,
    complete?: (quest: Quest) => void,
    isActive?: boolean,
  ) { super(name, description, item, questManager, questReferer, start, complete, isActive); };

  protected _handleItemEvent(item: Item) {
    if (item === this.item) {
      this._hasItem = true;
      // unsubscribe from event when item is picked up
      EventHandler.emitter().removeListener(
        Events.PLAYER_INVENTORY_ADD_ITEM,
        this._handleItemEvent,
      );
    }
  }

  private _handleCitizenEvent(citizen: Citizen, cancelled: boolean) {
    if (cancelled || citizen !== this.questReferer) return;

    // if has picked up item during quest "lifetime"
    if (this.hasItem) {
      // remove item from player inventory
      if (this.questManager.player.inventory.remove(this.item)) this.onComplete();
    }
  }

  onStart() {
    super.onStart();

    EventHandler.emitter().on(
      Events.PLAYER_CITIZEN_INTERACT_FINISH,
      this._handleCitizenEvent,
      this,
    );
  }

  onComplete() {
    super.onComplete();

    EventHandler.emitter().off(
      Events.PLAYER_CITIZEN_INTERACT_FINISH,
      this._handleCitizenEvent,
      this,
    );
  }
}
