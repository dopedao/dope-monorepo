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
import MapHelper from 'game/world/MapHelper';

export default class GameScene extends Scene {
  private player!: Player;
  private citizens: Citizen[] = new Array();

  private _mapHelper!: MapHelper;

  public canUseMouse: boolean = true;

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
    this.mapHelper.createMap('Level_0');
    this.mapHelper.createEntities();

    // TODO when map update: create player directly from map data
    this.player = new Player(this.matter.world, 200, 200, new HustlerModel(Base.Male, [Clothes.Shirtless], Feet.NikeCortez, Hands.BlackGloves, Mask.MrFax, Necklace.Gold, Ring.Gold));

    const camera = this.cameras.main;
    camera.setBounds(0, 0, this.mapHelper.map.displayLayers[0].displayWidth, this.mapHelper.map.displayLayers[0].displayHeight);

    // make the camera follow the player
    camera.setZoom(3, 3);
    camera.startFollow(this.player, undefined, 0.05, 0.05, -5, -5);

    this.scene.launch('UIScene', { player: this.player });
  }

  update(time: number, delta: number): void {
    this.player.update();
    this.citizens.forEach(citizen => citizen.update());
  }
}
