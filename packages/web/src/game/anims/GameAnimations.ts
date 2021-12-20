import { Base, Categories, SpritesMap } from "game/constants/Sprites";
import { createCharacterAnimations } from "./CharacterAnimations";

export default class GameAnimations
{
    anims: Phaser.Animations.AnimationManager;

    constructor(anims: Phaser.Animations.AnimationManager)
    {
        this.anims = anims;
    }

    // create all of the game animations
    create(): void
    {
        Object.values(SpritesMap[Categories.Character][Base.Male]).forEach(categories => {
            if (typeof categories === "string")
                createCharacterAnimations(this.anims, categories);
            else
                Object.values(categories).forEach(v => {
                    createCharacterAnimations(this.anims, v);
                });
        });
    }
}