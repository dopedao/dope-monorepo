import { css } from '@emotion/react';
import DesktopIcon from '../components/DesktopIcon';
import { useRouter } from 'next/router';

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

  return (
    <div
      css={css`
        position: fixed;
      `}
    >
      <DesktopIcon icon="dopewars-exe" label="DOPEWARS.EXE" clickAction={openDopewars} />
      <DesktopIcon icon="open-sea" label="OpenSea" clickAction={openSea} />
      <DesktopIcon icon="twitter" label="Twitter" clickAction={openTwitter} />
      <DesktopIcon icon="discord" label="Discord" clickAction={openDiscord} />
    </div>
  );
};
