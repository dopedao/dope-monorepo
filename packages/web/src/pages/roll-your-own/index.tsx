import Head from 'components/Head';
import { StarknetProvider } from '@starknet-react/core';

import GameWindow from 'features/ryo';

const RYO = () => (
  <>
    <Head title="Roll Your Own" />
    <StarknetProvider>
      <GameWindow></GameWindow>
    </StarknetProvider>
  </>
);

export default RYO;
