import { media } from 'ui/styles/mixins';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useWAGMI } from 'hooks/web3';
import DesktopIcon from 'components/DesktopIcon';
import styled from '@emotion/styled';
import WebAmpPlayer from './WebAmpPlayer';

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
  const [showWebAmp, setShowWebAmp] = useState(false);

  const router = useRouter();
  const openLocalRoute = (url: string): void => {
    router.replace(url);
  };
  const openBrowserTab = (url: string): void => {
    window.open(url, '_blank')?.focus();
  };

  useWAGMI();

  return (
    <>
      {showWebAmp && <WebAmpPlayer onClose={() => setShowWebAmp(false)} />}
      <IconGrid>
        <DesktopIcon
          icon="file"
          label="READ ME FIRST"
          clickAction={() => openLocalRoute('/about')}
        />
        <DesktopIcon
          icon="dopewars-exe"
          label="DOPEWARS.EXE"
          clickAction={() => {
            const hasAgreed = window.localStorage.getItem('tos');
            if (hasAgreed === 'true') {
              openLocalRoute('/swap-meet');
            } else {
              openLocalRoute('/terms-of-service');
            }
          }}
        />
        {/* <DesktopIcon icon="todo" label="GAME" clickAction={() => openLocalRoute('/game')} /> */}
        <DesktopIcon icon="tv" label="DOPE TV" clickAction={() => openLocalRoute('/dope-tv')} />
        {/* <DesktopIcon icon="file" label="News" clickAction={() => openLocalRoute('/news')} /> */}
        <DesktopIcon icon="winamp" label="DOPE AMP" clickAction={() => setShowWebAmp(true)} />
        {/* <DesktopIcon 
        icon="file-chart" 
        label="DOPE Stats" 
        clickAction={() => openBrowserTab('https://dune.xyz/HorizonXP/Dope-Wars-Degen-Dashboard')} 
      /> */}
        <DesktopIcon
          icon="paper-bill-desktop"
          label="GET $PAPER"
          clickAction={() =>
            openBrowserTab(
              'https://www.dextools.io/app/ether/pair-explorer/0xad6d2f2cb7bf2c55c7493fd650d3a66a4c72c483',
            )
          }
        />
        <DesktopIcon
          icon="tally"
          label="Dope DAO"
          clickAction={() => openBrowserTab('https://www.withtally.com/governance/dopeWars')}
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
          icon="twitter"
          label="Twitter"
          clickAction={() => openBrowserTab('https://twitter.com/theDopeWars')}
        />
        <DesktopIcon
          icon="discord"
          label="Discord"
          clickAction={() => openBrowserTab('https://discord.gg/VFbAX3JzPu')}
        />
      </IconGrid>
    </>
  );
};
export default DesktopIconList;
