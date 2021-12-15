import { useState, useRef, useEffect } from "react";
import Boot from "game/scenes/Boot";
import GameScene from "game/scenes/Game";
import Preload from "game/scenes/Preload";
import { IonPhaser } from '@ion-phaser/react';
import DesktopWindow from "components/DesktopWindow";
import Phaser from "phaser";


export default function GameBody(props: {gameConfig?: Phaser.Types.Core.GameConfig}) {
    const gameRef = useRef(null);
    
    const [initialize, setInitialize] = useState(true);

    useEffect(() => {
        return () => destroy();
    });

    const destroy = () => {
        if (((gameRef.current as any).game.instance)) {
            // read comment down below
            ((gameRef.current as any).game.instance as Phaser.Game).destroy(true);
        }
        setInitialize(false);
    }

    return (
        <DesktopWindow 
            title="DOPE.GAME" 
            width={640} 
            height="90vh"
            fullScreenHandler={(fullscreen) => {
                if (!gameRef.current)
                    return;

                const instance: Phaser.Game = ((gameRef.current as any).game.instance as Phaser.Game);
                if (!instance)
                    return;

                console.log('yes');

                instance.scale.toggleFullscreen();
            }}
            // dont mind this. library is confusing. 
            // the instance of the game is stored in game object the ref which is why we need to do this bit of sorcelery
            onMoved={() => ((gameRef.current as any).game.instance as Phaser.Game).scale.updateBounds()}
            >
            <IonPhaser game={
                {
                    title: "proto",
                    type: Phaser.AUTO,
                    scale: {
                        width: "100%",
                        height: "100%",
                        zoom: 2,
                        mode: Phaser.Scale.FIT,
                    },
                    physics: {
                        default: 'arcade',
                        arcade: {
                            debug: true,
                            gravity: { y: 0 }
                        }
                    },
                    pixelArt: true,
                    scene: [Boot, Preload, GameScene]
                }
            } initialize={initialize} ref={gameRef}>
            </IonPhaser>
        </DesktopWindow> 
    );
}
