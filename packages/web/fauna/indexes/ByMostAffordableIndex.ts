import { client, q } from '../../src/fauna-client';

// Sort index by Most Affordable ASC
export const create = async () => {
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