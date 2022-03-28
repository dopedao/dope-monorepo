import Hustler from 'game/entities/Hustler';

export const createHustlerAnimations = (
  scene: Phaser.Scene,
  key: string,
): void => {
  const texture = scene.textures.get(key);
  const anims = scene.anims;
  const scale = 0.15;

  // TODO: move elsewhere
  // create icon frame
  texture.add(key + '_icon', 0, 15, 240 + 10, 35, 24);

  // stand frames
  texture.add(key + '_stand_right', 0, 0, 240, 60, 60);
  texture.add(key + '_stand_back', 0, 0, 300, 60, 60);
  texture.add(key + '_stand_left', 0, 0, 360, 60, 60);
  texture.add(key + '_stand_front', 0, 0, 420, 60, 60);

  anims.create({
    key: key + '_right',
    frames: anims.generateFrameNumbers(key, {
      start: 0,
      end: 7,
    }),
    frameRate: Hustler.DEFAULT_VELOCITY / scale,
    repeat: -1,
  });

  anims.create({
    key: key + '_left',
    frames: anims.generateFrameNumbers(key, {
      start: 32,
      end: 39,
    }),
    frameRate: Hustler.DEFAULT_VELOCITY / scale,
    repeat: -1,
  });

  anims.create({
    key: key + '_front',
    frames: anims.generateFrameNumbers(key, {
      start: 48,
      end: 55,
    }),
    frameRate: Hustler.DEFAULT_VELOCITY / scale,
    repeat: -1,
  });

  anims.create({
    key: key + '_back',
    frames: anims.generateFrameNumbers(key, {
      start: 16,
      end: 23,
    }),
    frameRate: Hustler.DEFAULT_VELOCITY / scale,
    repeat: -1,
  });
};
