enum Categories {
  Character,
}

enum CharacterCategories {
  Base,
  Shadow,

  Clothes,
  Feet,
  Hands,
  Mask,
  Necklace,
  Ring,
  Waist,
  Weapons,
}

enum Base {
  Male,
}

enum Clothes {
  Shirtless,
}

enum Hands {
  BlackGloves,
}

enum Feet {
  NikeCortez,
}

enum Mask {
  MrFax,
}

enum Necklace {
  Gold,
}

enum Ring {
  Gold,
}

enum Waist {
  WaistSuspenders,
}

enum Weapons {
  AK47,
}

interface ISpritesMap {
  [Categories.Character]: {
    [Base.Male]: {
      [CharacterCategories.Base]: string;
      [CharacterCategories.Shadow]: string;

      [CharacterCategories.Clothes]: {
        [Clothes.Shirtless]: string;
      };
      [CharacterCategories.Feet]: {
        [Feet.NikeCortez]: string;
      };
      [CharacterCategories.Hands]: {
        [Hands.BlackGloves]: string;
      };
      [CharacterCategories.Mask]: {
        [Mask.MrFax]: string;
      };
      [CharacterCategories.Necklace]: {
        [Necklace.Gold]: string;
      };
      [CharacterCategories.Ring]: {
        [Ring.Gold]: string;
      };
      [CharacterCategories.Waist]: {
        [Waist.WaistSuspenders]: string;
      };
      [CharacterCategories.Weapons]: {
        [Weapons.AK47]: string;
      };
    };
  };
}

const SpritesMap: ISpritesMap = {
  [Categories.Character]: {
    [Base.Male]: {
      [CharacterCategories.Base]: 'male_base',
      [CharacterCategories.Shadow]: 'male_base_shadow',

      [CharacterCategories.Clothes]: {
        [Clothes.Shirtless]: 'male_clothes_shirtless',
      },
      [CharacterCategories.Feet]: {
        [Feet.NikeCortez]: 'male_feet_nikecortez',
      },
      [CharacterCategories.Hands]: {
        [Hands.BlackGloves]: 'male_hands_blackgloves',
      },
      [CharacterCategories.Mask]: {
        [Mask.MrFax]: 'male_mask_mrfax',
      },
      [CharacterCategories.Necklace]: {
        [Necklace.Gold]: 'male_necklace_gold',
      },
      [CharacterCategories.Ring]: {
        [Ring.Gold]: 'male_ring_gold',
      },
      [CharacterCategories.Waist]: {
        [Waist.WaistSuspenders]: 'male_waist_waistsuspenders',
      },
      [CharacterCategories.Weapons]: {
        [Weapons.AK47]: 'male_weapons_ak47',
      },
    },
  },
};

export {
  SpritesMap,
  Categories,
  CharacterCategories,
  Base,
  Clothes,
  Feet,
  Hands,
  Mask,
  Necklace,
  Ring,
  Waist,
  Weapons,
};
