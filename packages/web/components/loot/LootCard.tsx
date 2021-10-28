import { css } from '@emotion/react';
import { PickedBag } from '../../src/DopeDatabase';
import { useState } from 'react';
import LootCardBody from './LootCardBody';
import LootCardFooterForMarket from './LootCardFooterForMarket';
import LootCardFooterForOwner from './LootCardFooterForOwner';
import LootLegend from './LootLegend';
import PanelContainer from '../PanelContainer';
import PanelFooter from '../PanelFooter';
import PanelTitleBarFlex from '../PanelTitleBarFlex';

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
        <PanelContainer
          key={`loot-card_${bag.id}`}
          className={`lootCard ${isExpanded ? '' : 'collapsed'}`}
          css={css`
            display: flex;
            flex-direction: column;
            &.collapsed {
              max-height: 225px;
              .lootCardBody {
                overflow-y: hidden;
              }
            }
          `}
        >
          <PanelTitleBarFlex>
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
          </PanelTitleBarFlex>
          <LootCardBody bag={bag} />
          {footer && footer === 'for-owner' && (
            <PanelFooter>
              <LootCardFooterForOwner bag={bag} toggleVisibility={toggleItemLegendVisibility} />
            </PanelFooter>
          )}
          {footer && footer === 'for-marketplace' && (
            <PanelFooter>
              <LootCardFooterForMarket bag={bag} />
            </PanelFooter>
          )}
        </PanelContainer>
      )}
    </>
  );
};

export default LootCard;
