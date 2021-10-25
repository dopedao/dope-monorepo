// SPDX-License-Identifier: GPL-3.0

/// @title Interface for SwapMeet

pragma solidity ^0.8.6;

import { IERC1155 } from '../../lib/openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol';

interface IPaletteProvider {
    function palette(uint8) external view returns (bytes4[] memory);
}

interface ISwapMeet is IPaletteProvider, IERC1155 {
    function params(uint256 tokenId)
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

    function fullname(uint256 tokenId) external view returns (string memory n);

    function tokenRle(uint256 id, uint8 gender) external view returns (bytes memory);

    function open(
        uint256 tokenId,
        address to,
        bytes memory data
    ) external;

    function cost() external returns (uint256);
}
