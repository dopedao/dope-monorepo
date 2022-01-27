import EventHandler from 'game/handlers/events/EventHandler';
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
      this.scale.setGameSize(this.scale.parent.clientWidth, this.scale.parent.clientHeight);
      // this.scale.setParentSize(this.scale.parent.clientWidth, this.scale.parent.clientHeight);
    });

    this.scale.on(Phaser.Scale.Events.LEAVE_FULLSCREEN, () => {
      this.scale.setGameSize(this.scale.parent.clientWidth, this.scale.parent.clientHeight);
      //this.scale.setParentSize(this.scale.parent.clientWidth, this.scale.parent.clientHeight);
    });

    window.onresize = () => this.scale.setGameSize(this.scale.parentSize.width, this.scale.parentSize.height);

    // free plugins
    this.events.on(Phaser.Core.Events.DESTROY, () => {
      EventHandler.emitter().removeAllListeners();
      this.game.plugins.removeScenePlugin('rexUI');
    });
    
    this.scene.start('PreloadScene');
  }
}
