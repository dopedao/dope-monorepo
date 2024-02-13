import UIScene from 'game/scenes/UI';
import TextBox from 'phaser3-rex-plugins/templates/ui/textbox/TextBox';
import { CreateSpeechBubbleShape, getBBcodeText } from 'game/ui/rex/RexUtils';
import Palette from 'game/constants/Palette';
import { th } from 'date-fns/locale';

interface TextBoxConfig {
  wrapWidth: number;
  fixedWidth: number;
  fixedHeight: number;
}

export default class SpeechBubbleTextBox extends TextBox {
  constructor(
    scene: UIScene,
    x: number,
    y: number,
    fillColor?: number,
    strokeColor?: number,
    wrapWidth?: number,
    fixedWidth?: number,
    fixedHeight?: number,
    icon?: Phaser.GameObjects.GameObject,
    background?: Phaser.GameObjects.GameObject,
  ) {
    super(scene, {
      x: x,
      y: y,

      background:
        icon ??
        CreateSpeechBubbleShape(
          scene,
          fillColor ?? Palette.COLOR_PRIMARY,
          strokeColor ?? Palette.COLOR_LIGHT,
        ),

      // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
      text: getBBcodeText(scene, wrapWidth ?? 0, fixedWidth ?? 0, fixedHeight ?? 0),

      action: scene.add.image(0, 0, 'nextPage').setTint(Palette.COLOR_LIGHT).setVisible(false),

      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 25,
        icon: 10,
        text: 10,
      },
    });

    scene.add.existing(this);

    this.setOrigin(0, 1);
    this.layout();

    this.setInteractive()
      .on('pointerdown', this.onPointerDown)
      .on('pageend', this.onPageEnd)
      .on('destroy', this.onDestroy);
  }

  update() {}

  follow(object: Phaser.GameObjects.GameObject) {
    if (object instanceof Phaser.GameObjects.Sprite) {
      const sprite = object as Phaser.GameObjects.Sprite;
      this.setPosition(sprite.x + 10, sprite.y - sprite.height / 2);
    }
  }

  onPageEnd() {
    if (this.isLastPage) {
      return;
    }
    const ele = this.getElement('action')! as any;
    const icon = ele.setActive(true);
    this.resetChildVisibleState(icon);
    (icon as any).y -= 30;
    this.scene.tweens.add({
      targets: icon,
      y: '+=30', // '+=100'
      ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      repeat: 0, // -1: infinity
      yoyo: false,
    });
  }

  onPointerDown() {
    const ele = this.getElement('action')! as any;
    const icon = ele.setActive(false);
    this.resetChildVisibleState(icon);
    if (this.isTyping) {
      this.stop(true);
    } else {
      if (this.isLastPage) {
        this.destroy();
        return;
      }
      this.typeNextPage();
    }
  }

  onDestroy() {}
}
