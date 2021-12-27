import HustlerModel from "game/gfx/models/HustlerModel";
import Inventory from "game/inventory/Inventory";
import Hustler, { Direction } from "./Hustler";

export default class Player extends Hustler
{
    private arrows!: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd!: Phaser.Types.Input.Keyboard.CursorKeys;

    private inventory: Inventory;

    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, inventory: Inventory, model: HustlerModel, frame?: number)
    {
        super(world, x, y, model, frame);
        
        if (inventory)
            this.inventory = inventory;
        else
            this.inventory = new Inventory();

        this.arrows = this.scene.input.keyboard.createCursorKeys();
        this.wasd = this.scene.input.keyboard.addKeys({
          up: Phaser.Input.Keyboard.KeyCodes.W, 
          down: Phaser.Input.Keyboard.KeyCodes.S, 
          left: Phaser.Input.Keyboard.KeyCodes.A, 
          right: Phaser.Input.Keyboard.KeyCodes.D 
        }) as Phaser.Types.Input.Keyboard.CursorKeys;
    }

    update(): void
    {
        super.update();

        let willMoveFlag = false;
        if (this.wasd.up.isDown || this.arrows.up.isDown)
        {
            this.direction = Direction.North;
            this.setVelocityY(-Hustler.DEFAULT_VELOCITY);
            this.model.updateSprites(true);
            willMoveFlag = true;
        }
        else if (this.wasd.down.isDown || this.arrows.down.isDown)
        {
            this.direction = Direction.South;
            this.setVelocityY(Hustler.DEFAULT_VELOCITY);
            this.model.updateSprites(true);
            willMoveFlag = true;
        }
        else if (!this.navigator.target)
        {
            this.setVelocityY(0);
        }

        if (this.wasd.left.isDown || this.arrows.left.isDown)
        {
            this.direction = Direction.West;
            this.setVelocityX(-Hustler.DEFAULT_VELOCITY);
            this.model.updateSprites(true);
            willMoveFlag = true;
        }
        else if (this.wasd.right.isDown || this.arrows.right.isDown)
        {
            this.direction = Direction.East;
            this.setVelocityX(Hustler.DEFAULT_VELOCITY);
            this.model.updateSprites(true);
            willMoveFlag = true;
        }
        else if (!this.navigator.target)
        {
            this.setVelocityX(0);
        }

        if (this.navigator.target && willMoveFlag)
        {
            this.navigator.path = [];
            this.navigator.target = undefined;
            return;
        }

        if (!willMoveFlag && !this.navigator.target)
        {
            this.direction = Direction.None;

            this.setVelocity(0, 0);
            this.model.updateSprites(true);        
        }
    }
}