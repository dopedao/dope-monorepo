import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import DesktopIcon from '../components/DesktopIcon';

const IconGrid = styled.div`
  position: fixed;
  height: 100%;
  z-index: 0;
  padding: 32px;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
`;

export default () => {
  const router = useRouter();

  const openDopewars = (): void => {
    router.replace('/loot');
  };

  const openBrowserTab = (url: string) => {
    window.open(url, '_blank')?.focus();
  };

  const openSea = (): void => {
    openBrowserTab('https://opensea.io/collection/dope-v4');
  };

  const openTwitter = (): void => {
    openBrowserTab('https://twitter.com/theDopeWars');
  };

  const openDiscord = (): void => {
    openBrowserTab('https://discord.gg/6fqqBS7mhY');
  };

  const openTally = (): void => {
    openBrowserTab('https://www.withtally.com/governance/dopeWars');
  };

  return (
    <IconGrid>
      <DesktopIcon icon="dopewars-exe" label="DOPEWARS.EXE" clickAction={openDopewars} />
      <DesktopIcon icon="file" label="ABOUT" clickAction={openTally} />
      <DesktopIcon icon="tally" label="Dope DAO" clickAction={openTally} />
      <DesktopIcon icon="open-sea" label="OpenSea" clickAction={openSea} />
      <DesktopIcon icon="twitter" label="Twitter" clickAction={openTwitter} />
      <DesktopIcon icon="discord" label="Discord" clickAction={openDiscord} />
    </IconGrid>
  );
};
