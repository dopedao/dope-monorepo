import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Bag = {
  __typename?: 'Bag';
  claimed: Scalars['Boolean'];
  clothes: Scalars['String'];
  currentOwner: Wallet;
  drugs: Scalars['String'];
  foot: Scalars['String'];
  hand: Scalars['String'];
  id: Scalars['ID'];
  minted: Scalars['BigInt'];
  neck: Scalars['String'];
  ring: Scalars['String'];
  vehicle: Scalars['String'];
  waist: Scalars['String'];
  weapon: Scalars['String'];
};

export type Bag_Filter = {
  claimed?: Maybe<Scalars['Boolean']>;
  claimed_in?: Maybe<Array<Scalars['Boolean']>>;
  claimed_not?: Maybe<Scalars['Boolean']>;
  claimed_not_in?: Maybe<Array<Scalars['Boolean']>>;
  clothes?: Maybe<Scalars['String']>;
  clothes_contains?: Maybe<Scalars['String']>;
  clothes_ends_with?: Maybe<Scalars['String']>;
  clothes_gt?: Maybe<Scalars['String']>;
  clothes_gte?: Maybe<Scalars['String']>;
  clothes_in?: Maybe<Array<Scalars['String']>>;
  clothes_lt?: Maybe<Scalars['String']>;
  clothes_lte?: Maybe<Scalars['String']>;
  clothes_not?: Maybe<Scalars['String']>;
  clothes_not_contains?: Maybe<Scalars['String']>;
  clothes_not_ends_with?: Maybe<Scalars['String']>;
  clothes_not_in?: Maybe<Array<Scalars['String']>>;
  clothes_not_starts_with?: Maybe<Scalars['String']>;
  clothes_starts_with?: Maybe<Scalars['String']>;
  currentOwner?: Maybe<Scalars['String']>;
  currentOwner_contains?: Maybe<Scalars['String']>;
  currentOwner_ends_with?: Maybe<Scalars['String']>;
  currentOwner_gt?: Maybe<Scalars['String']>;
  currentOwner_gte?: Maybe<Scalars['String']>;
  currentOwner_in?: Maybe<Array<Scalars['String']>>;
  currentOwner_lt?: Maybe<Scalars['String']>;
  currentOwner_lte?: Maybe<Scalars['String']>;
  currentOwner_not?: Maybe<Scalars['String']>;
  currentOwner_not_contains?: Maybe<Scalars['String']>;
  currentOwner_not_ends_with?: Maybe<Scalars['String']>;
  currentOwner_not_in?: Maybe<Array<Scalars['String']>>;
  currentOwner_not_starts_with?: Maybe<Scalars['String']>;
  currentOwner_starts_with?: Maybe<Scalars['String']>;
  drugs?: Maybe<Scalars['String']>;
  drugs_contains?: Maybe<Scalars['String']>;
  drugs_ends_with?: Maybe<Scalars['String']>;
  drugs_gt?: Maybe<Scalars['String']>;
  drugs_gte?: Maybe<Scalars['String']>;
  drugs_in?: Maybe<Array<Scalars['String']>>;
  drugs_lt?: Maybe<Scalars['String']>;
  drugs_lte?: Maybe<Scalars['String']>;
  drugs_not?: Maybe<Scalars['String']>;
  drugs_not_contains?: Maybe<Scalars['String']>;
  drugs_not_ends_with?: Maybe<Scalars['String']>;
  drugs_not_in?: Maybe<Array<Scalars['String']>>;
  drugs_not_starts_with?: Maybe<Scalars['String']>;
  drugs_starts_with?: Maybe<Scalars['String']>;
  foot?: Maybe<Scalars['String']>;
  foot_contains?: Maybe<Scalars['String']>;
  foot_ends_with?: Maybe<Scalars['String']>;
  foot_gt?: Maybe<Scalars['String']>;
  foot_gte?: Maybe<Scalars['String']>;
  foot_in?: Maybe<Array<Scalars['String']>>;
  foot_lt?: Maybe<Scalars['String']>;
  foot_lte?: Maybe<Scalars['String']>;
  foot_not?: Maybe<Scalars['String']>;
  foot_not_contains?: Maybe<Scalars['String']>;
  foot_not_ends_with?: Maybe<Scalars['String']>;
  foot_not_in?: Maybe<Array<Scalars['String']>>;
  foot_not_starts_with?: Maybe<Scalars['String']>;
  foot_starts_with?: Maybe<Scalars['String']>;
  hand?: Maybe<Scalars['String']>;
  hand_contains?: Maybe<Scalars['String']>;
  hand_ends_with?: Maybe<Scalars['String']>;
  hand_gt?: Maybe<Scalars['String']>;
  hand_gte?: Maybe<Scalars['String']>;
  hand_in?: Maybe<Array<Scalars['String']>>;
  hand_lt?: Maybe<Scalars['String']>;
  hand_lte?: Maybe<Scalars['String']>;
  hand_not?: Maybe<Scalars['String']>;
  hand_not_contains?: Maybe<Scalars['String']>;
  hand_not_ends_with?: Maybe<Scalars['String']>;
  hand_not_in?: Maybe<Array<Scalars['String']>>;
  hand_not_starts_with?: Maybe<Scalars['String']>;
  hand_starts_with?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  minted?: Maybe<Scalars['BigInt']>;
  minted_gt?: Maybe<Scalars['BigInt']>;
  minted_gte?: Maybe<Scalars['BigInt']>;
  minted_in?: Maybe<Array<Scalars['BigInt']>>;
  minted_lt?: Maybe<Scalars['BigInt']>;
  minted_lte?: Maybe<Scalars['BigInt']>;
  minted_not?: Maybe<Scalars['BigInt']>;
  minted_not_in?: Maybe<Array<Scalars['BigInt']>>;
  neck?: Maybe<Scalars['String']>;
  neck_contains?: Maybe<Scalars['String']>;
  neck_ends_with?: Maybe<Scalars['String']>;
  neck_gt?: Maybe<Scalars['String']>;
  neck_gte?: Maybe<Scalars['String']>;
  neck_in?: Maybe<Array<Scalars['String']>>;
  neck_lt?: Maybe<Scalars['String']>;
  neck_lte?: Maybe<Scalars['String']>;
  neck_not?: Maybe<Scalars['String']>;
  neck_not_contains?: Maybe<Scalars['String']>;
  neck_not_ends_with?: Maybe<Scalars['String']>;
  neck_not_in?: Maybe<Array<Scalars['String']>>;
  neck_not_starts_with?: Maybe<Scalars['String']>;
  neck_starts_with?: Maybe<Scalars['String']>;
  ring?: Maybe<Scalars['String']>;
  ring_contains?: Maybe<Scalars['String']>;
  ring_ends_with?: Maybe<Scalars['String']>;
  ring_gt?: Maybe<Scalars['String']>;
  ring_gte?: Maybe<Scalars['String']>;
  ring_in?: Maybe<Array<Scalars['String']>>;
  ring_lt?: Maybe<Scalars['String']>;
  ring_lte?: Maybe<Scalars['String']>;
  ring_not?: Maybe<Scalars['String']>;
  ring_not_contains?: Maybe<Scalars['String']>;
  ring_not_ends_with?: Maybe<Scalars['String']>;
  ring_not_in?: Maybe<Array<Scalars['String']>>;
  ring_not_starts_with?: Maybe<Scalars['String']>;
  ring_starts_with?: Maybe<Scalars['String']>;
  vehicle?: Maybe<Scalars['String']>;
  vehicle_contains?: Maybe<Scalars['String']>;
  vehicle_ends_with?: Maybe<Scalars['String']>;
  vehicle_gt?: Maybe<Scalars['String']>;
  vehicle_gte?: Maybe<Scalars['String']>;
  vehicle_in?: Maybe<Array<Scalars['String']>>;
  vehicle_lt?: Maybe<Scalars['String']>;
  vehicle_lte?: Maybe<Scalars['String']>;
  vehicle_not?: Maybe<Scalars['String']>;
  vehicle_not_contains?: Maybe<Scalars['String']>;
  vehicle_not_ends_with?: Maybe<Scalars['String']>;
  vehicle_not_in?: Maybe<Array<Scalars['String']>>;
  vehicle_not_starts_with?: Maybe<Scalars['String']>;
  vehicle_starts_with?: Maybe<Scalars['String']>;
  waist?: Maybe<Scalars['String']>;
  waist_contains?: Maybe<Scalars['String']>;
  waist_ends_with?: Maybe<Scalars['String']>;
  waist_gt?: Maybe<Scalars['String']>;
  waist_gte?: Maybe<Scalars['String']>;
  waist_in?: Maybe<Array<Scalars['String']>>;
  waist_lt?: Maybe<Scalars['String']>;
  waist_lte?: Maybe<Scalars['String']>;
  waist_not?: Maybe<Scalars['String']>;
  waist_not_contains?: Maybe<Scalars['String']>;
  waist_not_ends_with?: Maybe<Scalars['String']>;
  waist_not_in?: Maybe<Array<Scalars['String']>>;
  waist_not_starts_with?: Maybe<Scalars['String']>;
  waist_starts_with?: Maybe<Scalars['String']>;
  weapon?: Maybe<Scalars['String']>;
  weapon_contains?: Maybe<Scalars['String']>;
  weapon_ends_with?: Maybe<Scalars['String']>;
  weapon_gt?: Maybe<Scalars['String']>;
  weapon_gte?: Maybe<Scalars['String']>;
  weapon_in?: Maybe<Array<Scalars['String']>>;
  weapon_lt?: Maybe<Scalars['String']>;
  weapon_lte?: Maybe<Scalars['String']>;
  weapon_not?: Maybe<Scalars['String']>;
  weapon_not_contains?: Maybe<Scalars['String']>;
  weapon_not_ends_with?: Maybe<Scalars['String']>;
  weapon_not_in?: Maybe<Array<Scalars['String']>>;
  weapon_not_starts_with?: Maybe<Scalars['String']>;
  weapon_starts_with?: Maybe<Scalars['String']>;
};

export enum Bag_OrderBy {
  Claimed = 'claimed',
  Clothes = 'clothes',
  CurrentOwner = 'currentOwner',
  Drugs = 'drugs',
  Foot = 'foot',
  Hand = 'hand',
  Id = 'id',
  Minted = 'minted',
  Neck = 'neck',
  Ring = 'ring',
  Vehicle = 'vehicle',
  Waist = 'waist',
  Weapon = 'weapon',
}

export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bag?: Maybe<Bag>;
  bags: Array<Bag>;
  search: Array<Bag>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  wallet?: Maybe<Wallet>;
  wallets: Array<Wallet>;
};

export type Query_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type QueryBagArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};

export type QueryBagsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bag_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Bag_Filter>;
};

export type QuerySearchArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
};

export type QueryTransferArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};

export type QueryTransfersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transfer_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Transfer_Filter>;
};

export type QueryWalletArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};

export type QueryWalletsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Wallet_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Wallet_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bag?: Maybe<Bag>;
  bags: Array<Bag>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  wallet?: Maybe<Wallet>;
  wallets: Array<Wallet>;
};

export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type SubscriptionBagArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};

export type SubscriptionBagsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bag_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Bag_Filter>;
};

export type SubscriptionTransferArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};

export type SubscriptionTransfersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transfer_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Transfer_Filter>;
};

export type SubscriptionWalletArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};

export type SubscriptionWalletsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Wallet_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Wallet_Filter>;
};

export type Transfer = {
  __typename?: 'Transfer';
  bag: Bag;
  from: Wallet;
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  to: Wallet;
  txHash: Scalars['Bytes'];
};

export type Transfer_Filter = {
  bag?: Maybe<Scalars['String']>;
  bag_contains?: Maybe<Scalars['String']>;
  bag_ends_with?: Maybe<Scalars['String']>;
  bag_gt?: Maybe<Scalars['String']>;
  bag_gte?: Maybe<Scalars['String']>;
  bag_in?: Maybe<Array<Scalars['String']>>;
  bag_lt?: Maybe<Scalars['String']>;
  bag_lte?: Maybe<Scalars['String']>;
  bag_not?: Maybe<Scalars['String']>;
  bag_not_contains?: Maybe<Scalars['String']>;
  bag_not_ends_with?: Maybe<Scalars['String']>;
  bag_not_in?: Maybe<Array<Scalars['String']>>;
  bag_not_starts_with?: Maybe<Scalars['String']>;
  bag_starts_with?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
  from_contains?: Maybe<Scalars['String']>;
  from_ends_with?: Maybe<Scalars['String']>;
  from_gt?: Maybe<Scalars['String']>;
  from_gte?: Maybe<Scalars['String']>;
  from_in?: Maybe<Array<Scalars['String']>>;
  from_lt?: Maybe<Scalars['String']>;
  from_lte?: Maybe<Scalars['String']>;
  from_not?: Maybe<Scalars['String']>;
  from_not_contains?: Maybe<Scalars['String']>;
  from_not_ends_with?: Maybe<Scalars['String']>;
  from_not_in?: Maybe<Array<Scalars['String']>>;
  from_not_starts_with?: Maybe<Scalars['String']>;
  from_starts_with?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  to?: Maybe<Scalars['String']>;
  to_contains?: Maybe<Scalars['String']>;
  to_ends_with?: Maybe<Scalars['String']>;
  to_gt?: Maybe<Scalars['String']>;
  to_gte?: Maybe<Scalars['String']>;
  to_in?: Maybe<Array<Scalars['String']>>;
  to_lt?: Maybe<Scalars['String']>;
  to_lte?: Maybe<Scalars['String']>;
  to_not?: Maybe<Scalars['String']>;
  to_not_contains?: Maybe<Scalars['String']>;
  to_not_ends_with?: Maybe<Scalars['String']>;
  to_not_in?: Maybe<Array<Scalars['String']>>;
  to_not_starts_with?: Maybe<Scalars['String']>;
  to_starts_with?: Maybe<Scalars['String']>;
  txHash?: Maybe<Scalars['Bytes']>;
  txHash_contains?: Maybe<Scalars['Bytes']>;
  txHash_in?: Maybe<Array<Scalars['Bytes']>>;
  txHash_not?: Maybe<Scalars['Bytes']>;
  txHash_not_contains?: Maybe<Scalars['Bytes']>;
  txHash_not_in?: Maybe<Array<Scalars['Bytes']>>;
};

export enum Transfer_OrderBy {
  Bag = 'bag',
  From = 'from',
  Id = 'id',
  Timestamp = 'timestamp',
  To = 'to',
  TxHash = 'txHash',
}

export type Wallet = {
  __typename?: 'Wallet';
  address: Scalars['Bytes'];
  bags: Array<Bag>;
  bagsHeld: Scalars['BigInt'];
  id: Scalars['ID'];
  joined: Scalars['BigInt'];
  paper: Scalars['BigInt'];
};

export type WalletBagsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bag_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Bag_Filter>;
};

export type Wallet_Filter = {
  address?: Maybe<Scalars['Bytes']>;
  address_contains?: Maybe<Scalars['Bytes']>;
  address_in?: Maybe<Array<Scalars['Bytes']>>;
  address_not?: Maybe<Scalars['Bytes']>;
  address_not_contains?: Maybe<Scalars['Bytes']>;
  address_not_in?: Maybe<Array<Scalars['Bytes']>>;
  bagsHeld?: Maybe<Scalars['BigInt']>;
  bagsHeld_gt?: Maybe<Scalars['BigInt']>;
  bagsHeld_gte?: Maybe<Scalars['BigInt']>;
  bagsHeld_in?: Maybe<Array<Scalars['BigInt']>>;
  bagsHeld_lt?: Maybe<Scalars['BigInt']>;
  bagsHeld_lte?: Maybe<Scalars['BigInt']>;
  bagsHeld_not?: Maybe<Scalars['BigInt']>;
  bagsHeld_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  joined?: Maybe<Scalars['BigInt']>;
  joined_gt?: Maybe<Scalars['BigInt']>;
  joined_gte?: Maybe<Scalars['BigInt']>;
  joined_in?: Maybe<Array<Scalars['BigInt']>>;
  joined_lt?: Maybe<Scalars['BigInt']>;
  joined_lte?: Maybe<Scalars['BigInt']>;
  joined_not?: Maybe<Scalars['BigInt']>;
  joined_not_in?: Maybe<Array<Scalars['BigInt']>>;
  paper?: Maybe<Scalars['BigInt']>;
  paper_gt?: Maybe<Scalars['BigInt']>;
  paper_gte?: Maybe<Scalars['BigInt']>;
  paper_in?: Maybe<Array<Scalars['BigInt']>>;
  paper_lt?: Maybe<Scalars['BigInt']>;
  paper_lte?: Maybe<Scalars['BigInt']>;
  paper_not?: Maybe<Scalars['BigInt']>;
  paper_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Wallet_OrderBy {
  Address = 'address',
  Bags = 'bags',
  BagsHeld = 'bagsHeld',
  Id = 'id',
  Joined = 'joined',
  Paper = 'paper',
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type WalletQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type WalletQuery = {
  __typename?: 'Query';
  wallet?: Maybe<{
    __typename?: 'Wallet';
    id: string;
    address: any;
    paper: any;
    bags: Array<{
      __typename?: 'Bag';
      id: string;
      clothes: string;
      foot: string;
      hand: string;
      drugs: string;
      neck: string;
      ring: string;
      vehicle: string;
      waist: string;
      weapon: string;
      claimed: boolean;
    }>;
  }>;
};

export const WalletDocument = gql`
  query Wallet($id: ID!) {
    wallet(id: $id) {
      id
      address
      paper
      bags {
        id
        clothes
        foot
        hand
        drugs
        neck
        ring
        vehicle
        waist
        weapon
        claimed
      }
    }
  }
`;

/**
 * __useWalletQuery__
 *
 * To run a query within a React component, call `useWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWalletQuery(
  baseOptions: Apollo.QueryHookOptions<WalletQuery, WalletQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<WalletQuery, WalletQueryVariables>(WalletDocument, options);
}
export function useWalletLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<WalletQuery, WalletQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<WalletQuery, WalletQueryVariables>(WalletDocument, options);
}
export type WalletQueryHookResult = ReturnType<typeof useWalletQuery>;
export type WalletLazyQueryHookResult = ReturnType<typeof useWalletLazyQuery>;
export type WalletQueryResult = Apollo.QueryResult<WalletQuery, WalletQueryVariables>;
