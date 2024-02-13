import { Box } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { css } from '@emotion/react';
import ContentHustlers from './ContentHustlers';
import ContentIntro from 'features/about/components/ContentIntro';
import ContentProjects from 'features/about/components/ContentProjects';
import DesktopWindow from 'components/DesktopWindow';
import Link from 'next/link';
import PanelFooter from 'components/PanelFooter';

const VIDEOS = [
  'https://www.youtube.com/watch?v=kvWM2obNMyI',
  'https://www.youtube.com/watch?v=bkNF9VdY2-o',
  'https://www.youtube.com/watch?v=RDZtsWPFFK8',
  'https://www.youtube.com/watch?v=tScIPitpeDM',
  'https://www.youtube.com/watch?v=IomJleXItCg',
  'https://www.youtube.com/watch?v=HXMfLfslvus',
];

const AboutWindow = ({ ...props }) => {
  return (
    <DesktopWindow
      title="ABOUT DOPE WARS"
      background="#efefee"
      width="800px"
      hideWalletAddress
      {...props}
    >
      <Box
        css={css`
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          justify-content: stretch;
        `}
      >
        <Box
          css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            .react-player__preview {
              background-size: 80% 80% !important;
              background-repeat: no-repeat;
              align-items: end !important;
              padding: 32px;
            }
          `}
        >
          {/* <ReactPlayer
            // If we want a cover image
            // light="/images/Logo-Plain.svg"
            //
            // To auto-play uncomment this
            // playing
            //
            url={VIDEOS}
            width="100%"
            controls
            css={css`
              background: black;
            `}
            playIcon={
              <Button
                variant="cny"
                css={css`
                  width: auto;
                `}
              >
                Enter the murderverse
              </Button>
            }
          /> */}
          <ContentIntro />
          <ContentHustlers />
          <ContentProjects />
        </Box>
        <PanelFooter
          css={css`
            position: sticky;
            bottom: 0;
            padding-right: 16px;
          `}
        >
          <Box />
          <Link href="/mint" passHref>
            <Button variant="primary">Mint a Hustler</Button>
          </Link>
        </PanelFooter>
      </Box>
    </DesktopWindow>
  );
};
export default AboutWindow;
