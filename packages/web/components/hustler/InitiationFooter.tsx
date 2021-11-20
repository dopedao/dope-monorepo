import { HustlerInitConfig, getRandomHustler } from 'src/HustlerConfig';
import { useEffect, useState } from 'react';
import InitiationFooterDopeContent from './InitiationFooterDopeContent';
import { useLastestBlock } from 'hooks/web3';
import { useReleaseDate } from 'hooks/contracts';

const InitiationFooter = () => {
  const releaseDate = useReleaseDate();
  const latest = useLastestBlock();
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    if (latest && releaseDate) {
      setIsLaunched(new Date(latest.timestamp * 1000) >= releaseDate);
    }
  }, [latest, releaseDate]);

  // Render random hustler as countdown approached
  let randomHustlerRenderInterval: any;
  useEffect(() => {
    if (!isLaunched) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      randomHustlerRenderInterval = setInterval(() => {
        HustlerInitConfig(getRandomHustler());
      }, 16000);
    }
    return () => clearInterval(randomHustlerRenderInterval);
  }, []);

  return <InitiationFooterDopeContent />;
};

export default InitiationFooter;
