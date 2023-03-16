import PixelationPipelinePlugin from 'phaser3-rex-plugins/plugins/pixelationpipeline-plugin';
import { LDtkMapPack, LdtkReader } from './LDtkParser';
import PF, { DiagonalMovement } from 'pathfinding';
import { AsepriteAnimation } from './AsepriteAnim';

export default class MapHelper {
  mapReader: LdtkReader;
  scene: Phaser.Scene;

  map!: LDtkMapPack;

  loadedMaps: { [key: string]: LDtkMapPack } = {};
  

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
        this.mapReader.level.pxWid + 0, this.mapReader.level.pxHei + 0,
        0x000000, 0.9)
        .setData('max_alpha', 0.9)
        .setDepth(10000)
        .setOrigin(0, 0);

    this.loadedMaps[this.mapReader.level.identifier] = this.map;
  }

  createCollisions() {
    // enable collisions for all tiles that have index 1

    console.log("CREATE COLLISION FUNC");

    this.map.collideLayer?.setCollision(1);

    // create matterjs collisions from collidelayer
    if (this.map.collideLayer) {
      const grid = new PF.Grid(
        this.map.collideLayer.layer.data.map(row => row.map(tile => tile.index)),
      );

      // if map is locked, create collisions on its borders
      if (this.mapReader.level.fieldInstances.find(f => f.__identifier === 'locked')?.__value === true) {
        // top border
        this.scene.matter.add.rectangle(
          this.map.collideLayer.x + (this.map.collideLayer.displayWidth / 2), 
          this.map.collideLayer.y + (this.map.collideLayer.layer.tileHeight / 2),
          this.map.collideLayer.displayWidth,
          this.map.collideLayer.layer.tileHeight,
          {
            isStatic: true,
          }
        );

        // bottom border
        this.scene.matter.add.rectangle(
          this.map.collideLayer.x + (this.map.collideLayer.displayWidth / 2),
          (this.map.collideLayer.y + this.map.collideLayer.displayHeight) - (this.map.collideLayer.layer.tileHeight / 2),
          this.map.collideLayer.displayWidth,
          this.map.collideLayer.layer.tileHeight,
          {
            isStatic: true,
          }
        );

        // left border
        this.scene.matter.add.rectangle(
          this.map.collideLayer.x + (this.map.collideLayer.layer.tileWidth / 2),
          this.map.collideLayer.y + (this.map.collideLayer.displayHeight / 2),
          this.map.collideLayer.layer.tileWidth,
          this.map.collideLayer.displayHeight,
          {
            isStatic: true,
          }
        );

        // right border
        this.scene.matter.add.rectangle(
          (this.map.collideLayer.x + this.map.collideLayer.displayWidth) - (this.map.collideLayer.layer.tileWidth / 2),
          this.map.collideLayer.y + (this.map.collideLayer.displayHeight / 2),
          this.map.collideLayer.layer.tileWidth,
          this.map.collideLayer.displayHeight,
          {
            isStatic: true,
          }
        );
      }

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
  }

  createEntities() 
  {

    console.log("CREATE ENTITIES FUNC");

    if (this.map.entityLayers.length === 0) {
      console.warn('No entity layer found');
      return;
    }

    // create all of the entities
    this.map.entityLayers.forEach(l => l.entityInstances.forEach((entity, i) => {
      const tileset = this.mapReader.tilesets.find(t => t.uid === entity.__tile?.tilesetUid);

      let frameId: string;
      let frame: Phaser.Textures.Frame;
      if (tileset) {
        frameId = `${entity.__identifier}_${entity.fieldInstances[0]?.__value ?? 'default'}`;
        console.log('Try loading existing entity frame. Ignore warning message if there is');
        frame =
          this.scene.textures.get(tileset.identifier.toLowerCase()).get(frameId).name !== frameId
            ? this.scene.textures.get(tileset.identifier.toLowerCase()).add(
                frameId,
                0,
                // x
                entity.__tile.x,
                // y
                entity.__tile.y,
                // width
                entity.__tile.w,
                // height
                entity.__tile.h,
              )
            : // use existing frame
              this.scene.textures.get(tileset.identifier.toLowerCase()).get(frameId);
      }
      

      const pivotOffset = new Phaser.Math.Vector2(
        Math.abs(entity.__pivot[0] - 0.5) * entity.width,
        Math.abs(entity.__pivot[1] - 0.5) * entity.height,
      );

      const shouldBody = entity.fieldInstances.find(f => f.__identifier === 'body')?.__value ?? true;
      const spritePos = new Phaser.Math.Vector2(
        this.mapReader.level.worldX +
          l.pxOffsetX +
          entity.px[0] +
          pivotOffset.x,
        this.mapReader.level.worldY +
          l.pxOffsetY +
          entity.px[1] +
          pivotOffset.y,
      );

      const entityDepth = entity.fieldInstances.find(f => f.__identifier === 'Depth');
      let definedDepth;
      if (entityDepth) 
        definedDepth = typeof entityDepth.__value === 'number' ? entityDepth.__value : parseInt(entityDepth.__value);
      else if (definedDepth = this.mapReader.level.fieldInstances.find(f => f.__identifier.toLowerCase() === l.__identifier.toLowerCase()))
        definedDepth = typeof definedDepth.__value === 'number' ? definedDepth.__value : parseInt(definedDepth.__value);
      else
        definedDepth = (this.mapReader.level.layerInstances.length -
          this.mapReader.level.layerInstances.indexOf(l)) *
          5

      if (!tileset) {
        if (shouldBody) {
          const body = this.scene.matter.add.rectangle(spritePos.x, spritePos.y, entity.width, entity.height, {
            isStatic: true,
            isSensor: true,
          });
          // (body as any).depth = definedDepth;
        }
        return;
      }

      const entitySprite = shouldBody ? this.scene.matter.add.sprite(
        spritePos.x, spritePos.y,
        tileset.identifier.toLowerCase(),
        frame!.name,
        {
          // TODO: have these options on ldtk?
          isStatic: true,
          isSensor: true,
        }
      ) : this.scene.add.sprite(
        spritePos.x,
        spritePos.y,
        tileset.identifier.toLowerCase(),
        frame!.name
      );

      this.map.entities.push(entitySprite);

      entitySprite
        .setName(entity.__identifier)
        .setDepth(definedDepth);
      
      if (!l.__identifier.includes('Night')) entitySprite.setPipeline('Light2D');

      // search light field, and create light if exists
      const light = entity.fieldInstances.find(f => f.__identifier === 'light')?.__value;
      if (light) {
        const lightData = JSON.parse(light);
        this.scene.lights.addLight(entitySprite.x, entitySprite.y, lightData.radius, lightData.color, lightData.intensity);
      }

      if (this.scene.cache.json.exists(tileset!.identifier.toLowerCase())) {
        const aseprite: AsepriteAnimation = this.scene.cache.json.get(tileset!.identifier.toLowerCase());
        const frameTag = aseprite.meta.frameTags.find(tag => entity.__identifier.includes(tag.name));
        let frames = frameTag?.from !== undefined && frameTag?.to !== undefined ? Object.keys(aseprite.frames).slice(frameTag.from, frameTag.to + 1) : Object.keys(aseprite.frames);

        // NOTE: frameId instead of entity identifier as anim key?
        const anim = this.scene.anims.get(entity.__identifier) ?? this.scene.anims.create({
          key: entity.__identifier,
          frames: frames.map(key => {
            const asepriteFrame = aseprite.frames[key];
            const frame = this.scene.textures.get(tileset!.identifier.toLowerCase()).add(frameId + '_' + key, 0, asepriteFrame.frame.x, asepriteFrame.frame.y, asepriteFrame.frame.w, asepriteFrame.frame.h);
            return {
              key: tileset!.identifier.toLowerCase(),
              frame: frame.name,
              duration: asepriteFrame.duration,
            };
          }),
          repeat: -1,
          // we dont really care about the framerate
          // duration of frames is already defined
          frameRate: 10000,
        });

        if (anim) {
          entitySprite.anims.play({
            key: entity.__identifier,
            startFrame: Math.floor(Math.random() * anim.frames.length)
          });
        }
      }

      // create shadow for entity
      // const shadowSprite = this.scene.add.ellipse(entitySprite.x, entitySprite.y + (entitySprite.displayHeight / 3), entitySprite.width, entitySprite.height / 3, 0x565a73, 0.5);
      // (this.scene.plugins.get('rexPixelationPipeline') as PixelationPipelinePlugin).add(shadowSprite, {
      //     pixelWidth: 2,
      //     pixelHeight: 2
      // })
      // shadowSprite.setDepth(entitySprite.depth - 1);
    }));
  }
}
