import { css } from "@emotion/react";
import { Image } from "@chakra-ui/react";
import { media } from "ui/styles/mixins";
import RoadmapItem from 'features/about/components/RoadmapItem';
import styled from "@emotion/styled";

const Container = styled.div`
  background: var(--gray-800);
  width: 100%;
  color: var(--gray-00);
  h2,
  h3,
  h4 {
    font-weight: 600;
    padding: 0px 32px;
  }
  h2 {
    font-size: var(--text-04) !important;
    text-transform: uppercase;
  }
  * { 
    // font-family: Courier, monospace !important; 
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TunnelEntrance = styled.div`
  position: relative;
  background: #353338 url(/images/about/roadmap-entrance.png) center / 800px 235px no-repeat;
  height: 235px;
  width: 100%;
  padding: 32px;
  h2 {
    margin: auto;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
    top: 15%;
    width: 90%;
    ${media.tablet`
      width: 66%;
    `}
  }
`;


const Road = styled.div`
  background: #878E8E url(/images/about/roadmap-tile.png) center / 800px 324px repeat-y;
  min-height: 200px;
  padding: 32px 0px;
`;

const ContentRoadmap = () => (
  <Container>
    <TunnelEntrance>
      <h2>
        <Image 
          src="/images/masthead/roadmap.svg" 
          alt="Roadmap"
        />
      </h2>
    </TunnelEntrance>
    <Road>
      <RoadmapItem
        title="DOPE NFT"
        imageUrl="/images/about/dope-nft-1.svg"
        imageAlt="Dope NFT #1"
        date="Q3 2021"
      />
      <RoadmapItem
        title="$PAPER"
        imageUrl="/images/about/PAPER_front.png"
        imageAlt="$PAPER ERC20 Token"
        date="Q3 2021"
      />
      
    </Road>
  </Container>
);
export default ContentRoadmap;
