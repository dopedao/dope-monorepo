import { DataTypes, NetworkEvents, UniversalEventNames } from "./types";

export default class NetworkHandler
{
    private static instance: NetworkHandler;

    public emitter: Phaser.Events.EventEmitter;
    private connection?: WebSocket;

    constructor()
    {
        this.emitter = new Phaser.Events.EventEmitter();
    
        this.emitter.on(NetworkEvents.CONNECTED, () => console.log("Connected to server"));
        this.emitter.on(NetworkEvents.DISCONNECTED, () => console.log("Disconnected from server"));
        this.emitter.on(NetworkEvents.RECONNECTED, () => console.log("Reconnected to server"));

        this.emitter.on(NetworkEvents.TICK, (data: DataTypes[NetworkEvents.TICK]) => console.log(`Tick ${data.tick}`));
        this.emitter.on(NetworkEvents.ERROR, (data: DataTypes[NetworkEvents.ERROR]) => console.warn(`Error ${data.code}: ${data.message}`));

        this.emitter.on(NetworkEvents.SERVER_PLAYER_JOIN, (data: DataTypes[NetworkEvents.SERVER_PLAYER_JOIN]) => console.log(`Player ${data.id} joined`));
        this.emitter.on(NetworkEvents.SERVER_PLAYER_LEAVE, (data: DataTypes[NetworkEvents.SERVER_PLAYER_LEAVE]) => console.log(`Player ${data.id} left`));
        this.emitter.on(NetworkEvents.SERVER_PLAYER_MOVE, (data: DataTypes[NetworkEvents.SERVER_PLAYER_MOVE]) => console.log(`Player ${data.id} moved`));
        this.emitter.on(NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE, (data: DataTypes[NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE]) => console.log(`Player ${data.author} said: ${data.message}`));
    }

    connect()
    {
        if (this.connection?.readyState === WebSocket.OPEN)
        {
            console.warn("Already connected to server");
            return;
        }

        this.connection = new WebSocket(`ws://${window.location.host}/game/ws`);

        this.connection.onopen = () => {
            this.emitter.emit(NetworkEvents.CONNECTED);
        }
        this.connection.onclose = () => {
            this.emitter.emit(NetworkEvents.DISCONNECTED);
        }
    }

    listenMessages(listen: boolean = true)
    {
        if (this.connection)
            this.connection.onmessage = listen ? (event) => {
                this._handleMessage(event);
            } : null;
    }

    sendMessage(event: UniversalEventNames, data: any)
    {
        if (this.connection?.readyState !== WebSocket.OPEN)
            return;

        this.connection.send(JSON.stringify({ event: event, data: data }));
        this.emitter.emit('client_' + event, data);
    }

    // Handle messages coming from the server
    // and dispatches them through the event emitter as
    // server-type events
    private _handleMessage(event: MessageEvent)
    {
        const data = JSON.parse(event.data);
        
        switch (data.event)
        {
            case NetworkEvents.TICK:
                this.emitter.emit(NetworkEvents.TICK, data.payload);
                break;
            case NetworkEvents.ERROR:
                this.emitter.emit(NetworkEvents.ERROR, data.payload);
                break;
            case UniversalEventNames.PLAYER_JOIN:
                this.emitter.emit(NetworkEvents.SERVER_PLAYER_JOIN, data.payload);
                break;
            case UniversalEventNames.PLAYER_LEAVE:
                this.emitter.emit(NetworkEvents.SERVER_PLAYER_LEAVE, data.payload);
                break;
            case UniversalEventNames.PLAYER_MOVE:
                this.emitter.emit(NetworkEvents.SERVER_PLAYER_MOVE, data.payload);
                break;
            case UniversalEventNames.PLAYER_CHAT_MESSAGE:
                this.emitter.emit(NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE, data.payload);
                break;
        }
    }

    static getInstance()
    {
        if (!this.instance)
            this.instance = new NetworkHandler();

        return this.instance;
    }
} 