import { Base, spritesDict } from "game/constants/Sprites";
import { createCharacterAnimations } from "./CharacterAnimations";

export default class GameAnimations
{
    anims: Phaser.Animations.AnimationManager;

    constructor(anims: Phaser.Animations.AnimationManager)
    {
        this.anims = anims;
    }

    create(): void
    {
        createCharacterAnimations(this.anims);
    }
}