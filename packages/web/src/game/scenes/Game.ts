import { Base, Clothes, Feet, Hands, Mask, Necklace, Ring, SpritesMap, Weapons } from 'game/constants/Sprites';
import Hustler from 'game/entities/Hustler';
import HustlerModel from 'game/gfx/models/HustlerModel';
import GameAnimations from 'game/anims/GameAnimations';
import { Scene, Cameras, Tilemaps } from 'phaser';
import Player from 'game/entities/player/Player';
import Citizen from 'game/entities/citizen/Citizen';
import Zone from 'game/world/Zone';
import CustomCharacter from 'game/ui/react/components/CustomCharacter';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { createTextBox } from '../ui/rex/RexUtils';
import EventHandler, { Events } from 'game/handlers/EventHandler';
import Conversation from 'game/entities/citizen/Conversation';
import { TypeKind } from 'graphql';
import Quest from 'game/quests/Quest';
import PointQuest from 'game/quests/PointQuest';
import Item from 'game/inventory/Item';
import ItemEntity from 'game/entities/ItemEntity';
import ItemQuest from 'game/quests/ItemQuest';
import BringItemQuest from 'game/quests/BringItemQuest';
import { LdtkReader } from '../world/LDtkParser';

export default class GameScene extends Scene {
  private player!: Player;
  private citizens: Citizen[] = new Array();

  private _map!: Phaser.Tilemaps.Tilemap;

  public canUseMouse: boolean = true;
  public rexUI!: RexUIPlugin;

  private accumulator: number = 0;

  get map() { return this._map; }

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  handleItemEntities()
  {
    EventHandler.emitter().on(Events.PLAYER_INVENTORY_REMOVE_ITEM, (item: Item, drop: boolean) => {
      if (drop)
        new ItemEntity(this.matter.world, this.player.x, this.player.y, 'item_' + item.name, item);
    })
  }

  create(): void {
    // create item entities when need 
    this.handleItemEntities();

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
          this.map.worldToTileX(pointer.worldX), this.map.worldToTileY(pointer.worldY), 
          () => {
            if (new Phaser.Math.Vector2(this.player).distance(new Phaser.Math.Vector2(citizenToTalkTo)) < 100)
            {
              citizenToTalkTo?.onInteraction(this.player);
              EventHandler.emitter().emit(Events.PLAYER_CITIZEN_INTERACT, citizenToTalkTo);
            }
          });
      });
    });

    // create the map
    const ldtkReader: LdtkReader = new LdtkReader(this, this.cache.json.get('map'));
    const map = ldtkReader.CreateMap('Level_0', Object.keys(this.textures.list).filter(key => key.startsWith('tileset_')));

    if (!map.collideLayer)
    {
      console.error("No collision layer found");
      return;
    }

    // enable collisions for all tiles that have index 1
    map.collideLayer.setCollision(1);
    // map.collideLayer.setDepth(100000);

    // set map as tilemap of collidelayer
    this._map = map.collideLayer.tilemap;
    // matterjs collisions
    this.matter.world.convertTilemapLayer(map.collideLayer);

    // spawn map entities
    if (map.entityLayers)
    {
      map.entityLayers.entityInstances.forEach(entity => {
        const pos = ldtkReader.GetTileXY(entity.__grid[0], entity.__grid[1], map.entityLayers!.__gridSize);
        const tileset = ldtkReader.tilesets.find(t => t.uid === entity.__tile.tilesetUid);
        if (!tileset)
          return;

        
          let frame = this.textures.get(tileset.identifier.toLowerCase()).get(entity.__identifier);
          if (frame.name === "__BASE")
            frame = this.textures.get(tileset.identifier.toLowerCase())
            .add(entity.__identifier, 0, entity.__tile.srcRect[0], entity.__tile.srcRect[1], entity.__tile.srcRect[2], entity.__tile.srcRect[3]);

          const entitySprite = this.add.sprite(entity.px[0], entity.px[1], tileset.identifier.toLowerCase(), frame.name);
          entitySprite.setDepth(40);
      });
    }
    

    this.player = new Player(this.matter.world, 200, 200, new HustlerModel(Base.Male));

    const camera = this.cameras.main;
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // make the camera follow the player
    camera.setZoom(1, 1);
    camera.startFollow(this.player, undefined, 0.05, 0.05, -5, -5);

    this.scene.launch('UIScene', { player: this.player });
  }

  update(time: number, delta: number): void {
    this.player.update();
    this.citizens.forEach(citizen => citizen.update());
  }
}
