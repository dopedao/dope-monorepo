import { StarknetProvider } from '@starknet-react/core';
import Head from 'components/Head';
import Buy from 'features/ryo/components/Buy';
import GameWindow from 'features/ryo/components/GameWindow';

const RYO = () => (
  <>
    <Head title="Roll Your Own" />
    <GameWindow>
      <Buy />
    </GameWindow>
  </>
);

export default RYO;
