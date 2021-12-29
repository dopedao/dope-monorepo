import TextBox from 'phaser3-rex-plugins/templates/ui/textbox/textbox';
import GameScene from '../../scenes/Game';
import Palette from 'game/constants/Palette';
import UIScene from 'game/scenes/UI';

interface TextBoxConfig
{
    wrapWidth: number, 
    fixedWidth: number, 
    fixedHeight: number
}

const GetValue = Phaser.Utils.Objects.GetValue;
export const createTextBox = (scene: UIScene, config: TextBoxConfig, icon?: Phaser.GameObjects.GameObject) => {
    var wrapWidth = GetValue(config, 'wrapWidth', 0);
    var fixedWidth = GetValue(config, 'fixedWidth', 0);
    var fixedHeight = GetValue(config, 'fixedHeight', 0);
    var textBox = scene.rexUI.add.textBox({
            anchor: {
                centerX: "center",
                centerY: "90%"
            },

            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 5, Palette.COLOR_PRIMARY)
                .setStrokeStyle(5, Palette.COLOR_LIGHT),

            icon: icon ?? scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, Palette.COLOR_DARK),

            // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
            text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

            action: scene.add.image(0, 0, 'nextPage').setTint(Palette.COLOR_PRIMARY).setVisible(false),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        })
        .setOrigin(0)
        .layout();

    textBox
        .setInteractive()
        .on('pointerdown', function () {
            var icon = textBox.getElement('action')!.setActive(false);
            textBox.resetChildVisibleState(icon);
            if (textBox.isTyping) {
                textBox.stop(true);
            } else {
                if (textBox.isLastPage)
                {
                    textBox.destroy();
                    return;
                }
                textBox.typeNextPage();
            }
        }, textBox)
        .on('pageend', function () {
            if (textBox.isLastPage) {
                return;
            }

            var icon = textBox.getElement('action')!.setActive(true);
            textBox.resetChildVisibleState(icon);
            (icon as any).y -= 30;
            var tween = scene.tweens.add({
                targets: icon,
                y: '+=30', // '+=100'
                ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 500,
                repeat: 0, // -1: infinity
                yoyo: false
            });
        }, textBox)
    //.on('type', function () {
    //})

    return textBox;
}

var getBuiltInText = (scene: UIScene, wrapWidth: number, fixedWidth: number, fixedHeight: number) => {
    return scene.add.text(0, 0, '', {
            font: 'Dope',

            fontSize: '20px',
            wordWrap: {
                width: wrapWidth
            },
            maxLines: 3
        })
        .setFixedSize(fixedWidth, fixedHeight);
}

var getBBcodeText = (scene: UIScene, wrapWidth: number, fixedWidth: number, fixedHeight: number) => {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fontFamily: 'Dope',

        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        fontSize: '20px',
        wrap: {
            mode: 'word',
            width: wrapWidth
        },
        maxLines: 3
    })
}