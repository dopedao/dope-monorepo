import Hustler, { Direction } from "game/entities/Hustler";
import GameScene from "game/scenes/Game";
import PF from "pathfinding";

export default class PathNavigator
{
    private hustler: Hustler;
    private pathFinder: PF.Finder; 

    public path: Phaser.Math.Vector2[] = [];
    public target?: Phaser.Math.Vector2;

    constructor(hustler: Hustler, pathFinder: PF.Finder)
    {
        this.hustler = hustler;
        this.pathFinder = pathFinder;

        this.pathFinder
    }

    moveTo(x: number, y: number)
    {
        // the game scene used map
        const map = (this.hustler.scene as GameScene).map;

        // hustler world position to tile position
        const hustlerTile = map.worldToTileXY(this.hustler.x, this.hustler.y);

        // convert grid of tiles into PF grid
        console.log((this.hustler.scene as GameScene).map.layers[1].data);
        let grid = new PF.Grid(
            map.layers[1].data
            .map(
                tileArr => tileArr.map(tile => tile.collides ? 1 : 0)))

        this.path = this.pathFinder.findPath(hustlerTile.x, hustlerTile.y, x, y, grid).map(targ => new Phaser.Math.Vector2(targ[0], targ[1]));
        const targetTile = this.path.shift()!;
        this.target = targetTile;
    }

    update()
    {
        console.log(this.path);

        let dx = 0;
	    let dy = 0;

	    if (this.target)
	    {
	    	dx = this.target.x - (this.hustler.scene as GameScene).map.worldToTileX(this.hustler.x);
	    	dy = this.target.y - (this.hustler.scene as GameScene).map.worldToTileX(this.hustler.y);

	    	if (Math.abs(dx) < 1)
	    	{
	    		dx = 0;
	    	}
	    	if (Math.abs(dy) < 1)
	    	{
	    		dy = 0;
	    	}

	    	if (dx === 0 && dy === 0)
	    	{
	    		if (this.path.length > 0)
	    		{
                    const targetTile = this.path.shift()!;
	    			this.target = targetTile;
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
            this.hustler.direction = Direction.North;
            this.hustler.setVelocityY(-Hustler.DEFAULT_VELOCITY);
            this.hustler.model.updateSprites(true);
            willMoveFlag = true;
        }
        else if (down)
        {
            this.hustler.direction = Direction.South;
            this.hustler.setVelocityY(Hustler.DEFAULT_VELOCITY);
            this.hustler.model.updateSprites(true);
            willMoveFlag = true;
        }
        else if (this.target)
        {
            this.hustler.setVelocityY(0);
        }
        
        if (left)
        {
            this.hustler.direction = Direction.West;
            this.hustler.setVelocityX(-Hustler.DEFAULT_VELOCITY);
            this.hustler.model.updateSprites(true);
            willMoveFlag = true;
        }
        else if (right)
        {
            this.hustler.direction = Direction.East;
            this.hustler.setVelocityX(Hustler.DEFAULT_VELOCITY);
            this.hustler.model.updateSprites(true);
            willMoveFlag = true;
        }
        else if (this.target)
        {
            this.hustler.setVelocityX(0);
        }
        
        
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