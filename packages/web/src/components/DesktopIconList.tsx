import { useRouter } from 'next/router';
import { useState } from 'react';
import { useWAGMI } from 'hooks/web3';
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

  useWAGMI();

  return (
    <>
      {showWebAmp && <WebAmpPlayer onClose={() => setShowWebAmp(false)} />}
      <IconGrid>
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
        <DesktopIcon
          icon="file"
          label="READ ME FIRST"
          clickAction={() => openLocalRoute('/about')}
        />
        {/* <DesktopIcon icon="todo" label="GAME" clickAction={() => openLocalRoute('/game')} /> */}
        <DesktopIcon icon="tv" label="DOPE TV" clickAction={() => openLocalRoute('/dope-tv')} />
        {/* <DesktopIcon icon="file" label="News" clickAction={() => openLocalRoute('/news')} /> */}
        <DesktopIcon icon="winamp" label="DOPE AMP" clickAction={() => setShowWebAmp(true)} />      
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
          icon="hongbao"
          label="LUNAR NEW YEAR"
          clickAction={() => openLocalRoute('/special-event')}
        />
        <DesktopIcon
          icon="folder"
          label="Other Stuff"
          clickAction={() => openLocalRoute('/other-stuff')}
        />
      </IconGrid>
    </>
  );
};
export default DesktopIconList;
