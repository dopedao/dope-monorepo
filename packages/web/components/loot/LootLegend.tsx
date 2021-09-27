import { css } from '@emotion/react';
import { Button } from '@chakra-ui/button';
import styled from '@emotion/styled';

export const LootLegendBackgroundColors = {
  Standard: '#fff',
  Basic: '#fff',
  Rare: 'rgba(18,171,23,0.15)',
  Foreign: 'rgba(46,130,255,0.15)',
  Custom: 'rgba(254,101,33,0.15)',
  Vintage: 'rgba(249,40,255,0.25)',
  'Black Market': 'rgba(255,252,63,0.5)',
};

const LootLegendContainer = styled.div`
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

const LootLegendItem = styled.div`
  color: #000;
  padding: 8px;
  margin: 16px 0px;
`;

interface Props {
  toggleVisibility(): void;
}

const LootLegend = ({ toggleVisibility }: Props) => {
  return (
    <LootLegendContainer>
      <h4>Item Rarity Legend</h4>
      <div
        css={css`
          flex-grow: 1;
          padding: 8px 16px;
        `}
      >
        {Object.entries(LootLegendBackgroundColors)
          .map(([key, value]) => {
            return (
              <LootLegendItem
                css={css`
                  background-color: ${value};
                `}
                key={key}
              >
                {key}
              </LootLegendItem>
            );
          })
          .reverse()
          .slice(0, -1)}
      </div>
      <div
        css={css`
          text-align: right;
          padding: 8px;
        `}
      >
        <Button onClick={() => toggleVisibility()}>Close</Button>
      </div>
    </LootLegendContainer>
  );
};
export default LootLegend;
