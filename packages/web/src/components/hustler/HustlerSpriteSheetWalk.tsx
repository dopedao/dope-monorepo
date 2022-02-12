import styled from '@emotion/styled';

const backgroundSize = 2400;
const frameWidth = backgroundSize/16;
const frameHeight = backgroundSize/8;

// Standalone hustler animation test

const HustlerSpriteSheetWalk = styled.div<{ id?: string }>`
  width: ${frameWidth}px;
  height: ${frameHeight}px;
  background: url('https://api.dopewars.gg/hustlers/${({ id }) => id}/sprites/composite.png');
  background-size: auto 800%;
  image-rendering: pixelated;
  @keyframes walk {
    0% {
      background-position: ${-(backgroundSize/2)}px 0;
    }
    100 % {
      background-position: 0 0;
    }
  }
  animation-name: walk;
  animation: walk 1s steps(8, start) infinite;
`;
export default HustlerSpriteSheetWalk;
