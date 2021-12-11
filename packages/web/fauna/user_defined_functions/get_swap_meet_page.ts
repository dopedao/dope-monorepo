// import { Match } from 'faunadb/src/types/query';
import { client, q } from '../../src/fauna_client';

export const create = async () => {
  return await client.query(
    q.CreateFunction({
        name: "get_swap_meet_page2",
        role: null,
        body: q.Query(
            q.Lambda(
                [
                "q",
                "hasUnclaimedPaper",
                "isForSale",
                "hasItemsUnbundled",
                "size",
                "after",
                "before"
                ],
                q.Let(
                {
                    with_a: q.If(
                    q.IsNull(q.Var('q')),
                    [],
                    [q.Match(q.Index('dope_text_search'), q.Var('q'))]
                    ),

                    with_b: q.If(
                    q.IsNull(q.Var('hasUnclaimedPaper')),
                    q.Var('with_a'),
                    q.Append(q.Var('with_a'), [
                        q.Match(q.Index('paper_claimed'), q.Var('hasUnclaimedPaper'))
                        ])
                    ),
                    with_c: q.If(
                    q.IsNull(q.Var('hasItemsUnbundled')),
                    q.Var('with_b'),
                    q.Append(q.Var('with_b'), [
                        q.Match(q.Index('items_unbundled'), q.Var('hasItemsUnbundled'))
                        ])
                    ),
                    with_d: q.If(
                    q.IsNull(q.Var('isForSale')),
                    q.Var('with_c'),
                    q.Append(q.Var('with_c'), [
                        q.Match(q.Index('on_sale'), q.Var('isForSale'))
                    ])
                    ),
                    // q.Match: Intersection(q.Var('with_c')),
                    match: q.If(
                    q.IsEmpty(q.Var('with_d')),
                    q.Documents(q.Collection('DopeToken')), // simplq.Ify q.If no filters
                    q.Intersection(q.Var('with_d'))
                    ),
                    page: q.If(
                    q.Equals(q.Var("before"), q.IsNull(q.Var("before"))),
                    q.If(
                        q.Equals(q.Var("after"), q.IsNull(q.Var("after"))),
                        q.Paginate(q.Var("q.Match"), { size: q.Var("size") }),
                        q.Paginate(q.Var("q.Match"), { after: q.Var("after"), size: q.Var("size") })
                    ),
                    q.Paginate(q.Var("q.Match"), { before: q.Var("before"), size: q.Var("size") })
                    )
                },
                // Paginate(q.Var('q.Match'))
                q.Map(q.Var("page"), q.Lambda("ref", q.Get(q.Var("ref"))))
                )
            )
            )
    })
  );
};
