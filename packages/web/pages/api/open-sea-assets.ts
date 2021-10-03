import type { NextApiRequest, NextApiResponse } from 'next';
import { getOpenSeaAssetPagesJson } from '../../common/OpenSeaAsset';
import S3 from 'aws-sdk/clients/s3';

// 🙃
// Yes – we know this is super fucking insecure but we're OK with it
// for the short time we'll be using s3 to store information before
// moving to a database solution.
//
// The id / secret combo only has access to this one single s3 bucket.
const S3_ID = 'AKIA6IWRH3MO2JJ4VSHZ';
const S3_SECRET = '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';
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
  if (!req.query.secret_word || req.query.secret_word !== 'big-pimpin') {
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
