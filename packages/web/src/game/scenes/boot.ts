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
    this.scene.start('PreloadScene');
  }
}