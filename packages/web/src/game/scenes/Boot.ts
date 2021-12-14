import { Scene } from 'phaser';

export default class Boot extends Scene {
  constructor() {
    super({
      key: 'BootScene'
    });
  }

  preload(): void {
    // do some preload boot stuff
  }

  create(): void {
    // scale properly when game enters fullscreen mode
    this.scale.on(Phaser.Scale.Events.ENTER_FULLSCREEN, () => {
      this.scale.setGameSize(window.innerWidth, window.innerHeight);
      this.scale.setParentSize(window.innerWidth, window.innerHeight);
    });

    this.scale.on(Phaser.Scale.Events.LEAVE_FULLSCREEN, () => {
      this.scale.setGameSize(this.game.config.parent.clientWidth, this.game.config.parent.clientHeight);
      this.scale.setParentSize(this.game.config.parent.clientWidth, this.game.config.parent.clientHeight);
    });
    
    this.scene.start('PreloadScene');
  }
}
