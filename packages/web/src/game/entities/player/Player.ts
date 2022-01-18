import HustlerModel from "game/gfx/models/HustlerModel";
import EventHandler, { Events } from "game/handlers/EventHandler";
import Inventory from "game/entities/player/inventory/Inventory";
import QuestManager from "game/entities/player/managers/QuestManager";
import Quest from "game/entities/player/quests/Quest";
import Citizen from "../citizen/Citizen";
import Hustler, { Direction } from "../Hustler";
import ItemEntity from "../ItemEntity";
import PlayerController from "./PlayerController";
import ENS, { getEnsAddress } from "@ensdomains/ensjs";
import { EmptyBagStruct } from "utils/DopeDatabase";
import UIScene from "game/scenes/UI";
import BBCodeText from "phaser3-rex-plugins/plugins/bbcodetext";
import { getShortAddress } from "utils/utils";

export default class Player extends Hustler
{
    private controller: PlayerController;

    private _interactSensor: MatterJS.BodyType;

    private _inventory: Inventory;
    private _questManager: QuestManager;

    private _inventoryOpen: boolean = false;
    private _busy: boolean = false;

    private hoverText?: BBCodeText;

    private readonly _baseDepth: number;

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
        this._interactSensor = this.scene.matter.add.rectangle(x + this.displayWidth, y - this.displayHeight / 4, this.displayWidth, this.displayHeight / 2, {
            isSensor: true,
        });

        // create controller
        this.controller = new PlayerController(this);
        this._handleEvents();

        this._baseDepth = this.depth;

        // display ens domain name / address on hover
        if ((window.ethereum as any).selectedAddress)
        {
            const address = (window.ethereum as any).selectedAddress;
            const ens = new ENS({ provider: window.ethereum, ensAddress: getEnsAddress(1) });

            ens.getName(address).then((ensName: { name: string }) => {
                const uiScene = this.scene.scene.get('UIScene') as UIScene;
                
                this.setInteractive({ useHandCursor: true });
                this.on('pointerover', () => {
                    this.hoverText = uiScene.rexUI.add.BBCodeText(0, 0, ensName.name ?? getShortAddress(address), {
                        fontFamily: 'Dope',
                        fontSize: '20px',
                        color: '#ffffff'
                    });
                });
                this.on('pointerout', () => {
                    this.hoverText?.destroy();
                    this.hoverText = undefined;
                });
            });
        }

        this.hitboxSensor.onCollideActiveCallback = this.updateDepth;
        // setTimeout prevents depth changing too fast
        // and causing player render stutter
        this.hitboxSensor.onCollideEndCallback = () => setTimeout(() => this.setDepth(this._baseDepth));
    }

    toggleInventory()
    {
        if (!this.inventoryOpen)
        {
            EventHandler.emitter().emit(Events.PLAYER_INVENTORY_OPEN);

            this._inventoryOpen = true;
            this._busy = true;
        }
        else
        {
            EventHandler.emitter().emit(Events.PLAYER_INVENTORY_CLOSE);

            this._inventoryOpen = false;
            this._busy = false;
        }
    }

    tryInteraction()
    {
        if (this.busy)
            return;

        let flag = false;

        const overlap = (interactSensor: MatterJS.Body, other: MatterJS.Body) => {
            const otherGameObject: Phaser.GameObjects.GameObject = (other as MatterJS.BodyType).gameObject;
            if (otherGameObject instanceof Citizen)
            {
                // if has no conversations, dont emit interaction
                if ((otherGameObject as Citizen).conversations.length === 0)
                    return;
                // prevent setTimeout in onInteractionFinish
                // from setting shouldFollowPath back to true again when in interaction
                if (!(otherGameObject as Citizen).shouldFollowPath)
                    return;
                // call onInteraction method of citizen
                otherGameObject.onInteraction(this);
                // make player look at npc
                this.lookAt(otherGameObject.x, otherGameObject.y);

                EventHandler.emitter().emit(Events.PLAYER_CITIZEN_INTERACT, otherGameObject);

                flag = true;
            }
            else if (otherGameObject instanceof ItemEntity)
            {
                // if item succesfully picked up
                if (this.inventory.add((otherGameObject as ItemEntity).item, true))
                    (otherGameObject as ItemEntity).onPickup();
                
                flag = true;
            }
        };

        // check interact sensor
        this.scene.matter.overlap(this._interactSensor, undefined, overlap);
        
        // prevent double interaction
        if (flag)
            return;

        // check hitbox
        this.scene.matter.overlap(this.hitboxSensor, undefined, overlap);
    }

    updateSensorPosition()
    {
        // update sensor position
        if (this.anims.currentAnim)
        {
            if (this.lastDirection === Direction.South)
            {
                (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, { x: this.x, y: this.y + this.displayHeight / 1.5 });
            }
            else if (this.lastDirection === Direction.North)
            {
                (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, { x: this.x, y: this.y - this.displayHeight / 1.1 });
            }
            else if (this.lastDirection === Direction.West)
            {
                (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, { x: this.x - this.displayWidth, y: this.y - this.displayHeight / 4 });
            }
            else if (this.lastDirection === Direction.East)
            {
                (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, { x: this.x + this.displayWidth, y: this.y - this.displayHeight / 4 });
            }
        }
    }

    updateDepth(pair: MatterJS.IPair)
    {
        let other = pair.bodyA as MatterJS.BodyType;
        let playerHitbox = pair.bodyB as MatterJS.BodyType;

        // ignore collision with hustler collider
        if (other.label === "collider" || other.label === "interactSensor")
            return;

        // if the overlapped has a parent body, use it instead for calculating delta Y
        if (other.parent)
            other = other.parent;
        
        if ((other.position.y - playerHitbox.position.y) < 0)
            playerHitbox.gameObject.setDepth(playerHitbox.gameObject._baseDepth + 20);
        else
            playerHitbox.gameObject.setDepth(playerHitbox.gameObject._baseDepth - 20);
    }

    private _handleEvents()
    {
        EventHandler.emitter().on(Events.PLAYER_CITIZEN_INTERACT, (citizen: Citizen) => {
            this._busy = true;
        });
        EventHandler.emitter().on(Events.PLAYER_CITIZEN_INTERACT_CANCEL, (citizen: Citizen) => {
            this._busy = false;
        });
        EventHandler.emitter().on(Events.PLAYER_CITIZEN_INTERACT_COMPLETE, (citizen: Citizen) => {
            this._busy = false;
        });
    }

    update(): void
    {
        super.update();
        // update interaction box sensor position
        this.updateSensorPosition();
        // make hovertext follow us
        this.hoverText?.setPosition(
            (this.x - this.scene.cameras.main.worldView.x) * this.scene.cameras.main.zoom - (this.hoverText.displayWidth / 2), 
            ((this.y - this.scene.cameras.main.worldView.y) * this.scene.cameras.main.zoom) - ((this.displayHeight / 1.5) * this.scene.cameras.main.zoom));;

        // takes input and update player
        this.controller.update();
    }
}