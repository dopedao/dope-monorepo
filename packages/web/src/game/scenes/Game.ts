import { Base, Clothes, Feet, Hands, Mask, Necklace, Ring, SpritesMap, Weapons } from 'game/constants/Sprites';
import Hustler from 'game/entities/Hustler';
import HustlerModel from 'game/gfx/models/HustlerModel';
import GameAnimations from 'game/anims/GameAnimations';
import { Scene, Cameras, Tilemaps } from 'phaser';
import Player from 'game/entities/Player';
import Citizen from 'game/entities/citizen/Citizen';
import Zone from 'game/world/Zone';
import CustomCharacter from 'game/ui/react/components/CustomCharacter';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { createTextBox } from '../ui/rex/RexUtils';
import EventHandler, { Events } from 'game/handlers/EventHandler';
import Conversation from 'game/entities/citizen/Conversation';
import { TypeKind } from 'graphql';
import Quest from 'game/quests/Quest';

export default class GameScene extends Scene {
  private player!: Player;
  private citizens: Citizen[] = new Array();

  private _map!: Phaser.Tilemaps.Tilemap;
  private _hoveredTile?: Phaser.Tilemaps.Tile;

  public canUseMouse: boolean = true;
  public rexUI!: RexUIPlugin;

  get map() { return this._map; }
  get hoveredTile() { return this._hoveredTile; }

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  create(): void {
    // create all of the animations
    new GameAnimations(this.anims).create();

    this.input.on('pointerdown', () => {
      if (!this.canUseMouse || !this.hoveredTile)
        return;
      // transition to spot
      //this.cameras.main.pan(this.hoveredTile.getCenterX(), this.hoveredTile.getCenterY(), 1000, 'Sine.easeInOut');
      this.player.navigator.moveTo(this.hoveredTile.x, this.hoveredTile.y);
    });

    this._map = this.make.tilemap({ key: "map" });

    // not my assets, used only for demonstration purposes
    const tileset = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

    this.map.createLayer("Below Player", tileset, 0, 0);
    const world = this.map.createLayer("World", tileset, 0, 0);

    // render above hustlers
    world.setDepth(0);
    // set world as being collidable
    world.setCollisionByProperty({ collides: true });

    // transform world into a matter one
    const matterWorld = this.matter.world.convertTilemapLayer(world);

    let points: Phaser.Math.Vector2[] = [ new Phaser.Math.Vector2(200, 400), new Phaser.Math.Vector2(700, 400) ];
    points = points.map(point => world.worldToTileXY(point.x, point.y));

    let points2: Phaser.Math.Vector2[] = [ new Phaser.Math.Vector2(200, 600), new Phaser.Math.Vector2(700, 600) ];
    points2 = points.map(point => world.worldToTileXY(point.x, point.y));

    this.citizens.push(
      new Citizen(
        matterWorld, 600, 350, new HustlerModel(Base.Male, [], Feet.NikeCortez, Hands.BlackGloves, undefined, Necklace.Gold),
        'Michel', 
        'Patrick is not evil', 
        [new Conversation('Give me some clothes please', () => {
          this.player.addQuest(new Quest("Mr.Crackhead", "Get him some clothes ASAP"));
          return false;
        })], 
        points, true,),

      new Citizen(
      matterWorld, 500, 600, new HustlerModel(Base.Male, [Clothes.Shirtless], Feet.NikeCortez, Hands.BlackGloves),
      'Patrick', 
      'Patrick is evil', 
      [new Conversation('Hello', () => false), 
      new Conversation('Hello again!', () => true)], 
      points2, true,),
    );
  

    this.player = new Player(
      matterWorld, 500, 600,
      new HustlerModel(Base.Male, [Clothes.Shirtless], Feet.NikeCortez, Hands.BlackGloves, Mask.MrFax, Necklace.Gold, Ring.Gold));

    const above = this.map.createLayer("Above Player", tileset, 0, 0);
    
    // above world
    above.setDepth(3);

    const camera = this.cameras.main;
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // make the camera follow the player
    camera.setZoom(1.5, 1.5);
    camera.startFollow(this.player, undefined, 0.05, 0.05, -5, -5);

    this.scene.launch('UIScene', { player: this.player });
  }

  update(time: number, delta: number): void {
    this.player.update();
    this.citizens.forEach(citizen => citizen.update());

    // loop over the world's layer tiles and check if they intersect with the mouse
    // not the best method but just for demonstration purposes
    const worldLayer = this.map.getLayer('Below Player');
    for (let j = 0; j < worldLayer.data.length; j++)
    {
      for (let k = 0; k < worldLayer.data[j].length; k++)
      {
        const tile: Phaser.Tilemaps.Tile = worldLayer.data[j][k];

        //console.log(this.map.getLayer('World').data[j][k]);

        // pos in bounds, reduce tile's alpha
        if (tile.getBounds() &&
          (tile.getBounds() as Phaser.Geom.Rectangle).contains(this.input.activePointer.worldX, this.input.activePointer.worldY))
        {
          // check if there's nothing collideable on top of the tile
          if (this.map.getLayer('World').data[j][k].collides)
          {
            this._hoveredTile = undefined;
          }
          else 
          {
            tile.alpha = 0.7;
            this._hoveredTile = tile;
          }
          
        }
        else if (tile.alpha !== 1.0)
        {
          tile.alpha = 1.0;
        }
      }
    }
  }
}
