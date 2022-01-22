import { Base, Clothes, Feet, Hands, Mask, Necklace, Ring, SpritesMap, Waist, Weapons } from 'game/constants/Sprites';
import HustlerModel from 'game/gfx/models/HustlerModel';
import GameAnimations from 'game/anims/GameAnimations';
import { Scene, Cameras, Tilemaps } from 'phaser';
import Player from 'game/entities/player/Player';
import Citizen from 'game/entities/citizen/Citizen';
import EventHandler, { Events } from 'game/handlers/EventHandler';
import Conversation from 'game/entities/citizen/Conversation';
import Item from 'game/entities/player/inventory/Item';
import ItemEntity from 'game/entities/ItemEntity';
import MapHelper from 'game/world/MapHelper';
import Quest from 'game/entities/player/quests/Quest';
import { Level } from 'game/world/LDtkParser';


export default class GameScene extends Scene {
  private player!: Player;
  private citizens: Citizen[] = new Array();
  private itemEntities: ItemEntity[] = new Array();

  // level identifiers of the current loaded maps
  private loadedMaps: string[] = new Array();
  // level identifier of the map
  private currentMap!: string;
  private _mapHelper!: MapHelper;

  public canUseMouse: boolean = true;

  readonly zoom: number = 2.5;

  get mapHelper() { return this._mapHelper; }

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  handleItemEntities()
  {
    EventHandler.emitter().on(Events.PLAYER_INVENTORY_REMOVE_ITEM, (item: Item, drop: boolean) => {
      if (drop)
        this.itemEntities.push(new ItemEntity(this.matter.world, this.player.x, this.player.y, 'item_' + item.name, item));
      console.log(this.itemEntities);
    });
    EventHandler.emitter().on(Events.ITEM_ENTITY_DESTROYED, (itemEntity: ItemEntity) => {
      this.itemEntities.splice(this.itemEntities.indexOf(itemEntity), 1);
      console.log(this.itemEntities);
    });
  }

  handleCamera()
  {
    // to use for important events
    // this.cameras.main.shake(700, 0.001);
    // this.cameras.main.flash(800, 0xff, 0xff, 0xff);

    // zoom to citizen when talking
    const focusCitizen = (citizen: Citizen) => {
      this.cameras.main.zoomTo(4, 700, 'Sine.easeInOut');
      this.cameras.main.pan(citizen.x, citizen.y, 700, 'Sine.easeInOut');
    }

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

  create(): void {
    // create item entities when need 
    this.handleItemEntities();
    // handle camera effects
    this.handleCamera();

    // create all of the animations
    new GameAnimations(this.anims).create();

    // on click pathfinding
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (!this.canUseMouse)
        return;

      if (this.player.busy)
        return;
      
      // run asynchronously
      setTimeout(() => {
        const citizenToTalkTo = this.citizens.find(citizen => citizen.shouldFollowPath && citizen.getBounds().contains(pointer.worldX, pointer.worldY));

        this.player.navigator.moveTo(
          this._mapHelper.map.displayLayers[0].tilemap.worldToTileX(pointer.worldX), this.mapHelper.map.displayLayers[0].tilemap.worldToTileY(pointer.worldY), 
          () => {
            if (new Phaser.Math.Vector2(this.player).distance(new Phaser.Math.Vector2(citizenToTalkTo)) < 100)
            {
              citizenToTalkTo?.onInteraction(this.player);
              EventHandler.emitter().emit(Events.PLAYER_CITIZEN_INTERACT, citizenToTalkTo);
            }
          });
      });
    });

    // create map and entities
    this._mapHelper = new MapHelper(this);
    this.mapHelper.createMap('NYCHood2');
    this.mapHelper.createEntities();
    this.currentMap = this.mapHelper.mapReader.level.identifier;
    this.loadedMaps.push(this.currentMap);
    
    // citizens
    this.citizens.push(new Citizen(
      this.matter.world, 
      100, 200, 
      new HustlerModel(Base.Male, undefined, Feet.NikeCortez), 
      "Michel", "Arpenteur",
      [new Conversation("Welcome to Dope City!")],
      undefined,
      //[ this.mapHelper.map.collideLayer?.worldToTileXY(new Phaser.Math.Vector2(400, 300).x, new Phaser.Math.Vector2(400, 300).y), 20, this.mapHelper.map.collideLayer!.worldToTileXY(new Phaser.Math.Vector2(700, 600).x, new Phaser.Math.Vector2(700, 600).y)],
      true
    ));

    this.itemEntities.push(new ItemEntity(this.matter.world, 100, 200, 'lol', new Item('item_test', 'jsp'), (item: Item) => {
      this.player.inventory.remove(item, true);
    }));

    // TODO when map update: create player directly from map data
    this.player = new Player(this.matter.world, 110, 200, new HustlerModel(Base.Male, [Clothes.Shirtless], Feet.NikeCortez, Hands.BlackGloves, Mask.MrFax, Waist.WaistSuspenders, Necklace.Gold, Ring.Gold));

    const camera = this.cameras.main;
    // camera.setBounds(this.mapHelper.mapReader.level.worldX - 10, this.mapHelper.mapReader.level.worldY - 10, 
    //   this.mapHelper.mapReader.level.pxWid + 10, 
    //   this.mapHelper.mapReader.level.pxHei + 10);

    // make the camera follow the player
    camera.setZoom(this.zoom, this.zoom);
    camera.startFollow(this.player, undefined, 0.05, 0.05, -5, -5);

    this.scene.launch('UIScene', { player: this.player });
  }

  update(time: number, delta: number): void {
    this.player.update();
    this.citizens.forEach(citizen => citizen.update());
    this.itemEntities.forEach(itemEntity => itemEntity.update());

    // update map 
    const level = this.mapHelper.mapReader.ldtk.levels.find(l => l.identifier === this.currentMap)!;
    const centerMapPos = new Phaser.Math.Vector2((level.worldX + (level.worldX + level.pxWid)) / 2, (level.worldY + (level.worldY + level.pxHei)) / 2);
    const playerPos = new Phaser.Math.Vector2(this.player.x, this.player.y);

    // check to load new maps
    // east
    if (playerPos.x - centerMapPos.x > level.pxWid / 4)
      this._checkDir(level, 'e', true);
    // north
    else if (playerPos.y - centerMapPos.y < -(level.pxHei / 4))
      this._checkDir(level, 'n', true);
    // west
    else if (playerPos.x - centerMapPos.x < -(level.pxWid / 4))
      this._checkDir(level, 'w', true);
    // south
    else if (playerPos.y - centerMapPos.y > level.pxHei / 4)
      this._checkDir(level, 's', true);

    // check in which map we're in
    // east
    if (playerPos.x - centerMapPos.x > level.pxWid / 2)
      this._checkDir(level, 'e', false);
    // north
    else if (playerPos.y - centerMapPos.y < -(level.pxHei / 2))
      this._checkDir(level, 'n', false);
    // west
    else if (playerPos.x - centerMapPos.x < -(level.pxWid / 2))
      this._checkDir(level, 'w', false);
    // south
    else if (playerPos.y - centerMapPos.y > level.pxHei / 2)
      this._checkDir(level, 's', false);
  }

  private _checkDir(level: Level, dir: string, patchMap: boolean)
  {
    level.__neighbours.forEach(n => {
      const lvl = this.mapHelper.mapReader.ldtk.levels.find(level => level.uid === n.levelUid)!;
      if (this.loadedMaps.find(m => m === lvl.identifier))
      {
        if (!patchMap && n.dir === dir)
        {
          this.currentMap = lvl.identifier;
        }
        return;
      }

      if (!patchMap)
        return;

      if (n.dir === dir)
      {
        this.mapHelper.createMap(lvl.identifier);
        this.mapHelper.createEntities();
        this.loadedMaps.push(this.mapHelper.mapReader.level.identifier);
        // this.cameras.main.setBounds(this.mapHelper.mapReader.level.worldX, this.mapHelper.mapReader.level.worldY, this.mapHelper.map.displayLayers[0].displayWidth, this.mapHelper.map.displayLayers[0].displayHeight);
      }
    });
  }
}
