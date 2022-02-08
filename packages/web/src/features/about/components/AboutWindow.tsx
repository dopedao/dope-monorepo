import { Button, Link } from '@chakra-ui/react';
import DesktopWindow from 'components/DesktopWindow';
import PanelFooter from 'components/PanelFooter';
import ContentIntro from 'features/about/components/ContentIntro';
import ContentAssets from 'features/about/components/ContentAssets';
import ContentFooter from 'features/about/components/ContentFooter';
import ContentRoadmap from 'features/about/components/ContentRoadmap';
import ReactPlayer from 'react-player';
import { css } from '@emotion/react';

const AboutWindow = ({ ...props }) => {
  return (
    <DesktopWindow
      title="ABOUT DOPE WARS"
      background="#efefee"
      width="800px"
      hideWalletAddress
      scrollable
      {...props}
    >
      <div css={css`
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
      `}>
        <ReactPlayer 
          // light='/images/icon/dope-smiley.svg'
          light='/images/Logo-Plain.svg'
          url="https://dope-wars-gg.s3-us-west-1.amazonaws.com/dope-moving-bricks.mp4" 
          width="100%"
          controls
          playing
          css={css`
            background: black;
          `}
          playIcon={
            <Button 
              variant="cny" 
              css={css`width:auto;`}
            >
              Enter the murderverse
            </Button>
          }
        />
        <ContentIntro />
        <ContentRoadmap />
        <ContentAssets />
        <ContentFooter />
      </div>
      <PanelFooter css={css`position:sticky;bottom:0px;width:100%;padding-right:24px;`}>
        <Link href="/news" passHref>
          <Button>Latest Announcements</Button>
        </Link>
        <Link href="/swap-meet" passHref>
          <Button variant="primary">Get a Hustler</Button>
        </Link>
      </PanelFooter>
    </DesktopWindow>
  );
};
export default AboutWindow;
