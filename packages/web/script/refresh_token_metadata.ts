import { client, q } from '../src/fauna_client';
import fetch from 'isomorphic-fetch';
import fs from 'fs';
import path from 'path';
import { NETWORK } from '../src/constants';
const subgraphUrl = NETWORK[1].subgraph;
const QUERY_PATH = "../queries";

const updateFauna = async(data: any) => {
  await client.query(
    q.Map(
      data, 
      q.Lambda(
        ['token_id', 'data'], 
          q.Update(
            q.Ref(q.Collection('DopeToken'), q.Var('token_id')),
            { data: q.Var('data') }
          )
      )
    )
  );
}

const getGraphQuery = async (fileName: string) => {
  return JSON.stringify({
    query: fs.readFileSync(
      path.resolve(__dirname, fileName),
      'utf8'
    ),
    variables: {}
  });
}

const getAndUpdatePaperUnclaimed = async () => {
  const graphQuery = await getGraphQuery(`${QUERY_PATH}/all_unclaimed_bags.graphql`);

  const response = await fetch(subgraphUrl, {
    method: 'POST', 
    body: graphQuery
  });
  const unclaimed = await response.json();

  if (unclaimed["data"]) {
    const papersUnclaimed = unclaimed["data"]["bags"];
    console.log(`Found ${papersUnclaimed.length} paper_claimed records`)
    const tokensWithPaperUnclaimed = papersUnclaimed.map((tokens: any) => [
      tokens.id,
      {
        paper_claimed: false
      }
    ]);

    await updateFauna(tokensWithPaperUnclaimed)
    console.log(`updated ${tokensWithPaperUnclaimed.length} paper_claimed records`)
  };
}

const getAndUpdateItemUnbundled = async () => {
  const graphQuery = await getGraphQuery(`${QUERY_PATH}/all_opened_bags.graphql`)

  const response = await fetch(subgraphUrl, {
    method: 'POST', 
    body: graphQuery
  });
  const unbundled = await response.json();

  if (unbundled["data"]) {
    const itemsUnbundled = unbundled["data"]["bags"];
    console.log(`Found ${itemsUnbundled.length} paper_unclaimed records`)
    const tokensWithItemsUnbundled = itemsUnbundled.map((tokens: any) => [
      tokens.id,
      {
        items_unbundled: true
      }
    ]);
    await updateFauna(tokensWithItemsUnbundled)
    console.log(`updated ${tokensWithItemsUnbundled.length} items_unbundled records`)
  }
};

(async () => {
  try {
    await getAndUpdatePaperUnclaimed();
    await getAndUpdateItemUnbundled();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
