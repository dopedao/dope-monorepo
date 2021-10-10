//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

// ============ Imports ============

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

import { ComponentTypes } from './Components.sol';
import { HustlerMetadata } from './HustlerMetadata.sol';

/// @title Hustlers
/// @author Tarrence van As
/// @notice Allows "opening" your ERC721 Loot bags and extracting the items inside it
/// The created tokens are ERC1155 compatible, and their on-chain SVG is their name
contract Hustler is ERC1155, HustlerMetadata, Ownable {
    // No need for a URI since we're doing everything onchain
    constructor(address _owner) ERC1155('') {
        transferOwnership(_owner);
    }

    // function uri(uint256 tokenId) public view override returns (string memory) {
    //     return tokenURI(tokenId);
    // }

    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external onlyOwner returns (uint256) {
        _mint(to, id, amount, data);
        return id;
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external onlyOwner returns (uint256[] memory) {
        _mintBatch(to, ids, amounts, data);
        return ids;
    }

    // function burn(uint256 id, uint256 amount) external {
    //     _burn(msg.sender, id, amount);
    // }

    function setPalette(uint8 id, string[] memory palette) public onlyOwner {
        palettes[id] = palette;
    }

    // function setRle(
    //     uint256 id,
    //     bytes memory male,
    //     bytes memory female
    // ) public onlyOwner {
    //     rles[id][Gender.MALE] = male;
    //     rles[id][Gender.FEMALE] = female;
    // }

    // function batchSetRle(uint256[] calldata ids, bytes[] calldata rles) public onlyOwner {
    //     require(ids.length == rles.length / 2, 'ids rles mismatch');

    //     for (uint256 i = 0; i < rles.length; i += 2) {
    //         setRle(ids[i / 2], rles[i], rles[i + 1]);
    //     }
    // }
}
