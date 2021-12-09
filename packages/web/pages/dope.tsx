import { useState } from 'react';
import { useWalletQuery } from 'src/generated/graphql';
import { useWeb3React } from '@web3-react/core';
import styled from '@emotion/styled';
import { media } from 'styles/mixins';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import LoadingBlock from 'components/LoadingBlock';
import DopeCard from 'components/dope/DopeCard';
import DopeTable from 'components/dope/DopeTable';
import NoDopeCard from 'components/dope/NoDopeCard';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import { useSwitchEthereum } from 'hooks/web3';

const FlexFiftyContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  // Mobile screens stack, 16px gap
  flex-flow: column nowrap;
  gap: 16px;
  // Makes containers stack on one full screen – no scroll
  & > div {
    flex: 1;
    overflow-y: auto;
  }
  & > div:last-child {
    flex: 2;
  }
  // Screen > Tablet display items side by side
  ${media.tablet`
  & > div {
    flex: 1;
    overflow-y: auto;
  }
  flex-flow: row nowrap;
    & > div:last-child {
      flex: 1;
    } 
  `}
`;

export default function DopeWindow() {
  const { account, chainId } = useWeb3React();
  const { data, loading } = useWalletQuery({
    variables: { id: account?.toLowerCase() || '' },
    skip: !account,
  });
  useSwitchEthereum();
  const [selected, setSelected] = useState(0);

  return (
    <AppWindow requiresWalletConnection={true} navbar={<DopeWarsExeNav />}>
      <Head />
      {loading ? (
        <FlexFiftyContainer>
          <LoadingBlock />
          <LoadingBlock />
        </FlexFiftyContainer>
      ) : !data?.wallet?.bags || data.wallet.bags.length === 0 ? (
        <NoDopeCard />
      ) : (
        <FlexFiftyContainer>
          <DopeTable
            data={data.wallet.bags.map(({ opened, claimed, id, rank }) => ({
              opened,
              claimed,
              id,
              rank,
            }))}
            selected={selected}
            onSelect={setSelected}
          />
          <DopeCard bag={data.wallet.bags[selected]} footer="for-owner" />
        </FlexFiftyContainer>
      )}
    </AppWindow>
  );
}
