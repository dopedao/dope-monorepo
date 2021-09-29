/**
 * Provides GraphQL interface to The Graph,
 * and maintains state for client-only variables.
 * 
 * Helps us by storing Loot information, and combines
 * it with information fetched from OpenSea.
 */
import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { getRarityForDopeId } from '../common/dope-rarity-check';
import { NETWORK } from '../common/constants';
import { ReactNode, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';

// Simple GET against the OpenSea API
const getOpenSeaAsset = (tokenId: string) => {
  const contractAddress = NETWORK[1].contracts.dope;
  const url = `https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`;

  return fetch(url);
}

function getClient(uri: string) {
  return new ApolloClient({
    uri,
    cache: new InMemoryCache({ typePolicies: {
      Bag: {
        fields: {
          rank: {
            keyArgs: ['id'],
            // Client-only field to grab rank of item
            read(_, { readField }): number { 
              const bagId = readField('id') as number;
              const rarity = getRarityForDopeId(bagId);
              console.log(`Rank for ${bagId} - ${rarity}`);
              return rarity;
            },
          },
          open_sea_asset(_, { readField, storage }) {
            if (!storage.var) {
              storage.var = makeVar({});
              const tokenId = readField('id') as string;
              if(tokenId === undefined) { return storage.var() };
              getOpenSeaAsset(tokenId)
                .then(response => response.json())
                .then(data => {
                  console.log(data);
                  storage.var(data);
                });
            }
            return storage.var();
          }
        }
      }
    }}),
  });
}

const WrappedApolloProvider = ({ children }: { children: ReactNode }) => {
  const { chainId } = useWeb3React();

  const uri = useMemo(
    () => (chainId ? NETWORK[chainId as 1 | 4].subgraph : NETWORK[1].subgraph),
    [chainId],
  );

  return <ApolloProvider client={getClient(uri)}>{children}</ApolloProvider>;
};
export default WrappedApolloProvider;