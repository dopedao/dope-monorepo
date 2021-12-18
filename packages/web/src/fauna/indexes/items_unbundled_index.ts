import { client, q } from '../../fauna_client';

// Index creation using 'terms' which helps searching
// https://docs.fauna.com/fauna/current/tutorials/indexes/search
export const create = async () => {
  return await client.query(
    q.CreateIndex({
      name: 'items_unbundled',
      source: q.Collection('DopeToken'),
      terms: [{ field: ['data', 'items_unbundled'] }]
    })
  );
}
