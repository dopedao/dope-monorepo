import React, { useEffect, useState, useContext } from 'react';
import { useAccount } from 'wagmi';
import { useOwnerListings, Listing } from '@reservoir0x/reservoir-kit-ui';
import { set } from 'date-fns';
import { REFETCH_INTERVAL } from 'utils/constants';

// jacked from reservoir-kit
// they dont export a type and typing by hand
// i would be a fucking maniac
type ApiListing = {
  id: string;
  kind: string;
  side: 'buy' | 'sell';
  status?: string | undefined;
  tokenSetId: string;
  tokenSetSchemaHash: string;
  contract?: string | undefined;
  contractKind?: string | undefined;
  maker: string;
  taker: string;
  price?:
    | {
        currency?:
          | {
              contract?: string | undefined;
              name?: string | undefined;
              symbol?: string | undefined;
              decimals?: number | undefined;
              chainId?: number | undefined;
            }
          | undefined;
        amount?:
          | {
              raw?: string | undefined;
              decimal?: number | undefined;
              usd?: number | undefined;
              native?: number | undefined;
            }
          | undefined;
        netAmount?:
          | {
              raw?: string | undefined;
              decimal?: number | undefined;
              usd?: number | undefined;
              native?: number | undefined;
            }
          | undefined;
      }
    | undefined;
  validFrom: number;
  validUntil: number;
  quantityFilled?: number | undefined;
  quantityRemaining?: number | undefined;
  dynamicPricing?:
    | {
        kind?: 'dutch' | undefined;
        data?:
          | {
              price?:
                | {
                    start?:
                      | {
                          currency?:
                            | {
                                contract?: string | undefined;
                                name?: string | undefined;
                                symbol?: string | undefined;
                                decimals?: number | undefined;
                                chainId?: number | undefined;
                              }
                            | undefined;
                          amount?:
                            | {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                              }
                            | undefined;
                          netAmount?:
                            | {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                              }
                            | undefined;
                        }
                      | undefined;
                    end?:
                      | {
                          currency?:
                            | {
                                contract?: string | undefined;
                                name?: string | undefined;
                                symbol?: string | undefined;
                                decimals?: number | undefined;
                                chainId?: number | undefined;
                              }
                            | undefined;
                          amount?:
                            | {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                              }
                            | undefined;
                          netAmount?:
                            | {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                              }
                            | undefined;
                        }
                      | undefined;
                  }
                | undefined;
              time?:
                | {
                    start?: number | undefined;
                    end?: number | undefined;
                  }
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

type ListingsContextType = {
  listings: ApiListing[];
  refresh: () => void;
};

export const useMatchedListings = (contractAddress: string, tokenId: string) => {
  const ctx = useContext(ListingsContext);
  return ctx.listings.filter(
    listing =>
      listing.contract?.toLowerCase() === contractAddress.toLowerCase() &&
      // "token:contractAddress:tokenId"
      listing.tokenSetId.split(':')[2] === tokenId,
  );
};

// Sometimes we might not have the latest price inside of our API,
// but we might have gotten it from Reservoir listings on the client side.
// This hook will return the best price from the listings if it exists,
// otherwise it will return the best ask price from the API.
export const useBestListingPrice = (
  contractAddress: string,
  tokenId: string,
  bestAskPriceEth: number,
) => {
  const matchedListings = useMatchedListings(contractAddress, tokenId);
  const price = matchedListings?.[0]?.price?.amount?.native ?? bestAskPriceEth ?? 0;
  const currency = matchedListings?.[0]?.price?.currency?.name ?? 'eth';
  return { price, currency };
};

export const ListingsContext = React.createContext<ListingsContextType>({
  listings: [],
  refresh: () => {},
});

// The listing must be an oracle powered listing. You can check this by verifying that the listing kind returned from the useListings hook is of type seaport-v1.4. You also need to verify that the listing is isNativeOffChainCancellable. You can get this info by adding the includeRawData flag to the the useListings hook or the underlying api.

const ReservoirListingsProvider: React.FC = ({ children }) => {
  const { data: ethListings, mutate: resetEthListings } = useOwnerListings(
    {},
    { refreshInterval: REFETCH_INTERVAL },
    1,
  );
  const { data: opListings, mutate: resetOpListings } = useOwnerListings(
    {},
    { refreshInterval: REFETCH_INTERVAL },
    10,
  );

  const listings: ApiListing[] = (ethListings || []).concat(opListings || []);
  // console.log(listings);

  // Allows us to invalidate cache and re-fetch on demand
  const refresh = () => {
    resetEthListings();
    resetOpListings();
  };

  return (
    <ListingsContext.Provider value={{ listings, refresh }}>{children}</ListingsContext.Provider>
  );
};

export default ReservoirListingsProvider;
