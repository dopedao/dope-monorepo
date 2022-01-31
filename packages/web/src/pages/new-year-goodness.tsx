import { Button, Image } from '@chakra-ui/react';
import { css } from '@emotion/react';
import BoostPanel from 'components/BoostPanel';
import PanelFooter from 'components/PanelFooter';
import DesktopWindow from "components/DesktopWindow";
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

const LunarNewYear = () => {

  return(
    <DesktopWindow title="I Hope You Get Rich" background="#FF6464">
      <EventHeader>
        {lanternImg}
        <h2>Year Of The Tiger Celebration</h2>
        {lanternImg}
      </EventHeader>
      <StackedResponsiveContainer>
        <BoostPanel />
        <PanelContainer>
          <PanelBody>
            One way we could gamify this is by only allowing each address to choose…either pay for a boost, or open the airdrop. One time only. Thoughts? (Play with the UX)
          </PanelBody>
        </PanelContainer>
      </StackedResponsiveContainer>
    </DesktopWindow>
  ); 
};

export default LunarNewYear;
