import { ComponentManager } from 'phaser3-react/src/manager';
import { getConversation } from 'game/constants/Dialogues';
import { createHustlerAnimations } from 'game/anims/HustlerAnimations';
import { DataTypes, NetworkEvents, UniversalEventNames } from 'game/handlers/network/types';
import { Howl } from 'howler';
import { Level } from 'game/world/LDtkParser';
import { Scene, Cameras, Tilemaps } from 'phaser';
import Citizen from 'game/entities/citizen/Citizen';
import ControlsManager from 'game/utils/ControlsManager';
import Conversation, { Text } from 'game/entities/citizen/Conversation';
import EventHandler, { Events } from 'game/handlers/events/EventHandler';
import GameAnimations from 'game/anims/GameAnimations';
import Hustler, { Direction } from 'game/entities/Hustler';
import Item from 'game/entities/player/inventory/Item';
import ItemEntity from 'game/entities/ItemEntity';
import Items from 'game/constants/Items';
import manifest from '../../../public/game/manifest.json';
import MapHelper from 'game/world/MapHelper';
import MusicManager from 'game/utils/MusicManager';
import NetworkHandler from 'game/handlers/network/NetworkHandler';
import Player from 'game/entities/player/Player';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import TilesAnimator from 'game/world/TilesAnimator';
import UIScene, { chakraToastStyle, loadingSpinner, toastStyle } from './UI';

import {
  NY_BUSHWICK_BASKET,
  NY_FORTGREENE_POLICE,
  NY_BROOKH_CLUB,
  NY_FORTGREEN_PARK,
  NY_BUSHWICK_BORDERSOUTH,
  NY_BROWNSVILLE_PAWN,
  NY_BROOKH_HOSPITAL,
  NY_BROWNSVILLE_DEPOT,
} from './map_const';


export default class GameScene extends Scene {
  public rexUI!: RexUIPlugin;

  private hustlerData: any;

  private initialized = false;

  private _player!: Player;
  // other players
  private _hustlers: Array<Hustler> = [];
  // npcs
  private _citizens: Citizen[] = new Array();
  private _itemEntities: ItemEntity[] = new Array();

  private loadingSpinner?: ComponentManager;

  private _mapHelper!: MapHelper;

  public canUseMouse: boolean = true;

  private _musicManager!: MusicManager;

  public dayColor = [0xfd, 0xff, 0xdb];
  public nightColor = [0xF8, 0xFE, 0xFF];

  readonly zoom: number = 3;

  private _tickRate: number = 1 / 5;

  
  get player() {
    return this._player;
  }

  get hustlers() {
    return this._hustlers;
  }

  get citizens() {
    return this._citizens;
  }

  get itemEntities() {
    return this._itemEntities;
  }

  get mapHelper() {
    return this._mapHelper;
  }

  get musicManager() {
    return this._musicManager;
  }

  get tickRate() {
    return this._tickRate;
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

    if (this.hustlerData) {
      const key = 'hustler_' + this.hustlerData.id;
      this.load.spritesheet(
        key,
        `https://api.dopewars.gg/hustlers/${this.hustlerData.id}/sprites/composite.png`,
        { frameWidth: 60, frameHeight: 60 },
      );
    }
  }

  create() {
    this.handleItemEntities();
    this._handleCamera();
    this._handleInputs();

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.loadingSpinner?.destroy();
      this.loadingSpinner = undefined;

      if (this.mapHelper)
        Object.values(this.mapHelper.loadedMaps).forEach((map) => {
          map.dispose();
        });

      EventHandler.emitter().removeAllListeners();
      NetworkHandler.getInstance().emitter.removeAllListeners();
      ControlsManager.getInstance().emitter.removeAllListeners();

      this.scene.stop('UIScene');
    });
    
    // create all of the animations
    new GameAnimations(this).create();
    if (this.hustlerData)
      createHustlerAnimations(this, 'hustler_' + this.hustlerData.id);

    // load chiptunes
    let chiptunes = Object.keys(manifest.assets.background_music).map((key) => {
      const asset = manifest.assets.background_music[key as keyof typeof manifest.assets.background_music];
      return {
        name: key.replace('chiptunes_', '').replaceAll('_', ' '),
        song: new Howl({
          src: asset.file,
          html5: true
        })
      };
    });
    this._musicManager = new MusicManager(chiptunes, true);

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
        EventHandler.emitter().emit(Events.SHOW_NOTIFICAION, {
          ...chakraToastStyle,
          title: `Error ${data.code}`,
          message: data.message,
          status: 'error',
        });
        
        NetworkHandler.getInstance().disconnect();
        NetworkHandler.getInstance().authenticator.logout()
          .finally(() => {
            this.scene.start('LoginScene', {
              hustlerData: this.hustlerData 
            });
          })
        
      }
    };
    NetworkHandler.getInstance().once(NetworkEvents.ERROR, onHandshakeError);

    // initialize game on handshake
    NetworkHandler.getInstance().once(
      NetworkEvents.PLAYER_HANDSHAKE,
      (data: DataTypes[NetworkEvents.PLAYER_HANDSHAKE]) => {
        NetworkHandler.getInstance().emitter.off(NetworkEvents.ERROR, onHandshakeError);

        this._tickRate = data.tick_rate / (1000 * 1000);

        const maps = [NY_BUSHWICK_BASKET, NY_FORTGREENE_POLICE, NY_BROOKH_CLUB, NY_FORTGREEN_PARK,
          NY_BUSHWICK_BORDERSOUTH, NY_BROWNSVILLE_PAWN, NY_BROOKH_HOSPITAL, NY_BROWNSVILLE_DEPOT];

        // create map and entities
        this._mapHelper = new MapHelper(this);
        
        for (let i = 0; i < maps.length; i++) {
          this.mapHelper.createMap(maps[i]);
          this.mapHelper.createEntities();
          this.mapHelper.createCollisions();
        }

        //Why here ?
        const security = new Citizen(this.matter.world, 1010, -575, 'NY_BrookH_Club', '', 'Security', undefined, [
          new Conversation('security_nightclub', [
              {
                text: "Nope, you're not getting in. The nightclub is not open yet.",
              }
            ], (cit, conv) => {
              conv.texts = [
                {
                  text: 'Nope, you\'re not getting in. The nightclub is not yet open.',
                }
              ]
              cit.conversations.push(conv);
            })
        ]).setVisible(false);

        const jimmy = new Citizen(
          this.matter.world, 
          300, 200, 
          'NY_Bushwick_Basket', 
          '43', 'Jimmy', 
          undefined, 
          getConversation(data.relations?.jimmy?.conversation ?? 'hello', data.relations?.jimmy?.text)).setData('id', 'jimmy');

        this.citizens.push(jimmy);
        this.citizens.push(security);

        this._player = new Player(
          this.matter.world,
          data.x, data.y,
          data.current_map,
          this.hustlerData?.id ?? '',
          this.hustlerData?.name ?? 'Hustler',
        );
        this._player.setData('id', data.id);

        // start playing music
        this.musicManager.shuffle();

        this.initiatePlayers(data);

        this.initiateItemEntities(data);

        this.initializeGame();
    });

    this.loadingSpinner = this.add.reactDom(loadingSpinner);
  }

  private initiatePlayers(data: any) {
    for (const { x, y, hustlerId, name, id, current_map } of data.players) {
      const hustler = new Hustler(this.matter.world, x, y, hustlerId, name);
      hustler.setData('id', id);
      hustler.currentMap = current_map;
      if (current_map !== this.player.currentMap) {
        hustler.setVisible(false);
      }
      this._hustlers.push(hustler);
    }
  }
  
  private initiateItemEntities(data: any) {
    for (const { x, y, item, id } of data.itemEntities) {
      const itemEntity = new ItemEntity(this.matter.world, x, y, item, Items[item]);
      itemEntity.setData('id', id);
      this._itemEntities.push(itemEntity);
    }
  }

private checkDirection(level: Level, playerPos: Phaser.Math.Vector2, centerMapPos: Phaser.Math.Vector2, widthThreshold: number, heightThreshold: number, patchMap: boolean) {
  const dx = playerPos.x - centerMapPos.x;
  const dy = playerPos.y - centerMapPos.y;
  const directions = [
    { dir: 'w', cond: dx < -widthThreshold },
    { dir: 'e', cond: dx > widthThreshold },
    { dir: 'n', cond: dy < -heightThreshold },
    { dir: 's', cond: dy > heightThreshold },
  ];

  for (const { dir, cond } of directions) {
    if (cond) this._checkDir(level, dir, patchMap);
  }
}

private updateEntities(entities: Array<any>, playerCurrentMap: string) {
  entities.forEach(entity => {
    if (entity.currentMap === playerCurrentMap) {
      entity.update();
    }
  });
}

update() {
  if (!this.initialized) {
    return;
  }

  const level = this.mapHelper.mapReader.ldtk.levels.find(l => l.identifier === this._player.currentMap)!;
  const centerMapPos = new Phaser.Math.Vector2(
    (level.worldX + (level.worldX + level.pxWid)) / 2,
    (level.worldY + (level.worldY + level.pxHei)) / 2
  );
  const playerPos = new Phaser.Math.Vector2(this._player.x, this._player.y);

  this.checkDirection(level, playerPos, centerMapPos, level.pxWid / 4, level.pxHei / 4, true);
  this.checkDirection(level, playerPos, centerMapPos, level.pxWid / 2, level.pxHei / 2, false);

  this._player.update();

  this.updateEntities(this._hustlers, this._player.currentMap);
  this.updateEntities(this._citizens, this._player.currentMap);
  this._itemEntities.forEach(itemEntity => itemEntity.update());
}



initializeGame() {
  const camera = this.cameras.main;

  // Set camera properties
  camera.setZoom(this.zoom, this.zoom);
  camera.startFollow(this._player, true, 0.5, 0.5, -5, -5);

  // Enable and configure lights
  this.lights.enable();
  this.lights.setAmbientColor(0xfdffdb);
  this.lights.addLight(0, 0, 100000, 0xffffff, 0);

  // Retrieve the current map
  const map = this.mapHelper.loadedMaps[this._player.currentMap];

  // Hide any other graphics and start tile animators
  if (map.otherGfx) {
    map.otherGfx.setAlpha(0);
  }
  map.displayLayers.forEach(layer => {
    const animators = layer.getData('animators');
    animators.forEach((animator: TilesAnimator) => animator.start());
  });

  // Handle network events
  this._handleNetwork();

  // Launch UI scene
  this.scene.launch('UIScene', { player: this._player, hustlerData: this.hustlerData });

  // Update game state
  this.initialized = true;
  if (this.loadingSpinner) {
    this.loadingSpinner.destroy();
    this.loadingSpinner = undefined;
  }
}

  handleItemEntities() {
    const onRemoveItem = (item: Item, drop: boolean) => {
      if (!drop) return;

      this._itemEntities.push(
        new ItemEntity(
          this.matter.world,
          this._player.x,
          this._player.y,
          'item_' + item.name,
          item,
        ),
      );
    }

    const onItemEntityDestroyed = (itemEntity: ItemEntity) =>
      this._itemEntities.splice(this._itemEntities.indexOf(itemEntity), 1);
    
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
      this.cameras.main.pan((this._player.x + citizen.x) / 2, (this._player.y + citizen.y) / 2, 700, 'Sine.easeInOut');
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
      if (this._player.busy || !this.canUseMouse || !this.mapHelper.map.collideLayer) return;
      
      if (Date.now() - last < delta) return;
      last = Date.now();

      const citizenToTalkTo = this._citizens.find(
        citizen => citizen.conversations.length !== 0 && 
          citizen.getBounds().contains(pointer.worldX, pointer.worldY),
      );

      const itemToPickUp = this._itemEntities.find(item =>
        item.getBounds().contains(pointer.worldX, pointer.worldY),
      );

      let interacted = false;
      const checkInteraction = () => {
        if (!citizenToTalkTo && !itemToPickUp) return;

        if (
          citizenToTalkTo &&
          new Phaser.Math.Vector2(this._player).distance(new Phaser.Math.Vector2(citizenToTalkTo)) <
            100
        ) {
          citizenToTalkTo?.onInteraction(this._player);
          EventHandler.emitter().emit(Events.PLAYER_CITIZEN_INTERACT, citizenToTalkTo);
          interacted = true;
        } else if (
          itemToPickUp &&
          new Phaser.Math.Vector2(this._player).distance(itemToPickUp) < 100
        ) {
          this._player.tryPickupItem(itemToPickUp);
          interacted = true;
        }
      }

      checkInteraction();
      if (interacted) return;
      
      this._player.navigator.moveTo(pointer.worldX, pointer.worldY, checkInteraction);
      });

    // zoom with scroll wheel
    this.input.on('wheel', (pointer: Phaser.Input.Pointer, gameObjects: Array<Phaser.GameObjects.GameObject>, deltaX: number, deltaY: number) => {
      if (this._player.busy) return;
      const targetZoom = this.cameras.main.zoom + (deltaY > 0 ? -0.3 : 0.3);
      if (targetZoom < 0.4 || targetZoom > 10) return;

      // this.cameras.main.setZoom(targetZoom);
      this.cameras.main.zoomTo(targetZoom, 200, 'Sine.easeInOut');
    });
  }

  private _handleNetwork() {
    const networkHandler = NetworkHandler.getInstance();

    // register listeners
    networkHandler.on(NetworkEvents.DISCONNECTED, () => {
      networkHandler.authenticator.logout()
        .finally(() => this.scene.start('LoginScene', {
          hustlerData: this.hustlerData,
        }));
    });
    // instantiate a new hustler on player join
    networkHandler.on(
      NetworkEvents.SERVER_PLAYER_JOIN,
      (data: DataTypes[NetworkEvents.SERVER_PLAYER_JOIN]) => {
        if (data.id === this._player.getData('id')) return;

        const initializeHustler = () => {
          this._hustlers.push(
            new Hustler(this.matter.world, data.x, data.y, data.hustlerId, data.name),
          );
          this._hustlers[this._hustlers.length - 1].setData('id', data.id);
          this._hustlers[this._hustlers.length - 1].currentMap = data.current_map;
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
        const hustler = this._hustlers.find(hustler => hustler.getData('id') === data.id);
        
        if (hustler) {
          hustler.currentMap = data.current_map;
          hustler.setVisible(hustler.currentMap === this._player.currentMap);
          hustler.setPosition(data.x, data.y);
        }
      },
    );
    // remove hustler on player leave
    networkHandler.on(
      NetworkEvents.SERVER_PLAYER_LEAVE,
      (data: DataTypes[NetworkEvents.SERVER_PLAYER_LEAVE]) => {
        const hustler = this._hustlers.find(hustler => hustler.getData('id') === data.id);
        if (hustler) {
          hustler.destroyRuntime();
          this._hustlers.splice(this._hustlers.indexOf(hustler), 1);
        }
      },
    );
    networkHandler.on(NetworkEvents.TICK, (data: DataTypes[NetworkEvents.TICK]) => {
      // only works with 1440 minutes a day cycle
      const cursor = 230;

      // Calculate the intensity factor based on the time of day
      const minFactor = 0.35;
      const maxFactor = 0.9;
      const timeFactor = Math.min(Math.max((Math.sin((data.time / cursor) - (Math.PI/2)) + 1) / 2, minFactor), maxFactor);

      // Calculate the color based on the current time factor
      const dayColorHex = this.dayColor.map(color => (Math.round(color * timeFactor)).toString(16)).join('');
      const nightColorHex = this.nightColor.map(color => (Math.round(color * (0.2 - timeFactor))).toString(16)).join('');

      // Determine which color to use based on time of day
      let ambientColor;

      if (Number.parseInt(dayColorHex, 16) < 272722) {
        ambientColor = Number.parseInt(nightColorHex, 16);
      }
      else {
        ambientColor = Number.parseInt(dayColorHex, 16);
      }

      // Set the ambient color
      this.lights.setAmbientColor(ambientColor);

      // update players positions
      data.players.forEach(p => {
        const hustler = this._hustlers.find(h => h.getData('id') === p.id);
        if (!hustler) return;

        // update hustler depth
        if (p.depth)
          hustler.setDepth(p.depth);

        // 1.2x bounds to make sure hustler doesnt tp when in viewport [tp = teleport ?]
        const cameraView = new Phaser.Geom.Rectangle(
          this.cameras.main.worldView.x - (this.cameras.main.worldView.width * 0.2), 
          this.cameras.main.worldView.y - (this.cameras.main.worldView.height * 0.2), 
          (this.cameras.main.worldView.width + (this.cameras.main.worldView.width * 0.2)) * 1.2, 
          (this.cameras.main.worldView.height + (this.cameras.main.worldView.height * 0.2)) * 1.2, 
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
          hustler.navigator.moveTo(p.x, p.y, undefined, () => {
            hustler.setPosition(p.x, p.y);
          }, false);

        }
      });
    });
    networkHandler.on(
      NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE,
      (data: DataTypes[NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE]) => {
        // check if sent by player otherwise look through hustlers (other players)
        const hustler = this._player.getData('id') === data.author ? this._player : this._hustlers.find(h => h.getData('id') === data.author);
        hustler?.say(data.message, data.color, data.timestamp, true);
      },
    );
    networkHandler.on(
      NetworkEvents.SERVER_PLAYER_PICKUP_ITEMENTITY,
      (data: DataTypes[NetworkEvents.SERVER_PLAYER_PICKUP_ITEMENTITY]) => {
        this._itemEntities.find(i => i.getData('id') === data.id)?.onPickup();
      }
    );
  }

  private _loadMapInBackground(identifier: string) {
      this.mapHelper.createCollisions();
      this.mapHelper.createEntities();
  }

  private _checkDir(level: Level, dir: string, patchMap: boolean) {
    const playerX = this.player.x;
    const playerY = this.player.y;

    for (const n of level.__neighbours) {
      const lvl = this.mapHelper.mapReader.ldtk.levels.find(l => l.uid === n.levelUid)!;
      if (lvl.identifier in this.mapHelper.loadedMaps) {
        const { worldX, worldY, pxWid, pxHei } = lvl;
        if (patchMap || n.dir !== dir || playerX <= worldX || playerX >= worldX + pxWid || playerY <= worldY || playerY >= worldY + pxHei) {
          continue;
        }
        const lastMap = this.mapHelper.loadedMaps[this._player.currentMap]!;

          // NOTE: do check directly in tilesanimator update?
          // stop tiles animations when not in current map
          lastMap.displayLayers.flatMap(l => l.getData('animators')).forEach(animator => animator.stop());

          // slowly increase alpha to max_alpha
          if (lastMap.otherGfx) {
            // cancel any previous running fading
            const fadingOutTween: Phaser.Tweens.Tween = lastMap.otherGfx.getData('fadingOut');
            if (fadingOutTween)
              fadingOutTween.restart();
            else {
              const fadeIn = this.tweens.add({
                targets: lastMap.otherGfx,
                alpha: lastMap.otherGfx.getData('max_alpha'),
                ease: Phaser.Math.Easing.Quadratic.In,
                duration: 1000,
              })
              lastMap.otherGfx!.setData('fadingOut', fadeIn);
            }
          }

          // set current map to the one we are going to
          this._player.currentMap = lvl.identifier;
          const currentMap = this.mapHelper.loadedMaps[this._player.currentMap]!;
          
          // NOTE: do check directly in tilesanimator update?
          // make sure animators are started
          for (const layer of currentMap.displayLayers) {
            for (const { start } of layer.getData('animators')) {
              start();
            }
          }
          
          // slowly decrease alpha to 0
          if (currentMap.otherGfx) {
            // cancel any previous running fading
            const fadingInTween: Phaser.Tweens.Tween = currentMap.otherGfx.getData('fadingIn');
            if (fadingInTween)
              fadingInTween.restart();
            else {
              const fadeOut = this.tweens.add({
                targets: currentMap.otherGfx,
                alpha: 0,
                ease: Phaser.Math.Easing.Quartic.Out,
                duration: 1000,
              })
              currentMap.otherGfx!.setData('fadingIn', fadeOut);
            }
          }

          const currentMapId = this._player.currentMap;

          if (NetworkHandler.getInstance()?.connected) {
            NetworkHandler.getInstance()?.send(UniversalEventNames.PLAYER_UPDATE_MAP, {
              current_map: lvl.identifier,
              x: this._player.x,
              y: this._player.y,
            });
          }

          const updateHustlerMap = (h: Hustler) => {
            if (h.currentMap === currentMapId) {
              if (!h.visible) {
                h.setVisible(true);
                h.setActive(true);
              }
            } else {
              if (h.visible) {
                h.setVelocity(0);
                h.navigator?.cancel();
                h.setVisible(false);
                h.setActive(false);
              }
            }
          };

          const collideLayer = this.mapHelper.map.collideLayer;

          this._citizens.forEach(updateHustlerMap);
          this._hustlers.forEach(h => {
            updateHustlerMap(h);

            if (h.currentMap === currentMapId && collideLayer) {
              const id = this.time.addEvent({
                delay: 1000,
                callback: () => {
                  if (h.navigator.target) {
                    h.setPosition(
                      collideLayer.tileToWorldX((h.navigator.path[h.navigator.path.length - 1] ?? h.navigator.target).x),
                      collideLayer.tileToWorldY((h.navigator.path[h.navigator.path.length - 1] ?? h.navigator.target).y),
                    );
                    h.navigator.cancel();
                    id.remove();
                  }
                },
                repeat: 0,
              });
            }
          });
        return;
      }
      else if (patchMap && n.dir === dir) {
        this._loadMapInBackground(lvl.identifier);
        return;
      }
    }

    if (!patchMap) return;
  }

}
