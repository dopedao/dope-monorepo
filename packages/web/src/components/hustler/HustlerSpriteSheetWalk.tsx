import styled from '@emotion/styled';

const HustlerSpriteSheetWalk = styled.div<{ id?: string }>`
  height: 256px;
  width: 128px;
  background: url('https://api.dopewars.gg/hustlers/${({ id }) => id}/sprites/composite.png');
  background-size: 1140px;
  background-position: 0px 0px;
  image-rendering: pixelated;
  @keyframes sprite {
    0% {
      background-position: 0px 0px;
    }
    100% {
      background-position: 1140px 0px;
    }
  }
  animation-name: sprite;
  animation-duration: 0.8s;
  animation-timing-function: steps(8);
  animation-iteration-count: infinite;
`;
export default HustlerSpriteSheetWalk;
