import { css } from '@emotion/react';
import { useState } from 'react';
import LootCardFooterForOwner from './LootCardFooterForOwner';
import LootCardFooterForMarket from './LootCardFooterForMarket';
import LootCardBody from './LootCardBody';
import LootLegend from './LootLegend';
import styled from '@emotion/styled';
import { PickedBag } from '../../src/DopeDatabase';

const LootCardContainer = styled.div`
  border: 2px solid #000;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  &.collapsed {
    max-height: 225px;
    .lootCardBody {
      overflow-y: hidden;
    }
  }
`;
const LootTitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 32px;
  background: #dededd;
  border-bottom: 2px solid #000;
  box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25);
  font-size: var(--text-00);
  position: 'sticky';
`;
const LootFooterContainer = styled.div`
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
  bag: PickedBag;
  isExpanded?: boolean;
  showCollapse?: boolean;
}

const LootCard = ({
  footer,
  bag,
  isExpanded: isExpandedProp = true,
  showCollapse = false,
}: Props) => {
  const [isItemLegendVisible, setIsItemLegendVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(isExpandedProp);

  const toggleItemLegendVisibility = (): void => {
    setIsItemLegendVisible(!isItemLegendVisible);
  };

  const ToggleButton = () => {
    const iconPath = '/images/icon';
    const icon = isExpanded ? 'collapse' : 'expand';
    return (
      <div
        css={css`
          width: 32px;
          height: 32px;
          cursor: pointer;
          cursor: hand;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <img src={`${iconPath}/${icon}.svg`} onClick={() => setIsExpanded(!isExpanded)} />
      </div>
    );
  };

  return (
    <>
      {isItemLegendVisible && (
        <LootLegend key={`loot-legend_${bag.id}`} toggleVisibility={toggleItemLegendVisibility} />
      )}
      {!isItemLegendVisible && (
        <LootCardContainer
          className={`lootCard ${isExpanded ? '' : 'collapsed'}`}
          key={`loot-card_${bag.id}`}
        >
          <LootTitleBar>
            <div
              css={css`
                width: 32px;
              `}
            ></div>
            <div>Dope Wars Loot #{bag.id}</div>
            <div
              css={css`
                width: 32px;
              `}
            >
              {showCollapse && <ToggleButton />}
            </div>
          </LootTitleBar>
          <LootCardBody bag={bag} />
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
