import { Base, SpritesMap } from "game/constants/Sprites";
import { createCharacterBaseAnimations } from "./CharacterAnimations";

export default class GameAnimations
{
    anims: Phaser.Animations.AnimationManager;

    constructor(anims: Phaser.Animations.AnimationManager)
    {
        this.anims = anims;
    }

    create(): void
    {
        createCharacterBaseAnimations(this.anims);
    }
}