import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { Select } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import PanelFooter from '../PanelFooter';
import styled from '@emotion/styled';
// https://github.com/ndresx/react-countdown
import Countdown from 'react-countdown';
import Link from 'next/link';

const hasDopeNft = false;

const NoDopeMessage = () => {
  return (
    <PanelFooter css={css`height:auto;`}>
      <div css={css`text-align:center;padding:16px;`}>
        <p>** NO DOPE IN WALLET **</p>
        <Link href="/swap-meet?status=For+Sale&sort_by=Most+Affordable">
          <Button variant='primary'>Shop for DOPE NFTs</Button>
        </Link>
      </div>
    </PanelFooter>
  );
}

const SubPanelForm = styled.div`
  border-top: 1px solid black;
  background-color: #ffffff;
  select {
    border-bottom: 1px solid #DEDEDD;
  }
`;

const MintHustlerControls = () => {
  const [dopeToInitiate, setDopeToInitiate] = useState<string>('');

  const handleDopeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setDopeToInitiate(value);
    // statusCallback(value);
  };

  return <div>
    <SubPanelForm>
      <Select size="sm" variant="filterBar" onChange={handleDopeChange} value={dopeToInitiate}>
        <option disabled>UNBUNDLED DOPE</option>
        {/* {statusKeys.map(value => (
          <option>{value}</option>
        ))} */}
      </Select>
      <div css={css`
        display: flex;
        justify-content: space-between;
        padding: 8px 12px;
      `}>
        <Link href="/hustler/customize">
          <a className="primary">Customize Appearance</a>
        </Link>
        <Link href="/randomize">
          <a className="primary">Randomize</a>
        </Link>
      </div>
    </SubPanelForm>
    <PanelFooter>
      <div></div>
      <Button variant='primary'>Continue Initiation</Button>
    </PanelFooter>
  </div>
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
  // completed = true;
  if (completed) {
    if (hasDopeNft) {
      return <MintHustlerControls />;    
    } else {
      return <NoDopeMessage />;
    }
  } else {
    const d = <span className="dots">:</span>;
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
