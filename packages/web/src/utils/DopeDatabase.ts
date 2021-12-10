import { Bag } from 'generated/graphql';
import { makeVar } from '@apollo/client';
import DopeJson from 'dope-metrics/output/loot.json';
import { getRarityForDopeId } from './dope-rarity-check';
import { OpenSeaAsset } from './OpenSeaAsset';

const highImpossibleRank = 9999;

export type PickedBag = Pick<
  Bag,
  | 'id'
  | 'opened'
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
type BagClaimCheck = Pick<Bag, 'id' | 'claimed'>;
// At the time of coding, there were less than 3k unclaimed DOPE tokens.
type UnclaimedPaperPages = {
  page_1: BagClaimCheck[];
  page_2?: BagClaimCheck[];
  page_3?: BagClaimCheck[];
  page_4?: BagClaimCheck[];
  page_5?: BagClaimCheck[];
  page_6?: BagClaimCheck[];
  page_7?: BagClaimCheck[];
};

type OpenedCheck = Pick<Bag, 'id' | 'opened'>;
type OpenedBagPages = {
  page_1: OpenedCheck[];
  page_2?: OpenedCheck[];
  page_3?: OpenedCheck[];
  page_4?: OpenedCheck[];
  page_5?: OpenedCheck[];
  page_6?: OpenedCheck[];
  page_7?: OpenedCheck[];
};

export const EmptyBagStruct: PickedBag = {
  id: '',
  // Let people be happily surprised by learning result of query later
  claimed: true,
  opened: false,
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

/**
 * Responsible for populating, storing, and returning sorted/filtered
 * representations of our internal database for DOPE items.
 *
 * Combines information from The Graph, OpenSea, and Rarity.json.
 *
 */
class DopeDatabase {
  items: PickedBag[] = [];

  constructor(items?: PickedBag[]) {
    console.log('Creating DopeDatabase');
    if (items) this.items = items;
  }

  // Loads cached item data from json into the database
  // so we save network requests calling The Graph.
  populateFromJson() {
    console.log('Populating DopeDatabase');
    const dopeJsonEntries = Object.entries(DopeJson);
    const tempDB = [];
    for (let i = 0; i < dopeJsonEntries.length; i++) {
      const dopeAsset = dopeJsonEntries[i][1];
      const tokenId = Object.keys(dopeAsset)[0];
      const values = Object.values(dopeAsset)[0];
      const dope = newEmptyBag();
      Object.assign(dope, values);
      dope.id = tokenId;
      dope.rank = getRarityForDopeId(tokenId);
      tempDB[parseInt(tokenId)] = dope;
    }
    this.items = tempDB;
    console.log('…Populated');
  }

  updateHasPaperFromQuery(queryResultJson: UnclaimedPaperPages) {
    console.log('updateHasPaperFromQuery');
    const bags = Object.values(queryResultJson).flat(Infinity);
    for (let i = 0; i < bags.length; i++) {
      const bag = bags[i] as BagClaimCheck;
      let isClaimed = bag.claimed;
      // Special case for odd token as discussed here
      // https://discord.com/channels/882333869007839252/882333869007839254/897215194743341107
      if (bag.id === '1277') isClaimed = true;
      this.updateRecord(bag.id, 'claimed', isClaimed);
    }
  }

  updateOpenedBagsFromQuery(queryResultJson: OpenedBagPages) {
    console.log('updateOpenedBagsFromQuery');
    const bags = Object.values(queryResultJson).flat(Infinity);
    for (let i = 0; i < bags.length; i++) {
      const bag = bags[i] as OpenedCheck;
      this.updateRecord(bag.id, 'opened', bag.opened);
    }
  }

  // Fetch transformed output, loads it, refresh the Apollo Reactive var.
  async refreshOpenSeaAssets() {
    // OpenSea Asset price + sale information is pulled, transformed, and stored by our API.
    // We fetch the cached result.
    console.log('refreshOpenSeaAssets');
    const url = 'https://dope-wars-gg.s3.us-west-1.amazonaws.com/open-sea-assets.json';
    const response = await fetch(url);
    const assets = await response.json();
    for (let i = 0; i < assets.length; i++) {
      this.updateRecord(assets[i].token_id, 'open_sea_asset', assets[i]);
    }
  }

  // UPDATING -----------------------------------------------------------------

  updateRecord(id: number | string, key: keyof PickedBag, value: any): void {
    // console.log(`Updating: ${id}:${key} = ${value}`);
    const theBag = this.items.find(bag => {
      if (!bag) return false;
      return bag.id === id.toString();
    }) as any;
    // console.log(theBag);
    theBag[key] = value;
  }
}

// SORTING ------------------------------------------------------------------

export const compareByRank = (a: PickedBag, b: PickedBag) => {
  const aRank = a.rank ?? highImpossibleRank;
  const bRank = b.rank ?? highImpossibleRank;
  return aRank - bRank;
};

export const compareByMostAffordable = (a: PickedBag, b: PickedBag) => {
  const highImpossiblePrice = 9999999999999999;
  const aPrice = a.open_sea_asset?.current_sale_price ?? highImpossiblePrice;
  const bPrice = b.open_sea_asset?.current_sale_price ?? highImpossiblePrice;
  return aPrice - bPrice;
};

export const compareByMostExpensive = (a: PickedBag, b: PickedBag) => {
  const aPrice = a.open_sea_asset?.current_sale_price ?? 0;
  const bPrice = b.open_sea_asset?.current_sale_price ?? 0;
  return bPrice - aPrice;
};

export const compareByHighestLastSale = (a: PickedBag, b: PickedBag) => {
  const aLastSalePrice = a.open_sea_asset?.last_sale_price ?? 0;
  const bLastSalePrice = b.open_sea_asset?.last_sale_price ?? 0;
  return bLastSalePrice - aLastSalePrice;
};

// FILTERING ----------------------------------------------------------------

export const testForUnclaimedPaper = (bag: PickedBag) => !bag.claimed;
export const testForSale = (bag: PickedBag) => bag.open_sea_asset?.is_on_sale;
export const testForNotOpened = (bag: PickedBag) => !bag.opened;

/**
 * Home-rolled full text search for items.
 * Supports: "words in quotes" and individual terms outside of quotes.
 */
export const filterItemsBySearchString = (items: PickedBag[], searchString: string) => {
  if (!searchString || searchString === '') return items;

  // Splits on spaces except when in quotes
  const searchWords = searchString.toLowerCase().match(/([^\s"]+|"[^"]*")+/g);
  if (!searchWords || searchWords.length == 0) return items;
  const searchWordsNoQuotes = searchWords.map(word => word.replaceAll('"', ''));

  console.log(`filtering: ${searchWordsNoQuotes}`);

  return items.filter(obj =>
    Object.keys(obj).some(key => {
      const value = obj[key as keyof PickedBag];
      if (!value) return false; // no match
      const testVal = value.toString().toLowerCase();
      return searchWordsNoQuotes.every(word => testVal.indexOf(word) > -1);
    }),
  );
};

export default DopeDatabase;

const db = new DopeDatabase();
db.populateFromJson();
export const DopeDbCacheReactive = makeVar(db);
