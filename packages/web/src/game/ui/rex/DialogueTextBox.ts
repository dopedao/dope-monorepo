import UIScene from "game/scenes/UI";
import TextBox from "phaser3-rex-plugins/templates/ui/textbox/TextBox";
import { getBBcodeText } from "game/ui/rex/RexUtils";
import Palette from "game/constants/Palette";

interface TextBoxConfig
{
    wrapWidth: number, 
    fixedWidth: number, 
    fixedHeight: number
}

export default class DialogueTextBox extends TextBox
{
    constructor(scene: UIScene, wrapWidth?: number, fixedWidth?: number, fixedHeight?: number, icon?: Phaser.GameObjects.GameObject, background?: Phaser.GameObjects.GameObject)
    {
        super(scene, {
            anchor: {
                centerX: "center",
                centerY: "90%"
            },

            background: background ?? scene.rexUI.add.roundRectangle(0, 0, 2, 2, 5, Palette.COLOR_PRIMARY)
                .setStrokeStyle(5, Palette.COLOR_LIGHT),

            icon: icon ?? scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, Palette.COLOR_DARK),

            // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
            text: getBBcodeText(scene, wrapWidth ?? 0, fixedWidth ?? 0, fixedHeight ?? 0),

            action: scene.add.image(0, 0, 'nextPage').setTint(Palette.COLOR_PRIMARY).setVisible(false),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        });

        scene.add.existing(this);

        this.setOrigin(0, 1);
        this.layout();

        this.setInteractive()
            .on('pointerdown', this.onPointerDown)
            .on('pageend', this.onPageEnd)
            .on('destroy', this.onDestroy);
    }

    update()
    {
        super.on
        console.log('called');
    }

    onPageEnd()
    {
        if (this.isLastPage) {
            return;
        }

        var icon = this.getElement('action')!.setActive(true);
        this.resetChildVisibleState(icon);
        (icon as any).y -= 30;
        var tween = this.scene.tweens.add({
            targets: icon,
            y: '+=30', // '+=100'
            ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            repeat: 0, // -1: infinity
            yoyo: false
        });
    }

    onPointerDown()
    {
        var icon = this.getElement('action')!.setActive(false);
        this.resetChildVisibleState(icon);
        if (this.isTyping) {
            this.stop(true);
        } else {
            if (this.isLastPage)
            {
                this.emit('complete');
                return;
            }
            this.typeNextPage();
        }
    }

    onDestroy()
    {
        
    }
}
