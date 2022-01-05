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

  create(): void {
    // create all of the animations
    new GameAnimations(this.anims).create();

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
              citizenToTalkTo?.onInteraction();
              EventHandler.emitter().emit(Events.PLAYER_INTERACT_NPC, citizenToTalkTo);
            }
          });
      });
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

    let points = [ new Phaser.Math.Vector2(200, 400), 1, new Phaser.Math.Vector2(700, 400) ];
    points = points.map(point => point instanceof Phaser.Math.Vector2 ? world.worldToTileXY(point.x, point.y) : point);

    let points2 = [ new Phaser.Math.Vector2(200, 600), new Phaser.Math.Vector2(700, 600) ];
    points2 = points2.map(point => point instanceof Phaser.Math.Vector2 ? world.worldToTileXY(point.x, point.y) : point);

    const crackHeadClothesZone = new Zone(this.matter.add.circle(300, 1200, 50), this);

    this.citizens.push(
      new Citizen(
        matterWorld, 600, 350, new HustlerModel(Base.Male, [], Feet.NikeCortez, Hands.BlackGloves, undefined, Necklace.Gold),
        'Michel', 
        'Patrick is not evil', 
        [new Conversation('Give me some clothes please', () => {
          this.player.questManager.addQuest(new PointQuest(crackHeadClothesZone, "Mr.Crackhead", "Get him some clothes ASAP"));
          return false;
        })], 
        points, true,),

      // new Citizen(
      // matterWorld, 500, 600, new HustlerModel(Base.Male, [Clothes.Shirtless], Feet.NikeCortez, Hands.BlackGloves),
      // 'Patrick', 
      // 'Patrick is evil', 
      // [new Conversation('Hello', () => false), 
      // new Conversation('Hello again!', () => true)], 
      // points2, true,),
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
  }
}
