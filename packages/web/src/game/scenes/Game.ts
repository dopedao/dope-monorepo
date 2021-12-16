import { Base, Clothes, SpritesMap } from 'game/constants/Sprites';
import Player from 'game/entities/Player';
import PlayerModel from 'game/gfx/models/PlayerModel';
import GameAnimations from 'game/anims/GameAnimations';
import { Scene, Cameras, Tilemaps } from 'phaser';

export default class GameScene extends Scene {
  private player!: Player;

  private map!: Phaser.Tilemaps.Tilemap;
  private hoveredTile?: Phaser.Tilemaps.Tile;

  arrows!: Phaser.Types.Input.Keyboard.CursorKeys;
  wasd!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  create(): void {
    this.arrows = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W, 
      down: Phaser.Input.Keyboard.KeyCodes.S, 
      left: Phaser.Input.Keyboard.KeyCodes.A, 
      right: Phaser.Input.Keyboard.KeyCodes.D 
    }) as Phaser.Types.Input.Keyboard.CursorKeys;

    this.input.on('pointerdown', () => {
      if (!this.hoveredTile)
        return;
      // transition to spot
      this.cameras.main.pan(this.hoveredTile.getCenterX(), this.hoveredTile.getCenterY(), 1000, 'Sine.easeInOut');
    });

    this.map = this.make.tilemap({ key: "map" });

    // not my assets, used only for demonstration purposes
    const tileset = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

    this.map.createLayer("Below Player", tileset, 0, 0);
    const world = this.map.createLayer("World", tileset, 0, 0);
    this.map.createLayer("Above Player", tileset, 0, 0);

    // set world as being collidable
    world.setCollisionByProperty({ collides: true });

    const camera = this.cameras.main;
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // create all of the animations
    new GameAnimations(this.anims).create();

    this.player = new Player(500, 600, new PlayerModel(Base.Male, [Clothes.Shirtless]), this);

    // make the camera follow the player
    camera.startFollow(this.player, undefined, 0.05, 0.05, -5, -5);

    // set player and world collidable
    this.physics.add.collider(this.player, world);
  }

  update(time: number, delta: number): void {
    if (this.player)
      this.player.update(this.arrows, this.wasd);

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
            this.hoveredTile = undefined;
          }
          else 
          {
            tile.alpha = 0.7;
            this.hoveredTile = tile;
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
