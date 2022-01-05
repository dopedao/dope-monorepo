import EventHandler, { Events } from "game/handlers/EventHandler";
import Item from "./Item";

export default class Inventory 
{
    public static readonly MAX_ITEMS = 30;
    
    private _items: Array<Item | undefined> = new Array(Inventory.MAX_ITEMS);
    
    get items(): Array<Item | undefined> { return this._items; }

    constructor(items?: Array<Item>)
    {
        if (items)
            this._items = items;
    }

    // add item to inventory
    public addItem(item: Item)
    {
        for (let i = 0; i < this._items.length; i++)
        {
            if (!this._items[i])
            {
                this._items[i] = item;
                return;
            }
        }
    }

    // remove item by item type
    public removeItem(item: Item)
    {
        for (let i = 0; i < this._items.length; i++)
        {
            if (this._items[i] === item)
            {
                this._items[i] = undefined;
                return;
            }
        }
    }

    // remove item by index
    public removeItemAt(index: number)
    {
        this._items[index] = undefined;
    }

    public size(): number
    {
        return this._items.length;
    }
}