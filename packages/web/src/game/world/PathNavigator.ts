import Hustler, { Direction } from 'game/entities/Hustler';
import GameScene from 'game/scenes/Game';
import PF, { DiagonalMovement } from 'pathfinding';
import { runInThisContext } from 'vm';

export default class PathNavigator {
  private hustler: Hustler;
  private pathFinder: PF.Finder;

  private onMoved?: () => void;
  private onCancel?: () => void;

  private grid!: PF.Grid;

  public path: Phaser.Math.Vector2[] = new Array();
  public target?: Phaser.Math.Vector2;

  private previousPosition?: Phaser.Math.Vector2;

  constructor(hustler: Hustler, pathFinder: PF.Finder) {
    this.hustler = hustler;
    this.pathFinder = pathFinder;
  }

  moveTo(x: number, y: number, onMoved?: () => void, onCancel?: () => void) {
    // the game scene used map
    const map = (this.hustler.scene as GameScene).mapHelper.loadedMaps.get(this.hustler.currentMap);
    if (!map || !map.collideLayer) {
      console.warn('No collide layer found');
      return;
    }

    // retrieve grid data from layer (defined in maphelper)
    this.grid = (map.collideLayer.getData('pf_grid') as PF.Grid).clone();

    this.onMoved = onMoved;
    this.onCancel = onCancel;

    // hustler world position to tile position
    const hustlerTile = map.collideLayer.worldToTileXY(this.hustler.x, this.hustler.y);
    const moveTile = map.collideLayer.worldToTileXY(x, y);

    // point not inside of map, just teleport hustler directly to the target
    if (
      !this.grid.isInside(hustlerTile.x, hustlerTile.y) ||
      !this.grid.isInside(moveTile.x, moveTile.y)
    ) {
      this.hustler.setPosition(x, y);
      return;
    }

    // find path and map it to Vec2s
    let path = this.pathFinder.findPath(
      hustlerTile.x,
      hustlerTile.y,
      moveTile.x,
      moveTile.y,
      this.grid.clone(),
    );
    // if there is no path, return
    if (path.length === 0) {
      // try finding a path from one of the neighbours of the target tile
      this.grid
        .getNeighbors(this.grid.getNodeAt(moveTile.x, moveTile.y), DiagonalMovement.Always)
        .forEach(neigh => {
          path = this.pathFinder.findPath(
            hustlerTile.x,
            hustlerTile.y,
            neigh.x,
            neigh.y,
            this.grid.clone(),
          );
          if (path.length > 0) return;
        });

      if (path.length === 0) return;
    }

    // smoothen path. makes it less "brutal"
    this.path = PF.Util.smoothenPath(this.grid, path).map(
      targ => new Phaser.Math.Vector2(targ[0], targ[1]),
    );

    const targetTilePos = this.path.shift();
    if (targetTilePos) {
      const targetTile = map.collideLayer.getTileAt(targetTilePos.x, targetTilePos.y, true);
      this.target = new Phaser.Math.Vector2(targetTile.getCenterX(), targetTile.getCenterY());
    }
  }

  cancel() {
    this.path = [];
    this.stop();

    if (this.onCancel) this.onCancel();
  }

  stop() {
    if (this.target) {
      // set as not moving
      // this.hustler.model.updateSprites(true);
      this.hustler.moveDirection = Direction.None;
      this.target = undefined;
    }
  }

  update() {
    const collideLayer = (this.hustler.scene as GameScene).mapHelper.loadedMaps.get(
      this.hustler.currentMap,
    )?.collideLayer;

    let dx = 0;
    let dy = 0;

    if (this.target) {
      // cancel pathfinding if stuck
      const pos = new Phaser.Math.Vector2(this.hustler.x, this.hustler.y);
      setTimeout(() => {
        if (this.previousPosition && pos.equals(this.previousPosition)) this.cancel();
      }, 500);

      dx = this.target.x - pos.x;
      dy = this.target.y - pos.y;

      if (Math.abs(dx) < 5) {
        dx = 0;
      }
      if (Math.abs(dy) < 5) {
        dy = 0;
      }

      if (dx === 0 && dy === 0) {
        if (this.path.length > 0) {
          const targetTilePos = this.path.shift()!;
          const targetTile = collideLayer!.getTileAt(targetTilePos.x, targetTilePos.y, true);
          this.target = new Phaser.Math.Vector2(targetTile.getCenterX(), targetTile.getCenterY());
          return;
        }

        // stop pathfinding
        this.stop();
        if (this.onMoved) {
          this.onMoved();
          // set callback to undefined, so that it does not called again
          this.onMoved = undefined;
        }
      }
    }

    const left = dx < 0;
    const right = dx > 0;
    const up = dy < 0;
    const down = dy > 0;

    let willMoveFlag = false;

    // clear previous frame velocity
    this.hustler.setVelocity(0);

    if (up) {
      this.hustler.moveDirection = Direction.North;
      this.hustler.setVelocityY(-Hustler.DEFAULT_VELOCITY);
      // this.hustler.model.updateSprites(true);
      willMoveFlag = true;
    } else if (down) {
      this.hustler.moveDirection = Direction.South;
      this.hustler.setVelocityY(Hustler.DEFAULT_VELOCITY);
      // this.hustler.model.updateSprites(true);
      willMoveFlag = true;
    }

    if (left) {
      this.hustler.moveDirection = Direction.West;
      this.hustler.setVelocityX(-Hustler.DEFAULT_VELOCITY);
      // this.hustler.model.updateSprites(true);
      willMoveFlag = true;
    } else if (right) {
      this.hustler.moveDirection = Direction.East;
      this.hustler.setVelocityX(Hustler.DEFAULT_VELOCITY);
      // this.hustler.model.updateSprites(true);
      willMoveFlag = true;
    }

    if (willMoveFlag) {
      // normalize and scale the velocity so that sprite can't move faster along a diagonal
      const newVel = new Phaser.Math.Vector2((this.hustler.body as MatterJS.BodyType).velocity)
        .normalize()
        .scale(Hustler.DEFAULT_VELOCITY);
      this.hustler.setVelocity(newVel.x, newVel.y);
    }

    // if stuck in a corner, move in the direction of the other corner
    // if (willMoveFlag)
    // {
    //     if (this.previousPosition)
    //     {
    //         if (this.previousPosition.x === this.hustler.x && this.previousPosition.y === this.hustler.y)
    //         {
    //             if (this.hustler.direction === Direction.North)
    //             {
    //                 this.hustler.direction = Direction.South;
    //                 this.hustler.setVelocityY(Hustler.DEFAULT_VELOCITY);
    //                 this.hustler.model.updateSprites(true);
    //             }
    //             else if (this.hustler.direction === Direction.South)
    //             {
    //                 this.hustler.direction = Direction.North;
    //                 this.hustler.setVelocityY(-Hustler.DEFAULT_VELOCITY);
    //                 this.hustler.model.updateSprites(true);
    //             }
    //             else if (this.hustler.direction === Direction.West)
    //             {
    //                 this.hustler.direction = Direction.East;
    //                 this.hustler.setVelocityX(Hustler.DEFAULT_VELOCITY);
    //                 this.hustler.model.updateSprites(true);
    //             }
    //             else if (this.hustler.direction === Direction.East)
    //             {
    //                 this.hustler.direction = Direction.West;
    //                 this.hustler.setVelocityX(-Hustler.DEFAULT_VELOCITY);
    //                 this.hustler.model.updateSprites(true);
    //             }
    //         }
    //     }
    // }

    // pathfinder stuck
    // if (willMoveFlag && this.previousPosition && new Phaser.Math.Vector2(this.hustler.x, this.hustler.y).fuzzyEquals(this.previousPosition))
    // {

    // }

    this.previousPosition = new Phaser.Math.Vector2(this.hustler.x, this.hustler.y);

    // if (dir === "")
    // {
    //     this.hustler.setVelocity(0, 0);
    //     this.hustler.model.updateSprites(true);
    //     // reset to the first frame of the anim
    //     if (this.hustler.anims.currentAnim && !this.hustler.anims.currentFrame.isLast)
    //     this.hustler.anims.setCurrentFrame(this.hustler.anims.currentAnim.getLastFrame());
    //     this.hustler.stopAfterDelay(100);

    //     this.hustler.model.stopSpritesAnim();
    //     return;
    // }
  }
}
