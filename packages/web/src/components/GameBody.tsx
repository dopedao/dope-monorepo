import { Box } from '@chakra-ui/react';
import { defaultGameConfig } from 'game/constants/GameConfig';
import { IonPhaser } from '@ion-phaser/react';
import { useGame } from 'hooks/useGame';
import { useAccount } from 'wagmi';
import Account from './web3account/Account';
import DesktopWindow from 'components/DesktopWindow';
import DialogSwitchNetwork from './DialogSwitchNetwork';
import Phaser from 'phaser';
import React, { useState, useRef, useEffect } from 'react';
import { useContextualChainId } from 'hooks/web3';

export default function GameBody(props: { gameConfig?: Phaser.Types.Core.GameConfig }) {
  const chainId = useContextualChainId();
  const { address: account } = useAccount();
  const gameRef = useRef<HTMLDivElement>(null);

  const game = useGame(
    {
      ...(props.gameConfig ?? defaultGameConfig),
      // sets rendering mode to canvas to prevent antialiasing on webkit devices
      // temporary fix
      // type: typeof (window as any).webkitConvertPointFromNodeToPage === 'function' ? Phaser.CANVAS : Phaser.AUTO
    },
    gameRef,
  );

  const nativeFullscreen = () => {
    game?.scale.toggleFullscreen();
  };

  const onProperNetwork = React.useMemo(() => {
    return !(account && chainId !== 1 && chainId !== 42);
  }, [account, chainId]);

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
      // update scale when window is resized
      onResize={() => {
        if (game && gameRef.current) {
          // NOTE: Must be inject before game canvas!
          // inject domcontainer for gameobjects that use it
          gameRef.current.appendChild(game.domContainer);
          // inject canvas into div
          gameRef.current.appendChild(game.canvas);
          // update parent
          game.scale.parent = gameRef.current;

          // update scale accordingly
          game.scale.setParentSize(gameRef.current.clientWidth, gameRef.current.clientHeight);
          game.scale.setGameSize(gameRef.current.clientWidth, gameRef.current.clientHeight);
          game.scale.updateBounds();
        }
      }}
    >
      {!account ? (
        <Account />
      ) : onProperNetwork ? (
        <Box
          id="game-parent"
          style={{ overflow: 'hidden', width: '100%', height: '100%' }}
          ref={gameRef}
        />
      ) : (
        <DialogSwitchNetwork networkName="Ethereum" />
      )}
    </DesktopWindow>
  );
}
