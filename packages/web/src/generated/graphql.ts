import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
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

export type Attribute = {
  __typename?: 'Attribute';
  displayType: Scalars['String'];
  hustler: Hustler;
  id: Scalars['ID'];
  traitType: Scalars['String'];
  value: Scalars['String'];
};

export type Attribute_Filter = {
  displayType?: InputMaybe<Scalars['String']>;
  displayType_contains?: InputMaybe<Scalars['String']>;
  displayType_ends_with?: InputMaybe<Scalars['String']>;
  displayType_gt?: InputMaybe<Scalars['String']>;
  displayType_gte?: InputMaybe<Scalars['String']>;
  displayType_in?: InputMaybe<Array<Scalars['String']>>;
  displayType_lt?: InputMaybe<Scalars['String']>;
  displayType_lte?: InputMaybe<Scalars['String']>;
  displayType_not?: InputMaybe<Scalars['String']>;
  displayType_not_contains?: InputMaybe<Scalars['String']>;
  displayType_not_ends_with?: InputMaybe<Scalars['String']>;
  displayType_not_in?: InputMaybe<Array<Scalars['String']>>;
  displayType_not_starts_with?: InputMaybe<Scalars['String']>;
  displayType_starts_with?: InputMaybe<Scalars['String']>;
  hustler?: InputMaybe<Scalars['String']>;
  hustler_contains?: InputMaybe<Scalars['String']>;
  hustler_ends_with?: InputMaybe<Scalars['String']>;
  hustler_gt?: InputMaybe<Scalars['String']>;
  hustler_gte?: InputMaybe<Scalars['String']>;
  hustler_in?: InputMaybe<Array<Scalars['String']>>;
  hustler_lt?: InputMaybe<Scalars['String']>;
  hustler_lte?: InputMaybe<Scalars['String']>;
  hustler_not?: InputMaybe<Scalars['String']>;
  hustler_not_contains?: InputMaybe<Scalars['String']>;
  hustler_not_ends_with?: InputMaybe<Scalars['String']>;
  hustler_not_in?: InputMaybe<Array<Scalars['String']>>;
  hustler_not_starts_with?: InputMaybe<Scalars['String']>;
  hustler_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  traitType?: InputMaybe<Scalars['String']>;
  traitType_contains?: InputMaybe<Scalars['String']>;
  traitType_ends_with?: InputMaybe<Scalars['String']>;
  traitType_gt?: InputMaybe<Scalars['String']>;
  traitType_gte?: InputMaybe<Scalars['String']>;
  traitType_in?: InputMaybe<Array<Scalars['String']>>;
  traitType_lt?: InputMaybe<Scalars['String']>;
  traitType_lte?: InputMaybe<Scalars['String']>;
  traitType_not?: InputMaybe<Scalars['String']>;
  traitType_not_contains?: InputMaybe<Scalars['String']>;
  traitType_not_ends_with?: InputMaybe<Scalars['String']>;
  traitType_not_in?: InputMaybe<Array<Scalars['String']>>;
  traitType_not_starts_with?: InputMaybe<Scalars['String']>;
  traitType_starts_with?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
  value_contains?: InputMaybe<Scalars['String']>;
  value_ends_with?: InputMaybe<Scalars['String']>;
  value_gt?: InputMaybe<Scalars['String']>;
  value_gte?: InputMaybe<Scalars['String']>;
  value_in?: InputMaybe<Array<Scalars['String']>>;
  value_lt?: InputMaybe<Scalars['String']>;
  value_lte?: InputMaybe<Scalars['String']>;
  value_not?: InputMaybe<Scalars['String']>;
  value_not_contains?: InputMaybe<Scalars['String']>;
  value_not_ends_with?: InputMaybe<Scalars['String']>;
  value_not_in?: InputMaybe<Array<Scalars['String']>>;
  value_not_starts_with?: InputMaybe<Scalars['String']>;
  value_starts_with?: InputMaybe<Scalars['String']>;
};

export enum Attribute_OrderBy {
  DisplayType = 'displayType',
  Hustler = 'hustler',
  Id = 'id',
  TraitType = 'traitType',
  Value = 'value'
}

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
  ring: Scalars['String'];
  vehicle: Scalars['String'];
  waist: Scalars['String'];
  weapon: Scalars['String'];
};

export type Bag_Filter = {
  claimed?: InputMaybe<Scalars['Boolean']>;
  claimed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  claimed_not?: InputMaybe<Scalars['Boolean']>;
  claimed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  clothes?: InputMaybe<Scalars['String']>;
  clothes_contains?: InputMaybe<Scalars['String']>;
  clothes_ends_with?: InputMaybe<Scalars['String']>;
  clothes_gt?: InputMaybe<Scalars['String']>;
  clothes_gte?: InputMaybe<Scalars['String']>;
  clothes_in?: InputMaybe<Array<Scalars['String']>>;
  clothes_lt?: InputMaybe<Scalars['String']>;
  clothes_lte?: InputMaybe<Scalars['String']>;
  clothes_not?: InputMaybe<Scalars['String']>;
  clothes_not_contains?: InputMaybe<Scalars['String']>;
  clothes_not_ends_with?: InputMaybe<Scalars['String']>;
  clothes_not_in?: InputMaybe<Array<Scalars['String']>>;
  clothes_not_starts_with?: InputMaybe<Scalars['String']>;
  clothes_starts_with?: InputMaybe<Scalars['String']>;
  currentOwner?: InputMaybe<Scalars['String']>;
  currentOwner_contains?: InputMaybe<Scalars['String']>;
  currentOwner_ends_with?: InputMaybe<Scalars['String']>;
  currentOwner_gt?: InputMaybe<Scalars['String']>;
  currentOwner_gte?: InputMaybe<Scalars['String']>;
  currentOwner_in?: InputMaybe<Array<Scalars['String']>>;
  currentOwner_lt?: InputMaybe<Scalars['String']>;
  currentOwner_lte?: InputMaybe<Scalars['String']>;
  currentOwner_not?: InputMaybe<Scalars['String']>;
  currentOwner_not_contains?: InputMaybe<Scalars['String']>;
  currentOwner_not_ends_with?: InputMaybe<Scalars['String']>;
  currentOwner_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentOwner_not_starts_with?: InputMaybe<Scalars['String']>;
  currentOwner_starts_with?: InputMaybe<Scalars['String']>;
  drugs?: InputMaybe<Scalars['String']>;
  drugs_contains?: InputMaybe<Scalars['String']>;
  drugs_ends_with?: InputMaybe<Scalars['String']>;
  drugs_gt?: InputMaybe<Scalars['String']>;
  drugs_gte?: InputMaybe<Scalars['String']>;
  drugs_in?: InputMaybe<Array<Scalars['String']>>;
  drugs_lt?: InputMaybe<Scalars['String']>;
  drugs_lte?: InputMaybe<Scalars['String']>;
  drugs_not?: InputMaybe<Scalars['String']>;
  drugs_not_contains?: InputMaybe<Scalars['String']>;
  drugs_not_ends_with?: InputMaybe<Scalars['String']>;
  drugs_not_in?: InputMaybe<Array<Scalars['String']>>;
  drugs_not_starts_with?: InputMaybe<Scalars['String']>;
  drugs_starts_with?: InputMaybe<Scalars['String']>;
  foot?: InputMaybe<Scalars['String']>;
  foot_contains?: InputMaybe<Scalars['String']>;
  foot_ends_with?: InputMaybe<Scalars['String']>;
  foot_gt?: InputMaybe<Scalars['String']>;
  foot_gte?: InputMaybe<Scalars['String']>;
  foot_in?: InputMaybe<Array<Scalars['String']>>;
  foot_lt?: InputMaybe<Scalars['String']>;
  foot_lte?: InputMaybe<Scalars['String']>;
  foot_not?: InputMaybe<Scalars['String']>;
  foot_not_contains?: InputMaybe<Scalars['String']>;
  foot_not_ends_with?: InputMaybe<Scalars['String']>;
  foot_not_in?: InputMaybe<Array<Scalars['String']>>;
  foot_not_starts_with?: InputMaybe<Scalars['String']>;
  foot_starts_with?: InputMaybe<Scalars['String']>;
  hand?: InputMaybe<Scalars['String']>;
  hand_contains?: InputMaybe<Scalars['String']>;
  hand_ends_with?: InputMaybe<Scalars['String']>;
  hand_gt?: InputMaybe<Scalars['String']>;
  hand_gte?: InputMaybe<Scalars['String']>;
  hand_in?: InputMaybe<Array<Scalars['String']>>;
  hand_lt?: InputMaybe<Scalars['String']>;
  hand_lte?: InputMaybe<Scalars['String']>;
  hand_not?: InputMaybe<Scalars['String']>;
  hand_not_contains?: InputMaybe<Scalars['String']>;
  hand_not_ends_with?: InputMaybe<Scalars['String']>;
  hand_not_in?: InputMaybe<Array<Scalars['String']>>;
  hand_not_starts_with?: InputMaybe<Scalars['String']>;
  hand_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  minted?: InputMaybe<Scalars['BigInt']>;
  minted_gt?: InputMaybe<Scalars['BigInt']>;
  minted_gte?: InputMaybe<Scalars['BigInt']>;
  minted_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minted_lt?: InputMaybe<Scalars['BigInt']>;
  minted_lte?: InputMaybe<Scalars['BigInt']>;
  minted_not?: InputMaybe<Scalars['BigInt']>;
  minted_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  neck?: InputMaybe<Scalars['String']>;
  neck_contains?: InputMaybe<Scalars['String']>;
  neck_ends_with?: InputMaybe<Scalars['String']>;
  neck_gt?: InputMaybe<Scalars['String']>;
  neck_gte?: InputMaybe<Scalars['String']>;
  neck_in?: InputMaybe<Array<Scalars['String']>>;
  neck_lt?: InputMaybe<Scalars['String']>;
  neck_lte?: InputMaybe<Scalars['String']>;
  neck_not?: InputMaybe<Scalars['String']>;
  neck_not_contains?: InputMaybe<Scalars['String']>;
  neck_not_ends_with?: InputMaybe<Scalars['String']>;
  neck_not_in?: InputMaybe<Array<Scalars['String']>>;
  neck_not_starts_with?: InputMaybe<Scalars['String']>;
  neck_starts_with?: InputMaybe<Scalars['String']>;
  opened?: InputMaybe<Scalars['Boolean']>;
  opened_in?: InputMaybe<Array<Scalars['Boolean']>>;
  opened_not?: InputMaybe<Scalars['Boolean']>;
  opened_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  ring?: InputMaybe<Scalars['String']>;
  ring_contains?: InputMaybe<Scalars['String']>;
  ring_ends_with?: InputMaybe<Scalars['String']>;
  ring_gt?: InputMaybe<Scalars['String']>;
  ring_gte?: InputMaybe<Scalars['String']>;
  ring_in?: InputMaybe<Array<Scalars['String']>>;
  ring_lt?: InputMaybe<Scalars['String']>;
  ring_lte?: InputMaybe<Scalars['String']>;
  ring_not?: InputMaybe<Scalars['String']>;
  ring_not_contains?: InputMaybe<Scalars['String']>;
  ring_not_ends_with?: InputMaybe<Scalars['String']>;
  ring_not_in?: InputMaybe<Array<Scalars['String']>>;
  ring_not_starts_with?: InputMaybe<Scalars['String']>;
  ring_starts_with?: InputMaybe<Scalars['String']>;
  vehicle?: InputMaybe<Scalars['String']>;
  vehicle_contains?: InputMaybe<Scalars['String']>;
  vehicle_ends_with?: InputMaybe<Scalars['String']>;
  vehicle_gt?: InputMaybe<Scalars['String']>;
  vehicle_gte?: InputMaybe<Scalars['String']>;
  vehicle_in?: InputMaybe<Array<Scalars['String']>>;
  vehicle_lt?: InputMaybe<Scalars['String']>;
  vehicle_lte?: InputMaybe<Scalars['String']>;
  vehicle_not?: InputMaybe<Scalars['String']>;
  vehicle_not_contains?: InputMaybe<Scalars['String']>;
  vehicle_not_ends_with?: InputMaybe<Scalars['String']>;
  vehicle_not_in?: InputMaybe<Array<Scalars['String']>>;
  vehicle_not_starts_with?: InputMaybe<Scalars['String']>;
  vehicle_starts_with?: InputMaybe<Scalars['String']>;
  waist?: InputMaybe<Scalars['String']>;
  waist_contains?: InputMaybe<Scalars['String']>;
  waist_ends_with?: InputMaybe<Scalars['String']>;
  waist_gt?: InputMaybe<Scalars['String']>;
  waist_gte?: InputMaybe<Scalars['String']>;
  waist_in?: InputMaybe<Array<Scalars['String']>>;
  waist_lt?: InputMaybe<Scalars['String']>;
  waist_lte?: InputMaybe<Scalars['String']>;
  waist_not?: InputMaybe<Scalars['String']>;
  waist_not_contains?: InputMaybe<Scalars['String']>;
  waist_not_ends_with?: InputMaybe<Scalars['String']>;
  waist_not_in?: InputMaybe<Array<Scalars['String']>>;
  waist_not_starts_with?: InputMaybe<Scalars['String']>;
  waist_starts_with?: InputMaybe<Scalars['String']>;
  weapon?: InputMaybe<Scalars['String']>;
  weapon_contains?: InputMaybe<Scalars['String']>;
  weapon_ends_with?: InputMaybe<Scalars['String']>;
  weapon_gt?: InputMaybe<Scalars['String']>;
  weapon_gte?: InputMaybe<Scalars['String']>;
  weapon_in?: InputMaybe<Array<Scalars['String']>>;
  weapon_lt?: InputMaybe<Scalars['String']>;
  weapon_lte?: InputMaybe<Scalars['String']>;
  weapon_not?: InputMaybe<Scalars['String']>;
  weapon_not_contains?: InputMaybe<Scalars['String']>;
  weapon_not_ends_with?: InputMaybe<Scalars['String']>;
  weapon_not_in?: InputMaybe<Array<Scalars['String']>>;
  weapon_not_starts_with?: InputMaybe<Scalars['String']>;
  weapon_starts_with?: InputMaybe<Scalars['String']>;
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
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  rle?: InputMaybe<Scalars['Bytes']>;
  rle_contains?: InputMaybe<Scalars['Bytes']>;
  rle_in?: InputMaybe<Array<Scalars['Bytes']>>;
  rle_not?: InputMaybe<Scalars['Bytes']>;
  rle_not_contains?: InputMaybe<Scalars['Bytes']>;
  rle_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Beard_OrderBy {
  Id = 'id',
  Rle = 'rle'
}

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type FemaleBody = {
  __typename?: 'FemaleBody';
  id: Scalars['ID'];
  rle: Scalars['Bytes'];
};

export type FemaleBody_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  rle?: InputMaybe<Scalars['Bytes']>;
  rle_contains?: InputMaybe<Scalars['Bytes']>;
  rle_in?: InputMaybe<Array<Scalars['Bytes']>>;
  rle_not?: InputMaybe<Scalars['Bytes']>;
  rle_not_contains?: InputMaybe<Scalars['Bytes']>;
  rle_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
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
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  rle?: InputMaybe<Scalars['Bytes']>;
  rle_contains?: InputMaybe<Scalars['Bytes']>;
  rle_in?: InputMaybe<Array<Scalars['Bytes']>>;
  rle_not?: InputMaybe<Scalars['Bytes']>;
  rle_not_contains?: InputMaybe<Scalars['Bytes']>;
  rle_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum FemaleHair_OrderBy {
  Id = 'id',
  Rle = 'rle'
}

export type Hustler = {
  __typename?: 'Hustler';
  attributes: Array<Attribute>;
  data: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
  owner: Wallet;
};


export type HustlerAttributesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Attribute_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Attribute_Filter>;
};

export type Hustler_Filter = {
  data?: InputMaybe<Scalars['String']>;
  data_contains?: InputMaybe<Scalars['String']>;
  data_ends_with?: InputMaybe<Scalars['String']>;
  data_gt?: InputMaybe<Scalars['String']>;
  data_gte?: InputMaybe<Scalars['String']>;
  data_in?: InputMaybe<Array<Scalars['String']>>;
  data_lt?: InputMaybe<Scalars['String']>;
  data_lte?: InputMaybe<Scalars['String']>;
  data_not?: InputMaybe<Scalars['String']>;
  data_not_contains?: InputMaybe<Scalars['String']>;
  data_not_ends_with?: InputMaybe<Scalars['String']>;
  data_not_in?: InputMaybe<Array<Scalars['String']>>;
  data_not_starts_with?: InputMaybe<Scalars['String']>;
  data_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  image?: InputMaybe<Scalars['String']>;
  image_contains?: InputMaybe<Scalars['String']>;
  image_ends_with?: InputMaybe<Scalars['String']>;
  image_gt?: InputMaybe<Scalars['String']>;
  image_gte?: InputMaybe<Scalars['String']>;
  image_in?: InputMaybe<Array<Scalars['String']>>;
  image_lt?: InputMaybe<Scalars['String']>;
  image_lte?: InputMaybe<Scalars['String']>;
  image_not?: InputMaybe<Scalars['String']>;
  image_not_contains?: InputMaybe<Scalars['String']>;
  image_not_ends_with?: InputMaybe<Scalars['String']>;
  image_not_in?: InputMaybe<Array<Scalars['String']>>;
  image_not_starts_with?: InputMaybe<Scalars['String']>;
  image_starts_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
};

export enum Hustler_OrderBy {
  Attributes = 'attributes',
  Data = 'data',
  Id = 'id',
  Image = 'image',
  Name = 'name',
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
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  item?: InputMaybe<Scalars['String']>;
  item_contains?: InputMaybe<Scalars['String']>;
  item_ends_with?: InputMaybe<Scalars['String']>;
  item_gt?: InputMaybe<Scalars['String']>;
  item_gte?: InputMaybe<Scalars['String']>;
  item_in?: InputMaybe<Array<Scalars['String']>>;
  item_lt?: InputMaybe<Scalars['String']>;
  item_lte?: InputMaybe<Scalars['String']>;
  item_not?: InputMaybe<Scalars['String']>;
  item_not_contains?: InputMaybe<Scalars['String']>;
  item_not_ends_with?: InputMaybe<Scalars['String']>;
  item_not_in?: InputMaybe<Array<Scalars['String']>>;
  item_not_starts_with?: InputMaybe<Scalars['String']>;
  item_starts_with?: InputMaybe<Scalars['String']>;
  wallet?: InputMaybe<Scalars['String']>;
  wallet_contains?: InputMaybe<Scalars['String']>;
  wallet_ends_with?: InputMaybe<Scalars['String']>;
  wallet_gt?: InputMaybe<Scalars['String']>;
  wallet_gte?: InputMaybe<Scalars['String']>;
  wallet_in?: InputMaybe<Array<Scalars['String']>>;
  wallet_lt?: InputMaybe<Scalars['String']>;
  wallet_lte?: InputMaybe<Scalars['String']>;
  wallet_not?: InputMaybe<Scalars['String']>;
  wallet_not_contains?: InputMaybe<Scalars['String']>;
  wallet_not_ends_with?: InputMaybe<Scalars['String']>;
  wallet_not_in?: InputMaybe<Array<Scalars['String']>>;
  wallet_not_starts_with?: InputMaybe<Scalars['String']>;
  wallet_starts_with?: InputMaybe<Scalars['String']>;
};

export enum ItemBalances_OrderBy {
  Balance = 'balance',
  Id = 'id',
  Item = 'item',
  Wallet = 'wallet'
}

export type Item_Filter = {
  data?: InputMaybe<Scalars['String']>;
  data_contains?: InputMaybe<Scalars['String']>;
  data_ends_with?: InputMaybe<Scalars['String']>;
  data_gt?: InputMaybe<Scalars['String']>;
  data_gte?: InputMaybe<Scalars['String']>;
  data_in?: InputMaybe<Array<Scalars['String']>>;
  data_lt?: InputMaybe<Scalars['String']>;
  data_lte?: InputMaybe<Scalars['String']>;
  data_not?: InputMaybe<Scalars['String']>;
  data_not_contains?: InputMaybe<Scalars['String']>;
  data_not_ends_with?: InputMaybe<Scalars['String']>;
  data_not_in?: InputMaybe<Array<Scalars['String']>>;
  data_not_starts_with?: InputMaybe<Scalars['String']>;
  data_starts_with?: InputMaybe<Scalars['String']>;
  femaleRle?: InputMaybe<Scalars['Bytes']>;
  femaleRle_contains?: InputMaybe<Scalars['Bytes']>;
  femaleRle_in?: InputMaybe<Array<Scalars['Bytes']>>;
  femaleRle_not?: InputMaybe<Scalars['Bytes']>;
  femaleRle_not_contains?: InputMaybe<Scalars['Bytes']>;
  femaleRle_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  maleRle?: InputMaybe<Scalars['Bytes']>;
  maleRle_contains?: InputMaybe<Scalars['Bytes']>;
  maleRle_in?: InputMaybe<Array<Scalars['Bytes']>>;
  maleRle_not?: InputMaybe<Scalars['Bytes']>;
  maleRle_not_contains?: InputMaybe<Scalars['Bytes']>;
  maleRle_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
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
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  rle?: InputMaybe<Scalars['Bytes']>;
  rle_contains?: InputMaybe<Scalars['Bytes']>;
  rle_in?: InputMaybe<Array<Scalars['Bytes']>>;
  rle_not?: InputMaybe<Scalars['Bytes']>;
  rle_not_contains?: InputMaybe<Scalars['Bytes']>;
  rle_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
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
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  rle?: InputMaybe<Scalars['Bytes']>;
  rle_contains?: InputMaybe<Scalars['Bytes']>;
  rle_in?: InputMaybe<Array<Scalars['Bytes']>>;
  rle_not?: InputMaybe<Scalars['Bytes']>;
  rle_not_contains?: InputMaybe<Scalars['Bytes']>;
  rle_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
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
  attribute?: Maybe<Attribute>;
  attributes: Array<Attribute>;
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
  block?: InputMaybe<Block_Height>;
};


export type QueryAttributeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAttributesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Attribute_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Attribute_Filter>;
};


export type QueryBagArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBagsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bag_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bag_Filter>;
};


export type QueryBeardArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBeardsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Beard_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Beard_Filter>;
};


export type QueryFemaleBodiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FemaleBody_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FemaleBody_Filter>;
};


export type QueryFemaleBodyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFemaleHairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFemaleHairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FemaleHair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FemaleHair_Filter>;
};


export type QueryHustlerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHustlersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hustler_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Hustler_Filter>;
};


export type QueryItemArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryItemBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ItemBalances_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ItemBalances_Filter>;
};


export type QueryItemsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Item_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Item_Filter>;
};


export type QueryMaleBodiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MaleBody_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MaleBody_Filter>;
};


export type QueryMaleBodyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMaleHairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMaleHairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MaleHair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MaleHair_Filter>;
};


export type QuerySearchArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  text: Scalars['String'];
};


export type QueryTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transfer_Filter>;
};


export type QueryWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wallet_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  attribute?: Maybe<Attribute>;
  attributes: Array<Attribute>;
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
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAttributeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAttributesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Attribute_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Attribute_Filter>;
};


export type SubscriptionBagArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBagsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bag_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bag_Filter>;
};


export type SubscriptionBeardArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBeardsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Beard_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Beard_Filter>;
};


export type SubscriptionFemaleBodiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FemaleBody_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FemaleBody_Filter>;
};


export type SubscriptionFemaleBodyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFemaleHairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFemaleHairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FemaleHair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FemaleHair_Filter>;
};


export type SubscriptionHustlerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHustlersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hustler_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Hustler_Filter>;
};


export type SubscriptionItemArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionItemBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ItemBalances_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ItemBalances_Filter>;
};


export type SubscriptionItemsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Item_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Item_Filter>;
};


export type SubscriptionMaleBodiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MaleBody_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MaleBody_Filter>;
};


export type SubscriptionMaleBodyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMaleHairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMaleHairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MaleHair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MaleHair_Filter>;
};


export type SubscriptionTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transfer_Filter>;
};


export type SubscriptionWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wallet_Filter>;
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
  bag?: InputMaybe<Scalars['String']>;
  bag_contains?: InputMaybe<Scalars['String']>;
  bag_ends_with?: InputMaybe<Scalars['String']>;
  bag_gt?: InputMaybe<Scalars['String']>;
  bag_gte?: InputMaybe<Scalars['String']>;
  bag_in?: InputMaybe<Array<Scalars['String']>>;
  bag_lt?: InputMaybe<Scalars['String']>;
  bag_lte?: InputMaybe<Scalars['String']>;
  bag_not?: InputMaybe<Scalars['String']>;
  bag_not_contains?: InputMaybe<Scalars['String']>;
  bag_not_ends_with?: InputMaybe<Scalars['String']>;
  bag_not_in?: InputMaybe<Array<Scalars['String']>>;
  bag_not_starts_with?: InputMaybe<Scalars['String']>;
  bag_starts_with?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<Scalars['String']>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['String']>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
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
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bag_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Bag_Filter>;
};


export type WalletHustlersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hustler_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Hustler_Filter>;
};


export type WalletItemsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ItemBalances_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ItemBalances_Filter>;
};

export type Wallet_Filter = {
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bagsHeld?: InputMaybe<Scalars['BigInt']>;
  bagsHeld_gt?: InputMaybe<Scalars['BigInt']>;
  bagsHeld_gte?: InputMaybe<Scalars['BigInt']>;
  bagsHeld_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bagsHeld_lt?: InputMaybe<Scalars['BigInt']>;
  bagsHeld_lte?: InputMaybe<Scalars['BigInt']>;
  bagsHeld_not?: InputMaybe<Scalars['BigInt']>;
  bagsHeld_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  joined?: InputMaybe<Scalars['BigInt']>;
  joined_gt?: InputMaybe<Scalars['BigInt']>;
  joined_gte?: InputMaybe<Scalars['BigInt']>;
  joined_in?: InputMaybe<Array<Scalars['BigInt']>>;
  joined_lt?: InputMaybe<Scalars['BigInt']>;
  joined_lte?: InputMaybe<Scalars['BigInt']>;
  joined_not?: InputMaybe<Scalars['BigInt']>;
  joined_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  paper?: InputMaybe<Scalars['BigInt']>;
  paper_gt?: InputMaybe<Scalars['BigInt']>;
  paper_gte?: InputMaybe<Scalars['BigInt']>;
  paper_in?: InputMaybe<Array<Scalars['BigInt']>>;
  paper_lt?: InputMaybe<Scalars['BigInt']>;
  paper_lte?: InputMaybe<Scalars['BigInt']>;
  paper_not?: InputMaybe<Scalars['BigInt']>;
  paper_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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


export type BagQuery = { __typename?: 'Query', bag?: { __typename?: 'Bag', id: string, claimed: boolean, opened: boolean, open_sea_asset?: { __typename?: 'OpenSeaAsset', is_on_sale?: boolean | null | undefined, current_sale_price?: number | null | undefined, last_sale_price?: number | null | undefined } | null | undefined } | null | undefined };

export type BagsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type BagsQuery = { __typename?: 'Query', bags: Array<{ __typename?: 'Bag', claimed: boolean, opened: boolean, id: string, clothes: string, foot: string, hand: string, drugs: string, neck: string, ring: string, vehicle: string, waist: string, weapon: string, open_sea_asset?: { __typename?: 'OpenSeaAsset', is_on_sale?: boolean | null | undefined, current_sale_price?: number | null | undefined, last_sale_price?: number | null | undefined } | null | undefined }> };

export type HustlerQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type HustlerQuery = { __typename?: 'Query', hustler?: { __typename?: 'Hustler', id: string, data: string } | null | undefined };

export type HustlersWalletQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type HustlersWalletQuery = { __typename?: 'Query', wallet?: { __typename?: 'Wallet', id: string, address: any, hustlers: Array<{ __typename?: 'Hustler', id: string, data: string }> } | null | undefined };

export type SearchQueryVariables = Exact<{
  text: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type SearchQuery = { __typename?: 'Query', search: Array<{ __typename?: 'Bag', id: string, clothes: string, foot: string, hand: string, drugs: string, neck: string, ring: string, vehicle: string, waist: string, weapon: string, claimed: boolean, opened: boolean }> };

export type WalletQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WalletQuery = { __typename?: 'Query', wallet?: { __typename?: 'Wallet', id: string, address: any, paper: any, bags: Array<{ __typename?: 'Bag', claimed: boolean, id: string, opened: boolean, clothes: string, foot: string, hand: string, drugs: string, neck: string, ring: string, vehicle: string, waist: string, weapon: string }> } | null | undefined };


export const AllHustlersDocument = `
    query AllHustlers {
  hustlers(first: 1000) {
    id
    data
  }
}
    `;
export const useAllHustlersQuery = <
      TData = AllHustlersQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: AllHustlersQueryVariables,
      options?: UseQueryOptions<AllHustlersQuery, TError, TData>
    ) =>
    useQuery<AllHustlersQuery, TError, TData>(
      variables === undefined ? ['AllHustlers'] : ['AllHustlers', variables],
      fetcher<AllHustlersQuery, AllHustlersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AllHustlersDocument, variables),
      options
    );
export const AllOpenedBagsDocument = `
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
export const useAllOpenedBagsQuery = <
      TData = AllOpenedBagsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: AllOpenedBagsQueryVariables,
      options?: UseQueryOptions<AllOpenedBagsQuery, TError, TData>
    ) =>
    useQuery<AllOpenedBagsQuery, TError, TData>(
      variables === undefined ? ['AllOpenedBags'] : ['AllOpenedBags', variables],
      fetcher<AllOpenedBagsQuery, AllOpenedBagsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AllOpenedBagsDocument, variables),
      options
    );
export const AllUnclaimedBagsDocument = `
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
export const useAllUnclaimedBagsQuery = <
      TData = AllUnclaimedBagsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: AllUnclaimedBagsQueryVariables,
      options?: UseQueryOptions<AllUnclaimedBagsQuery, TError, TData>
    ) =>
    useQuery<AllUnclaimedBagsQuery, TError, TData>(
      variables === undefined ? ['AllUnclaimedBags'] : ['AllUnclaimedBags', variables],
      fetcher<AllUnclaimedBagsQuery, AllUnclaimedBagsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AllUnclaimedBagsDocument, variables),
      options
    );
export const BagDocument = `
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
export const useBagQuery = <
      TData = BagQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: BagQueryVariables,
      options?: UseQueryOptions<BagQuery, TError, TData>
    ) =>
    useQuery<BagQuery, TError, TData>(
      ['Bag', variables],
      fetcher<BagQuery, BagQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, BagDocument, variables),
      options
    );
export const BagsDocument = `
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
    open_sea_asset @client {
      is_on_sale
      current_sale_price
      last_sale_price
    }
  }
}
    `;
export const useBagsQuery = <
      TData = BagsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: BagsQueryVariables,
      options?: UseQueryOptions<BagsQuery, TError, TData>
    ) =>
    useQuery<BagsQuery, TError, TData>(
      variables === undefined ? ['Bags'] : ['Bags', variables],
      fetcher<BagsQuery, BagsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, BagsDocument, variables),
      options
    );
export const HustlerDocument = `
    query Hustler($id: ID!) {
  hustler(id: $id) {
    id
    data
  }
}
    `;
export const useHustlerQuery = <
      TData = HustlerQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: HustlerQueryVariables,
      options?: UseQueryOptions<HustlerQuery, TError, TData>
    ) =>
    useQuery<HustlerQuery, TError, TData>(
      ['Hustler', variables],
      fetcher<HustlerQuery, HustlerQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, HustlerDocument, variables),
      options
    );
export const HustlersWalletDocument = `
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
export const useHustlersWalletQuery = <
      TData = HustlersWalletQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: HustlersWalletQueryVariables,
      options?: UseQueryOptions<HustlersWalletQuery, TError, TData>
    ) =>
    useQuery<HustlersWalletQuery, TError, TData>(
      ['HustlersWallet', variables],
      fetcher<HustlersWalletQuery, HustlersWalletQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, HustlersWalletDocument, variables),
      options
    );
export const SearchDocument = `
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
export const useSearchQuery = <
      TData = SearchQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: SearchQueryVariables,
      options?: UseQueryOptions<SearchQuery, TError, TData>
    ) =>
    useQuery<SearchQuery, TError, TData>(
      ['Search', variables],
      fetcher<SearchQuery, SearchQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, SearchDocument, variables),
      options
    );
export const WalletDocument = `
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
    }
  }
}
    `;
export const useWalletQuery = <
      TData = WalletQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: WalletQueryVariables,
      options?: UseQueryOptions<WalletQuery, TError, TData>
    ) =>
    useQuery<WalletQuery, TError, TData>(
      ['Wallet', variables],
      fetcher<WalletQuery, WalletQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, WalletDocument, variables),
      options
    );