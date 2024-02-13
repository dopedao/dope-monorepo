import EventHandler, { Events } from 'game/handlers/events/EventHandler';
import NetworkHandler from 'game/handlers/network/NetworkHandler';
import { UniversalEventNames } from 'game/handlers/network/types';
import GameScene from 'game/scenes/Game';
import UIScene from 'game/scenes/UI';
import ControlsManager, { ControlsEvents, PlayerKeys } from 'game/utils/ControlsManager';
import VirtualJoyStick from 'phaser3-rex-plugins/plugins/virtualjoystick';
import Citizen from '../citizen/Citizen';
import Hustler, { Direction } from '../Hustler';
import Player from './Player';

export default class PlayerController {
  private mainKeys!: { [key: string]: Phaser.Input.Keyboard.Key };
  private arrows!: Phaser.Types.Input.Keyboard.CursorKeys;
  private _player: Player;

  // send move message each MOVE_TICKRATE ms (if moving)
  static readonly MOVE_TICKRATE = 1 / 2;

  get player() {
    return this._player;
  }

  constructor(player: Player) {
    this._player = player;

    const kb = player.scene.input.keyboard;
    if (!kb) { return }

    this.arrows = kb.createCursorKeys();
    this.mainKeys = kb.addKeys(
      ControlsManager.getInstance().playerKeys,
    ) as { [key: string]: Phaser.Input.Keyboard.Key };
    ControlsManager.getInstance().emitter.on(
      ControlsEvents.PLAYER_KEYS_UPDATED,
      (newKeys: PlayerKeys) => {
        for (const key of Object.values(this.mainKeys)) {
          if (key) {
            this?.player?.scene?.input?.keyboard?.removeKey(key);
          }
        }
        this.mainKeys = kb?.addKeys(newKeys) as {
          [key: string]: Phaser.Input.Keyboard.Key;
        };
      },
    );
  }

  update() {
    // if (Phaser.Input.Keyboard.JustUp((this.mainKeys as any).inventory)) this.player.toggleInventory();

    if (
      Phaser.Input.Keyboard.JustUp(this.arrows.space) ||
      Phaser.Input.Keyboard.JustUp((this.mainKeys as any).interact)
    )
      // check interact sensor
      this.player.tryInteraction();

    // get rid of previous velocity if pathfinder is not active
    if (!this.player.navigator.target) this.player.setVelocity(0);

    const joyStick: VirtualJoyStick | undefined = (
      this._player.scene.scene.get('UIScene') as UIScene
    ).joyStick;

    let willMoveFlag = false;
    if (this.mainKeys.up.isDown || this.arrows.up.isDown || joyStick?.up) {
      this.player.moveDirection = Direction.North;
      this.player.setVelocityY(-Hustler.DEFAULT_VELOCITY);
      // this.player.model.updateSprites(true);

      willMoveFlag = true;
    } else if (this.mainKeys.down.isDown || this.arrows.down.isDown || joyStick?.down) {
      this.player.moveDirection = Direction.South;
      this.player.setVelocityY(Hustler.DEFAULT_VELOCITY);
      // this.player.model.updateSprites(true);

      willMoveFlag = true;
    }
    if (this.mainKeys.left.isDown || this.arrows.left.isDown || joyStick?.left) {
      this.player.moveDirection = Direction.West;
      this.player.setVelocityX(-Hustler.DEFAULT_VELOCITY);
      // this.player.model.updateSprites(true);

      willMoveFlag = true;
    } else if (this.mainKeys.right.isDown || this.arrows.right.isDown || joyStick?.right) {
      this.player.moveDirection = Direction.East;
      this.player.setVelocityX(Hustler.DEFAULT_VELOCITY);
      // tshis.player.model.updateSprites(true);

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
