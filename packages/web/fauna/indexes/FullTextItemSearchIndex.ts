import { client, q } from '../../src/fauna-client';

// Concatenates all searchable fields to make our
// match code easier to deal with, by using ContainsStr on our matcher.
export const create = async () => {
  return await client.query(
    q.CreateIndex({
      name: 'full_text',
      source: {
        collection: q.Collection('DopeToken'),
        fields: {
          full_text: q.Query(
            q.Lambda(
              'doc',
              q.Concat(
                [
                  q.Select(['data', 'clothes'], q.Var('doc')),
                  q.Select(['data', 'drugs'], q.Var('doc')),
                  q.Select(['data', 'foot'], q.Var('doc')),
                  q.Select(['data', 'hand'], q.Var('doc')),
                  q.Select(['data', 'neck'], q.Var('doc')),
                  q.Select(['data', 'ring'], q.Var('doc')),
                  q.Select(['data', 'vehicle'], q.Var('doc')),
                  q.Select(['data', 'waist'], q.Var('doc')),
                  q.Select(['data', 'weapon'], q.Var('doc'))
                ], 
                ' '
              )
            )
          )
        }
      },
      values: [
        { binding: 'full_text' },
        { field: ['ref'] }
      ]
    })
  );
};
