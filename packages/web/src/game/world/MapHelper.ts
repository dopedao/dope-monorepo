import { s } from 'gear-rarity/dist/image-140bf8ec';
import PixelationPipelinePlugin from 'phaser3-rex-plugins/plugins/pixelationpipeline-plugin';
import { LDtkMapPack, LdtkReader } from './LDtkParser';
import PF, { DiagonalMovement } from 'pathfinding';

export default class MapHelper {
  mapReader: LdtkReader;
  scene: Phaser.Scene;

  map!: LDtkMapPack;
  entities: Phaser.GameObjects.GameObject[] = new Array();

  loadedMaps: Map<string, LDtkMapPack> = new Map();

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    // create the map
    this.mapReader = new LdtkReader(this.scene, this.scene.cache.json.get('map'));
  }

  createMap(level: string) {
    this.map = this.mapReader.CreateMap(
      level,
      // only tileset textures
      Object.keys(this.scene.textures.list).filter(key => key.startsWith('tileset_')),
    );

    // overlay the map
    // will be visible when the player is outside of the map
    this.map.otherGfx = this.scene.add.rectangle(
        this.mapReader.level.worldX, this.mapReader.level.worldY,
        this.mapReader.level.pxWid, this.mapReader.level.pxHei,
        0x000000, 0.85)
        .setDepth(1000)
        .setOrigin(0, 0);

    // enable collisions for all tiles that have index 1
    this.map.collideLayer?.setCollision(1);

    // matterjs collisions
    if (this.map.collideLayer) {
      const grid = new PF.Grid(
        this.map.collideLayer.layer.data.map(row => row.map(tile => tile.index)),
      );

      // "bolden" the pathfinding grid. will make up for the body of the hustlers.
      // keep track of the visisted neighbours to not end up in an infinite boldening loop.
      let neighbours: Array<number> = [];
      for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
          // is a neighbour, dont check
          if (neighbours.includes(x + y * grid.width)) continue;

          // if node is not walkable, also set its neighbours as not walkable.
          let node = grid.getNodeAt(x, y);
          if (!node.walkable) {
            grid.getNeighbors(node, DiagonalMovement.Always).forEach(neigh => {
              neigh.walkable = false;
              neighbours.push(neigh.x + neigh.y * grid.width);
            });
          }
        }
      }
      this.map.collideLayer.setData('pf_grid', grid);

      // greedy meshing algorithm.
      // will look for walkable neighbour tiles and create a single body for all of them instead
      // of multiple bodies.
      const tiles = this.map.collideLayer.layer.data;
      let visitedTiles: Phaser.Math.Vector2[] = new Array();

      for (let i = 0; i < this.map.collideLayer.layer.height; i++) {
        for (let j = 0; j < this.map.collideLayer.layer.width; j++) {
          const tile = new Phaser.Math.Vector2(j, i);

          if (tiles[i][j].index !== 1 || visitedTiles.find(v => v.equals(tile))) continue;

          visitedTiles.push(tile);

          let rowEndTile = tile;
          for (let x = tile.x + 1; x < this.map.collideLayer.layer.width; x++) {
            if (tiles[i][x].index !== 1) break;

            rowEndTile = new Phaser.Math.Vector2(x, i);
            visitedTiles.push(rowEndTile);
          }

          let currentTile: Phaser.Math.Vector2 = rowEndTile;
          outer: for (let y = tile.y + 1; y < this.map.collideLayer.layer.height; y++) {
            for (let x = tile.x; x <= rowEndTile.x; x++) {
              if (
                tiles[y][x].index !== 1 ||
                visitedTiles.find(v => v.equals(new Phaser.Math.Vector2(x, y)))
              )
                break outer;

              currentTile = new Phaser.Math.Vector2(x, y);
              visitedTiles.push(currentTile);
            }
          }

          let startTileBounds = tiles[tile.y][tile.x].getBounds() as Phaser.Geom.Rectangle;
          let endTileBounds = tiles[currentTile.y][
            currentTile.x
          ].getBounds() as Phaser.Geom.Rectangle;

          if (currentTile.x !== rowEndTile.x) {
            const size = new Phaser.Math.Vector2(
              endTileBounds.x - startTileBounds.x + endTileBounds.width,
              endTileBounds.height,
            );
            const pos = new Phaser.Math.Vector2(
              startTileBounds.x + size.x / 2,
              endTileBounds.y + size.y / 2,
            );
            this.scene.matter.add.rectangle(pos.x, pos.y, size.x, size.y, { isStatic: true });

            currentTile.y--;
            currentTile.x = rowEndTile.x;
            endTileBounds = tiles[currentTile.y][
              currentTile.x
            ].getBounds() as Phaser.Geom.Rectangle;
          }

          const size = new Phaser.Math.Vector2(
            endTileBounds.x - startTileBounds.x + endTileBounds.width,
            endTileBounds.y - startTileBounds.y + endTileBounds.height,
          );
          const pos = new Phaser.Math.Vector2(
            startTileBounds.x + size.x / 2,
            startTileBounds.y + size.y / 2,
          );
          this.scene.matter.add.rectangle(pos.x, pos.y, size.x, size.y, { isStatic: true });
        }
      }
    }

    this.loadedMaps.set(this.mapReader.level.identifier, this.map);
  }

  createEntities() {
    if (!this.map.entityLayer) {
      console.warn('No entity layer found');
      return;
    }

    // create all of the entities
    this.map.entityLayer.entityInstances.forEach((entity, i) => {
      const tileset = this.mapReader.tilesets.find(t => t.uid === entity.__tile.tilesetUid);
      if (!tileset) return;

      const frameId = entity.fieldInstances[0].__value ?? 'default';
      console.log('Try loading existing entity frame. Ignore warning message if there is');
      let frame =
        this.scene.textures.get(tileset.identifier.toLowerCase()).get(frameId).name !== frameId
          ? this.scene.textures.get(tileset.identifier.toLowerCase()).add(
              frameId,
              0,
              // x
              entity.__tile.srcRect[0],
              // y
              entity.__tile.srcRect[1],
              // width
              entity.__tile.srcRect[2],
              // height
              entity.__tile.srcRect[3],
            )
          : // use existing frame
            this.scene.textures.get(tileset.identifier.toLowerCase()).get(frameId);

      const pivotOffset = new Phaser.Math.Vector2(
        Math.abs(entity.__pivot[0] - 0.5) * entity.width,
        Math.abs(entity.__pivot[1] - 0.5) * entity.height,
      );

      this.entities.push(
        this.scene.add.sprite(
          this.mapReader.level.worldX +
            this.map.entityLayer!.pxOffsetX +
            entity.px[0] +
            pivotOffset.x,
          this.mapReader.level.worldY +
            this.map.entityLayer!.pxOffsetY +
            entity.px[1] +
            pivotOffset.y,
          tileset.identifier.toLowerCase(),
          frame.name,
        ),
      );
      const entitySprite = this.entities[this.entities.length - 1] as Phaser.GameObjects.Sprite;
      entitySprite
        .setName(entity.__identifier)
        .setDepth(
          (this.mapReader.level.layerInstances.length -
            this.mapReader.level.layerInstances.indexOf(this.map.entityLayer!)) *
            5,
        );

      // create shadow for entity
      // const shadowSprite = this.scene.add.ellipse(entitySprite.x, entitySprite.y + (entitySprite.displayHeight / 3), entitySprite.width, entitySprite.height / 3, 0x565a73, 0.5);
      // (this.scene.plugins.get('rexPixelationPipeline') as PixelationPipelinePlugin).add(shadowSprite, {
      //     pixelWidth: 2,
      //     pixelHeight: 2
      // })
      // shadowSprite.setDepth(entitySprite.depth - 1);
    });
  }
}
