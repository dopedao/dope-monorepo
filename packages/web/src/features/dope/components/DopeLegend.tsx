import { css } from '@emotion/react';
import { Button } from '@chakra-ui/button';
import styled from '@emotion/styled';

export const DopeLegendBackgroundColors = {
  black_market: 'rgba(255,252,63,0.5)',
  custom: 'rgba(254,101,33,0.15)',
  rare: 'rgba(46,130,255,0.15)',
  common: 'rgba(18,171,23,0.0)',
};

const DopeLegendLabels = {
  black_market: 'Black Market',
  common: 'Common',
  custom: 'Custom',
  rare: 'Rare',
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
      <div
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
            {DopeLegendLabels[key as 'black_market' | 'common' | 'custom' | 'rare']}
          </DopeLegendItem>
        ))}
      </div>
      <div
        css={css`
          text-align: right;
          padding: 8px;
        `}
      >
        <Button onClick={() => toggleVisibility()}>Close</Button>
      </div>
    </DopeLegendContainer>
  );
};
export default DopeLegend;
