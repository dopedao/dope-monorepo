import fs from 'fs';
// Have to import entire module so we can spy on named methods.
import * as osa from './OpenSeaAsset';

const file = 'src/test_fixtures/open-sea-api-response.json';
const dump = JSON.parse(fs.readFileSync(file, 'utf8'));

test('Dumped OpenSea response file contains expected tokens', () => {
  expect(dump.length).toBe(osa.MAX_TOKENS);

  const firstItem = dump[0];
  const firstTokenId = parseInt(firstItem['token_id']);
  expect(firstTokenId).toBe(1);

  const lastItem = dump[osa.MAX_TOKENS - 1];
  const lastTokenId = parseInt(lastItem['token_id']);
  expect(lastTokenId).toBe(osa.MAX_TOKENS);
});

describe('getOpenSeaAssetPagesJson', () => {
  // NOTE
  //
  // The method called here actually hits the OpenSea API and should probably
  // be stubbed in the future if we utilize testing more heavily.
  test('returns expected amount of tokens', async () => {
    const numExpectedAssets = 5;
    const assets = await osa.getOpenSeaAssetPagesJson(numExpectedAssets);
    expect(assets.length).toBe(numExpectedAssets);
  });
});

describe('getOpenSeaAssets', () => {
  test('returns an array of OpenSeaAsset objects', async () => {
    jest.spyOn(osa, 'getOpenSeaAssetPagesJson').mockReturnValue(dump);
    const assets = await osa.getOpenSeaAssets();
    const firstAsset = assets[0];
    expect(firstAsset.token_id).toBe('1');
    expect(typeof firstAsset.is_on_sale).toBe('boolean');
  });
});

describe('ethFromGwei', () => {
  test('calculates values properly', () => {
    const gwei = 150000000000000000;
    const eth = osa.ethFromGwei(gwei);
    expect(eth).toBe(0.15);
  });
});
