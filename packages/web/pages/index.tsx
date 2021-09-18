import styled from '@emotion/styled';
import DesktopIcon from '../components/DesktopIcon';
import { useRouter } from "next/router";
import { PageWrapper } from '../styles/components';

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;

export default() => {
  const router = useRouter();

  const openDopewars = (): void => {
    router.replace('/your-loot');
  }

  const openBrowserTab = (url: string): void => {
    window.open(url, '_blank').focus();
  }

  const openSea = (): void => {
    openBrowserTab('https://opensea.io/collection/dope-v4');
  }

  const openTwitter = (): void => {
    openBrowserTab('https://twitter.com/theDopeWars');
  }

  const openDiscord = (): void => {
    openBrowserTab('https://discord.gg/6fqqBS7mhY');
  }

  return (
    <IndexWrapper>
      <DesktopIcon 
        icon="dopewars-exe" 
        label="DOPEWARS.EXE"
        clickAction={ openDopewars }
      />
      <DesktopIcon 
        icon="open-sea" 
        label="OpenSea" 
        clickAction={ openSea }
      />
      <DesktopIcon 
        icon="twitter" 
        label="Twitter" 
        clickAction={ openTwitter }
      />
      <DesktopIcon 
        icon="discord" 
        label="Discord" 
        clickAction={ openDiscord }
      />
    </IndexWrapper>
  )
};
