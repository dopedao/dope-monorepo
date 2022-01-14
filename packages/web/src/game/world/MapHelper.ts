import PixelationPipelinePlugin from "phaser3-rex-plugins/plugins/pixelationpipeline-plugin";
import { LDtkMapPack, LdtkReader } from "./LDtkParser";

export default class MapHelper
{
    mapReader: LdtkReader;
    scene: Phaser.Scene;

    map!: LDtkMapPack;
    entities: Phaser.GameObjects.GameObject[] = new Array();

    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;

        // create the map
        this.mapReader = new LdtkReader(this.scene, this.scene.cache.json.get('map'));
    }

    createMap(level: string)
    {
        this.map = this.mapReader.CreateMap(
            level, 
            // only tileset textures
            Object.keys(this.scene.textures.list)
                .filter(key => key.startsWith('tileset_'))
        );
    
        // enable collisions for all tiles that have index 1
        this.map.collideLayer?.setCollision(1);
    
        // matterjs collisions
        if (this.map.collideLayer)
            this.scene.matter.world.convertTilemapLayer(this.map.collideLayer);
    } 

    createEntities()
    {
        if (!this.map.entityLayer)
        {
            console.warn("No entity layer found");
            return;
        }

        // create all of the entities
        this.map.entityLayer.entityInstances.forEach((entity, i) => {
            const tileset = this.mapReader.tilesets.find(t => t.uid === entity.__tile.tilesetUid);
            if (!tileset)
                return;
            
            const frameId = entity.fieldInstances[0].__value ?? "default";
            console.info('Try loading existing entity frame. Ignore warning message if there is');
            let frame = this.scene.textures.get(tileset.identifier.toLowerCase()).get(frameId).name !== frameId ?
                this.scene.textures.get(tileset.identifier.toLowerCase())
                    .add(frameId, 0, 
                        // x
                        entity.__tile.srcRect[0], 
                        // y
                        entity.__tile.srcRect[1], 
                        // width
                        entity.__tile.srcRect[2], 
                        // height
                        entity.__tile.srcRect[3]) :
                
                // use existing frame
                this.scene.textures.get(tileset.identifier.toLowerCase()).get(frameId);
            
            const pivotOffset = new Phaser.Math.Vector2(
                Math.abs(entity.__pivot[0] - 0.5) * entity.width, 
                Math.abs(entity.__pivot[1] - 0.5) * entity.height
            );

            this.entities.push(this.scene.add.sprite(entity.px[0] + pivotOffset.x, entity.px[1] + pivotOffset.y, tileset.identifier.toLowerCase(), frame.name));
            const entitySprite = this.entities[this.entities.length - 1] as Phaser.GameObjects.Sprite;
            entitySprite
                .setName(entity.__identifier)
                .setDepth((this.mapReader.level.layerInstances.length - this.mapReader.level.layerInstances.indexOf(this.map.entityLayer!)) * 5);
            
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