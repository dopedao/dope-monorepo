import UIScene from 'game/scenes/UI';
import TextBox from 'phaser3-rex-plugins/templates/ui/textbox/TextBox';
import { getBBcodeText } from 'game/ui/rex/RexUtils';
import Palette from 'game/constants/Palette';
import Label from 'phaser3-rex-plugins/templates/ui/label/Label';
import { GameObjects } from 'phaser';
import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext';
import Buttons from 'phaser3-rex-plugins/templates/ui/buttons/Buttons';

interface TextBoxConfig {
  wrapWidth: number;
  fixedWidth: number;
  fixedHeight: number;
}

export default class DialogueTextBox extends TextBox {
  private choices?: Buttons;
  private selectedChoice?: number;

  constructor(
    scene: UIScene,
    wrapWidth?: number,
    fixedWidth?: number,
    fixedHeight?: number,
    icon?: Phaser.GameObjects.GameObject,
    background?: Phaser.GameObjects.GameObject,
  ) {
    super(scene, {
      anchor: {
        centerX: 'center',
        centerY: '90%',
      },

      background:
        background ??
        scene.rexUI.add
          .roundRectangle(0, 0, 2, 2, 0, Palette.COLOR_PRIMARY)
          .setStrokeStyle(5, Palette.COLOR_DARK).setAlpha(0.6),

      icon: icon ?? scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, Palette.COLOR_LIGHT),
      // iconMask: true,

      // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
      text: getBBcodeText(scene, wrapWidth ?? 0, fixedWidth ?? 0, fixedHeight ?? 0).setColor(Palette.COLOR_DARK),

      // action: scene.add.image(0, 0, 'nextPage').setTint(Palette.COLOR_LIGHT).setVisible(false),

      space: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
        icon: 10,
        text: 10,
      },
    });

    scene.add.existing(this);

    this.setOrigin(0, 1);
    // this.setAlpha(0.7);
    (this.getElement('icon') as any)?.setDepth(this.depth + 1);
    this.layout();

    this.setInteractive()
      .on('pointerdown', this.onPointerDown)
      .on('pageend', this.onPageEnd)
      .on('destroy', this.onDestroy);
  }

  start(content: string, typingSpeed?: number, choices?: Array<string>): this {
    super.start(content, typingSpeed);

    if (choices) {
      this.choices = (this.scene as UIScene).rexUI.add.buttons({
        orientation: 'y',
        space: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
          item: 8
        },
        buttons: choices.map(choice => (this.scene as UIScene).rexUI.add.label({
          text: getBBcodeText(this.scene as UIScene, 0, 0, 0).setColor(Palette.COLOR_DARK).setText(choice).setAlpha(0.4),
        })),
        background: (this.scene as UIScene).rexUI.add.roundRectangle(0, 0, 0, 0, 5, 0x4a4a4a).setAlpha(0.2),
      }).on('button.over', (button: Label) => this.choices!.buttons.indexOf(button) !== this.selectedChoice && (button.getElement('text') as BBCodeText)?.setAlpha(1))
        .on('button.out', (button: Label) => this.choices!.buttons.indexOf(button) !== this.selectedChoice && (button.getElement('text') as BBCodeText)?.setAlpha(0.4))
        .on('button.click', (button: Label) => {
          // visually unselect all buttons
          this.choices?.forEachButtton((button: GameObjects.GameObject) => ((button as any)?.getElement('text') as any)?.setAlpha(0.4));
          // visually select this button
          (button.getElement('text') as BBCodeText)?.setAlpha(1);
          this.selectedChoice = this.choices!.buttons.indexOf(button);
        });
      this.add(this.choices).layout();
    }

    return this;
  }

  update() {
    super.on;
    console.log('called');
  }

  onPageEnd() {
    if (this.isLastPage) {
      return;
    }
    const ele = this.getElement('action')! as any;
    const icon = ele.setActive(true);
    this.resetChildVisibleState(icon);
    (icon as any).y -= 30;
    const tween = this.scene.tweens.add({
      targets: icon,
      y: '+=30', // '+=100'
      ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      repeat: 0, // -1: infinity
      yoyo: false,
    });
  }

  onPointerDown() {
    // var icon = this.getElement('action')!.setActive(false);
    // this.resetChildVisibleState(icon);
    if (this.isTyping) {
      this.stop(true);
    } else {
      if (this.isLastPage) {
        const tmp = this.selectedChoice;
        if (this.choices && this.selectedChoice === undefined)
          return;
        else if (this.choices && this.selectedChoice !== undefined) {
          this.choices.destroy();
          this.choices = undefined;
          this.selectedChoice = undefined;
        }

        this.emit('complete', tmp);
        return;
      }
      this.typeNextPage();
    }
  }

  onDestroy() {}
}
