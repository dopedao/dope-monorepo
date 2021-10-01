import { Bag } from '../src/generated/graphql';
import { makeVar } from '@apollo/client';
import DopeJson from 'dope-metrics/output/loot.json';
import { getRarityForDopeId } from './dope-rarity-check';
import { OpenSeaAsset } from './OpenSeaAsset';
import { getOpenSeaAssetPagesJson } from './OpenSeaAsset';

const highImpossibleRank = 9999;

export const EmptyBagStruct: Partial<Bag> = {
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

export function newEmptyBag(): Partial<Bag> {
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
  items: Partial<Bag>[] = [];

  constructor(items?: Partial<Bag>[]) {
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
    const openSeaAssets = getOpenSeaAssetPagesJson();
  }

  // UPDATING -----------------------------------------------------------------

  updateDopeRecord(id: number, key: string, value: any): void {
    if (!this.items[id]) {
      this.items[id] = newEmptyBag();
    }
    console.log(`Updating: ${id}:${key} = ${value}`);
    this.items[id][key as keyof Bag] = value;
  }

  // SORTING ------------------------------------------------------------------

  itemsSortedByRank(): Partial<Bag>[] {
    return this.items.sort((a: Partial<Bag>, b: Partial<Bag>) => {
      const aRank = a.rank ?? highImpossibleRank;
      const bRank = b.rank ?? highImpossibleRank;
      return aRank - bRank;
    });
  }

  itemsSortedByMostAffordable(): Partial<Bag>[] {
    return this.items.sort((a: Partial<Bag>, b: Partial<Bag>) => {
      const aPrice = a.open_sea_asset?.current_sale_price ?? 0;
      const bPrice = b.open_sea_asset?.current_sale_price ?? 0;
      return bPrice - aPrice;
    });
  }

  itemsSortedByMostExpensive(): Partial<Bag>[] {
    return this.itemsSortedByMostAffordable().reverse();
  }

  itemsSortedByHighestLastSale(): Partial<Bag>[] {
    return this.items.sort((a: Partial<Bag>, b: Partial<Bag>) => {
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
export const filterItemsBySearchString = (items: Partial<Bag>[], searchString: string) => {
  if (searchString === '') return items;

  // Splits on spaces except when in quotes
  const searchWords = searchString.toLowerCase().match(/([^\s"]+|"[^"]*")+/g);
  if (!searchWords || searchWords.length == 0) return items;

  const searchWordsNoQuotes = searchWords.map(word => word.replaceAll('"', ''));

  console.log(`filtering: ${searchWordsNoQuotes}`);

  return items.filter(obj =>
    Object.keys(obj).some(key => {
      const testVal = obj[key as keyof Bag].toString().toLowerCase();
      return searchWordsNoQuotes.every(word => testVal.indexOf(word) > -1);
    }),
  );
};

export default DopeDatabase;

const db = new DopeDatabase();
db.populateFromJson();
export const DopeDbCacheReactive = makeVar(db);
