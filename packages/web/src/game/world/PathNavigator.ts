import Hustler, { Direction } from "game/entities/Hustler";
import GameScene from "game/scenes/Game";
import PF from "pathfinding";

export default class PathNavigator
{
    private hustler: Hustler;
    private pathFinder: PF.Finder; 

    private grid!: PF.Grid;

    public path: Phaser.Math.Vector2[] = [];
    public target?: Phaser.Math.Vector2;

    private previousPosition?: Phaser.Math.Vector2;

    constructor(hustler: Hustler, pathFinder: PF.Finder)
    {
        this.hustler = hustler;
        this.pathFinder = pathFinder;
    }

    moveTo(x: number, y: number)
    {
        // the game scene used map
        const map = (this.hustler.scene as GameScene).map;

        // hustler world position to tile position
        const hustlerTile = map.worldToTileXY(this.hustler.x, this.hustler.y);

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

    update()
    {
        let dx = 0;
	    let dy = 0;

	    if (this.target)
	    {
	    	dx = this.target.x - this.hustler.x;
	    	dy = this.target.y - this.hustler.y;

	    	if (Math.abs(dx) < 20)
	    	{
	    		dx = 0;
	    	}
	    	if (Math.abs(dy) < 20)
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
            
	    		this.target = undefined;
	    	}
	    }

        const left = dx < 0;
	    const right = dx > 0;
	    const up = dy < 0;
	    const down = dy > 0;

        let willMoveFlag = false;

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