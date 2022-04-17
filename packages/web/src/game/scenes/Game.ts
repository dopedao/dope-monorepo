import HustlerModel from 'game/gfx/models/HustlerModel';
import GameAnimations from 'game/anims/GameAnimations';
import { Scene, Cameras, Tilemaps } from 'phaser';
import Player from 'game/entities/player/Player';
import Citizen from 'game/entities/citizen/Citizen';
import EventHandler, { Events } from 'game/handlers/events/EventHandler';
import Conversation, { Text } from 'game/entities/citizen/Conversation';
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
import PointQuest from 'game/entities/player/quests/PointQuest';
import Zone from 'game/world/Zone';
import InteractCitizenQuest from 'game/entities/player/quests/InteractCitizenQuest';
import UIScene, { chakraToastStyle, loadingSpinner, toastStyle } from './UI';
import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick.js';
import VirtualJoyStickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin';
import VirtualJoyStick from 'phaser3-rex-plugins/plugins/virtualjoystick.js';
import { createHustlerAnimations } from 'game/anims/HustlerAnimations';
import PathNavigator from 'game/world/PathNavigator';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { ComponentManager } from 'phaser3-react/src/manager';
import TilesAnimator from 'game/world/TilesAnimator';
import Debug from 'game/ui/react/components/Debug';
import { Conversations, getConversation, Texts } from 'game/constants/Dialogues';
import WaterfallQuest from 'game/entities/player/quests/WaterfallQuest';

export default class GameScene extends Scene {
  private hustlerData: any;

  // is the game initialized
  private initialized = false;

  private player!: Player;
  // other players
  private hustlers: Array<Hustler> = [];
  // npcs
  private citizens: Citizen[] = new Array();
  private itemEntities: ItemEntity[] = new Array();

  private loadingSpinner?: ComponentManager;

  private _mapHelper!: MapHelper;

  public canUseMouse: boolean = true;

  readonly zoom: number = 3;

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
    const selectedHustler = localStorage.getItem(`gameSelectedHustler_${(window.ethereum as any).selectedAddress}`);
    this.hustlerData = data.hustlerData instanceof Array ? data.hustlerData.find((hustler: any) => hustler.id === selectedHustler) ?? data.hustlerData[0] : data.hustlerData;
  }

  async preload() {
    const networkHandler = NetworkHandler.getInstance();
    networkHandler.listen();

    // first time playing the game?
    if ((window.localStorage.getItem(`gameLoyal_${(window.ethereum as any).selectedAddress}`) ?? 'false') !== 'true')
      window.localStorage.setItem(`gameLoyal_${(window.ethereum as any).selectedAddress}`, 'true');
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
    new GameAnimations(this).create();

    // register player
    NetworkHandler.getInstance().send(UniversalEventNames.PLAYER_JOIN, {
      name: this.hustlerData?.name ?? 'Hustler',
      hustlerId: this.hustlerData?.id ?? '',
    });

    // if we dont receive a handshake, an error instead
    const onHandshakeError = (data: DataTypes[NetworkEvents.ERROR]) => {
      // TODO: login scene or something like that
      if (Math.floor(data.code / 100) === 4)
      {
        NetworkHandler.getInstance().disconnect();
        NetworkHandler.getInstance().authenticator.logout()
          .finally(() => {
            this.scene.start('LoginScene', this.hustlerData);
          })
      }
    };
    NetworkHandler.getInstance().once(NetworkEvents.ERROR, onHandshakeError);

    // initialize game on handshake
    NetworkHandler.getInstance().once(
      NetworkEvents.PLAYER_HANDSHAKE,
      (data: DataTypes[NetworkEvents.PLAYER_HANDSHAKE]) => {
        NetworkHandler.getInstance().emitter.off(NetworkEvents.ERROR, onHandshakeError);

        // create map and entities
        this._mapHelper = new MapHelper(this);
        this.mapHelper.createMap(data.current_map);
        this.mapHelper.createEntities();
        this.mapHelper.createCollisions();

        this.player = new Player(
          this.matter.world,
          data.x, data.y,
          data.current_map,
          this.hustlerData?.id ?? '',
          this.hustlerData?.name ?? 'Hustler',
        );
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

        this.initializeGame(data);
    });

    this.loadingSpinner = this.add.reactDom(loadingSpinner);
  }

  update(time: number, delta: number) {
    if (!this.initialized) return;

    this.player.update();

    // dont update hustlers/citizens that are not in the same map
    // as the player.
    this.hustlers.forEach(hustler => hustler.currentMap === this.player.currentMap ? hustler.update() : {});
    this.citizens.forEach(citizen => citizen.currentMap === this.player.currentMap ? citizen.update() : {});
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

  initializeGame(handshakeData: DataTypes[NetworkEvents.PLAYER_HANDSHAKE]) {
    this.citizens.push(
      new Citizen(
        this.matter.world,
        100,
        300,
        "NY_Bushwick_Basket",
        '12',
        'Jimmy',
        'Crackhead',
        getConversation(handshakeData.relations?.['test']?.conversation, handshakeData.relations?.['test']?.text),
        [
          { position: new Phaser.Math.Vector2(200, 300), wait: 3000, onMoved: (hustler: Hustler) => hustler.say('I need a damn break...')},
          { position: new Phaser.Math.Vector2(405, 200) },
          { position: new Phaser.Math.Vector2(800, 100), wait: 8000, onMoved: (hustler: Hustler) => hustler.say('I can\'t be walking around indefinitely...') },
          { position: new Phaser.Math.Vector2(100, 500) },
        ],
        true,
        false,
      ).setData('id', 'test'),
    );

    const camera = this.cameras.main;

    // make the camera follow the player
    camera.setZoom(this.zoom, this.zoom);
    camera.startFollow(this.player, true, 0.5, 0.5, -5, -5);

    this.lights.enable();
    this.lights.setAmbientColor(0xfdffdb);
    this.lights.addLight(0, 0, 100000, 0xffffff, 0);

    const map = this.mapHelper.loadedMaps[this.player.currentMap];
    // TODO: update function on map which gets called only when player is in the map
    map.otherGfx?.setAlpha(0);
    // start tiles animators
    map.displayLayers.forEach(l => l.getData('animators').forEach((animator: TilesAnimator) => animator.start()));

    this._handleNetwork();
    
    this.scene.launch('UIScene', { player: this.player, hustlerData: this.hustlerData });

    this.initialized = true;
    this.loadingSpinner?.destroy();
    this.loadingSpinner = undefined;
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
      this.cameras.main.pan((this.player.x + citizen.x) / 2, (this.player.y + citizen.y) / 2, 700, 'Sine.easeInOut');
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
    const delta = 400;
    let last = 0;
    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (this.player.busy || !this.canUseMouse || !this.mapHelper.map.collideLayer) return;
      
      if (Date.now() - last < delta) return;
      last = Date.now();

      // run asynchronously
      setTimeout(() => {
        const citizenToTalkTo = this.citizens.find(
          citizen => citizen.conversations.length !== 0 && 
            citizen.getBounds().contains(pointer.worldX, pointer.worldY),
        );
        const itemToPickUp = this.itemEntities.find(item =>
          item.getBounds().contains(pointer.worldX, pointer.worldY),
        );

        let interacted = false;
        const checkInteraction = () => {
          if (!citizenToTalkTo && !itemToPickUp) return;

          if (
            citizenToTalkTo &&
            new Phaser.Math.Vector2(this.player).distance(new Phaser.Math.Vector2(citizenToTalkTo)) <
              100
          ) {
            citizenToTalkTo?.onInteraction(this.player);
            EventHandler.emitter().emit(Events.PLAYER_CITIZEN_INTERACT, citizenToTalkTo);
            interacted = true;
          } else if (
            itemToPickUp &&
            new Phaser.Math.Vector2(this.player).distance(itemToPickUp) < 100
          ) {
            if (!NetworkHandler.getInstance().authenticator.loggedIn) {
              // TODO: unauthenticated event?
              EventHandler.emitter().emit(Events.SHOW_NOTIFICAION, {
                ...chakraToastStyle,
                title: 'Unauthenticated',
                description: 'You need to be logged in to interact with items.',
                status: 'warning',
              });
            } else {
              NetworkHandler.getInstance().send(UniversalEventNames.PLAYER_PICKUP_ITEMENTITY, {
                id: itemToPickUp.getData('id'),
              });
            }
            interacted = true;
          }
        }

        checkInteraction();
        if (interacted) return;
        
        this.player.navigator.moveTo(pointer.worldX, pointer.worldY, checkInteraction);
      });
    });

    // zoom with scroll wheel
    this.input.on('wheel', (pointer: Phaser.Input.Pointer, gameObjects: Array<Phaser.GameObjects.GameObject>, deltaX: number, deltaY: number) => {
      if (this.player.busy) return;
      const targetZoom = this.cameras.main.zoom + (deltaY > 0 ? -0.3 : 0.3);
      if (targetZoom < 0.4 || targetZoom > 10) return;

      // this.cameras.main.setZoom(targetZoom);
      this.cameras.main.zoomTo(targetZoom, 200, 'Sine.easeInOut');
    });
  }

  private _handleNetwork() {
    const networkHandler = NetworkHandler.getInstance();

    // EventHandler.emitter().on(Events.PLAYER_CITIZEN_INTERACT_FINISH, (citizen: Citizen, cancelled: boolean) => {
    //   if (cancelled || !networkHandler.connected) return;

    //   networkHandler.sendMessage(UniversalEventNames.PLAYER_UPDATE_CITIZEN_STATE, {
    //     citizen: citizen.getData('id'),
    //     conversation: citizen.con
    // });

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
          frameWidth: 60, frameHeight: 60 
        });
        this.load.once('filecomplete-spritesheet-' + spritesheetKey, () => {
          createHustlerAnimations(this, spritesheetKey);
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
      const currentMap = this._mapHelper.loadedMaps[this.player.currentMap]; 
      // sine function imitating day/night cycle
      // only works with 1440 minutes a day cycle
      // TODO: defined in ldtk? along with position of sun
      const dayColor = [0xfd, 0xff, 0xdb];
      const nightColor = [0xb8, 0xbe, 0xff];

      const cursor = 230;
      const maxSunIntensity = 300; 
      const maxMoonIntensity = 50;
      const fn = (Math.sin((data.time / cursor) - (Math.PI/2)) + 1) / 2;
      const color = dayColor.map(color => (Math.round(color * fn)).toString(16)).join('');
      this.lights.setAmbientColor(Number.parseInt(color, 16) < 272722 ? 
        Number.parseInt(nightColor.map(color => (Math.round(color * (0.2 - fn))).toString(16)).join(''), 16) : 
          Number.parseInt(color, 16));

      // update players positions
      data.players.forEach(p => {
        const hustler = this.hustlers.find(h => h.getData('id') === p.id);
        if (!hustler) return;

        // 1.2x bounds to make sure hustler doesnt tp when in viewport 
        const cameraView = new Phaser.Geom.Rectangle(
          this.cameras.main.worldView.x - (this.cameras.main.worldView.width * 0.2), 
          this.cameras.main.worldView.y - (this.cameras.main.worldView.height * 0.2), 
          this.cameras.main.worldView.width * 1.2, this.cameras.main.worldView.height * 1.2
        );
        // if not visible to camera, dont bother doing pathfinding, just tp to position
        if (!cameraView.contains(hustler.x, hustler.y) && !cameraView.contains(p.x, p.y)) {
          hustler.setPosition(p.x, p.y);
          return;
        }

        if (
          !hustler.navigator.target &&
          new Phaser.Math.Vector2(hustler.x, hustler.y).distance(
            new Phaser.Math.Vector2(p.x, p.y),
          ) > 5
        ) {
          // just define the target without doing the pathfinding. we assume the position is correct
          // will save a lot of cpu cycles but can introduce some unexpected behaviour
          hustler.navigator.target = new Phaser.Math.Vector2(p.x, p.y);

          // using pathfinding, heavy cpu usage
          // hustler.navigator.moveTo(p.x, p.y, undefined, () => {
          //   // if hustler has been stuck, dont pathfind
          //   const targetTile = currentMap.collideLayer?.getTileAtWorldXY(p.x, p.y);
          //   if (targetTile && !targetTile.collides)
          //     hustler.navigator.target = new Phaser.Math.Vector2(targetTile.x, targetTile.y);
          //   else 
          //     hustler.setPosition(p.x, p.y);
          // });
        }
      });
    });
    networkHandler.on(
      NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE,
      (data: DataTypes[NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE]) => {
        // check if sent by player otherwise look through hustlers (other players)
        const hustler = this.player.getData('id') === data.author ? this.player : this.hustlers.find(h => h.getData('id') === data.author);
        
        hustler?.say(data.message, data.timestamp, true);
      },
    );
    networkHandler.on(
      NetworkEvents.SERVER_PLAYER_PICKUP_ITEMENTITY,
      (data: DataTypes[NetworkEvents.SERVER_PLAYER_PICKUP_ITEMENTITY]) => {
        this.itemEntities.find(i => i.getData('id') === data.id)?.onPickup();
      }
    );
  }

  private _checkDir(level: Level, dir: string, patchMap: boolean) {
    level.__neighbours.forEach(n => {
      const lvl = this.mapHelper.mapReader.ldtk.levels.find(level => level.uid === n.levelUid)!;
      if (Object.keys(this.mapHelper.loadedMaps).find(m => m === lvl.identifier)) {
        if (!patchMap && n.dir === dir) {  
          // map player is currently in
          const otherMap = this.mapHelper.loadedMaps[this.player.currentMap]!;
          // NOTE: do check directly in tilesanimator update?
          // stop tiles animations when not in current map
          otherMap.displayLayers
            .forEach(l => l.getData('animators')
              .forEach((animator: TilesAnimator) => animator.stop()));
          // slowly increase alpha to max_alpha
          if (otherMap.otherGfx) {
            // cancel any previous running fading
            if (otherMap.otherGfx.getData('fading'))
              clearInterval(otherMap.otherGfx.getData('fading'));

            // TODO: use phaser time events instead
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

          // set current map to the one we are going to
          this.player.currentMap = lvl.identifier;
          const map = this.mapHelper.loadedMaps[this.player.currentMap]!;
          
          // NOTE: do check directly in tilesanimator update?
          // make sure animators are started
          map.displayLayers
            .forEach(l => l.getData('animators')
              .forEach((animator: TilesAnimator) => animator.start()));
          
          // TODO: use phaser time events instead
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

          // TODO: multiple map change messages are getting sent. fix this
          if (NetworkHandler.getInstance().connected)
            NetworkHandler.getInstance().send(UniversalEventNames.PLAYER_UPDATE_MAP, {
              current_map: lvl.identifier,
              x: this.player.x,
              y: this.player.y,
            });

          // const updateHustlerMap = (h: Hustler) => {
          //   // hide/show hustlers if in current map
          //   h.setVisible(h.currentMap === this.player.currentMap);
          //   // cancel path/velocity if not same map
          //   if (h.currentMap !== this.player.currentMap)
          //   {
          //     h.navigator.cancel();
          //     h.setVelocity(0);
          //   }
          // }

          const updateHustlerMap = (h: Hustler) => {
            if (h.currentMap === this.player.currentMap && !h.visible) {
              h.setVisible(true);
              h.setActive(true);
            } else {
              h.setVelocity(0);
              h.navigator.cancel();

              h.setVisible(false);
              h.setActive(false);
            }
          }

          // TODO: use phaser time events instead
          this.citizens.forEach(c => updateHustlerMap(c));
          this.hustlers.forEach(h => {
            updateHustlerMap(h);

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
      }
    });
  }
}
