// SPDX-License-Identifier: GPL-3.0
// Taken from https://raw.githubusercontent.com/nounsDAO/nouns-monorepo/master/packages/nouns-contracts/contracts/interfaces/INounsDescriptor.sol

/// @title Interface for item providers

pragma solidity ^0.8.6;

interface IProvider {
    function valueOf(uint256 tokenId) external view returns (bytes memory value);

    function ownerOf(uint256 tokenId) external view returns (address owner);
}
