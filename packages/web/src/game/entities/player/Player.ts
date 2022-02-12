import HustlerModel from 'game/gfx/models/HustlerModel';
import EventHandler, { Events } from 'game/handlers/events/EventHandler';
import Inventory from 'game/entities/player/inventory/Inventory';
import QuestManager from 'game/entities/player/managers/QuestManager';
import Quest from 'game/entities/player/quests/Quest';
import Citizen from '../citizen/Citizen';
import Hustler, { Direction } from '../Hustler';
import ItemEntity from '../ItemEntity';
import PlayerController from './PlayerController';
import ENS, { getEnsAddress } from '@ensdomains/ensjs';
import UIScene from 'game/scenes/UI';
import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext';
import { getShortAddress } from 'utils/utils';
import NetworkHandler from 'game/handlers/network/NetworkHandler';
import { UniversalEventNames } from 'game/handlers/network/types';

export default class Player extends Hustler {
  private controller: PlayerController;

  private _interactSensor: MatterJS.BodyType;

  private _inventory: Inventory;
  private _questManager: QuestManager;

  private _inventoryOpen: boolean = false;
  private _busy: boolean = false;

  private _lastMoveTimestamp: number = 0;
  private _wasMoving: boolean = false;

  private readonly _baseDepth: number;

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
    hustlerId?: string,
    name?: string,
    inventory?: Inventory,
    quests?: Array<Quest>,
  ) {
    super(world, x, y, hustlerId, name);

    this._inventory = inventory ?? new Inventory();
    this._questManager = new QuestManager(this, quests);

    // create interact sensor
    this._interactSensor = this.scene.matter.add.rectangle(
      x + this.displayWidth,
      y - this.displayHeight / 4,
      this.displayWidth,
      this.displayHeight / 2,
      {
        isSensor: true,
      },
    );

    // create controller
    this.controller = new PlayerController(this);
    this._handleEvents();

    this._baseDepth = this.depth;

    this.hitboxSensor.onCollideActiveCallback = this.updateDepth;
    // setTimeout prevents depth changing too fast
    // and causing player render stutter
    this.hitboxSensor.onCollideEndCallback = () => setTimeout(() => this.setDepth(this._baseDepth));
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

    const overlap = (interactSensor: MatterJS.Body, other: MatterJS.Body) => {
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
    this.scene.matter.overlap(this._interactSensor, undefined, overlap);

    // prevent double interaction
    if (flag) return;

    // check hitbox
    this.scene.matter.overlap(this.hitboxSensor, undefined, overlap);
  }

  updateSensorPosition() {
    // update sensor position
    if (this.anims.currentAnim) {
      if (this.lastDirection === Direction.South) {
        (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, {
          x: this.x,
          y: this.y + this.displayHeight / 1.5,
        });
      } else if (this.lastDirection === Direction.North) {
        (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, {
          x: this.x,
          y: this.y - this.displayHeight / 1.1,
        });
      } else if (this.lastDirection === Direction.West) {
        (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, {
          x: this.x - this.displayWidth,
          y: this.y - this.displayHeight / 4,
        });
      } else if (this.lastDirection === Direction.East) {
        (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, {
          x: this.x + this.displayWidth,
          y: this.y - this.displayHeight / 4,
        });
      }
    }
  }

  updateDepth(pair: MatterJS.IPair) {
    let playerHitbox: MatterJS.BodyType;
    let otherHitbox: MatterJS.BodyType;

    if ((pair.bodyB as MatterJS.BodyType).gameObject instanceof Player) {
      playerHitbox = pair.bodyB as MatterJS.BodyType;
      otherHitbox = pair.bodyA as MatterJS.BodyType;
    } else {
      playerHitbox = pair.bodyA as MatterJS.BodyType;
      otherHitbox = pair.bodyB as MatterJS.BodyType;
    }

    // ignore collision with hustler collider
    if (otherHitbox.gameObject instanceof Player) return;

    // if the overlapped has a parent body, use it instead for calculating delta Y
    if (otherHitbox.parent) otherHitbox = otherHitbox.parent;

    if (otherHitbox.position.y - playerHitbox.position.y < 0)
      playerHitbox.gameObject.setDepth(playerHitbox.gameObject._baseDepth + 20);
    else playerHitbox.gameObject.setDepth(playerHitbox.gameObject._baseDepth - 20);
  }

  private _handleEvents() {
    EventHandler.emitter().on(Events.PLAYER_CITIZEN_INTERACT, (citizen: Citizen) => {
      this._busy = true;
      // make player look at npc
      this.lookAt(citizen.x, citizen.y);
    });
    EventHandler.emitter().on(Events.PLAYER_CITIZEN_INTERACT_FINISH, (citizen: Citizen) => {
      this._busy = false;
    });
  }

  update(): void {
    super.update();
    // update interaction box sensor position
    this.updateSensorPosition();

    // takes input and update player
    this.controller.update();

    if (this.moveDirection !== Direction.None) {
      if (Date.now() - this._lastMoveTimestamp > PlayerController.MOVE_TICKRATE * 1000) {
        this._lastMoveTimestamp = Date.now();

        if (NetworkHandler.getInstance().connected)
          NetworkHandler.getInstance().sendMessage(UniversalEventNames.PLAYER_MOVE, {
            x: this.x,
            y: this.y,
            direction: this.moveDirection,
          });
      }
      this._wasMoving = true;
    }

    if (this.moveDirection === Direction.None && this._wasMoving) {
      if (NetworkHandler.getInstance().connected)
        NetworkHandler.getInstance().sendMessage(UniversalEventNames.PLAYER_MOVE, {
          x: this.x,
          y: this.y,
          direction: this.moveDirection,
        });
      this._lastMoveTimestamp = 0;
      this._wasMoving = false;
    }
  }
}
