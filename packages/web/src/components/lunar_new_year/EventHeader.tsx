import { Image } from '@chakra-ui/react';
import styled from '@emotion/styled';

const EventHeaderContainer = styled.div`
  position: relative;
  z-index: 2;
  padding: 0px 32px;
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(224, 37, 20, 0.95);
  h2 {
    color: white;
    text-align: center;
    // Offset padding-bottom on containing div
    padding-top: 24px;
  }
`;

const lanternImg = <Image src="/images/lunar_new_year_2022/pixel-lantern.png" alt="Lantern" />;

const EventHeader = () => (
  <EventHeaderContainer>
    {lanternImg}
    <h2>Year Of The Tiger Celebration</h2>
    {lanternImg}
  </EventHeaderContainer>
);

export default EventHeader;
