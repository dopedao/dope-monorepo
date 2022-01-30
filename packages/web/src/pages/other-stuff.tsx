import IconGrid from 'components/IconGrid';
import DesktopIcon from 'components/DesktopIcon';
import DesktopWindow from 'components/DesktopWindow';
import { css } from '@emotion/react';

const SocialLinks = () => {
  const openBrowserTab = (url: string): void => {
    window.open(url, '_blank')?.focus();
  };

  return(
    <DesktopWindow title="Social Links" width={640}>
      <IconGrid css={css`top:32px;`}>
        <DesktopIcon 
          icon="file-chart" 
          label="DOPE Stats" 
          clickAction={() => openBrowserTab('https://dune.xyz/HorizonXP/Dope-Wars-Degen-Dashboard')} 
        />
        <DesktopIcon
          icon="twitter"
          label="Twitter"
          clickAction={() => openBrowserTab('https://twitter.com/theDopeWars')}
        />
        <DesktopIcon
          icon="discord"
          label="Discord"
          clickAction={() => openBrowserTab('https://discord.gg/VFbAX3JzPu')}
        />
        <DesktopIcon
          icon="telegram"
          label="Telegram"
          clickAction={() => openBrowserTab('https://t.me/DopeWarsPaper')}
        />
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
      </IconGrid>
    </DesktopWindow>
  );
};

export default SocialLinks;