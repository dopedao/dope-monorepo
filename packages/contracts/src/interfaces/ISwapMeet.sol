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
}
