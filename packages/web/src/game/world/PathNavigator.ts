import Hustler, { Direction } from 'game/entities/Hustler';
import GameScene from 'game/scenes/Game';
import PF, { DiagonalMovement } from 'pathfinding';
import { runInThisContext } from 'vm';

export default class PathNavigator {
  private hustler: Hustler;
  private pathFinder: PF.Finder;

  private onMoved?: (navigator: this) => void;
  private onCancel?: (navigator: this) => void;

  private grid!: PF.Grid;

  public path: Phaser.Math.Vector2[] = new Array();
  public target?: Phaser.Math.Vector2;

  private previousPosition?: Phaser.Math.Vector2;

  constructor(hustler: Hustler, pathFinder: PF.Finder) {
    this.hustler = hustler;
    this.pathFinder = pathFinder;
  }

  moveTo(x: number, y: number, onMoved?: (navigator: this) => void, onCancel?: (navigator: this) => void, pathFind: boolean = true) {
    if (!pathFind) {
      this.target = new Phaser.Math.Vector2(x, y);
      this.onMoved = onMoved;
      this.onCancel = onCancel;
      return;
    }

    if (!this.hustler.currentMap)
      console.warn('Cannot initiate path finding without a current map');

    // the game scene used map
    const map = (this.hustler.scene as GameScene).mapHelper.loadedMaps[this.hustler.currentMap];
    if (!map || !map.collideLayer) {
      console.warn('No collide layer found for: ' + this.hustler.currentMap);
      return;
    }

    // retrieve grid data from layer (defined in maphelper)
    const gridData = map.collideLayer.getData('pf_grid') as PF.Grid;
    if (!gridData) 
    {
      console.warn('No grid data found for: ' + this.hustler.currentMap);
      return;
    }

    this.grid = gridData.clone();

    this.onMoved = onMoved;
    this.onCancel = onCancel;

    // hustler world position to tile position
    const hustlerTile = map.collideLayer.worldToTileXY(this.hustler.x, this.hustler.y);
    const moveTile = map.collideLayer.worldToTileXY(x, y);

    // point not inside of map, return
    if (
      !this.grid.isInside(hustlerTile.x, hustlerTile.y) ||
      !this.grid.isInside(moveTile.x, moveTile.y)
    ) {
      // console.warn('Point outside of current map: ' + this.hustler.currentMap);
      // We don't path find. Just directly move to the target
      this.target = new Phaser.Math.Vector2(x, y);
      return;
    }

    // find path and map it to Vec2s
    let path = this.pathFinder.findPath(
      hustlerTile.x,
      hustlerTile.y,
      moveTile.x,
      moveTile.y,
      this.grid,
    );

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

      // still no path found, return
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

    if (this.onCancel) this.onCancel(this);
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
    const collideLayer = (this.hustler.scene as GameScene).mapHelper.loadedMaps[this.hustler.currentMap].collideLayer;

    let dx = 0;
    let dy = 0;

    if (this.target) {
      // cancel pathfinding if stuck
      const pos = new Phaser.Math.Vector2(this.hustler.x, this.hustler.y);
      setTimeout(() => {
        if (this.previousPosition && pos.distanceSq(this.previousPosition) < 10) this.cancel();
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
          this.onMoved(this);
          // set callback to undefined, so that it does not called again
          this.onMoved = undefined;
        }
        this.onCancel = undefined;
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
    
    this.previousPosition = new Phaser.Math.Vector2(this.hustler.x, this.hustler.y);
  }
}
