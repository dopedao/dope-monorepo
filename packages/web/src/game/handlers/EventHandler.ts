export enum Events
{
    // add events
    PLAYER_ENTER_ZONE = 'player_enter_zone',
    PLAYER_LEAVE_ZONE = 'player_leave_zone',
    PLAYER_INTERACT_NPC = 'player_interact_npc',
    PLAYER_INTERACT_NPC_COMPLETE = 'player_interact_npc_complete',
}

export default class EventHandler
{
    emitter: Phaser.Events.EventEmitter;

    constructor()
    {
        this.emitter = new Phaser.Events.EventEmitter();
        
        // handle events
        this.emitter.on(Events.PLAYER_ENTER_ZONE, () => console.log('Entered zone'));
        this.emitter.on(Events.PLAYER_LEAVE_ZONE, () => console.log('Left zone'));
        this.emitter.on(Events.PLAYER_INTERACT_NPC, () => console.log('Started interaction with NPC'));
        this.emitter.on(Events.PLAYER_INTERACT_NPC_COMPLETE, () => console.log('Completed interaction with NPC'));
    }

}