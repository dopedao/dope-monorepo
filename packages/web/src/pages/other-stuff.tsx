import IconGrid from 'components/IconGrid';
import DesktopIcon from 'components/DesktopIcon';
import DesktopWindow from 'components/DesktopWindow';
import { css } from '@emotion/react';
import DesktopIconList from 'components/DesktopIconList';

const SocialLinks = () => {
  const openBrowserTab = (url: string): void => {
    window.open(url, '_blank')?.focus();
  };

  return (
    <>
      <DesktopIconList />
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
            clickAction={() => openBrowserTab('/wiki')}
          />
          <DesktopIcon
            icon="paper-bill-desktop"
            label="$PAPER Info"
            clickAction={() =>
              openBrowserTab(
                'https://www.dextools.io/app/ether/pair-explorer/0xad6d2f2cb7bf2c55c7493fd650d3a66a4c72c483',
              )
            }
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
          <DesktopIcon
            icon="tally"
            label="Tally"
            clickAction={() =>
              openBrowserTab(
                'https://www.tally.xyz/gov/eip155:1:0xDBd38F7e739709fe5bFaE6cc8eF67C3820830E0C',
              )
            }
          />
          <DesktopIcon
            icon="snapshot"
            label="Snapshot"
            clickAction={() => openBrowserTab('https://snapshot.org/#/dopedao.eth')}
          />
        </IconGrid>
      </DesktopWindow>
    </>
  );
};

export default SocialLinks;
