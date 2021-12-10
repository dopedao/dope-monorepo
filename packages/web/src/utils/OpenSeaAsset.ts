import fetch from 'isomorphic-fetch';
import { NETWORK } from './constants';
import { OpenSeaAsset as OpenSeaAssetInterface } from 'generated/graphql';

// ⚠️ WARNING
//    This only works on PRODUCTION code.
//    Needs to be modified to work on testnet!
const dopeContractAddress = NETWORK[1].contracts.dope;
export const MAX_TOKENS = 8000;

// See open-sea-assets.sample.json …
export interface OpenSeaAssetJsonResponse {
  token_id: number;
  current_sale_price: number;
  // NOTE FOR FUTURE MAINTAINERS
  // OpenSea asset endpoint for SINGLE asset returns "orders",
  // while MULTIPLE assetS endpoint returns "sell_orders"
  sell_orders: any[];
  last_sale: any;
}

/**
 * Simple GET against the OpenSea API.
 *
 * EXAMPLE:
 * getOpenSeaAssetJson(tokenId).then(r => r.json()).then(data => … )
 *
 */
export const getOpenSeaAssetJson = (tokenId: string) => {
  const url = `https://api.opensea.io/api/v1/asset/${dopeContractAddress}/${tokenId}/`;
  return fetch(url);
};

// NOTE: MUST BE CALLED ON SERVER-SIDE OR FAILS CORS
// Called from api/open-sea-assets
export const getOpenSeaAssetPagesJson = async (totalTokens = MAX_TOKENS) => {
  console.log('getOpenSeaAssetPagesJson');
  const maxAssetsPerRequest = 50;
  const ASSETS_PER_REQUEST = maxAssetsPerRequest > totalTokens ? totalTokens : maxAssetsPerRequest;
  const TOTAL_NUM_TOKENS = totalTokens;
  const assets = [];

  const baseUrl = `https://api.opensea.io/api/v1/assets?asset_contract_address=${dopeContractAddress}&order_direction=asc&limit=${ASSETS_PER_REQUEST}`;

  for (let offset = 0; offset < TOTAL_NUM_TOKENS; offset += ASSETS_PER_REQUEST) {
    console.log(`getOpenSeaAssetPagesJson: ${offset}`);
    const currentUrl = baseUrl + '&offset=' + offset;
    const response = await fetch(currentUrl);
    const pageOfAssets = await response.json();
    assets.push(pageOfAssets['assets']);
  }
  const flatAssets = assets.flat(Infinity);
  return flatAssets;
};

export const getOpenSeaAssets = async (totalTokens = MAX_TOKENS) => {
  const assets = await getOpenSeaAssetPagesJson(totalTokens);
  const openSeaAssets = assets.map(asset => {
    return Object.assign({ token_id: asset['token_id'] }, new OpenSeaAsset(asset));
  });
  //console.log(openSeaAssets.length);
  return openSeaAssets;
};

export const ethFromGwei = (gwei: number) => {
  return gwei / Math.pow(10, 18);
};

export class OpenSeaAsset implements OpenSeaAssetInterface {
  is_on_sale = false;
  current_sale_price: number | null = null;
  last_sale_price: number | null = null;
  constructor(json?: OpenSeaAssetJsonResponse) {
    if (!json) return;
    if (json.sell_orders && json.sell_orders.length > 0) {
      this.is_on_sale = true;
    }
    if (this.is_on_sale) {
      this.current_sale_price = ethFromGwei(json.sell_orders[0].current_price);
    }
    if (json.last_sale) {
      this.last_sale_price = ethFromGwei(json.last_sale.total_price);
    }
    // sale_kind == 0 (auction)
  }
}
