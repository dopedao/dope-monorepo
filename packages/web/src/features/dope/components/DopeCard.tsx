/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import DopeCardBody from 'features/dope/components/DopeCardBody';
import PanelContainer from 'components/PanelContainer';
import DopeCardButtonBarMarket from 'features/dope/components/DopeCardButtonBarMarket';
import DopeCardButtonBarOwner from 'features/dope/components/DopeCardButtonBarOwner';
import PanelTitleBarFlex from 'components/PanelTitleBarFlex';
import { Dope } from 'generated/graphql';
import { Box } from '@chakra-ui/react';
import { AskPrice } from 'features/swap-meet/components';
import { NETWORK, ETH_CHAIN_ID, OPT_CHAIN_ID } from 'utils/constants';
import { useBestListingPrice } from 'providers/ReservoirListingsProvider';

export type DopeCardProps = {
  buttonBar?: 'for-marketplace' | 'for-owner' | null;
  dope: Pick<Dope, 'id' | 'claimed' | 'opened' | 'rank' | 'items' | 'bestAskPriceEth'>;
  isExpanded?: boolean;
  showCollapse?: boolean;
  hidePreviewButton?: boolean;
  showStatus?: boolean;
  bestAskPriceEth?: number;
};

const DopeCard = ({
  buttonBar = null,
  dope,
  isExpanded = true,
  showCollapse = false,
  hidePreviewButton = false,
}: DopeCardProps) => {
  const chainId = parseInt(ETH_CHAIN_ID);
  // @ts-ignore
  const contractAddress = NETWORK[chainId].contracts.dope;
  const { price, currency } = useBestListingPrice(
    contractAddress,
    dope.id?.toString() ?? '',
    dope.bestAskPriceEth ?? 0,
  );

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
        <Box>DOPE #{dope.id}</Box>
        <Box pl="8px">
          {/* <img
            alt="favorite"
            css={css`
              margin: 8px;
            `}
            src={iconPath + '/favorite.svg'}
          /> */}
        </Box>
        <AskPrice price={price} currency={currency} precision={2} />
      </PanelTitleBarFlex>
      <DopeCardBody dope={dope} isExpanded={isExpanded} hidePreviewButton={hidePreviewButton} />
      {buttonBar === 'for-owner' && <DopeCardButtonBarOwner dope={dope} />}
      {buttonBar === 'for-marketplace' && <DopeCardButtonBarMarket dope={dope} />}
    </PanelContainer>
  );
};

export default DopeCard;
