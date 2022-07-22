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
import UIScene, { chakraToastStyle } from 'game/scenes/UI';
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

  set busy(value: boolean) {
    this._busy = value;
  }

  constructor(
    world: Phaser.Physics.Matter.World,
    x: number,
    y: number,
    currentMap: string,
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
      x + (this.displayWidth / 2),
      y - this.displayHeight / 4,
      this.displayWidth / 2,
      this.displayHeight / 2,
      {
        isSensor: true,
      },
    );

    this.currentMap = currentMap;
    // create controller
    this.controller = new PlayerController(this);
    this._handleEvents();

    this._baseDepth = this.depth;

    // this.hitboxSensor.onCollideCallback = () => (this.scene.plugins.get('rexOutlinePipeline') as any).add(this, {
    //   quality: 0.05
    // });

    this.hitboxSensor.onCollideActiveCallback = this.updateDepth;
    // prevents player depth stuttering when moving close to objects
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

    const overlap = (interactSensor: MatterJS.Body, other: MatterJS.Body) => {
      // check if busy again, needed in case of double overlapping
      if (this.busy) return;

      const otherGameObject: Phaser.GameObjects.GameObject = (other as MatterJS.BodyType)
        .gameObject;
      if (otherGameObject instanceof Citizen) {
        // if has no conversations, dont emit interaction
        if ((otherGameObject as Citizen).conversations.length === 0) return;
        
        // TODO: move call to on PLAYER_CITIZEN_INTERACT event?
        // call onInteraction method of citizen
        otherGameObject.onInteraction(this);
        EventHandler.emitter().emit(Events.PLAYER_CITIZEN_INTERACT, otherGameObject);
      } else if (otherGameObject instanceof ItemEntity) {
        this.tryPickupItem(otherGameObject);
      }
    };

    // check interact sensor
    // ignores colliders
    const flag = this.scene.matter.overlap(this._interactSensor, undefined, overlap, 
      (interactSensor: MatterJS.Body, other: MatterJS.Body) => (other as MatterJS.BodyType).label !== 'collider');

    // prevent double interaction
    if (flag) return;

    // check hitbox
    this.scene.matter.overlap(this.hitboxSensor, undefined, overlap);
  }

  tryPickupItem(item: ItemEntity) {
    if (!NetworkHandler.getInstance().authenticator.loggedIn) {
      // TODO: unauthenticated event?
      EventHandler.emitter().emit(Events.SHOW_NOTIFICAION, {
        ...chakraToastStyle,
        title: 'Unauthenticated',
        description: 'You need to be logged in to interact with items.',
        status: 'warning',
      });
      return;
    }

    // server will send us back a handshake message if everything goes accordingly
    // and we can handle the pick up of the item
    NetworkHandler.getInstance().send(UniversalEventNames.PLAYER_PICKUP_ITEMENTITY, {
      id: item.getData('id'),
    });
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
          x: this.x - (this.displayWidth / 2),
          y: this.y - this.displayHeight / 4,
        });
      } else if (this.lastDirection === Direction.East) {
        (Phaser.Physics.Matter as any).Matter.Body.setPosition(this._interactSensor, {
          x: this.x + (this.displayWidth / 2),
          y: this.y - this.displayHeight / 4,
        });
      }
    }
  }

  updateDepth(pair: MatterJS.ICollisionPair) {
    const diff = 5;

    let playerHitbox: MatterJS.BodyType;
    let otherHitbox: MatterJS.BodyType;

    // NOTE: body b is always the player?
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

    // update depth only when collision occurs vertically and not on the sides of the other body
    if (playerHitbox.position.x < otherHitbox.bounds.min.x 
      || playerHitbox.position.x > otherHitbox.bounds.max.x) return;

    const player = playerHitbox.gameObject as Player;
    
    const definedDepth = (otherHitbox as any).depth ?? otherHitbox.gameObject?.depth;
    if (otherHitbox.position.y - playerHitbox.position.y < diff) {
      const targetDepth = definedDepth ? definedDepth + 1 : player._baseDepth + 10;
      // prefer smaller depth when colliding with 2 objects
      // if (player.depth !== player._baseDepth && targetDepth > player.depth) return;

      if (player.depth < targetDepth)
        player.setDepth(targetDepth);
    }
    else {
      const targetDepth = definedDepth ? definedDepth - 1 : player._baseDepth - 5;
      
      if (player.depth > targetDepth)
        player.setDepth(targetDepth);
    }
  }

  private _handleEvents() {
    EventHandler.emitter().on(Events.PLAYER_CITIZEN_INTERACT, (citizen: Citizen) => {
      this._busy = true;
      // make player look at npc
      this.lookAt(citizen.x, citizen.y);
    });
    // TODO: ?
    EventHandler.emitter().on(Events.PLAYER_CITIZEN_INTERACT_FINISH, (citizen: Citizen) => {
      setTimeout(() => {this._busy = false;}, 200);
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
          NetworkHandler.getInstance().send(UniversalEventNames.PLAYER_MOVE, {
            x: this.x,
            y: this.y,
            direction: this.moveDirection,
            depth: this.depth,
          });
      }
      this._wasMoving = true;
    }

    if (this.moveDirection === Direction.None && this._wasMoving) {
      if (NetworkHandler.getInstance().connected)
        NetworkHandler.getInstance().send(UniversalEventNames.PLAYER_MOVE, {
          x: this.x,
          y: this.y,
          direction: this.moveDirection,
          depth: this.depth,
        });
      this._lastMoveTimestamp = 0;
      this._wasMoving = false;
    }
  }
}
