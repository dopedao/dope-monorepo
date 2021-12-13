import { useState, useRef, useEffect } from "react";
import Boot from "game/scenes/boot";
import GameScene from "game/scenes/game";
import Preload from "game/scenes/preload";
import { IonPhaser } from '@ion-phaser/react';
import DesktopWindow from "components/DesktopWindow";
import Phaser from "phaser";


export default function GameBody(props: {gameConfig?: Phaser.Types.Core.GameConfig}) {
    const gameRef = useRef(null)
    
    const [initialize, setInitialize] = useState(true)

    useEffect(() => {
        return () => destroy();
    })

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
            fullscreenHandler={(fullscreen) => {
                const instance: Phaser.Game = ((gameRef.current as any).game.instance as Phaser.Game);
                
                fullscreen ?
                    instance.scale.stopFullscreen() : instance.scale.startFullscreen();
            }}
            // dont mind this. library is confusing. 
            // the instance of the game is stored in game object the ref which is why we need to do this bit of sorcelery
            onMoved={() => ((gameRef.current as any).game.instance as Phaser.Game).scale.updateBounds()}
            onResize={() => null}
            >
            <IonPhaser game={
                {
                    title: "proto",
                    type: Phaser.AUTO,
                    scale: {
                        width: "100%",
                        height: "100%",
                        mode: Phaser.Scale.FIT,
                        autoCenter: Phaser.Scale.RESIZE,
                    },
                    pixelArt: true,
                    scene: [Boot, Preload, GameScene]
                }
            } initialize={initialize} ref={gameRef} />
        </DesktopWindow> 
    );
}
