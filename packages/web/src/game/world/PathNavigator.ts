import Hustler, { Direction } from "game/entities/Hustler";
import GameScene from "game/scenes/Game";
import PF from "pathfinding";
import { runInThisContext } from "vm";

export default class PathNavigator
{
    private hustler: Hustler;
    private pathFinder: PF.Finder; 

    private onMoved?: () => void;

    private grid!: PF.Grid;

    public path: Phaser.Math.Vector2[] = new Array();
    public target?: Phaser.Math.Vector2;

    private previousPosition?: Phaser.Math.Vector2;

    constructor(hustler: Hustler, pathFinder: PF.Finder)
    {
        this.hustler = hustler;
        this.pathFinder = pathFinder;
    }

    moveTo(x: number, y: number, onMoved?: () => void)
    {
        // use the collider pos instead of the whole body pos to avoid
        // the player being stuck due to the collider's offset
        const hustlerBodyPos = (this.hustler.body as MatterJS.BodyType).parts[1].position;

        this.onMoved = onMoved;

        // the game scene used map
        const map = (this.hustler.scene as GameScene).map;

        // hustler world position to tile position
        const hustlerTile = map.worldToTileXY(hustlerBodyPos.x, hustlerBodyPos.y);

        // convert grid of tiles into PF grid
        this.grid = new PF.Grid(
            map.layers[1].data
            .map(
                tileArr => tileArr.map(tile => tile.collides ? 1 : 0)))

        // find path, smoothen it and map it to Vec2s
        this.path = this.pathFinder.findPath(hustlerTile.x, hustlerTile.y, x, y, this.grid).map(targ => new Phaser.Math.Vector2(targ[0], targ[1]));

        const targetTilePos = this.path.shift();
        if (targetTilePos)
        {
            const targetTile = map.getTileAt(targetTilePos.x, targetTilePos.y, true);
            this.target = new Phaser.Math.Vector2(targetTile.getCenterX(), targetTile.getCenterY());
        }
    }

    cancel()
    {
        this.path = [];
        this.stop();
    }

    stop()
    {
        if (this.target)
        {
            // set as not moving
            this.hustler.model.updateSprites(true);
            this.hustler.moveDirection = Direction.None;
            this.target = undefined;
        }
    }

    update()
    {
        const hustlerBodyPos = (this.hustler.body as MatterJS.BodyType).parts[1].position;

        let dx = 0;
	    let dy = 0;

	    if (this.target)
	    {
	    	dx = this.target.x - hustlerBodyPos.x;
	    	dy = this.target.y - hustlerBodyPos.y;

	    	if (Math.abs(dx) < 7)
	    	{
	    		dx = 0;
	    	}
	    	if (Math.abs(dy) < 7)
	    	{
	    		dy = 0;
	    	}

	    	if (dx === 0 && dy === 0)
	    	{
	    		if (this.path.length > 0)
	    		{
                    const targetTilePos = this.path.shift()!;
                    const targetTile = (this.hustler.scene as GameScene).map.getTileAt(targetTilePos.x, targetTilePos.y, true);
	    			this.target = new Phaser.Math.Vector2(targetTile.getCenterX(), targetTile.getCenterY());
	    			return;
	    		}

                // stop pathfinding
                this.stop();
                if (this.onMoved)
                {
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

        if (up)
        {
            this.hustler.moveDirection = Direction.North;
            this.hustler.setVelocityY(-Hustler.DEFAULT_VELOCITY);
            this.hustler.model.updateSprites(true);
            willMoveFlag = true;
        }
        else if (down)
        {
            this.hustler.moveDirection = Direction.South;
            this.hustler.setVelocityY(Hustler.DEFAULT_VELOCITY);
            this.hustler.model.updateSprites(true);
            willMoveFlag = true;
        }
        
        if (left)
        {
            this.hustler.moveDirection = Direction.West;
            this.hustler.setVelocityX(-Hustler.DEFAULT_VELOCITY);
            this.hustler.model.updateSprites(true);
            willMoveFlag = true;
        }
        else if (right)
        {
            this.hustler.moveDirection = Direction.East;
            this.hustler.setVelocityX(Hustler.DEFAULT_VELOCITY);
            this.hustler.model.updateSprites(true);
            willMoveFlag = true;
        }

        if (willMoveFlag)
        {
            // normalize and scale the velocity so that sprite can't move faster along a diagonal
            const newVel = new Phaser.Math.Vector2((this.hustler.body as MatterJS.BodyType).velocity).normalize().scale(Hustler.DEFAULT_VELOCITY);
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


        this.previousPosition = new Phaser.Math.Vector2(hustlerBodyPos.x, hustlerBodyPos.y);
        
        
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