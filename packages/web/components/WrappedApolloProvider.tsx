/**
 * Provides GraphQL interface to The Graph,
 * and maintains state for client-only variables.
 * 
 * Helps us by storing Loot information, and combines
 * it with information fetched from OpenSea.
 */
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { getRarityForDopeId } from '../common/dope-rarity-check';
import { NETWORK } from '../common/constants';
import { ReactNode, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';

function getClient(uri: string) {
  return new ApolloClient({
    uri,
    cache: new InMemoryCache({ typePolicies: {
      Bag: {
        fields: {
          // Client-only field to grab rank of item
          rank(currentValue, { readField }): number { 
            const bagId = readField('id') as number;
            const rarity = getRarityForDopeId(bagId);
            // console.log(`Rank for ${bagId} - ${rarity}`);
            return rarity;
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