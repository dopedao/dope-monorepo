import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  open_sea_asset?: Maybe<OpenSeaAsset>;
  opened: Scalars['Boolean'];
  rank: Scalars['Int'];
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
  opened?: Maybe<Scalars['Boolean']>;
  opened_in?: Maybe<Array<Scalars['Boolean']>>;
  opened_not?: Maybe<Scalars['Boolean']>;
  opened_not_in?: Maybe<Array<Scalars['Boolean']>>;
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
  Opened = 'opened',
  Ring = 'ring',
  Vehicle = 'vehicle',
  Waist = 'waist',
  Weapon = 'weapon'
}

export type Beard = {
  __typename?: 'Beard';
  id: Scalars['ID'];
  rle: Scalars['Bytes'];
};

export type Beard_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  rle?: Maybe<Scalars['Bytes']>;
  rle_contains?: Maybe<Scalars['Bytes']>;
  rle_in?: Maybe<Array<Scalars['Bytes']>>;
  rle_not?: Maybe<Scalars['Bytes']>;
  rle_not_contains?: Maybe<Scalars['Bytes']>;
  rle_not_in?: Maybe<Array<Scalars['Bytes']>>;
};

export enum Beard_OrderBy {
  Id = 'id',
  Rle = 'rle'
}

export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
  number_gte?: Maybe<Scalars['Int']>;
};

export type FemaleBody = {
  __typename?: 'FemaleBody';
  id: Scalars['ID'];
  rle: Scalars['Bytes'];
};

export type FemaleBody_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  rle?: Maybe<Scalars['Bytes']>;
  rle_contains?: Maybe<Scalars['Bytes']>;
  rle_in?: Maybe<Array<Scalars['Bytes']>>;
  rle_not?: Maybe<Scalars['Bytes']>;
  rle_not_contains?: Maybe<Scalars['Bytes']>;
  rle_not_in?: Maybe<Array<Scalars['Bytes']>>;
};

export enum FemaleBody_OrderBy {
  Id = 'id',
  Rle = 'rle'
}

export type FemaleHair = {
  __typename?: 'FemaleHair';
  id: Scalars['ID'];
  rle: Scalars['Bytes'];
};

export type FemaleHair_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  rle?: Maybe<Scalars['Bytes']>;
  rle_contains?: Maybe<Scalars['Bytes']>;
  rle_in?: Maybe<Array<Scalars['Bytes']>>;
  rle_not?: Maybe<Scalars['Bytes']>;
  rle_not_contains?: Maybe<Scalars['Bytes']>;
  rle_not_in?: Maybe<Array<Scalars['Bytes']>>;
};

export enum FemaleHair_OrderBy {
  Id = 'id',
  Rle = 'rle'
}

export type Hustler = {
  __typename?: 'Hustler';
  data: Scalars['String'];
  id: Scalars['ID'];
  owner: Wallet;
};

export type Hustler_Filter = {
  data?: Maybe<Scalars['String']>;
  data_contains?: Maybe<Scalars['String']>;
  data_ends_with?: Maybe<Scalars['String']>;
  data_gt?: Maybe<Scalars['String']>;
  data_gte?: Maybe<Scalars['String']>;
  data_in?: Maybe<Array<Scalars['String']>>;
  data_lt?: Maybe<Scalars['String']>;
  data_lte?: Maybe<Scalars['String']>;
  data_not?: Maybe<Scalars['String']>;
  data_not_contains?: Maybe<Scalars['String']>;
  data_not_ends_with?: Maybe<Scalars['String']>;
  data_not_in?: Maybe<Array<Scalars['String']>>;
  data_not_starts_with?: Maybe<Scalars['String']>;
  data_starts_with?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  owner?: Maybe<Scalars['String']>;
  owner_contains?: Maybe<Scalars['String']>;
  owner_ends_with?: Maybe<Scalars['String']>;
  owner_gt?: Maybe<Scalars['String']>;
  owner_gte?: Maybe<Scalars['String']>;
  owner_in?: Maybe<Array<Scalars['String']>>;
  owner_lt?: Maybe<Scalars['String']>;
  owner_lte?: Maybe<Scalars['String']>;
  owner_not?: Maybe<Scalars['String']>;
  owner_not_contains?: Maybe<Scalars['String']>;
  owner_not_ends_with?: Maybe<Scalars['String']>;
  owner_not_in?: Maybe<Array<Scalars['String']>>;
  owner_not_starts_with?: Maybe<Scalars['String']>;
  owner_starts_with?: Maybe<Scalars['String']>;
};

export enum Hustler_OrderBy {
  Data = 'data',
  Id = 'id',
  Owner = 'owner'
}

export type Item = {
  __typename?: 'Item';
  data: Scalars['String'];
  femaleRle: Scalars['Bytes'];
  id: Scalars['ID'];
  maleRle: Scalars['Bytes'];
  name: Scalars['String'];
};

export type ItemBalances = {
  __typename?: 'ItemBalances';
  balance: Scalars['BigInt'];
  id: Scalars['ID'];
  item: Item;
  wallet: Wallet;
};

export type ItemBalances_Filter = {
  balance?: Maybe<Scalars['BigInt']>;
  balance_gt?: Maybe<Scalars['BigInt']>;
  balance_gte?: Maybe<Scalars['BigInt']>;
  balance_in?: Maybe<Array<Scalars['BigInt']>>;
  balance_lt?: Maybe<Scalars['BigInt']>;
  balance_lte?: Maybe<Scalars['BigInt']>;
  balance_not?: Maybe<Scalars['BigInt']>;
  balance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  item?: Maybe<Scalars['String']>;
  item_contains?: Maybe<Scalars['String']>;
  item_ends_with?: Maybe<Scalars['String']>;
  item_gt?: Maybe<Scalars['String']>;
  item_gte?: Maybe<Scalars['String']>;
  item_in?: Maybe<Array<Scalars['String']>>;
  item_lt?: Maybe<Scalars['String']>;
  item_lte?: Maybe<Scalars['String']>;
  item_not?: Maybe<Scalars['String']>;
  item_not_contains?: Maybe<Scalars['String']>;
  item_not_ends_with?: Maybe<Scalars['String']>;
  item_not_in?: Maybe<Array<Scalars['String']>>;
  item_not_starts_with?: Maybe<Scalars['String']>;
  item_starts_with?: Maybe<Scalars['String']>;
  wallet?: Maybe<Scalars['String']>;
  wallet_contains?: Maybe<Scalars['String']>;
  wallet_ends_with?: Maybe<Scalars['String']>;
  wallet_gt?: Maybe<Scalars['String']>;
  wallet_gte?: Maybe<Scalars['String']>;
  wallet_in?: Maybe<Array<Scalars['String']>>;
  wallet_lt?: Maybe<Scalars['String']>;
  wallet_lte?: Maybe<Scalars['String']>;
  wallet_not?: Maybe<Scalars['String']>;
  wallet_not_contains?: Maybe<Scalars['String']>;
  wallet_not_ends_with?: Maybe<Scalars['String']>;
  wallet_not_in?: Maybe<Array<Scalars['String']>>;
  wallet_not_starts_with?: Maybe<Scalars['String']>;
  wallet_starts_with?: Maybe<Scalars['String']>;
};

export enum ItemBalances_OrderBy {
  Balance = 'balance',
  Id = 'id',
  Item = 'item',
  Wallet = 'wallet'
}

export type Item_Filter = {
  data?: Maybe<Scalars['String']>;
  data_contains?: Maybe<Scalars['String']>;
  data_ends_with?: Maybe<Scalars['String']>;
  data_gt?: Maybe<Scalars['String']>;
  data_gte?: Maybe<Scalars['String']>;
  data_in?: Maybe<Array<Scalars['String']>>;
  data_lt?: Maybe<Scalars['String']>;
  data_lte?: Maybe<Scalars['String']>;
  data_not?: Maybe<Scalars['String']>;
  data_not_contains?: Maybe<Scalars['String']>;
  data_not_ends_with?: Maybe<Scalars['String']>;
  data_not_in?: Maybe<Array<Scalars['String']>>;
  data_not_starts_with?: Maybe<Scalars['String']>;
  data_starts_with?: Maybe<Scalars['String']>;
  femaleRle?: Maybe<Scalars['Bytes']>;
  femaleRle_contains?: Maybe<Scalars['Bytes']>;
  femaleRle_in?: Maybe<Array<Scalars['Bytes']>>;
  femaleRle_not?: Maybe<Scalars['Bytes']>;
  femaleRle_not_contains?: Maybe<Scalars['Bytes']>;
  femaleRle_not_in?: Maybe<Array<Scalars['Bytes']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  maleRle?: Maybe<Scalars['Bytes']>;
  maleRle_contains?: Maybe<Scalars['Bytes']>;
  maleRle_in?: Maybe<Array<Scalars['Bytes']>>;
  maleRle_not?: Maybe<Scalars['Bytes']>;
  maleRle_not_contains?: Maybe<Scalars['Bytes']>;
  maleRle_not_in?: Maybe<Array<Scalars['Bytes']>>;
  name?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
};

export enum Item_OrderBy {
  Data = 'data',
  FemaleRle = 'femaleRle',
  Id = 'id',
  MaleRle = 'maleRle',
  Name = 'name'
}

export type MaleBody = {
  __typename?: 'MaleBody';
  id: Scalars['ID'];
  rle: Scalars['Bytes'];
};

export type MaleBody_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  rle?: Maybe<Scalars['Bytes']>;
  rle_contains?: Maybe<Scalars['Bytes']>;
  rle_in?: Maybe<Array<Scalars['Bytes']>>;
  rle_not?: Maybe<Scalars['Bytes']>;
  rle_not_contains?: Maybe<Scalars['Bytes']>;
  rle_not_in?: Maybe<Array<Scalars['Bytes']>>;
};

export enum MaleBody_OrderBy {
  Id = 'id',
  Rle = 'rle'
}

export type MaleHair = {
  __typename?: 'MaleHair';
  id: Scalars['ID'];
  rle: Scalars['Bytes'];
};

export type MaleHair_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  rle?: Maybe<Scalars['Bytes']>;
  rle_contains?: Maybe<Scalars['Bytes']>;
  rle_in?: Maybe<Array<Scalars['Bytes']>>;
  rle_not?: Maybe<Scalars['Bytes']>;
  rle_not_contains?: Maybe<Scalars['Bytes']>;
  rle_not_in?: Maybe<Array<Scalars['Bytes']>>;
};

export enum MaleHair_OrderBy {
  Id = 'id',
  Rle = 'rle'
}

export type OpenSeaAsset = {
  __typename?: 'OpenSeaAsset';
  current_sale_price?: Maybe<Scalars['Int']>;
  is_on_sale?: Maybe<Scalars['Boolean']>;
  last_sale_price?: Maybe<Scalars['Int']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bag?: Maybe<Bag>;
  bags: Array<Bag>;
  beard?: Maybe<Beard>;
  beards: Array<Beard>;
  femaleBodies: Array<FemaleBody>;
  femaleBody?: Maybe<FemaleBody>;
  femaleHair?: Maybe<FemaleHair>;
  femaleHairs: Array<FemaleHair>;
  hustler?: Maybe<Hustler>;
  hustlers: Array<Hustler>;
  item?: Maybe<Item>;
  itemBalances: Array<ItemBalances>;
  items: Array<Item>;
  maleBodies: Array<MaleBody>;
  maleBody?: Maybe<MaleBody>;
  maleHair?: Maybe<MaleHair>;
  maleHairs: Array<MaleHair>;
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
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBagsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bag_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Bag_Filter>;
};


export type QueryBeardArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBeardsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Beard_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Beard_Filter>;
};


export type QueryFemaleBodiesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FemaleBody_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<FemaleBody_Filter>;
};


export type QueryFemaleBodyArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFemaleHairArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFemaleHairsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FemaleHair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<FemaleHair_Filter>;
};


export type QueryHustlerArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHustlersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Hustler_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Hustler_Filter>;
};


export type QueryItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryItemBalancesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ItemBalances_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<ItemBalances_Filter>;
};


export type QueryItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Item_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Item_Filter>;
};


export type QueryMaleBodiesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MaleBody_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<MaleBody_Filter>;
};


export type QueryMaleBodyArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMaleHairArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMaleHairsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MaleHair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<MaleHair_Filter>;
};


export type QuerySearchArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  text: Scalars['String'];
};


export type QueryTransferArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransfersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transfer_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Transfer_Filter>;
};


export type QueryWalletArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWalletsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Wallet_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Wallet_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bag?: Maybe<Bag>;
  bags: Array<Bag>;
  beard?: Maybe<Beard>;
  beards: Array<Beard>;
  femaleBodies: Array<FemaleBody>;
  femaleBody?: Maybe<FemaleBody>;
  femaleHair?: Maybe<FemaleHair>;
  femaleHairs: Array<FemaleHair>;
  hustler?: Maybe<Hustler>;
  hustlers: Array<Hustler>;
  item?: Maybe<Item>;
  itemBalances: Array<ItemBalances>;
  items: Array<Item>;
  maleBodies: Array<MaleBody>;
  maleBody?: Maybe<MaleBody>;
  maleHair?: Maybe<MaleHair>;
  maleHairs: Array<MaleHair>;
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
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBagsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bag_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Bag_Filter>;
};


export type SubscriptionBeardArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBeardsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Beard_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Beard_Filter>;
};


export type SubscriptionFemaleBodiesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FemaleBody_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<FemaleBody_Filter>;
};


export type SubscriptionFemaleBodyArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFemaleHairArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFemaleHairsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FemaleHair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<FemaleHair_Filter>;
};


export type SubscriptionHustlerArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHustlersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Hustler_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Hustler_Filter>;
};


export type SubscriptionItemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionItemBalancesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ItemBalances_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<ItemBalances_Filter>;
};


export type SubscriptionItemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Item_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Item_Filter>;
};


export type SubscriptionMaleBodiesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MaleBody_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<MaleBody_Filter>;
};


export type SubscriptionMaleBodyArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMaleHairArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMaleHairsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MaleHair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<MaleHair_Filter>;
};


export type SubscriptionTransferArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransfersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transfer_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Transfer_Filter>;
};


export type SubscriptionWalletArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWalletsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Wallet_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
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
  TxHash = 'txHash'
}

export type Wallet = {
  __typename?: 'Wallet';
  address: Scalars['Bytes'];
  bags: Array<Bag>;
  bagsHeld: Scalars['BigInt'];
  hustlers: Array<Hustler>;
  id: Scalars['ID'];
  items: Array<ItemBalances>;
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


export type WalletHustlersArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Hustler_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Hustler_Filter>;
};


export type WalletItemsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ItemBalances_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<ItemBalances_Filter>;
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
  Hustlers = 'hustlers',
  Id = 'id',
  Items = 'items',
  Joined = 'joined',
  Paper = 'paper'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** The minimum block number */
  number_gte: Scalars['Int'];
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
  Deny = 'deny'
}

export type AllHustlersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllHustlersQuery = { __typename?: 'Query', hustlers: Array<{ __typename?: 'Hustler', id: string, data: string }> };

export type AllOpenedBagsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllOpenedBagsQuery = { __typename?: 'Query', page_1: Array<{ __typename?: 'Bag', opened: boolean, id: string }>, page_2: Array<{ __typename?: 'Bag', opened: boolean, id: string }>, page_3: Array<{ __typename?: 'Bag', opened: boolean, id: string }>, page_4: Array<{ __typename?: 'Bag', opened: boolean, id: string }>, page_5: Array<{ __typename?: 'Bag', opened: boolean, id: string }>, page_6: Array<{ __typename?: 'Bag', opened: boolean, id: string }> };

export type AllUnclaimedBagsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUnclaimedBagsQuery = { __typename?: 'Query', page_1: Array<{ __typename?: 'Bag', claimed: boolean, id: string }>, page_2: Array<{ __typename?: 'Bag', claimed: boolean, id: string }>, page_3: Array<{ __typename?: 'Bag', claimed: boolean, id: string }> };

export type BagQueryVariables = Exact<{
  tokenId: Scalars['ID'];
}>;


export type BagQuery = { __typename?: 'Query', bag?: Maybe<{ __typename?: 'Bag', id: string, claimed: boolean, opened: boolean, open_sea_asset?: Maybe<{ __typename?: 'OpenSeaAsset', is_on_sale?: Maybe<boolean>, current_sale_price?: Maybe<number>, last_sale_price?: Maybe<number> }> }> };

export type BagsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;


export type BagsQuery = { __typename?: 'Query', bags: Array<{ __typename?: 'Bag', claimed: boolean, opened: boolean, id: string, clothes: string, foot: string, hand: string, drugs: string, neck: string, ring: string, vehicle: string, waist: string, weapon: string, rank: number, open_sea_asset?: Maybe<{ __typename?: 'OpenSeaAsset', is_on_sale?: Maybe<boolean>, current_sale_price?: Maybe<number>, last_sale_price?: Maybe<number> }> }> };

export type HustlersWalletQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type HustlersWalletQuery = { __typename?: 'Query', wallet?: Maybe<{ __typename?: 'Wallet', id: string, address: any, hustlers: Array<{ __typename?: 'Hustler', id: string, data: string }> }> };

export type SearchQueryVariables = Exact<{
  text: Scalars['String'];
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;


export type SearchQuery = { __typename?: 'Query', search: Array<{ __typename?: 'Bag', id: string, clothes: string, foot: string, hand: string, drugs: string, neck: string, ring: string, vehicle: string, waist: string, weapon: string, claimed: boolean, opened: boolean }> };

export type WalletQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WalletQuery = { __typename?: 'Query', wallet?: Maybe<{ __typename?: 'Wallet', id: string, address: any, paper: any, bags: Array<{ __typename?: 'Bag', claimed: boolean, id: string, opened: boolean, clothes: string, foot: string, hand: string, drugs: string, neck: string, ring: string, vehicle: string, waist: string, weapon: string, rank: number }> }> };


export const AllHustlersDocument = gql`
    query AllHustlers {
  hustlers(first: 1000) {
    id
    data
  }
}
    `;

/**
 * __useAllHustlersQuery__
 *
 * To run a query within a React component, call `useAllHustlersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllHustlersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllHustlersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllHustlersQuery(baseOptions?: Apollo.QueryHookOptions<AllHustlersQuery, AllHustlersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllHustlersQuery, AllHustlersQueryVariables>(AllHustlersDocument, options);
      }
export function useAllHustlersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllHustlersQuery, AllHustlersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllHustlersQuery, AllHustlersQueryVariables>(AllHustlersDocument, options);
        }
export type AllHustlersQueryHookResult = ReturnType<typeof useAllHustlersQuery>;
export type AllHustlersLazyQueryHookResult = ReturnType<typeof useAllHustlersLazyQuery>;
export type AllHustlersQueryResult = Apollo.QueryResult<AllHustlersQuery, AllHustlersQueryVariables>;
export const AllOpenedBagsDocument = gql`
    query AllOpenedBags {
  page_1: bags(first: 1000, skip: 0, where: {opened: true}) {
    opened
    id
  }
  page_2: bags(first: 1000, skip: 1000, where: {opened: true}) {
    opened
    id
  }
  page_3: bags(first: 1000, skip: 2000, where: {opened: true}) {
    opened
    id
  }
  page_4: bags(first: 1000, skip: 3000, where: {opened: true}) {
    opened
    id
  }
  page_5: bags(first: 1000, skip: 4000, where: {opened: true}) {
    opened
    id
  }
  page_6: bags(first: 1000, skip: 5000, where: {opened: true}) {
    opened
    id
  }
}
    `;

/**
 * __useAllOpenedBagsQuery__
 *
 * To run a query within a React component, call `useAllOpenedBagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllOpenedBagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllOpenedBagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllOpenedBagsQuery(baseOptions?: Apollo.QueryHookOptions<AllOpenedBagsQuery, AllOpenedBagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllOpenedBagsQuery, AllOpenedBagsQueryVariables>(AllOpenedBagsDocument, options);
      }
export function useAllOpenedBagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllOpenedBagsQuery, AllOpenedBagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllOpenedBagsQuery, AllOpenedBagsQueryVariables>(AllOpenedBagsDocument, options);
        }
export type AllOpenedBagsQueryHookResult = ReturnType<typeof useAllOpenedBagsQuery>;
export type AllOpenedBagsLazyQueryHookResult = ReturnType<typeof useAllOpenedBagsLazyQuery>;
export type AllOpenedBagsQueryResult = Apollo.QueryResult<AllOpenedBagsQuery, AllOpenedBagsQueryVariables>;
export const AllUnclaimedBagsDocument = gql`
    query AllUnclaimedBags {
  page_1: bags(first: 1000, skip: 0, where: {claimed: false}) {
    claimed
    id
  }
  page_2: bags(first: 1000, skip: 1000, where: {claimed: false}) {
    claimed
    id
  }
  page_3: bags(first: 1000, skip: 2000, where: {claimed: false}) {
    claimed
    id
  }
}
    `;

/**
 * __useAllUnclaimedBagsQuery__
 *
 * To run a query within a React component, call `useAllUnclaimedBagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUnclaimedBagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUnclaimedBagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUnclaimedBagsQuery(baseOptions?: Apollo.QueryHookOptions<AllUnclaimedBagsQuery, AllUnclaimedBagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUnclaimedBagsQuery, AllUnclaimedBagsQueryVariables>(AllUnclaimedBagsDocument, options);
      }
export function useAllUnclaimedBagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUnclaimedBagsQuery, AllUnclaimedBagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUnclaimedBagsQuery, AllUnclaimedBagsQueryVariables>(AllUnclaimedBagsDocument, options);
        }
export type AllUnclaimedBagsQueryHookResult = ReturnType<typeof useAllUnclaimedBagsQuery>;
export type AllUnclaimedBagsLazyQueryHookResult = ReturnType<typeof useAllUnclaimedBagsLazyQuery>;
export type AllUnclaimedBagsQueryResult = Apollo.QueryResult<AllUnclaimedBagsQuery, AllUnclaimedBagsQueryVariables>;
export const BagDocument = gql`
    query Bag($tokenId: ID!) {
  bag(id: $tokenId) {
    id
    claimed
    opened
    open_sea_asset @client {
      is_on_sale
      current_sale_price
      last_sale_price
    }
  }
}
    `;

/**
 * __useBagQuery__
 *
 * To run a query within a React component, call `useBagQuery` and pass it any options that fit your needs.
 * When your component renders, `useBagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBagQuery({
 *   variables: {
 *      tokenId: // value for 'tokenId'
 *   },
 * });
 */
export function useBagQuery(baseOptions: Apollo.QueryHookOptions<BagQuery, BagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BagQuery, BagQueryVariables>(BagDocument, options);
      }
export function useBagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BagQuery, BagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BagQuery, BagQueryVariables>(BagDocument, options);
        }
export type BagQueryHookResult = ReturnType<typeof useBagQuery>;
export type BagLazyQueryHookResult = ReturnType<typeof useBagLazyQuery>;
export type BagQueryResult = Apollo.QueryResult<BagQuery, BagQueryVariables>;
export const BagsDocument = gql`
    query Bags($first: Int, $skip: Int) {
  bags(first: $first, skip: $skip) {
    claimed
    opened
    id
    clothes @client
    foot @client
    hand @client
    drugs @client
    neck @client
    ring @client
    vehicle @client
    waist @client
    weapon @client
    rank @client
    open_sea_asset @client {
      is_on_sale
      current_sale_price
      last_sale_price
    }
  }
}
    `;

/**
 * __useBagsQuery__
 *
 * To run a query within a React component, call `useBagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBagsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useBagsQuery(baseOptions?: Apollo.QueryHookOptions<BagsQuery, BagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BagsQuery, BagsQueryVariables>(BagsDocument, options);
      }
export function useBagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BagsQuery, BagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BagsQuery, BagsQueryVariables>(BagsDocument, options);
        }
export type BagsQueryHookResult = ReturnType<typeof useBagsQuery>;
export type BagsLazyQueryHookResult = ReturnType<typeof useBagsLazyQuery>;
export type BagsQueryResult = Apollo.QueryResult<BagsQuery, BagsQueryVariables>;
export const HustlersWalletDocument = gql`
    query HustlersWallet($id: ID!) {
  wallet(id: $id) {
    id
    address
    hustlers(first: 50) {
      id
      data
    }
  }
}
    `;

/**
 * __useHustlersWalletQuery__
 *
 * To run a query within a React component, call `useHustlersWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useHustlersWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHustlersWalletQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHustlersWalletQuery(baseOptions: Apollo.QueryHookOptions<HustlersWalletQuery, HustlersWalletQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HustlersWalletQuery, HustlersWalletQueryVariables>(HustlersWalletDocument, options);
      }
export function useHustlersWalletLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HustlersWalletQuery, HustlersWalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HustlersWalletQuery, HustlersWalletQueryVariables>(HustlersWalletDocument, options);
        }
export type HustlersWalletQueryHookResult = ReturnType<typeof useHustlersWalletQuery>;
export type HustlersWalletLazyQueryHookResult = ReturnType<typeof useHustlersWalletLazyQuery>;
export type HustlersWalletQueryResult = Apollo.QueryResult<HustlersWalletQuery, HustlersWalletQueryVariables>;
export const SearchDocument = gql`
    query Search($text: String!, $first: Int, $skip: Int) {
  search(text: $text, first: $first, skip: $skip) {
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
    opened
  }
}
    `;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      text: // value for 'text'
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export const WalletDocument = gql`
    query Wallet($id: ID!) {
  wallet(id: $id) {
    id
    address
    paper
    bags(first: 200) {
      claimed
      id
      opened
      clothes @client
      foot @client
      hand @client
      drugs @client
      neck @client
      ring @client
      vehicle @client
      waist @client
      weapon @client
      rank @client
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
export function useWalletQuery(baseOptions: Apollo.QueryHookOptions<WalletQuery, WalletQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WalletQuery, WalletQueryVariables>(WalletDocument, options);
      }
export function useWalletLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WalletQuery, WalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WalletQuery, WalletQueryVariables>(WalletDocument, options);
        }
export type WalletQueryHookResult = ReturnType<typeof useWalletQuery>;
export type WalletLazyQueryHookResult = ReturnType<typeof useWalletLazyQuery>;
export type WalletQueryResult = Apollo.QueryResult<WalletQuery, WalletQueryVariables>;