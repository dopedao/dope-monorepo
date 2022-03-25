import { AnimationFrame, AsepriteAnimation } from "./AsepriteAnim";

export default class AnimatedTiles {
    scene: Phaser.Scene;
    startingTiles: Phaser.Tilemaps.Tile[] = [];
    layer: Phaser.Tilemaps.TilemapLayer;
    asepriteName: string;
    asepriteAnimation: AsepriteAnimation;
    currentFrame: number = 0;


    // animationSize: Phaser.Math.Vector2; // tile size

    constructor(scene: Phaser.Scene, startingTileIndex: number, layer: Phaser.Tilemaps.TilemapLayer, animationTileset: string) {
        this.scene = scene;
        this.layer = layer;
        this.asepriteName = animationTileset;
        this.asepriteAnimation = scene.cache.json.get(animationTileset);

        // this.animationSize = new Phaser.Math.Vector2(this.asepriteAnimation.meta.size.w / layer.tilemap.tileWidth, this.asepriteAnimation.meta.size.h);

        for (const row of layer.layer.data) {
            for (const tile of row) {
                if (tile.index === startingTileIndex)
                    this.startingTiles.push(tile);           
            }
        }
    }

    start() {
        const animationTileset = this.layer.tileset.find(t => t.name === this.asepriteName)!;
        const frames = Object.values(this.asepriteAnimation.frames);

        this.scene.events.on(Phaser.Scenes.Events.UPDATE, (time: number, delta: number) => this.updateTiles(time, delta, frames, animationTileset));
    }

    stop() {
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.updateTiles);
    }

    updateTiles(time: number, delta: number, frames: AnimationFrame[], animationTileset: Phaser.Tilemaps.Tileset) {
        const dur = frames[this.currentFrame].duration - delta;
        if (dur <= 0) {
            this.currentFrame++;
            if (this.currentFrame >= frames.length)
                this.currentFrame = 0;
        }

        const frame = frames[this.currentFrame];
        const frameNumberTiles = new Phaser.Math.Vector2(frame.sourceSize.w / animationTileset.tileWidth, frame.sourceSize.h / animationTileset.tileHeight);

        // x / frameSourceSize.w + ((y / frame.sourceSize.h) * (animaitonTotalWidth / frameSourceSize.w))
        for (const startingTile of this.startingTiles) {
            for (let y = 0; y < frameNumberTiles.y; y++) {
                for (let x = 0; x < frameNumberTiles.x; x++) {
                    const tile = this.layer.getTileAt(startingTile.x + x, startingTile.y + y);
                    const frameTilePos = new Phaser.Math.Vector2(
                        Math.floor(frame.frame.x / animationTileset.tileWidth) + x,
                        Math.floor(frame.frame.y / animationTileset.tileHeight) + y
                    );

                    tile.index = (animationTileset.firstgid - 1) + (frameTilePos.x + (frameTilePos.y * animationTileset.columns));
                }
            }
        }
    }
}