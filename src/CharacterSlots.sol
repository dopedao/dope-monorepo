// SPDX-License-Identifier: GPL-3.0
// From https://github.com/nounsDAO/nouns-monorepo/blob/master/packages/nouns-contracts/contracts/NounsSeeder.sol

/// @title The CharacterToken pseudo-random seed generator

pragma solidity ^0.8.6;

import { ICharacterSeeder } from './interfaces/ICharacterSeeder.sol';
import { ICharacterDescriptor } from './interfaces/ICharacterDescriptor.sol';

contract CharacterSeeder is ICharacterSeeder {
    /**
     * @notice Generate a pseudo-random Noun seed using the previous blockhash and noun ID.
     */
    // prettier-ignore
    // function getSeed(uint256 id, ICharacterDescriptor descriptor) external view override returns (Seed memory) {
    //     uint256 backgroundCount = descriptor.backgroundCount();
    //     uint256 bodyCount = descriptor.bodyCount();
    //     uint256 accessoryCount = descriptor.accessoryCount();
    //     uint256 headCount = descriptor.headCount();
    //     uint256 glassesCount = descriptor.glassesCount();

    //     return Seed({
    //         background: uint48(
    //             uint48(pseudorandomness) % backgroundCount
    //         ),
    //         body: uint48(
    //             uint48(pseudorandomness >> 48) % bodyCount
    //         ),
    //         accessory: uint48(
    //             uint48(pseudorandomness >> 96) % accessoryCount
    //         ),
    //         head: uint48(
    //             uint48(pseudorandomness >> 144) % headCount
    //         ),
    //         glasses: uint48(
    //             uint48(pseudorandomness >> 192) % glassesCount
    //         )
    //     });
    // }
}
