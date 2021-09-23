import { media } from '../styles/mixins';
import { useRouter } from 'next/router';
import DesktopIcon from '../components/DesktopIcon';
import styled from '@emotion/styled';

const IconGrid = styled.div`
  position: fixed;
  z-index: 0;
  bottom: 0px;
  display: flex;
  // Default
  width: 100%;
  height: auto;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-end;
  gap: 12px;
  padding: 12px;
  ${media.tablet`
    gap: 16px;
    padding: 16px;
  `}
  ${media.laptop`
    gap: 24px;
    padding: 24px;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
    width: auto;
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
        clickAction={() => openLocalRoute('/loot')}
      />
      <DesktopIcon icon="file" label="ABOUT.FAQ" clickAction={() => openLocalRoute('/about')} />
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
