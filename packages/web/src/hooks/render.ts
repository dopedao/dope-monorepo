import { useMemo } from 'react';
import { Hustler, Item, ItemType } from 'generated/graphql';
import { HustlerSex } from 'utils/HustlerConfig';

const order = [
  ItemType.Clothes,
  ItemType.Waist,
  ItemType.Foot,
  ItemType.Hand,
  ItemType.Drugs,
  ItemType.Neck,
  ItemType.Ring,
  ItemType.Accessory,
  ItemType.Weapon,
  ItemType.Vehcile,
];

type Rles = Pick<Item, 'rles'> & {
  base?: Pick<Item, 'rles'> | null;
};

function getRle(sex: HustlerSex, item?: Rles | null) {
  if (!item) {
    return '';
  }

  if (item.rles && item.rles[sex] !== '') {
    return item.rles[sex];
  } else if (item.base?.rles && item.base?.rles[sex] !== '') {
    return item.base.rles[sex];
  }

  return '';
}

export const useHustlerRles = (
  hustler?:
    | (Pick<Hustler, 'sex'> & {
        clothes?: Rles | null;
        drug?: Rles | null;
        hand?: Rles | null;
        foot?: Rles | null;
        neck?: Rles | null;
        ring?: Rles | null;
        accessory?: Rles | null;
        vehicle?: Rles | null;
        waist?: Rles | null;
        weapon?: Rles | null;
      })
    | null,
) =>
  useMemo(() => {
    if (hustler) {
      const sex = hustler.sex === 'MALE' ? 'male' : 'female';

      return [
        getRle(sex, hustler.clothes),
        getRle(sex, hustler.waist),
        getRle(sex, hustler.foot),
        getRle(sex, hustler.hand),
        getRle(sex, hustler.drug),
        getRle(sex, hustler.neck),
        getRle(sex, hustler.ring),
        getRle(sex, hustler.accessory),
        getRle(sex, hustler.weapon),
        getRle(sex, hustler.vehicle),
      ];
    }
  }, [hustler]);

export const useDopeRles = (
  sex?: HustlerSex,
  dope?: {
    items: (Pick<Item, 'type'> & Rles)[];
  } | null,
) =>
  useMemo(() => {
    if (sex && dope) {
      return dope.items
        ?.sort((a, b) => (order.indexOf(a.type) < order.indexOf(b.type) ? 1 : -1))
        .reduce((prev, item) => [...prev, getRle(sex, item)], [] as string[]);
    }
  }, [sex, dope]);
