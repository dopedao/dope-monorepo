import { useMemo } from 'react';
import { Hustler, Item, ItemItemType } from 'generated/graphql';
import { HustlerSex } from 'utils/HustlerConfig';
import { HustlerHustlerSex } from 'generated/graphql';

const order = [
  ItemItemType.Clothes,
  ItemItemType.Waist,
  ItemItemType.Foot,
  ItemItemType.Hand,
  ItemItemType.Drugs,
  ItemItemType.Neck,
  ItemItemType.Ring,
  ItemItemType.Accessory,
  ItemItemType.Weapon,
  ItemItemType.Vehicle,
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
  }

  if (item.base?.rles && item.base?.rles[sex] !== '') {
    return item.base.rles[sex];
  }

  return '';
}

export const getHustlerRles = (
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
) => {
  console.log('hustlerRles', hustler);
  if (hustler) {
    const sex = hustler.sex === HustlerHustlerSex.Male ? 'male' : 'female';
    console.log('hustlerSex', hustler.sex, sex);
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
};

type DopeInput = { items?: (Pick<Item, 'type'> & Rles)[] | null } | null;

export const useDopeRles = (sex?: HustlerSex, dope?: DopeInput) =>
  useMemo(() => {
    if (sex && dope) {
      // vehicle should ALWAYS be last or we will break the svg renderer
      const sortedItems = dope.items
        ?.sort((a, b) => (order.indexOf(a.type) > order.indexOf(b.type) ? 1 : -1));
      const rles = sortedItems?.reduce((prev, item) => prev.concat(getRle(sex, item)), [] as string[]);
      
      return rles;
    }
  }, [sex, dope]);
