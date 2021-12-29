import HustlerModel from "game/gfx/models/HustlerModel";
import Hustler from "../Hustler";
import Conversation from "./Conversation";

export default class Citizen extends Hustler
{
    readonly name: string;
    readonly description: string;
    conversations: Conversation[] = new Array();

    

    constructor(name: string, description: string, conversations: Conversation[], world: Phaser.Physics.Matter.World, x: number, y: number, model: HustlerModel)
    {
        super(world, x, y, model);
        
        this.name = name;
        this.description = description;
        this.conversations = conversations;
    }
}