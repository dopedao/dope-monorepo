//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

// ============ Imports ============

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

import './ERC1155Snapshot.sol';
import './StockpileMetadata.sol';
import './interfaces/IStockpile.sol';

library Errors {
    string constant DoesNotOwnBag = 'you do not own this bag';
    string constant AlreadyOpened = 'bag already opened';
}

/// @title Dope Gear Stockpile
/// @author Georgios Konstantopoulos
/// @notice Allows "opening" your ERC721 Loot bags and extracting the items inside it
/// The created tokens are ERC1155 compatible, and their on-chain SVG is their name
contract Stockpile is ERC1155Snapshot, StockpileMetadata, Ownable {
    // The DOPE bags contract
    IERC721 immutable bags;

    mapping(uint256 => bool) private opened;

    // No need for a URI since we're doing everything onchain
    constructor(address _components, address _bags, address _owner) StockpileMetadata(_components) ERC1155('') {
        bags = IERC721(_bags);
        transferOwnership(_owner);
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
        ids[0] = itemId(tokenId, sc.weaponComponents, sc.WEAPON());
        ids[1] = itemId(tokenId, sc.clothesComponents, sc.CLOTHES());
        ids[2] = itemId(tokenId, sc.vehicleComponents, sc.VEHICLE());
        ids[3] = itemId(tokenId, sc.waistComponents, sc.WAIST());
        ids[4] = itemId(tokenId, sc.footComponents, sc.FOOT());
        ids[5] = itemId(tokenId, sc.handComponents, sc.HAND());
        ids[6] = itemId(tokenId, sc.drugsComponents, sc.DRUGS());
        ids[7] = itemId(tokenId, sc.neckComponents, sc.NECK());
        ids[8] = itemId(tokenId, sc.ringComponents, sc.RING());
        for (uint256 i = 0; i < ids.length; i++) {
            amounts[i] = 1;
            // +21k per call / unavoidable - requires patching OZ
            _balances[ids[i]][who] += 1;
        }

        emit TransferBatch(_msgSender(), address(0), who, ids, amounts);
    }

    function itemId(
        uint256 tokenId,
        function(uint256) pure external returns (uint8[5] memory) componentsFn,
        uint256 itemType
    ) private view returns (uint256) {
        uint8[5] memory components = componentsFn(tokenId);
        return TokenId.toId(components, itemType);
    }

    function mint(
        address to,
        uint8[5] memory components,
        uint8 itemType,
        uint256 amount,
        bytes memory data
    ) external onlyOwner returns (uint256) {
        uint256 id = TokenId.toId(components, itemType);
        _mint(to, id, amount, data);
        return id;
    }

    function mintBatch(
        address to,
        uint8[] memory components,
        uint8[] memory itemTypes,
        uint256[] memory amounts,
        bytes memory data
    ) external onlyOwner returns (uint256[] memory) {
        require(components.length % 5 == 0, 'invalid components shape');
        require(components.length / 5 == itemTypes.length, 'component itemType mismatch');
        uint256[] memory ids = new uint256[](itemTypes.length);

        for (uint256 i = 0; i < components.length; i += 5) {
            uint8[5] memory _components;
            _components[0] = components[i];
            _components[1] = components[i + 1];
            _components[2] = components[i + 2];
            _components[3] = components[i + 3];
            _components[4] = components[i + 4];
            ids[i / 5] = TokenId.toId(_components, itemTypes[i / 5]);
        }

        _mintBatch(to, ids, amounts, data);
        return ids;
    }

    // function burn(uint256 id, uint256 amount) external {
    //     _burn(msg.sender, id, amount);
    // }

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
}
