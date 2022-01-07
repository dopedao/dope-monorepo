import EventHandler, { Events } from "game/handlers/EventHandler";
import Item from "game/inventory/Item";

// Item entity class for items on ground
export default class ItemEntity extends Phaser.Physics.Matter.Sprite
{
    private _item: Item;

    public onPickupCallback?: (item: Item) => void;

    get item(): Item { return this._item; }

    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, texture: string | Phaser.Textures.Texture, item: Item, onPickupCallback?: (item: Item) => void)
    {
        super(world, x, y, texture);

        this._item = item;
        this.onPickupCallback = this.onPickupCallback;

        this.setBody({
            type: 'rectangle',
            width: this.width,
            height: this.height,
        }, {
            isStatic: true,
            isSensor: true
        });
    }

    onPickup()
    {
        // destroy gameobject, since item has been picked up
        this.destroy();

        if (this.onPickupCallback)
            this.onPickupCallback(this.item);
    }
}