import IconGrid from 'components/IconGrid';
import DesktopIcon from 'components/DesktopIcon';
import DesktopWindow from 'components/DesktopWindow';
import { css } from '@emotion/react';

const SocialLinks = () => {
  const openBrowserTab = (url: string): void => {
    window.open(url, '_blank')?.focus();
  };

  return (
    <DesktopWindow title="Other Stuff" width={600} height={800} scrollable hideWalletAddress>
      <IconGrid
        css={css`
          position: relative;
          top: 64px;
          // Override media queries in base component
          width: 100% !important;
          align-items: center !important;
          justify-content: center !important;
        `}
      >
        <DesktopIcon
          icon="file"
          label="Wiki + Players Guide"
          clickAction={() => openBrowserTab('http://wiki.dopedao.org')}
        />
        <DesktopIcon
          icon="twitter"
          label="Twitter"
          clickAction={() => openBrowserTab('https://twitter.com/theDopeWars')}
        />
        <DesktopIcon
          icon="discord"
          label="Discord"
          clickAction={() => openBrowserTab('https://discord.gg/dopewars')}
        />
        {/* <DesktopIcon
          icon="telegram"
          label="Telegram"
          clickAction={() => openBrowserTab('https://t.me/DopeWarsPaper')}
        /> */}
        <DesktopIcon
          icon="open-sea"
          label="OpenSea"
          clickAction={() => openBrowserTab('https://opensea.io/collection/dope-v4')}
        />
        <DesktopIcon
          icon="tally"
          label="Tally"
          clickAction={() => openBrowserTab('https://www.withtally.com/governance/dopeWars')}
        />
        <DesktopIcon
          icon="snapshot"
          label="Snapshot"
          clickAction={() => openBrowserTab('https://snapshot.org/#/dopedao.eth')}
        />
        <DesktopIcon
          icon="file-chart"
          label="DOPE Stats"
          clickAction={() => openBrowserTab('https://dune.xyz/HorizonXP/Dope-Wars-Degen-Dashboard')}
        />
      </IconGrid>
    </DesktopWindow>
  );
};

export default SocialLinks;
