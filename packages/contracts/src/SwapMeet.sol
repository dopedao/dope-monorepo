//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

// ============ Imports ============

import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import { IERC721 } from '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import { ERC1155 } from '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';

import { ComponentTypes } from './Components.sol';
import { Gender, SwapMeetMetadata } from './SwapMeetMetadata.sol';
import { TokenId } from './TokenId.sol';

library Errors {
    string constant DoesNotOwnBagOrNotApproved = 'not sender bag or not approved';
    string constant AlreadyOpened = 'already opened';
}

/// @title Dope Gear SwapMeet
/// @author Tarrence van As, forked from Georgios Konstantopoulos
/// @notice Allows "opening" your ERC721 dope and extracting the items inside it
contract SwapMeet is ERC1155, SwapMeetMetadata, Ownable {
    // The DOPE dope contract
    IERC721 immutable dope;
    IERC20 immutable paper;
    address private constant timelock = 0xB57Ab8767CAe33bE61fF15167134861865F7D22C;
    uint256 public cost = 12500000000000000000000;

    mapping(uint256 => bool) private opened;

    // No need for a URI since we're doing everything onchain
    constructor(
        address _components,
        address _dope,
        address _paper,
        address _owner
    ) SwapMeetMetadata(_components) ERC1155('') {
        dope = IERC721(_dope);
        paper = IERC20(_paper);
        transferOwnership(_owner);
    }

    /// @notice Opens the provided tokenId if the sender is owner. This
    /// can only be done once per DOPE token.
    function open(
        uint256 tokenId,
        address to,
        bytes memory data
    ) public {
        require(
            msg.sender == dope.ownerOf(tokenId) || dope.isApprovedForAll(dope.ownerOf(tokenId), msg.sender),
            Errors.DoesNotOwnBagOrNotApproved
        );
        require(!opened[tokenId], Errors.AlreadyOpened);
        opened[tokenId] = true;
        _open(to, tokenId, data);
        paper.transferFrom(msg.sender, timelock, cost);
    }

    /// @notice Bulk opens the provided tokenIds. This
    /// can only be done once per DOPE token.
    function batchOpen(
        uint256[] calldata ids,
        address to,
        bytes memory data
    ) public {
        for (uint256 i = 0; i < ids.length; i++) {
            open(ids[i], to, data);
        }
    }

    /// @notice Opens your Loot bag and mints you 9 ERC-1155 tokens for each item
    /// in that bag
    function _open(
        address to,
        uint256 tokenId,
        bytes memory data
    ) private {
        uint256[] memory ids = new uint256[](9);
        uint256[] memory amounts = new uint256[](9);
        ids[0] = itemId(tokenId, ComponentTypes.WEAPON);
        ids[1] = itemId(tokenId, ComponentTypes.CLOTHES);
        ids[2] = itemId(tokenId, ComponentTypes.VEHICLE);
        ids[3] = itemId(tokenId, ComponentTypes.WAIST);
        ids[4] = itemId(tokenId, ComponentTypes.FOOT);
        ids[5] = itemId(tokenId, ComponentTypes.HAND);
        ids[6] = itemId(tokenId, ComponentTypes.DRUGS);
        ids[7] = itemId(tokenId, ComponentTypes.NECK);
        ids[8] = itemId(tokenId, ComponentTypes.RING);
        amounts[0] = 1;
        amounts[1] = 1;
        amounts[2] = 1;
        amounts[3] = 1;
        amounts[4] = 1;
        amounts[5] = 1;
        amounts[6] = 1;
        amounts[7] = 1;
        amounts[8] = 1;

        _mintBatch(to, ids, amounts, data);
    }

    function itemId(uint256 tokenId, uint8 componentType) private view returns (uint256) {
        uint8[5] memory components = sc.getComponent(tokenId, componentType);
        return TokenId.toId(components, componentType);
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
    ) external onlyOwner returns (uint256) {
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
    ) external onlyOwner returns (uint256[] memory) {
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

    // function burn(uint256 id, uint256 amount) external {
    //     _burn(msg.sender, id, amount);
    // }

    function setPalette(uint8 id, bytes4[] memory palette) external onlyOwner {
        palettes[id] = palette;
    }

    function setRle(
        uint256 id,
        bytes memory male,
        bytes memory female
    ) public onlyOwner {
        rles[id][Gender.MALE] = male;
        rles[id][Gender.FEMALE] = female;
    }

    function batchSetRle(uint256[] calldata ids, bytes[] calldata rles) external onlyOwner {
        require(ids.length == rles.length / 2, 'ids rles mismatch');

        for (uint256 i = 0; i < rles.length; i += 2) {
            setRle(ids[i / 2], rles[i], rles[i + 1]);
        }
    }
}
