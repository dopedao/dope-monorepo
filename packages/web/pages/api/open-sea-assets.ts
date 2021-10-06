import type { NextApiRequest, NextApiResponse } from 'next';
import { getOpenSeaAssetPagesJson } from '../../common/OpenSeaAsset';
import S3 from 'aws-sdk/clients/s3';
import dotenv from 'dotenv';

const config = dotenv.config();
if (config.error) throw config.error;
if (!config.parsed) throw 'Unable to parse .env file';

const parsedConfig = config.parsed;

const S3_ID = parsedConfig['S3_ID'];
const S3_SECRET = parsedConfig['S3_SECRET'];
const SECRET_WORD = parsedConfig['SECRET_WORD'];
const S3_BUCKET = 'dope-wars-gg';
const FILENAME = 'open-sea-assets.json';

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
const s3client = new S3({
  apiVersion: '2006-03-01',
  accessKeyId: S3_ID,
  secretAccessKey: S3_SECRET,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const wordGiven = req.query.secret_word;
  // Bootleg protection so someone guessing the endpoint has to work a little harder to DOS.
  if (!wordGiven || wordGiven !== SECRET_WORD) {
    console.log('Secret API fail');
    console.log(`Given: ${wordGiven} / ${SECRET_WORD}`);
    return res.status(403).send(`Not a chance.`);
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
