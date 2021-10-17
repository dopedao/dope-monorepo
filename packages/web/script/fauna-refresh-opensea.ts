import { client, q } from '../src/fauna-client';
import { getOpenSeaAssets } from '../src/OpenSeaAsset';

/**
 * Polls OpenSea for DOPE Token sales information.
 * Stores that information in our FaunaDB collection.
 */

(async () => {
  try {
    const assets = await getOpenSeaAssets();
    // Translate to our document store in Fauna
    const assetsWithTokenId = assets.map(asset => [
      asset.token_id, 
      {
        open_sea_is_on_sale: asset.is_on_sale,
        open_sea_current_sale_price_eth: asset.current_sale_price_eth,
        open_sea_last_sale_price_eth: asset.last_sale_price_eth
      }
    ]);
    await client.query(
      q.Map(
        assetsWithTokenId, 
        q.Lambda(
          ['token_id', 'data'], 
          // Fauna doesn't have a native "upsert", so we use an if statement
          q.If(
            q.Exists(q.Ref(q.Collection('DopeToken'), q.Var('token_id'))),
            q.Update(
              q.Ref(q.Collection('DopeToken'), q.Var('token_id')),
              { data: q.Var('data') }
            ),
            q.Create(
              q.Ref(q.Collection('DopeToken'), q.Var('token_id')),
              { data: q.Var('data') }
            )
          )
        )
      )
    );
    console.log('Done');
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();