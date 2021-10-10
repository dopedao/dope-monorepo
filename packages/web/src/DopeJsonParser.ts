// Cached output of all our existing loot items
import DopeJson from 'dope-metrics/output/loot.json';

export const valueFromCachedLoot = (tokenId: number, key: string) => {
  const value = DopeJson[tokenId - 1][tokenId][key];
  return value;
};
