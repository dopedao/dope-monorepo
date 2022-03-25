import Head from 'components/Head';

import GameWindow from 'features/ryo/components/GameWindow';
import Drugs from 'features/ryo/components/Drugs';
import GameWindowHeader, {
  GameWindowHeaderAchievements,
  GameWindowHeaderHustlerProfile,
} from 'features/ryo/components/GameWindowHeader';
import { Button, HStack, Stack } from '@chakra-ui/react';
import { NavLink } from 'components/NavLink';
import ArrowBack from 'ui/svg/ArrowBack';

const Round = () => (
  <>
    <Head title="Roll Your Own" />
    <GameWindow>
      <GameWindowHeader>
        <NavLink href="/roll-your-own/1" passHref>
          <Button variant="unstyled">
            <HStack color="black">
              <ArrowBack />
              <span>Lobby</span>
            </HStack>
          </Button>
        </NavLink>
        <Stack>
          <GameWindowHeaderAchievements />
          <GameWindowHeaderHustlerProfile />
        </Stack>
      </GameWindowHeader>
      <Drugs />
    </GameWindow>
  </>
);

export default Round;
