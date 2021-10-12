import { media } from '../styles/mixins';
import { useRouter } from 'next/router';
import DesktopIcon from '../components/DesktopIcon';
import styled from '@emotion/styled';

const IconGrid = styled.div`
  position: fixed;
  z-index: 0;
  bottom: 0px;
  left: 0px;
  display: flex;
  // Default
  width: auto;
  height: 100%;
  flex-flow: column wrap;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  ${media.tablet`
    gap: 16px;
    padding: 16px;
  `}
  ${media.laptop`
    gap: 32px;
    padding: 32px;
    // flex-flow: column wrap;
    // justify-content: flex-start;
    // align-items: flex-start;
  `}
`;

const DesktopIconList = () => {
  const router = useRouter();
  const openLocalRoute = (url: string): void => {
    router.replace(url);
  };
  const openBrowserTab = (url: string): void => {
    window.open(url, '_blank')?.focus();
  };

  return (
    <IconGrid>
      <DesktopIcon
        icon="dopewars-exe"
        label="DOPEWARS.EXE"
        clickAction={() => openLocalRoute('/terms-of-service')}
      />
      <DesktopIcon icon="tv" label="DOPE TV" clickAction={() => openLocalRoute('/dope-tv')} />
      <DesktopIcon 
        icon="file" 
        label="ABOUT.FAQ" 
        clickAction={() => openLocalRoute('/about')} 
      />
      {/* <DesktopIcon 
        icon="file-chart" 
        label="DOPE Stats" 
        clickAction={() => openBrowserTab('https://dune.xyz/HorizonXP/Dope-Wars-Degen-Dashboard')} 
      /> */}
      <DesktopIcon 
        icon="paper-bill-desktop" 
        label="GET $PAPER" 
        clickAction={() => openBrowserTab('https://www.dextools.io/app/ether/pair-explorer/0x811f8c60ee1805db7ece0fa3c7b064feba887053')} 
      />
      <DesktopIcon
        icon="tally"
        label="Dope DAO"
        clickAction={() => openBrowserTab('https://www.withtally.com/governance/dopeWars')}
      />
      <DesktopIcon
        icon="open-sea"
        label="OpenSea"
        clickAction={() => openBrowserTab('https://opensea.io/collection/dope-v4')}
      />
      <DesktopIcon
        icon="twitter"
        label="Twitter"
        clickAction={() => openBrowserTab('https://twitter.com/theDopeWars')}
      />
      <DesktopIcon
        icon="discord"
        label="Discord"
        clickAction={() => openBrowserTab('https://discord.gg/6fqqBS7mhY')}
      />
    </IconGrid>
  );
};
export default DesktopIconList;
