import { css } from '@emotion/react';
import { HStack, Image } from '@chakra-ui/react';
import AppWindowOptimism from 'components/AppWindowOptimism';
import EventHeader from 'components/lunar_new_year/EventHeader';
import styled from '@emotion/styled';

const FireworksShow = styled.div`
  margin-top: -48px;
  display: flex;
  gap: 0;
  align-items: space-between;
  justify-content: center;
  height: 100%;
  img {
    max-height: 70vh;
  }
`;

const MintSuccess = () => {

  return(
    <AppWindowOptimism 
      requiresWalletConnection
      title="Success!" 
      background="#000 url(/images/lunar_new_year_2022/explosion_city-bg.png) center / contain repeat-x" 
      padBody={false}
      scrollable={true}
    >
      <EventHeader />
      <FireworksShow>
        <Image src="/images/lunar_new_year_2022/firecrackers.gif" alt="Fireworks" />
        <Image src="/images/lunar_new_year_2022/firecrackers.gif" alt="Fireworks" />
        <Image src="/images/lunar_new_year_2022/firecrackers.gif" alt="Fireworks" />
      </FireworksShow>
    </AppWindowOptimism>
  ); 
};

export default MintSuccess;
