import { Base, Categories, CharacterCategories, Clothes, Feet, Hands, Mask, Necklace, Ring, SpritesMap, Weapons } from "game/constants/Sprites";
import Hustler from "game/entities/Hustler";
 
export default class HustlerModel
{
    public readonly BASE_MAP;

    public hustler!: Hustler;

    // base skin
    public base: Base;
    // layers
    private _clothes?: Array<Clothes>;
    private _feet?: Feet;
    private _hands?: Hands;
    private _mask?: Mask;
    private _necklace?: Necklace;
    private _ring?: Ring;
    private _weapon?: Weapons;
    
    // sprites
    // key = texture name
    public clothesSprites: Array<Phaser.GameObjects.Sprite> = new Array();
    public sprites: { [key: number]: Phaser.GameObjects.Sprite } = {};

    // The model of the hustler, contains all of the layers on top of its base skin 
    constructor(base: Base, clothes?: Array<Clothes>, feet?: Feet, hands?: Hands, mask?: Mask, necklace?: Necklace, ring?: Ring, weapon?: Weapons)
    {
        this.base = base;

        this._clothes = clothes;
        this._feet = feet;
        this._hands = hands;
        this._mask = mask;
        this._necklace = necklace;
        this._ring = ring;
        this._weapon = weapon;

        this.BASE_MAP = SpritesMap[Categories.Character][this.base];
    }

    public get clothes(): Array<Clothes> | undefined {
        return this._clothes;
    }
    public get feet(): Feet | undefined {
        return this._feet;
    }
    public get hands(): Hands | undefined {
        return this._hands;
    }
    public get mask(): Mask | undefined {
        return this._mask;
    }
    public get necklace(): Necklace | undefined {
        return this._necklace;
    }
    public get ring(): Ring | undefined {
        return this._ring;
    }
    public get weapon(): Weapons | undefined {
        return this._weapon;
    }

    public set weapon(value: Weapons | undefined) {
        this._weapon = value;
        if (this.sprites[CharacterCategories.Weapons])
            this.weapon != undefined ?
                this.updateSprite(CharacterCategories.Weapons, this.weapon as number) :
                this.sprites[CharacterCategories.Weapons].setVisible(false);
    }
    public set ring(value: Ring | undefined) {
        this._ring = value;
        if (this.sprites[CharacterCategories.Ring])
            this.ring != undefined ?
                this.updateSprite(CharacterCategories.Ring, this.ring as number) :
                this.sprites[CharacterCategories.Ring].setVisible(false);
    }
    public set necklace(value: Necklace | undefined) {
        this._necklace = value;
        if (this.sprites[CharacterCategories.Necklace])
            this.necklace != undefined ?
                this.updateSprite(CharacterCategories.Necklace, this.necklace as number) :
                this.sprites[CharacterCategories.Necklace].setVisible(false);
    }
    public set mask(value: Mask | undefined) {
        this._mask = value;
        if (this.sprites[CharacterCategories.Mask])
            this.mask != undefined ?
                this.updateSprite(CharacterCategories.Mask, this.mask as number) :
                this.sprites[CharacterCategories.Mask].setVisible(false);
    }
    public set hands(value: Hands | undefined) {
        this._hands = value;
        if (this.sprites[CharacterCategories.Hands])
            this.hands != undefined ?
                this.updateSprite(CharacterCategories.Hands, this.hands as number) :
                this.sprites[CharacterCategories.Hands].setVisible(false);
    }
    public set feet(value: Feet | undefined) {
        this._feet = value;
        if (this.sprites[CharacterCategories.Feet])
            this.feet != undefined ?
                this.updateSprite(CharacterCategories.Feet, this.feet as number) :
                this.sprites[CharacterCategories.Feet].setVisible(false);
    }
    public set clothes(value: Array<Clothes> | undefined) {
        this._clothes = value;
        this.updateClothesSprites();
    }

    updateSprite(category: CharacterCategories, type: number)
    {
        const sprite = this.sprites[category];
        if (!sprite.visible)
            sprite.setVisible(true);

        sprite.setTexture((this.BASE_MAP[category] as {[key: number]: string})[type]);
    }

    updateClothesSprites()
    {
        this.clothesSprites.forEach(sprite => sprite.destroy())
        if (this.clothes)
        {
            this.clothesSprites = this.clothes.map(c => 
                this.hustler.scene.add.sprite(this.hustler.x, this.hustler.y, this.BASE_MAP[CharacterCategories.Clothes][c])
                .setScale(this.hustler.scaleX, this.hustler.scaleY));
        }
            
    }

    // add the sprites of the model to the scene, to be drawn
    createSprites()
    {
        // Shadow
        this.sprites[CharacterCategories.Shadow] = this.hustler.scene.add.sprite(this.hustler.x, this.hustler.y, this.BASE_MAP[CharacterCategories.Shadow]);

        // Clothes
        if (this.clothes)
            this.clothesSprites = this.clothes.map(c => this.hustler.scene.add.sprite(this.hustler.x, this.hustler.y, this.BASE_MAP[CharacterCategories.Clothes][c]));

        // Accessories
        if (this.feet != undefined)
            this.sprites[CharacterCategories.Feet] = this.hustler.scene.add.sprite(this.hustler.x, this.hustler.y, this.BASE_MAP[CharacterCategories.Feet][this.feet]);
        if (this.hands != undefined)
            this.sprites[CharacterCategories.Hands] = this.hustler.scene.add.sprite(this.hustler.x, this.hustler.y, this.BASE_MAP[CharacterCategories.Hands][this.hands]);
        if (this.mask != undefined)
            this.sprites[CharacterCategories.Mask] = this.hustler.scene.add.sprite(this.hustler.x, this.hustler.y, this.BASE_MAP[CharacterCategories.Mask][this.mask]);
        if (this.necklace != undefined)
            this.sprites[CharacterCategories.Necklace] = this.hustler.scene.add.sprite(this.hustler.x, this.hustler.y, this.BASE_MAP[CharacterCategories.Necklace][this.necklace]);
        if (this.ring != undefined)
            this.sprites[CharacterCategories.Ring] = this.hustler.scene.add.sprite(this.hustler.x, this.hustler.y, this.BASE_MAP[CharacterCategories.Ring][this.ring]);
        if (this.weapon != undefined)
            this.sprites[CharacterCategories.Weapons] = this.hustler.scene.add.sprite(this.hustler.x, this.hustler.y, this.BASE_MAP[CharacterCategories.Weapons][this.weapon]);

        this.clothesSprites.forEach(sprite => sprite.setScale(this.hustler.scaleX, this.hustler.scaleY));
        Object.values(this.sprites).forEach(sprite => sprite.setScale(this.hustler.scaleX, this.hustler.scaleY));
    }

    // pos: sprites new position 
    // direction: direction of the frame
    // both nullable, if for eg. direction is null, only the positions of the sprites will get updated
    updateSprites(position: boolean, direction?: string)
    {
        const update = (sprite: Phaser.GameObjects.Sprite) => {
            if (position)
                sprite.setPosition(this.hustler.x, this.hustler.y);
            if (direction)
                sprite.play(sprite.texture.key + direction, true);
        };

        this.clothesSprites.forEach(sprite => update(sprite));
        Object.values(this.sprites).forEach(sprite => update(sprite));
    }

    stopSpritesAnim()
    {
        const stop = (sprite: Phaser.GameObjects.Sprite) => {
            sprite.anims.currentAnim && !sprite.anims.currentFrame.isLast ? 
                sprite.anims.setCurrentFrame(sprite.anims.currentAnim.getLastFrame()) : null
            sprite.stopAfterDelay(100);
        };

        Object.values(this.sprites).forEach(sprite => stop(sprite));
        Object.values(this.clothesSprites).forEach(sprite => stop(sprite));
    }
}