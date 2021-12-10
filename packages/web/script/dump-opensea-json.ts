import fs from 'fs';
import { getOpenSeaAssetPagesJson } from 'utils/OpenSeaAsset';

/**
 * Dumps raw output from OpenSea REST API
 * into a file we can use to test our parsing
 * code which refreshes information for Swap Meet.
 */
const main = async () => {
  console.log('Fetching OpenSea Assets');
  const assets = await getOpenSeaAssetPagesJson();
  try {
    const filename = 'test_fixtures/open-sea-api-response.json';
    fs.writeFileSync(filename, JSON.stringify(assets));
    console.log(`File written to ${filename}`);
  } catch (err) {
    console.error(err);
  }
};
export default main;

main();
