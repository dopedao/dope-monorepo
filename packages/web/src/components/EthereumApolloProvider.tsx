import { ReactNode, useMemo, useEffect } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  FieldPolicy,
  InMemoryCache,
  makeVar,
  useReactiveVar,
} from '@apollo/client';
import { getRarityForDopeId } from 'utils/dope-rarity-check';
import { NETWORK } from 'utils/constants';
import { OpenSeaAsset } from 'utils/OpenSeaAsset';
import DopeDatabase, { DopeDbCacheReactive } from 'utils/DopeDatabase';
import { valueFromCachedDope } from 'utils/DopeJsonParser';
import { useEthereum, useOptimism } from 'hooks/web3';
import { Reference } from '@apollo/client/utilities';

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
            clothes(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedDope(tokenId, 'clothes');
            },
            foot(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedDope(tokenId, 'foot');
            },
            hand(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedDope(tokenId, 'hand');
            },
            drugs(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedDope(tokenId, 'drugs');
            },
            neck(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedDope(tokenId, 'neck');
            },
            ring(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedDope(tokenId, 'ring');
            },
            vehicle(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedDope(tokenId, 'vehicle');
            },
            waist(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedDope(tokenId, 'waist');
            },
            weapon(_, { readField }): string {
              const tokenId = readField('id') as number;
              return valueFromCachedDope(tokenId, 'weapon');
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

type KeyArgs = FieldPolicy<any>["keyArgs"];

function firstSkipPagination<T = Reference>(
  keyArgs: KeyArgs = false,
): FieldPolicy<T[]> {
  return {
    keyArgs,
    merge(existing, incoming, { args }) {
      const merged = existing ? existing.slice(0) : [];
      if (args) {
        // Assume an offset of 0 if args.offset omitted.
        const { skip = 0 } = args;
        for (let i = 0; i < incoming.length; ++i) {
          merged[skip + i] = incoming[i];
        }
      } else {
        throw new Error('Missing arguments!');
      }
      return merged;
    },
  };
}

export const useHustlerPaginationClient = () => {
  const { chainId } = useOptimism();

  const uri = useMemo(
    () => (chainId ? NETWORK[chainId as 10 | 69].subgraph : NETWORK[10].subgraph),
    [chainId],
  );

  return useMemo(
    () =>
      new ApolloClient({
        uri,
        cache: new InMemoryCache({
          typePolicies: {
            Query: {
              fields: {
                hustlers: firstSkipPagination()
              }
            }
          },
        }),
      }),
    [uri]
  );
}

export const useOptimismClient = () => {
  const { chainId } = useOptimism();

  const uri = useMemo(
    () => (chainId ? NETWORK[chainId as 10 | 69].subgraph : NETWORK[10].subgraph),
    [chainId],
  );

  return useMemo(
    () =>
      new ApolloClient({
        uri,
        cache: new InMemoryCache(),
      }),
    [uri],
  );
};

const EthereumApolloProvider = ({ children }: { children: ReactNode }) => {
  const { chainId } = useEthereum();
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

export default EthereumApolloProvider;
