import { useMemo } from 'react';
import { Hustler, HustlerSex, Item } from 'generated/graphql';

type Rles = Pick<Item, 'rles'> & {
  base?: Pick<Item, 'rles'> | null;
};

function getRle(sex: HustlerSex, item?: Rles | null) {
  if (!item) {
    return '';
  }

  const sex_ = sex === 'MALE' ? 'male' : 'female';

  if (item.rles && item.rles[sex_] !== '') {
    return item.rles[sex_];
  } else if (item.base?.rles && item.base?.rles[sex_] !== '') {
    return item.base.rles[sex_];
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
      return [
        getRle(hustler.sex, hustler.clothes),
        getRle(hustler.sex, hustler.weapon),
        getRle(hustler.sex, hustler.waist),
        getRle(hustler.sex, hustler.foot),
        getRle(hustler.sex, hustler.hand),
        getRle(hustler.sex, hustler.drug),
        getRle(hustler.sex, hustler.neck),
        getRle(hustler.sex, hustler.ring),
        getRle(hustler.sex, hustler.accessory),
        getRle(hustler.sex, hustler.vehicle),
      ];
    }
  }, [hustler]);
