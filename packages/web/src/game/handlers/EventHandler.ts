enum Events
{
    // add events
    PLAYER_ENTER_ZONE = 'player_enter_zone',
    PLAYER_LEAVE_ZONE = 'player_leave_zone'
}

export default class EventHandler
{
    emitter: Phaser.Events.EventEmitter;

    constructor()
    {
        this.emitter = new Phaser.Events.EventEmitter();
        
        // handle events
        this.emitter.on(Events.PLAYER_ENTER_ZONE, () => {
            
        });
        this.emitter.on(Events.PLAYER_LEAVE_ZONE, () => {
            
        });
    }

}