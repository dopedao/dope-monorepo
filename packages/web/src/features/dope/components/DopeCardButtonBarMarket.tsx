import { DopeCardProps } from './DopeCard';
import { useRouter } from 'next/router';
import { Box, Button, VStack } from '@chakra-ui/react';
import { useBestListingPrice } from 'providers/ReservoirListingsProvider';
import { NETWORK, ETH_CHAIN_ID } from 'utils/constants';
import { SwapMeetButtonContainer } from 'features/swap-meet/components';
import { useEffect, useState } from 'react';
import BuyDopeButton from './BuyDopeButton';

type DopeCardButtonBarMarketProps = Pick<DopeCardProps, 'dope'>;

const DopeCardButtonBarMarket = ({ dope }: DopeCardButtonBarMarketProps) => {
  const [hasGearBeenClaimed, setHasGearBeenClaimed] = useState(false);
  const router = useRouter();
  const chainId = parseInt(ETH_CHAIN_ID);
  // @ts-ignore
  const contractAddress = NETWORK[chainId].contracts.dope;
  const { price, currency } = useBestListingPrice(
    contractAddress,
    dope.id?.toString() ?? '',
    dope.bestAskPriceEth ?? 0,
  );
  const isOnSale = price > 0;

  useEffect(() => {
    setHasGearBeenClaimed(dope.opened);
  }, [dope.opened]);

  return (
    <SwapMeetButtonContainer>
      {isOnSale && !hasGearBeenClaimed ? (
        <Button
          variant="primary"
          onClick={() => {
            router.push({
              pathname: '/hustlers/mint',
              query: { dope_id: dope.id },
            });
          }}
        >
          Mint Hustler
        </Button>
      ) : (
        <Box height="2.25em" />
      )}
      {isOnSale && (
        <BuyDopeButton
          dope={dope}
          allowContinueOnClaimed={true}
          alertMsg="Please be aware that this DOPE's gear has been claimed and may no longer be used to mint a Hustler."
        />
      )}
    </SwapMeetButtonContainer>
  );
};

export default DopeCardButtonBarMarket;
