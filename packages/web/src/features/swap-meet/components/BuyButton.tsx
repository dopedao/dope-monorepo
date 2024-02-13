import { Box, Button, ButtonProps, useToast } from '@chakra-ui/react';
import { BuyModal, useListings } from '@reservoir0x/reservoir-kit-ui';
import { useState, Dispatch, SetStateAction } from 'react';
import StatusContainer from 'components/StatusContainer';
import { useConnectModal } from '@rainbow-me/rainbowkit';

type Props = {
  isOnSale: boolean;
  chainId: number;
  contractAddress: string;
  tokenId: string;
  precision?: number;
  buttonProps?: ButtonProps;
  openState?: [boolean, Dispatch<SetStateAction<boolean>>];
  // Allow for passing in custom elements
  // to do other things after purchase is complete
  // instead of just showing text.
  purchaseCompleteElement?: JSX.Element;
  purchaseCompleteCallback?: () => void;
};

export const BuyButton = ({
  isOnSale,
  chainId,
  contractAddress,
  tokenId,
  buttonProps,
  openState,
  purchaseCompleteElement,
  purchaseCompleteCallback,
}: Props) => {
  const { openConnectModal } = useConnectModal();

  const [inProgress, setInProgress] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const toast = useToast();

  // Workaround for Blur API not working for purchases
  // Reservoir team fixed Feb 2024
  // https://docs.reservoir.tools/reference/reservoirkit-hooks#uselistings
  // const { data: listingData, isLoading: isLoadingListings } = useListings(
  //   {
  //     token: `${contractAddress}:${tokenId}`,
  //   },
  //   {},
  //   true,
  //   chainId,
  // );
  const [isOnBlur, setIsOnBlur] = useState(false);
  // useEffect(() => {
  //   if (isLoadingListings) return;
  //   if (listingData?.length > 0) {
  //     const cheapest = listingData[0];
  //     if (cheapest.kind === 'blur') {
  //       setIsOnBlur(true);
  //     }
  //   }
  // }, [isLoadingListings, listingData]);

  const PurchaseCompleteElement = () => (
    <Box p=".5em" bgColor="var(--success-green)">
      ✅ You Own It ✅
    </Box>
  );

  return (
    <BuyModal
      openState={openState}
      chainId={chainId}
      trigger={
        isOnBlur ? (
          <StatusContainer>
            <Box fontSize="small">Available on Blur.io</Box>
          </StatusContainer>
        ) : purchaseComplete ? (
          purchaseCompleteElement || <PurchaseCompleteElement />
        ) : (
          <Button
            variant="primary"
            onClick={() => setInProgress(true)}
            isLoading={inProgress}
            isDisabled={!isOnSale || purchaseComplete}
            {...buttonProps}
          >
            Buy Now
          </Button>
        )
      }
      token={`${contractAddress}:${tokenId}`}
      defaultQuantity={1}
      onConnectWallet={() => openConnectModal?.()}
      onPurchaseComplete={data => {
        setInProgress(false);
        setPurchaseComplete(true);
        purchaseCompleteCallback?.();
        toast({
          title: 'Ballin',
          description: `You just bought ${data.token}`,
          status: 'success',
          isClosable: true,
        });
      }}
      onPurchaseError={(error, data) => {
        console.error('Transaction Error', error, data);
        toast({
          title: 'Purchase incomplete',
          description: error.message,
          status: 'error',
          isClosable: true,
        });
        setInProgress(false);
      }}
      onClose={(data, stepData, currentStep) => {
        openState?.[1](false);
        setInProgress(false);
      }}
    />
  );
};
