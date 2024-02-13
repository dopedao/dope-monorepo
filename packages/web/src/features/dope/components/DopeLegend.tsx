import { css } from '@emotion/react';
import { Button } from '@chakra-ui/button';
import styled from '@emotion/styled';
import { Box } from '@chakra-ui/react';

export const DopeLegendColors = {
  BLACK_MARKET: 'rgba(255,252,63)',
  CUSTOM: 'rgba(254,101,33)',
  RARE: 'rgba(46,130,255)',
  COMMON: 'rgba(255,255,255)',
};

export const DopeLegendBackgroundColors = {
  BLACK_MARKET: 'rgba(255,252,63,0.5)',
  CUSTOM: 'rgba(254,101,33,0.15)',
  RARE: 'rgba(46,130,255,0.15)',
  COMMON: 'rgba(18,171,23,0.0)',
};

const DopeLegendLabels = {
  BLACK_MARKET: 'Black Market',
  COMMON: 'Common',
  CUSTOM: 'Custom',
  RARE: 'Rare',
};

const DopeLegendContainer = styled.div`
  background: #fff;
  display: flex;
  flex-flow: column wrap;
  // padding: 8px 16px;
  border: 2px solid #000;
  h4 {
    border-bottom: 1px solid #eee;
    padding-bottom: 4px;
    text-align: center;
    font-size: var(--text-00);
    padding: 8px;
  }
`;

const DopeLegendItem = styled.div`
  color: #000;
  padding: 8px;
  margin: 16px 0px;
`;

type DopeLegendProps = {
  toggleVisibility: () => void;
};

const DopeLegend = ({ toggleVisibility }: DopeLegendProps) => {
  return (
    <DopeLegendContainer>
      <h4>Item Rarity Legend</h4>
      <Box
        css={css`
          flex-grow: 1;
          padding: 8px 16px;
        `}
      >
        {Object.entries(DopeLegendBackgroundColors).map(([key, value]) => (
          <DopeLegendItem
            css={css`
              background-color: ${value};
            `}
            key={key}
          >
            {DopeLegendLabels[key as 'BLACK_MARKET' | 'COMMON' | 'CUSTOM' | 'RARE']}
          </DopeLegendItem>
        ))}
      </Box>
      <Box
        css={css`
          text-align: right;
          padding: 8px;
        `}
      >
        <Button onClick={() => toggleVisibility()}>Close</Button>
      </Box>
    </DopeLegendContainer>
  );
};
export default DopeLegend;
