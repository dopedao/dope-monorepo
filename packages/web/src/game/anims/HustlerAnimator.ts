import Hustler, { Direction } from 'game/entities/Hustler';

export default class HustlerAnimator {
  private hustler: Hustler;

  constructor(hustler: Hustler) {
    this.hustler = hustler;
  }

  update() {
    if (this.hustler.moveDirection === Direction.None) {
      // reset to the first frame of the anim
      if (this.hustler.anims.currentAnim && !this.hustler.anims.currentFrame.isLast)
        this.hustler.anims.setCurrentFrame(this.hustler.anims.currentAnim.getLastFrame());
      this.hustler.stopAfterDelay(100);

      this.hustler.model.stopSpritesAnim();
      return;
    }

    this.hustler.play(this.hustler.texture.key + this.hustler.moveDirection, true);
    this.hustler.model.updateSprites(false, this.hustler.moveDirection);
  }
}
