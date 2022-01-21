/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { css } from '@emotion/react';
import DopeCardBody from 'features/dope/components/DopeCardBody';
import DopeCardFooterForMarket from 'features/dope/components/DopeCardFooterForMarket';
import DopeCardFooterForOwner from 'features/dope/components/DopeCardFooterForOwner';
import DopeCardTitleCost from 'features/dope/components/DopeCardTitleCost';
import DopeLegend from 'features/dope/components/DopeLegend';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleBarFlex from 'components/PanelTitleBarFlex';
import { AmountType, ItemTier, ItemType } from 'generated/graphql';

const iconPath = '/images/icon';

export type DopeCardProps = {
  footer: 'for-marketplace' | 'for-owner';
  dope: {
    __typename?: 'Dope';
    id: string;
    claimed: boolean;
    opened: boolean;
    score: number;
    rank: number;
    lastSale?:
      | {
          __typename?: 'Listing';
          inputs: Array<
            { __typename?: 'Amount'; amount: any; id: string; type: AmountType } | null | undefined
          >;
        }
      | null
      | undefined;
    listings?:
      | Array<
          | {
              __typename?: 'Listing';
              id: string;
              inputs: Array<
                | { __typename?: 'Amount'; amount: any; id: string; type: AmountType }
                | null
                | undefined
              >;
            }
          | null
          | undefined
        >
      | null
      | undefined;
    items?: Array<{
      __typename?: 'Item';
      id: string;
      fullname: string;
      type: ItemType;
      name: string;
      namePrefix?: string | null | undefined;
      nameSuffix?: string | null | undefined;
      suffix?: string | null | undefined;
      augmented?: boolean | null | undefined;
      tier: ItemTier;
      greatness: number;
      count: number;
    }>;
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
            display: flex;
            flex-direction: column;
          `}
        >
          <PanelTitleBarFlex>
            <div
              css={css`
                flex: auto;
                text-align: left;
              `}
            >
              #{dope.id}
            </div>
            {/* <img
              alt="favorite"
              css={css`
                margin: 8px;
              `}
              src={iconPath + '/favorite.svg'}
            /> */}
            {footer === 'for-marketplace' && <DopeCardTitleCost dope={dope}></DopeCardTitleCost>}
          </PanelTitleBarFlex>
          <DopeCardBody dope={dope} />
        </PanelContainer>
      )}
    </>
  );
};

export default DopeCard;
