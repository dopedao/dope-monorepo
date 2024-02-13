import { useRouter } from 'next/router';
import { useState } from 'react';
import DesktopIcon from 'components/DesktopIcon';
import IconGrid from 'components/IconGrid';
import WebAmpPlayer from 'components/WebAmpPlayer';

const DesktopIconList = () => {
  const [showWebAmp, setShowWebAmp] = useState(false);

  const router = useRouter();
  const openLocalRoute = (url: string): void => {
    router.replace(url);
  };
  const openBrowserTab = (url: string): void => {
    window.open(url, '_blank')?.focus();
  };

  return (
    <>
      {showWebAmp && <WebAmpPlayer onClose={() => setShowWebAmp(false)} />}
      <IconGrid>
        <DesktopIcon
          icon="dopewars-exe"
          label="SWAP MEET"
          clickAction={() => {
            const hasAgreed = window.localStorage.getItem('tos');
            if (hasAgreed === 'true') {
              openLocalRoute('/swap-meet');
            } else {
              openLocalRoute('/terms-of-service');
            }
          }}
        />
        <DesktopIcon icon="file" label="ABOUT.TXT" clickAction={() => openLocalRoute('/about')} />
        <DesktopIcon
          icon="ryo"
          label="PLAY RYO"
          clickAction={() => openBrowserTab('https://rollyourown.preview.cartridge.gg/')}
        />
        <DesktopIcon
          icon="dope_frenzy"
          label="PLAY Mean Streets"
          clickAction={() => openBrowserTab('https://dopefrenzy.gg/')}
        />
        <DesktopIcon
          icon="uniswap-uni-logo"
          label="Get $PAPER"
          clickAction={() =>
            openBrowserTab(
              'https://app.uniswap.org/#/swap?theme=dark&inputCurrency=ETH&outputCurrency=0x7ae1d57b58fa6411f32948314badd83583ee0e8c',
            )
          }
        />
        {/* <DesktopIcon icon="todo" label="GAME" clickAction={() => openLocalRoute('/game')} /> */}
        <DesktopIcon icon="winamp" label="Dope Amp" clickAction={() => setShowWebAmp(true)} />
        <DesktopIcon
          icon="folder"
          label="Other Links"
          clickAction={() => openLocalRoute('/other-stuff')}
        />
      </IconGrid>
    </>
  );
};
export default DesktopIconList;
