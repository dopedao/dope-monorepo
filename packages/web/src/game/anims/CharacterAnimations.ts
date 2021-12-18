import { Base, Categories, CharacterCategories, SpritesMap } from "game/constants/Sprites";
import Player from "game/entities/Player";

const createCharacterAnimations = (anims: Phaser.Animations.AnimationManager, key: string): void => {
    const scale = 0.07;

    anims.create({
        key: key + "_right",
        frames: anims.generateFrameNumbers(key, {
            start: 7,
            end: 0,
        }),
        frameRate: Player.DEFAULT_VELOCITY / scale,
        repeat: -1
    });

    anims.create({
        key: key + "_left",
        frames: anims.generateFrameNumbers(key, {
            start: 15,
            end: 8
        }),
        frameRate: Player.DEFAULT_VELOCITY / scale,
        repeat: -1
    });

    anims.create({
        key: key + "_front",
        frames: anims.generateFrameNumbers(key, {
            start: 23,
            end: 16
        }),
        frameRate: Player.DEFAULT_VELOCITY / scale,
        repeat: -1
    });

    anims.create({
        key: key + "_back",
        frames: anims.generateFrameNumbers(key, {
            start: 31,
            end: 24
        }),
        frameRate: Player.DEFAULT_VELOCITY / scale,
        repeat: -1
    });
}

export { createCharacterAnimations }