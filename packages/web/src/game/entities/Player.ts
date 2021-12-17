import { throwServerError } from "@apollo/client";
import { Base, Categories, CharacterCategories, SpritesMap } from "game/constants/Sprites";
import PlayerModel from "game/gfx/models/PlayerModel";
import { MaleBody_OrderBy } from "generated/graphql";

export default class Player extends Phaser.Physics.Arcade.Sprite
{
    public static readonly DEFAULT_VELOCITY: number = 85;

    private _model: PlayerModel;
    get model() { return this._model; }

    constructor(x: number, y: number, model: PlayerModel = new PlayerModel(Base.Male), scene: Phaser.Scene, frame?: number)
    {
        super(scene, x, y, SpritesMap[Categories.Character][Base.Male][CharacterCategories.Base], frame);
        this._model = model;

        this.scaleY *= 1.8;
        this.scaleX *= 1.6;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        //this.setCollideWorldBounds(true);
        this.body.setSize(this.body.width * 0.35, this.body.height * 0.25);
        this.body.offset.y += 7.5;

        // create sub sprites
        this._model.createSprites(this.scene, new Phaser.Math.Vector2(this.x, this.y), new Phaser.Math.Vector2(this.scaleX, this.scaleY));
    }

    update(mainCursors: Phaser.Types.Input.Keyboard.CursorKeys, eqCursors?: Phaser.Types.Input.Keyboard.CursorKeys): void
    {
        let dir = "";

        if (mainCursors.up.isDown || eqCursors?.up.isDown)
        {
            dir = "_back";
            this.setVelocity(0, -Player.DEFAULT_VELOCITY);
            this.body.offset.x = 6;
            this.play(this.texture.key + dir, true);
        }
        else if (mainCursors.down.isDown || eqCursors?.down.isDown)
        {
            dir = "_front";
            this.setVelocity(0, Player.DEFAULT_VELOCITY);
            this.body.offset.x = 6;
            this.play(this.texture.key + dir, true);
        }
        else if (mainCursors.left.isDown || eqCursors?.left.isDown)
        {
            dir = "_left";
            this.setVelocity(-Player.DEFAULT_VELOCITY, 0);
            this.body.offset.x = 8;
            this.play(this.texture.key + dir, true);
        }
        else if (mainCursors.right.isDown || eqCursors?.right.isDown)
        {
            dir = "_right";
            this.setVelocity(Player.DEFAULT_VELOCITY, 0);
            this.body.offset.x = 6;
            this.play(this.texture.key + dir, true);
        }
        else 
        {
            this.setVelocity(0, 0);
            // reset to the first frame of the anim
            if (this.anims.currentAnim && this.anims.currentFrame.index != 0)
                this.anims.setCurrentFrame(this.anims.currentAnim.frames[0]);
            this._model.sprites.forEach(sprite => sprite.anims.currentAnim && sprite.anims.currentFrame.index != 0 ? 
                sprite.anims.setCurrentFrame(sprite.anims.currentAnim.frames[0]) : null);
            this.stopAfterDelay(100);
        }

        this._model.updateSpritesPosition(new Phaser.Math.Vector2(this.x, this.y), dir);
    }
}