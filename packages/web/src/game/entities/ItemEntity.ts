import EventHandler, { Events } from "game/handlers/EventHandler";
import Item from "game/entities/player/inventory/Item";
import Player from "./player/Player";
import UIScene from "game/scenes/UI";
import { getBBcodeText } from "game/ui/rex/RexUtils";
import BBCodeText from "phaser3-rex-plugins/plugins/bbcodetext";

// Item entity class for items on ground
export default class ItemEntity extends Phaser.Physics.Matter.Sprite
{
    private _item: Item;

    private onPickupCallback?: (item: Item) => void;

    // text object showing up when hovering item
    private hoverText?: BBCodeText;

    get item(): Item { return this._item; }

    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, texture: string | Phaser.Textures.Texture, item: Item, onPickupCallback?: (item: Item) => void)
    {
        super(world, x, y, texture);

        this._item = item;
        this.onPickupCallback = onPickupCallback;

        this.setBody({
            type: 'rectangle',
            width: this.width,
            height: this.height,
        }, {
            isStatic: true,
            isSensor: true
        });

        this.setDepth(30);

        this.setInteractive({ useHandCursor: true });
        this.on('pointerover', () => {
            const uiScene = this.scene.scene.get('UIScene') as UIScene;
            this.hoverText = uiScene.rexUI.add.BBCodeText(0, 0, this.item.name, {
                fontFamily: 'Dope',
                fontSize: '20px',
                color: '#ffffff'
            });
        });
        this.on('pointerout', () => {
            this.hoverText?.destroy();
            this.hoverText = undefined;
        });
    }

    onPickup()
    {
        // destroy gameobject, since item has been picked up
        this.destroy();

        this.hoverText?.destroy();
        this.hoverText = undefined;

        EventHandler.emitter().emit(Events.ITEM_ENTITY_DESTROYED, this);
        
        if (this.onPickupCallback)
            this.onPickupCallback(this.item);
    }

    update()
    {
        this.hoverText?.setPosition(
            (this.x - this.scene.cameras.main.worldView.x) * this.scene.cameras.main.zoom - (this.hoverText.displayWidth / 2), 
            ((this.y - this.scene.cameras.main.worldView.y) * this.scene.cameras.main.zoom) - ((this.displayHeight / 1.5) * this.scene.cameras.main.zoom));
    }
}