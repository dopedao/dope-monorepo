import HustlerModel from "game/gfx/models/HustlerModel";
import EventHandler, { Events } from "game/handlers/EventHandler";
import Inventory from "game/inventory/Inventory";
import QuestManager from "game/managers/QuestManager";
import Quest from "game/quests/Quest";
import Citizen from "../citizen/Citizen";
import Hustler, { Direction } from "../Hustler";
import ItemEntity from "../ItemEntity";
import PlayerController from "./PlayerController";

export default class Player extends Hustler
{
    private controller: PlayerController;

    private _interactSensor: MatterJS.BodyType;

    private _inventory: Inventory;
    private _questManager: QuestManager;

    private _inventoryOpen: boolean = false;
    private _busy: boolean = false;

    get interactSensor() { return this._interactSensor; }
    
    get inventory() { return this._inventory; }
    get questManager() { return this._questManager; }

    get inventoryOpen() { return this._inventoryOpen; }

    get busy() { return this._busy; }

    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, model: HustlerModel, inventory?: Inventory, quests?: Array<Quest>)
    {
        super(world, x, y, model);
        
        this._inventory = inventory ?? new Inventory();
        this._questManager = new QuestManager(this, quests);

        // create interact sensor
        this._interactSensor = this.scene.matter.add.rectangle(x + 30, y - 40, 40, this.height, {
            isSensor: true,
        });

        // create controller
        this.controller = new PlayerController(this);
        this._handleEvents();
    }

    toggleInventory()
    {
        if (!this.inventoryOpen)
        {
            EventHandler.emitter().emit(Events.PLAYER_OPEN_INVENTORY);

            this._inventoryOpen = true;
            this._busy = true;
        }
        else
        {
            EventHandler.emitter().emit(Events.PLAYER_CLOSE_INVENTORY);

            this._inventoryOpen = false;
            this._busy = false;
        }
    }

    tryInteraction()
    {
        if (this.busy)
            return;

        let flag = false;

        const onOverlap = (interactSensor: MatterJS.Body, other: MatterJS.Body) => {
            const otherGameObject: Phaser.GameObjects.GameObject = (other as MatterJS.BodyType).gameObject;
            if (otherGameObject instanceof Citizen)
            {
                // prevent setTimeout in onInteractionFinish
                // from setting shouldFollowPath back to true again when in interaction
                if (!(otherGameObject as Citizen).shouldFollowPath)
                    return;
                // call onInteraction method of citizen
                otherGameObject.onInteraction(this);
                // make player look at npc
                this.lookAt(otherGameObject.x, otherGameObject.y);

                EventHandler.emitter().emit(Events.PLAYER_INTERACT_NPC, otherGameObject);

                flag = true;
            }
            else if (otherGameObject instanceof ItemEntity)
            {
                // if item succesfully picked up
                if (this.inventory.add((otherGameObject as ItemEntity).item))
                    (otherGameObject as ItemEntity).onPickup();
                
                flag = true;
            }
        };

        // check interact sensor
        this.scene.matter.overlap(this._interactSensor, undefined, onOverlap);
        
        // prevent double interaction
        if (flag)
            return;

        // check hitbox
        this.scene.matter.overlap((this.body as MatterJS.BodyType).parts[0], undefined, onOverlap);
    }

    updateSensorPosition()
    {
        // update sensor position
        if (this.anims.currentAnim)
        {
            if (this.lastDirection === Direction.South)
            {
                (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, { x: this.x, y: this.y + 65 });
            }
            else if (this.lastDirection === Direction.North)
            {
                (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, { x: this.x, y: this.y - 85});
            }
            else if (this.lastDirection === Direction.West)
            {
                (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, { x: this.x - 40, y: this.y - 40 });
            }
            else if (this.lastDirection === Direction.East)
            {
                (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, { x: this.x + 40, y: this.y - 40 });
            }
        }
    }

    updateDepth(player: MatterJS.Body, other: MatterJS.Body)
    {
        const playerBodyType: MatterJS.BodyType = (player as MatterJS.BodyType)
        const otherBodyType: MatterJS.BodyType = (other as MatterJS.BodyType);

        console.log(otherBodyType.position.y - playerBodyType.position.y);

        if ((otherBodyType.position.y - playerBodyType.position.y) > 20)
            playerBodyType.gameObject.setDepth(2);
        else if ((otherBodyType.position.y - playerBodyType.position.y) < -15)
            playerBodyType.gameObject.setDepth(0);
    }

    private _handleEvents()
    {
        EventHandler.emitter().on(Events.PLAYER_INTERACT_NPC, (npc: Phaser.GameObjects.GameObject) => {
            this._busy = true;
        });
        EventHandler.emitter().on(Events.PLAYER_INTERACT_NPC_CANCEL, (npc: Phaser.GameObjects.GameObject) => {
            this._busy = false;
        });
        EventHandler.emitter().on(Events.PLAYER_INTERACT_NPC_COMPLETE, (npc: Phaser.GameObjects.GameObject) => {
            this._busy = false;
        });
    }

    update(): void
    {
        super.update();
        this.updateSensorPosition();

        this.questManager.update();

        // update depth depending other bodies
        const overlapped = this.scene.matter.overlap((this.body as MatterJS.BodyType).parts[0], undefined, this.updateDepth);
        // reset depth if not overlapped
        if (this.depth !== 2 && !overlapped)
        {
            this.setDepth(2);
        }

        // takes input and update player
        this.controller.update();
    }
}