import { Box, Button, ButtonProps, useToast } from '@chakra-ui/react';
import CartIcon from 'ui/svg/Cart';
import { EditListingModal } from '@reservoir0x/reservoir-kit-ui';
import { useEffect, useState, cloneElement } from 'react';
import { css } from '@emotion/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import StatusText from 'components/StatusText';
import { useAccount, useWalletClient } from 'wagmi';

type Currency = {
  contract: string;
  symbol: string;
  decimals?: number;
  coinGeckoId?: string;
};

type Props = {
  chainId: number;
  contractAddress: string;
  tokenId: string;
  listingId: string;
  buttonProps?: ButtonProps;
};

export const EditListingButton = ({
  chainId,
  contractAddress,
  tokenId,
  listingId,
  buttonProps,
}: Props) => {
  const { openConnectModal } = useConnectModal();

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
      <Box pl=".25em">Edit</Box>
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
    <EditListingModal
      trigger={buttonTrigger}
      listingId={listingId}
      chainId={chainId}
      collectionId={contractAddress}
      tokenId={tokenId}
      onEditListingComplete={(data: any) => {
        setInProgress(false);
        setComplete(true);
        toast({
          title: 'Success',
          description: 'Your listing has been updated',
          status: 'success',
          isClosable: true,
        });
      }}
      onEditListingError={(error: any, data: any) => {
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
