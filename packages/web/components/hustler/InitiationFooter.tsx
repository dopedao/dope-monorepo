import { css } from '@emotion/react';
import { useWeb3React } from '@web3-react/core';
import { zeroPad } from 'src/utils';
import { HustlerInitConfig, getRandomHustler } from 'src/HustlerConfig';
import { HUSTLER_MINT_TIME } from 'src/constants';
import { useEffect, useState } from 'react';
import PanelFooter from 'components/PanelFooter';
import styled from '@emotion/styled';
// https://github.com/ndresx/react-countdown
import Countdown from 'react-countdown';
import InitiationFooterDopeContent from './InitiationFooterDopeContent';
import { useReleaseDate } from 'hooks/contracts';

const CountdownWrapper = styled.div`
  text-align: center;
  font-size: 2.5em;
  padding: 8px;
  span.dots {
    color: #a8a9ae;
  }
`;

interface CountdownRenderProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const countSeparator = (sep: string) => {
  return <span className="dots">{sep}</span>;
};

const countdownRenderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
  // Custom Countdown render for style points
  return (
    <PanelFooter
      css={css`
        height: auto;
      `}
    >
      <CountdownWrapper>
        {zeroPad(days)}
        {countSeparator('D')}
        {zeroPad(hours)}
        {countSeparator('H')}
        {zeroPad(minutes)}
        {countSeparator('M')}
        {zeroPad(seconds)}
        {countSeparator('S')}
      </CountdownWrapper>
    </PanelFooter>
  );
};

const InitiationFooter = () => {
  const releaseDate = useReleaseDate();
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    if (releaseDate) {
      setIsLaunched(new Date() >= new Date(releaseDate * 1000));
    }
  }, [releaseDate]);

  // Render random hustler as countdown approached
  let randomHustlerRenderInterval: any;
  useEffect(() => {
    if (!isLaunched) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      randomHustlerRenderInterval = setInterval(() => {
        HustlerInitConfig(getRandomHustler());
      }, 6000);
    }
    return () => clearInterval(randomHustlerRenderInterval);
  });

  if (isLaunched) {
    clearInterval(randomHustlerRenderInterval);
    return <InitiationFooterDopeContent />;
  } else {
    return <Countdown date={HUSTLER_MINT_TIME} renderer={countdownRenderer} />;
  }
};

export default InitiationFooter;
