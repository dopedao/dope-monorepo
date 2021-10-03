import type { NextApiRequest, NextApiResponse } from 'next'
import { getOpenSeaAssetPagesJson } from '../../common/OpenSeaAsset';

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  const assets = await getOpenSeaAssetPagesJson();
  return res.status(200).json(assets);
}
export default handler;