import { Base, spritesDict } from 'game/constants/Sprites';
import Player from 'game/entities/Player';
import PlayerModel from 'game/gfx/models/PlayerModel';
import GameAnimations from 'game/anims/GameAnimations';
import { Scene, Cameras, Tilemaps } from 'phaser';

export default class GameScene extends Scene {
  private player!: Player;
  private map: Phaser.Tilemaps.Tilemap | undefined;
  private controls: Cameras.Controls.FixedKeyControl | undefined;

  private hoveredTile: Phaser.Tilemaps.Tile | undefined;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  create(): void {
    this.input.on('pointerdown', () => {
      // transition to spot
      this.cameras.main.pan(this.input.activePointer.worldX, this.input.activePointer.worldY, 1000, 'Sine.easeInOut');
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

    this.player = new Player(500, 600, new PlayerModel(Base.Male), this);

    // make the camera follow the player
    camera.startFollow(this.player, undefined, 0.05, 0.05, -5, -5);

    // set player and world collidable
    this.physics.add.collider(this.player, world);
  }

  update(time: number, delta: number): void {
    if (this.player)
      this.player.update();

    // just basically loop over all of the available layers and their tiles and check if they intersect with the mouse
    // not the best method but just for demonstration purposes
    if (this.map)
        this.map.layers.forEach(layer => {
          for (let j = 0; j < layer.data.length; j++)
          {
            for (let k = 0; k < layer.data[j].length; k++)
            {
              const tile: Phaser.Tilemaps.Tile = layer.data[j][k];

              // pos in bounds, reduce tile's alpha
              if (tile.getBounds() && (tile.getBounds() as Phaser.Geom.Rectangle).contains(this.input.activePointer.worldX, this.input.activePointer.worldY))
              {
                tile.alpha = 0.7;
                this.hoveredTile = tile;
              }
              else if (tile.alpha !== 1.0)
              {
                tile.alpha = 1.0;
              }
            }
          }
        })
  }
}
