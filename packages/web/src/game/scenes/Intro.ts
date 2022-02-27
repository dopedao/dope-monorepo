import IntroStepper from "game/ui/react/components/IntroStepper";

export default class IntroScene extends Phaser.Scene {
    private hustlerData?: any;
    private background!: Phaser.GameObjects.Image;

    constructor() {
        super({ key: 'IntroScene' });
    }
    
    init(hustlerData: any) {
        this.hustlerData = hustlerData;
    }
    
    preload() {
        this.load.image('background', './images/game/map/full.png');
    }

    create() {
        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background');
        
        this.add.reactDom(IntroStepper, this.hustlerData);
    }
}