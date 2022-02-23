import Head from 'components/Head';
import Sell from 'features/ryo/components/Sell';
import GameWindow from 'features/ryo/components/GameWindow';
import GameWindowHeader, {
  GameWindowHeaderAchievements,
} from 'features/ryo/components/GameWindowHeader';
import { NavLink } from 'components/NavLink';
import { Button, HStack } from '@chakra-ui/react';
import ArrowBack from 'ui/svg/ArrowBack';

const RYO = () => (
  <>
    <Head title="Roll Your Own" />
    <GameWindow>
      <GameWindowHeader>
        <NavLink href="/roll-your-own/1/location/brooklyn">
          <Button variant="unstyled">
            <HStack color="black">
              <ArrowBack />
              <span>Back</span>
            </HStack>
          </Button>
        </NavLink>
        <GameWindowHeaderAchievements />
      </GameWindowHeader>
      <Sell />
    </GameWindow>
  </>
);

export default RYO;
