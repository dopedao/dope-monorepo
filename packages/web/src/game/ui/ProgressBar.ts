import { Scene, GameObjects } from 'phaser';

const MB = 1024 * 1024;

export default class ProgressBar {
  private track: GameObjects.Graphics;
  private progressBar: GameObjects.Graphics;
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private lineWidth: number;
  private loadingText: GameObjects.Text;
  private percentText: GameObjects.Text;
  // private downloadedText: GameObjects.Text;
  private totalFileSize: number;
  private progressBarShape: { x: number; y: number; maxWidth: number; height: number };

  constructor(scene: Scene, x: number, y: number, totalFileSize: number) {
    this.totalFileSize = totalFileSize;
    this.track = scene.add.graphics();
    this.progressBar = scene.add.graphics();

    const screenWidth = scene.game.scale.displaySize.width;
    const screenHeight = scene.game.scale.displaySize.height;

    this.width = Math.min(500, screenWidth * 0.8);
    this.lineWidth = this.width * 0.02;
    this.height = this.lineWidth * 7;

    this.x = screenWidth * x - this.width / 2;
    this.y = screenHeight * y - this.height / 2;

    const textStyle = {
      fontSize: '26px',
      fontFamily: 'Dope',
      color: '#ffffff',
    };

    this.loadingText = scene.make.text({
      x: this.x + this.lineWidth,
      y: this.y - this.lineWidth,
      text: 'Loading...',
      style: textStyle,
    });
    this.loadingText.setOrigin(0, 1);

    
    this.percentText = scene.make.text({
      x: this.x + this.width - this.lineWidth,
      y: this.loadingText.y,
      text: '0%',
      style: {
        ...textStyle,
        align: 'right',
      },
    });
    this.percentText.setOrigin(1, 1);

    // const totalBytesText = scene.make.text({
    //   x: this.loadingText.x,
    //   y: this.y + this.height + this.lineWidth,
    //   text: this.formatBytes(totalFileSize),
    //   style: textStyle,
    // });

    // totalBytesText.setOrigin(0, 0);

    // this.downloadedText = scene.make.text({
    //   x: this.percentText.x,
    //   y: totalBytesText.y,
    //   text: '',
    //   style: textStyle,
    // });

    // this.downloadedText.setOrigin(1, 0);

    this.progressBarShape = {
      x: this.x + this.lineWidth,
      y: this.y + this.lineWidth * 2,
      maxWidth: this.width - 4 * this.lineWidth,
      height: this.lineWidth * 1.2,
    };
  }

  setProgress(progress: number, loadingText?: string): void {
    this.progressBar.clear();

    this.progressBar.fillStyle(0x3d8f3d);
    this.progressBar.fillRect(
      this.progressBarShape.x,
      this.progressBarShape.y,
      this.progressBarShape.maxWidth * progress,
      this.progressBarShape.height,
    );

    this.percentText.setText(Math.min(100, Math.round(progress * 100)) + '%');
    // this.downloadedText.text = this.formatBytes(this.totalFileSize * progress);
    if (loadingText) this.loadingText.setText(loadingText).setOrigin(0, 1);
  }

  private formatBytes(bytes: number): string {
    return (bytes / MB).toFixed(2) + ' MB';
  }
}
