import { Base, Clothes, Feet, Hands, Mask, Necklace, Ring, Weapons } from "game/constants/Sprites";
 
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

    constructor(base: Base, clothes?: Array<Clothes>, feet?: Feet, hands?: Hands, necklace?: Necklace, ring?: Ring, weapon?: Weapons)
    {
        this.base = base;

        this.clothes = clothes;
        this.feet = feet;
        this.hands = hands;
        this.necklace = necklace;
        this.ring = ring;
        this.weapon = weapon;
    }
}