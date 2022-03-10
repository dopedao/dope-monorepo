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
import PointQuest from 'game/entities/player/quests/PointQuest';
import Zone from 'game/world/Zone';
import InteractCitizenQuest from 'game/entities/player/quests/InteractCitizenQuest';
import UIScene, { chakraToastStyle, toastStyle } from './UI';
import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick.js';
import VirtualJoyStickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin';
import VirtualJoyStick from 'phaser3-rex-plugins/plugins/virtualjoystick.js';
import { createHustlerAnimations } from 'game/anims/HustlerAnimations';


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
    // TOOD: selected hustler data (first for now)
    this.hustlerData = data.hustlerData;
  }

  preload() {
    // first time playing the game?
    if ((window.localStorage.getItem('gameFirstTime') ?? 'false') !== 'true')
      window.localStorage.setItem('gameLoyal', 'true');

    // create map and entities
    this._mapHelper = new MapHelper(this);
    this.mapHelper.createMap('NY_Bushwick_Basket');
    this.mapHelper.createEntities();
    this.mapHelper.createCollisions();
    this.loadedMaps.push(this.mapHelper.mapReader.level.identifier);

    NetworkHandler.getInstance().listenMessages();
  }

  create() {
    // create item entities when need
    const stopHandleItemEntities = this.handleItemEntities();
    // handle camera effects
    const stopHandleCamera = this._handleCamera();
    // handle inputs
    // we dont need to unsubscribe because we're listening to scene specific events
    this._handleInputs();

    // clean
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      // unsubscribe from listeners
      stopHandleItemEntities();
      stopHandleCamera();
      // shutdown ui scene on game scene shutdown
      this.scene.stop('UIScene');
    });

    
    // create all of the animations
    new GameAnimations(this.anims).create();

    this.citizens.push(
      new Citizen(
        this.matter.world,
        45,
        300,
        this.mapHelper.mapReader.level.identifier,
        '12',
        'Michel',
        'Arpenteur',
        [
          new Conversation([{text: 'Conversation 1: Text 1'}, {text: 'Conversation 1: Text 2'}, {text: 'Conversation 1: Text 3'}]), 
          new Conversation([{text: 'Conversation 2: Text 1'}, {text: 'Conversation 2: Text 2'}, {text: 'Conversation 2: Text 3'}]),  
        ],
        [
          { position: new Phaser.Math.Vector2(200, 300), wait: 3000 },
          { position: new Phaser.Math.Vector2(400, 200) },
        ],
        true,
        true,
      ),
    );

    // TODO when map update: create player directly from map data
    this.player = new Player(
      this.matter.world,
      500,
      200,
      this.mapHelper.mapReader.level.identifier,
      this.hustlerData?.length > 0 ? this.hustlerData[0].id : undefined,
      this.hustlerData?.length > 0 ? this.hustlerData[0].name : undefined,
    );

    const camera = this.cameras.main;

    // make the camera follow the player
    camera.setZoom(this.zoom, this.zoom);
    camera.startFollow(this.player, undefined, 0.05, 0.05, -5, -5);

    const map = this.mapHelper.loadedMaps.get(this.player.currentMap)!;
    map.otherGfx?.setAlpha(0);

    this._handleNetwork();

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
    // west
    if (playerPos.x - centerMapPos.x < -(level.pxWid / 4)) this._checkDir(level, 'w', true);
    // east
    else if (playerPos.x - centerMapPos.x > level.pxWid / 4) this._checkDir(level, 'e', true);
    // north
    if (playerPos.y - centerMapPos.y < -(level.pxHei / 4)) this._checkDir(level, 'n', true);
    // south
    else if (playerPos.y - centerMapPos.y > level.pxHei / 4) this._checkDir(level, 's', true);
    
    

    // check in which map we're in
    // west
    if (playerPos.x - centerMapPos.x < -(level.pxWid / 2)) this._checkDir(level, 'w', false);
    // east
    else if (playerPos.x - centerMapPos.x > level.pxWid / 2) this._checkDir(level, 'e', false);
    // north
    if (playerPos.y - centerMapPos.y < -(level.pxHei / 2)) this._checkDir(level, 'n', false);
    // south
    else if (playerPos.y - centerMapPos.y > level.pxHei / 2) this._checkDir(level, 's', false);
  }

  handleItemEntities() {
    const onRemoveItem = (item: Item, drop: boolean) => {
      if (!drop) return;

      this.itemEntities.push(
        new ItemEntity(
          this.matter.world,
          this.player.x,
          this.player.y,
          'item_' + item.name,
          item,
        ),
      );
    }

    const onItemEntityDestroyed = (itemEntity: ItemEntity) =>
      this.itemEntities.splice(this.itemEntities.indexOf(itemEntity), 1);
    
    EventHandler.emitter().on(Events.PLAYER_INVENTORY_REMOVE_ITEM, onRemoveItem);
    EventHandler.emitter().on(Events.ITEM_ENTITY_DESTROYED, onItemEntityDestroyed);

    return () => {
      EventHandler.emitter().off(Events.PLAYER_INVENTORY_REMOVE_ITEM, onRemoveItem);
      EventHandler.emitter().off(Events.ITEM_ENTITY_DESTROYED, onItemEntityDestroyed);
    }
  }

  private _handleCamera() {
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
    return () => {
      EventHandler.emitter().removeListener(Events.PLAYER_CITIZEN_INTERACT, focusCitizen);
      EventHandler.emitter().removeListener(Events.PLAYER_CITIZEN_INTERACT_FINISH, cancelFocus);
    };
  }

  private _handleInputs() {
    // handle mouse on click
    // pathfinding & interact with objects / npcs
    let last = 0;
    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (this.player.busy || !this.canUseMouse || !this.mapHelper.map.collideLayer) return;
      
      if (Date.now() - last < 600) return;
      last = Date.now();

      // run asynchronously
      setTimeout(() => {
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
          if (NetworkHandler.getInstance().authenticator.loggedIn && this.player.inventory.add(itemToPickUp.item, true))
            NetworkHandler.getInstance().sendMessage(UniversalEventNames.PLAYER_PICKUP_ITEMENTITY, {
              id: itemToPickUp.getData('id'),
            })
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
              if (NetworkHandler.getInstance().authenticator.loggedIn && this.player.inventory.add(itemToPickUp.item, true))
                NetworkHandler.getInstance().sendMessage(UniversalEventNames.PLAYER_PICKUP_ITEMENTITY, {
                  id: itemToPickUp.getData('id'),
                })
            }
          },
        );
      });
    });

    // zoom with scroll wheel
    this.input.on('wheel', (pointer: Phaser.Input.Pointer, gameObjects: Array<Phaser.GameObjects.GameObject>, deltaX: number, deltaY: number) => {
      if (this.player.busy) return;
      const targetZoom = this.cameras.main.zoom + (deltaY < 0 ? 0.2 : -0.2);
      if (targetZoom < 1 || targetZoom > 5) return;

      this.cameras.main.zoomTo(targetZoom, 500, 'Quad.easeInOut');
    });
  }

  private _handleNetwork() {
    const networkHandler = NetworkHandler.getInstance();
    // register player
    networkHandler.sendMessage(UniversalEventNames.PLAYER_JOIN, {
      name: this.player.name,
      hustlerId: this.player.hustlerId,
      current_map: this.player.currentMap,
      x: this.player.x,
      y: this.player.y,
    });

    networkHandler.on(NetworkEvents.ERROR, (data: DataTypes[NetworkEvents.ERROR]) => {
      // TODO: login scene or something like that
      if (data.code === 401)
      {
        (this.scene.get('UIScene') as UIScene).toast({
          ...chakraToastStyle,
          status: 'error',
          title: 'Unauthorized',
        })
        networkHandler.disconnect();
        networkHandler.authenticator.logout()
          .then(() => {
            this.scene.start('LoginScene');
          })
          .catch(() => {
            this.scene.start('LoginScene');
          });
      }
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

            if (!data.hustlerId || this.textures.exists('hustler_' + data.hustlerId)) {
              initializeHustler();
              return;
            }            

            const spritesheetKey = 'hustler_' + data.hustlerId;
            this.load.spritesheet(spritesheetKey, `https://api.dopewars.gg/hustlers/${data.hustlerId}/sprites/composite.png`, {
              frameWidth: 30, frameHeight: 60 
            });
            this.load.once('filecomplete-spritesheet-' + spritesheetKey, () => {
              createHustlerAnimations(this.anims, spritesheetKey);
              initializeHustler();
            });
            this.load.start();
          },
        );
        // update map
        networkHandler.on(
          NetworkEvents.SERVER_PLAYER_UPDATE_MAP,
          (data: DataTypes[NetworkEvents.SERVER_PLAYER_UPDATE_MAP]) => {
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
            // check if sent by player otherwise look through hustlers (other players)
            const hustler = this.player.getData('id') === data.author ? this.player : this.hustlers.find(h => h.getData('id') === data.author);
            
            if (hustler)
              EventHandler.emitter().emit(Events.CHAT_MESSAGE, hustler, data.message);
          },
        );
        networkHandler.on(
          NetworkEvents.SERVER_PLAYER_PICKUP_ITEMENTITY,
          (data: DataTypes[NetworkEvents.SERVER_PLAYER_PICKUP_ITEMENTITY]) => {
            this.itemEntities.find(i => i.getData('id') === data.id)?.onPickup();
          }
        );
      },
    );
  }

  private _checkDir(level: Level, dir: string, patchMap: boolean) {
    level.__neighbours.forEach(n => {
      const lvl = this.mapHelper.mapReader.ldtk.levels.find(level => level.uid === n.levelUid)!;
      if (this.loadedMaps.find(m => m === lvl.identifier)) {
        if (!patchMap && n.dir === dir) {
          // slowly increase alpha to max_alpha
          const otherMap = this.mapHelper.loadedMaps.get(this.player.currentMap)!;
          if (otherMap.otherGfx) {
            // cancel any previous running fading
            if (otherMap.otherGfx.getData('fading'))
              clearInterval(otherMap.otherGfx.getData('fading'));

            const fadeIn = setInterval(() => {
              otherMap.otherGfx!.alpha += 0.01;
              if (otherMap.otherGfx!.alpha >= otherMap.otherGfx!.getData('max_alpha'))
              {
                otherMap.otherGfx!.alpha = otherMap.otherGfx!.getData('max_alpha');
                otherMap.otherGfx!.setData('fading', undefined);
                clearInterval(fadeIn);
              }
            });
            // id of the fadeIn interval
            otherMap.otherGfx!.setData('fading', fadeIn);
          }

          this.player.currentMap = lvl.identifier;
          const map = this.mapHelper.loadedMaps.get(this.player.currentMap)!;
          
          // slowly decrease alpha to 0
          if (map.otherGfx) {
            // cancel any previous running fading
            if (map.otherGfx.getData('fading'))
              clearInterval(map.otherGfx.getData('fading'));

            const fadeOut = setInterval(() => {
              map.otherGfx!.alpha -= 0.01;
              if (map.otherGfx!.alpha <= 0) {
                map.otherGfx!.setData('fading', undefined);
                map.otherGfx!.alpha = 0;
                clearInterval(fadeOut);
              }
            });
            // id of the fadeOut interval 
            map.otherGfx!.setData('fading', fadeOut);
          }

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
        this.mapHelper.createCollisions();
        this.mapHelper.createEntities();
        // new Promise(() => {
        //   this.mapHelper.createMap(lvl.identifier);
        // }).then(() => this.mapHelper.createCollisions())
        //   .then(() => this.mapHelper.createEntities());
        this.loadedMaps.push(this.mapHelper.mapReader.level.identifier);
      }
    });
  }
}
