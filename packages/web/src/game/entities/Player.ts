import { throwServerError } from "@apollo/client";
import { Base, spritesDict } from "game/constants/Sprites";
import PlayerModel from "game/gfx/models/PlayerModel";

export default class Player extends Phaser.Physics.Arcade.Sprite
{
    model: PlayerModel;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(x: number, y: number, model: PlayerModel = new PlayerModel(Base.Male), scene: Phaser.Scene, frame?: number)
    {
        super(scene, x, y, spritesDict[model.base].front, frame);
        this.model = model;

        this.scale *= 1.8;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        //this.setCollideWorldBounds(true);
        this.body.setSize(this.body.width * 0.35, this.body.height * 0.4);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update(): void
    {
        if (!this.cursors)
            return;
        
        if (this.cursors.up.isDown)
        {
            this.setVelocity(0, -75);
            this.body.offset.x = 4;
            this.play(spritesDict[this.model.base].back, true);
        }
        else if (this.cursors.down.isDown)
        {
            this.setVelocity(0, 75);
            this.body.offset.x = 6;
            this.play(spritesDict[this.model.base].front, true);
        }
        else if (this.cursors.left.isDown)
        {
            this.setVelocity(-75, 0);
            this.body.offset.x = 8;
            this.play(spritesDict[this.model.base].right, true);
        }
        else if (this.cursors.right.isDown)
        {
            this.setVelocity(75, 0);
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