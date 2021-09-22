// SPDX-License-Identifier: GPL-3.0
// Taken from https://raw.githubusercontent.com/nounsDAO/nouns-monorepo/master/packages/nouns-contracts/contracts/interfaces/INounsDescriptor.sol

// @title Dope gear stockpile

import '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';

pragma solidity ^0.8.6;

interface IStockpile is IERC1155 {
    function attribute(uint256 id) external view returns (bytes memory value);

    function valueOfBatch(uint256[] memory ids) external view returns (bytes[] memory values);

    function ownedValueOfBatch(uint256[] memory ids) external view returns (bytes[] memory values);
}
