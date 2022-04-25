import GameScene from "game/scenes/Game";
import { AnimationFrame, AsepriteAnimation } from "./AsepriteAnim";

interface UpdateFrame extends AnimationFrame {
    leftDuration: number;
}

export default class TilesAnimator {
    scene: Phaser.Scene;
    startingTiles: Phaser.Tilemaps.Tile[] = [];
    layer: Phaser.Tilemaps.TilemapLayer;
    asepriteName: string;
    asepriteAnimation: AsepriteAnimation;
    currentFrame: number = 0;

    updateCallback?: (time: number, delta: number) => void;

    get started() {
        return this.updateCallback !== undefined;
    }

    constructor(scene: Phaser.Scene, startingTileIndex: number, layer: Phaser.Tilemaps.TilemapLayer, animationTileset: string, findStartingTiles: boolean = true) {
        this.scene = scene;
        this.layer = layer;
        this.asepriteName = animationTileset;
        this.asepriteAnimation = scene.cache.json.get(animationTileset);

        // this.animationSize = new Phaser.Math.Vector2(this.asepriteAnimation.meta.size.w / layer.tilemap.tileWidth, this.asepriteAnimation.meta.size.h);

        if (findStartingTiles) {
            for (const row of layer.layer.data) {
                for (const tile of row) {
                    if (tile.index === startingTileIndex)
                        this.startingTiles.push(tile);           
                }
            }
        }
    }

    start() {
        if (this.started) return;

        const animationTileset = this.layer.tileset.find(t => t.name === this.asepriteName)!;
        const frames = Object.values(this.asepriteAnimation.frames).map(f => {
            (f as UpdateFrame).leftDuration = f.duration;
            return f as UpdateFrame;
        });

        this.updateCallback = (time: number, delta: number) => this.updateTiles(time, delta, frames, animationTileset);
        this.scene.events.on(Phaser.Scenes.Events.PRE_UPDATE, this.updateCallback);
    }

    stop() {
        if (!this.started) return;

        this.scene.events.off(Phaser.Scenes.Events.PRE_UPDATE, this.updateCallback);
        this.updateCallback = undefined;
    }

    updateTiles(time: number, delta: number, frames: UpdateFrame[], animationTileset: Phaser.Tilemaps.Tileset) {
        frames[this.currentFrame].leftDuration -= delta;
        if (frames[this.currentFrame].leftDuration <= 0) {
            frames[this.currentFrame].leftDuration = frames[this.currentFrame].duration;
            this.currentFrame = (this.currentFrame + 1) % frames.length;
        }

        const frame = frames[this.currentFrame];
        const frameNumberTiles = new Phaser.Math.Vector2(frame.sourceSize.w / animationTileset.tileWidth, frame.sourceSize.h / animationTileset.tileHeight);

        // x / frameSourceSize.w + ((y / frame.sourceSize.h) * (animaitonTotalWidth / frameSourceSize.w))
        for (const startingTile of this.startingTiles) {
            for (let y = 0; y < frameNumberTiles.y; y++) {
                for (let x = 0; x < frameNumberTiles.x; x++) {
                    const tile = this.layer.getTileAt(startingTile.x + x, startingTile.y + y);
                    if (!tile) continue;

                    const frameTilePos = new Phaser.Math.Vector2(
                        Math.floor(frame.frame.x / animationTileset.tileWidth) + x,
                        Math.floor(frame.frame.y / animationTileset.tileHeight) + y
                    );

                    tile.index = animationTileset.firstgid + (frameTilePos.x + (frameTilePos.y * animationTileset.columns));
                }
            }
        }
    }
}