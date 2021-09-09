// SPDX-License-Identifier: GPL-3.0
// Taken from https://raw.githubusercontent.com/nounsDAO/nouns-monorepo/master/packages/nouns-contracts/contracts/interfaces/INounsDescriptor.sol

/// @title Interface for Character

pragma solidity ^0.8.6;

import {IProvider} from "./IProvider.sol";

interface ICharacter {
    struct Slot {
        uint24 provider;
        uint24 id;
    }

    struct Equipment {
        uint48 background;
        uint48 body;
        Slot clothes;
        Slot feet;
        Slot hand;
        Slot neck;
        Slot ring;
        Slot waist;
        Slot weapon;
        Slot drugs;
        Slot vehicle;
    }

    function equipmentOf(address) external view returns (Equipment memory);

    function palettes(uint8 paletteIndex, uint256 colorIndex)
        external
        view
        returns (string memory);

    function backgrounds(uint256 index) external view returns (string memory);

    function bodies(uint256 index) external view returns (bytes memory);

    function backgroundCount() external view returns (uint256);

    function bodyCount() external view returns (uint256);

    function addManyColorsToPalette(
        uint8 paletteIndex,
        string[] calldata newColors
    ) external;

    function addManyBackgrounds(string[] calldata backgrounds) external;

    function addManyBodies(bytes[] calldata bodies) external;

    function addColorToPalette(uint8 paletteIndex, string calldata color)
        external;

    function addBackground(string calldata background) external;

    function addBody(bytes calldata body) external;

    function addProvider(IProvider provider) external;

    function provider(uint24 index) external view returns (IProvider);

    function genericDataURI(
        string calldata name,
        string calldata description,
        Equipment memory equipment
    ) external view returns (string memory);

    function generateSVGImage(Equipment memory equipment)
        external
        view
        returns (string memory);
}
