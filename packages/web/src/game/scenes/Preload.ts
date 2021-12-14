import { Scene } from 'phaser';
import ProgressBar from '../lib/progress-bar';
import manifest from '../../../public/manifest.json';

export default class Preload extends Scene {
  private downloadedSize: number = 0;
  private progressBar: ProgressBar | undefined;

  constructor() {
    super({
      key: 'PreloadScene'
    });
  }

  // load assets
  preload(): void {
    let totalSize: number;

    this.load.on('fileprogress', (file: any) => {
      const previousLoad = file.previousLoad || 0;
      this.progressBar = new ProgressBar(this, 0.5, 0.66, manifest.totalSize);

      this.downloadedSize += file.bytesLoaded - previousLoad;
      file.previousLoad = file.bytesLoaded;

      this.progressBar.setProgress(this.downloadedSize / manifest.totalSize);
    });

    const assetList: {[key:string]: {[key:string]: any}} = manifest.assets;

    // read our manifest.json file
    totalSize = manifest.totalSize;
    Object.keys(assetList).forEach((fileType: string) => {
      Object.keys(assetList[fileType]).forEach((key) => {
        const assetVars = assetList[fileType][key];

        if (fileType === 'spritesheet') {
          this.load[fileType](key, assetVars['file'], assetVars.frameConfig);
        } else {
          // hack to index LoaderPlugin
          (this.load as any)[fileType](key, assetVars['file']);
        }
      });
    });
  }

  // start gamescene after preload
  create(): void {
    this.scene.start('GameScene');
  }
}
