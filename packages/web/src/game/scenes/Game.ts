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

export default class GameScene extends Scene {
  public rexUI!: RexUIPlugin;

  private hustlerData: any;

  // is the game initialized
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
  public nightColor = [0xb8, 0xbe, 0xff];

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
      // stopHandleItemEntities();
      // stopHandleCamera();

      this.loadingSpinner?.destroy();
      this.loadingSpinner = undefined;

      if (this.mapHelper)
        Object.values(this.mapHelper.loadedMaps).forEach((map) => {
          map.dispose();
        });

      EventHandler.emitter().removeAllListeners();
      NetworkHandler.getInstance().emitter.removeAllListeners();
      ControlsManager.getInstance().emitter.removeAllListeners();

      // shutdown ui scene on game scene shutdown
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

        // create map and entities
        this._mapHelper = new MapHelper(this);
        this.mapHelper.createMap(data.current_map);
        this.mapHelper.createEntities();
        this.mapHelper.createCollisions();

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

        // initiate all players
        data.players.forEach(data => {
          this._hustlers.push(
            new Hustler(this.matter.world, data.x, data.y, data.hustlerId, data.name),
          );
          this._hustlers[this._hustlers.length - 1].setData('id', data.id);
          this._hustlers[this._hustlers.length - 1].currentMap = data.current_map;
          if (data.current_map !== this.player.currentMap)
            this._hustlers[this._hustlers.length - 1].setVisible(false);
        });
        // initiate all item entities
        data.itemEntities.forEach(iData => {
          this._itemEntities.push(
            new ItemEntity(this.matter.world, iData.x, iData.y, iData.item, Items[iData.item]),
          );
          this._itemEntities[this._itemEntities.length - 1].setData('id', iData.id);
        });

        this.initializeGame(data);
    });

    this.loadingSpinner = this.add.reactDom(loadingSpinner);
  }

  update(time: number, delta: number) {
    if (!this.initialized) return;

    this._player.update();

    // dont update hustlers/citizens that are not in the same map
    // as the player.
    this._hustlers.forEach(hustler => hustler.currentMap === this._player.currentMap ? hustler.update() : {});
    this._citizens.forEach(citizen => citizen.currentMap === this._player.currentMap ? citizen.update() : {});
    this._itemEntities.forEach(itemEntity => itemEntity.update());

    // update map
    const level = this.mapHelper.mapReader.ldtk.levels.find(
      l => l.identifier === this._player.currentMap,
    )!;
    const centerMapPos = new Phaser.Math.Vector2(
      (level.worldX + (level.worldX + level.pxWid)) / 2,
      (level.worldY + (level.worldY + level.pxHei)) / 2,
    );
    const playerPos = new Phaser.Math.Vector2(this._player.x, this._player.y);

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
    // const jimmyData = Citizens["jimmy"];
    // const jimmy = new Citizen(this.matter.world, 
    //   jimmyData.position.x, jimmyData.position.y, 
    //   jimmyData.position.currentMap, 
    //   jimmyData.hustlerId, jimmyData.name, jimmyData.description,
    //   getConversation("jimmy_random", handshakeData.relations?.["jimmy"]?.text) ?? jimmyData.conversations,
    //   jimmyData.path, jimmyData.repeat, jimmyData.shouldFollowPath,
    // ).setData('id', "jimmy");
    // const oracleJones = new Citizen(
    //   this.matter.world,
    //   Citizens["oracle_jones"].position.x,
    //   Citizens["oracle_jones"].position.y,
    //   Citizens["oracle_jones"].position.currentMap,
    //   Citizens["oracle_jones"].hustlerId,
    //   Citizens["oracle_jones"].name,
    //   Citizens["oracle_jones"].description,
    //   getConversation("oracle_jones_random", handshakeData.relations?.["oracle_jones"]?.text) ?? Citizens["oracle_jones"].conversations,
    //   Citizens["oracle_jones"].path,
    //   Citizens["oracle_jones"].repeat,
    //   Citizens["oracle_jones"].shouldFollowPath,
    // );

    // this.citizens.push(jimmy, oracleJones);

    const camera = this.cameras.main;

    // make the camera follow the player
    camera.setZoom(this.zoom, this.zoom);
    camera.startFollow(this._player, true, 0.5, 0.5, -5, -5);

    this.lights.enable();
    this.lights.setAmbientColor(0xfdffdb);
    this.lights.addLight(0, 0, 100000, 0xffffff, 0);

    // this._player.questManager.add(getQuest("SEND_CHAT_MESSAGES", this)!);

    const map = this.mapHelper.loadedMaps[this._player.currentMap];
    // TODO: update function on map which gets called only when player is in the map
    map.otherGfx?.setAlpha(0);
    // start tiles animators
    map.displayLayers.forEach(l => l.getData('animators').forEach((animator: TilesAnimator) => animator.start()));

    this._handleNetwork();
    
    this.scene.launch('UIScene', { player: this._player, hustlerData: this.hustlerData });

    this.initialized = true;
    this.loadingSpinner?.destroy();
    this.loadingSpinner = undefined;
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

      // run asynchronously
      setTimeout(() => {
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

    // EventHandler.emitter().on(Events.PLAYER_CITIZEN_INTERACT_FINISH, (citizen: Citizen, cancelled: boolean) => {
    //   if (cancelled || !networkHandler.connected) return;

    //   networkHandler.sendMessage(UniversalEventNames.PLAYER_UPDATE_CITIZEN_STATE, {
    //     citizen: citizen.getData('id'),
    //     conversation: citizen.con
    // });

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
      const currentMap = this._mapHelper.loadedMaps[this._player.currentMap]; 
      // sine function imitating day/night cycle
      // only works with 1440 minutes a day cycle
      // TODO: defined in ldtk? along with position of sun
      const cursor = 230;
      const maxSunIntensity = 300; 
      const maxMoonIntensity = 50;
      const fn = (Math.sin((data.time / cursor) - (Math.PI/2)) + 1) / 2;
      const color = this.dayColor.map(color => (Math.round(color * fn)).toString(16)).join('');
      this.lights.setAmbientColor(Number.parseInt(color, 16) < 272722 ? 
        Number.parseInt(this.nightColor.map(color => (Math.round(color * (0.2 - fn))).toString(16)).join(''), 16) : 
          Number.parseInt(color, 16));

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

  private _checkDir(level: Level, dir: string, patchMap: boolean) {
    level.__neighbours.forEach(n => {
      const lvl = this.mapHelper.mapReader.ldtk.levels.find(level => level.uid === n.levelUid)!;
      if (Object.keys(this.mapHelper.loadedMaps).find(m => m === lvl.identifier)) {
        if (!patchMap && n.dir === dir && 
          this.player.x > lvl.worldX && this.player.x < lvl.worldX + lvl.pxWid &&
           this.player.y > lvl.worldY && this.player.y < lvl.worldY + lvl.pxHei) {  
          // map player is currently in
          const lastMap = this.mapHelper.loadedMaps[this._player.currentMap]!;

          // NOTE: do check directly in tilesanimator update?
          // stop tiles animations when not in current map
          lastMap.displayLayers
            .forEach(l => l.getData('animators')
              .forEach((animator: TilesAnimator) => animator.stop()));

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
          currentMap.displayLayers
            .forEach(l => l.getData('animators')
              .forEach((animator: TilesAnimator) => animator.start()));
          
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

          // TODO: multiple map change messages are getting sent. fix this
          if (NetworkHandler.getInstance().connected)
            NetworkHandler.getInstance().send(UniversalEventNames.PLAYER_UPDATE_MAP, {
              current_map: lvl.identifier,
              x: this._player.x,
              y: this._player.y,
            });

          const updateHustlerMap = (h: Hustler) => {
            if (h.currentMap === this._player.currentMap && !h.visible) {
              h.setVisible(true);
              h.setActive(true);
            } else {
              // TODO: only hide hustler if not in viewport too?
              h.setVelocity(0);
              h.navigator.cancel();
              h.setVisible(false);
              h.setActive(false);
            }
          }

          // TODO: use phaser time events instead
          this._citizens.forEach(c => updateHustlerMap(c));
          this._hustlers.forEach(h => {
            updateHustlerMap(h);

            if (h.currentMap === this._player.currentMap) {
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
        const beforeMap = performance.now(); 
        this.mapHelper.createMap(lvl.identifier);
        const afterMap = performance.now();
        
        console.info(`${lvl.identifier}: Map creation took ${afterMap - beforeMap}ms`);

        const beforeCollisions = performance.now();
        this.mapHelper.createCollisions();
        const afterCollisions = performance.now();

        console.info(`${lvl.identifier}: Collision creation took ${afterCollisions - beforeCollisions}ms`);

        const beforeEntities = performance.now();
        this.mapHelper.createEntities();
        const afterEntities = performance.now();

        console.info(`${lvl.identifier}: Entities creation took ${afterEntities - beforeEntities}ms`);
      }
    });
  }
}
