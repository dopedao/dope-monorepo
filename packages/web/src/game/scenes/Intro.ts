import NetworkHandler from "game/handlers/network/NetworkHandler";
import { NetworkEvents } from "game/handlers/network/types";
import IntroStepper from "game/ui/react/components/IntroStepper";

export default class IntroScene extends Phaser.Scene {
    private hustlerData?: any;
    private loggedIn?: boolean; 
    private background!: Phaser.GameObjects.Image;

    constructor() {
        super({ key: 'IntroScene' });
    }
    
    init(data: any) {
        this.hustlerData = data.hustlerData;
        this.loggedIn = data.loggedIn;
    }

    preload() {
        this.load.image('background', './images/game/map/full.png');
    }

    create() {
        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background');
        
        const comp = this.add.reactDom(IntroStepper as any, {
            hustlerData: this.hustlerData
        });

        const transitionDuration = 1000;
        comp.events.on('game', () => {
            const scene = this.loggedIn ? 'GameScene' : 'LoginScene'; 
            const transitionToScene = () => {
                if (scene === 'GameScene')
                    this.cameras.main.fadeOut(transitionDuration);
                
                this.scene.transition({
                    target: scene,
                    duration: transitionDuration,
                    data: {
                        hustlerData: this.hustlerData
                    },
                });
            }
            
            if (scene === 'GameScene') {
                NetworkHandler.getInstance().connect().once(NetworkEvents.CONNECTED, () => transitionToScene());
                return;
            }
            transitionToScene();
        });
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            comp.destroy();
        });
    }
}