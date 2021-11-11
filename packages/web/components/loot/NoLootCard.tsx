// Blank-slate state for the Loot screen,
// encouraging visitors to go pick up some DOPE.
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from '@emotion/styled';

const NoLootContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #202222;
  background: linear-gradient(#202222 66%, #1c1c1c);
  border: 2px solid #000000;
  display: flex;
  flex-direction: column;
  & > div {
    flex-basis: 1;
  }
`;

const NoLootTitle = styled.div`
  text-align: center;
  background-color: #000000;
  color: #ffffff;
  height: 32px;
  line-height: 32px;
`;

const NoLootHustler = styled.div`
  flex-grow: 2;
  background: url('/images/tile/chainlink.png') repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  img {
    opacity: 0.5;
  }
`;

const NoLootCard = () => {
  const router = useRouter();
  return (
    <NoLootContainer>
      <NoLootTitle>No Loot In Connected Wallet</NoLootTitle>
      <NoLootHustler>
        <Image src="/images/hustler/no-loot.svg" alt="no loot" width={112} height={350} />
        <Button variant="primary" onClick={() => router.push('/swap-meet')}>
          Shop The Market
        </Button>
      </NoLootHustler>
    </NoLootContainer>
  );
};

export default NoLootCard;
