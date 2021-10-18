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

// Index creation using 'values' which is primarily used for sorting
// https://docs.fauna.com/fauna/current/tutorials/indexes/sort
interface DopeTokenSortIndexInterface {
  name: string;
  values: any;
}
const createDopeTokenSortIndex = async ({name, values}: DopeTokenSortIndexInterface) => {
  console.log(`Creating SORT Index: ${name}`);
  return await client.query(
    q.CreateIndex({
      name: name,
      source: q.Collection('DopeToken'),
      values: values
    })
  );
}

// Have to use the fields accessor with bindings here to avoid null entries,
// which is a bit more complicated than a standard index.
//
// This is necessary to prevent items that haven't been sold previously
// from appearing at the top of the sorted items list.
//
// More info about this technique:
// https://forums.fauna.com/t/excluding-documents-from-index/2157/6
const createHighestLastSaleIndex = async () => {
  return await client.query(
    q.CreateIndex({
      name: 'by_highest_last_sale',
      source: {
        collection: q.Collection('DopeToken'),
        fields: {
          ref_if_sold_before: q.Query(
            q.Lambda(
              'doc',
              q.Let(
                {
                  has_been_sold: q.Not(q.IsNull(
                    q.Select(
                      ['data', 'open_sea_last_sale_price_eth'],
                      q.Var('doc')
                    )
                  ))
                },
                q.If(
                  q.Var('has_been_sold'), 
                  q.Select('ref', q.Var('doc')), 
                  null
                )
              )
            )
          )
        }
      },
      values: [
        { field: ['data', 'open_sea_last_sale_price_eth'], reverse: true },
        { binding: 'ref_if_sold_before' }
      ]
    })
  );
};

const createMostAffordableIndex = async () => {
  return await client.query(
    q.CreateIndex({
      name: 'by_most_affordable',
      source: {
        collection: q.Collection('DopeToken'),
        fields: {
          ref_if_on_sale: q.Query(
            q.Lambda(
              'doc',
              q.Let(
                {
                  is_on_sale: q.Not(q.IsNull(
                    q.Select(
                      ['data', 'open_sea_current_sale_price_eth'],
                      q.Var('doc')
                    )
                  ))
                },
                q.If(
                  q.Var('is_on_sale'), 
                  q.Select('ref', q.Var('doc')), 
                  null
                )
              )
            )
          )
        }
      },
      values: [
        { field: ['data', 'open_sea_current_sale_price_eth'] },
        { binding: 'ref_if_on_sale' }
      ]
    })
  );
};

const createSortIndexes = async () => {
  await createDopeTokenSortIndex({
    name: 'by_rank', 
    values: [
      { field: ['data', 'rank'] },
      { field: ['ref'] }
    ]
  });
  await createMostAffordableIndex();
  await createHighestLastSaleIndex();
};

// Index creation using 'terms' which helps searching
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
    'item_text',
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
    [{ field: ['data', 'paper_claimed'] }]
  );
  await createDopeTokenSearchIndex(
    'items_unbundled',
    [{ field: ['data', 'items_unbundled'] }]
  );
  await createDopeTokenSearchIndex(
    'on_sale',
    [{ field: ['data', 'open_sea_is_on_sale'] }]
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
