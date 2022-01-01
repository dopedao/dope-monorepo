import HustlerModel from "game/gfx/models/HustlerModel";
import EventHandler, { Events } from "game/handlers/EventHandler";
import Inventory from "game/inventory/Inventory";
import Quest from "game/quests/Quest";
import Citizen from "./citizen/Citizen";
import Hustler, { Direction } from "./Hustler";

export default class Player extends Hustler
{
    private arrows!: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd!: Phaser.Types.Input.Keyboard.CursorKeys;

    private interactSensor: MatterJS.BodyType;

    private inventory: Inventory;
    private _quests: Array<Quest> = new Array();

    get quests() { return this._quests; }

    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, model: HustlerModel, inventory?: Inventory, quests?: Array<Quest>)
    {
        super(world, x, y, model);
        
        this.inventory = inventory ?? new Inventory();
        if (quests)
            this._quests = quests;

        // create interact sensor
        this.interactSensor = this.scene.matter.add.rectangle(x + 30, y - 40, 40, this.height, {
            isSensor: true,
        });

        this.arrows = this.scene.input.keyboard.createCursorKeys();
        this.wasd = this.scene.input.keyboard.addKeys({
          up: Phaser.Input.Keyboard.KeyCodes.W, 
          down: Phaser.Input.Keyboard.KeyCodes.S, 
          left: Phaser.Input.Keyboard.KeyCodes.A, 
          right: Phaser.Input.Keyboard.KeyCodes.D 
        }) as Phaser.Types.Input.Keyboard.CursorKeys;

        this.handleEvents();
    }

    addQuest(quest: Quest)
    {
        this._quests.push(quest);
        EventHandler.emitter().emit(Events.PLAYER_NEW_QUEST, quest);
    }

    handleEvents()
    {
        // EventHandler.emitter().on(Events.PLAYER_INTERACT_NPC, () => {
        //     console.log('Set busy to true');
        //     this._busy = true;
        // });
        // EventHandler.emitter().on(Events.PLAYER_INTERACT_NPC_COMPLETE, () => {
        //     console.log('Set busy to false');
        //     this._busy = false;
        // });
    }

    tryInteraction()
    {
        this.scene.matter.overlap(this.interactSensor, undefined, (player: MatterJS.Body, other: MatterJS.Body) => {
            const otherGameObject: Phaser.GameObjects.GameObject = (other as MatterJS.BodyType).gameObject;
            if (otherGameObject instanceof Citizen)
            {
                console.log('Emit event interact with citizen from player');
                EventHandler.emitter().emit(Events.PLAYER_INTERACT_NPC, otherGameObject);
            }
        });
    }

    updateSensorPosition()
    {
        // update sensor position
        if (this.anims.currentAnim)
        {
            if (this.lastDirection === Direction.South)
            {
                (Phaser.Physics.Matter as any).Matter.Body.setPosition(this.interactSensor, { x: this.x, y: this.y + 60 });
            }
            else if (this.lastDirection === Direction.North)
            {
                (Phaser.Physics.Matter as any).Matter.Body.setPosition(this.interactSensor, { x: this.x, y: this.y - 55});
            }
            else if (this.lastDirection === Direction.West)
            {
                (Phaser.Physics.Matter as any).Matter.Body.setPosition(this.interactSensor, { x: this.x - 40, y: this.y - 40 });
            }
            else if (this.lastDirection === Direction.East)
            {
                (Phaser.Physics.Matter as any).Matter.Body.setPosition(this.interactSensor, { x: this.x + 40, y: this.y - 40 });
            }
        }
    }

    updateDepth(player: MatterJS.Body, other: MatterJS.Body)
    {
        const playerBodyType: MatterJS.BodyType = (player as MatterJS.BodyType)
        const otherBodyType: MatterJS.BodyType = (other as MatterJS.BodyType);

        if ((otherBodyType.position.y - playerBodyType.position.y) > 20)
            playerBodyType.gameObject.setDepth(0);
        else if ((otherBodyType.position.y - playerBodyType.position.y) < -15)
            playerBodyType.gameObject.setDepth(2);
    }

    update(): void
    {
        super.update();
        this.updateSensorPosition();

        // update depth depending other bodies
        const overlapped = this.scene.matter.overlap(this, undefined, this.updateDepth);
        // reset depth if not overlapped
        if (this.depth !== 2 && !overlapped)
        {
            this.setDepth(2);
        }

        if (Phaser.Input.Keyboard.JustUp(this.arrows.space))
            // check interact sensor
            this.tryInteraction();

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

        if (willMoveFlag)
        {
            // normalize and scale the velocity so that sprite can't move faster along a diagonal
            const newVel = new Phaser.Math.Vector2((this.body as MatterJS.BodyType).velocity).normalize().scale(Hustler.DEFAULT_VELOCITY);
            this.setVelocity(newVel.x, newVel.y);
        }

        // cancel pathfinding if player moved
        if (this.navigator.target && willMoveFlag)
        {
            this.navigator.cancel();
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