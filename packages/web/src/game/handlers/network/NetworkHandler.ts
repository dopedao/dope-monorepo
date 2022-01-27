import { ClientDataTypes, NetworkEvents } from "./types";

export default class NetworkHandler
{
    private static instance: NetworkHandler;

    public emitter: Phaser.Events.EventEmitter;
    public connection?: WebSocket;

    constructor()
    {
        this.emitter = new Phaser.Events.EventEmitter();
    
        this.emitter.on(NetworkEvents.CONNECTED, () => console.log("Connected to server"));
        this.emitter.on(NetworkEvents.DISCONNECTED, () => console.log("Disconnected from server"));
        this.emitter.on(NetworkEvents.RECONNECTED, () => console.log("Reconnected to server"));

        this.emitter.on(NetworkEvents.PLAYER_JOIN, (data: ClientDataTypes[NetworkEvents.PLAYER_JOIN]) => console.log(`Player ${data.id} joined`));
        this.emitter.on(NetworkEvents.PLAYER_LEAVE, (data: ClientDataTypes[NetworkEvents.PLAYER_LEAVE]) => console.log(`Player ${data.id} left`));
        this.emitter.on(NetworkEvents.PLAYER_MOVE, (data: ClientDataTypes[NetworkEvents.PLAYER_MOVE]) => console.log(`Player ${data.id} moved`));
        this.emitter.on(NetworkEvents.TICK, (data: ClientDataTypes[NetworkEvents.TICK]) => console.log(`Tick ${data.tick}`));

    }

    private _handleMessage(event: MessageEvent)
    {
        const data = JSON.parse(event.data);
            
        switch (data.type)
        {
            case NetworkEvents.TICK:
                this.emitter.emit(NetworkEvents.TICK, data.payload);
                break;
            case NetworkEvents.PLAYER_JOIN:
                this.emitter.emit(NetworkEvents.PLAYER_JOIN, data.payload);
                break;
            case NetworkEvents.PLAYER_LEAVE:
                this.emitter.emit(NetworkEvents.PLAYER_LEAVE, data.payload);
                break;
            case NetworkEvents.PLAYER_MOVE:
                this.emitter.emit(NetworkEvents.PLAYER_MOVE, data.payload);
                break;
            case NetworkEvents.PLAYER_CHAT_MESSAGE:
                this.emitter.emit(NetworkEvents.PLAYER_CHAT_MESSAGE, data.payload);
                break;
        }
    }

    connect()
    {
        this.connection = new WebSocket(`ws://${window.location.host}/game/ws`);
        
        this.connection.onopen = () => {
            this.emitter.emit(NetworkEvents.CONNECTED);
        }
        this.connection.onclose = () => {
            this.emitter.emit(NetworkEvents.DISCONNECTED);
        }
        this.connection.onmessage = (event) => {
            
        }
    }

    static getInstance()
    {
        if (!this.instance)
            this.instance = new NetworkHandler();

        return this.instance;
    }
} 