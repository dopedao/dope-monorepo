import { css } from '@emotion/react';
import PanelFooter from '../PanelFooter';
import styled from '@emotion/styled';
// https://github.com/ndresx/react-countdown
import Countdown from 'react-countdown';

const hasDopeNft = false;

const NoDopeMessage = () => {
  return <>
    Buy some dope
  </>;
}

const MintHustlerControls = () => {
  return <>
    Customize and mint hustler
  </>;
}

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

const zeroPad = (i: number) => {
  let iStr = i.toString();
  if (i < 10) {
    iStr = `0${iStr}`;
  }
  return iStr;
}

const countdownRenderer = (
    { days, hours, minutes, seconds, completed }: 
    CountdownRenderProps
  )  => {
  if (completed) {
    if (hasDopeNft) {
      return <MintHustlerControls />;    
    } else {
      return <NoDopeMessage />;
    }
  } else {
    return (
      <CountdownWrapper>
        {zeroPad(days)}
        <span className="dots">:</span>
        {zeroPad(hours)}
        <span className="dots">:</span>
        {zeroPad(minutes)}
        <span className="dots">:</span>
        {zeroPad(seconds)}
      </CountdownWrapper>
    );
  }
};

const InitiationFooter = () => {
  return (    
    <PanelFooter css={css`height:auto;`}>
      <Countdown
        date='2021-10-31T01:02:03'
        renderer={countdownRenderer}
      />
    </PanelFooter>
  )
}

export default InitiationFooter;
