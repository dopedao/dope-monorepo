// SPDX-License-Identifier: GPL-3.0
// Taken from https://raw.githubusercontent.com/nounsDAO/nouns-monorepo/master/packages/nouns-contracts/contracts/interfaces/INounsDescriptor.sol

/// @title Interface for Hustler

import "../../lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol";

pragma solidity ^0.8.6;

interface IEnforcer {
    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) external;

    function onERC1155Received(
        address,
        address from,
        uint256 id,
        uint256 value,
        bytes memory data
    ) external;

    function onUnequip(uint256 hustlerId, uint8[] calldata slots) external;

    function beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external returns (bool);
}

interface IHustlerActions {
    struct SetMetadata {
        bytes4 color;
        bytes4 background;
        bytes2 options;
        uint8[4] viewbox;
        uint8[4] body;
        uint8[10] order;
        bytes2 mask;
        string name;
    }

    function mintOGTo(
        address to,
        SetMetadata calldata m,
        bytes calldata data
    ) external returns (uint256);

    function mintTo(
        address to,
        SetMetadata calldata m,
        bytes calldata data
    ) external returns (uint256);

    function setEnforcer(address enforcer_) external;

    function addRles(uint8 part, bytes[] calldata _rles) external;
}

interface IHustler is IERC1155, IHustlerActions {}
