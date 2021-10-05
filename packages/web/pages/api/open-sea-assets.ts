import type { NextApiRequest, NextApiResponse } from 'next';
import { getOpenSeaAssetPagesJson } from '../../common/OpenSeaAsset';
import S3 from 'aws-sdk/clients/s3';
import dotenv from 'dotenv';

interface DotEnvInterface {
  S3_ID: string;
  S3_SECRET: string;
  SECRET_API_WORD: string;
  error?: Error;
}

const config = dotenv.config() as DotEnvInterface
if (config.error) throw config.error;

const S3_ID = config['S3_ID'];
const S3_SECRET = config['S3_SECRET'];
const SECRET_WORD = config['SECRET_API_WORD'];
const S3_BUCKET = 'dope-wars-gg';
const FILENAME = 'open-sea-assets.json';

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
const s3client = new S3({
  apiVersion: '2006-03-01',
  accessKeyId: S3_ID,
  secretAccessKey: S3_SECRET,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Bootleg protection so someone guessing the endpoint has to work a little harder to DOS.
  if (!req.query.secret_word || req.query.secret_word !== SECRET_WORD) {
    res.status(403).send('Not a chance.');
  }
  // Fetch
  const assetJson = await getOpenSeaAssetPagesJson();
  const params = {
    Bucket: S3_BUCKET,
    Key: FILENAME,
    Body: JSON.stringify(assetJson),
  };
  try {
    await s3client.upload(params).promise();
    return res.status(200).send('DOPE');
  } catch (e) {
    return res.status(500).send(e);
  }
};
export default handler;
