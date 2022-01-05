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
        this.updateSprite(CharacterCategories.Weapons, 'weapon');
    }
    public set ring(value: Ring | undefined) {
        this._ring = value;
        this.updateSprite(CharacterCategories.Ring, 'ring');
    }
    public set necklace(value: Necklace | undefined) {
        this._necklace = value;
        this.updateSprite(CharacterCategories.Necklace, 'necklace');
    }
    public set mask(value: Mask | undefined) {
        this._mask = value;
        this.updateSprite(CharacterCategories.Mask, 'mask');
    }
    public set hands(value: Hands | undefined) {
        this._hands = value;
        this.updateSprite(CharacterCategories.Hands, 'hands');
    }
    public set feet(value: Feet | undefined) {
        this._feet = value;
        this.updateSprite(CharacterCategories.Feet, 'feet');
    }
    public set clothes(value: Array<Clothes> | undefined) {
        this._clothes = value;
        this.updateClothesSprites();
    }

    setDepth(value: number)
    {
        this.clothesSprites.forEach(sprite => sprite.setDepth(value));
        Object.values(this.sprites).forEach(sprite => sprite.setDepth(value));
    }

    setOrigin(x: number, y: number)
    {
        this.clothesSprites.forEach(sprite => sprite.setOrigin(x, y));
        Object.values(this.sprites).forEach(sprite => sprite.setOrigin(x, y));
    }

    // field is the identifier of a field in the class, for eg.
    // this.feet = this['feet'], feet is the field
    updateSprite(category: CharacterCategories, field: string)
    {
        // we dont need to recreate the sprite gameobject every time
        // if it already exists then just replace its texture, else, 
        // instantiate a new gameobject
        if (this.sprites[category])
        {
            const sprite = this.sprites[category];
            if ((this as any)[field] != undefined)
            {
                if (!sprite.visible)
                    sprite.setVisible(true);

                sprite.setTexture((this.BASE_MAP[category] as {[key: number]: string})[(this as any)[field]], this.hustler.anims.currentFrame.index);
            }
            // if the sprite type is undefined, then just set the gameobjects visibility to false
            else {
                sprite.setVisible(false);
            }   
        }
        else
        {
            this.sprites[category] = this.hustler.scene.add.sprite(
                this.hustler.x, this.hustler.y, 
                (this.BASE_MAP[category] as {[key: number]: string})[(this as any)[field]], 
                this.hustler.anims.currentFrame.index).setScale(this.hustler.scaleX, this.hustler.scaleY)
        }
    }

    updateClothesSprites()
    {
        this.clothesSprites.forEach(sprite => sprite.destroy())
        if (this.clothes)
        {
            this.clothesSprites = this.clothes.map(c => 
                this.hustler.scene.add.sprite(this.hustler.x, this.hustler.y, this.BASE_MAP[CharacterCategories.Clothes][c], this.hustler.anims.currentFrame.index)
                .setScale(this.hustler.scaleX, this.hustler.scaleY));
        }
            
    }

    // add the sprites of the model to the scene, to be drawn
    createSprites()
    {
        // Shadow
        //this.sprites[CharacterCategories.Shadow] = this.hustler.scene.add.sprite(this.hustler.x, this.hustler.y, this.BASE_MAP[CharacterCategories.Shadow]);

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

        this.clothesSprites.forEach(sprite => sprite.setScale(this.hustler.scaleX, this.hustler.scaleY) && sprite.setOrigin(this.hustler.originX, this.hustler.originY) && sprite.setDepth(this.hustler.depth));
        Object.values(this.sprites).forEach(sprite => sprite.setScale(this.hustler.scaleX, this.hustler.scaleY) && sprite.setOrigin(this.hustler.originX, this.hustler.originY) && sprite.setDepth(this.hustler.depth));
    }

    // pos: boolean, if pos is true, the position of the sprites will get updated
    // if the direction is not null, the sprite animation will get updated
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

    // cancel sprites animation
    stopSpritesAnim(delay: boolean = true)
    {
        const stop = (sprite: Phaser.GameObjects.Sprite) => {
            sprite.anims.currentAnim && !sprite.anims.currentFrame.isLast ? 
                sprite.anims.setCurrentFrame(sprite.anims.currentAnim.getLastFrame()) : null
            
            if (delay)
                sprite.stopAfterDelay(100);
            else
                sprite.stop();
        };

        Object.values(this.sprites).forEach(sprite => stop(sprite));
        Object.values(this.clothesSprites).forEach(sprite => stop(sprite));
    }
}