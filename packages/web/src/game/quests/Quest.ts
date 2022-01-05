export default class Quest 
{
    readonly name: string;
    readonly description: string;
    readonly onStart?: () => void;
    readonly onComplete?: () => void;
    private _isActive: boolean = true;

    get isActive() { return this._isActive; }
    set isActive(value: boolean) { this._isActive = value; this.onStart ? this.onStart() : {}; }

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