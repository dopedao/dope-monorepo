import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { GetStaticProps } from 'next';
import { useWeb3React } from '@web3-react/core';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

import Head from '../components/head';
import ConnectWallet from '../components/ConnectWallet';
import { PageWrapper } from '../styles/components';

import { FetchStaticData, MediaFetchAgent, NetworkIDs } from '@zoralabs/nft-hooks';

import CheckIcon from '../components/icons/Check';
import Loot from '../components/Loot';

const Centered = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledTable = styled(Table)`
  width: 380px;
  margin-right: 32px;
`;

const DopeTable = ({ data }: { data: { id: string; unbundled: boolean; claimed: boolean }[] }) => (
  <StyledTable variant="dope">
    <Thead>
      <Tr>
        <Th>Dope ID</Th>
        <Th>Has Items</Th>
        <Th>Has Paper</Th>
      </Tr>
    </Thead>
    <Tbody>
      {data.map(({ id, unbundled, claimed }) => (
        <Tr key={id}>
          <Td>{id}</Td>
          <Td>
            {unbundled ? (
              <Centered>
                <CheckIcon />
              </Centered>
            ) : null}
          </Td>
          <Td>
            {claimed ? (
              <Centered>
                <CheckIcon />
              </Centered>
            ) : null}
          </Td>
        </Tr>
      ))}
    </Tbody>
  </StyledTable>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

export default function Home() {
  const { account } = useWeb3React();

  return (
    <IndexWrapper>
      <Head />
      {account ? (
        <Container>
          <DopeTable
            data={[
              {
                id: '4936',
                unbundled: true,
                claimed: false,
              },
            ]}
          />
          <Loot />
        </Container>
      ) : (
        <ConnectWallet />
      )}
    </IndexWrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fetchAgent = new MediaFetchAgent(process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs);
  const tokens = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
    curatorAddress: process.env.NEXT_PUBLIC_CURATORS_ID as string,
    collectionAddress: process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS as string,
    limit: 100,
    offset: 0,
  });

  return {
    props: {
      tokens,
    },
    revalidate: 60,
  };
};

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;
