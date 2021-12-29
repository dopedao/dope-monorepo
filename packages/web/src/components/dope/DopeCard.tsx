/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { css } from '@emotion/react';
import DopeCardBody from 'components/dope/DopeCardBody';
// import DopeCardFooterForMarket from 'components/dope/DopeCardFooterForMarket';
import DopeCardFooterForOwner from 'components/dope/DopeCardFooterForOwner';
import DopeLegend from 'components/dope/DopeLegend';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleBarFlex from 'components/PanelTitleBarFlex';
import { ItemTier, ItemType } from 'generated/graphql';

export type DopeCardProps = {
  footer: 'for-marketplace' | 'for-owner';
  dope: {
    __typename?: 'Dope';
    id: string;
    claimed: boolean;
    opened: boolean;
    score: number;
    rank: number;
    items?: {
      __typename?: 'Item';
      id: string;
      type: ItemType;
      name: string;
      namePrefix?: string | null | undefined;
      nameSuffix?: string | null | undefined;
      suffix?: string | null | undefined;
      augmented?: boolean | null | undefined;
      tier: ItemTier;
      greatness: number;
      count: number;
    }[];
  };
  isExpanded?: boolean;
  showCollapse?: boolean;
};

const DopeCard = ({
  footer,
  dope,
  isExpanded: isExpandedProp = true,
  showCollapse = false,
}: DopeCardProps) => {
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
        <DopeLegend key={`dope-legend_${dope.id}`} toggleVisibility={toggleItemLegendVisibility} />
      )}
      {!isItemLegendVisible && (
        <PanelContainer
          key={`dope-card_${dope.id}`}
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
            <div>DOPE #{dope.id}</div>
            <div
              css={css`
                width: 32px;
              `}
            >
              {showCollapse && <ToggleButton />}
            </div>
          </PanelTitleBarFlex>
          <DopeCardBody dope={dope} />
          {footer && footer === 'for-owner' && (
            <PanelFooter>
              <DopeCardFooterForOwner dope={dope} toggleVisibility={toggleItemLegendVisibility} />
            </PanelFooter>
          )}
          {/* {footer && footer === 'for-marketplace' && (
            <PanelFooter>
              <DopeCardFooterForMarket dope={dope} />
            </PanelFooter>
          )} */}
        </PanelContainer>
      )}
    </>
  );
};

export default DopeCard;
