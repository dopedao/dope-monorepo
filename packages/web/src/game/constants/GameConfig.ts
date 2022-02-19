import Phaser, { Scene } from 'phaser';
import Boot from '../scenes/Boot';
import GameScene from '../scenes/Game';
import Preload from '../scenes/Preload';
import phaserReact from 'phaser3-react';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import PixelationPipelinePlugin from 'phaser3-rex-plugins/plugins/pixelationpipeline-plugin';
import UIScene from 'game/scenes/UI';

export const defaultGameConfig: Phaser.Types.Core.GameConfig = {
  title: 'proto',
  type: Phaser.AUTO,
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
  parent: 'game-parent',
  backgroundColor: 0x000000,
  dom: {
    createContainer: true,
  },
  // scale: {
  //   width: '100%',
  //   height: '100%',
  //   mode: Phaser.Scale.FIT,
  //   fullscreenTarget: 'game-parent',
  // },
  scale: {
    mode: Phaser.Scale.NONE
  },
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: { y: 0 },
      //enableSleeping: true,
    },
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
        start: true,
      },
      // {
      //   key: 'rexPixelationPipeline',
      //   plugin: PixelationPipelinePlugin,
      //   start: true,
      // },
    ],
    scene: [
      // ig ui
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI',
      },
    ],
  },
  scene: [Boot, Preload, GameScene, UIScene],
};
