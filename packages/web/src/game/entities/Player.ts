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

        // attach shadow
        //this.addChild()

        this.scaleY *= 1.8;
        this.scaleX *= 1.6;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        //this.setCollideWorldBounds(true);
        this.body.setSize(this.body.width * 0.35, this.body.height * 0.25);
        this.body.offset.y = this.body.offset.y + 4;
    }

    update(mainCursors: Phaser.Types.Input.Keyboard.CursorKeys, eqCursors?: Phaser.Types.Input.Keyboard.CursorKeys): void
    {   
        if (mainCursors.up.isDown || eqCursors?.up.isDown)
        {
            this.setVelocity(0, -Player.DEFAULT_VELOCITY);
            this.body.offset.x = 6;
            this.play(SpritesMap[Categories.Character][this.model.base][CharacterCategories.Base] + "_back", true);
        }
        else if (mainCursors.down.isDown || eqCursors?.down.isDown)
        {
            this.setVelocity(0, Player.DEFAULT_VELOCITY);
            this.body.offset.x = 6;
            this.play(SpritesMap[Categories.Character][this.model.base][CharacterCategories.Base] + "_front", true);
        }
        else if (mainCursors.left.isDown || eqCursors?.left.isDown)
        {
            this.setVelocity(-Player.DEFAULT_VELOCITY, 0);
            this.body.offset.x = 8;
            this.play(SpritesMap[Categories.Character][this.model.base][CharacterCategories.Base] + "_left", true);
        }
        else if (mainCursors.right.isDown || eqCursors?.right.isDown)
        {
            this.setVelocity(Player.DEFAULT_VELOCITY, 0);
            this.body.offset.x = 6;
            this.play(SpritesMap[Categories.Character][this.model.base][CharacterCategories.Base] + "_right", true);
        }
        else 
        {
            this.setVelocity(0, 0);
            // reset to the first frame of the anim
            // if (this.anims.currentAnim)
            //     this.anims.setCurrentFrame(this.anims.currentAnim.frames[0]);
            this.stop();
        }
    }
}