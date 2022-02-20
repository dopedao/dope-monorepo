import Head from 'components/Head';
import { StarknetProvider } from '@starknet-react/core';

import GameWindow from 'features/ryo/components/GameWindow';
import Drugs from 'features/ryo/components/Drugs';

const RYO = () => (
  <>
    <Head title="Roll Your Own" />
    <StarknetProvider>
      <GameWindow>
        <Drugs />
      </GameWindow>
    </StarknetProvider>
  </>
);

export default RYO;
