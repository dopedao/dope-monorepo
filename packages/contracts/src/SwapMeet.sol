// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

// ============ Imports ============

import '../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol';
import '../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol';
import '../lib/openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol';
import '../lib/openzeppelin-contracts/contracts/access/Ownable.sol';

import './Components.sol';
import './SwapMeetMetadata.sol';
import './TokenId.sol';
import './interfaces/ISwapMeet.sol';

/// @title Dope Gear SwapMeet
/// @author Tarrence van As, forked from Georgios Konstantopoulos
/// @notice Allows "opening" your ERC721 dope and extracting the items inside it
contract SwapMeet is ISwapMeet, ERC1155, SwapMeetMetadata, Ownable {
    event SetRle(uint256 id);

    constructor(address _components) SwapMeetMetadata(_components) {}

    /// @notice Bulk opens the provided tokenIds. This
    /// can only be done once per DOPE token.
    function open(
        uint256 id,
        address to,
        bytes memory data
    ) external override onlyOwner {
        uint256[] memory amounts = new uint256[](9);
        uint256[] memory parts = new uint256[](9);

        uint256 i = 0;
        uint256[] memory items = itemIds(id);
        parts[i] = items[0];
        parts[i + 1] = items[1];
        parts[i + 2] = items[2];
        parts[i + 3] = items[3];
        parts[i + 4] = items[4];
        parts[i + 5] = items[5];
        parts[i + 6] = items[6];
        parts[i + 7] = items[7];
        parts[i + 8] = items[8];

        amounts[i] = 1;
        amounts[i + 1] = 1;
        amounts[i + 2] = 1;
        amounts[i + 3] = 1;
        amounts[i + 4] = 1;
        amounts[i + 5] = 1;
        amounts[i + 6] = 1;
        amounts[i + 7] = 1;
        amounts[i + 8] = 1;

        _mintBatch(to, parts, amounts, data);
    }

    function itemIds(uint256 tokenId) public view returns (uint256[] memory) {
        uint256[] memory ids = new uint256[](9);
        uint8[5][9] memory items = sc.items(tokenId);
        for (uint8 i = 0; i < 9; i++) {
            ids[i] = TokenId.toId(items[i], i);
        }
        return ids;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return tokenURI(tokenId);
    }

    function mint(
        address to,
        uint8[5] memory components,
        uint8 componentType,
        uint256 amount,
        bytes memory data
    ) external override onlyOwner returns (uint256) {
        uint256 id = TokenId.toId(components, componentType);
        _mint(to, id, amount, data);
        return id;
    }

    function mintBatch(
        address to,
        uint8[] memory components,
        uint8[] memory componentTypes,
        uint256[] memory amounts,
        bytes memory data
    ) external override onlyOwner returns (uint256[] memory) {
        require(components.length % 5 == 0, 'components len');
        require(components.length / 5 == componentTypes.length, 'len mismatch');
        uint256[] memory ids = new uint256[](componentTypes.length);

        for (uint256 i = 0; i < components.length; i += 5) {
            uint8[5] memory _components;
            _components[0] = components[i];
            _components[1] = components[i + 1];
            _components[2] = components[i + 2];
            _components[3] = components[i + 3];
            _components[4] = components[i + 4];
            ids[i / 5] = TokenId.toId(_components, componentTypes[i / 5]);
        }

        _mintBatch(to, ids, amounts, data);
        return ids;
    }

    function setPalette(uint8 id, bytes4[] memory palette) external override onlyOwner {
        palettes[id] = palette;
    }

    function setRle(
        uint256 id,
        bytes memory male,
        bytes memory female
    ) public override onlyOwner {
        rles[id][Gender.MALE] = male;
        rles[id][Gender.FEMALE] = female;
        emit SetRle(id);
    }

    function batchSetRle(uint256[] calldata ids, bytes[] calldata rles) external override onlyOwner {
        require(ids.length == rles.length / 2, 'ids rles mismatch');

        for (uint256 i = 0; i < rles.length; i += 2) {
            setRle(ids[i / 2], rles[i], rles[i + 1]);
        }
    }
}
