import { Bag } from '../../src/generated/graphql';
import { useState } from 'react';
import LootCardFooterForOwner from './LootCardFooterForOwner';
import LootCardFooterForMarket from './LootCardFooterForMarket';
import LootCardRows from './LootCardRows';
import LootLegend from './LootLegend';
import styled from '@emotion/styled';

const LootCardContainer = styled.div`
  border: 2px solid #000;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;
const LootTitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 32px;
  background: #dededd;
  border-bottom: 2px solid #000;
  box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25);
  font-size: var(--text-00);
  position: 'sticky';
`;
const LootFooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  background: #dededd;
  border-top: 2px solid #000;
  padding: 0 8px;
  div {
    flex-grow: 1;
  }
  * > button {
    margin-right: 10px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

interface Props {
  footer: 'for-marketplace' | 'for-owner';
  bag: Pick<
    Bag,
    | 'id'
    | 'clothes'
    | 'drugs'
    | 'foot'
    | 'hand'
    | 'neck'
    | 'ring'
    | 'vehicle'
    | 'waist'
    | 'weapon'
    | 'claimed'
  >;
}

const LootCard = ({ footer, bag }: Props) => {
  const [isItemLegendVisible, setIsItemLegendVisible] = useState(false);

  const toggleItemLegendVisibility = (): void => {
    setIsItemLegendVisible(!isItemLegendVisible);
  };

  return (
    <>
      {isItemLegendVisible && (
        <LootLegend key={`loot-legend_${bag.id}`} toggleVisibility={toggleItemLegendVisibility} />
      )}
      {!isItemLegendVisible && (
        <LootCardContainer className="lootCard" key={`loot-card_${bag.id}`}>
          <LootTitleBar>
            <div>Dope Wars Loot #{bag.id}</div>
          </LootTitleBar>
          <LootCardRows bag={bag} />
          {footer && footer === 'for-owner' && (
            <LootFooterContainer>
              <LootCardFooterForOwner bag={bag} toggleVisibility={toggleItemLegendVisibility} />
            </LootFooterContainer>
          )}
          {footer && footer === 'for-marketplace' && (
            <LootFooterContainer>
              <LootCardFooterForMarket bag={bag} />
            </LootFooterContainer>
          )}
        </LootCardContainer>
      )}
    </>
  );
};

export default LootCard;
