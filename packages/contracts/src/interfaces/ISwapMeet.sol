// SPDX-License-Identifier: GPL-3.0

/// @title Interface for SwapMeet

pragma solidity ^0.8.6;

import '../../lib/openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol';

interface IPaletteProvider {
    function palette(uint8) external view returns (bytes4[] memory);
}

interface ISwapMeetMetadata {
    function fullname(uint256 id) external view returns (string memory n);

    function tokenRle(uint256 id, uint8 gender) external view returns (bytes memory);

    function params(uint256 id)
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            bytes4
        );
}

interface ISwapMeet is ISwapMeetMetadata, IPaletteProvider, IERC1155 {
    function open(
        uint256 id,
        address to,
        bytes memory data
    ) external;

    function mint(
        address to,
        uint8[5] memory components,
        uint8 componentType,
        uint256 amount,
        bytes memory data
    ) external returns (uint256);

    function mintBatch(
        address to,
        uint8[] memory components,
        uint8[] memory componentTypes,
        uint256[] memory amounts,
        bytes memory data
    ) external returns (uint256[] memory);

    function setPalette(uint8 id, bytes4[] memory palette) external;

    function setRle(
        uint256 id,
        bytes memory male,
        bytes memory female
    ) external;

    function batchSetRle(uint256[] calldata ids, bytes[] calldata rles) external;
}
