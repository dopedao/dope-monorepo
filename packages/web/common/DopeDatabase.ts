import { Bag } from '../src/generated/graphql';
import { makeVar } from '@apollo/client';
import DopeJson from 'dope-metrics/output/loot.json';
import { getRarityForDopeId } from './dope-rarity-check';
import { OpenSeaAsset } from './OpenSeaAsset';
import { getOpenSeaAssetPagesJson } from './OpenSeaAsset';

const highImpossibleRank = 9999;

export type PickedBag = Pick<Bag, 
  'id' | 
  'claimed' |
  'clothes' |
  'drugs' |
  'foot' |
  'hand' |
  'neck' |
  'minted' |
  'rank' |
  'ring' |
  'vehicle' |
  'waist' |
  'weapon' |
  'open_sea_asset'
  >;


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
  // All have been minted already
  minted: true,
  open_sea_asset: new OpenSeaAsset(),
  // currentOwner: Wallet;
};
// Use newEmptyBag() to use as template
Object.freeze(EmptyBagStruct);

export function newEmptyBag(): PickedBag {
  return Object.assign({}, EmptyBagStruct);
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
    const lootJsonEntries = Object.entries(DopeJson);
    const tempDB = [];
    for (let i = 0; i < lootJsonEntries.length; i++) {
      const dopeAsset = lootJsonEntries[i][1];
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

  refreshItemClaims() {
    console.log('TODO: Implement refreshItemClaims');
  }

  async refreshOpenSeaAssets() {
    console.log('TODO: Implement API proxy for refreshOpenSeaAssets');
    getOpenSeaAssetPagesJson();
  }

  // UPDATING -----------------------------------------------------------------

  // updateDopeRecord(id: number, key: string, value: any): void {
  //   if (!this.items[id]) {
  //     this.items[id] = newEmptyBag();
  //   }
  //   console.log(`Updating: ${id}:${key} = ${value}`);
  //   this.items[id][key as keyof PickedBag] = value;
  // }

  // SORTING ------------------------------------------------------------------

  itemsSortedByRank(): PickedBag[] {
    return this.items.sort((a: PickedBag, b: PickedBag) => {
      const aRank = a.rank ?? highImpossibleRank;
      const bRank = b.rank ?? highImpossibleRank;
      return aRank - bRank;
    });
  }

  itemsSortedByMostAffordable(): PickedBag[] {
    return this.items.sort((a: PickedBag, b: PickedBag) => {
      const aPrice = a.open_sea_asset?.current_sale_price ?? 0;
      const bPrice = b.open_sea_asset?.current_sale_price ?? 0;
      return bPrice - aPrice;
    });
  }

  itemsSortedByMostExpensive(): PickedBag[] {
    return this.itemsSortedByMostAffordable().reverse();
  }

  itemsSortedByHighestLastSale(): PickedBag[] {
    return this.items.sort((a: PickedBag, b: PickedBag) => {
      const aLastSalePrice = a.open_sea_asset?.last_sale_price ?? 0;
      const bLastSalePrice = b.open_sea_asset?.last_sale_price ?? 0;
      return aLastSalePrice - bLastSalePrice;
    });
  }
}

// FILTERING ----------------------------------------------------------------

/**
 * Home-rolled full text search for items.
 * Supports: "words in quotes" and individual terms outside of quotes.
 *
 * TODO: Clean up API…don't like that it's not inside the class
 */
export const filterItemsBySearchString = (items: PickedBag[], searchString: string) => {
  if (searchString === '') return items;

  // Splits on spaces except when in quotes
  const searchWords = searchString.toLowerCase().match(/([^\s"]+|"[^"]*")+/g);
  if (!searchWords || searchWords.length == 0) return items;

  const searchWordsNoQuotes = searchWords.map(word => word.replaceAll('"', ''));

  console.log(`filtering: ${searchWordsNoQuotes}`);

  return items.filter(obj =>
    Object.keys(obj).some(key => {
      const testVal = obj[key as keyof PickedBag].toString().toLowerCase();
      return searchWordsNoQuotes.every(word => testVal.indexOf(word) > -1);
    }),
  );
};

export default DopeDatabase;

const db = new DopeDatabase();
db.populateFromJson();
export const DopeDbCacheReactive = makeVar(db);
