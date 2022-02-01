import { css } from '@emotion/react';
import { Image } from '@chakra-ui/react';
import AppWindowOptimism from 'components/AppWindowOptimism';
import EventHeader from 'components/lunar_new_year/EventHeader';
import styled from '@emotion/styled';

const FireworksShow = styled.div`
  position: absolute;
  z-index: 0;
  top: 15%;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 0;
  align-items: space-between;
  justify-content: center;
  img {
    max-height: 70vh;
  }
  @keyframes disappear {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  animation: disappear 1s forwards 5.5s;
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
    99% {
      top: 60%;
      opacity: 1;
    }
    100% {
      top: 60%;
      opacity: 0;
    }
  }
  animation: scroll-in 5.2s linear forwards 0s;
`;
const MessageContainer = styled.div`
  color: white;
  padding: 32px 64px;
  margin: 32px 25%;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: appear 1s forwards 5.5s;
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
