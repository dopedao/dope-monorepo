import { FAUNA_KEY, client, q } from '../src/fauna-client';
import fetch from 'isomorphic-fetch';
import fs from 'fs';

// Fauna only provides a way to load GraphQL schema through this endpoint
// https://docs.fauna.com/fauna/current/api/graphql/endpoints?lang=javascript
// https://forums.fauna.com/t/importing-graphql-schema-from-js-file/642/3
const initFromGraphQL = async () => {
  console.log('Initializing Collections from GraphQL schema');
  const schema = fs.readFileSync(
    __dirname + '/../fauna/dope_token_schema.graphql', 
    'utf8'
  );
  // Override deletes documents and replaces schema in place
  // https://docs.fauna.com/fauna/current/api/graphql/endpoints?lang=javascript
  const url = 'https://graphql.us.fauna.com/import?mode=override';
  await fetch(url, {
    method: 'POST', 
    headers: {
      'Authorization': `Bearer ${FAUNA_KEY}`
    },
    body: schema
  });
};

// Index creation using "values" which is primarily used for sorting
// https://docs.fauna.com/fauna/current/tutorials/indexes/sort
const createDopeTokenSortIndex = async (name: string, fieldSort: any) => {
  console.log(`Creating SORT Index: ${name}`);
  return await client.query(
    q.CreateIndex({
      name: name,
      source: q.Collection('DopeToken'),
      values: [fieldSort, { field: ['ref'] }]
    })
  );
}

// Index creation using "terms" which helps searching
// https://docs.fauna.com/fauna/current/tutorials/indexes/search
const createDopeTokenSearchIndex = async (name: string, terms: any) => {
  console.log(`Creating SEARCH Index: ${name}`);
  return await client.query(
    q.CreateIndex({
      name: name,
      source: q.Collection('DopeToken'),
      terms: terms
    })
  );
}

(async () => {
  try {
    await initFromGraphQL();
    
    console.log('…Sleeping to ensure schema committed to Fauna');
    await new Promise(resolve => setTimeout(resolve, 5000));

    await createDopeTokenSortIndex(
      'by-rank', 
      { field: ['data', 'rank'] }
    );
    await createDopeTokenSortIndex(
      'by-most-affordable',
      { field: ['data', 'open_sea_current_sale_price_eth'] }
    );
    await createDopeTokenSortIndex(
      'by-highest-last-sale', 
      {  field: ['data', 'open_sea_last_sale_price_eth'], reverse: true }
    );

    await createDopeTokenSearchIndex(
      'item-text',
      [
        { field: ['data', 'clothes'] },
        { field: ['data', 'drugs'] },
        { field: ['data', 'foot'] },
        { field: ['data', 'hand'] },
        { field: ['data', 'neck'] },
        { field: ['data', 'ring'] },
        { field: ['data', 'vehicle'] },
        { field: ['data', 'waist'] },  
        { field: ['data', 'weapon'] }
      ]
    );
    await createDopeTokenSearchIndex(
      'claimed',
      [{ field: ['data', 'claimed'] }]
    );
    await createDopeTokenSearchIndex(
      'unbundled',
      [{ field: ['data', 'unbundled'] }]
    );
    await createDopeTokenSearchIndex(
      'on-sale',
      [{ field: ['data', 'open_sea_is_on_sale'] }]
    );

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
