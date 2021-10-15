// SPDX-License-Identifier: GPL-3.0

/// @title Interface for SwapMeet

pragma solidity ^0.8.6;

import { IERC1155 } from '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

interface ISwapMeet is IERC1155 {
    function fullname(uint256 tokenId) external view returns (string memory);

    function tokenRle(uint256 id, uint8 gender) external view returns (bytes memory);

    function open(
        uint256 tokenId,
        address to,
        bytes memory data
    ) external;
}
