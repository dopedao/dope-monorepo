import { ethers } from 'ethers';
import defaultNetworkConfig from 'game/constants/NetworkConfig';
import { _ } from 'gear-rarity/dist/image-140bf8ec';
import Cookies from 'js-cookie';
import { SiweMessage } from 'siwe';
import { DataTypes, NetworkEvents, UniversalEventNames } from './types';

export default class NetworkHandler {
  private static instance: NetworkHandler;

  public emitter: Phaser.Events.EventEmitter;
  private connection?: WebSocket;

  private _connected: boolean = false;
  private _loggedIn: boolean = false;

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

  async login() {
    if (!window.ethereum)
    {
      Promise.reject('No ethereum provider found');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // [nonce] [age]
    const nonceData = await (await fetch(defaultNetworkConfig.authUri + defaultNetworkConfig.authNoncePath, { credentials: 'include' })).text();
    const [ nonce, nonceAge ] = nonceData.split(' ');

    const message = new SiweMessage({
      address: await provider.getSigner().getAddress(),
      domain: window.location.host,
      statement: `Signature of this message will only be used for authentication. You have ${nonceAge} seconds to sign this message.`,
      uri: window.location.origin,
      version: '1',
      chainId: await provider.getSigner().getChainId(),
      nonce
    }).prepareMessage();

    const signature = await provider.getSigner().signMessage(message);
    const login = await fetch(defaultNetworkConfig.authUri + defaultNetworkConfig.authLoginPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ signature, message })
    });

    if (login.status !== 200)
    {
      Promise.reject(await login.text());
      return;
    }
    
    this._loggedIn = true;
    Promise.resolve();
  }

  async logout() {
    this._loggedIn = false;
    await fetch(defaultNetworkConfig.authUri + defaultNetworkConfig.authLogoutPath, {
      credentials: 'include'
    });
  }

  connect() {
    if (this.connection?.readyState === WebSocket.OPEN) {
      console.warn('Already connected to server');
      return;
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
