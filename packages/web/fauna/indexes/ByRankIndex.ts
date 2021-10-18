import { client, q } from '../../src/fauna-client';

// Sort index by Rank ASC (default)
export const create = async () => {
  return await client.query(
    q.CreateIndex({
      name: 'by_rank',
      source: q.Collection('DopeToken'),
      values: [
        { field: ['data', 'rank'] },
        { field: ['ref'] }
      ]
    })
  );
}
