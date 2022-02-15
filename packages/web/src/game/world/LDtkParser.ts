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
    // create entity textures
    // this.ldtk.defs.entities.forEach(e => {
    //     const tileset = this.tilesets.find(t => t.uid === e.tilesetId);
    //     if (!tileset)
    //         return;

    //     const tilesetTexture = this.scene.textures.get(tileset.identifier.toLowerCase());
    //     tilesetTexture.add(e.identifier, 0, tileset.)
    // });

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
    let stackLayers: Tile[][] = new Array(10);
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

    map.addTilesetImage(tileset);

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
      .setDepth(orderId * 5)
      .setAlpha(layer.__opacity)
      .setVisible(true);

    stackLayers.forEach((tiles, i) => {
      if (tiles.length === 0) return;

      const newLayer = map
        .createBlankLayer(
          `${layer.__identifier} - ${i}`,
          map.tilesets,
          this.level.worldX + layer.pxOffsetX,
          this.level.worldY + layer.pxOffsetY,
        )
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

    map.addTilesetImage(tileset);

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
      .setDepth(orderId * 5)
      .setAlpha(layer.__opacity)
      .setVisible(true);

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

    if (tileset) map.addTilesetImage(tileset);

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
      .setDepth(orderId * 5)
      .setAlpha(layer.__opacity)
      .setVisible(false);

    if (layer.__identifier !== 'Collisions') {
      const ogLayer: Layer = this.ldtk.defs.layers.find(l => l.uid === layer.layerDefUid)!;

      mapLayer.layer.data.forEach(row =>
        row.forEach(tile => {
          const vData = ogLayer.intGridValues.find(v => v.value === tile.index)!;
          if (vData && vData.color) {
            const bounds = tile.getBounds() as Phaser.Geom.Rectangle;

            this.scene.add
              .rectangle(
                bounds.x + bounds.width / 2,
                bounds.y + bounds.height / 2,
                bounds.width,
                bounds.height,
                Number.parseInt(vData.color.split('#')[1], 16),
                mapLayer.alpha,
              )
              .setDepth(mapLayer.depth);
          }
        }),
      );
    }

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
  __header__: Header;
  jsonVersion: string;
  nextUid: number;
  worldLayout: string;
  worldGridWidth: number;
  worldGridHeight: number;
  defaultPivotX: number;
  defaultPivotY: number;
  defaultGridSize: number;
  defaultLevelWidth: number;
  defaultLevelHeight: number;
  bgColor: string;
  defaultLevelBgColor: string;
  minifyJson: boolean;
  externalLevels: boolean;
  exportTiled: boolean;
  imageExportMode: ImageExportMode;
  pngFilePattern: null;
  backupOnSave: boolean;
  backupLimit: number;
  levelNamePattern: string;
  flags: any[];
  defs: Defs;
  levels: Level[];
}

export interface Header {
  fileType: string;
  app: string;
  doc: string;
  schema: string;
  appAuthor: string;
  appVersion: string;
  url: string;
}

export interface Defs {
  layers: Layer[];
  entities: Entity[];
  tilesets: Tileset[];
  enums: Enum[];
  externalEnums: any[];
  levelFields: any[];
}

export interface Entity {
  identifier: string;
  uid: number;
  tags: string[];
  width: number;
  height: number;
  resizableX: boolean;
  resizableY: boolean;
  keepAspectRatio: boolean;
  fillOpacity: number;
  lineOpacity: number;
  hollow: boolean;
  color: string;
  renderMode: string;
  showName: boolean;
  tilesetId: number;
  tileId: number;
  tileRenderMode: string;
  maxCount: number;
  limitScope: string;
  limitBehavior: string;
  pivotX: number;
  pivotY: number;
  fieldDefs: FieldDef[];
}

export interface FieldDef {
  identifier: string;
  __type: string;
  uid: number;
  type: TypeClass;
  isArray: boolean;
  canBeNull: boolean;
  arrayMinLength: null;
  arrayMaxLength: null;
  editorDisplayMode: string;
  editorDisplayPos: string;
  editorAlwaysShow: boolean;
  editorCutLongValues: boolean;
  min: null;
  max: null;
  regex: null;
  acceptFileTypes: null;
  defaultOverride: null;
  textLanguageMode: null;
}

export interface TypeClass {
  id: string;
  params: number[];
}

export interface Enum {
  identifier: string;
  uid: number;
  values: ValueElement[];
  iconTilesetUid: number;
  externalRelPath: null;
  externalFileChecksum: null;
}

export interface ValueElement {
  id: string;
  tileId: number | null;
  color: number;
  __tileSrcRect: number[] | null;
}

export interface Layer {
  __type: TypeEnum;
  identifier: string;
  type: TypeEnum;
  uid: number;
  gridSize: number;
  displayOpacity: number;
  pxOffsetX: number;
  pxOffsetY: number;
  requiredTags: any[];
  excludedTags: any[];
  intGridValues: IntGridValue[];
  autoTilesetDefUid: number | null;
  autoRuleGroups: AutoRuleGroup[];
  autoSourceLayerDefUid: null;
  tilesetDefUid: number | null;
  tilePivotX: number;
  tilePivotY: number;
}

export enum TypeEnum {
  Entities = 'Entities',
  IntGrid = 'IntGrid',
  Tiles = 'Tiles',
}

export interface AutoRuleGroup {
  uid: number;
  name: string;
  active: boolean;
  collapsed: boolean;
  isOptional: boolean;
  rules: Rule[];
}

export interface Rule {
  uid: number;
  active: boolean;
  size: number;
  tileIds: number[];
  chance: number;
  breakOnMatch: boolean;
  pattern: number[];
  flipX: boolean;
  flipY: boolean;
  xModulo: number;
  yModulo: number;
  checker: ImageExportMode;
  tileMode: TileMode;
  pivotX: number;
  pivotY: number;
  outOfBoundsValue: null;
  perlinActive: boolean;
  perlinSeed: number;
  perlinScale: number;
  perlinOctaves: number;
}

export enum ImageExportMode {
  None = 'None',
}

export enum TileMode {
  Single = 'Single',
}

export interface IntGridValue {
  value: number;
  identifier: null | string;
  color: string;
}

export interface Tileset {
  __cWid: number;
  __cHei: number;
  identifier: string;
  uid: number;
  relPath: string;
  pxWid: number;
  pxHei: number;
  tileGridSize: number;
  spacing: number;
  padding: number;
  tagsSourceEnumUid: number | null;
  enumTags: EnumTag[];
  customData: any[];
  savedSelections: SavedSelection[];
  cachedPixelData: CachedPixelData;
}

export interface CachedPixelData {
  opaqueTiles: string;
  averageColors: string;
}

export interface EnumTag {
  enumValueId: string;
  tileIds: number[];
}

export interface SavedSelection {
  ids: number[];
  mode: Mode;
}

export enum Mode {
  Stamp = 'Stamp',
}

export interface Level {
  identifier: string;
  uid: number;
  worldX: number;
  worldY: number;
  pxWid: number;
  pxHei: number;
  __bgColor: string;
  bgColor: null;
  useAutoIdentifier: boolean;
  bgRelPath: null;
  bgPos: null;
  bgPivotX: number;
  bgPivotY: number;
  __bgPos: null;
  externalRelPath: null;
  fieldInstances: any[];
  layerInstances: LayerInstance[];
  __neighbours: any[];
}

export interface LayerInstance {
  __identifier: string;
  __type: TypeEnum;
  __cWid: number;
  __cHei: number;
  __gridSize: number;
  __opacity: number;
  __pxTotalOffsetX: number;
  __pxTotalOffsetY: number;
  __tilesetDefUid: number | null;
  __tilesetRelPath: TilesetRelPath | null;
  levelId: number;
  layerDefUid: number;
  pxOffsetX: number;
  pxOffsetY: number;
  visible: boolean;
  optionalRules: any[];
  intGrid: IntGrid[];
  intGridCsv: number[];
  autoLayerTiles: Tile[];
  seed: number;
  overrideTilesetUid: null;
  gridTiles: Tile[];
  entityInstances: EntityInstance[];
}

export enum TilesetRelPath {
  DWBuildingsPreProtoSetV1TileAbsolutePNG = '../dw_Buildings_PreProtoSetV1_TileAbsolute.png',
  DWPropsPreProtoSetV1PNG = '../dw_Props_PreProtoSetV1.png',
  RoadSidewalkWebModularPNG = '../Road_Sidewalk_WebModular.png',
}

export interface Tile {
  px: number[];
  src: number[];
  f: number;
  t: number;
  d: number[];
}

export interface EntityInstance {
  __identifier: Identifier;
  __grid: number[];
  __pivot: number[];
  __tile: TileClass;
  width: number;
  height: number;
  defUid: number;
  px: number[];
  fieldInstances: FieldInstance[];
}

export enum Identifier {
  Trees = 'Trees',
  VegetationCity = 'Vegetation_City',
}

export interface TileClass {
  tilesetUid: number;
  srcRect: number[];
}

export interface FieldInstance {
  __identifier: Identifier;
  __value: ParamElement | null;
  __type: Type;
  defUid: number;
  realEditorValues: RealEditorValue[];
}

export enum Type {
  LocalEnumVegetationCity = 'LocalEnum.Vegetation_City',
  LocalEnumVegetationTreeA = 'LocalEnum.Vegetation_TreeA',
}

export enum ParamElement {
  MediumCircle49 = 'MediumCircle49',
  Rectangle48 = 'Rectangle48',
  SmallCircle32 = 'SmallCircle32',
  TreeACircleBarrier = 'TreeA_CircleBarrier',
}

export interface RealEditorValue {
  id: ID;
  params: ParamElement[];
}

export enum ID {
  VString = 'V_String',
}

export interface IntGrid {
  coordId: number;
  v: number;
}
