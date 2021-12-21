import Phaser from "phaser";
import Boot from "../scenes/Boot";
import GameScene from "../scenes/Game";
import Preload from "../scenes/Preload";
import phaserReact from "phaser3-react";


export const gameConfig: Phaser.Types.Core.GameConfig = {
    title: "proto",
    type: Phaser.AUTO,
    parent: "gameElement",
    backgroundColor: 0x383838,
    dom: {
        createContainer: true,
    },
    scale: {
        width: "100%",
        height: "100%",
        mode: Phaser.Scale.FIT,
        fullscreenTarget: "gameElement"
    },
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    render: {
        pixelArt: true,
    },
    // react components in phaser
    plugins: {
        global: [
            {
                key: 'phaser-react',
                plugin: phaserReact,
                start: true
            }
        ]
    },
    scene: [Boot, Preload, GameScene]
};
