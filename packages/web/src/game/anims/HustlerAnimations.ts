import Hustler from 'game/entities/Hustler';

export const createHustlerAnimations = (
  anims: Phaser.Animations.AnimationManager,
  key: string,
): void => {
  const scale = 0.15;

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
