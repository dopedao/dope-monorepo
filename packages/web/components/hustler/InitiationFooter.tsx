import { css } from '@emotion/react';
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
    color: #767674;
  }
`;

interface CountdownRenderProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const countdownRenderer = (
  { days, hours, minutes, seconds, completed }: 
  CountdownRenderProps
)  => {
  // completed = true;
  if (completed) {
    return <InitiationFooterDopeContent />    
  } else {
    const d = <span className="dots">:</span>;
    // Custom Countdown render for style points
    return (
      <PanelFooter css={css`height:auto;`}>
        <CountdownWrapper>
          {zeroPad(days)}
          {d}
          {zeroPad(hours)}
          {d}
          {zeroPad(minutes)}
          {d}
          {zeroPad(seconds)}
        </CountdownWrapper>
      </PanelFooter>
    );
  }
};

const InitiationFooter = () => {
  return <Countdown date='2021-10-31T01:02:03' renderer={countdownRenderer} />
}

export default InitiationFooter;
