import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { getRarityForDopeId } from '../common/dope-rarity-check';
import { NETWORK } from '../common/constants';
import { ReactNode, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { OpenSeaAsset, getOpenSeaAsset, openSeaAssetFromJson } from '../common/open-sea-utils';

/**
 * We use the below declaration to specify client-only field getters,
 * using Apollo local-only fields as documented here:
 * https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing-local-state-in-the-cache
 *
 * These client-only fields let us store things, like calculated values
 * based on DOPE token properties from The Graph, or OpenSea Asset information
 * fetched via their REST API.
 *
 * WARNING --------------------------------------------------------------
 *
 * If any of these fields do not return the expected type, odd things happen.
 *
 * One such oddity is React refusing to render components with rank field, if
 * open_sea_asset does not return the properly shaped output.
 */
function getClient(uri: string) {
  return new ApolloClient({
    uri,
    cache: new InMemoryCache({
      typePolicies: {
        Bag: {
          fields: {
            rank: {
              keyArgs: false,
              read(_, { readField }): number {
                const bagId = readField('id') as number;
                const rarity = getRarityForDopeId(bagId);
                // console.log(`Rank for ${bagId} - ${rarity}`);
                return rarity;
              },
            },
            open_sea_asset: {
              keyArgs: false,
              read(_, { readField, storage }) {
                if (!storage.var) {
                  storage.var = makeVar(new OpenSeaAsset());
                  const tokenId = readField('id') as string;
                  if (tokenId === undefined) {
                    return storage.var();
                  }
                  getOpenSeaAsset(tokenId)
                    .then(response => response.json())
                    .then(data => storage.var(openSeaAssetFromJson(data)))
                    .catch(error => {
                      console.log("OPENSEA FETCH ERROR");
                      console.log(error);
                    });
                }
                return storage.var();
              },
            },
          },
        },
      },
    }),
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
