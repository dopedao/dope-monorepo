import HustlerModel from 'game/gfx/models/HustlerModel';
import EventHandler, { Events } from 'game/handlers/EventHandler';
import Inventory from 'game/inventory/Inventory';
import QuestManager from 'game/managers/QuestManager';
import Quest from 'game/quests/Quest';
import Citizen from '../citizen/Citizen';
import Hustler, { Direction } from '../Hustler';
import ItemEntity from '../ItemEntity';
import PlayerController from './PlayerController';

export default class Player extends Hustler {
  private controller: PlayerController;

  private _interactSensor: MatterJS.BodyType;

  private _inventory: Inventory;
  private _questManager: QuestManager;

  private _inventoryOpen: boolean = false;
  private _busy: boolean = false;

  get interactSensor() {
    return this._interactSensor;
  }

  get inventory() {
    return this._inventory;
  }
  get questManager() {
    return this._questManager;
  }

  get inventoryOpen() {
    return this._inventoryOpen;
  }

  get busy() {
    return this._busy;
  }

  constructor(
    world: Phaser.Physics.Matter.World,
    x: number,
    y: number,
    model: HustlerModel,
    inventory?: Inventory,
    quests?: Array<Quest>,
  ) {
    super(world, x, y, model);

    this._inventory = inventory ?? new Inventory();
    this._questManager = new QuestManager(this, quests);

    // create interact sensor
    this._interactSensor = this.scene.matter.add.rectangle(x + 40, y - 40, 40, this.height, {
      isSensor: true,
    });

    // create controller
    this.controller = new PlayerController(this);
    this._handleEvents();
  }

  toggleInventory() {
    if (!this.inventoryOpen) {
      EventHandler.emitter().emit(Events.PLAYER_INVENTORY_OPEN);

      this._inventoryOpen = true;
      this._busy = true;
    } else {
      EventHandler.emitter().emit(Events.PLAYER_INVENTORY_CLOSE);

      this._inventoryOpen = false;
      this._busy = false;
    }
  }

  tryInteraction() {
    if (this.busy) return;

    let flag = false;

    const onOverlap = (interactSensor: MatterJS.Body, other: MatterJS.Body) => {
      const otherGameObject: Phaser.GameObjects.GameObject = (other as MatterJS.BodyType)
        .gameObject;
      if (otherGameObject instanceof Citizen) {
        // if has no conversations, dont emit interaction
        if ((otherGameObject as Citizen).conversations.length === 0) return;
        // prevent setTimeout in onInteractionFinish
        // from setting shouldFollowPath back to true again when in interaction
        if (!(otherGameObject as Citizen).shouldFollowPath) return;
        // call onInteraction method of citizen
        otherGameObject.onInteraction(this);
        // make player look at npc
        this.lookAt(otherGameObject.x, otherGameObject.y);

        EventHandler.emitter().emit(Events.PLAYER_CITIZEN_INTERACT, otherGameObject);

        flag = true;
      } else if (otherGameObject instanceof ItemEntity) {
        // if item succesfully picked up
        if (this.inventory.add((otherGameObject as ItemEntity).item, true))
          (otherGameObject as ItemEntity).onPickup();

        flag = true;
      }
    };

    // check interact sensor
    this.scene.matter.overlap(this._interactSensor, undefined, onOverlap);

    // prevent double interaction
    if (flag) return;

    // check hitbox
    this.scene.matter.overlap(this.hitboxSensor, undefined, onOverlap);
  }

  updateSensorPosition() {
    // update sensor position
    if (this.anims.currentAnim) {
      if (this.lastDirection === Direction.South) {
        (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, {
          x: this.x,
          y: this.y + 75,
        });
      } else if (this.lastDirection === Direction.North) {
        (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, {
          x: this.x,
          y: this.y - 85,
        });
      } else if (this.lastDirection === Direction.West) {
        (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, {
          x: this.x - 40,
          y: this.y - 40,
        });
      } else if (this.lastDirection === Direction.East) {
        (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, {
          x: this.x + 40,
          y: this.y - 40,
        });
      }
    }
  }

  updateDepth(player: MatterJS.Body, other: MatterJS.Body) {
    const playerBodyType: MatterJS.BodyType = player as MatterJS.BodyType;
    let otherBodyType: MatterJS.BodyType = other as MatterJS.BodyType;

    // if the overlapped has a parent body, use it instead for calculating delta Y
    if (otherBodyType.parent) otherBodyType = otherBodyType.parent;

    if (otherBodyType.position.y - playerBodyType.position.y < 0)
      playerBodyType.gameObject.setDepth(2);
    else playerBodyType.gameObject.setDepth(0);
  }

  private _handleEvents() {
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

  update(): void {
    super.update();
    this.updateSensorPosition();

    // this.questManager.update();

    // update depth depending other bodies
    const overlapped = this.scene.matter.overlap(
      this.body as MatterJS.BodyType,
      undefined,
      this.updateDepth,
    );
    // reset depth if not overlapped
    if (this.depth !== 2 && !overlapped) {
      this.setDepth(2);
    }

    // takes input and update player
    this.controller.update();
  }
}
