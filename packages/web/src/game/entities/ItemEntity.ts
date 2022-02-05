import EventHandler, { Events } from 'game/handlers/EventHandler';
import Item from 'game/inventory/Item';
import Player from './player/Player';

// Item entity class for items on ground
export default class ItemEntity extends Phaser.Physics.Matter.Sprite {
  private _item: Item;

  private onPickupCallback?: (item: Item) => void;

  get item(): Item {
    return this._item;
  }

  constructor(
    world: Phaser.Physics.Matter.World,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    item: Item,
    onPickupCallback?: (item: Item) => void,
  ) {
    super(world, x, y, texture);

    this._item = item;
    this.onPickupCallback = onPickupCallback;

    this.setBody(
      {
        type: 'rectangle',
        width: this.width,
        height: this.height,
      },
      {
        isStatic: true,
        isSensor: true,
      },
    );

    this.setDepth(0);
  }

  onPickup() {
    // destroy gameobject, since item has been picked up
    this.destroy();

    if (this.onPickupCallback) this.onPickupCallback(this.item);
  }
}
