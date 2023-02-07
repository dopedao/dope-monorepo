import { ethers } from 'ethers';
import defaultNetworkConfig from 'game/constants/NetworkConfig';
import { _ } from 'gear-rarity/dist/image-140bf8ec';
import Cookies from 'js-cookie';
import { SiweMessage } from 'siwe';
import Authenticator from './Authenticator';
import { DataTypes, NetworkEvents, UniversalEventNames } from './types';

export default class NetworkHandler {
  private static instance: NetworkHandler;

  private _authenticator: Authenticator;

  public emitter: Phaser.Events.EventEmitter;
  private connection?: WebSocket;

  private _connected: boolean = false;

  get connected() {
    return this._connected;
  }

  get authenticator() { return this._authenticator; }

  constructor(authenticator?: Authenticator) {
    this.emitter = new Phaser.Events.EventEmitter();
    this._authenticator = authenticator || new Authenticator(this);
  }

  on(event: string, callback: Function, context?: any) {
    this.emitter.on(event, callback, context);
  }

  once(event: string, callback: Function, context?: any) {
    this.emitter.once(event, callback, context);
  }

  connect(): this {
    if (this.connection?.readyState === WebSocket.OPEN) {
      console.warn('Already connected to server');
      return this;
    }

    this.connection = new WebSocket(
      defaultNetworkConfig.wsUri,
    );

    this.connection.onopen = () => {
      this._connected = true;
      this.emitter.emit(NetworkEvents.CONNECTED);
    };
    this.connection.onclose = () => {
      this._connected = false;
      this.emitter.emit(NetworkEvents.DISCONNECTED);
    };
    return this;
  }

  disconnect() {
    if (this.connection?.readyState === WebSocket.CLOSED) {
      console.warn('Already disconnected from server');
      return;
    }

    this.connection?.close();
  }

  listen(listen: boolean = true) {
    if (this.connection)
      this.connection.onmessage = listen
        ? event => {
            this._handle(event);
          }
        : null;
  }

  send(event: UniversalEventNames, data: any) {
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
  private _handle(event: MessageEvent) {
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
      case UniversalEventNames.PLAYER_CHAT_COMMAND_RESULT:
        this.emitter.emit(NetworkEvents.SERVER_PLAYER_CHAT_COMMAND_RESULT, payload.data)
        break;
      case UniversalEventNames.PLAYER_UPDATE_MAP:
        this.emitter.emit(NetworkEvents.SERVER_PLAYER_UPDATE_MAP, payload.data);
        break;
      case UniversalEventNames.PLAYER_PICKUP_ITEMENTITY:
        this.emitter.emit(NetworkEvents.SERVER_PLAYER_PICKUP_ITEMENTITY, payload.data);
        break;
    }
  }

  static getInstance() {
    if (!this.instance) this.instance = new NetworkHandler();

    return this.instance;
  }
}
