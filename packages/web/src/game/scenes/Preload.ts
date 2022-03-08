import { Scene } from 'phaser';
import ProgressBar from '../ui/ProgressBar';
import manifest from '../../../public/game/manifest.json';
import NetworkHandler from 'game/handlers/network/NetworkHandler';
import { NetworkEvents, UniversalEventNames } from 'game/handlers/network/types';
import EventHandler, { Events } from 'game/handlers/events/EventHandler';
import { ethers } from 'ethers';
import SkewQuad from 'game/gfx/pipelines/SkewQuadPipeline';
import { createHustlerAnimations } from 'game/anims/HustlerAnimations';
import defaultNetworkConfig from 'game/constants/NetworkConfig';
import UIScene, { chakraToastStyle } from './UI';
import { throws } from 'assert';

export default class Preload extends Scene {
  private dopewars!: Phaser.GameObjects.Image;
  private downloadedSize: number = 0;
  private progressBar: ProgressBar | undefined;

  constructor() {
    super({
      key: 'PreloadScene',
    });
  }

  // load assets
  preload(): void {
    let totalSize: number;
    this.progressBar = new ProgressBar(this, 0.5, 0.66, manifest.totalSize);
    let currentFile: string = '';

    this.load.on(Phaser.Loader.Events.FILE_PROGRESS, (file: Phaser.Loader.File) => {
      const previousLoad = (file as any).previousLoad || 0;

      this.downloadedSize += file.bytesLoaded - previousLoad;
      (file as any).previousLoad = file.bytesLoaded;

      this.progressBar!.setProgress(
        this.downloadedSize / manifest.totalSize,
        'Loading ' + currentFile + new Array(Math.round(Math.random() * 3)).fill('.').join(''),
      );
    });

    const assetList: { [key: string]: { [key: string]: any } } = manifest.assets;

    // read our manifest.json file
    totalSize = manifest.totalSize;
    Object.keys(assetList).forEach((fileType: string) => {
      Object.keys(assetList[fileType]).forEach(key => {
        currentFile = `${fileType}/${key}`;
        const assetVars = assetList[fileType][key];

        if (fileType === 'spritesheet') {
          this.load[fileType](key, assetVars['file'], assetVars.frameConfig);
        } else {
          // hack to index LoaderPlugin
          (this.load as any)[fileType](key, assetVars['file']);
        }
      });
    });

    this.dopewars = this.add.image(this.sys.game.canvas.width / 2,  this.progressBar.y - (this.progressBar.height * 1.5), 'dopewars');
    this.dopewars.setScale(0.5);
  }

  // start gamescene after preload
  create(): void {
    if (this.game.renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer) {
      this.game.renderer.pipelines.add('skewQuad', new SkewQuad(this.game));
    }

    if (!(window?.ethereum as any)?.selectedAddress) {
      this.startGame();
      return;
    }

    fetch(`https://api.dopewars.gg/wallets/${ethers.utils.getAddress(
      (window?.ethereum as any)?.selectedAddress,
    )}/hustlers`).then(res => res.json()).then(hustlers => {
      fetch(defaultNetworkConfig.authUri + defaultNetworkConfig.authAuthenticatedPath, { credentials: 'include' })
        .then(res => {
          const loggedIn = res.status === 200;

          this.startGame(hustlers, loggedIn);
        });
    });
  }

  startGame(hustlerData?: any, loggedIn?: boolean) {
    const firstTime = (localStorage.getItem('gameLoyal') ?? 'false') !== 'true';
    const scene = firstTime ? 'IntroScene' : loggedIn ? 'GameScene' : 'LoginScene';

    const startScene = () => {
      if (hustlerData?.length > 0)
      {
        const key = 'hustler_' + hustlerData[0].id;
        this.load.spritesheet(
          key,
          `https://api.dopewars.gg/hustlers/${hustlerData[0].id}/sprites/composite.png`,
          { frameWidth: 30, frameHeight: 60 },
        );
        this.load.once('filecomplete-spritesheet-' + key, () => {
          createHustlerAnimations(this.anims, key);
          this.scene.start(scene, {
            hustlerData,
            loggedIn
          });
        });
        this.load.start();
  
        return;
      }
      this.scene.start(scene, {
        hustlerData,
        loggedIn
      });
    }

    if (scene === 'GameScene') {
      NetworkHandler.getInstance().connect().once(NetworkEvents.CONNECTED, () => {
        startScene();
      });
      return;
    }

    startScene();
  }
}
