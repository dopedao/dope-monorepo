import { Box, Image } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { media } from 'ui/styles/mixins';
import AppWindow from 'components/AppWindow';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import Head from 'components/Head';
import PanelContainer from 'components/PanelContainer';

const MERCH_IMAGES = [
  'beanie-stacking.png',
  'beanie-ak.png',
  'beanie-sellers.png',
  'hat-smiley.png',
  'hat-stacked.png',
  'hoodie.png',
  'tee.png',
  'tee-smiley.png',
  'tee-pocket-smiley.png',
];

const SwapMeet = () => (
  <AppWindow
    scrollable
    height="90vh"
    navbar={<DopeWarsExeNav />}
    title="Swap Meet"
    background="#fff"
  >
    <Head title="Merch" />
    <div
      css={css`
        padding: 16px;
      `}
    >
      <h2
        css={css`
          text-align: center;
        `}
      >
        Soon™
      </h2>
      <br />
      <Box
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          grid-column-gap: 10px;
          grid-row-gap: 16px;
          // Screen > Tablet display items side by side
          ${media.tablet`
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          `}
        `}
      >
        {MERCH_IMAGES.map((filename, index) => (
          <PanelContainer key={`merch-${index}`}>
            <Image src={`/images/merch/${filename}`} alt={filename} />
          </PanelContainer>
        ))}
      </Box>
    </div>
  </AppWindow>
);

export default SwapMeet;
