import { Base, Categories, SpritesMap } from "game/constants/Sprites";
import { createHustlerAnimations } from "./HustlerAnimations";

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
                createHustlerAnimations(this.anims, categories);
            else
                Object.values(categories).forEach(v => {
                    createHustlerAnimations(this.anims, v);
                });
        });
    }
}