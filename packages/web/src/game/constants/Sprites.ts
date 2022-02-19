enum Categories {
  Character,
}

enum CharacterCategories {
  Base,

  Beard,
  Hair,
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
  Female,
}

enum Hair {
  Hair1,
  Hair2,
  Hair3,
  Hair4,
  Hair5,
  Hair6,
  Hair7,
  Hair8,
  Hair9,
  Hair10,
  Hair11,
  Hair12,
  Hair13,
  Hair14,
  Hair15,
  Hair16,
  Hair17,
  Hair18,
}

enum Beard {
  Beard1,
  Beard2,
  Beard3,
  Beard4,
  Beard5,
  Beard6,
  Beard7,
  Beard8,
  Beard9,
  Beard10,
  Beard11,
  Beard12,
}

enum Clothes {
  Shirtless,
  ThreePieceSuit,
  BasketballJersey,
  Bikini,
  BlackHoodie,
  BlackTanktop,
  BlackTshirt,
  BloodStainedShirt,
  BulletproofVest,
  CheckeredShirt,
  CombatJacket,
  GoldenShirt,
  LeatherVest,
  PoliceUniform,
  Tracksuit,
  Trenchcoat,
  WhiteHoodie,
  WhiteTanktop,
  WhiteTshirt,
}

enum Hands {
  BlackGloves,
  BaseballGloves,
  BoxingGloves,
  CombatGloves,
  FingerlessGloves,
  KevlarGloves,
  LeatherGloves,
  MmaGloves,
  NitrileGloves,
  RubberGloves,
  StuddedLeatherGloves,
  SurgicalGloves,
  WhiteGloves,
  WinterGloves,
}

enum Feet {
  NikeCortez,
  AirJordanOneChicago,
  AirMax95,
  AlligatorDressShoes,
  BlackAirforce,
  ConverseAllStars,
  DressShoes,
  FlipFlops,
  GucciSlides,
  GucciTennis84,
  OpenToeSandals,
  ReebokClassics,
  Socks,
  Timberlands,
  WhiteForces,
  WhiteSlippers,
}

enum Mask {
  MrFax,
}

enum Necklace {
  Gold,
  Silver,
  Bronze,
}

enum Ring {
  Diamond,
  Gold,
  Pinky,
  Platinum,
  Silver,
  Titanium,
  Tumb,
}

enum Waist {
  WaistSuspenders,
  ConcealedHolster,
  DiamondBelt,
  FannyBelt,
  GucciBelt,
  KnifeHolster,
  Laces,
  MetalBelt,
  MilitaryBelt,
  PistolHolster,
  RingBelt,
  Sash,
  SmgHolster,
  StuddedBelt,
  TaserHolster,
  VersaceBelt,
}

enum Weapons {
  AK47,
  BaseballBat,
  BrassKnuckle,
  Chain,
  Crowbar,
  Glock,
  Handgun,
  Knife,
  PepperSpray,
  PocketKnife,
  PoliceBaton,
  RazorBlade,
  Shotgun,
  Shovel,
  Taser,
  TireIron,
  Uzi,
}

// interface ISpritesMap {
//     [Categories.Character]: {
//         [Base.Male]: {
//             [CharacterCategories.Base]: string;

//             [CharacterCategories.Clothes]: {
//                 [Clothes.Shirtless]: string;
//             };
//             [CharacterCategories.Feet]: {
//                 [Feet.NikeCortez]: string;
//             };
//             [CharacterCategories.Hands]: {
//                 [Hands.BlackGloves]: string;
//             };
//             [CharacterCategories.Mask]: {
//                 [Mask.MrFax]: string;
//             };
//             [CharacterCategories.Necklace]: {
//                 [Necklace.Gold]: string;
//             };
//             [CharacterCategories.Ring]: {
//                 [Ring.Gold]: string;
//             };
//             [CharacterCategories.Waist]: {
//                 [Waist.WaistSuspenders]: string;
//             };
//             [CharacterCategories.Weapons]: {
//                 [Weapons.AK47]: string;
//             };
//         }
//     }
// }

const SpritesMap = {
  [Categories.Character]: {
    [Base.Male]: {
      [CharacterCategories.Base]: 'DW_M_Base_Spritesheet',

      [CharacterCategories.Beard]: {
        [Beard.Beard1]: 'DW_M_Beard_01_Spritesheet',
        [Beard.Beard2]: 'DW_M_Beard_02_Spritesheet',
        [Beard.Beard3]: 'DW_M_Beard_03_Spritesheet',
        [Beard.Beard4]: 'DW_M_Beard_04_Spritesheet',
        [Beard.Beard5]: 'DW_M_Beard_05_Spritesheet',
        [Beard.Beard6]: 'DW_M_Beard_06_Spritesheet',
        [Beard.Beard7]: 'DW_M_Beard_07_Spritesheet',
        [Beard.Beard8]: 'DW_M_Beard_08_Spritesheet',
        [Beard.Beard9]: 'DW_M_Beard_09_Spritesheet',
        [Beard.Beard10]: 'DW_M_Beard_10_Spritesheet',
        [Beard.Beard11]: 'DW_M_Beard_11_Spritesheet',
        [Beard.Beard12]: 'DW_M_Beard_12_Spritesheet',
      },
      [CharacterCategories.Hair]: {
        [Hair.Hair1]: 'DW_M_Hair_01_Spritesheet',
        [Hair.Hair2]: 'DW_M_Hair_02_Spritesheet',
        [Hair.Hair3]: 'DW_M_Hair_03_Spritesheet',
        [Hair.Hair4]: 'DW_M_Hair_04_Spritesheet',
        [Hair.Hair5]: 'DW_M_Hair_05_Spritesheet',
        [Hair.Hair6]: 'DW_M_Hair_06_Spritesheet',
        [Hair.Hair7]: 'DW_M_Hair_07_Spritesheet',
        [Hair.Hair8]: 'DW_M_Hair_08_Spritesheet',
        [Hair.Hair9]: 'DW_M_Hair_09_Spritesheet',
        [Hair.Hair10]: 'DW_M_Hair_10_Spritesheet',
        [Hair.Hair11]: 'DW_M_Hair_11_Spritesheet',
        [Hair.Hair12]: 'DW_M_Hair_12_Spritesheet',
        [Hair.Hair13]: 'DW_M_Hair_13_Spritesheet',
        [Hair.Hair14]: 'DW_M_Hair_14_Spritesheet',
        [Hair.Hair15]: 'DW_M_Hair_15_Spritesheet',
        [Hair.Hair16]: 'DW_M_Hair_16_Spritesheet',
        [Hair.Hair17]: 'DW_M_Hair_17_Spritesheet',
        [Hair.Hair18]: 'DW_M_Hair_18_Spritesheet',
      },
      [CharacterCategories.Clothes]: {
        [Clothes.Shirtless]: 'DW_M_Clothes_Shirtless_spritesheet',
        [Clothes.ThreePieceSuit]: 'DW_M_Clothes_3_Piece_Suit_spritesheet',
        [Clothes.BasketballJersey]: 'DW_M_Clothes_Basketball_Jersey_spritesheet',
        [Clothes.Bikini]: 'DW_M_Clothes_Bikini_spritesheet',
        [Clothes.BlackHoodie]: 'DW_M_Clothes_Black_Hoodie_spritesheet',
        [Clothes.BlackTanktop]: 'DW_M_Clothes_Black_Tanktop_spritesheet',
        [Clothes.BlackTshirt]: 'DW_M_Clothes_Black_Tshirt_spritesheet',
        [Clothes.BloodStainedShirt]: 'DW_M_Clothes_Blood_Stained_Shirt_spritesheet',
        [Clothes.BulletproofVest]: 'DW_M_Clothes_Bulletproof_Vest_spritesheet',
        [Clothes.CheckeredShirt]: 'DW_M_Clothes_Checkered_Shirt_spritesheet',
        [Clothes.CombatJacket]: 'DW_M_Clothes_Combat_Jacket_spritesheet',
        [Clothes.GoldenShirt]: 'DW_M_Clothes_Golden_Shirt_spritesheet',
        [Clothes.LeatherVest]: 'DW_M_Clothes_Leather_Vest_spritesheet',
        [Clothes.PoliceUniform]: 'DW_M_Clothes_Police_Uniform_spritesheet',
        [Clothes.Tracksuit]: 'DW_M_Clothes_Tracksuit_spritesheet',
        [Clothes.Trenchcoat]: 'DW_M_Clothes_Trenchcoat_spritesheet',
        [Clothes.WhiteHoodie]: 'DW_M_Clothes_White_Hoodie_spritesheet',
        [Clothes.WhiteTanktop]: 'DW_M_Clothes_White_Tanktop_spritesheet',
        [Clothes.WhiteTshirt]: 'DW_M_Clothes_White_Tshirt_spritesheet',
      },
      [CharacterCategories.Feet]: {
        [Feet.NikeCortez]: 'DW_M_Feet_Nike_Cortez_Spritesheet',
        [Feet.AirJordanOneChicago]: 'DW_M_Feet_Air_Jordan_1_Chicagos_Spritesheet',
        [Feet.AirMax95]: 'DW_M_Feet_Air_Max_95_Spritesheet',
        [Feet.AlligatorDressShoes]: 'DW_M_Feet_Alligator_Dress_Shoes_Spritesheet',
        [Feet.BlackAirforce]: 'DW_M_Feet_Black_Airforce_Spritesheet',
        [Feet.ConverseAllStars]: 'DW_M_Feet_Converse_All_Stars_Spritesheet',
        [Feet.DressShoes]: 'DW_M_Feet_Dress_Shoes_Spritesheet',
        [Feet.FlipFlops]: 'DW_M_Feet_Flip_Flops_Spritesheet',
        [Feet.GucciSlides]: 'DW_M_Feet_Gucci_Slides_Spritesheet',
        [Feet.GucciTennis84]: 'DW_M_Feet_Gucci_Tenis_84_Spritesheet',
        [Feet.OpenToeSandals]: 'DW_M_Feet_Open_Toe_Sandals_Spritesheet',
        [Feet.ReebokClassics]: 'DW_M_Feet_Reebok_Classics_Spritesheet',
        [Feet.Socks]: 'DW_M_Feet_Socks_Spritesheet',
        [Feet.Timberlands]: 'DW_M_Feet_Timberlands_Spritesheet',
        [Feet.WhiteForces]: 'DW_M_Feet_White_Forces_Spritesheet',
        [Feet.WhiteSlippers]: 'DW_M_Feet_White_Slippers_Spritesheet',
      },
      [CharacterCategories.Hands]: {
        [Hands.BlackGloves]: 'DW_M_Hands_Black_Gloves_Spritesheet',
        [Hands.BaseballGloves]: 'DW_M_Hands_Basebal_Gloves_Spritesheet',
        [Hands.BoxingGloves]: 'DW_M_Hands_Boxing_Gloves_Spritesheet',
        [Hands.CombatGloves]: 'DW_M_Hands_Combat_Gloves_Spritesheet',
        [Hands.FingerlessGloves]: 'DW_M_Hands_Fingerless_Gloves_Spritesheet',
        [Hands.KevlarGloves]: 'DW_M_Hands_Kevlar_Gloves_Spritesheet',
        [Hands.LeatherGloves]: 'DW_M_Hands_Leather_Gloves_Spritesheet',
        [Hands.MmaGloves]: 'DW_M_Hands_MMA_Gloves_Spritesheet',
        [Hands.NitrileGloves]: 'DW_M_Hands_Nitrile_Gloves_Spritesheet',
        [Hands.RubberGloves]: 'DW_M_Hands_Rubber_Gloves_Spritesheet',
        [Hands.StuddedLeatherGloves]: 'DW_M_Hands_StuddedLeather_Gloves_Spritesheet',
        [Hands.SurgicalGloves]: 'DW_M_Hands_Surgical_Gloves_Spritesheet',
        [Hands.WhiteGloves]: 'DW_M_Hands_White_Gloves_Spritesheet',
        [Hands.WinterGloves]: 'DW_M_Hands_Winter_Gloves_Spritesheet',
      },
      // [CharacterCategories.Mask]: {
      //     [Mask.MrFax]: 'male_mask_mrfax'
      // },
      [CharacterCategories.Necklace]: {
        [Necklace.Gold]: 'DW_M_Necklace_Gold_Spritesheet',
        [Necklace.Silver]: 'DW_M_Necklace_Silver_Chain_Spritesheet',
        [Necklace.Bronze]: 'DW_M_Necklace_Bronze_Chain_Spritesheet',
      },
      [CharacterCategories.Ring]: {
        [Ring.Diamond]: 'DW_M_Ring_Diamond_Spritesheet',
        [Ring.Gold]: 'DW_M_Ring_Gold_Spritesheet',
        [Ring.Pinky]: 'DW_M_Ring_Pinky_Spritesheet',
        [Ring.Platinum]: 'DW_M_Ring_Platinum_Spritesheet',
        [Ring.Silver]: 'DW_M_Ring_Silver_Spritesheet',
        [Ring.Titanium]: 'DW_M_Ring_Titanium_Spritesheet',
        [Ring.Tumb]: 'DW_M_Ring_Tumb_Spritesheet',
      },
      [CharacterCategories.Waist]: {
        [Waist.WaistSuspenders]: 'DW_M_Waist_Suspenders_Spritesheet',
        [Waist.ConcealedHolster]: 'DW_M_Waist_Concealed_Holster_Spritesheet',
        [Waist.DiamondBelt]: 'DW_M_Waist_Diamond_Belt_Spritesheet',
        [Waist.FannyBelt]: 'DW_M_Waist_Fanny_Belt_Spritesheet',
        [Waist.GucciBelt]: 'DW_M_Waist_Gucci_Belt_Spritesheet',
        [Waist.KnifeHolster]: 'DW_M_Waist_Knife_Holster_Spritesheet',
        [Waist.Laces]: 'DW_M_Waist_Laces_Spritesheet',
        [Waist.MetalBelt]: 'DW_M_Waist_Metal_Belt_Spritesheet',
        [Waist.MilitaryBelt]: 'DW_M_Waist_Military_Belt_Spritesheet',
        [Waist.PistolHolster]: 'DW_M_Waist_Pistol_Holster_Spritesheet',
        [Waist.RingBelt]: 'DW_M_Waist_Ring_Belt_Spritesheet',
        [Waist.Sash]: 'DW_M_Waist_Sash_Spritesheet',
        [Waist.SmgHolster]: 'DW_M_Waist_SMG_Holster_Spritesheet',
        [Waist.StuddedBelt]: 'DW_M_Waist_Studded_Belt_Spritesheet',
        [Waist.TaserHolster]: 'DW_M_Waist_Taser_Holster_Spritesheet',
        [Waist.VersaceBelt]: 'DW_M_Waist_Versace_Belt_Spritesheet',
      },
      [CharacterCategories.Weapons]: {
        [Weapons.AK47]: 'DW_M_Weapon_AK47_Spritesheet',
        [Weapons.BaseballBat]: 'DW_M_Weapon_Baseball_Bat_Spritesheet',
        [Weapons.BrassKnuckle]: 'DW_M_Weapon_Brass_Knuckle_Spritesheet',
        [Weapons.Chain]: 'DW_M_Weapon_Chain_Spritesheet',
        [Weapons.Crowbar]: 'DW_M_Weapon_Crowbar_Spritesheet',
        [Weapons.Glock]: 'DW_M_Weapon_Glock_Spritesheet',
        [Weapons.Handgun]: 'DW_M_Weapon_Handgun_Spritesheet',
        [Weapons.Knife]: 'DW_M_Weapon_Knife_Spritesheet',
        [Weapons.PepperSpray]: 'DW_M_Weapon_Pepper_Spray_Spritesheet',
        [Weapons.PocketKnife]: 'DW_M_Weapon_Pocket_Knife_Spritesheet',
        [Weapons.PoliceBaton]: 'DW_M_Weapon_Police_Baton_Spritesheet',
        [Weapons.RazorBlade]: 'DW_M_Weapon_Razor_Blade_Spritesheet',
        [Weapons.Shotgun]: 'DW_M_Weapon_Shotgun_Spritesheet',
        [Weapons.Shovel]: 'DW_M_Weapon_Shovel_Spritesheet',
        [Weapons.Taser]: 'DW_M_Weapon_Taser_Spritesheet',
        [Weapons.TireIron]: 'DW_M_Weapon_Tire_Iron_Spritesheet',
        [Weapons.Uzi]: 'DW_M_Weapon_Uzi_Spritesheet',
      },
    },
    [Base.Female]: {
      [CharacterCategories.Base]: 'DW_F_Base_Spritesheet',

      [CharacterCategories.Hair]: {
        [Hair.Hair1]: 'DW_F_Hair_01_Spritesheet',
        [Hair.Hair2]: 'DW_F_Hair_02_Spritesheet',
        [Hair.Hair3]: 'DW_F_Hair_03_Spritesheet',
        [Hair.Hair4]: 'DW_F_Hair_04_Spritesheet',
        [Hair.Hair5]: 'DW_F_Hair_05_Spritesheet',
        [Hair.Hair6]: 'DW_F_Hair_06_Spritesheet',
        [Hair.Hair7]: 'DW_F_Hair_07_Spritesheet',
        [Hair.Hair8]: 'DW_F_Hair_08_Spritesheet',
        [Hair.Hair9]: 'DW_F_Hair_09_Spritesheet',
        [Hair.Hair10]: 'DW_F_Hair_10_Spritesheet',
        [Hair.Hair11]: 'DW_F_Hair_11_Spritesheet',
        [Hair.Hair12]: 'DW_F_Hair_12_Spritesheet',
        [Hair.Hair13]: 'DW_F_Hair_13_Spritesheet',
        [Hair.Hair14]: 'DW_F_Hair_14_Spritesheet',
        [Hair.Hair15]: 'DW_F_Hair_15_Spritesheet',
        [Hair.Hair16]: 'DW_F_Hair_16_Spritesheet',
        [Hair.Hair17]: 'DW_F_Hair_17_Spritesheet',
        [Hair.Hair18]: 'DW_F_Hair_18_Spritesheet',
      },
      [CharacterCategories.Clothes]: {
        [Clothes.Shirtless]: 'DW_F_Clothes_Shirtless_Spritesheet',
        [Clothes.ThreePieceSuit]: 'DW_F_Clothes_3_Piece_Suit_Spritesheet',
        [Clothes.BasketballJersey]: 'DW_F_Clothes_Basketball_Jersey_Spritesheet',
        [Clothes.Bikini]: 'DW_F_Clothes_Bikini_Spritesheet',
        [Clothes.BlackHoodie]: 'DW_F_Clothes_Black_Hoodie_Spritesheet',
        [Clothes.BlackTanktop]: 'DW_F_Clothes_Black_Tanktop_Spritesheet',
        [Clothes.BlackTshirt]: 'DW_F_Clothes_Black_Tshirt_Spritesheet',
        [Clothes.BloodStainedShirt]: 'DW_F_Clothes_Blood_Stained_Shirt_Spritesheet',
        [Clothes.BulletproofVest]: 'DW_F_Clothes_Bulletproof_Vest_Spritesheet',
        [Clothes.CheckeredShirt]: 'DW_F_Clothes_Checkered_Shirt_Spritesheet',
        [Clothes.CombatJacket]: 'DW_F_Clothes_Combat_Jacket_Spritesheet',
        [Clothes.GoldenShirt]: 'DW_F_Clothes_Golden_Shirt_Spritesheet',
        [Clothes.LeatherVest]: 'DW_F_Clothes_Leather_Vest_Spritesheet',
        [Clothes.PoliceUniform]: 'DW_F_Clothes_Police_Uniform_Spritesheet',
        [Clothes.Tracksuit]: 'DW_F_Clothes_Track_Suit_Spritesheet',
        [Clothes.Trenchcoat]: 'DW_F_Clothes_Trenchcoat_Spritesheet',
        [Clothes.WhiteHoodie]: 'DW_F_Clothes_White_Hoodie_Spritesheet',
        [Clothes.WhiteTanktop]: 'DW_F_Clothes_White_Tanktop_Spritesheet',
        [Clothes.WhiteTshirt]: 'DW_F_Clothes_White_Tshirt_Spritesheet',
      },
      [CharacterCategories.Feet]: {
        [Feet.NikeCortez]: 'DW_F_Feet_Nike_Cortez_Spritesheet',
        [Feet.AirJordanOneChicago]: 'DW_F_Feet_Air_Jordan_1_Chicagos_Spritesheet',
        [Feet.AirMax95]: 'DW_F_Feet_Air_Max_95_Spritesheet',
        [Feet.AlligatorDressShoes]: 'DW_F_Feet_Alligator_Dress_Shoes_Spritesheet',
        [Feet.BlackAirforce]: 'DW_F_Feet_Black_Airforce_Spritesheet',
        [Feet.ConverseAllStars]: 'DW_F_Feet_Converse_All_Stars_Spritesheet',
        [Feet.DressShoes]: 'DW_F_Feet_Dress_Shoes_Spritesheet',
        [Feet.FlipFlops]: 'DW_F_Feet_Flip_Flops_Spritesheet',
        [Feet.GucciSlides]: 'DW_F_Feet_Gucci_Slides_Spritesheet',
        [Feet.GucciTennis84]: 'DW_F_Feet_Gucci_Tennis_84_Spritesheet',
        [Feet.OpenToeSandals]: 'DW_F_Feet_Open_Toe_Sandals_Spritesheet',
        [Feet.ReebokClassics]: 'DW_F_Feet_Reebok_Classics_Spritesheet',
        [Feet.Socks]: 'DW_F_Feet_Socks_Spritesheet',
        [Feet.Timberlands]: 'DW_F_Feet_Timberlands_Spritesheet',
        [Feet.WhiteForces]: 'DW_F_White_Forces_Spritesheet',
        [Feet.WhiteSlippers]: 'DW_F_White_Slippers_Spritesheet',
      },
      [CharacterCategories.Hands]: {
        [Hands.BlackGloves]: 'DW_F_Hands_Black_Gloves_Spritesheet',
        [Hands.BaseballGloves]: 'DW_F_Hands_Baseball_Gloves_Spritesheet',
        [Hands.BoxingGloves]: 'DW_F_Hands_Boxing_Gloves_Spritesheet',
        [Hands.CombatGloves]: 'DW_F_Hands_Combat_Gloves_Spritesheet',
        [Hands.FingerlessGloves]: 'DW_F_Hands_Fingerlesst_Gloves_Spritesheet',
        [Hands.KevlarGloves]: 'DW_F_Hands_Kevlart_Gloves_Spritesheet',
        [Hands.LeatherGloves]: 'DW_F_Hands_Leather_Gloves_Spritesheet',
        [Hands.MmaGloves]: 'DW_F_Hands_MMA_Gloves_Spritesheet',
        [Hands.NitrileGloves]: 'DW_F_Hands_Nitirile_Gloves_Spritesheet',
        [Hands.RubberGloves]: 'DW_F_Hands_Rubber_Gloves_Spritesheet',
        [Hands.StuddedLeatherGloves]: 'DW_F_Hands_Studded_Leather_Gloves_Spritesheet',
        [Hands.SurgicalGloves]: 'DW_F_Hands_Surgical_Gloves_Spritesheet',
        [Hands.WhiteGloves]: 'DW_F_Hands_White_Gloves_Spritesheet',
        [Hands.WinterGloves]: 'DW_F_Hands_Winter_Gloves_Spritesheet',
      },
      // [CharacterCategories.Mask]: {
      //     [Mask.MrFax]: 'male_mask_mrfax'
      // },
      [CharacterCategories.Necklace]: {
        [Necklace.Gold]: 'DW_F_Necklace_Gold_Spritesheet',
        [Necklace.Silver]: 'DW_F_Necklace_Silver_Spritesheet',
        [Necklace.Bronze]: 'DW_F_Necklace_Bronze_Spritesheet',
      },
      [CharacterCategories.Ring]: {
        [Ring.Diamond]: 'DW_F_Ring_Diamond_Spritesheet',
        [Ring.Gold]: 'DW_F_Ring_Gold_Spritesheet',
        [Ring.Pinky]: 'DW_F_Ring_Pinky_Spritesheet',
        [Ring.Platinum]: 'DW_F_Ring_Platinum_Spritesheet',
        [Ring.Silver]: 'DW_F_Ring_Silver_Spritesheet',
        [Ring.Titanium]: 'DW_F_Ring_Titanium_Spritesheet',
        [Ring.Tumb]: 'DW_F_Ring_Thumb_Spritesheet',
      },
      [CharacterCategories.Waist]: {
        [Waist.WaistSuspenders]: 'DW_F_Waist_Suspenders_Spritesheet',
        [Waist.ConcealedHolster]: 'DW_F_Waist_Concealed_Holster_Spritesheet',
        [Waist.DiamondBelt]: 'DW_F_Waist_Diamond_Belt_Spritesheet',
        [Waist.FannyBelt]: 'DW_F_Waist_Fanny_Pack_Spritesheet',
        [Waist.GucciBelt]: 'DW_F_Waist_Gucci_Belt_Spritesheet',
        [Waist.KnifeHolster]: 'DW_F_Waist_Knife_Holster_Spritesheet',
        [Waist.Laces]: 'DW_F_Waist_Laces_Spritesheet',
        [Waist.MetalBelt]: 'DW_F_Waist_Metal_Belt_Spritesheet',
        [Waist.MilitaryBelt]: 'DW_F_Waist_Military_Belt_Spritesheet',
        [Waist.PistolHolster]: 'DW_F_Waist_Pistol_Holster_Spritesheet',
        [Waist.RingBelt]: 'DW_F_Waist_Ring_Belt_Spritesheet',
        [Waist.Sash]: 'DW_F_Waist_Sash_Spritesheet',
        [Waist.SmgHolster]: 'DW_F_Waist_SMG_Holster_Spritesheet',
        [Waist.StuddedBelt]: 'DW_F_Waist_Studded_Belt_Spritesheet',
        [Waist.TaserHolster]: 'DW_F_Waist_Taser_Holster_Spritesheet',
        [Waist.VersaceBelt]: 'DW_F_Waist_Versace_Belt_Spritesheet',
      },
      // [CharacterCategories.Weapons]: {
      //     [Weapons.AK47]: 'DW_F_Weapon_AK47_Spritesheet',
      //     [Weapons.BaseballBat]: 'DW_F_Weapon_Baseball_Bat_Spritesheet',
      //     [Weapons.BrassKnuckle]: 'DW_F_Weapon_Brass_Knuckle_Spritesheet',
      //     [Weapons.Chain]: 'DW_F_Weapon_Chain_Spritesheet',
      //     [Weapons.Crowbar]: 'DW_F_Weapon_Crowbar_Spritesheet',
      //     [Weapons.Glock]: 'DW_F_Weapon_Glock_Spritesheet',
      //     [Weapons.Handgun]: 'DW_F_Weapon_Handgun_Spritesheet',
      //     [Weapons.Knife]: 'DW_F_Weapon_Knife_Spritesheet',
      //     [Weapons.PepperSpray]: 'DW_F_Weapon_Pepper_Spray_Spritesheet',
      //     [Weapons.PocketKnife]: 'DW_F_Weapon_Pocket_Knife_Spritesheet',
      //     [Weapons.PoliceBaton]: 'DW_F_Weapon_Police_Baton_Spritesheet',
      //     [Weapons.RazorBlade]: 'DW_F_Weapon_Razor_Blade_Spritesheet',
      //     [Weapons.Shotgun]: 'DW_F_Weapon_Shotgun_Spritesheet',
      //     [Weapons.Shovel]: 'DW_F_Weapon_Shovel_Spritesheet',
      //     [Weapons.Taser]: 'DW_F_Weapon_Taser_Spritesheet',
      //     [Weapons.TireIron]: 'DW_F_Weapon_Tire_Iron_Spritesheet',
      //     [Weapons.Uzi]: 'DW_F_Weapon_Uzi_Spritesheet',
      // }
    },
  },
};

export {
  SpritesMap,
  Categories,
  CharacterCategories,
  Base,
  Hair,
  Beard,
  Clothes,
  Feet,
  Hands,
  Mask,
  Necklace,
  Ring,
  Waist,
  Weapons,
};
