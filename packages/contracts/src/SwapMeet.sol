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

    uint256 private immutable deployedAt;
    uint256 private cost_ = 12500000000000000000000;

    mapping(uint256 => bool) private opened;

    // No need for a URI since we're doing everything onchain
    constructor(
        address _components,
        address _dope,
        address _paper
    ) SwapMeetMetadata(_components) {
        dope = IERC721(_dope);
        paper = IERC20(_paper);
        deployedAt = block.timestamp;
    }

    function cost() public view returns (uint256) {
        if ((block.timestamp - deployedAt) > 420 days) {
            return 0;
        } else if ((block.timestamp - deployedAt) > 180 days) {
            return 3125000000000000000000;
        } else if ((block.timestamp - deployedAt) > 90 days) {
            return 6250000000000000000000;
        }

        return cost_;
    }

    /// @notice Opens the provided tokenId if the sender is owner. This
    /// can only be done once per DOPE token.
    function open(
        uint256 tokenId,
        address to,
        bytes memory data
    ) public {
        batchOpen(_asSingletonArray(tokenId), to, data);
    }

    /// @notice Bulk opens the provided tokenIds. This
    /// can only be done once per DOPE token.
    function batchOpen(
        uint256[] memory ids,
        address to,
        bytes memory data
    ) public {
        uint256[] memory amounts = new uint256[](9 * ids.length);
        uint256[] memory parts = new uint256[](9 * ids.length);

        for (uint256 i = 0; i < 9 * ids.length; i += 9) {
            uint256 id = ids[i / 9];
            require(
                msg.sender == dope.ownerOf(id) || dope.isApprovedForAll(dope.ownerOf(id), msg.sender),
                Errors.DoesNotOwnBagOrNotApproved
            );
            require(!opened[id], Errors.AlreadyOpened);
            opened[id] = true;

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
        }

        paper.transferFrom(msg.sender, timelock, cost() * ids.length);
        _mintBatch(to, parts, amounts, data);
    }

    function itemIds(uint256 tokenId) private view returns (uint256[] memory) {
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

    function isOpened(uint256 id) external view returns (bool) {
        return opened[id];
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
