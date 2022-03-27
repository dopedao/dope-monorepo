import Head from 'components/Head';

import GameWindow from 'features/ryo/components/GameWindow';
import GameWindowHeader, {
  GameWindowHeaderHustlerProfile,
} from 'features/ryo/components/GameWindowHeader';
import { NavLink } from 'components/NavLink';
import { Button, HStack } from '@chakra-ui/react';
import ArrowBack from 'ui/svg/ArrowBack';
import MatchDetails from 'features/ryo/components/MatchDetails';

const Round = () => (
  <>
    <Head title="Roll Your Own" />
    <GameWindow>
      <GameWindowHeader>
        <NavLink href="/roll-your-own">
          <Button variant="unstyled">
            <HStack color="black">
              <ArrowBack />
              <span>Back</span>
            </HStack>
          </Button>
        </NavLink>
        <GameWindowHeaderHustlerProfile />
      </GameWindowHeader>
      <MatchDetails />
    </GameWindow>
  </>
);

export default Round;
