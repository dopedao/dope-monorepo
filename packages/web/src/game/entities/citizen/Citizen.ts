import HustlerModel from "game/gfx/models/HustlerModel";
import Hustler from "../Hustler";
import Conversation from "./Conversation";

export default class Citizen extends Hustler
{
    readonly name: string;
    readonly description: string;
    conversations: Conversation[] = new Array();

    // the path that the citizen is currently following
    // Vector2 is used for tile coordinates,
    // and number is used for the number of seconds that the citizen has to wait before going to the 
    // next point
    path: (Phaser.Math.Vector2 | number)[] = new Array();
    // repeat path
    repeatPath: boolean = false;

    lastPointTimestamp: number = 0;

    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, model: HustlerModel, name: string, description: string, conversations?: Conversation[], path?: (Phaser.Math.Vector2 | number)[], repeatPath?: boolean)
    {
        super(world, x, y, model);
    
        this.name = name;
        this.description = description;

        if (conversations)
            this.conversations = conversations;
        
        if (path)
            this.path = path;
        
        if (repeatPath)
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
                if (typeof nextPoint === "number" && new Date().getTime() - this.lastPointTimestamp < nextPoint * 1000)
                {
                    // NOTE: this is a hack to make the citizen wait for a certain amount of time before going to the next point
                    // wait there's really an unshift method??? 
                    this.path.unshift(nextPoint);
                    return;
                }
                else if (typeof nextPoint === "number")
                    this.lastPointTimestamp = new Date().getTime();
                else
                    this.navigator.moveTo(nextPoint.x, nextPoint.y);

                // if repeatpath is enabled, we push our shifted point (first point in this case) back to the end of the path
                if (this.repeatPath)
                    this.path.push(nextPoint);
            }
        }
    }
}