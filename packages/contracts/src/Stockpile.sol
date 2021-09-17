//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

// ============ Imports ============

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

import './LootTokensMetadata.sol';
import './interfaces/IStockpile.sol';

library Errors {
    string constant DoesNotOwnBag = 'you do not own this bag';
    string constant AlreadyOpened = 'bag already opened';
}

/// @title Dope Gear Stockpile
/// @author Georgios Konstantopoulos
/// @notice Allows "opening" your ERC721 Loot bags and extracting the items inside it
/// The created tokens are ERC1155 compatible, and their on-chain SVG is their name
contract Stockpile is ERC1155, LootTokensMetadata {
    // The DOPE bags contract
    IERC721 immutable bags;

    mapping(uint256 => bool) private opened;

    // No need for a URI since we're doing everything onchain
    constructor(address _bags) ERC1155('') {
        bags = IERC721(_bags);
    }

    /// @notice Opens the provided tokenId if the sender is owner. This
    /// can only be done once per DOPE token.
    function open(uint256 tokenId) external {
        require(msg.sender == bags.ownerOf(tokenId), Errors.DoesNotOwnBag);
        require(!opened[tokenId], Errors.AlreadyOpened);
        opened[tokenId] = true;
        open(msg.sender, tokenId);
    }

    /// @notice Opens your Loot bag and mints you 9 ERC-1155 tokens for each item
    /// in that bag
    function open(address who, uint256 tokenId) private {
        // NB: We patched ERC1155 to expose `_balances` so
        // that we can manually mint to a user, and manually emit a `TransferBatch`
        // event. If that's unsafe, we can fallback to using _mint
        uint256[] memory ids = new uint256[](9);
        uint256[] memory amounts = new uint256[](9);
        ids[0] = itemId(tokenId, weaponComponents, WEAPON);
        ids[1] = itemId(tokenId, clothesComponents, CLOTHES);
        ids[2] = itemId(tokenId, vehicleComponents, VEHICLE);
        ids[3] = itemId(tokenId, waistComponents, WAIST);
        ids[4] = itemId(tokenId, footComponents, FOOT);
        ids[5] = itemId(tokenId, handComponents, HAND);
        ids[6] = itemId(tokenId, drugsComponents, DRUGS);
        ids[7] = itemId(tokenId, neckComponents, NECK);
        ids[8] = itemId(tokenId, ringComponents, RING);
        for (uint256 i = 0; i < ids.length; i++) {
            amounts[i] = 1;
            // +21k per call / unavoidable - requires patching OZ
            _balances[ids[i]][who] += 1;
        }

        emit TransferBatch(_msgSender(), address(0), who, ids, amounts);
    }

    function itemId(
        uint256 tokenId,
        function(uint256) view returns (uint256[5] memory) componentsFn,
        uint256 itemType
    ) private view returns (uint256) {
        uint256[5] memory components = componentsFn(tokenId);
        return TokenId.toId(components, itemType);
    }

    function rleOf(uint256 tokenId) external view returns (bytes memory rle) {
        return '';
    }

    function rleOfBatch(uint256[] memory tokenIds) external view returns (bytes[] memory rles) {
        bytes[] memory _rles = new bytes[](8);
        return _rles;
    }

    function ownedBatchRLE(uint256[] memory tokenIds) external view returns (bytes[] memory rles) {
        bytes[] memory _rles = new bytes[](8);
        return _rles;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return tokenURI(tokenId);
    }
}
