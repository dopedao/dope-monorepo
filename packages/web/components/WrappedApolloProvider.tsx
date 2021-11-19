import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  makeVar,
  useReactiveVar,
} from '@apollo/client';
import { getRarityForDopeId } from 'src/dope-rarity-check';
import { NETWORK } from 'src/constants';
import { OpenSeaAsset } from 'src/OpenSeaAsset';
import { ReactNode, useMemo } from 'react';
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import DopeDatabase, { DopeDbCacheReactive } from 'src/DopeDatabase';
import { valueFromCachedLoot } from 'src/DopeJsonParser';

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
            bundled(): boolean {
              return true;
            },
            clothes(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'clothes');
            },
            foot(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'foot');
            },
            hand(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'hand');
            },
            drugs(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'drugs');
            },
            neck(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'neck');
            },
            ring(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'ring');
            },
            vehicle(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'vehicle');
            },
            waist(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'waist');
            },
            weapon(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'weapon');
            },
            rank: {
              keyArgs: false,
              read(_, { readField }): number {
                const tokenId = readField('id') as number;
                const rarity = getRarityForDopeId(tokenId);
                // console.log(`Rank for ${tokenId} - ${rarity}`);
                return rarity;
              },
            },
            open_sea_asset: {
              keyArgs: false,
              read(_, { storage }) {
                if (!storage.var) {
                  storage.var = makeVar(new OpenSeaAsset());
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
    () => (chainId ? NETWORK[chainId as 1 | 42].subgraph : NETWORK[1].subgraph),
    [chainId],
  );
  const client = getClient(uri);
  const dopeDb = useReactiveVar(DopeDbCacheReactive) as DopeDatabase;

  useEffect(() => {
    console.log('Wrapped provider');
    dopeDb.refreshOpenSeaAssets().then(() => DopeDbCacheReactive(dopeDb));
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default WrappedApolloProvider;
