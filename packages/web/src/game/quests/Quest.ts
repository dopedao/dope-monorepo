export default class Quest 
{
    readonly name: string;
    readonly description: string;
    readonly onStart: () => void;
    readonly onComplete: () => void;
    readonly isComplete: boolean;
    readonly isActive: boolean;

    constructor(name: string, description: string, start: () => void, complete: () => void, isComplete: boolean, isActive: boolean)
    {
        this.name = name;
        this.description = description;
        this.onStart = start;
        this.onComplete = complete;
        this.isComplete = isComplete;
        this.isActive = isActive;
    }
}