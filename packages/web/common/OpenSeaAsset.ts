import { NETWORK } from './constants';
import { OpenSeaAsset as OpenSeaAssetInterface } from '../src/generated/graphql';

// ⚠️ WARNING
//    This only works on PRODUCTION code.
//    Needs to be modified to work on testnet!
const dopeContractAddress = NETWORK[1].contracts.dope;

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
export const getOpenSeaAssetPagesJson = async (total_tokens = 8000) => {
  console.log('getOpenSeaAssetPagesJson');
  const ASSETS_PER_REQUEST = 50;
  const TOTAL_NUM_TOKENS = total_tokens;
  const assets = [];

  const baseUrl =
    'https://api.opensea.io/api/v1/assets' + `?asset_contract_address=${dopeContractAddress}`;
  '&order_by=pk' + '&order_direction=desc' + `&limit=${ASSETS_PER_REQUEST}`;

  for (let offset = 0; offset < TOTAL_NUM_TOKENS; offset += ASSETS_PER_REQUEST) {
    console.log(`getOpenSeaAssetPagesJson: ${offset}`);
    const currentUrl = baseUrl + '&offset=' + offset;
    const response = await fetch(currentUrl);
    const pageOfAssets = await response.json();
    assets.push(pageOfAssets['assets']);
  }
  const flatAssets = assets.flat(Infinity);
  const openSeaAssets = flatAssets.map(assetJson => {
    return Object.assign({ token_id: assetJson['token_id'] }, new OpenSeaAsset(assetJson));
  });
  console.log(openSeaAssets.length);
  return openSeaAssets;
};

function ethFromGwei(gwei: number) {
  return gwei / Math.pow(10, 18);
}

// See open-sea-assets.sample.json …
interface OpenSeaAssetJsonResponse {
  current_sale_price: number;
  // NOTE FOR FUTURE MAINTAINERS
  // OpenSea asset endpoint for SINGLE asset returns "orders",
  // while MULTIPLE assetS endpoint returns "sell_orders"
  sell_orders: any[];
  last_sale: any;
}

export class OpenSeaAsset implements OpenSeaAssetInterface {
  is_on_sale = false;
  current_sale_price: number | null = null;
  last_sale_price: number | null = null;
  constructor(json?: OpenSeaAssetJsonResponse) {
    if (!json) return;

    this.is_on_sale = json.sell_orders && json.sell_orders.length > 0;
    if (this.is_on_sale) {
      this.current_sale_price = ethFromGwei(json.sell_orders[0].current_price);
    }
    if (json.last_sale) {
      this.last_sale_price = ethFromGwei(json.last_sale.total_price);
    }
    // sale_kind == 0 (auction)
  }
}
