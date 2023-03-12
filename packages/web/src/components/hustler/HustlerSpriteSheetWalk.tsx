import styled from '@emotion/styled';
import { API_URI } from 'utils/constants';

const imageWidth = 960;
const imageHeight = 480;
const numFrames = 8;
const sizeMultiplier = 5;
const frameWidth = (imageWidth / 16) * sizeMultiplier;
const frameHeight = (imageHeight / 8) * sizeMultiplier;

// Standalone hustler animation test

const HustlerSpriteSheetWalk = styled.div<{ id?: string }>`
  width: ${frameWidth}px;
  height: ${frameHeight}px;
  background: url('${API_URI[1]}/hustlers/${({ id }) => id}/sprites/composite.png');
  // 800% width so we see the first 8 frames
  background-size: auto 800%;
  image-rendering: pixelated;
  // Slide in image from the left for 8 frames
  @keyframes walk {
    from {
      background-position: 0 0;
    }
    to {
      background-position: ${-frameWidth * numFrames}px 0;
    }
  }
  animation-name: walk;
  animation: walk 1s steps(${numFrames}) infinite;
`;
export default HustlerSpriteSheetWalk;
