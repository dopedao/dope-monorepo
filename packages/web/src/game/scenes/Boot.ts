import Citizen from 'game/entities/citizen/Citizen';
import Hustler from 'game/entities/Hustler';
import Item from 'game/entities/player/inventory/Item';
import Quest from 'game/entities/player/quests/Quest';
import EventHandler, { Events } from 'game/handlers/events/EventHandler';
import NetworkHandler from 'game/handlers/network/NetworkHandler';
import { DataTypes, NetworkEvents } from 'game/handlers/network/types';
import { Scene } from 'phaser';

export default class Boot extends Scene {
  constructor() {
    super({
      key: 'BootScene',
    });
  }

  preload(): void {
    // do some preload boot stuff
    this.load.svg('dopewars', '/images/Logo-Plain.svg');
  }

  create(): void {
    // scale properly when game enters fullscreen mode
    this.scale.on(Phaser.Scale.Events.ENTER_FULLSCREEN, () => {
      this.scale.setGameSize(this.scale.parent.clientWidth, this.scale.parent.clientHeight);
      // this.scale.setParentSize(this.scale.parent.clientWidth, this.scale.parent.clientHeight);
    });

    this.scale.on(Phaser.Scale.Events.LEAVE_FULLSCREEN, () => {
      this.scale.setGameSize(this.scale.parent.clientWidth, this.scale.parent.clientHeight);
      //this.scale.setParentSize(this.scale.parent.clientWidth, this.scale.parent.clientHeight);
    });

    window.onresize = () => this.scale.setGameSize(this.scale.parent.clientWidth, this.scale.parent.clientHeight);

    // free plugins
    this.events.on(Phaser.Core.Events.DESTROY, () => {
      window.onresize = null;
      EventHandler.emitter().removeAllListeners();

      this.game.plugins.removeScenePlugin('rexUI');
      this.game.plugins.removeGlobalPlugin('phaser-react');
      this.game.plugins.removeGlobalPlugin('rexPixelationPipeline');

      if (NetworkHandler.getInstance().connected) NetworkHandler.getInstance().disconnect();
      NetworkHandler.getInstance().on(NetworkEvents.DISCONNECTED, () => {
        NetworkHandler.getInstance().emitter.removeAllListeners();
      });
    });

    // log events
    this._logEvents();
    this._logNetworkEvents(NetworkHandler.getInstance());

    this.scene.start('PreloadScene');
  }

  private _logNetworkEvents(networkHandler: NetworkHandler) {
    networkHandler.emitter.on(NetworkEvents.CONNECTED, () => this._log('Connected to server'));
    networkHandler.emitter.on(NetworkEvents.DISCONNECTED, () =>
      this._log('Disconnected from server'),
    );
    networkHandler.emitter.on(NetworkEvents.RECONNECTED, () => this._log('Reconnected to server'));

    // this.emitter.on(NetworkEvents.TICK, (data: DataTypes[NetworkEvents.TICK]) => console.log(`Tick ${data.tick}`));
    networkHandler.emitter.on(NetworkEvents.ERROR, (data: DataTypes[NetworkEvents.ERROR]) =>
      console.warn(`Error ${data.code}: ${data.message}`),
    );
    networkHandler.emitter.on(
      NetworkEvents.PLAYER_HANDSHAKE,
      (data: DataTypes[NetworkEvents.PLAYER_HANDSHAKE]) =>
        this._log(`Got player handshake: ${data.id}`),
    );

    networkHandler.emitter.on(
      NetworkEvents.SERVER_PLAYER_JOIN,
      (data: DataTypes[NetworkEvents.SERVER_PLAYER_JOIN]) => this._log(`Player ${data.id} joined`),
    );
    networkHandler.emitter.on(
      NetworkEvents.SERVER_PLAYER_LEAVE,
      (data: DataTypes[NetworkEvents.SERVER_PLAYER_LEAVE]) => this._log(`Player ${data.id} left`),
    );
    networkHandler.emitter.on(
      NetworkEvents.SERVER_PLAYER_MOVE,
      (data: DataTypes[NetworkEvents.SERVER_PLAYER_MOVE]) => this._log(`Player ${data.id} moved`),
    );
    // networkHandler.emitter.on(NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE, (data: DataTypes[NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE]) => this._log(`Player ${data.author} said: ${data.message}`));
  }

  private _logEvents() {
    // handle events
    EventHandler.emitter().on(Events.PLAYER_INVENTORY_OPEN, () => this._log('Opened inventory'));
    EventHandler.emitter().on(Events.PLAYER_INVENTORY_CLOSE, () => this._log('Closed inventory'));
    EventHandler.emitter().on(Events.PLAYER_INVENTORY_ADD_ITEM, (item: Item, pickup?: boolean) =>
      this._log(`Added item to inventory: ${item.name}
        picked up?: ${pickup ?? false}`),
    );
    EventHandler.emitter().on(Events.PLAYER_INVENTORY_REMOVE_ITEM, (item: Item, drop?: boolean) =>
      this._log(`Removed item from inventory: ${item.name}
        dropped?: ${drop ?? false}`),
    );

    EventHandler.emitter().on(Events.PLAYER_ZONE_ENTER, () => this._log('Entered zone'));
    EventHandler.emitter().on(Events.PLAYER_ZONE_LEAVE, () => this._log('Left zone'));

    EventHandler.emitter().on(Events.PLAYER_CITIZEN_INTERACT, (citizen: Citizen) =>
      this._log(`Started interaction with citizen: ${citizen.name}`),
    );
    EventHandler.emitter().on(
      Events.PLAYER_CITIZEN_INTERACT_FINISH,
      (citizen: Citizen, cancelled: boolean) =>
        this._log(`Finished interaction with citizen: ${citizen.name}
        cancelled?: ${cancelled}`),
    );

    EventHandler.emitter().on(Events.PLAYER_QUEST_NEW, (quest: Quest) =>
      this._log(`New quest: ${quest.name}`),
    );
    EventHandler.emitter().on(Events.PLAYER_QUEST_START, (quest: Quest) =>
      this._log(`Started quest: ${quest.name}`),
    );
    EventHandler.emitter().on(Events.PLAYER_QUEST_COMPLETE, (quest: Quest) =>
      this._log(`Completed quest: ${quest.name}`),
    );

    EventHandler.emitter().on(Events.CHAT_MESSAGE, (hustler: Hustler, message: string) =>
      this._log(`${hustler.name} says: ${message}`),
    );
  }

  private _log(event: string, ...args: any[]) {
    console.log(`%c[Event] ${event}`, ...args, 'color: #349eeb;');
  }
}
