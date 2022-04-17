/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import DopeCardBody from 'features/dope/components/DopeCardBody';
import DopeCardTitleCost from 'features/dope/components/DopeCardTitleCost';
import PanelContainer from 'components/PanelContainer';
import DopeCardButtonBarMarket from 'features/dope/components/DopeCardButtonBarMarket';
import DopeCardButtonBarOwner from 'features/dope/components/DopeCardButtonBarOwner';
import PanelTitleBarFlex from 'components/PanelTitleBarFlex';
import { AmountType, ItemTier, ItemType } from 'generated/graphql';

const iconPath = '/images/icon';

export type DopeItemArray = Array<{
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

export type DopeListingArray = Array<{
  __typename?: 'Listing';
  id: string;
  active: boolean;
  inputs: Array<
    | { __typename?: 'Amount'; amount: any; id: string; type: AmountType }
    | null
    | undefined
  >;
}>

export type DopeItemApiResponse = {
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
    | DopeListingArray
    | null
    | undefined;
  items?: DopeItemArray;
};

export type DopeCardProps = {
  buttonBar?: 'for-marketplace' | 'for-owner' | null;
  dope: DopeItemApiResponse;
  isExpanded?: boolean;
  showCollapse?: boolean;
  hidePreviewButton?: boolean;
  showStatus?: boolean;
};

const DopeCard = ({
  buttonBar = null,
  dope,
  isExpanded = true,
  showCollapse = false,
  hidePreviewButton = false,
}: DopeCardProps) => {
  return (
    <PanelContainer
      key={`dope-card_${dope.id}`}
      className={`dopeCard ${isExpanded ? '' : 'collapsed'}`}
      css={css`
        &.collapsed {
          max-height: 225px;
          overflow: hidden;
        }
        display: flex;
        // Override default StackedResponsiveContainer
        // ratio where 2nd panel would be wider on /dope
        flex: 1 !important;
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
          DOPE #{dope.id}
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
        <DopeCardTitleCost dope={dope} />
      </PanelTitleBarFlex>
      <DopeCardBody
        dope={dope}
        isExpanded={isExpanded}
        hidePreviewButton={hidePreviewButton}
        showDopeClaimStatus={buttonBar === 'for-marketplace'}
      />
      {buttonBar === 'for-owner' && <DopeCardButtonBarOwner dope={dope} />}
      {buttonBar === 'for-marketplace' && <DopeCardButtonBarMarket dope={dope} />}
    </PanelContainer>
  );
};

export default DopeCard;
