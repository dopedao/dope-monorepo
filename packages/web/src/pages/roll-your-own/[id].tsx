import Head from 'components/Head';

import GameWindow from 'features/ryo/components/GameWindow';
import Drugs from 'features/ryo/components/Drugs';
import GameWindowHeader, {
  GameWindowHeaderAchievements,
  GameWindowHeaderHustlerProfile,
} from 'features/ryo/components/GameWindowHeader';

const Round = () => (
  <>
    <Head title="Roll Your Own" />
    <GameWindow>
      <GameWindowHeader>
        <GameWindowHeaderAchievements />
        <GameWindowHeaderHustlerProfile />
      </GameWindowHeader>
      <Drugs />
    </GameWindow>
  </>
);

export default Round;
