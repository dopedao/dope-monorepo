/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { css } from '@emotion/react';
import DopeCardBody from 'features/dope/components/DopeCardBody';
import { NUM_DOPE_TOKENS } from 'utils/constants';
import DopeCardButtonBarMarket from 'features/dope/components/DopeCardButtonBarMarket';
import DopeCardButtonBarOwner from 'features/dope/components/DopeCardButtonBarOwner';
import DopeCardTitleCost from 'features/dope/components/DopeCardTitleCost';
import DopeLegend from 'features/dope/components/DopeLegend';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleBarFlex from 'components/PanelTitleBarFlex';
import { AmountType, ItemTier, ItemType } from 'generated/graphql';

const iconPath = '/images/icon';

export type DopeCardProps = {
  buttonBar: 'for-marketplace' | 'for-owner';
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

const DopeCard = ({ buttonBar, dope, isExpanded = true, showCollapse = false }: DopeCardProps) => {
  const [isItemLegendVisible, setIsItemLegendVisible] = useState(false);

  const toggleItemLegendVisibility = (): void => {
    setIsItemLegendVisible(!isItemLegendVisible);
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
            flex: 1 auto;
            justify-content: space-between;
            align-items: stretch;
            flex-direction: column;
            gap: 0;
          `}
        >
          <PanelTitleBarFlex>
            <div
              css={css`
                text-align: left;
              `}
            >
              #{dope.id}
              <span className="small"
                css={css`padding-left: 6px; display:inline-block; height:12px; color: var(--gray-400);`}>
                ( {dope.rank + 1} / {NUM_DOPE_TOKENS}{' '} )
              </span>
            </div>
            <div
                css={css`
                padding: 0px 8px;
                width: 48px;
              `}
            >
              {/* <img
                alt="favorite"
                css={css`
                  margin: 8px;
                `}
                src={iconPath + '/favorite.svg'}
              /> */}
            </div>
            <div
              css={css`
                width: 96px;
                padding:0;
                display: flex;
                flex-direction:column;
                align-items: stretch;
              `}
            >
              { buttonBar === 'for-marketplace' && <DopeCardTitleCost dope={dope}></DopeCardTitleCost> }
            </div>
          </PanelTitleBarFlex>
          <DopeCardBody dope={dope} isExpanded={isExpanded} />
        </PanelContainer>
      )}
    </>
  );
};

export default DopeCard;
