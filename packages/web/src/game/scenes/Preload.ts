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

    this.load.on('fileprogress', (file: any) => {
      const previousLoad = file.previousLoad || 0;

      this.downloadedSize += file.bytesLoaded - previousLoad;
      file.previousLoad = file.bytesLoaded;

      this.progressBar!.setProgress(
        this.downloadedSize / manifest.totalSize,
        'Loading ' + currentFile + '...',
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

    const networkHandler = NetworkHandler.getInstance();
    
    fetch(defaultNetworkConfig.authUri + defaultNetworkConfig.authAuthenticatedPath, { credentials: 'include' })
      .then(res => {
        if (res.status !== 200) {
          (this.scene.get('UIScene') as UIScene).toast({
            ...chakraToastStyle,
            title: 'Login needed',
            description: 'Please sign the message to authenticate',
            status: 'warning'
          });
          networkHandler.authenticator.login()
            .then(() => {
              networkHandler.connect();
              (this.scene.get('UIScene') as UIScene).toast({
                ...chakraToastStyle,
                title: 'Logged in',
                status: 'success',
              });
            })
            .catch(err => {
              (this.scene.get('UIScene') as UIScene).toast({
                ...chakraToastStyle,
                title: 'Login failed',
                description: err.message,
                status: 'error',
              });
            })
          return;
        }

        networkHandler.connect();
      })

    const onConnection = () => {
      // handle messages
      networkHandler.listenMessages();

      // get hustlers before starting game
      if ((window?.ethereum as any)?.selectedAddress)
        fetch(
          `https://api.dopewars.gg/wallets/${ethers.utils.getAddress(
            (window?.ethereum as any)?.selectedAddress,
          )}/hustlers`,
        ).then(res => {
          res.json().then(data => {
            // if has no hustlers, just 
            // start game scene directly
            if (data.length === 0) {
              this.scene.start('GameScene', {
                hustlerData: data,
              });
              return;
            }
            
            // if has hustler, preload hustler animations
            // then start game scene
            const key = 'hustler_' + data[0].id;
            this.load.spritesheet(
              key,
              `https://api.dopewars.gg/hustlers/${data[0].id}/sprites/composite.png`,
              { frameWidth: 30, frameHeight: 60 },
            );
            this.load.once('filecomplete-spritesheet-' + key, () => {
              createHustlerAnimations(this.anims, key);
              this.scene.start('GameScene', {
                hustlerData: data,
              });
            });
            this.load.start();
          });
        });
      else this.scene.start('GameScene');
    };

    networkHandler.once(NetworkEvents.CONNECTED, onConnection);
  }
}
