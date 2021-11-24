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

  return <InitiationFooterDopeContent />;
};

export default InitiationFooter;
