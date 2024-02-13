import GearEquipFooter from './GearEquipFooter';
import GearUnEquipFooter from './GearUnEquipFooter';
import ProfileCard from 'features/profile/components/ProfileCard';
import ItemCount from './ItemCount';
import { BigNumberish } from 'ethers';
import { Box } from '@chakra-ui/react';
import GearCardBody, { GearItem } from 'features/gear/components/GearCardBody';

import PanelFooter from 'components/PanelFooter';
import { AskPrice, SellOrEditListingButton, TransferButton } from 'features/swap-meet/components';
import { useBestListingPrice } from 'providers/ReservoirListingsProvider';

import { NETWORK, OPT_CHAIN_ID } from 'utils/constants';
import PanelTitleBarFlex from 'components/PanelTitleBarFlex';
const chainId = parseInt(OPT_CHAIN_ID);
// @ts-ignore
const contractAddress = NETWORK[chainId].contracts.swapmeet;

const GearCard = ({
  item,
  balance,
  showEquipFooter = false,
  showUnEquipFooter = false,
  hustlerId,
}: {
  item: GearItem;
  balance?: number;
  showEquipFooter?: boolean;
  showUnEquipFooter?: boolean;
  hustlerId?: BigNumberish;
}) => {
  const { price, currency } = useBestListingPrice(
    contractAddress,
    item.id?.toString() ?? '',
    item.bestAskPriceEth ?? 0,
  );

  return (
    <ProfileCard>
      <PanelTitleBarFlex>
        <Box>{item.name}</Box>
        {balance && balance > 1 && (
          <Box title="You have this many in inventory">
            <ItemCount count={balance} />
          </Box>
        )}
        <AskPrice price={price} currency={currency} precision={4} />
      </PanelTitleBarFlex>
      <GearCardBody item={item} />
      {showEquipFooter && <GearEquipFooter id={item.id} />}
      {showUnEquipFooter && hustlerId && (
        <GearUnEquipFooter id={item.id} type={item.type} hustlerId={hustlerId} />
      )}
      {!showUnEquipFooter && (
        <PanelFooter>
          <TransferButton
            title={item.fullname}
            chainId={chainId}
            contractAddress={contractAddress}
            tokenId={item.id}
          />
          <SellOrEditListingButton
            chainId={chainId}
            contractAddress={contractAddress}
            tokenId={item.id}
          />
        </PanelFooter>
      )}
    </ProfileCard>
  );
};

export default GearCard;
