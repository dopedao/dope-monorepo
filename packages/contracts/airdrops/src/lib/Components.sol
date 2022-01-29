// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

library ComponentTypes {
    uint8 internal constant WEAPON = 0x0;
    uint8 internal constant CLOTHES = 0x1;
    uint8 internal constant VEHICLE = 0x2;
    uint8 internal constant WAIST = 0x3;
    uint8 internal constant FOOT = 0x4;
    uint8 internal constant HAND = 0x5;
    uint8 internal constant DRUGS = 0x6;
    uint8 internal constant NECK = 0x7;
    uint8 internal constant RING = 0x8;
    uint8 internal constant ACCESSORY = 0x9;
    uint8 internal constant NAME_PREFIX = 0xa;
    uint8 internal constant NAME_SUFFIX = 0xb;
    uint8 internal constant SUFFIX = 0xc;
}

library Components {
    function pluck(bytes32 seed, uint256 sourceArrayLength)
        internal
        pure
        returns (uint8[5] memory)
    {
        uint8[5] memory components;
        uint256 rand = uint256(keccak256(abi.encodePacked(seed)));
        uint256 greatness = rand % 21;

        components[0] = uint8(rand % sourceArrayLength);
        components[1] = 0;
        components[2] = 0;

        if (greatness > 14) {
            components[1] = uint8((rand % 19) + 1);
        }
        if (greatness >= 19) {
            components[2] = uint8((rand % 64) + 1);
            components[3] = uint8((rand % 18) + 1);
            if (greatness == 19) {
                // ...
            } else {
                components[4] = 1;
            }
        }

        return components;
    }
}
