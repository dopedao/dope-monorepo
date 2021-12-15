import { Base, spritesDict } from "game/constants/Sprites";

const createCharacterAnimations = (anims: Phaser.Animations.AnimationManager): void => {
    anims.create({
        key: spritesDict[Base.Male].back,
        frames: spritesDict[Base.Male].back,
        frameRate: 15,
        repeat: -1
    });

    anims.create({
        key: spritesDict[Base.Male].front,
        frames: spritesDict[Base.Male].front,
        frameRate: 15,
        repeat: -1
    });

    anims.create({
        key: spritesDict[Base.Male].left,
        frames: spritesDict[Base.Male].left,
        frameRate: 15,
        repeat: -1
    });

    anims.create({
        key: spritesDict[Base.Male].right,
        frames: spritesDict[Base.Male].right,
        frameRate: 15,
        repeat: -1
    });
}

export { createCharacterAnimations }