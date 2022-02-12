import { DataTypes, NetworkEvents, UniversalEventNames } from './types';

export default class NetworkHandler {
  private static instance: NetworkHandler;

  public emitter: Phaser.Events.EventEmitter;
  private connection?: WebSocket;

  private _connected: boolean = false;

  get connected() {
    return this._connected;
  }

  constructor() {
    this.emitter = new Phaser.Events.EventEmitter();
  }

  on(event: string, callback: Function, context?: any) {
    this.emitter.on(event, callback, context);
  }

  once(event: string, callback: Function, context?: any) {
    this.emitter.once(event, callback, context);
  }

  connect() {
    if (this.connection?.readyState === WebSocket.OPEN) {
      console.warn('Already connected to server');
      return;
    }

    this.connection = new WebSocket(
      `wss://involvement-terror-cowboy-specializing.trycloudflare.com/game/ws`,
    );

    this.connection.onopen = () => {
      this._connected = true;
      this.emitter.emit(NetworkEvents.CONNECTED);
    };
    this.connection.onclose = () => {
      this._connected = false;
      this.emitter.emit(NetworkEvents.DISCONNECTED);
    };
  }

  disconnect() {
    if (this.connection?.readyState === WebSocket.CLOSED) {
      console.warn('Already disconnected from server');
      return;
    }

    this.connection?.close();
  }

  listenMessages(listen: boolean = true) {
    if (this.connection)
      this.connection.onmessage = listen
        ? event => {
            this._handleMessage(event);
          }
        : null;
  }

  sendMessage(event: UniversalEventNames, data: any) {
    if (this.connection?.readyState !== WebSocket.OPEN) {
      console.error('Cannot send message, connection is not open');
      return;
    }

    this.connection.send(JSON.stringify({ event: event, data: data }));
    this.emitter.emit('client_' + event, data);
  }

  // Handle messages coming from the server
  // and dispatches them through the event emitter as
  // server-type events
  private _handleMessage(event: MessageEvent) {
    const payload = JSON.parse(event.data);

    switch (payload.event) {
      case NetworkEvents.TICK:
        this.emitter.emit(NetworkEvents.TICK, payload.data);
        break;
      case NetworkEvents.ERROR:
        this.emitter.emit(NetworkEvents.ERROR, payload.data);
        break;
      case NetworkEvents.PLAYER_HANDSHAKE:
        this.emitter.emit(NetworkEvents.PLAYER_HANDSHAKE, payload.data);
        break;
      case UniversalEventNames.PLAYER_JOIN:
        this.emitter.emit(NetworkEvents.SERVER_PLAYER_JOIN, payload.data);
        break;
      case UniversalEventNames.PLAYER_LEAVE:
        this.emitter.emit(NetworkEvents.SERVER_PLAYER_LEAVE, payload.data);
        break;
      case UniversalEventNames.PLAYER_MOVE:
        this.emitter.emit(NetworkEvents.SERVER_PLAYER_MOVE, payload.data);
        break;
      case UniversalEventNames.PLAYER_CHAT_MESSAGE:
        this.emitter.emit(NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE, payload.data);
        break;
      case UniversalEventNames.PLAYER_UPDATE_MAP:
        this.emitter.emit(NetworkEvents.SERVER_PLAYER_UPDATE_MAP, payload.data);
        break;
    }
  }

  static getInstance() {
    if (!this.instance) this.instance = new NetworkHandler();

    return this.instance;
  }
}
