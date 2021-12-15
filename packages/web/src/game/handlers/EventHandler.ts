enum Events
{
    // add events
}

export default class EventHandler
{
    emitter: Phaser.Events.EventEmitter;

    constructor()
    {
        this.emitter = new Phaser.Events.EventEmitter();
        
        // handle events
    }

}