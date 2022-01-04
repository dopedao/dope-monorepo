export default class Quest 
{
    readonly name: string;
    readonly description: string;
    readonly onStart?: () => void;
    readonly onComplete?: () => void;
    readonly isComplete: boolean = false;
    readonly isActive: boolean = true;

    constructor(name: string, description: string, start?: () => void, complete?: () => void, isActive?: boolean)
    {
        this.name = name;
        this.description = description;
        
        this.onStart = start;
        this.onComplete = complete;
        
        if (isActive)
            this.isActive = isActive;
    }
}