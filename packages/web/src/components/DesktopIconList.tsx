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
          icon="hongbao"
          label="新年好"
          clickAction={() => openLocalRoute('/lunar-new-year')}
        />
        <DesktopIcon
          icon="dopewars-exe"
          label="Swap Meet"
          clickAction={() => {
            const hasAgreed = window.localStorage.getItem('tos');
            if (hasAgreed === 'true') {
              openLocalRoute('/inventory');
            } else {
              openLocalRoute('/terms-of-service');
            }
          }}
        />
        <DesktopIcon
          icon="file"
          label="About"
          clickAction={() => openLocalRoute('/about')}
        />
        {/* <DesktopIcon icon="todo" label="GAME" clickAction={() => openLocalRoute('/game')} /> */}
        <DesktopIcon icon="tv" label="Dope TV" clickAction={() => openLocalRoute('/dope-tv')} />
        {/* <DesktopIcon icon="file" label="News" clickAction={() => openLocalRoute('/news')} /> */}
        <DesktopIcon icon="winamp" label="Dope Amp" clickAction={() => setShowWebAmp(true)} />      
        <DesktopIcon
          icon="paper-bill-desktop"
          label="Get $PAPER"
          clickAction={() =>
            openBrowserTab(
              'https://www.dextools.io/app/ether/pair-explorer/0xad6d2f2cb7bf2c55c7493fd650d3a66a4c72c483',
            )
          }
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
