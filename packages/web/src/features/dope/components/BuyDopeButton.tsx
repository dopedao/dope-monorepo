import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import { useBestListingPrice } from 'providers/ReservoirListingsProvider';
import { NETWORK, ETH_CHAIN_ID } from 'utils/constants';
import { BuyButton } from 'features/swap-meet/components';
import { useInitiator } from 'hooks/contracts';
import { useEffect, useState } from 'react';
import { Dope } from 'generated/graphql';

type Props = {
  dope: Pick<Dope, 'id' | 'claimed' | 'opened' | 'rank' | 'items' | 'bestAskPriceEth'>;
  allowContinueOnClaimed?: boolean;
  alertMsg?: string;
  purchaseCompleteElement?: JSX.Element;
  purchaseCompleteCallback?: () => void;
};

// Buy Button that will check the gear claim status
// of this dope in realtime and allow proceeding with the action or not.
//
// This is to prevent our database from being out of sync with the blockchain.
//
// This is helpful in the swap meet to warn but allow purchase,
// and on hustler mint page to prevent purchasing if the gear has been claimed.
const BuyDopeButton = ({
  dope,
  allowContinueOnClaimed,
  alertMsg,
  purchaseCompleteElement,
  purchaseCompleteCallback,
}: Props) => {
  const [hasGearBeenClaimed, setHasGearBeenClaimed] = useState(false);
  const [buyModalIsShown, setBuyModalIsShown] = useState(false);
  const initiatorContract = useInitiator();
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

  const continueAfterGearClaimCheck = async (
    allowContinue: boolean,
    claimedFunc: () => void,
    continueFunc: () => void,
  ) => {
    // if it's already "opened" in the database we would be able to proceed
    // these things were not named well originally
    if (dope.opened) {
      continueFunc();
      return;
    }
    // only care about live checking for items we might be wrong about
    console.log('checking gear claim status');
    const gearClaimed = await initiatorContract.isOpened(dope.id).then(res => {
      return res;
    });
    console.log('gearClaimed', gearClaimed);
    setHasGearBeenClaimed(gearClaimed);
    if (gearClaimed) {
      claimedFunc();
      if (!allowContinue) return;
    }
    continueFunc();
  };

  return (
    // Fake button to capture onclick
    <Box
      cursor="pointer"
      onClick={() => {
        // necessary to ensure we can close the modal
        if (buyModalIsShown) return;
        continueAfterGearClaimCheck(
          allowContinueOnClaimed ?? false,
          () => {
            alert(alertMsg ?? 'Gear for this DOPE has already been claimed.');
          },
          () => {
            setBuyModalIsShown(true);
          },
        );
      }}
    >
      <BuyButton
        isOnSale={isOnSale}
        chainId={chainId}
        contractAddress={contractAddress}
        tokenId={dope.id.toString()}
        // Prevent clicking on the button directly
        // because we want to check gear claim status first
        buttonProps={{
          pointerEvents: 'none',
        }}
        openState={[buyModalIsShown, setBuyModalIsShown]}
        purchaseCompleteElement={purchaseCompleteElement}
        purchaseCompleteCallback={purchaseCompleteCallback}
      />
    </Box>
  );
};

export default BuyDopeButton;
