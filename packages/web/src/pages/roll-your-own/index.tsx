import Head from 'components/Head';
import { StarknetProvider } from '@starknet-react/core';

import GameWindow from 'features/ryo/components/GameWindow';
import Drugs from 'features/ryo/components/Drugs';
import GameWindowHeader from 'features/ryo/components/GameWindowHeader';

const RYO = () => (
  <>
    <Head title="Roll Your Own" />
    <StarknetProvider>
      <GameWindow>
        <GameWindowHeader />
        <Drugs />
      </GameWindow>
    </StarknetProvider>
  </>
);

export default RYO;
