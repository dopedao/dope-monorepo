import { NETWORK } from './constants';
import { OpenSeaAsset as OpenSeaAssetInterface } from '../src/generated/graphql';

/**
 * Simple GET against the OpenSea API.
 *
 * EXAMPLE:
 * getOpenSeaAssetJson(tokenId).then(r => r.json()).then(data => … )
 *
 */
 export const getOpenSeaAssetJson = (tokenId: string) => {
  const contractAddress = NETWORK[1].contracts.dope;
  const url = `https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`;
  return fetch(url, { mode: 'no-cors' });
};

function ethFromGwei(gwei) {
  return gwei / Math.pow(10, 18);
}

export class OpenSeaAsset implements OpenSeaAssetInterface {
  is_on_sale: boolean = false;
  current_sale_price: number | null = null;
  last_sale_price: number | null = null;
  constructor(json?: Object) {
    if (!json) return;
    this.is_on_sale = json.orders && json.orders.length > 0;
    if (this.is_on_sale) {
      this.current_sale_price = ethFromGwei(json.orders[0].current_price);
    }
    if (json.last_sale) {
      this.last_sale_price = ethFromGwei(json.last_sale.total_price);
    }
    // sale_kind == 0 (auction)
  }
}