import { Box, Image, HStack } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { media } from 'ui/styles/mixins';
import AppWindow from 'components/AppWindow';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import Head from 'components/Head';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';

const MERCH = {
  'Stacking $PAPER Beanie': 'beanie-stacking.png',
  'AK+1 Beanie': 'beanie-ak.png',
  'Sellers Get Rekt Beanie': 'beanie-sellers.png',
  'Dope Hat Smiley': 'hat-smiley.png',
  'Dope Hat Stacked': 'hat-stacked.png',
  'Dope Pullover Hoodie': 'hoodie.png',
  'Dope Stacked Tee': 'tee.png',
  'Dope Smiley Tee': 'tee-smiley.png',
  'Dope Pocket Tee': 'tee-pocket-smiley.png',
};

const SwapMeetMerch = () => (
  <AppWindow
    scrollable
    height="90vh"
    navbar={<DopeWarsExeNav />}
    title="Swap Meet"
  >
    <Head title="Merch" />
    <div>
      <HStack
        margin="0"
        gridGap={1}
        width="100%"
        justifyContent="start"
        padding="16px"
        background="white"
        borderBottom="2px solid black"
      >
        <h2
          css={css`
            text-align: center;
            flex: 1;
          `}
        >
          Soon™
        </h2>   
      </HStack>
      <Box
        css={css`
          padding: 16px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          grid-column-gap: 10px;
          grid-row-gap: 16px;
          // Screen > Tablet display items side by side
          ${media.tablet`
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          `}
        `}
      >
        {Object.entries(MERCH).map(([title, filename]) => (
          <PanelContainer key={`merch-${title}`}>
            <PanelTitleBar centered css={css`line-height:1.25em;`}>
              {title}
            </PanelTitleBar>
            <Image src={`/images/merch/${filename}`} alt={filename} />
          </PanelContainer>
        ))}
      </Box>
    </div>
  </AppWindow>
);

export default SwapMeetMerch;
