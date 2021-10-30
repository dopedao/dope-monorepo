import { css } from '@emotion/react';
import { useWeb3React } from '@web3-react/core';
import { zeroPad } from '../../src/utils';
import PanelFooter from '../PanelFooter';
import styled from '@emotion/styled';
// https://github.com/ndresx/react-countdown
import Countdown from 'react-countdown';
import InitiationFooterDopeContent from './InitiationFooterDopeContent';

const CountdownWrapper = styled.div`
  text-align: center;
  font-size: 2.5em;
  padding: 8px;
  span.dots {
    color: #A8A9AE;
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
}

const countdownRenderer = (
  { days, hours, minutes, seconds, completed }: 
  CountdownRenderProps
)  => {
  // Custom Countdown render for style points
  return (
    <PanelFooter css={css`height:auto;`}>
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
  const hustlerMintTime = new Date(2021, 10, 1, 12);
  const currentTime = new Date();;

  const { chainId } = useWeb3React();
  const onTestNetOrAfterLaunch = (chainId == 4) || (currentTime >= hustlerMintTime);

  if (onTestNetOrAfterLaunch) {
    return <InitiationFooterDopeContent />;
  } else {
    return <Countdown date={hustlerMintTime} renderer={countdownRenderer} />
  }
}

export default InitiationFooter;
