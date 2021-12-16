import { Base, Categories, CharacterCategories, SpritesMap } from "game/constants/Sprites";

const createCharacterBaseAnimations = (anims: Phaser.Animations.AnimationManager): void => {
    anims.create({
        key: SpritesMap[Categories.Character][Base.Male][CharacterCategories.Base] + "_right",
        frames: anims.generateFrameNumbers(SpritesMap[Categories.Character][Base.Male][CharacterCategories.Base], {
            start: 0,
            end: 7
        }),
        frameRate: 15,
        repeat: -1
    });

    anims.create({
        key: SpritesMap[Categories.Character][Base.Male][CharacterCategories.Base] + "_left",
        frames: anims.generateFrameNumbers(SpritesMap[Categories.Character][Base.Male][CharacterCategories.Base], {
            start: 8,
            end: 15
        }),
        frameRate: 15,
        repeat: -1
    });

    anims.create({
        key: SpritesMap[Categories.Character][Base.Male][CharacterCategories.Base] + "_front",
        frames: anims.generateFrameNumbers(SpritesMap[Categories.Character][Base.Male][CharacterCategories.Base], {
            start: 16,
            end: 23
        }),
        frameRate: 15,
        repeat: -1
    });

    anims.create({
        key: SpritesMap[Categories.Character][Base.Male][CharacterCategories.Base] + "_back",
        frames: anims.generateFrameNumbers(SpritesMap[Categories.Character][Base.Male][CharacterCategories.Base], {
            start: 24,
            end: 31
        }),
        frameRate: 15,
        repeat: -1
    });
}

export { createCharacterBaseAnimations }