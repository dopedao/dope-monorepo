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

    updateSensorPosition()
    {
        // update sensor position
        if (this.anims.currentAnim)
        {
            if (this.lastDirection === Direction.South)
            {
                this.interactSensor.position.x = this.x;
                this.interactSensor.position.y = this.y + 50;
            }
            else if (this.lastDirection === Direction.North)
            {
                this.interactSensor.position.x = this.x;
                this.interactSensor.position.y = this.y - 50;
            }
            else if (this.lastDirection === Direction.West)
            {
                this.interactSensor.position.x = this.x - 50;
                this.interactSensor.position.y = this.y - 20;
            }
            else if (this.lastDirection === Direction.East)
            {
                this.interactSensor.position.x = this.x + 50;
                this.interactSensor.position.y = this.y - 20;
            }
        }
    }

    update(): void
    {
        super.update();

        this.updateSensorPosition();

        // get rid of previous velocity if pathfinder is not active
        if (!this.navigator.target)
            this.setVelocity(0);

        let willMoveFlag = false;
        if (this.wasd.up.isDown || this.arrows.up.isDown)
        {
            this.moveDirection = Direction.North;
            this.setVelocityY(-Hustler.DEFAULT_VELOCITY);
            this.model.updateSprites(true);

            willMoveFlag = true;
        }
        else if (this.wasd.down.isDown || this.arrows.down.isDown)
        {
            this.moveDirection = Direction.South;
            this.setVelocityY(Hustler.DEFAULT_VELOCITY);
            this.model.updateSprites(true);

            willMoveFlag = true;
        }
        if (this.wasd.left.isDown || this.arrows.left.isDown)
        {
            this.moveDirection = Direction.West;
            this.setVelocityX(-Hustler.DEFAULT_VELOCITY);
            this.model.updateSprites(true);

            willMoveFlag = true;
        }
        else if (this.wasd.right.isDown || this.arrows.right.isDown)
        {
            this.moveDirection = Direction.East;
            this.setVelocityX(Hustler.DEFAULT_VELOCITY);
            this.model.updateSprites(true);

            willMoveFlag = true;
        }

        // normalize and scale the velocity so that sprite can't move faster along a diagonal
        const newVel = new Phaser.Math.Vector2((this.body as MatterJS.BodyType).velocity).normalize().scale(Hustler.DEFAULT_VELOCITY);
        this.setVelocity(newVel.x, newVel.y);

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
            this.moveDirection = Direction.None;

            this.setVelocity(0, 0);
            this.model.updateSprites(true);        
        }
    }
}