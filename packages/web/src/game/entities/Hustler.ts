import HustlerAnimator from "game/anims/HustlerAnimator";
import { Base, Categories, CharacterCategories, SpritesMap } from "game/constants/Sprites";
import HustlerModel from "game/gfx/models/HustlerModel";
import PathNavigator from "game/world/PathNavigator";
import PF from "pathfinding";

export enum Direction
{
    North = "_back",
    South = "_front",
    West = "_left",
    East = "_right",
    None = ""
}

export default class Hustler extends Phaser.Physics.Matter.Sprite
{
    public static readonly DEFAULT_VELOCITY: number = 1.3;
    public static readonly DEFAULT_MASS: number = 70;

    // the direction the player is currently moving in
    // Direction.None if not moving
    private _moveDirection: Direction = Direction.None;
    // the last direction of the player
    // cant be None
    private _lastDirection: Direction = Direction.None;

    private _model: HustlerModel;

    private _animator: HustlerAnimator;
    private _navigator: PathNavigator;

    get model() { return this._model; }
    get animator() { return this._animator; }
    get navigator() { return this._navigator; }

    get lastDirection() { return this._lastDirection; }

    get moveDirection() { return this._moveDirection; }
    set moveDirection(dir: Direction)
    {
        this._moveDirection = dir;

        if (dir === Direction.None)
            return;
        this._lastDirection = dir;
    }

    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, model: HustlerModel, frame?: number)
    {
        super(world, x, y, SpritesMap[Categories.Character][Base.Male][CharacterCategories.Base], frame);

        this._model = model;
        this._model.hustler = this;

        // add to the scene, to be drawn
        world.scene.add.existing(this);

        // create main body
        const { Body, Bodies } = (Phaser.Physics.Matter as any).Matter;
        const mainBody = Bodies.rectangle(x, y, this.width * 0.45, this.height * 0.3, {
            collisionFilter: {
                group: -69
            },
            // isSensor: true,
            chamfer: { radius: 7.2 },
        } as MatterJS.BodyType);
        this.setExistingBody(mainBody);
        
        this.setDepth(1);

        // offset the hustler texture from the body
        this.setOrigin(0.5, 0.67);
        // make it a bit bigger
        this.setScale(2);

        // prevent angular momentum from rotating our body
        this.setFixedRotation();

        // create sub sprites
        this._model.createSprites();

        // create navigator
        this._navigator = new PathNavigator(this, new PF.AStarFinder({
            // heuristic: PF.Heuristic.chebyshev,
            allowDiagonal: true,
            dontCrossCorners: true,
        } as any));
        // handle animations
        this._animator = new HustlerAnimator(this);
    }

    setDepth(value: number)
    {
        super.setDepth(value);
        this._model.setDepth(value);
        return this;
    }

    update()
    {
        // update animation frames
        this.animator.update();
        // path finding
        this.navigator.update();
    }
}