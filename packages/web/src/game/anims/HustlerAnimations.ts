import Hustler from 'game/entities/Hustler';

export const createHustlerAnimations = (
  scene: Phaser.Scene,
  key: string,
): void => {
  const anims = scene.anims;
  const scale = 0.15;

  // TODO: move elsewhere
  // create icon frame
  const frame = new Phaser.Textures.Frame(scene.textures.get(key), key + '_icon', 0, 0, 5, 32, 24);
  (scene.textures.get(key).frames as any)[key + '_icon'] = frame;

  anims.create({
    key: key + '_right',
    frames: anims.generateFrameNumbers(key, {
      start: 7,
      end: 0, 
    }),
    frameRate: Hustler.DEFAULT_VELOCITY / scale,
    repeat: -1,
  });

  anims.create({
    key: key + '_left',
    frames: anims.generateFrameNumbers(key, {
      start: 39,
      end: 32,
    }),
    frameRate: Hustler.DEFAULT_VELOCITY / scale,
    repeat: -1,
  });

  anims.create({
    key: key + '_front',
    frames: anims.generateFrameNumbers(key, {
      start: 55,
      end: 48,
    }),
    frameRate: Hustler.DEFAULT_VELOCITY / scale,
    repeat: -1,
  });

  anims.create({
    key: key + '_back',
    frames: anims.generateFrameNumbers(key, {
      start: 23,
      end: 16,
    }),
    frameRate: Hustler.DEFAULT_VELOCITY / scale,
    repeat: -1,
  });
};
