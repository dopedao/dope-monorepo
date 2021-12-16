import { Base, Categories, CharacterCategories, SpritesMap } from "game/constants/Sprites";

const createCharacterAnimations = (anims: Phaser.Animations.AnimationManager, key: string): void => {
    anims.create({
        key: key + "_right",
        frames: anims.generateFrameNumbers(key, {
            start: 0,
            end: 7
        }),
        frameRate: 15,
        repeat: -1
    });

    anims.create({
        key: key + "_left",
        frames: anims.generateFrameNumbers(key, {
            start: 8,
            end: 15
        }),
        frameRate: 15,
        repeat: -1
    });

    anims.create({
        key: key + "_front",
        frames: anims.generateFrameNumbers(key, {
            start: 16,
            end: 23
        }),
        frameRate: 15,
        repeat: -1
    });

    anims.create({
        key: key + "_back",
        frames: anims.generateFrameNumbers(key, {
            start: 24,
            end: 31
        }),
        frameRate: 15,
        repeat: -1
    });
}

export { createCharacterAnimations }