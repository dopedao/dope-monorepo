import { isThursday } from "date-fns";
import { Base, Categories, CharacterCategories, Clothes, Feet, Hands, Mask, Necklace, Ring, SpritesMap, Weapons } from "game/constants/Sprites";
 
export default class PlayerModel
{
    // base skin
    public base: Base;
    // layers
    public clothes?: Array<Clothes>;
    public feet?: Feet;
    public hands?: Hands;
    public mask?: Mask;
    public necklace?: Necklace;
    public ring?: Ring;
    public weapon?: Weapons;

    // sprites
    public sprites: Array<Phaser.GameObjects.Sprite> = new Array();

    constructor(base: Base, clothes?: Array<Clothes>, feet?: Feet, hands?: Hands, mask?: Mask, necklace?: Necklace, ring?: Ring, weapon?: Weapons)
    {
        this.base = base;

        this.clothes = clothes;
        this.feet = feet;
        this.hands = hands;
        this.mask = mask;
        this.necklace = necklace;
        this.ring = ring;
        this.weapon = weapon;
    }

    createSprites(scene: Phaser.Scene, pos: Phaser.Math.Vector2, scale?: Phaser.Math.Vector2)
    {
        // Shadow
        this.sprites.push(scene.add.sprite(pos.x, pos.y, SpritesMap[Categories.Character][Base.Male][CharacterCategories.Shadow]));

        // Accessories
        if (this.clothes)
            this.clothes?.forEach(c => this.sprites.push(scene.add.sprite(pos.x, pos.y, SpritesMap[Categories.Character][Base.Male][CharacterCategories.Clothes][c])));
        if (this.feet != undefined)
            this.sprites.push(scene.add.sprite(pos.x, pos.y, SpritesMap[Categories.Character][Base.Male][CharacterCategories.Feet][this.feet]))
        if (this.hands != undefined)
            this.sprites.push(scene.add.sprite(pos.x, pos.y, SpritesMap[Categories.Character][Base.Male][CharacterCategories.Hands][this.hands]))
        if (this.mask != undefined)
            this.sprites.push(scene.add.sprite(pos.x, pos.y, SpritesMap[Categories.Character][Base.Male][CharacterCategories.Mask][this.mask]))
        if (this.necklace != undefined)
            this.sprites.push(scene.add.sprite(pos.x, pos.y, SpritesMap[Categories.Character][Base.Male][CharacterCategories.Necklace][this.necklace]))
        if (this.ring != undefined)
            this.sprites.push(scene.add.sprite(pos.x, pos.y, SpritesMap[Categories.Character][Base.Male][CharacterCategories.Ring][this.ring]))
        if (this.weapon != undefined)
            this.sprites.push(scene.add.sprite(pos.x, pos.y, SpritesMap[Categories.Character][Base.Male][CharacterCategories.Weapons][this.weapon]))

        this.sprites.forEach(sprite => scale ? sprite.setScale(scale?.x, scale?.y) : null);
    }

    updateSpritesPosition(pos: Phaser.Math.Vector2, direction: string)
    {
        if (direction === "")
        {
            this.sprites.forEach(sprite => sprite.stop());
            return;
        }

        this.sprites.forEach(sprite => sprite.setPosition(pos.x, pos.y) && sprite.play(sprite.texture.key + direction, true));
    }
}