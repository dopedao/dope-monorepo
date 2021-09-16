import styled from '@emotion/styled';
import { useWeb3React } from '@web3-react/core';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

import { useWalletQuery } from '../src/generated/graphql';

import Head from '../components/head';
import ClientOnly from '../components/ClientOnly';
import ConnectWallet from '../components/ConnectWallet';
import { PageWrapper } from '../styles/components';
import CheckIcon from '../components/icons/Check';
import Loot from '../components/Loot';

const Centered = styled.div`
  display: flex;
  justify-content: center;
`;

const DopeTable = ({
  className = '',
  data,
}: {
  className: string;
  data: { id: string; unbundled: boolean; claimed: boolean }[];
}) => (
  <div className={className}>
    <Table variant="dope">
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
    </Table>
  </div>
);

const StyledDopeTable = styled(DopeTable)`
  height: 640px;
  width: 380px;
  margin-right: 32px;
  border: 2px solid #000;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const Authenticated = ({ id }: { id: string }) => {
  const { data, error, loading } = useWalletQuery({ variables: { id: id.toLowerCase() } });

  return (
    <Container>
      <StyledDopeTable
        data={
          data?.wallet
            ? data?.wallet?.bags.map(({ id }) => ({
                id,
                unbundled: false,
                claimed: false,
              }))
            : []
        }
      />
      <Loot />
    </Container>
  );
};

export default function Home() {
  const { account } = useWeb3React();
  return (
    <IndexWrapper>
      <Head />
      <ClientOnly>{account ? <Authenticated id={account} /> : <ConnectWallet />}</ClientOnly>
    </IndexWrapper>
  );
}

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;
