import EventHandler, { Events } from 'game/handlers/events/EventHandler';
import NetworkHandler from 'game/handlers/network/NetworkHandler';
import { UniversalEventNames } from 'game/handlers/network/types';
import Citizen from '../citizen/Citizen';
import Hustler, { Direction } from '../Hustler';
import Player from './Player';

export default class PlayerController {
  private mainKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
  private arrows!: Phaser.Types.Input.Keyboard.CursorKeys;

  private _player: Player;

  // send move message each MOVE_TICKRATE ms (if moving)
  static readonly MOVE_TICKRATE = 1 / 2;

  get player() {
    return this._player;
  }

  constructor(player: Player) {
    this._player = player;

    this.arrows = player.scene.input.keyboard.createCursorKeys();
    this.mainKeys = player.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      // inventory
      tab: Phaser.Input.Keyboard.KeyCodes.TAB,
      // interaction
      e: Phaser.Input.Keyboard.KeyCodes.E,
    }) as Phaser.Types.Input.Keyboard.CursorKeys;

    // for (let i = 0; i < 4; i++)
    // {
    //     ((this.arrows as any)[Object.keys(this.arrows)[i]] as Phaser.Input.Keyboard.Key).onUp((e: KeyboardEvent) => {
    //         if (NetworkHandler.getInstance().connected)
    //             NetworkHandler.getInstance().sendMessage(UniversalEventNames.PLAYER_MOVE, {
    //                 x: this.player.x,
    //                 y: this.player.y,
    //                 direction: this.player.moveDirection,
    //             })
    //     });
    // }
  }

  update() {
    if (Phaser.Input.Keyboard.JustUp((this.mainKeys as any).tab)) this.player.toggleInventory();

    if (
      Phaser.Input.Keyboard.JustUp(this.arrows.space) ||
      Phaser.Input.Keyboard.JustUp((this.mainKeys as any).e)
    )
      // check interact sensor
      this.player.tryInteraction();

    // get rid of previous velocity if pathfinder is not active
    if (!this.player.navigator.target) this.player.setVelocity(0);

    let willMoveFlag = false;
    if (this.mainKeys.up.isDown || this.arrows.up.isDown) {
      this.player.moveDirection = Direction.North;
      this.player.setVelocityY(-Hustler.DEFAULT_VELOCITY);
      // this.player.model.updateSprites(true);

      willMoveFlag = true;
    } else if (this.mainKeys.down.isDown || this.arrows.down.isDown) {
      this.player.moveDirection = Direction.South;
      this.player.setVelocityY(Hustler.DEFAULT_VELOCITY);
      // this.player.model.updateSprites(true);

      willMoveFlag = true;
    }
    if (this.mainKeys.left.isDown || this.arrows.left.isDown) {
      this.player.moveDirection = Direction.West;
      this.player.setVelocityX(-Hustler.DEFAULT_VELOCITY);
      // this.player.model.updateSprites(true);

      willMoveFlag = true;
    } else if (this.mainKeys.right.isDown || this.arrows.right.isDown) {
      this.player.moveDirection = Direction.East;
      this.player.setVelocityX(Hustler.DEFAULT_VELOCITY);
      // this.player.model.updateSprites(true);

      willMoveFlag = true;
    }

    if (willMoveFlag) {
      // normalize and scale the velocity so that sprite can't move faster along a diagonal
      const newVel = new Phaser.Math.Vector2((this.player.body as MatterJS.BodyType).velocity)
        .normalize()
        .scale(Hustler.DEFAULT_VELOCITY);
      this.player.setVelocity(newVel.x, newVel.y);
    }

    // cancel pathfinding if player moved
    if (this.player.navigator.target && willMoveFlag) {
      this.player.navigator.cancel();
      return;
    }

    // if the player did not move + there is no target, then maintain velocity at 0
    if (!willMoveFlag && !this.player.navigator.target) {
      this.player.moveDirection = Direction.None;

      this.player.setVelocity(0, 0);
      // this.player.model.updateSprites(true);
    }
  }
}
