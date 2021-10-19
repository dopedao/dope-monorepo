import { client, q } from '../../src/fauna_client';

// Concatenates all strings, then splits using NGram feature.
// Produces a bound field array of tokens we can then use
// to approximate a prefix-based search without resorting to
// use of external services.
export const create = async () => {
  return await client.query(
    q.CreateIndex({
      name: 'dope_text_search',
      source: {
        collection: q.Collection('DopeToken'),
        fields: {
          n_grams: q.Query(
            q.Lambda(
              'doc',
              q.NGram(q.LowerCase(
                q.Concat([
                  q.Select(['data', 'clothes'], q.Var('doc')),
                  q.Select(['data', 'drugs'], q.Var('doc')),
                  q.Select(['data', 'foot'], q.Var('doc')),
                  q.Select(['data', 'hand'], q.Var('doc')),
                  q.Select(['data', 'neck'], q.Var('doc')),
                  q.Select(['data', 'ring'], q.Var('doc')),
                  q.Select(['data', 'vehicle'], q.Var('doc')),
                  q.Select(['data', 'waist'], q.Var('doc')),
                  q.Select(['data', 'weapon'], q.Var('doc'))
                ], ' ')
              ), 3, 3)
            )
          )
        }
      },
      terms: [
        { binding: 'n_grams' },
      ],
      values: [
        { field: ['ref'] }
      ]
    })
  );
};
