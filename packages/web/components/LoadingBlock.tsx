// Use as interstitial loading state in data screens.
//
// Produces random looking data table of various lengths
// that pulses to indicate a loading state.
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getRandomNumber } from '../src/utils';

const Container = styled.div`
  height: 100%;
  flex-direction: column;
  & > div {
    background-color: #000;
    opacity: 0.1;
    height: 32px;
    margin-bottom: 8px;
    float: left;
    clear: both;
    @keyframes pulse {
      0% {
        opacity: 0.25;
        width: 10%;
      }
      25% {
        opacity: 0.225;
        width: 50%;
      }
      50% {
        opacity: 0.3;
        width: 50%;
      }
      75% {
        opacity: 0.4;
        width: 60%;
      }
      100% {
        opacity: 0.75;
        width: 90%;
      }
    }
    animation: pulse 0.75s steps(4, end) 0s infinite;
  }
`;

const LoadingBlock = ({ maxRows = 20 }: { maxRows?: number }) => {
  const randomRowLength = getRandomNumber(2, maxRows);
  const rows = [];
  for (let i = 0; i < randomRowLength; i++) {
    rows.push(
      <div
        key={`loading-row-${i}`}
        css={css`
          animation-duration: ${getRandomNumber(5, 10) / 10}s !important;
        `}
      ></div>,
    );
  }

  return <Container>{rows}</Container>;
};
export default LoadingBlock;
