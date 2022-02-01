import { css } from '@emotion/react';
import { Image } from '@chakra-ui/react';
import AppWindowOptimism from 'components/AppWindowOptimism';
import EventHeader from 'components/lunar_new_year/EventHeader';
import styled from '@emotion/styled';
import PanelContainer from 'components/PanelContainer';
import PanelTitleHeader from 'components/PanelTitleHeader';
import PanelBody from 'components/PanelBody';

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
const LogoContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  top: 60%;
  left: 50%;
  width: 90%;
  transform: translate(-50%, -100%);
  img {
    margin: auto;
    width: 66%;
  }
  @keyframes scroll-in {
    0% {
      top: 0;
      opacity: 1;
    }
    100% {
      top: 60%;
      opacity: 1;
    }
  }
  animation: scroll-in 5s linear 0s;
`;
const MessageContainer = styled.div`
  display: none;
  color: white;
  padding: 32px 64px;
  margin: 32px 25%;
  background-color: rgba(0,0,0,0.5);
  visibility: visible;
  // @keyframes appear {
  //   0% {
  //     visibility: hidden;
  //   }
  //   100% {
  //     visibility: visible;
  //   }
  // }
  // animation: appear 5s linear 5s;
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
      <div css={css`display:flex;width:100%;flex-direction:column;`}>
        <EventHeader />
        <MessageContainer>
          <h4>Thank you</h4>
          <p>
            …
          </p>
        </MessageContainer>
      </div>
      <LogoContainer>
        <Image src="/images/Logo-Gold.png" alt="Dope Wars" />
      </LogoContainer>
      <FireworksShow>
        <Image src="/images/lunar_new_year_2022/firecrackers.gif" alt="Fireworks" />
        <Image src="/images/lunar_new_year_2022/firecrackers.gif" alt="Fireworks" />
        <Image src="/images/lunar_new_year_2022/firecrackers.gif" alt="Fireworks" />
      </FireworksShow>
    </AppWindowOptimism>
  ); 
};

export default MintSuccess;
