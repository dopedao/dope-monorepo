import HustlerModel from "game/gfx/models/HustlerModel";
import Hustler from "./Hustler";

export default class Citizen extends Hustler
{


    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, model: HustlerModel, frame?: number)
    {
        super(world, x, y, model, frame);
    }
}