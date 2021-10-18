//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

// ============ Imports ============

import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import { ERC1155 } from '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import { ERC1155Receiver } from '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';

import { BitMask } from './BitMask.sol';
import { ComponentTypes } from './Components.sol';
import { HustlerMetadata } from './HustlerMetadata.sol';

library Errors {
    string constant IsNotSwapMeet = 'sender not swap meet';
    string constant IsHolder = 'sender not hustler holder';
    string constant EquipSignatureInvalid = 'equip sig invalid';
    string constant HustlerDoesntOwnItem = 'hustler doesnt own item';
    string constant ValueNotOne = 'value not one';
}

/// @title Hustlers
/// @author Tarrence van As
/// @notice Hustlers are avatars in the dope wars metaverse.
contract Hustler is ERC1155, ERC1155Receiver, HustlerMetadata, Ownable {
    bytes4 constant equip = bytes4(keccak256('swapmeetequip'));

    IERC20 immutable paper;

    // First 500 are reserved for OG Hustlers.
    uint256 internal curId = 500;

    // No need for a URI since we're doing everything onchain
    constructor(
        address _owner,
        address _swapmeet,
        address _paper
    ) ERC1155('') HustlerMetadata(_swapmeet) {
        paper = IERC20(_paper);
        IERC20(_paper).approve(_swapmeet, type(uint256).max);
        transferOwnership(_owner);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return tokenURI(tokenId);
    }

    /// @notice ERC1155 callback which will add an item to the hustlers inventory.
    function onERC1155Received(
        address,
        address from,
        uint256 id,
        uint256 value,
        bytes memory data
    ) public override returns (bytes4) {
        // only supports callback from the SwapMeet contract
        require(msg.sender == address(swapmeet), Errors.IsNotSwapMeet);

        // Callers should encode the equip signature to explicity
        // indicate an encoded hustler id.
        (bytes4 sig, uint256 hustlerId) = abi.decode(data, (bytes4, uint256));
        require(sig == equip, Errors.EquipSignatureInvalid);
        require(balanceOf(from, hustlerId) == 1, Errors.IsHolder);
        require(value == 1, Errors.ValueNotOne);

        uint8 slot = slot(id);

        // Return the existing item if one is set.
        if (BitMask.get(metadata[hustlerId].mask, slot)) {
            swapmeet.safeTransferFrom(address(this), from, metadata[hustlerId].slots[slot], 1, '');
        }

        metadata[hustlerId].mask = BitMask.set(metadata[hustlerId].mask, slot);
        metadata[hustlerId].slots[slot] = id;

        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) public override returns (bytes4) {
        // only supports callback from the SwapMeet contract
        require(msg.sender == address(swapmeet), Errors.IsNotSwapMeet);

        // Callers should encode the equip signature to explicity
        // indicate an encoded hustler id.
        (bytes4 sig, uint256 hustlerId) = abi.decode(data, (bytes4, uint256));
        require(sig == equip, Errors.EquipSignatureInvalid);
        require(operator == address(this) || balanceOf(from, hustlerId) == 1, Errors.IsHolder);

        (uint256[] memory unequipIds, uint256[] memory unequipValues) = batchEquip(hustlerId, ids, values);

        if (unequipIds.length > 0) {
            swapmeet.safeBatchTransferFrom(address(this), from, unequipIds, unequipValues, '');
        }

        return this.onERC1155BatchReceived.selector;
    }

    function batchEquip(
        uint256 hustlerId,
        uint256[] calldata ids,
        uint256[] calldata values
    ) internal returns (uint256[] memory, uint256[] memory) {
        uint256[] memory unequipIds = new uint256[](ids.length);
        uint256[] memory unequipValues = new uint256[](ids.length);

        uint256 j = 0;
        for (uint8 i = 0; i < ids.length; i++) {
            require(values[i] == 1, Errors.ValueNotOne);
            uint8 slot = slot(ids[i]);

            if (BitMask.get(metadata[hustlerId].mask, slot)) {
                unequipIds[j] = metadata[hustlerId].slots[slot];
                unequipValues[j] = 1;
                j++;
            }

            metadata[hustlerId].mask = BitMask.set(metadata[hustlerId].mask, slot);
            metadata[hustlerId].slots[slot] = ids[i];
        }

        uint256 diff = ids.length - j;
        assembly {
            // Shrink slice to fit returned ids.
            mstore(unequipIds, sub(mload(unequipIds), diff))
            mstore(unequipValues, sub(mload(unequipValues), diff))
        }

        return (unequipIds, unequipValues);
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

    function mintFromDope(
        uint256 tokenId,
        string calldata name,
        bytes4 background,
        bytes4 color,
        bytes memory data
    ) external returns (uint256) {
        uint256 hustlerId = mint(data);
        metadata[hustlerId].name = name;
        metadata[hustlerId].background = background;
        metadata[hustlerId].color = color;
        paper.transferFrom(msg.sender, address(this), swapmeet.cost());
        swapmeet.open(tokenId, address(this), abi.encode(equip, hustlerId));
        return hustlerId;
    }

    function mint(bytes memory data) public returns (uint256) {
        uint256 id = curId;
        curId += 1;
        _mint(msg.sender, id, 1, data);
        metadata[id].age = block.timestamp;
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

    function setPalette(uint8 id, bytes4[] memory palette) public onlyOwner {
        palettes[id] = palette;
    }

    // function withdraw(
    //     uint256 hustlerId,
    //     uint256 tokenId,
    //     uint256 amount
    // ) public onlyHustler(hustlerId) {
    //     require(inventories[hustlerId][tokenId] >= amount, Errors.HustlerDoesntOwnItem);
    //     uint8 slot = slot(tokenId);
    //     if (metadata[hustlerId].slots[slot] == tokenId) {
    //         metadata[hustlerId].slots[slot] = 0;
    //     }

    //     inventories[hustlerId][tokenId] -= amount;
    //     swapmeet.safeTransferFrom(address(this), msg.sender, tokenId, amount, '');
    // }

    function setMetadata(
        uint256 hustlerId,
        string calldata name,
        bytes4 color,
        bytes4 background,
        uint8[4] calldata body,
        uint8 bmask
    ) public onlyHustler(hustlerId) {
        if (bytes(name).length > 0) {
            metadata[hustlerId].name = name;
        }
        if (color.length > 0) {
            metadata[hustlerId].color = color;
        }
        if (background.length > 0) {
            metadata[hustlerId].background = background;
        }
        setBody(hustlerId, body, bmask);
    }

    function setBody(
        uint256 id,
        uint8[4] calldata body,
        uint8 mask
    ) internal {
        for (uint256 i = 0; i < 4; i++) {
            if (uint8(mask & (1 << i)) != 0) {
                metadata[id].body[i] = body[i];
            }
        }
    }

    function addBodies(bytes[] calldata _bodies) public onlyOwner {
        for (uint256 i = 0; i < _bodies.length; i++) {
            bodies.push(_bodies[i]);
        }
    }

    function addHeads(bytes[] calldata _heads) public onlyOwner {
        for (uint256 i = 0; i < _heads.length; i++) {
            heads.push(_heads[i]);
        }
    }

    function addBeards(bytes[] calldata _beards) public onlyOwner {
        for (uint256 i = 0; i < _beards.length; i++) {
            beards.push(_beards[i]);
        }
    }

    modifier onlyHustler(uint256 id) {
        require(balanceOf(msg.sender, id) == 1, Errors.IsHolder);
        _;
    }
}
