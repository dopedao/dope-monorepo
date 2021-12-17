import { Bag } from 'generated/graphql';
import { makeVar } from '@apollo/client';
import DopeJson from 'dope-metrics/output/loot.json';
import { OpenSeaAsset } from './OpenSeaAsset';
import { newEmptyBag } from 'EmptyBag';
import { getRarityForDopeId } from 'dope_rarity_check';
import { PickedBag } from 'PickedBag';
import { FAUNA_KEY, FAUNA_API_KEY, FAUNA_API_URL } from 'fauna_client';

const highImpossibleRank = 9999;
// const FAUNA_API_URL = 'https://graphql.us.fauna.com/graphql';

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

const SWAP_MEET_QUERY = `
  query swapMeet(
      $q: String,
      $paper_claimed: Boolean,
      $items_unbundled: Boolean,
      $on_sale: Boolean,
    ) {
      getSwapMeetPage(
        _size: 10000,
        q: $q,
        hasUnclaimedPaper: $paper_claimed,
        hasItemsUnbundled: $items_unbundled,
        isForSale: $on_sale
      ) {
        data { token_id
                items_unbundled
                paper_claimed
                rank
                open_sea_is_on_sale
                open_sea_current_sale_price_eth
                open_sea_last_sale_price_eth
                clothes_rank
                clothes
                drugs
                foot
                hand
                neck
                ring
                vehicle
                waist
                weapon
        } after before
      }
  }`;


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


  async populateItems() {
    const data = await this.getFauna();
    const dopeData = data?.getSwapMeetPage?.data;
    dopeData.map((x: any) => {
      x.id = x.token_id, x.claimed = x.paper_claimed, x.opened = x.items_unbundled,
      x.open_sea_asset = {
        "is_on_sale": x.open_sea_is_on_sale,
        "current_sale_price_eth": x?.open_sea_last_sale_price_eth
      }
    });
    this.items = dopeData;
    console.log(`data length: ${this.items.length}`)
  }

  // Get data from Fauna
  async getFauna() {
    const variables = {} // {"q": "sil", "items_unbundled": false}
    
    var postData = JSON.stringify({
      query: SWAP_MEET_QUERY,
      variables: variables
    });

    const response = await fetch(FAUNA_API_URL, {
      method: 'POST', 
      headers: {
        'Authorization': `Bearer ${FAUNA_API_KEY}`
      },
      body: postData
    });
    const assets = await response.json();
    return assets?.data;
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
    //   theBag[key] = value;
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
  const aPrice = a.open_sea_asset?.current_sale_price_eth ?? highImpossiblePrice;
  const bPrice = b.open_sea_asset?.current_sale_price_eth ?? highImpossiblePrice;
  return aPrice - bPrice;
};

export const compareByMostExpensive = (a: PickedBag, b: PickedBag) => {
  const aPrice = a.open_sea_asset?.current_sale_price_eth ?? 0;
  const bPrice = b.open_sea_asset?.current_sale_price_eth ?? 0;
  return bPrice - aPrice;
};

export const compareByHighestLastSale = (a: PickedBag, b: PickedBag) => {
  const aLastSalePrice = a.open_sea_asset?.last_sale_price_eth ?? 0;
  const bLastSalePrice = b.open_sea_asset?.last_sale_price_eth ?? 0;
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
db.populateItems()
export const DopeDbCacheReactive = makeVar(db);
