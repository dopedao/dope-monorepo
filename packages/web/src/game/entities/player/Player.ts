import HustlerModel from "game/gfx/models/HustlerModel";
import EventHandler, { Events } from "game/handlers/EventHandler";
import Inventory from "game/inventory/Inventory";
import Quest from "game/quests/Quest";
import Citizen from "../citizen/Citizen";
import Hustler, { Direction } from "../Hustler";
import PlayerController from "./PlayerController";

export default class Player extends Hustler
{
    private controller: PlayerController;

    private _interactSensor: MatterJS.BodyType;

    private _inventory: Inventory;
    private _quests: Array<Quest> = new Array();

    private _busy: boolean = false;

    get interactSensor() { return this._interactSensor; }
    
    get inventory() { return this._inventory; }
    get quests() { return this._quests; }

    get busy() { return this._busy; }

    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, model: HustlerModel, inventory?: Inventory, quests?: Array<Quest>)
    {
        super(world, x, y, model);
        
        this._inventory = inventory ?? new Inventory();
        if (quests)
            this._quests = quests;

        // create interact sensor
        this._interactSensor = this.scene.matter.add.rectangle(x + 30, y - 40, 40, this.height, {
            isSensor: true,
        });

        // create controller
        this.controller = new PlayerController(this);
        this._handleEvents();
    }

    addQuest(quest: Quest)
    {
        this._quests.push(quest);
        EventHandler.emitter().emit(Events.PLAYER_NEW_QUEST, quest);
    }

    openInventory()
    {
        this.scene.events.emit(Events.PLAYER_OPEN_INVENTORY);
    }

    tryInteraction()
    {
        if (this.busy)
            return;

        this.scene.matter.overlap(this._interactSensor, undefined, (player: MatterJS.Body, other: MatterJS.Body) => {
            const otherGameObject: Phaser.GameObjects.GameObject = (other as MatterJS.BodyType).gameObject;
            if (otherGameObject instanceof Citizen)
            {
                // call onInteraction method of citizen
                otherGameObject.onInteraction();
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
                (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, { x: this.x, y: this.y + 60 });
            }
            else if (this.lastDirection === Direction.North)
            {
                (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, { x: this.x, y: this.y - 55});
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

        if ((otherBodyType.position.y - playerBodyType.position.y) > 20)
            playerBodyType.gameObject.setDepth(0);
        else if ((otherBodyType.position.y - playerBodyType.position.y) < -15)
            playerBodyType.gameObject.setDepth(2);
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

        // update depth depending other bodies
        const overlapped = this.scene.matter.overlap(this, undefined, this.updateDepth);
        // reset depth if not overlapped
        if (this.depth !== 2 && !overlapped)
        {
            this.setDepth(2);
        }

        // takes input and update player
        this.controller.update();
    }
}