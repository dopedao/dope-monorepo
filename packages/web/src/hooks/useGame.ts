import { useState, useEffect } from 'react';
import { Game, Types } from 'phaser';
import { createStandaloneToast } from '@chakra-ui/react';

export function useGame(
  config: Types.Core.GameConfig,
  containerRef: React.RefObject<HTMLDivElement>,
): Game | undefined {
  const [game, setGame] = useState<Game>();
  // reload on account/chain change
  useEffect(() => {
    if (!window.ethereum) return;

    const { ethereum } = window as any;
    const toast = createStandaloneToast();

    const destroyGame = () => {
      game?.destroy(true);
      setTimeout(() => setGame(undefined));
      // setGame(undefined)
    };

    const onAccountsChanged = (accounts: string[]) => {
      toast.toast({
        title: 'Detected account change. Reloading game...',
        description: `${accounts[0]}`,
        status: 'warning',
      });
      destroyGame();
    };

    const onChainChanged = (chainId: string | number) => {
      toast.toast({
        title: 'Detected chain change. Reloading game...',
        description: `Chain changed to ${chainId}`,
        status: 'warning',
      });
      destroyGame();
    };

    ethereum.on('accountsChanged', onAccountsChanged);
    ethereum.on('chainChanged', onChainChanged);

    return () => {
      if (ethereum.removeListener) {
        ethereum.removeListener('accountsChanged', onAccountsChanged);
        ethereum.removeListener('chainChanged', onChainChanged);
      }
    };
  }, [game]);

  useEffect(() => {
    if (!game && containerRef.current) {
      //setTimeout(() => {
      const newGame = new Game({ ...config, parent: containerRef.current! });
      setGame(newGame);
      //})
    }
    return () => {
      game?.destroy(true);
    };
  }, [config, containerRef, game]);

  return game;
}
