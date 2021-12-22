import { Base, Categories, CharacterCategories, SpritesMap } from "game/constants/Sprites";
import HustlerModel from "game/gfx/models/HustlerModel";

export default class Hustler extends Phaser.Physics.Matter.Sprite
{
    public static readonly DEFAULT_VELOCITY: number = 1.7;
    public static readonly DEFAULT_MASS: number = 70;

    private _model: HustlerModel;
    
    private controlsArrows: Phaser.Types.Input.Keyboard.CursorKeys;
    private controlsWasd: Phaser.Types.Input.Keyboard.CursorKeys;

    get model() { return this._model; }

    constructor(x: number, y: number, model: HustlerModel, world: Phaser.Physics.Matter.World, frame?: number)
    {
        super(world, x, y, SpritesMap[Categories.Character][Base.Male][CharacterCategories.Base], frame);
        this._model = model;
        this._model.hustler = this;

        this.scaleY *= 1.8;
        this.scaleX *= 1.6;

        // add to the scene, to be drawn
        world.scene.add.existing(this);

        // give the character an ellipse like collider
        this.setCircle(20);
        // prevent angular momentum from rotating our body
        this.setFixedRotation();

        // create sub sprites
        this._model.createSprites();

        this.controlsArrows = this.scene.input.keyboard.createCursorKeys();
        this.controlsWasd = this.scene.input.keyboard.addKeys({
          up: Phaser.Input.Keyboard.KeyCodes.W, 
          down: Phaser.Input.Keyboard.KeyCodes.S, 
          left: Phaser.Input.Keyboard.KeyCodes.A, 
          right: Phaser.Input.Keyboard.KeyCodes.D 
        }) as Phaser.Types.Input.Keyboard.CursorKeys;
    }

    update(): void
    {
        let dir = "";

        if (this.controlsWasd.up.isDown || this.controlsArrows?.up.isDown)
        {
            dir = "_back";
            // this.setVelocity(0, -Player.DEFAULT_VELOCITY);
            this.setVelocityY(-Hustler.DEFAULT_VELOCITY);
            this._model.updateSprites(true);
            //this.body.offset.x = 6;
        }
        else if (this.controlsWasd.down.isDown || this.controlsArrows?.down.isDown)
        {
            dir = "_front";
            // this.setVelocity(0, Player.DEFAULT_VELOCITY);
            this.setVelocityY(Hustler.DEFAULT_VELOCITY);
            this._model.updateSprites(true);
            //this.body.offset.x = 6;
        }
        else
        {
            this.setVelocityY(0);
        }

        if (this.controlsWasd.left.isDown || this.controlsArrows?.left.isDown)
        {
            dir = "_left";
            // this.setVelocity(-Player.DEFAULT_VELOCITY, 0);
            this.setVelocityX(-Hustler.DEFAULT_VELOCITY);
            this._model.updateSprites(true);
            //this.body.offset.x = 8;
        }
        else if (this.controlsWasd.right.isDown || this.controlsArrows?.right.isDown)
        {
            dir = "_right";
            // this.setVelocity(Player.DEFAULT_VELOCITY, 0);
            this.setVelocityX(Hustler.DEFAULT_VELOCITY);
            this._model.updateSprites(true);
            //this.body.offset.x = 6;
        }
        else
        {
            this.setVelocityX(0);
        }
        
        if (dir === "")
        {
            this.setVelocity(0, 0);
            this.model.updateSprites(true);
            // reset to the first frame of the anim
            if (this.anims.currentAnim && !this.anims.currentFrame.isLast)
                this.anims.setCurrentFrame(this.anims.currentAnim.getLastFrame());
            this.stopAfterDelay(100);

            this._model.stopSpritesAnim();
            return;
        }

        this.play(this.texture.key + dir, true);
        // pos is undefined so that only the animations of the sprites
        // get updated
        this._model.updateSprites(true, dir);
    }
}