import { DataTypes, NetworkEvents, UniversalEventNames } from 'game/handlers/network/types';
import { getBBcodeText } from 'game/ui/rex/RexUtils';
import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext';
import EventHandler, { Events } from 'game/handlers/events/EventHandler';
import GameScene from 'game/scenes/Game';
import Item from 'game/entities/player/inventory/Item';
import NetworkHandler from 'game/handlers/network/NetworkHandler';
import Player from './player/Player';
import UIScene from 'game/scenes/UI';

// Item entity class for items on ground
export default class ItemEntity extends Phaser.Physics.Matter.Sprite {
  private _item: Item;

  private onPickupCallback?: (item: Item) => void;

  // text object showing up when hovering item
  private hoverText?: BBCodeText;

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
        label: 'hitboxSensor',
        isStatic: true,
        isSensor: true,
      },
    );

    this.setDepth(30);

    this.setInteractive({ useHandCursor: true });
    this.on('pointerover', () => {
      this.hoverText = (this.scene as GameScene).rexUI.add.BBCodeText(
        0,
        0,
        `[stroke=black]${this.item.name}[/stroke]`,
        {
          fontFamily: 'Dope',
          fontSize: '30px',
          color: '#9f9fff',
          delimiters: [],
          // fixedWidth: this.displayWidth * 3,
          // stroke: '#000000',
          // strokeThickness: 5,
        }
      );
      if (this.hoverText) {
        this.hoverText.scale = (this.scale / 4);
        this.hoverText.alpha = 0.8;
        this.hoverText.depth = this.depth;
      }

      (this.scene.plugins.get('rexOutlinePipeline') as any).add(this, {
        thickness: 2,
      });
      (this.scene.plugins.get('rexOutlinePipeline') as any).add(this.hoverText, {
        outlineColor: 0x000000,
        thickness: 2,
      });
    });
    this.on('pointerout', () => {
      this.hoverText?.destroy();
      this.hoverText = undefined;

      (this.scene.plugins.get('rexOutlinePipeline') as any).remove(this);
    });
  }

  onPickup() {
    // destroy gameobject, since item has been picked up
    this.destroy();

    this.hoverText?.destroy();
    this.hoverText = undefined;

    EventHandler.emitter().emit(Events.ITEM_ENTITY_DESTROYED, this);

    if (this.onPickupCallback) this.onPickupCallback(this.item);
  }

  setScale(x: number, y?: number) {
    super.setScale(x, y);
    this.hoverText?.setScale(x / 4, y ? y / 4 : undefined);
    return this;
  }

  setDepth(depth: number) {
    super.setDepth(depth);
    this.hoverText?.setDepth(depth);
    return this;
  }

  update() {
    // make hover text follow us
    this.hoverText?.setPosition(
      this.x - this.hoverText.displayWidth / 2,
      this.y - this.displayHeight / 1.3,
    );

    if (this.hoverText && this.hoverText.scale !== this.scene.cameras.main.zoom / 3)
      this.hoverText.setScale(this.scene.cameras.main.zoom / 3);
  }
}
