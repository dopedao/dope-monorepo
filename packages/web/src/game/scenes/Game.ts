import HustlerModel from 'game/gfx/models/HustlerModel';
import GameAnimations from 'game/anims/GameAnimations';
import { Scene, Cameras, Tilemaps } from 'phaser';
import Player from 'game/entities/player/Player';
import Citizen from 'game/entities/citizen/Citizen';
import EventHandler, { Events } from 'game/handlers/events/EventHandler';
import Conversation from 'game/entities/citizen/Conversation';
import Item from 'game/entities/player/inventory/Item';
import ItemEntity from 'game/entities/ItemEntity';
import MapHelper from 'game/world/MapHelper';
import Quest from 'game/entities/player/quests/Quest';
import { Level } from 'game/world/LDtkParser';
import NetworkHandler from 'game/handlers/network/NetworkHandler';
import { DataTypes, NetworkEvents, UniversalEventNames } from 'game/handlers/network/types';
import Hustler, { Direction } from 'game/entities/Hustler';
import ENS, { getEnsAddress } from '@ensdomains/ensjs';
import { getShortAddress } from 'utils/utils';
import Items from 'game/constants/Items';
import { SiweMessage } from 'siwe';
import { ethers } from 'ethers';

export default class GameScene extends Scene {
  private hustlerData: any;

  private player!: Player;
  // other players
  private hustlers: Array<Hustler> = [];
  // npcs
  private citizens: Citizen[] = new Array();
  private itemEntities: ItemEntity[] = new Array();

  // level identifiers of the current loaded maps
  private loadedMaps: string[] = new Array();
  private _mapHelper!: MapHelper;

  public canUseMouse: boolean = true;

  readonly zoom: number = 2.5;

  get mapHelper() {
    return this._mapHelper;
  }

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  init(data: { hustlerData: any }) {
    this.hustlerData = data.hustlerData;
  }

  create() {
    // create item entities when need
    this.handleItemEntities();
    // handle camera effects
    this.handleCamera();

    // create all of the animations
    new GameAnimations(this.anims).create();

    // on click pathfinding
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.player.busy || !this.canUseMouse || !this.mapHelper.map.collideLayer) return;

      // run asynchronously
      new Promise(() => {
        const citizenToTalkTo = this.citizens.find(
          citizen =>
            citizen.shouldFollowPath && citizen.conversations.length !== 0 &&
            citizen.getBounds().contains(pointer.worldX, pointer.worldY),
        );
        const itemToPickUp = this.itemEntities.find(item =>
          item.getBounds().contains(pointer.worldX, pointer.worldY),
        );

        if (
          citizenToTalkTo &&
          new Phaser.Math.Vector2(this.player).distance(new Phaser.Math.Vector2(citizenToTalkTo)) <
            100
        ) {
          citizenToTalkTo?.onInteraction(this.player);
          EventHandler.emitter().emit(Events.PLAYER_CITIZEN_INTERACT, citizenToTalkTo);
        } else if (
          itemToPickUp &&
          new Phaser.Math.Vector2(this.player).distance(new Phaser.Math.Vector2(itemToPickUp)) < 100
        ) {
          itemToPickUp?.onPickup();
          EventHandler.emitter().emit(Events.PLAYER_INVENTORY_ADD_ITEM, itemToPickUp?.item, true);
        } else
          this.player.navigator.moveTo(pointer.worldX, pointer.worldY, () => {
            if (
              citizenToTalkTo &&
              new Phaser.Math.Vector2(this.player).distance(citizenToTalkTo) < 100
            ) {
              citizenToTalkTo?.onInteraction(this.player);
              EventHandler.emitter().emit(Events.PLAYER_CITIZEN_INTERACT, citizenToTalkTo);
            } else if (
              itemToPickUp &&
              new Phaser.Math.Vector2(this.player).distance(itemToPickUp) < 100
            ) {
              itemToPickUp?.onPickup();
              EventHandler.emitter().emit(
                Events.PLAYER_INVENTORY_ADD_ITEM,
                itemToPickUp.item,
                true,
              );
            }
          },
        );
      });
    });

    // create map and entities
    this._mapHelper = new MapHelper(this);
    this.mapHelper.createMap('NYCHood2');
    this.mapHelper.createEntities();
    this.loadedMaps.push(this.mapHelper.mapReader.level.identifier);

    // citizens
    this.citizens.push(
      new Citizen(
        this.matter.world,
        70,
        200,
        '30',
        'Michel',
        'Arpenteur',
        [new Conversation('Welcome to Dope City!', () => {
          const selectedAddress = (window.ethereum as any)?.selectedAddress;
          if (selectedAddress)
          {
            const siweMessage = new SiweMessage({
              domain: window.location.hostname,
              address: selectedAddress,
              uri: origin,
              version: '1',
              chainId: 1
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            provider.getSigner().signMessage(siweMessage.prepareMessage()).then(signedMessage => console.log(signedMessage)).catch(err => console.log(err));

            return true;
          }

          return false;
        })],
        undefined,
        //[ this.mapHelper.map.collideLayer?.worldToTileXY(new Phaser.Math.Vector2(400, 300).x, new Phaser.Math.Vector2(400, 300).y), 20, this.mapHelper.map.collideLayer!.worldToTileXY(new Phaser.Math.Vector2(700, 600).x, new Phaser.Math.Vector2(700, 600).y)],
        true,
      ),
    );

    this.citizens.push(
      new Citizen(
        this.matter.world,
        45,
        300,
        '12',
        'Michel',
        'Arpenteur',
        [new Conversation('Welcome to Dope City!')],
        undefined,
        //[ this.mapHelper.map.collideLayer?.worldToTileXY(new Phaser.Math.Vector2(400, 300).x, new Phaser.Math.Vector2(400, 300).y), 20, this.mapHelper.map.collideLayer!.worldToTileXY(new Phaser.Math.Vector2(700, 600).x, new Phaser.Math.Vector2(700, 600).y)],
        true,
      ),
    );

    this.itemEntities.push(
      new ItemEntity(
        this.matter.world,
        100,
        200,
        'lol',
        new Item('item_test', 'jsp'),
        (item: Item) => {
          this.player.inventory.remove(item, true);
        },
      ),
    );

    // TODO when map update: create player directly from map data
    this.player = new Player(
      this.matter.world,
      90,
      200,
      this.hustlerData?.length > 0 ? this.hustlerData[0].id : undefined,
      this.hustlerData?.length > 0 ? this.hustlerData[0].name : undefined,
    );
    this.player.currentMap = this.mapHelper.mapReader.level.identifier;

    const camera = this.cameras.main;

    // make the camera follow the player
    camera.setZoom(this.zoom, this.zoom);
    camera.startFollow(this.player, undefined, 0.05, 0.05, -5, -5);

    const map = this.mapHelper.loadedMaps.get(this.player.currentMap)!;
    map.otherGfx?.setVisible(false);

    this.handleNetwork();

    this.scene.launch('UIScene', { player: this.player });
  }

  update(time: number, delta: number) {
    this.player.update();
    this.hustlers.forEach(hustler => hustler.update());
    this.citizens.forEach(citizen => citizen.update());
    this.itemEntities.forEach(itemEntity => itemEntity.update());

    // update map
    const level = this.mapHelper.mapReader.ldtk.levels.find(
      l => l.identifier === this.player.currentMap,
    )!;
    const centerMapPos = new Phaser.Math.Vector2(
      (level.worldX + (level.worldX + level.pxWid)) / 2,
      (level.worldY + (level.worldY + level.pxHei)) / 2,
    );
    const playerPos = new Phaser.Math.Vector2(this.player.x, this.player.y);

    // check to load new maps
    // east
    if (playerPos.x - centerMapPos.x > level.pxWid / 4) this._checkDir(level, 'e', true);
    // north
    else if (playerPos.y - centerMapPos.y < -(level.pxHei / 4)) this._checkDir(level, 'n', true);
    // west
    else if (playerPos.x - centerMapPos.x < -(level.pxWid / 4)) this._checkDir(level, 'w', true);
    // south
    else if (playerPos.y - centerMapPos.y > level.pxHei / 4) this._checkDir(level, 's', true);

    // check in which map we're in
    // east
    if (playerPos.x - centerMapPos.x > level.pxWid / 2) this._checkDir(level, 'e', false);
    // north
    else if (playerPos.y - centerMapPos.y < -(level.pxHei / 2)) this._checkDir(level, 'n', false);
    // west
    else if (playerPos.x - centerMapPos.x < -(level.pxWid / 2)) this._checkDir(level, 'w', false);
    // south
    else if (playerPos.y - centerMapPos.y > level.pxHei / 2) this._checkDir(level, 's', false);
  }

  handleItemEntities() {
    EventHandler.emitter().on(Events.PLAYER_INVENTORY_REMOVE_ITEM, (item: Item, drop: boolean) => {
      if (drop)
        this.itemEntities.push(
          new ItemEntity(
            this.matter.world,
            this.player.x,
            this.player.y,
            'item_' + item.name,
            item,
          ),
        );
      console.log(this.itemEntities);
    });
    EventHandler.emitter().on(Events.ITEM_ENTITY_DESTROYED, (itemEntity: ItemEntity) => {
      this.itemEntities.splice(this.itemEntities.indexOf(itemEntity), 1);
      console.log(this.itemEntities);
    });
  }

  handleCamera() {
    // to use for important events
    // this.cameras.main.shake(700, 0.001);
    // this.cameras.main.flash(800, 0xff, 0xff, 0xff);

    // zoom to citizen when talking
    const focusCitizen = (citizen: Citizen) => {
      this.cameras.main.zoomTo(4, 700, 'Sine.easeInOut');
      this.cameras.main.pan(citizen.x, citizen.y, 700, 'Sine.easeInOut');
    };

    // cancel zoom
    // force camera to zoom even if pan's already running
    const cancelFocus = () => this.cameras.main.zoomTo(this.zoom, 700, 'Sine.easeInOut', true);

    EventHandler.emitter().on(Events.PLAYER_CITIZEN_INTERACT, focusCitizen);
    EventHandler.emitter().on(Events.PLAYER_CITIZEN_INTERACT_FINISH, cancelFocus);

    // remove event listeners
    // return () => {
    //   EventHandler.emitter().removeListener(Events.PLAYER_CITIZEN_INTERACT, focusCitizen);
    //   EventHandler.emitter().removeListener(Events.PLAYER_CITIZEN_INTERACT_COMPLETE, cancelFocus);
    //   EventHandler.emitter().removeListener(Events.PLAYER_CITIZEN_INTERACT_CANCEL, cancelFocus);
    // }
  }

  handleNetwork() {
    const networkHandler = NetworkHandler.getInstance();
    // register player
    networkHandler.sendMessage(UniversalEventNames.PLAYER_JOIN, {
      name: this.player.name,
      hustlerId: this.player.hustlerId,
      current_map: this.player.currentMap,
      x: this.player.x,
      y: this.player.y,
    });

    // wait on handshake
    networkHandler.on(
      NetworkEvents.PLAYER_HANDSHAKE,
      (data: DataTypes[NetworkEvents.PLAYER_HANDSHAKE]) => {
        this.player.setData('id', data.id);

        // initiate all players
        data.players.forEach(data => {
          this.hustlers.push(
            new Hustler(this.matter.world, data.x, data.y, data.hustlerId, data.name),
          );
          this.hustlers[this.hustlers.length - 1].setData('id', data.id);
          this.hustlers[this.hustlers.length - 1].currentMap = data.current_map;
        });
        // initiate all item entities
        data.itemEntities.forEach(iData => {
          this.itemEntities.push(
            new ItemEntity(this.matter.world, iData.x, iData.y, iData.item, Items[iData.item]),
          );
          this.itemEntities[this.itemEntities.length - 1].setData('id', iData.id);
        });

        // register listeners
        // instantiate a new hustler on player join
        networkHandler.on(
          NetworkEvents.SERVER_PLAYER_JOIN,
          (data: DataTypes[NetworkEvents.SERVER_PLAYER_JOIN]) => {
            if (data.id === this.player.getData('id')) return;

            const initializeHustler = () => {
              this.hustlers.push(
                new Hustler(this.matter.world, data.x, data.y, data.hustlerId, data.name),
              );
              this.hustlers[this.hustlers.length - 1].setData('id', data.id);
              this.hustlers[this.hustlers.length - 1].currentMap = data.current_map;
            };

            initializeHustler();
          },
        );
        // update map
        networkHandler.on(
          NetworkEvents.SERVER_PLAYER_UPDATE_MAP,
          (data: DataTypes[NetworkEvents.SERVER_PLAYER_UPDATE_MAP]) => {
            if (data.id === this.player.getData('id')) return;

            const hustler = this.hustlers.find(hustler => hustler.getData('id') === data.id);
            if (hustler) {
              hustler.currentMap = data.current_map;
              hustler.setVisible(hustler.currentMap === this.player.currentMap);
              hustler.setPosition(data.x, data.y);
            }
          },
        );
        // remove hustler on player leave
        networkHandler.on(
          NetworkEvents.SERVER_PLAYER_LEAVE,
          (data: DataTypes[NetworkEvents.SERVER_PLAYER_LEAVE]) => {
            const hustler = this.hustlers.find(hustler => hustler.getData('id') === data.id);
            if (hustler) {
              hustler.destroyRuntime();
              this.hustlers.splice(this.hustlers.indexOf(hustler), 1);
            }
          },
        );
        networkHandler.on(NetworkEvents.TICK, (data: DataTypes[NetworkEvents.TICK]) => {
          // update players positions
          data.players.forEach(p => {
            if (p.id === this.player.getData('id')) return;

            const hustler = this.hustlers.find(h => h.getData('id') === p.id);
            if (
              hustler &&
              !hustler.navigator.target &&
              new Phaser.Math.Vector2(hustler.x, hustler.y).distance(
                new Phaser.Math.Vector2(p.x, p.y),
              ) > 5
            ) {
              hustler.navigator.moveTo(p.x, p.y, undefined, () => {
                // if hustler has been stuck, just teleport him to new position
                hustler.setPosition(p.x, p.y);
              });
            }
          });
        });
        networkHandler.on(
          NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE,
          (data: DataTypes[NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE]) => {
            if (data.author === this.player.getData('id')) return;

            const hustler = this.hustlers.find(h => h.getData('id') === data.author);
            if (hustler) {
              EventHandler.emitter().emit(Events.CHAT_MESSAGE, hustler, data.message);
            }
          },
        );
        networkHandler.on(
          NetworkEvents.SERVER_PLAYER_UPDATE_MAP,
          (data: DataTypes[NetworkEvents.SERVER_PLAYER_UPDATE_MAP]) => {
            const hustler = this.hustlers.find(h => h.getData('id') === data.id);
            if (hustler) hustler.currentMap = data.current_map;
          },
        );
      },
    );
  }

  private _checkDir(level: Level, dir: string, patchMap: boolean) {
    level.__neighbours.forEach(n => {
      const lvl = this.mapHelper.mapReader.ldtk.levels.find(level => level.uid === n.levelUid)!;
      if (this.loadedMaps.find(m => m === lvl.identifier)) {
        if (!patchMap && n.dir === dir) {
          this.mapHelper.loadedMaps.get(this.player.currentMap)!.otherGfx?.setVisible(true);

          this.player.currentMap = lvl.identifier;
          const map = this.mapHelper.loadedMaps.get(this.player.currentMap)!;
          
          map.otherGfx?.setVisible(false);

          this.hustlers
            .filter(h => h.currentMap === this.player.currentMap)
            .forEach(h => h.setVisible(true));

          if (NetworkHandler.getInstance().connected)
            NetworkHandler.getInstance().sendMessage(UniversalEventNames.PLAYER_UPDATE_MAP, {
              current_map: lvl.identifier,
              x: this.player.x,
              y: this.player.y,
            });
          this.hustlers.forEach(h => {
            // hide/show hustlers if in current map
            h.setVisible(h.currentMap === this.player.currentMap);

            if (h.currentMap === this.player.currentMap) {
              // constantly check if hustler has to move to a new position on map change and if yes
              // just teleport him instead of moving him
              const id = setInterval(() => {
                if (h.navigator.target) {
                  h.setPosition(
                    this.mapHelper.map.collideLayer!.tileToWorldX(
                      (h.navigator.path[h.navigator.path.length - 1] ?? h.navigator.target).x,
                    ),
                    this.mapHelper.map.collideLayer!.tileToWorldY(
                      (h.navigator.path[h.navigator.path.length - 1] ?? h.navigator.target).y,
                    ),
                  );
                  h.navigator.cancel();
                  clearInterval(id);
                }
              });
              // clear after 1 second
              setTimeout(() => clearInterval(id), 1000);
            }
          });
        }
        return;
      }

      if (!patchMap) return;

      if (n.dir === dir) {
        this.mapHelper.createMap(lvl.identifier);
        this.mapHelper.createEntities();
        this.loadedMaps.push(this.mapHelper.mapReader.level.identifier);
      }
    });
  }
}
