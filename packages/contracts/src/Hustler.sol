//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

// ============ Imports ============

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';

import { ComponentTypes } from './Components.sol';
import { HustlerMetadata } from './HustlerMetadata.sol';

library Errors {
    string constant IsNotSwapMeet = 'msg.sender is not the swap meet contract';
    string constant IsHolder = 'msg.sender is not hustler holder';
}

/// @title Hustlers
/// @author Tarrence van As
/// @notice Hustlers are avatars in the dope wars metaverse.
contract Hustler is ERC1155, ERC1155Holder, HustlerMetadata, Ownable {
    ERC1155 immutable swapmeet;

    // First 500 are reserved for OG Hustlers.
    uint256 internal curId = 500;

    // No need for a URI since we're doing everything onchain
    constructor(address _owner, address _swapmeet) ERC1155('') {
        swapmeet = ERC1155(_swapmeet);
        transferOwnership(_owner);
    }

    // function uri(uint256 tokenId) public view override returns (string memory) {
    //     return tokenURI(tokenId);
    // }

    /// @notice ERC1155 callback which will add an item to the hustlers inventory.
    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata hustlerId
    ) public override returns (bytes4) {
        // todo assert hustlerId is provided
        // only supports callback from the Loot contract
        require(msg.sender == address(swapmeet), Errors.IsNotSwapMeet);
        // open(from, tokenId);
        return ERC1155Holder.onERC1155Received.selector;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155Receiver)
        returns (bool)
    {
        return ERC1155.supportsInterface(interfaceId) || ERC1155Receiver.supportsInterface(interfaceId);
    }

    function mint(address to, bytes memory data) external returns (uint256) {
        uint256 id = curId;
        curId += 1;
        _mint(to, id, 1, data);
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

    function setMetadata(uint256 id, Metadata calldata meta) public {
        metadata[id] = meta;
    }

    function setPalette(uint8 id, string[] memory palette) public onlyOwner {
        palettes[id] = palette;
    }

    function setBody(
        uint256 id,
        uint8[4] memory body,
        uint8 mask
    ) public onlyHolder(id) {
        for (uint256 i = 0; i < 4; i++) {
            if (uint8(mask & (1 << i)) != 0) {
                metadata[id].body[i] = body[i];
            }
        }
    }

    function setSlots(
        uint256 id,
        uint256[10] memory slots,
        uint16 mask
    ) public onlyHolder(id) {
        for (uint256 i = 0; i < 10; i++) {
            if (uint8(mask & (1 << i)) != 0) {
                metadata[id].slots[i] = slots[i];
            }
        }
    }

    modifier onlyHolder(uint256 id) {
        require(balanceOf(msg.sender, id) == 1, Errors.IsHolder);
        _;
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
