import { NETWORK } from '../common/constants';
import { OpenSeaAsset as OpenSeaAssetInterface } from '../src/generated/graphql';

class OpenSeaAsset implements OpenSeaAssetInterface {
  is_on_sale: boolean = false;
  current_sale_price: number | null = null;
  last_sale_price: number | null = null;
  sale_type: 'Auction' | 'Buy Now' | null = null;
  constructor(json?: Object) {
    console.log('Making OpenSeaAsset');
    if (json) console.log(json);
  }
}

/**
 * Simple GET against the OpenSea API.
 *
 * EXAMPLE:
 * getOpenSeaAsset(tokenId).then(r => r.json()).then(data => … )
 *
 */
export const getOpenSeaAsset = (tokenId: string) => {
  const contractAddress = NETWORK[1].contracts.dope;
  const url = `https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`;
  return fetch(url);
};

/**
 * Expects to receive OpenSea Asset.
 * Provides an OpenSeaAsset back in response.
 *
 * Example provided in open-sea-asset.sample.json
 */
export const openSeaAssetFromJson = (json: Object): OpenSeaAsset => {
  const asset = new OpenSeaAsset(json);
  return asset;
};
