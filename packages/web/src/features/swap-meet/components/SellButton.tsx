import { Box, Button, ButtonProps, useToast } from '@chakra-ui/react';
import CartIcon from 'ui/svg/Cart';
import { ListModal } from '@reservoir0x/reservoir-kit-ui';
import { useEffect, useState, cloneElement, useContext } from 'react';
import { ePaymentToken, paymentTokens } from 'components/web3account/paymentTokens';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import StatusText from 'components/StatusText';
import { useAccount, useWalletClient } from 'wagmi';
import { ListingsContext } from 'providers/ReservoirListingsProvider';

type Currency = {
  contract: string;
  symbol: string;
  decimals?: number;
  coinGeckoId?: string;
};

type Props = {
  price?: number;
  chainId: number;
  contractAddress: string;
  tokenId: string;
  precision?: number;
  buttonProps?: ButtonProps;
};

export const SellButton = ({
  price,
  chainId,
  contractAddress,
  tokenId,
  buttonProps,
  precision = 2,
}: Props) => {
  const { openConnectModal } = useConnectModal();
  const { refresh: refreshListings } = useContext(ListingsContext);
  const [inProgress, setInProgress] = useState(false);
  const [complete, setComplete] = useState(false);
  const toast = useToast();

  const { isDisconnected } = useAccount();
  const { data: signer, error: clientError } = useWalletClient();
  if (clientError) console.error(clientError);

  const buttonTrigger = isDisconnected ? (
    <Button>Connect</Button>
  ) : complete ? (
    <StatusText>Item Listed Successfully</StatusText>
  ) : (
    <Button
      onClick={() => setInProgress(true)}
      isLoading={inProgress}
      isDisabled={complete}
      {...buttonProps}
    >
      <CartIcon color="black" width={16} height={16} />
      <Box pl=".25em">Sell</Box>
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

  let listingCurrencies: Currency[] = [];
  if (chainId in paymentTokens) {
    listingCurrencies = paymentTokens[chainId].map((token: ePaymentToken) => ({
      contract: token.address,
      symbol: token.symbol,
      decimals: token.decimals,
      coinGeckoId: token.coinGeckoId,
    }));
  }

  return (
    <ListModal
      chainId={chainId}
      trigger={buttonTrigger}
      collectionId={contractAddress}
      tokenId={tokenId}
      currencies={listingCurrencies}
      oracleEnabled={true} // necessary to edit listing later
      onListingComplete={data => {
        setInProgress(false);
        setComplete(true);
        // Re-fetch from reservoir to update ui
        // so we don't have to wait for it to populate seconds later
        // or refresh the page.
        refreshListings();
        toast({
          title: 'Success',
          description: 'Your item is listed for sale',
          status: 'success',
          isClosable: true,
        });
      }}
      onListingError={(error, data) => {
        console.error('Transaction Error', error, data);
        toast({
          title: 'Listing incomplete',
          description: error.message,
          status: 'error',
          isClosable: true,
        });
        setInProgress(false);
      }}
      onClose={(data, stepData, currentStep) => {
        console.log('onClose', data, stepData, currentStep);
        setInProgress(false);
      }}
    />
  );
};
