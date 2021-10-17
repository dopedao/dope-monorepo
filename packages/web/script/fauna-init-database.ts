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
const createDopeTokenSortIndex = async (name: string, values: any) => {
  console.log(`Creating SORT Index: ${name}`);
  return await client.query(
    q.CreateIndex({
      name: name,
      source: q.Collection('DopeToken'),
      values: values
    })
  );
}

const createHighestLastSaleIndex = async () => {
  return await client.query(
    q.CreateIndex({
      name: "by-highest-last-sale-no-nulls",
      source: [
        {
          collection: q.Collection("DopeToken"),
          fields: {
            ref_if_sold_before: q.Query(
              q.Lambda(
                "doc",
                q.Let(
                  {
                    has_been_sold: q.Not(q.IsNull(
                      q.Select(
                        ["data", "open_sea_last_sale_price_eth"],
                        q.Var("doc")
                      )
                    ))
                  },
                  q.If(
                    q.Var("has_been_sold"), 
                    q.Select("ref", q.Var("doc")), 
                    null
                  )
                )
              )
            )
          }
        }
      ],
      values: [
        { field: ["data", "open_sea_last_sale_price_eth"], reverse: true },
        { binding: "ref_if_sold_before" }
      ]
    })
  );
};

const createSortIndexes = async () => {
  await createDopeTokenSortIndex(
    'by-rank', 
    [
      { field: ['data', 'rank'] },
      { field: ['ref'] }
    ]
  );
  await createDopeTokenSortIndex(
    'by-most-affordable',
    [
      { field: ['data', 'open_sea_current_sale_price_eth'] },
      { field: ['ref'] }
    ]
  );
  await createHighestLastSaleIndex();
};

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

const createMatchIndexes = async () => {
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
    'paper_claimed',
    [
      { field: ['data', 'paper_claimed'] }
    ]
  );
  await createDopeTokenSearchIndex(
    'items_unbundled',
    [
      { field: ['data', 'items_unbundled'] }
    ]
  );
  await createDopeTokenSearchIndex(
    'on-sale',
    [
      { field: ['data', 'open_sea_is_on_sale'] }
    ]
  );
}

(async () => {
  try {
    await initFromGraphQL();
    
    console.log('…Sleeping to ensure schema committed to Fauna');
    await new Promise(resolve => setTimeout(resolve, 5000));

    await createSortIndexes();
    await createMatchIndexes();

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
