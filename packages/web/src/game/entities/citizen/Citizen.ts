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

    lastPointTimestamp?: number;

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

        // if the citizen has no target currently, check if he has a next point and move to it
        // or, if lastPointTimestamp is set, check if the time has passed and move to the next point
        if (!this.navigator.target || this.lastPointTimestamp)
        {
            const nextPoint = this.path.shift();

            if (nextPoint)
            {
                if (nextPoint instanceof Phaser.Math.Vector2)
                    this.navigator.moveTo(nextPoint.x, nextPoint.y);
                else if (!this.lastPointTimestamp)
                    this.lastPointTimestamp = Date.now();
                else
                {
                    
                    const timeSinceLastPoint = Date.now() - this.lastPointTimestamp;
                    if (timeSinceLastPoint < nextPoint * 1000)
                    {
                        // NOTE: this is a hack to make the citizen wait for a certain amount of time before going to the next point
                        // wait there's really an unshift method??? 
                        this.path.unshift(nextPoint);
                        return;
                    }

                    this.lastPointTimestamp = undefined;
                }                

                // if repeatpath is enabled, we push our shifted point (first point in this case) back to the end of the path
                if (this.repeatPath)
                    this.path.push(nextPoint);
            }
        }
    }
}