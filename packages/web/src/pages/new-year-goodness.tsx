import { Button, Image } from '@chakra-ui/react';
import { css } from '@emotion/react';
import BoostPanel from 'components/panels/BoostPanel';
import DesktopWindow from "components/DesktopWindow";
import HongbaoPanel from 'components/panels/HongbaoPanel';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import styled from '@emotion/styled';

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
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 16px;
  h3 {
    padding-bottom: 4px;
    border-bottom: 2px solid var(--gray-00);
    margin-bottom: .5em;
  }
`;

const LunarNewYear = () => {

  return(
    <DesktopWindow title="I Hope You Get Rich" background="#FF6464">
      <EventContainer>
        <EventHeader>
          {lanternImg}
          <h2>Year Of The Tiger Celebration</h2>
          {lanternImg}
        </EventHeader>
        <StackedResponsiveContainer css={css`padding-bottom:0 !important; padding-top: 0px !important`}>
          <HongbaoPanel />
          <PanelContainer>
            <PanelBody>
              <h3>
                Free airdrop for all hustlers
              </h3>
              <div css={css`display:flex;align-items:center;justify-content:center`}>
                <Image src="/images/lunar_new_year_2022/free_accessories.png" alt="Free Airdrop Accessories" css={css`width:80%`} />
              </div>
              <p>
                To celebrate Year of the Tiger, we're giving every Hustler who claimed gear by January 31st a special accessory airdrop.
              </p>

              <p>
                Claiming only requires minimal gas fees on the Optimism network. You will randomly receive a celebratory accessory or if you're lucky, some $PAPER!
              </p>
            </PanelBody>
          </PanelContainer>
        </StackedResponsiveContainer>

        <StackedResponsiveContainer css={css`padding-top:0 !important;`}>
          <BoostPanel />
          <PanelContainer>
            <PanelBody>
              <h3>
                New RARE accessories for your Hustler
              </h3>
              <p>
                In addition to the gifts above, we're launching a celebratory mask drop. From Feb. 1st – Feb. 15th, 2022 you can purchase a Tiger Mask for 5000 $PAPER and try your luck at a chance to win more rare masks!
              </p>
              <Image src="/images/lunar_new_year_2022/walking_hustlers.png" alt="Walking Hustlers with Dragon" />
              <h3>Mask boost lotto</h3>
              <p>
                <em>Boost 0.1eth for a chance to receive a random zodiac mask.</em> You could receive a rare Tiger Mask, or a super rare Golden Tiger Mask.
              </p>
              <p>
                Each 0.1eth boost increases your odds by 10%. Spend 1 eth for a guaranteed Golden Tiger Mask.
              </p>
            </PanelBody>
          </PanelContainer>
        </StackedResponsiveContainer>
      </EventContainer>
    </DesktopWindow>
  ); 
};

export default LunarNewYear;
