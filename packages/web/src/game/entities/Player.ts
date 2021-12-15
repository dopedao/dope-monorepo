import { throwServerError } from "@apollo/client";
import { Base, spritesDict } from "game/constants/Sprites";
import PlayerModel from "game/gfx/models/PlayerModel";

export default class Player extends Phaser.Physics.Arcade.Sprite
{
    public static readonly DEFAULT_VELOCITY: number = 85;

    private _model: PlayerModel;
    get model() { return this._model; }

    constructor(x: number, y: number, model: PlayerModel = new PlayerModel(Base.Male), scene: Phaser.Scene, frame?: number)
    {
        super(scene, x, y, spritesDict[model.base].front, frame);
        this._model = model;

        this.scale *= 1.8;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        //this.setCollideWorldBounds(true);
        this.body.setSize(this.body.width * 0.35, this.body.height * 0.4);
    }

    update(mainCursors: Phaser.Types.Input.Keyboard.CursorKeys, eqCursors?: Phaser.Types.Input.Keyboard.CursorKeys): void
    {   
        if (mainCursors.up.isDown || eqCursors?.up.isDown)
        {
            this.setVelocity(0, -Player.DEFAULT_VELOCITY);
            this.body.offset.x = 4;
            this.play(spritesDict[this.model.base].back, true);
        }
        else if (mainCursors.down.isDown || eqCursors?.down.isDown)
        {
            this.setVelocity(0, Player.DEFAULT_VELOCITY);
            this.body.offset.x = 6;
            this.play(spritesDict[this.model.base].front, true);
        }
        else if (mainCursors.left.isDown || eqCursors?.left.isDown)
        {
            this.setVelocity(-Player.DEFAULT_VELOCITY, 0);
            this.body.offset.x = 8;
            this.play(spritesDict[this.model.base].right, true);
        }
        else if (mainCursors.right.isDown || eqCursors?.right.isDown)
        {
            this.setVelocity(Player.DEFAULT_VELOCITY, 0);
            this.body.offset.x = 6;
            this.play(spritesDict[this.model.base].left, true);
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