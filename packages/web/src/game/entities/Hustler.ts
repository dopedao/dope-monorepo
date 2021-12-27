import HustlerAnimator from "game/anims/HustlerAnimator";
import { Base, Categories, CharacterCategories, SpritesMap } from "game/constants/Sprites";
import HustlerModel from "game/gfx/models/HustlerModel";
import PathNavigator from "game/world/PathNavigator";
import { BodyType } from "matter";
import Pathfinding from "pathfinding";

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
    public static readonly DEFAULT_VELOCITY: number = 1.7;
    public static readonly DEFAULT_MASS: number = 70;

    public direction: Direction = Direction.None;

    private _model: HustlerModel;
    public animator: HustlerAnimator;
    private _navigator: PathNavigator;

    get model() { return this._model; }
    get navigator() { return this._navigator; }

    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, model: HustlerModel, frame?: number)
    {
        super(world, x, y, SpritesMap[Categories.Character][Base.Male][CharacterCategories.Base], frame);

        this._model = model;
        this._model.hustler = this;

        // add to the scene, to be drawn
        world.scene.add.existing(this);

        // create main body
        const mainBody = this.scene.matter.add.rectangle(x, y, this.width * 0.5, this.height * 0.4, {
            chamfer: { radius: 8 },
            //render: { "sprite.yOffset": 0.1 },
        });
        this.setExistingBody(mainBody);

        this.setScale(2);

        // prevent angular momentum from rotating our body
        this.setFixedRotation();

        // create sub sprites
        this._model.createSprites();

        // create navigator
        this._navigator = new PathNavigator(this, new Pathfinding.BreadthFirstFinder({
            diagonalMovement: Pathfinding.DiagonalMovement.Always,
        }));
        // handle animations
        this.animator = new HustlerAnimator(this);
    }

    update()
    {
        // update animation frames
        this.animator.update();
        // path finding
        this.navigator.update();
    }
}