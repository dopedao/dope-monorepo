import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { Select } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { zeroPad } from '../../src/utils';
import { HustlerIdToInitiate } from '../../src/HustlerInitiation';
import { getRandomNumber } from '../../src/utils';
import { useEffect } from 'react';
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
  const hustlerMintTime = new Date(2021, 10, 4, 12);
  const currentTime = new Date();

  const { chainId } = useWeb3React();
  const onTestNetOrAfterLaunch = chainId == 4 || currentTime >= hustlerMintTime;

  if (onTestNetOrAfterLaunch) {
    return <InitiationFooterDopeContent />;
  } else {
    // Render random hustler as countdown approached
    useEffect(() => {
      const randomHustlerRender = setInterval(() => {
        HustlerIdToInitiate(getRandomNumber(1,8000).toString());
      }, 6000);
      return () => clearInterval(randomHustlerRender);
    });
    return <Countdown date={hustlerMintTime} renderer={countdownRenderer} />;
  }
};

export default InitiationFooter;
