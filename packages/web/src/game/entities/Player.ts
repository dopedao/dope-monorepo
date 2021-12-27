import HustlerModel from "game/gfx/models/HustlerModel";
import Inventory from "game/inventory/Inventory";
import Hustler, { Direction } from "./Hustler";

export default class Player extends Hustler
{
    private arrows!: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd!: Phaser.Types.Input.Keyboard.CursorKeys;

    private interactSensor: MatterJS.BodyType;

    private inventory: Inventory;

    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, model: HustlerModel, inventory?: Inventory)
    {
        super(world, x, y, model);
        
        this.inventory = inventory ?? new Inventory();

        // create interact sensor
        this.interactSensor = this.scene.matter.add.rectangle(x + 50, y - 20, 40, 30, {
            isSensor: true,
        });

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

            // set interact sensor on top of player
            this.interactSensor.position = { x: this.x, y: this.y - 80 };

            willMoveFlag = true;
        }
        else if (this.wasd.down.isDown || this.arrows.down.isDown)
        {
            this.direction = Direction.South;
            this.setVelocityY(Hustler.DEFAULT_VELOCITY);
            this.model.updateSprites(true);

            // set interact sensor under player
            this.interactSensor.position = { x: this.x, y: this.y + 80 };

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

            // set interact sensor to the left of the player
            this.interactSensor.position = { x: this.x - 50, y: this.y - 20 };

            willMoveFlag = true;
        }
        else if (this.wasd.right.isDown || this.arrows.right.isDown)
        {
            this.direction = Direction.East;
            this.setVelocityX(Hustler.DEFAULT_VELOCITY);
            this.model.updateSprites(true);

            // set interact sensor to the right of the player
            this.interactSensor.position = { x: this.x + 50, y: this.y - 20 };

            willMoveFlag = true;
        }
        else if (!this.navigator.target)
        {
            this.setVelocityX(0);
        }

        // cancel pathfinding if player moved
        if (this.navigator.target && willMoveFlag)
        {
            this.navigator.path = [];
            this.navigator.target = undefined;
            return;
        }

        // if the player did not move + there is no target, then maintain velocity at 0
        if (!willMoveFlag && !this.navigator.target)
        {
            this.direction = Direction.None;

            this.setVelocity(0, 0);
            this.model.updateSprites(true);        
        }
    }
}