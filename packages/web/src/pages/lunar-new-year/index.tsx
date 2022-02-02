import { Button, Image } from '@chakra-ui/react';
import { css } from '@emotion/react';
import AppWindowOptimism from 'components/AppWindowOptimism';
import MaskBoostPanel from 'components/lunar_new_year/MaskBoostPanel';
import HongbaoPanel from 'components/lunar_new_year/HongbaoPanel';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import styled from '@emotion/styled';
import PanelTitleHeader from 'components/PanelTitleHeader';
import Fireworks from 'components/lunar_new_year/Fireworks';

const lanternImg = (
  <Image 
    src="/images/lunar_new_year_2022/pixel-lantern.png" 
    alt="Lantern" 
  />
);

const EventHeader = styled.div`
  padding: 0px 32px;
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(224,37,20,0.95);
  h2 {
    color: white;
    text-align: center;
    // Offset padding-bottom on containing div
    padding-top: 24px;
  }
`;

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  h4 {
    padding-bottom: 4px;
    border-bottom: 2px solid var(--gray-00);
    margin-bottom: .5em;
  }
`;

const LunarNewYear = () => {

  return(
    <AppWindowOptimism 
      requiresWalletConnection
      title="I Hope You Get Rich" 
      background="#FF6464" 
      padBody={false}
      scrollable={true}
    >
      <Fireworks />
      <EventContainer>
        <EventHeader>
          {lanternImg}
          <h2>Year Of The Tiger Celebration</h2>
          {lanternImg}
        </EventHeader>
        <StackedResponsiveContainer css={css`padding-bottom:0 !important; padding-top: 0px !important`}>
          <HongbaoPanel />
          <PanelContainer justifyContent='flex-start'>
            <PanelTitleHeader>✨ Free airdrop for all Hustlers ✨</PanelTitleHeader>
            <PanelBody>
              <div css={css`display:flex;align-items:center;justify-content:center`}>
                <Image src="/images/lunar_new_year_2022/free_accessories.png" alt="Free Airdrop Accessories" css={css`width:80%`} />
              </div>
              <p>
                To celebrate Year of the Tiger we&apos;re giving every Hustler who claimed gear by January 31st a special accessory airdrop.
              </p>

              <p>
                Claiming only requires minimal gas fees on the Optimism network. You will randomly receive a celebratory accessory or if you&apos;re lucky, some $PAPER!
              </p>
            </PanelBody>
          </PanelContainer>
        </StackedResponsiveContainer>

        <StackedResponsiveContainer css={css`padding-top:0 !important;`}>
          <MaskBoostPanel />
          <PanelContainer justifyContent='flex-start'>
            <PanelTitleHeader>✨ Limited-edition, rare accessories ✨</PanelTitleHeader>
            <PanelBody>
              <p>
                In addition to the gifts above, we&apos;re launching a celebratory mask drop. From Feb. 1st – Feb. 15th, 2022 you can purchase a Tiger Mask for 5000 $PAPER and try your luck at a chance to win more rare masks!
              </p>
              <Image src="/images/lunar_new_year_2022/walking_hustlers.png" alt="Walking Hustlers with Dragon" />
              <h4>Mask boost lotto</h4>
              <p>
                <em>To participate in this special, one-time only drop you must bridge $PAPER and Ethereum to Optimism.</em> 
              </p>
              <p>
                Boost 0.1Ξ for a chance to receive a random zodiac mask. Each boost increases your odds by 10% to win a super rare Golden Tiger Mask. Spend 1Ξ for a guaranteed Golden Tiger Mask.
              </p>
              <p>
                <a className="cny" target="optimism" href="https://www.optimism.io/apps/bridges">Read more about Optimism bridges here…</a>
              </p>
            </PanelBody>
          </PanelContainer>
        </StackedResponsiveContainer>
      </EventContainer>
    </AppWindowOptimism>
  ); 
};

export default LunarNewYear;
