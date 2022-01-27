import HustlerAnimator from "game/anims/HustlerAnimator";
import { Base, Categories, CharacterCategories, SpritesMap } from "game/constants/Sprites";
import HustlerModel from "game/gfx/models/HustlerModel";
import UIScene from "game/scenes/UI";
import PathNavigator from "game/world/PathNavigator";
import PF from "pathfinding";
import BBCodeText from "phaser3-rex-plugins/plugins/bbcodetext";

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
    public static readonly DEFAULT_VELOCITY: number = 4;
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

    private _hitboxSensor: MatterJS.BodyType;
    private hoverText?: BBCodeText;

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

    get collider() { return this.body; }
    get hitboxSensor() { return this._hitboxSensor; }

    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, model: HustlerModel, frame?: number)
    {
        super(world, x, y, SpritesMap[Categories.Character][Base.Male][CharacterCategories.Base], frame);

        this.name = "Hustler";
        
        this._model = model;
        this._model.hustler = this;

        // add to the scene, to be drawn
        world.scene.add.existing(this);

        // create main body
        const { Body, Bodies } = (Phaser.Physics.Matter as any).Matter;
        const colliderBody = Bodies.rectangle(0, 0, this.width * 0.48, this.height * 0.35, {
            label: "collider",
            collisionFilter: {
                group: -69
            },
            chamfer: { radius: 7.2 },
        } as MatterJS.BodyType);
        
        this._hitboxSensor = this.scene.matter.add.rectangle(this.x, this.y - this.displayHeight / 5, this.displayWidth * 0.6, this.displayHeight * 0.8, {
            label: "hitboxSensor",
            isSensor: true,
            gameObject: this,
            // collisionFilter: {
            //     group: -69
            // },
        } as MatterJS.BodyType);
        
        this.setExistingBody(colliderBody);
        
        this.setPosition(x, y);
        
        this.setDepth(35);

        // offset the hustler texture from the body
        this.setOrigin(0.5, 0.65);
        // make it a bit bigger
        this.setScale(1);

        // prevent angular momentum from rotating our body
        this.setFixedRotation();

        // create sub sprites
        this._model.createSprites();

        // display name on hover
        const uiScene = this.scene.scene.get('UIScene') as UIScene;
        this.setInteractive({ useHandCursor: true });
        this.on('pointerover', () => {
            this.hoverText = uiScene.rexUI.add.BBCodeText(0, 0, this.name, {
                fontFamily: 'Dope',
                fontSize: '20px',
                color: '#ffffff'
            });
        });
        this.on('pointerout', () => {
            this.hoverText?.destroy();
            this.hoverText = undefined;
        });

        // create navigator
        this._navigator = new PathNavigator(this, new PF.AStarFinder({
            // heuristic: PF.Heuristic.chebyshev,
            allowDiagonal: true,
            dontCrossCorners: true,
        } as any));
        // handle animations
        this._animator = new HustlerAnimator(this);
    }

    // sets correct sprite facing towards point
    lookAt(x: number, y: number)
    {
        const angle = Phaser.Math.Angle.Between(this.x, this.y, x, y);

        // east
        if (angle >= -Phaser.Math.TAU && angle <= Phaser.Math.TAU)
        {
            this._lastDirection = Direction.East;
        }
        // south
        else if (angle >= 0 && angle <= Math.PI)
        {
            this._lastDirection = Direction.South;
        }
        // north
        else if (angle <= 0 && angle >= -Math.PI)
        {
            this._lastDirection = Direction.North;            
        }
        // west
        if (angle <= -Phaser.Math.TAU || angle >= Phaser.Math.PI2)
        {
            this._lastDirection  = Direction.West;
        }
        

        this.play(this.texture.key + this._lastDirection);
        this.model.updateSprites(false, this._lastDirection);
        
        this.model.stopSpritesAnim(false);
        this.stop();
    }

    // setOrigin(x: number, y?: number)
    // {
    //     super.setOrigin(x, y);
    //     this._model.setOrigin(x, y);
    //     return this;
    // }

    setScale(x: number, y?: number)
    {
        super.setScale(x, y);
        // update hitbox sensor scale
        (Phaser.Physics.Matter as any).Matter.Body.scale(this._hitboxSensor, x, y ?? x);
        // update model scale
        this._model.setScale(x, y);
        return this;
    }

    setDepth(value: number)
    {
        super.setDepth(value);
        // update model depth
        this._model.setDepth(value);
        return this;
    }

    update()
    {
        // make hovertext follow us
        this.hoverText?.setPosition(
            (this.x - this.scene.cameras.main.worldView.x) * this.scene.cameras.main.zoom - (this.hoverText.displayWidth / 2), 
            ((this.y - this.scene.cameras.main.worldView.y) * this.scene.cameras.main.zoom) - ((this.displayHeight / 1.5) * this.scene.cameras.main.zoom));

        // update animation frames
        this.animator.update();
        // path finding
        this.navigator.update();
        // update hitbox pos
        (Phaser.Physics.Matter as any).Matter.Body.setPosition(this.hitboxSensor, { x: this.x, y: this.y - this.displayHeight / 5 });
    }
}