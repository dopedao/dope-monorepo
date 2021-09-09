// SPDX-License-Identifier: GPL-3.0
// From https://github.com/nounsDAO/nouns-monorepo/blob/master/packages/nouns-contracts/contracts/interfaces/INounsSeeder.sol

/// @title Interface for CharacterSeeder

pragma solidity ^0.8.6;

import { ICharacterDescriptor } from "./ICharacterDescriptor.sol";

interface ICharacterSeeder {
    struct Seed {
        uint48 background;
        uint48 body;
        uint48 clothes;
        uint48 foot;
        uint48 hand;
        uint48 neck;
        uint48 ring;
        uint48 waist;
        uint48 weapon;
        uint48 drugs;
        uint48 vehicle;
    }

    function generateSeed(uint256 nounId, ICharacterDescriptor descriptor) external view returns (Seed memory);
}
