import Head from 'components/Head';

import GameWindow from 'features/ryo/components/GameWindow';
import Lobby from 'features/ryo/components/Lobby';

const RYO = () => (
  <>
    <Head title="Roll Your Own" />
    <GameWindow>
      <Lobby />
    </GameWindow>
  </>
);

export default RYO;
