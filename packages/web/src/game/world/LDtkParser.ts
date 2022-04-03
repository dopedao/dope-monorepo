import TilesAnimator from "./TilesAnimator";
import AnimatedTiles from "./TilesAnimator";

export class LdtkReader {
  json: any;
  scene: Phaser.Scene;
  level!: Level;
  tilesets: Array<Tileset>;
  ldtk: iLDtk;
  // filejson is the raw content of the ldtk project file
  constructor(scene: Phaser.Scene, filejson: any) {
    this.json = filejson;
    this.scene = scene;
    this.tilesets = this.json.defs.tilesets;
    this.ldtk = filejson;
  }

  CreateMap(levelName: string, tileset: string | string[]): LDtkMapPack {
    let j = this.ldtk;
    this.level = j.levels.find((l: Level) => l.identifier === levelName)!;

    if (!this.level) throw new Error('Level not found');

    let mappack: LDtkMapPack = new LDtkMapPack(this.level.identifier);

    mappack.bgColor = this.level.bgColor ?? undefined;
    mappack.settings = this.level.fieldInstances;
    this.level.layerInstances.forEach(layer => {
      let usedTileset;
      if (typeof tileset === 'string') usedTileset = tileset;
      else
        usedTileset = tileset.find(
          t =>
            t ===
            this.tilesets.find(t2 => t2.uid === layer.__tilesetDefUid)?.identifier.toLowerCase(),
        );

      if (!usedTileset) {
        console.warn('No tileset found for layer ' + layer.__identifier);
      }

      // non auto int grid layer
      if (layer.__type === 'IntGrid' && layer.autoLayerTiles.length === 0) {
        mappack.intGridLayers.push(this.CreateIntGridLayer(layer, usedTileset));
        // auto int grid layer
      } else if (usedTileset && layer.__type === 'IntGrid' && layer.autoLayerTiles.length > 0) {
        mappack.displayLayers.push(this.CreateAutoLayer(layer, usedTileset));
        // tiles layer
      } else if (usedTileset && layer.__type === 'Tiles') {
        mappack.displayLayers.push(this.CreateTileLayer(layer, usedTileset));
      }
    });
    mappack.entityLayer = this.level.layerInstances.find(
      (l: LayerInstance) => l.__type === 'Entities',
    );
    mappack.collideLayer = mappack.intGridLayers.find(e => e.name === 'Collisions');
    
    return mappack;
  }

  CreateTileLayer(layer: LayerInstance, tileset: string): Phaser.Tilemaps.TilemapLayer {
    let map: Phaser.Tilemaps.Tilemap;
    let csv = new Array(layer.__cHei);
    for (var i = 0; i < csv.length; i++) {
      csv[i] = new Array(layer.__cWid);
    }
    let tilesetObj = this.tilesets.find((t: any) => t.uid === layer.__tilesetDefUid)!;
    let tilesetWidth = tilesetObj.__cWid;
    let tileSize = layer.__gridSize;

    // 10 is stacked maximum layers
    let stackLayers: GridTile[][] = new Array(10);
    for (let i = 0; i < stackLayers.length; i++) stackLayers[i] = new Array();

    // number of stacked tiles
    let layerCount = 0;
    layer.gridTiles.forEach(t => {
      let tileloc = this.GetTileXY(t.px[0], t.px[1], layer.__gridSize);
      if (!csv[tileloc.y][tileloc.x]) {
        csv[tileloc.y][tileloc.x] = this.GetTileID(t.src[0], t.src[1], tileSize, tilesetWidth);
        layerCount = 0;
      } else {
        stackLayers[layerCount].push(t);
        layerCount++;
      }
    });

    map = this.scene.make.tilemap({
      data: csv,
      tileWidth: layer.__gridSize,
      tileHeight: layer.__gridSize,
    });

    const mainTileset = map.addTilesetImage(tileset);

    // check if we have custom data - animated tiles
    let gid = mainTileset.total + 1;
    const tilesetRef = this.tilesets.find(t => t.uid === layer.__tilesetDefUid);  
    if (tilesetRef && tilesetRef.customData.length > 0) {
      tilesetRef.customData.forEach(t => {
        const data = JSON.parse(t.data);
        if (data.anim)
        {
          const animTileset = map.addTilesetImage(data.anim);
          animTileset.firstgid = gid;
          gid += animTileset.total + 1;
        }
      });
    }

    const orderId =
      this.ldtk.levels.find(l => l.uid === layer.levelId)!.layerInstances.length -
      this.ldtk.levels.find(l => l.uid === layer.levelId)!.layerInstances.indexOf(layer);
    let l = map
      .createLayer(
        0,
        map.tilesets,
        this.level.worldX + layer.pxOffsetX,
        this.level.worldY + layer.pxOffsetY,
      )
      .setName(layer.__identifier)
      .setData('id', orderId)
      .setData('animators', [])
      .setDepth(orderId * 5)
      .setPipeline('Light2D')
      .setAlpha(layer.__opacity)
      .setVisible(true);

    if (tilesetRef && tilesetRef.customData.length > 0) {
      tilesetRef.customData.forEach(t => {
        const data = JSON.parse(t.data);
        if (data.anim)
        {
          const tilesAnim = new AnimatedTiles(this.scene, t.tileId, l, data.anim);
          l.getData('animators').push(tilesAnim);
          // tilesAnim.start();
        }
      });
    }

    stackLayers.forEach((tiles, i) => {
      if (tiles.length === 0) return;

      const newLayer = map
        .createBlankLayer(
          `${layer.__identifier} - ${i}`,
          map.tilesets,
          this.level.worldX + layer.pxOffsetX,
          this.level.worldY + layer.pxOffsetY,
        )
        .setPipeline('Light2D')
        .setDepth(l.depth)
        .setVisible(true);

      tiles.forEach(t => {
        let tileloc = this.GetTileXY(t.px[0], t.px[1], layer.__gridSize);
        const tile = newLayer.putTileAt(
          this.GetTileID(t.src[0], t.src[1], tileSize, tilesetWidth),
          tileloc.x,
          tileloc.y,
        );

        if (t.f !== 0) {
          if (t.f === 1) tile.flipX = true;
          else if (t.f === 2) tile.flipY = true;
          else {
            tile.flipX = true;
            tile.flipY = true;
          }
        }
      });

      // go through each tile and check if they are used,
      // if not, clean them up and free memory
      newLayer.layer.data.forEach((tiles, i) => tiles.forEach((tile, j) => {
        if (tile.index === -1)
        {
          newLayer.layer.data[i][j].destroy();
          delete newLayer.layer.data[i][j];
        }
      }));
    });

    layer.gridTiles.forEach(t => {
      if (t.f != 0) {
        let tileloc = this.GetTileXY(t.px[0], t.px[1], layer.__gridSize);
        let tile = l.getTileAt(tileloc.x, tileloc.y);
        if (tile != null) {
          if (t.f == 1) tile.flipX = true;
          else if (t.f == 2) tile.flipY = true;
          else {
            tile.flipX = true;
            tile.flipY = true;
          }
        }
      }
    });
    return l;
  }

  CreateAutoLayer(layer: LayerInstance, tileset: string): Phaser.Tilemaps.TilemapLayer {
    let map: Phaser.Tilemaps.Tilemap;
    let csv = new Array(layer.__cHei);
    for (var i = 0; i < csv.length; i++) {
      csv[i] = new Array(layer.__cWid);
    }
    let tilesetObj = this.tilesets.find((t: any) => t.uid === layer.__tilesetDefUid)!;
    let tilesetWidth = tilesetObj.__cWid;
    let tileSize = layer.__gridSize;

    layer.autoLayerTiles.forEach(t => {
      let tileloc = this.GetTileXY(t.px[0], t.px[1], layer.__gridSize);
      csv[tileloc.y][tileloc.x] = this.GetTileID(t.src[0], t.src[1], tileSize, tilesetWidth);
    });

    map = this.scene.make.tilemap({
      data: csv,
      tileWidth: layer.__gridSize,
      tileHeight: layer.__gridSize,
    });

    const mainTileset = map.addTilesetImage(tileset);

    // check if we have custom data - animated tiles
    let gid = mainTileset.total + 1;
    const tilesetRef = this.tilesets.find(t => t.uid === layer.__tilesetDefUid);  
    if (tilesetRef && tilesetRef.customData.length > 0) {
      tilesetRef.customData.forEach(t => {
        const data = JSON.parse(t.data);
        if (data.anim)
        {
          const animTileset = map.addTilesetImage(data.anim);
          animTileset.firstgid = gid;
          gid += animTileset.total + 1;
        }
      });
    }

    const orderId =
      this.ldtk.levels.find(l => l.uid === layer.levelId)!.layerInstances.length -
      this.ldtk.levels.find(l => l.uid === layer.levelId)!.layerInstances.indexOf(layer);
    let l = map
      .createLayer(
        0,
        map.tilesets,
        this.level.worldX + layer.pxOffsetX,
        this.level.worldY + layer.pxOffsetY,
      )
      .setName(layer.__identifier)
      .setData('id', orderId)
      .setData('animators', [])
      .setDepth(orderId * 5)
      .setPipeline('Light2D')
      .setAlpha(layer.__opacity)
      .setVisible(true);

    if (tilesetRef && tilesetRef.customData.length > 0) {
      tilesetRef.customData.forEach(t => {
        const data = JSON.parse(t.data);
        if (data.anim)
        {
          const tilesAnim = new AnimatedTiles(this.scene, t.tileId, l, data.anim);
          l.getData('animators').push(tilesAnim);
          // tilesAnim.start();
        }
      });
    }

    layer.autoLayerTiles.forEach(t => {
      if (t.f != 0) {
        let tileloc = this.GetTileXY(t.px[0], t.px[1], layer.__gridSize);
        let tile = l.getTileAt(tileloc.x, tileloc.y);
        if (tile != null) {
          if (t.f == 1) tile.flipX = true;
          else if (t.f == 2) tile.flipY = true;
          else {
            tile.flipX = true;
            tile.flipY = true;
          }
        }
      }
    });

    return l;
  }

  GetTileXY(x: number, y: number, size: number): { x: number; y: number } {
    return {
      x: x / size,
      y: y / size,
    };
  }

  private GetTileID(x: number, y: number, size: number, tilesetWidth: number): number {
    x = x / size;
    y = y / size;
    return x + y * tilesetWidth;
  }

  CreateIntGridLayer(layer: LayerInstance, tileset?: string): Phaser.Tilemaps.TilemapLayer {
    let map: Phaser.Tilemaps.Tilemap;
    var csv = layer.intGridCsv;
    const newArr = [];

    while (csv.length) newArr.push(csv.splice(0, layer.__cWid));

    map = this.scene.make.tilemap({
      data: newArr,
      tileWidth: layer.__gridSize,
      tileHeight: layer.__gridSize,
    });

    let tilesetRef;
    if (tileset) {
      const mainTileset = map.addTilesetImage(tileset);

      // check if we have custom data - animated tiles
      let gid = mainTileset.total + 1;
      tilesetRef = this.tilesets.find(t => t.uid === layer.__tilesetDefUid);  
      if (tilesetRef && tilesetRef.customData.length > 0) {
        tilesetRef.customData.forEach(t => {
          const data = JSON.parse(t.data);
          if (data.anim)
          {
            const animTileset = map.addTilesetImage(data.anim);
            animTileset.firstgid = gid;
            gid += animTileset.total + 1;
          }
        });
      }
    }

    const orderId =
      this.ldtk.levels.find(l => l.uid === layer.levelId)!.layerInstances.length -
      this.ldtk.levels.find(l => l.uid === layer.levelId)!.layerInstances.indexOf(layer);
    const mapLayer = map
      .createLayer(
        0,
        map.tilesets,
        this.level.worldX + layer.pxOffsetX,
        this.level.worldY + layer.pxOffsetY,
      )
      .setName(layer.__identifier)
      .setData('id', orderId)
      .setData('animators', [])
      .setDepth(orderId * 5)
      .setPipeline('Light2D')
      .setAlpha(layer.__opacity)
      .setVisible(false);

    if (tilesetRef && tilesetRef.customData.length > 0) {
      tilesetRef.customData.forEach(t => {
        const data = JSON.parse(t.data);
        if (data.anim)
        {
          const tilesAnim = new TilesAnimator(this.scene, t.tileId, mapLayer, data.anim);
          mapLayer.getData('animators').push(tilesAnim);
          // tilesAnim.start();
        }
      });
    }

    // if (layer.__identifier !== 'Collisions') {
    //   const ogLayer: Layer = this.ldtk.defs.layers.find(l => l.uid === layer.layerDefUid)!;

    //   mapLayer.layer.data.forEach(row =>
    //     row.forEach(tile => {
    //       const vData = ogLayer.intGridValues.find(v => v.value === tile.index)!;
    //       if (vData && vData.color) {
    //         const bounds = tile.getBounds() as Phaser.Geom.Rectangle;

    //         this.scene.add
    //           .rectangle(
    //             bounds.x + bounds.width / 2,
    //             bounds.y + bounds.height / 2,
    //             bounds.width,
    //             bounds.height,
    //             Number.parseInt(vData.color.split('#')[1], 16),
    //             mapLayer.alpha,
    //           )
    //           .setDepth(mapLayer.depth);
    //       }
    //     }),
    //   );
    // }

    return mapLayer;
  }
}

export class LDtkMapPack {
  collideLayer?: Phaser.Tilemaps.TilemapLayer;
  intGridLayers: Array<Phaser.Tilemaps.TilemapLayer>;
  displayLayers: Array<Phaser.Tilemaps.TilemapLayer>;

  entityLayer?: LayerInstance;

  bgColor?: string;
  gfx?: Phaser.GameObjects.Shape;
  otherGfx?: Phaser.GameObjects.Shape;
  settings?: FieldInstance[];

  constructor(levelIdentifier: string) {
    this.intGridLayers = [];
    this.displayLayers = [];
  }

  dispose() {
    console.log('Map pack disposed of');

    this.collideLayer?.destroy();

    this.intGridLayers.forEach(l => l.destroy());
    this.displayLayers.forEach(l => l.destroy());
  }
}

export interface iLDtk {
  __header__: Header
  jsonVersion: string
  appBuildId: number
  nextUid: number
  identifierStyle: string
  worldLayout: string
  worldGridWidth: number
  worldGridHeight: number
  defaultLevelWidth: number
  defaultLevelHeight: number
  defaultPivotX: number
  defaultPivotY: number
  defaultGridSize: number
  bgColor: string
  defaultLevelBgColor: string
  minifyJson: boolean
  externalLevels: boolean
  exportTiled: boolean
  imageExportMode: string
  pngFilePattern: any
  backupOnSave: boolean
  backupLimit: number
  levelNamePattern: string
  tutorialDesc: any
  flags: string[]
  defs: Defs
  levels: Level[]
  worlds: any[]
}

export interface Header {
  fileType: string
  app: string
  doc: string
  schema: string
  appAuthor: string
  appVersion: string
  url: string
}

export interface Defs {
  layers: Layer[]
  entities: Entity[]
  tilesets: Tileset[]
  enums: Enum[]
  externalEnums: any[]
  levelFields: LevelField[]
}

export interface Layer {
  __type: string
  identifier: string
  type: string
  uid: number
  gridSize: number
  guideGridWid: number
  guideGridHei: number
  displayOpacity: number
  inactiveOpacity: number
  hideInList: boolean
  hideFieldsWhenInactive: boolean
  pxOffsetX: number
  pxOffsetY: number
  parallaxFactorX: number
  parallaxFactorY: number
  parallaxScaling: boolean
  requiredTags: any[]
  excludedTags: any[]
  intGridValues: IntGridValue[]
  autoTilesetDefUid?: number
  autoRuleGroups: AutoRuleGroup[]
  autoSourceLayerDefUid: any
  tilesetDefUid?: number
  tilePivotX: number
  tilePivotY: number
}

export interface IntGridValue {
  value: number
  identifier?: string
  color: string
}

export interface AutoRuleGroup {
  uid: number
  name: string
  active: boolean
  isOptional: boolean
  rules: Rule[]
}

export interface Rule {
  uid: number
  active: boolean
  size: number
  tileIds: number[]
  chance: number
  breakOnMatch: boolean
  pattern: number[]
  flipX: boolean
  flipY: boolean
  xModulo: number
  yModulo: number
  checker: string
  tileMode: string
  pivotX: number
  pivotY: number
  outOfBoundsValue: any
  perlinActive: boolean
  perlinSeed: number
  perlinScale: number
  perlinOctaves: number
}

export interface Entity {
  identifier: string
  uid: number
  tags: any[]
  width: number
  height: number
  resizableX: boolean
  resizableY: boolean
  keepAspectRatio: boolean
  tileOpacity: number
  fillOpacity: number
  lineOpacity: number
  hollow: boolean
  color: string
  renderMode: string
  showName: boolean
  tilesetId?: number
  tileId?: number
  tileRenderMode: string
  tileRect?: TileRect
  maxCount: number
  limitScope: string
  limitBehavior: string
  pivotX: number
  pivotY: number
  fieldDefs: FieldDef[]
}

export interface TileRect {
  tilesetUid: number
  x: number
  y: number
  w: number
  h: number
}

export interface FieldDef {
  identifier: string
  __type: string
  uid: number
  type: any
  isArray: boolean
  canBeNull: boolean
  arrayMinLength: any
  arrayMaxLength: any
  editorDisplayMode: string
  editorDisplayPos: string
  editorAlwaysShow: boolean
  editorCutLongValues: boolean
  editorTextSuffix: any
  editorTextPrefix: any
  useForSmartColor: boolean
  min: any
  max: any
  regex: any
  acceptFileTypes: any
  defaultOverride?: DefaultOverride
  textLanguageMode: any
  symmetricalRef: boolean
  autoChainRef: boolean
  allowOutOfLevelRef: boolean
  allowedRefs: string
  allowedRefTags: any[]
  tilesetUid: any
}

export interface DefaultOverride {
  id: string
  params: number[]
}

export interface Tileset {
  __cWid: number
  __cHei: number
  identifier: string
  uid: number
  relPath?: string
  embedAtlas?: string
  pxWid: number
  pxHei: number
  tileGridSize: number
  spacing: number
  padding: number
  tags: any[]
  tagsSourceEnumUid: any
  enumTags: any[]
  customData: CustomData[]
  savedSelections: SavedSelection[]
  cachedPixelData: CachedPixelData
}

export interface CustomData {
  tileId: number
  data: string
}

export interface AnimationData {
  // refers to key of the animation (name & json)
  anim: string
}

export interface SavedSelection {
  ids: number[]
  mode: string
}

export interface CachedPixelData {
  opaqueTiles: string
  averageColors: string
}

export interface Enum {
  identifier: string
  uid: number
  values: Value[]
  iconTilesetUid: number
  externalRelPath: any
  externalFileChecksum: any
  tags: any[]
}

export interface Value {
  id: string
  tileId: number
  color: number
  __tileSrcRect: number[]
}

export interface LevelField {
  identifier: string
  __type: string
  uid: number
  type: string
  isArray: boolean
  canBeNull: boolean
  arrayMinLength: any
  arrayMaxLength: any
  editorDisplayMode: string
  editorDisplayPos: string
  editorAlwaysShow: boolean
  editorCutLongValues: boolean
  editorTextSuffix: any
  editorTextPrefix: any
  useForSmartColor: boolean
  min: any
  max: any
  regex: any
  acceptFileTypes: any
  defaultOverride: any
  textLanguageMode: any
  symmetricalRef: boolean
  autoChainRef: boolean
  allowOutOfLevelRef: boolean
  allowedRefs: string
  allowedRefTags: any[]
  tilesetUid: any
}

export interface Level {
  identifier: string
  iid: string
  uid: number
  worldX: number
  worldY: number
  worldDepth: number
  pxWid: number
  pxHei: number
  __bgColor: string
  bgColor?: string
  useAutoIdentifier: boolean
  bgRelPath: any
  bgPos: any
  bgPivotX: number
  bgPivotY: number
  __smartColor: string
  __bgPos: any
  externalRelPath: any
  fieldInstances: FieldInstance[]
  layerInstances: LayerInstance[]
  __neighbours: Neighbour[]
}

export interface FieldInstance {
  __identifier: string
  __value: any
  __type: string
  __tile: any
  defUid: number
  realEditorValues: any[]
}

export interface LayerInstance {
  __identifier: string
  __type: string
  __cWid: number
  __cHei: number
  __gridSize: number
  __opacity: number
  __pxTotalOffsetX: number
  __pxTotalOffsetY: number
  __tilesetDefUid?: number
  __tilesetRelPath?: string
  iid: string
  levelId: number
  layerDefUid: number
  pxOffsetX: number
  pxOffsetY: number
  visible: boolean
  optionalRules: any[]
  intGridCsv: number[]
  autoLayerTiles: AutoLayerTile[]
  seed: number
  overrideTilesetUid?: number
  gridTiles: GridTile[]
  entityInstances: EntityInstance[]
}

export interface AutoLayerTile {
  px: number[]
  src: number[]
  f: number
  t: number
  d: number[]
}

export interface GridTile {
  px: number[]
  src: number[]
  f: number
  t: number
  d: number[]
}

export interface EntityInstance {
  __identifier: string
  __grid: number[]
  __pivot: number[]
  __tags: any[]
  __tile: Tile
  iid: string
  width: number
  height: number
  defUid: number
  px: number[]
  fieldInstances: FieldInstance2[]
}

export interface Tile {
  tilesetUid: number
  x: number
  y: number
  w: number
  h: number
}

export interface FieldInstance2 {
  __identifier: string
  __value: string
  __type: string
  __tile: any
  defUid: number
  realEditorValues: RealEditorValue[]
}

export interface RealEditorValue {
  id: string
  params: number[]
}

export interface Neighbour {
  levelIid: string
  levelUid: number
  dir: string
}
