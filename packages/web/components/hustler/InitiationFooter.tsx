import { css } from '@emotion/react';
import { Button } from '@chakra-ui/button';
import PanelFooter from '../PanelFooter';
import styled from '@emotion/styled';
// https://github.com/ndresx/react-countdown
import Countdown from 'react-countdown';
import Link from 'next/link';

const hasDopeNft = false;

const NoDopeMessage = () => {
  return <>
    <div css={css`text-align:center;padding:16px;`}>
      <p>** NO DOPE IN WALLET **</p>
      <Link href="/swap-meet?status=For+Sale&sort_by=Most+Affordable">
        <Button variant='primary'>Shop for DOPE NFTs</Button>
      </Link>
    </div>
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
  completed = true;
  if (completed) {
    if (hasDopeNft) {
      return <MintHustlerControls />;    
    } else {
      return <NoDopeMessage />;
    }
  } else {
    const d = <span className="dots">:</span>;
    return (
      <CountdownWrapper>
        {zeroPad(days)}
        {d}
        {zeroPad(hours)}
        {d}
        {zeroPad(minutes)}
        {d}
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
