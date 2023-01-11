import Hustler, { Direction } from 'game/entities/Hustler';

export default class HustlerAnimator {
  private hustler: Hustler;

  constructor(hustler: Hustler) {
    this.hustler = hustler;
  }

  update() 
  {
    if (!this.hustler.active)
      return;

    if (this.hustler.moveDirection === Direction.None) 
    {
      const standFrame = this.hustler.texture.key + '_stand' + (this.hustler.lastDirection !== Direction.None ? this.hustler.lastDirection : Direction.East);
      // reset to the first frame of the anim
      if (this.hustler.frame.name !== standFrame)
        this.hustler.setFrame(standFrame);

      this.hustler.stopAfterDelay(100);
      return;
    }

    this.hustler.play(this.hustler.texture.key + this.hustler.moveDirection, true);
  }
}
