import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../../.env' });

import { getOpenSeaAssets } from '../src/OpenSeaAsset';
import S3 from 'aws-sdk/clients/s3';
import { client, q } from '../src/fauna_client';

const S3_ID = process.env.S3_ID;
const S3_SECRET = process.env.S3_SECRET;
const S3_BUCKET = 'dope-wars-gg';
const FILENAME = 'open-sea-assets.json';

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
const s3client = new S3({
  apiVersion: '2006-03-01',
  accessKeyId: S3_ID,
  secretAccessKey: S3_SECRET,
});

export const updateOpenseaAssets = async (assetJson: any) => {
  // Translate to our document store in Fauna
  const assetsWithTokenId = assetJson.map((
      asset: { token_id: any; is_on_sale: any; current_sale_price_eth: any; last_sale_price_eth: any;
    }) => [
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
};

const main = async () => {
  try {
    const assetJson = await getOpenSeaAssets();
    const params = {
      Bucket: S3_BUCKET,
      Key: FILENAME,
      Body: JSON.stringify(assetJson),
    };
    await s3client.upload(params).promise();
    await updateOpenseaAssets(assetJson);
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

main();
