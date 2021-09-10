// SPDX-License-Identifier: GPL-3.0
// Taken from https://raw.githubusercontent.com/nounsDAO/nouns-monorepo/master/packages/nouns-contracts/contracts/interfaces/INounsDescriptor.sol

/// @title Interface for Character

pragma solidity ^0.8.6;

interface ICharacter {
    struct Equipment {
        uint48 background;
        uint48 body;
        uint48 clothes;
        uint48 feet;
        uint48 hand;
        uint48 neck;
        uint48 ring;
        uint48 waist;
        uint48 weapon;
        uint48 drugs;
        uint48 vehicle;
    }

    function equipmentOf(address) external view returns (Equipment memory);

    function palettes(uint8 paletteIndex, uint256 colorIndex) external view returns (string memory);

    function backgrounds(uint256 index) external view returns (string memory);

    function bodies(uint256 index) external view returns (bytes memory);

    function backgroundCount() external view returns (uint256);

    function bodyCount() external view returns (uint256);

    function addManyColorsToPalette(uint8 paletteIndex, string[] calldata newColors) external;

    function addManyBackgrounds(string[] calldata backgrounds) external;

    function addManyBodies(bytes[] calldata bodies) external;

    function addColorToPalette(uint8 paletteIndex, string calldata color) external;

    function addBackground(string calldata background) external;

    function addBody(bytes calldata body) external;

    function stockpile(uint24 index) external view returns (address);

    function genericDataURI(
        string calldata name,
        string calldata description,
        Equipment memory equipment
    ) external view returns (string memory);

    function generateSVGImage(Equipment memory equipment) external view returns (string memory);
}
