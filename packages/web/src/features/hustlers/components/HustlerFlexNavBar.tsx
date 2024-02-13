import { Button } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { PHRASES } from 'features/news/components/NewsHeader';
import { Share } from 'react-twitter-widgets';
import AppWindowNavBar from 'components/AppWindowNavBar';
import Link from 'next/link';
import { Box } from '@chakra-ui/react';

const HustlerFlexNavBar = () => (
  <AppWindowNavBar>
    <Link href="/swap-meet/inventory?section=Hustlers" passHref>
      <Button variant="navBar">← Your Hustlers</Button>
    </Link>
    <Box
      css={css`
        position: absolute;
        right: 16px;
        bottom: 8px;
      `}
    >
      <Share
        url={typeof window !== 'undefined' ? window?.location.toString() : 'https://dopewars.gg'}
        options={{
          text: `${
            PHRASES[Math.floor(Math.random() * PHRASES.length)]
          } \n#hustlerFollowHustler @TheDopeWars`,
        }}
      />
    </Box>
  </AppWindowNavBar>
);
export default HustlerFlexNavBar;
