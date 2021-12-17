import rare from 'dope-metrics/output/rare.json';

export const rareById: { [name: string]: { rarest: number } } = Object.values(rare).reduce(
  (rareById, rare) => {
    return {
      ...rareById,
      [rare.lootId]: rare,
    };
  },
  {},
);

export const getRarityForDopeId = (id: string | number): number => {
  return rareById[id].rarest;
};
