import { client, q } from '../../src/fauna-client';

// Indexes if On Sale with OpenSea
// https://docs.fauna.com/fauna/current/tutorials/indexes/search
export const create = async () => {
  return await client.query(
    q.CreateIndex({
      name: 'on_sale',
      source: q.Collection('DopeToken'),
      terms: [{ field: ['data', 'open_sea_is_on_sale'] }]
    })
  );
}
