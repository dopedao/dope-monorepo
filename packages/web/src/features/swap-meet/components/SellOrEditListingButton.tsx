import { ButtonProps } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { EditListingButton, SellButton } from 'features/swap-meet/components';
import { ListingsContext, useMatchedListings } from 'providers/ReservoirListingsProvider';
import { CancelListingButton } from './CancelListingButton';

type Props = {
  chainId: number;
  contractAddress: string;
  tokenId: string;
  buttonProps?: ButtonProps;
};

// Fetches listings for token and displays a
// button to sell or edit the listing
export const SellOrEditListingButton = ({ chainId, contractAddress, tokenId }: Props) => {
  const matchedListings = useMatchedListings(contractAddress, tokenId);
  const isOnSale = matchedListings?.length > 0;

  if (isOnSale) {
    return (
      <>
        <EditListingButton
          listingId={matchedListings[0].id}
          chainId={chainId}
          contractAddress={contractAddress}
          tokenId={tokenId}
        />
        <CancelListingButton listingId={matchedListings[0].id} chainId={chainId} />
      </>
    );
  }
  return <SellButton chainId={chainId} contractAddress={contractAddress} tokenId={tokenId} />;
};
