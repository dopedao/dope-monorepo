import { StarknetProvider } from '@starknet-react/core';
import Head from 'components/Head';
import Sell from 'features/ryo/components/Sell';
import GameWindow from 'features/ryo/components/GameWindow';

const RYO = () => (
  <>
    <Head title="Roll Your Own" />
    <StarknetProvider>
      <GameWindow>
        <Sell />
      </GameWindow>
    </StarknetProvider>
  </>
);

export default RYO;
