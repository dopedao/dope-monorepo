import { constructionBackground } from 'components/ComingSoonDialog';
import { css } from '@emotion/react';
import { Image } from '@chakra-ui/react';
import AppWindow from 'components/AppWindow';
import CardContainer from 'features/profile/components/CardContainer';
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
      <CardContainer>
        {MERCH_IMAGES.map((filename, index) => (
          <PanelContainer key={`merch-${index}`}>
            <Image src={`/images/merch/${filename}`} alt={filename} />
          </PanelContainer>
        ))}
      </CardContainer>
    </div>
  </AppWindow>
);

export default SwapMeet;
