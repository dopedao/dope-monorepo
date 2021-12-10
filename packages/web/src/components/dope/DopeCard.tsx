/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { css } from '@emotion/react';
import { PickedBag } from 'utils/DopeDatabase';
import DopeCardBody from 'components/dope/DopeCardBody';
import DopeCardFooterForMarket from 'components/dope/DopeCardFooterForMarket';
import DopeCardFooterForOwner from 'components/dope/DopeCardFooterForOwner';
import DopeLegend from 'components/dope/DopeLegend';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleBarFlex from 'components/PanelTitleBarFlex';

interface Props {
  footer: 'for-marketplace' | 'for-owner';
  bag: PickedBag;
  isExpanded?: boolean;
  showCollapse?: boolean;
}

const DopeCard = ({
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
        <img src={`${iconPath}/${icon}.svg`} alt="" onClick={() => setIsExpanded(!isExpanded)} />
      </div>
    );
  };

  return (
    <>
      {isItemLegendVisible && (
        <DopeLegend key={`dope-legend_${bag.id}`} toggleVisibility={toggleItemLegendVisibility} />
      )}
      {!isItemLegendVisible && (
        <PanelContainer
          key={`dope-card_${bag.id}`}
          className={`dopeCard ${isExpanded ? '' : 'collapsed'}`}
          css={css`
            &.collapsed {
              max-height: 225px;
              .dopeCardBody {
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
            <div>DOPE #{bag.id}</div>
            <div
              css={css`
                width: 32px;
              `}
            >
              {showCollapse && <ToggleButton />}
            </div>
          </PanelTitleBarFlex>
          <DopeCardBody bag={bag} />
          {footer && footer === 'for-owner' && (
            <PanelFooter>
              <DopeCardFooterForOwner bag={bag} toggleVisibility={toggleItemLegendVisibility} />
            </PanelFooter>
          )}
          {footer && footer === 'for-marketplace' && (
            <PanelFooter>
              <DopeCardFooterForMarket bag={bag} />
            </PanelFooter>
          )}
        </PanelContainer>
      )}
    </>
  );
};

export default DopeCard;
