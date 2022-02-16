import Head from 'components/Head';
import { BlockHashProvider } from 'hooks/starknet/BlockHashProvider';
import { StarknetProvider } from 'hooks/starknet/StarknetProvider';
import { TransactionsProvider } from 'hooks/starknet/TransactionsProvider';

import GameWindow from 'features/ryo';

const RYO = () => (
  <>
    <Head title="Roll Your Own" />
    <StarknetProvider>
      <BlockHashProvider>
        <TransactionsProvider>
          <GameWindow></GameWindow>
        </TransactionsProvider>
      </BlockHashProvider>
    </StarknetProvider>
  </>
);

export default RYO;
