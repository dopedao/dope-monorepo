import { Bag } from "./generated/graphql";
export type PickedBag = Pick<
  Bag,
  | 'id'
  | 'claimed'
  | 'clothes'
  | 'drugs'
  | 'foot'
  | 'hand'
  | 'neck'
  | 'rank'
  | 'ring'
  | 'vehicle'
  | 'waist'
  | 'weapon'
  | 'open_sea_asset'
>;