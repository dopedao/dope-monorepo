import React, { useState, useRef, useEffect } from "react";
import { IonPhaser } from '@ion-phaser/react';
import DesktopWindow from "components/DesktopWindow";
import Phaser from "phaser";
import { useGame } from "hooks/useGame";
import { gameConfig } from "game/constants/GameConfig";

export default function GameBody(props: {gameConfig?: Phaser.Types.Core.GameConfig}) {
    const gameRef = useRef<HTMLDivElement>(null);
    
    const game = useGame(gameConfig, gameRef);

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
            // update bounds when window gets moved around
            onMoved={() => game?.scale.updateBounds()}
            // update scale when window ios resized
            onResize={() => {
                if (game && gameRef.current)
                {
                    console.log(gameRef.current.clientWidth, gameRef.current?.clientHeight);
                    gameRef.current.appendChild(game.canvas);
                    game.scale.parent = gameRef.current;
                    game.scale.setParentSize(gameRef.current.clientWidth, gameRef.current.clientHeight);
                    game.scale.setGameSize(gameRef.current.clientWidth, gameRef.current.clientHeight);
                    game.scale.updateBounds();
                }
            }}
            >
            <div id="gameElement" style={{overflow: "hidden", width: "100%", height: "100%"}} ref={gameRef}></div>
        </DesktopWindow> 
    );
}
