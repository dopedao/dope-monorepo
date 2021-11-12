// SPDX-License-Identifier: GPL-3.0
// Taken from https://raw.githubusercontent.com/nounsDAO/nouns-monorepo/master/packages/nouns-contracts/contracts/interfaces/INounsDescriptor.sol

/// @title Interface for Hustler

pragma solidity ^0.8.6;

interface IController {
    function mintOGTo(
        uint256 dopeId,
        address to,
        string calldata name,
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        bytes2 mask,
        bytes memory data
    ) external;

    function mintTo(
        uint256 dopeId,
        address to,
        string calldata name,
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        bytes2 mask,
        bytes memory data
    ) external;

    function open(
        uint256 dopeId,
        address to,
        bytes memory data
    ) external;

    function mintItem(
        address to,
        uint8[5] memory components_,
        uint8 componentType,
        uint256 amount,
        bytes memory data
    ) external;

    function mintItemBatch(
        address to,
        uint8[] memory components_,
        uint8[] memory componentTypes,
        uint256[] memory amounts,
        bytes memory data
    ) external;

    function addItemComponent(uint8 componentType, string calldata component) external;

    function setEnforcer(address) external;

    function setInitiator(address) external;

    function setMaintainer(address) external;

    function setDAO(address) external;
}
