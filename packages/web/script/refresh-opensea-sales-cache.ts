// Github actions doesn't need dotenv file loaded.
// Only useful from our local machines.
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../../.env' });

import { getOpenSeaAssets } from '../src/OpenSeaAsset';
import S3 from 'aws-sdk/clients/s3';

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

const main = async () => {
  try {
    const assetJson = await getOpenSeaAssets();
    const params = {
      Bucket: S3_BUCKET,
      Key: FILENAME,
      Body: JSON.stringify(assetJson),
    };
    await s3client.upload(params).promise();
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

main();
