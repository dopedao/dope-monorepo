import { Box } from '@chakra-ui/react';
import LoadingBlock from 'components/LoadingBlock';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBarFlex from 'components/PanelTitleBarFlex';
import GearCardBody, { GearItem } from 'features/gear/components/GearCardBody';
import { NETWORK, ETH_CHAIN_ID, OPT_CHAIN_ID } from 'utils/constants';
import { AskPrice, BuyButton, SwapMeetButtonContainer } from 'features/swap-meet/components';
import { useBestListingPrice } from 'providers/ReservoirListingsProvider';

// This should be Partial<Item> but I couldn't get it working…
const GearCard = ({ gear }: { gear: GearItem }) => {
  const chainId = parseInt(OPT_CHAIN_ID);
  // @ts-ignore
  const contractAddress = NETWORK[chainId].contracts.swapmeet;

  const { price, currency } = useBestListingPrice(
    contractAddress,
    gear.id?.toString() ?? '',
    gear.bestAskPriceEth ?? 0,
  );
  const isOnSale = price > 0;

  if (!gear.id) return <LoadingBlock maxRows={5} />;
  return (
    <PanelContainer key={gear.id} className="dopeCard">
      <PanelTitleBarFlex>
        <Box isTruncated={true}>{gear.name}</Box>
        <Box />
        <AskPrice price={price} currency={currency} precision={4} />
      </PanelTitleBarFlex>
      <GearCardBody item={gear} />
      <SwapMeetButtonContainer>
        <BuyButton
          isOnSale={isOnSale}
          chainId={chainId}
          contractAddress={contractAddress}
          tokenId={gear.id.toString()}
          precision={4}
        />
      </SwapMeetButtonContainer>
    </PanelContainer>
  );
};

export default GearCard;
