import { Bag } from '../src/generated/graphql';
import { makeVar } from '@apollo/client';
import DopeJson from 'dope-metrics/output/loot.json';
import { getRarityForDopeId } from './dope-rarity-check';

class DopeDatabase {
  items: Bag[] = [];

  constructor(items?: Bag[]) {
    if (items) this.items = items;
  }

  populateFromJson() {
    console.log('Populating DopeDatabase');
    const lootJsonEntries = Object.entries(DopeJson).slice(0, 8000);
    const tempDB = [];
    for (let i = 0; i < lootJsonEntries.length; i++) {
      const values = lootJsonEntries[i][1];
      const tokenId = Object.keys(values)[0];
      const dope = values[tokenId];
      dope.id = tokenId;
      dope.rank = getRarityForDopeId(tokenId);
      // Let people be happily surprised by learning result of query
      // on load later.
      dope.claimed = true; 
      // read dope.claimed from Apollo…
      // read dope.open_sea_asset from Apollo…
      tempDB[parseInt(tokenId)] = dope;
    }
    this.items = tempDB;
    console.log('…Populated');
  }
}
export default DopeDatabase;

const db = new DopeDatabase();
console.log(`TYPEOF: ${typeof db.items}`);
export const DopeItemsReactive = makeVar(db.items as any);