import IntroStepper from "game/ui/react/components/IntroStepper";

export default class IntroScene extends Phaser.Scene {
    private hustlerData?: any;
    private background!: Phaser.GameObjects.Image;

    constructor() {
        super({ key: 'IntroScene' });
    }
    
    init(data: any) {
        this.hustlerData = data.hustlerData;
    }
    
    preload() {
        this.load.image('background', './images/game/map/full.png');
    }

    create() {
        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background');
        
        const comp = this.add.reactDom(IntroStepper, {
            hustlerData: this.hustlerData
        });

        // this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start('GameScene', {
        //     hustlerData: this.hustlerData
        // }));
        // this.scene.transition()
        comp.events.on('game', () => {
            this.scene.transition({
                target: 'GameScene',
                duration: 2000,
                data: {
                    hustlerData: this.hustlerData
                },
            });
            this.cameras.main.fadeOut(2000);
        });
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            comp.destroy();
        });
    }
}