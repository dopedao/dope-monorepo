import { Box, Button, ButtonProps, useToast } from '@chakra-ui/react';
import CartIcon from 'ui/svg/Cart';
import { CancelListingModal } from '@reservoir0x/reservoir-kit-ui';
import { useState, cloneElement, useContext } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useWalletClient } from 'wagmi';
import { ListingsContext } from 'providers/ReservoirListingsProvider';

type Currency = {
  contract: string;
  symbol: string;
  decimals?: number;
  coinGeckoId?: string;
};

type Props = {
  chainId: number;
  listingId: string;
  buttonProps?: ButtonProps;
};

export const CancelListingButton = ({ chainId, listingId, buttonProps }: Props) => {
  const { openConnectModal } = useConnectModal();
  const { refresh: refreshListings } = useContext(ListingsContext);
  const [inProgress, setInProgress] = useState(false);
  const [complete, setComplete] = useState(false);
  const toast = useToast();

  const { isDisconnected } = useAccount();
  const { data: signer, error: clientError } = useWalletClient();
  if (clientError) console.error(clientError);

  const buttonTrigger = (
    <Button
      onClick={() => setInProgress(true)}
      isLoading={inProgress}
      isDisabled={complete}
      {...buttonProps}
    >
      <CartIcon color="black" width={16} height={16} />
      <Box pl=".25em">Cancel</Box>
    </Button>
  );

  if (isDisconnected) {
    return cloneElement(buttonTrigger, {
      onClick: async () => {
        if (!signer) {
          openConnectModal?.();
        } else {
          alert('You are connected');
        }
      },
    });
  }

  return (
    <CancelListingModal
      trigger={buttonTrigger}
      listingId={listingId}
      chainId={chainId}
      onCancelComplete={(data: any) => {
        setInProgress(false);
        setComplete(true);
        // Re-fetch from reservoir to update ui
        // so we don't have to wait for it to populate seconds later
        // or refresh the page.
        refreshListings();
        toast({
          title: 'Success',
          description: 'Your listing has been updated',
          status: 'success',
          isClosable: true,
        });
      }}
      onCancelError={(error: any, data: any) => {
        console.error('Edit Error', error, data);
        toast({
          title: 'Error editing listing',
          description: error.message,
          status: 'error',
          isClosable: true,
        });
        setInProgress(false);
      }}
      onClose={() => {
        console.log('onClose');
        setInProgress(false);
      }}
    />
  );
};
