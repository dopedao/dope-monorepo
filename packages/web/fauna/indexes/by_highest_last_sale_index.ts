import { client, q } from '../../src/fauna_client';

// Index of highest last Eth sale on OpenSea
//
// Have to use the fields accessor with bindings here to avoid null entries,
// which is a bit more complicated than a standard index.
//
// This is necessary to prevent items that haven't been sold previously
// from appearing at the top of the sorted items list.
//
// More info about this technique:
// https://forums.fauna.com/t/excluding-documents-from-index/2157/6
const sourceObj = {
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
};
const values = [
  { field: ['data', 'open_sea_last_sale_price_eth'], reverse: true },
  { binding: 'ref_if_sold_before' }
];

// Create standard Index without matching necessary,
// and another that allows us to combine it with other 
// indexes for Searching + Sorting as found here:
//
// https://docs.fauna.com/fauna/current/tutorials/indexes/search_and_sort
export const create = async () => {
  return await client.query(
    q.Do(
      q.CreateIndex({
        name: 'by_highest_last_sale',
        source: sourceObj,
        values: values
      }),
      q.CreateIndex({
        name: 'by_highest_last_sale_with_ref',
        source: sourceObj,
        values: values,
        terms: [
          { field: ['ref'] }
        ]
      })
    )
  );
};
