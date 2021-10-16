import { client, q } from '../src/fauna-client';
import { getOpenSeaAssets } from '../src/OpenSeaAsset';

/**
 * Polls OpenSea for DOPE Token sales information.
 * Stores that information in our FaunaDB collection.
 */

(async () => {
  try {
    const assets = await getOpenSeaAssets();
    const assetsWithTokenId = assets.map(asset => [asset.token_id, asset]);
    const response = await client.query(
      q.Map(
        assetsWithTokenId, 
        q.Lambda(
          ['token_id', 'data'], 
          // Fauna doesn't have a native "upsert", so we use an if statement
          q.If(
            q.Exists(q.Ref(q.Collection('OpenSeaAsset'), q.Var('token_id'))),
            q.Update(
              q.Ref(q.Collection('OpenSeaAsset'), q.Var('token_id')),
              { data: q.Var('data') }
            ),
            q.Create(
              q.Ref(q.Collection('OpenSeaAsset'), q.Var('token_id')),
              { data: q.Var('data') }
            )
          )
        )
      )
    );
    // console.log(response);
    console.log('Done');
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();