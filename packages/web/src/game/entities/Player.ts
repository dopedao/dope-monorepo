import { throwServerError } from "@apollo/client";
import { Base, Categories, CharacterCategories, SpritesMap } from "game/constants/Sprites";
import PlayerModel from "game/gfx/models/PlayerModel";
import { MaleBody_OrderBy } from "generated/graphql";

export default class Player extends Phaser.Physics.Matter.Sprite
{
    public static readonly DEFAULT_VELOCITY: number = 1.2;
    public static readonly DEFAULT_MASS: number = 70;

    private _model: PlayerModel;

    get model() { return this._model; }

    constructor(x: number, y: number, model: PlayerModel = new PlayerModel(Base.Male), world: Phaser.Physics.Matter.World, frame?: number)
    {
        super(world, x, y, SpritesMap[Categories.Character][Base.Male][CharacterCategories.Base], frame);
        this._model = model;

        this.scaleY *= 1.8;
        this.scaleX *= 1.6;

        world.scene.add.existing(this);

        // give the character an ellipse like collider
        this.setCircle(20);
        // prevent angular momentum
        this.setFixedRotation();

        // create sub sprites
        this._model.createSprites(this.scene, new Phaser.Math.Vector2(this.x, this.y), new Phaser.Math.Vector2(this.scaleX, this.scaleY));
    }

    update(mainCursors: Phaser.Types.Input.Keyboard.CursorKeys, eqCursors?: Phaser.Types.Input.Keyboard.CursorKeys): void
    {
        let dir = "";

        if (mainCursors.up.isDown || eqCursors?.up.isDown)
        {
            dir = "_back";
            // this.setVelocity(0, -Player.DEFAULT_VELOCITY);
            this.setVelocityY(-Player.DEFAULT_VELOCITY);
            this._model.updateSprites(new Phaser.Math.Vector2(this.x, this.y));
            //this.body.offset.x = 6;
        }
        else if (mainCursors.down.isDown || eqCursors?.down.isDown)
        {
            dir = "_front";
            // this.setVelocity(0, Player.DEFAULT_VELOCITY);
            this.setVelocityY(Player.DEFAULT_VELOCITY);
            this._model.updateSprites(new Phaser.Math.Vector2(this.x, this.y));
            //this.body.offset.x = 6;
        }
        else
        {
            this.setVelocityY(0);
            this._model.updateSprites(new Phaser.Math.Vector2(this.x, this.y));
        }

        if (mainCursors.left.isDown || eqCursors?.left.isDown)
        {
            dir = "_left";
            // this.setVelocity(-Player.DEFAULT_VELOCITY, 0);
            this.setVelocityX(-Player.DEFAULT_VELOCITY);
            this._model.updateSprites(new Phaser.Math.Vector2(this.x, this.y));
            //this.body.offset.x = 8;
        }
        else if (mainCursors.right.isDown || eqCursors?.right.isDown)
        {
            dir = "_right";
            // this.setVelocity(Player.DEFAULT_VELOCITY, 0);
            this.setVelocityX(Player.DEFAULT_VELOCITY);
            this._model.updateSprites(new Phaser.Math.Vector2(this.x, this.y));
            //this.body.offset.x = 6;
        }
        else
        {
            this.setVelocityX(0);
            this._model.updateSprites(new Phaser.Math.Vector2(this.x, this.y));
        }
        
        if (dir === "")
        {
            this.setVelocity(0, 0);
            this._model.updateSprites(new Phaser.Math.Vector2(this.x, this.y));
            // reset to the first frame of the anim
            if (this.anims.currentAnim && !this.anims.currentFrame.isLast)
                this.anims.setCurrentFrame(this.anims.currentAnim.getLastFrame());
            this._model.sprites.forEach(sprite => sprite.anims.currentAnim && !sprite.anims.currentFrame.isLast ? 
                sprite.anims.setCurrentFrame(sprite.anims.currentAnim.getLastFrame()) : null);
            this.stopAfterDelay(100);
            this._model.sprites.forEach(sprite => sprite.stopAfterDelay(100));
            return;
        }

        console.log(this.texture.key + dir);
        this.play(this.texture.key + dir, true);
        // pos is undefined so that only the animations of the sprites
        // get updated
        this._model.updateSprites(undefined, dir);
    }
}