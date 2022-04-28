import { Base, Categories, SpritesMap } from 'game/constants/Sprites';
import { createHustlerAnimations } from './HustlerAnimations';

export default class GameAnimations {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  // create all of the game animations
  create(): void {
    // Object.values(SpritesMap[Categories.Character][Base.Male]).forEach(categories => {
    //     if (typeof categories === "string")
    //         createHustlerAnimations(this.anims, categories);
    //     else
    //         Object.values(categories).forEach(v => {
    //             createHustlerAnimations(this.anims, v);
    //         });
    // });
    // Object.values(SpritesMap[Categories.Character][Base.Female]).forEach(categories => {
    //     if (typeof categories === "string")
    //         createHustlerAnimations(this.anims, categories);
    //     else
    //         Object.values(categories).forEach(v => {
    //             createHustlerAnimations(this.anims, v);
    //         });
    // });
    createHustlerAnimations(this.scene, 'male_base');
  }
}
