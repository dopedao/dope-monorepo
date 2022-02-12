import EventHandler, { Events } from 'game/handlers/events/EventHandler';
import Item from './Item';

export default class Inventory {
  public static readonly MAX_ITEMS = 30;

  private _items: Array<Item | undefined> = new Array(Inventory.MAX_ITEMS);

  get items(): Array<Item | undefined> {
    return this._items;
  }

  constructor(items?: Array<Item>) {
    if (items) this._items = items;
  }

  // swap items
  swap(item1: Item | number, item2: Item | number) {
    const item1Index = item1 instanceof Item ? this._items.indexOf(item1) : item1;
    const item2Index = item2 instanceof Item ? this._items.indexOf(item2) : item2;

    const temp = this._items[item1Index];
    this._items[item1Index] = this._items[item2Index];
    this._items[item2Index] = temp;
  }

  // add item
  // return true if successful
  // if pickup true, means that the item has been added to inventory
  // via pickup
  add(item: Item, pickup?: boolean): boolean {
    for (let i = 0; i < Inventory.MAX_ITEMS; i++)
      if (!this._items[i]) {
        this._items[i] = item;
        EventHandler.emitter().emit(Events.PLAYER_INVENTORY_ADD_ITEM, item, pickup);
        return true;
      }
    return false;
  }

  // remove item
  // return true if successful
  // if drop true, spawn the item gameobject in the world
  remove(item: Item | number, drop?: boolean): boolean {
    const index = item instanceof Item ? this._items.indexOf(item) : item;
    if (index === -1 || index >= this._items.length) return false;

    EventHandler.emitter().emit(Events.PLAYER_INVENTORY_REMOVE_ITEM, this._items[index], drop);
    this._items[index] = undefined;
    return true;
  }

  // check if inventory contains item
  contains(item: Item): boolean {
    return this._items.indexOf(item) !== -1;
  }

  // check if inventory is full
  isFull(): boolean {
    return this._items.indexOf(undefined) === -1;
  }

  size(): number {
    return this._items.length;
  }
}
