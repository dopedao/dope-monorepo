import Phaser, { Scene } from 'phaser';
import Boot from '../scenes/Boot';
import GameScene from '../scenes/Game';
import Preload from '../scenes/Preload';
import phaserReact from 'phaser3-react';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import PixelationPipelinePlugin from 'phaser3-rex-plugins/plugins/pixelationpipeline-plugin';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import UIScene from 'game/scenes/UI';
import OutlinePipelinePlugin from 'phaser3-rex-plugins/plugins/outlinepipeline-plugin.js';


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
      debug: false,
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
      {
        key: 'rexVirtualJoystick',
        plugin: VirtualJoystickPlugin,
        start: true
      },
      {
        key: 'rexOutlinePipeline',
        plugin: OutlinePipelinePlugin,
        start: true
      }
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
  scene: [Boot, Preload, GameScene, UIScene]
};
