import { Button, Link } from '@chakra-ui/react';
import { css } from '@emotion/react';
import ContentFooter from 'features/about/components/ContentFooter';
import ContentHustlers from './ContentHustlers';
import ContentIntro from 'features/about/components/ContentIntro';
import ContentRoadmap from 'features/about/components/ContentRoadmap';
import DesktopWindow from 'components/DesktopWindow';
import PanelFooter from 'components/PanelFooter';
import ReactPlayer from 'react-player';

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
      <div
        css={css`
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          justify-content: stretch;
        `}
      >
        <div
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
          <ReactPlayer
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
          />
          <ContentIntro />
          <ContentHustlers />
          <ContentRoadmap />
          <ContentFooter />
        </div>
        <PanelFooter
          css={css`
            position: sticky;
            bottom: 0;
            padding-right: 16px;
          `}
        >
          <div></div>
          <Link href="/news" passHref>
            <Button>Latest Announcements</Button>
          </Link>
          <Link href="/mint" passHref>
            <Button variant="primary">Mint a Hustler</Button>
          </Link>
        </PanelFooter>
      </div>
    </DesktopWindow>
  );
};
export default AboutWindow;
