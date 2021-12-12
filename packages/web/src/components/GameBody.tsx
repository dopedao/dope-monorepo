import React, { useState, useRef, useEffect } from "react";
import Boot from "game/scenes/boot";
import GameScene from "game/scenes/game";
import Preload from "game/scenes/preload";
import { IonPhaser } from '@ion-phaser/react';
import DesktopWindow from "components/DesktopWindow";


export default function GameBody(props: {gameConfig?: Phaser.Types.Core.GameConfig}) {
    const gameRef = useRef(null)
    
    const [initialize, setInitialize] = useState(true)

    useEffect(() => {
        return () => destroy();
    })

    const destroy = () => {
        if (gameRef.current) {
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
            // dont mind this. library is confusing. 
            // the instance of the game is stored in game object the ref which is why we need to do this bit of sorcelery
            onMoved={() => ((gameRef.current as any).game.instance as Phaser.Game).scale.updateBounds()}
            onResize={() => null}
            >
            <IonPhaser game={
                {
                    title: "proto",
                    width: "100%",
                    height: "100%",
                    type: Phaser.AUTO,
                    scale: {
                        mode: Phaser.Scale.FIT,
                    },
                    scene: [Boot, Preload, GameScene]
                }
            } initialize={initialize} ref={gameRef} />
        </DesktopWindow> 
    );
}
