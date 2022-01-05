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

    // swap items
    swap(item1: Item | number, item2: Item | number)
    {
        const item1Index = item1 instanceof Item ? this._items.indexOf(item1) : item1;
        const item2Index = item2 instanceof Item ? this._items.indexOf(item2) : item2;

        const temp = this._items[item1Index];
        this._items[item1Index] = this._items[item2Index];
        this._items[item2Index] = temp;
    }

    // add item
    add(item: Item)
    {
        const index = this._items.indexOf(undefined);
        if (index === -1)
            return;

        this._items[index] = item;
    }

    // remove item
    remove(item: Item)
    {
        const index = this._items.indexOf(item);
        if (index === -1)
            return;
        
        this._items[index] = undefined;
    }

    // check if inventory contains item
    contains(item: Item): boolean
    {
        return this._items.indexOf(item) !== -1;
    }

    // check if inventory is full
    isFull(): boolean
    {
        return this._items.indexOf(undefined) === -1;
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