import NetworkHandler from "game/handlers/network/NetworkHandler";
import { NetworkEvents } from "game/handlers/network/types";
import Login from "game/ui/react/components/Login";

export default class LoginScene extends Phaser.Scene {
    private hustlerData: any;
    private background!: Phaser.GameObjects.Image;

    constructor() {
        super({ key: 'LoginScene' });
    }

    init(data: any) {
        this.hustlerData = data.hustlerData;
    }

    preload() {
        this.load.image('background', './images/game/map/full.png');
    }

    create() {
        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background');
        
        const comp = this.add.reactDom(Login as any, {
            authenticator: NetworkHandler.getInstance().authenticator
        });

        const transitionDuration = 2000;
        comp.events.on('loggedIn', () => {
            NetworkHandler.getInstance().connect().once(NetworkEvents.CONNECTED, () => {
                this.scene.transition({
                    target: 'GameScene',
                    duration: transitionDuration,
                    data: {
                        hustlerData: this.hustlerData
                    },
                });
                this.cameras.main.fadeOut(transitionDuration);
            });
        });
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            comp.destroy();
        });
    }
}