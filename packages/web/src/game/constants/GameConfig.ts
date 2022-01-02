import Phaser, { Scene } from "phaser";
import Boot from "../scenes/Boot";
import GameScene from "../scenes/Game";
import Preload from "../scenes/Preload";
import phaserReact from "phaser3-react";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin"
import UIScene from "game/scenes/UI";

export const defaultGameConfig: Phaser.Types.Core.GameConfig = {
    title: "proto",
    type: Phaser.AUTO,
    parent: "game-parent",
    backgroundColor: 0x383838,
    dom: {
        createContainer: true,
    },
    scale: {
        width: "100%",
        height: "100%",
        mode: Phaser.Scale.FIT,
        fullscreenTarget: "game-parent"
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
    plugins: {
        global: [
            // import directly react components into phaser
            {
                key: 'phaser-react',
                plugin: phaserReact,
                start: true
            }
        ],
        scene: [
            // ig ui
            {
                key: 'rexUI',
                plugin: RexUIPlugin,
                mapping: 'rexUI'
            }
        ]
        
    },
    scene: [Boot, Preload, GameScene, UIScene]
};