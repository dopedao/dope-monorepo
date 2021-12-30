import HustlerModel from "game/gfx/models/HustlerModel";
import Hustler from "../Hustler";
import Conversation from "./Conversation";

export default class Citizen extends Hustler
{
    readonly name: string;
    readonly description: string;
    conversations: Conversation[];

    // all of the points that the citizen will walk through
    path: Phaser.Math.Vector2[];
    // repeat path
    repeatPath: boolean;

    constructor(name: string, description: string, conversations: Conversation[] = new Array(), path: Phaser.Math.Vector2[] = new Array(), repeatPath: boolean = true, world: Phaser.Physics.Matter.World, x: number, y: number, model: HustlerModel)
    {
        super(world, x, y, model);
    
        this.name = name;
        this.description = description;
        this.conversations = conversations;
        this.path = path;
        this.repeatPath = repeatPath;
    }

    update()
    {
        super.update();

        if (!this.navigator.target)
        {
            const nextPoint = this.path.shift();
            if (nextPoint)
            {    
                this.navigator.moveTo(nextPoint.x, nextPoint.y);

                // if repeatpath is enabled, we push our shifted point (first point in this case) back to the end of the path
                if (this.repeatPath)
                    this.path.push(nextPoint);
            }
        }
    }
}