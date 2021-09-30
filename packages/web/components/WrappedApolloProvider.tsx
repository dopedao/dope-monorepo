import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { getRarityForDopeId } from '../common/dope-rarity-check';
import { NETWORK } from '../common/constants';
import { OpenSeaAsset, getOpenSeaAsset, openSeaAssetFromJson } from '../common/open-sea-utils';
import { ReactNode, useMemo } from 'react';
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import gql from 'graphql-tag';

// Cached output of all our existing loot items
import CachedDopeLoot from 'dope-metrics/output/loot.json';
const valueFromCachedLoot = (tokenId: number, key: string) => {
  const value = CachedDopeLoot[tokenId-1][tokenId][key];
  return value;
};

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
            clothes(_, {readField}): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'clothes');
            },
            foot(_, {readField}): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'foot');
            },
            hand(_, {readField}): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'hand');
            },
            drugs(_, {readField}): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'drugs');
            },
            neck(_, {readField}): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'neck');
            },
            ring(_, {readField}): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'ring');
            },
            vehicle(_, {readField}): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'vehicle');
            },
            waist(_, {readField}): string {
              const tokenId = readField('id') as number;
              return valueFromCachedLoot(tokenId, 'waist');
            },
            weapon(_, {readField}): string {
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
                      return storage.var();
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

const writeBag = gql`
  query WriteBag($id: Int!) {
    bag(id: $id) {
      id
      clothes
      drugs
      foot
      hand
      neck
      ring
      vehicle
      waist
      weapon
      rank
    }
  }
`;
const writeBagOpenSeaAsset = gql`
  query WriteBagOpenSeaAsset($id: Int!) {
    Bags {
      bag(id: $id) {
        open_sea_asset
      }
    }
  }
`;

const WrappedApolloProvider = ({ children }: { children: ReactNode }) => {
  const { chainId } = useWeb3React();
  const uri = useMemo(
    () => (chainId ? NETWORK[chainId as 1 | 4].subgraph : NETWORK[1].subgraph),
    [chainId],
  );
  const client = getClient(uri);

  useEffect(() => {
    return;
    console.log("Warming DOPE Cache");
    Object.entries(CachedDopeLoot).slice(0,5).forEach(([_, values]) => {
      const tokenId = Object.keys(values)[0];
      const dope = values[tokenId];
      client.writeQuery({
        query: writeBag,
        data: {
          bag: {
            __typename: 'Bag',
            id: tokenId,
            clothes: dope.clothes,
            drugs: dope.drugs,
            foot: dope.foot,
            hand: dope.hand,
            neck: dope.neck,
            ring: dope.ring,
            vehicle: dope.vehicle,
            waist: dope.waist,
            weapon: dope.weapon,
            rank: getRarityForDopeId(tokenId),
          }
        },
        variables: { id: tokenId }
      });
      // Fetch + write OpenSea Info
      getOpenSeaAsset(tokenId)
        .then(response => response.json())
        .then(data => {
          client.writeQuery({
            query: writeBagOpenSeaAsset,
            data: {
              bag: {
                __typename: 'Bag',
                open_sea_asset: openSeaAssetFromJson(data)
              }
            }
          })
        })
        .catch(error => {
          console.log("OPENSEA FETCH ERROR");
          console.log(error);
        });
    });
    console.log("DOPE Cache warmed");

  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default WrappedApolloProvider;
