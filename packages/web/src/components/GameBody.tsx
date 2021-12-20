import React, { useState, useRef, useEffect } from "react";
import Boot from "game/scenes/Boot";
import GameScene from "game/scenes/Game";
import Preload from "game/scenes/Preload";
import { IonPhaser } from '@ion-phaser/react';
import DesktopWindow from "components/DesktopWindow";
import Phaser from "phaser";
import { useGame } from "hooks/useGame";
import { getAccountPath } from "@ethersproject/hdnode";

export default function GameBody(props: {gameConfig?: Phaser.Types.Core.GameConfig}) {
    const gameRef = useRef<HTMLDivElement>(null);
    
    const game = useGame({
        title: "proto",
        type: Phaser.AUTO,
        parent: "gameElement",
        dom: {
            createContainer: true,
        },
        scale: {
            width: "100%",
            height: "100%",
            mode: Phaser.Scale.FIT,
            fullscreenTarget: "gameElement"
        },
        physics: {
            default: 'matter',
            matter: {
                debug: true,
                gravity: { y: 0 }
            }
        },
        render: {
            pixelArt: true,
        },
        scene: [Boot, Preload, GameScene]
    }, gameRef);

    const nativeFullscreen = () => {
        game?.scale.toggleFullscreen();
    };

    return (
        <DesktopWindow 
            title="DOPE.GAME" 
            width={640} 
            height="90vh"
            fullScreen={true}
            // disable native fullscreen for now
            fullScreenHandler={undefined}
            // dont mind this. library is confusing. 
            // the instance of the game is stored in game object the ref which is why we need to do this bit of sorcelery
            onMoved={() => game?.scale.updateBounds()}
            onResize={() => {
                if (game)
                {
                    console.log(gameRef.current?.clientWidth, gameRef.current?.clientHeight);
                    gameRef.current?.appendChild(game.canvas);
                    game.scale.parent = gameRef.current;
                    game.scale.updateBounds();
                    // game.scale.updateBounds()
                    // game.canvas.style.width = gameRef.current?.clientWidth + "px";
                    // game.canvas.style.height = gameRef.current?.clientHeight + "px";
                    // game.scale.updateBounds();
                }
            }}
            >
            <div id="gameElement" style={{overflow: "hidden", width: "100%", height: "100%"}} ref={gameRef}></div>
        </DesktopWindow> 
    );
}
