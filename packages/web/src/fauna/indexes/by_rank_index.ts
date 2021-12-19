import { client, q } from '../../../script/fauna_client';

const values = [
  { field: ['data', 'rank'] },
  { field: ['ref'] }
];

// Sort index by Rank ASC (default)
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
        name: 'by_rank',
        source: q.Collection('DopeToken'),
        values: values
      }),
      q.CreateIndex({
        name: 'by_rank_with_ref',
        source: q.Collection('DopeToken'),
        values: values,
        terms: [
          { field: ['ref'] }
        ]
      }),
    )
  );
}
