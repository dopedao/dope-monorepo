import { client, q } from '../../../script/fauna_client';

const sourceObj = {
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
};
const values = [
  { field: ['data', 'open_sea_current_sale_price_eth'] },
  { binding: 'ref_if_on_sale' }
]

// Sort index by Most Affordable ASC
// 
// Create standard Index without matching necessary,
// and another that allows us to combine it with other 
// indexes for Searching + Sorting as found here:
//
// https://docs.fauna.com/fauna/current/tutorials/indexes/search_and_sort
export const create = async () => {
  return await client.query(
    q.Do(
      q.CreateIndex({
        name: 'by_most_affordable',
        source: sourceObj,
        values: values
      }),
      q.CreateIndex({
        name: 'by_most_affordable_with_ref',
        source: sourceObj,
        values: values,
        terms: [
          { field: ['ref'] }
        ]
      })
    )
  );
};