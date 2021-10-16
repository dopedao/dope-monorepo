import { OpenSeaAsset } from './OpenSeaAsset';
import { PickedBag } from './PickedBag';

const highImpossibleRank = 9999;

export const EmptyBagStruct: PickedBag = {
  id: '',
  // Let people be happily surprised by learning result of query later
  claimed: true,
  clothes: '',
  drugs: '',
  foot: '',
  hand: '',
  neck: '',
  rank: highImpossibleRank,
  ring: '',
  vehicle: '',
  waist: '',
  weapon: '',
  // // All have been minted already
  // minted: true,
  open_sea_asset: new OpenSeaAsset(),
  // currentOwner: Wallet;
};
// Use newEmptyBag() to use as template
Object.freeze(EmptyBagStruct);

export function newEmptyBag(): PickedBag {
  const copy = {} as PickedBag;
  return Object.assign(copy, EmptyBagStruct);
}
