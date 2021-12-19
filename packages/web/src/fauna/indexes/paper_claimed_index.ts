import { client, q } from '../../../script/fauna_client';

// Indexes if $PAPER has been claimed from DOPE Token
// https://docs.fauna.com/fauna/current/tutorials/indexes/search
export const create = async () => {
  return await client.query(
    q.CreateIndex({
      name: 'paper_claimed',
      source: q.Collection('DopeToken'),
      terms: [{ field: ['data', 'paper_claimed'] }]
    })
  );
}
    